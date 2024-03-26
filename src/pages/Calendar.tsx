import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import Event, { EventProps } from "../components/Event";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

function Calendar() {
  const { isSignedIn } = useAuth();

  const [eventData, setEventData] = useState<DocumentData[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventProps[]>([]);
  const [pastEvents, setPastEvents] = useState<EventProps[]>([]);
  const [showPast, setShowPast] = useState(false);

  // State variables to hold form input values
  const [band, setBand] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [venueLink, setVenueLink] = useState("");
  const [ticketLink, setTicketLink] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const concertData = querySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        setEventData(concertData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterConcertData();
  }, [eventData]);

  function filterConcertData() {
    const currentDate = new Date();

    const allEvents = eventData.map((event) => ({
      band: event.band,
      date: event.date.toDate(), // Convert Firestore Timestamp to JavaScript Date object
      venue: event.venue,
      venueLink: event.venueLink,
      ticketLink: event.ticketLink,
      description: event.description,
    }));

    const upcomingEventsData = allEvents.filter(
      (event) => event.date > currentDate
    );
    const pastEventsData = allEvents.filter(
      (event) => event.date <= currentDate
    );

    // Sort upcoming events by date in ascending order
    const sortedUpcomingEventsData = upcomingEventsData.sort((a, b) => {
      return a.date.getTime() - b.date.getTime(); // Compare timestamps
    });

    // Sort past events by date in descending order
    const sortedPastEventsData = pastEventsData.sort((a, b) => {
      return b.date.getTime() - a.date.getTime(); // Compare timestamps
    });

    const formattedUpcomingEvents = sortedUpcomingEventsData.map((event) => ({
      ...event,
      date: event.date.toLocaleDateString(),
      time: event.date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    const formattedPastEvents = sortedPastEventsData.map((event) => ({
      ...event,
      date: event.date.toLocaleDateString(),
      time: event.date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));

    setUpcomingEvents(formattedUpcomingEvents);
    setPastEvents(formattedPastEvents);
  }

  // Function to handle form submission
  const handleAddConcert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Combine date and time into a single DateTime object
      const dateTime = new Date(date + "T" + time);
      console.log(dateTime);

      // Add new concert document to Firestore
      await addDoc(collection(db, "Concerts"), {
        band,
        date: dateTime, // Store DateTime object in Firestore
        venue,
        venueLink,
        ticketLink,
      });

      // Clear form fields after adding concert
      setBand("");
      setDate("");
      setTime("");
      setVenue("");
      setVenueLink("");
      setTicketLink("");

      // Fetch updated concert data
      const querySnapshot = await getDocs(collection(db, "Concerts"));
      const concertData = querySnapshot.docs.map((doc) =>
        doc.data()
      ) as DocumentData[];
      setEventData(concertData);

      console.log("Concert added successfully!");
    } catch (error) {
      console.error("Error adding concert:", error);
    }
  };

  return (
    <div className="mainContent lg:w-4/5 xl:w-3/4 mx-auto">
      <h1>Calendar</h1>
      {eventData.length === 0 && <Spinner />}

      {isSignedIn && (
        <div className="my-8 rounded-lg text-center">
          <h2>Add concert</h2>
          <form className="grid gap-2" onSubmit={handleAddConcert}>
            <input
              type="text"
              placeholder="Band"
              value={band}
              onChange={(e) => setBand(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="time"
              placeholder="Time"
              value={time} // Set the value to the time state variable
              onChange={(e) => setTime(e.target.value)}
            />

            <input
              type="text"
              placeholder="Name of venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
            <input
              type="url"
              placeholder="Link to venue"
              value={venueLink}
              onChange={(e) => setVenueLink(e.target.value)}
            />
            <input
              type="url"
              placeholder="Link to tickets"
              value={ticketLink}
              onChange={(e) => setTicketLink(e.target.value)}
            />
            <button className="button" type="submit">
              Add concert
            </button>
          </form>
        </div>
      )}

      <div className="flex justify-center py-4">
        <button onClick={() => setShowPast(!showPast)} className="button flex">
          {showPast ? <p>Show upcoming dates</p> : <p>Show past dates</p>}
        </button>
      </div>

      {!showPast && (
        <div className="grid gap-4">
          {upcomingEvents.map((event) => (
            <Event {...event} />
          ))}
        </div>
      )}

      {showPast && (
        <div className="grid gap-4">
          {pastEvents.map((event) => (
            <Event
              band={event.band}
              date={event.date}
              venue={event.venue}
              isPast={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Calendar;
