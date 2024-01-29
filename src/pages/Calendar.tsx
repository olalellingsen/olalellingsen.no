import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Event, { EventProps } from "../components/Event";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Calendar() {
  const [eventData, setEventData] = useState<DocumentData[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<EventProps[]>([]);
  const [pastEvents, setPastEvents] = useState<EventProps[]>([]);
  const [showPast, setShowPast] = useState(false);

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
  });

  useEffect(() => {
    filterConcertData();
  }, [eventData]);

  function filterConcertData() {
    const currentDate = new Date();

    const allEvents = eventData.map((event) => ({
      band: event.band.toString(),
      date: event.date.toDate(),
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
    const sortedUpcomingEventsData = upcomingEventsData.sort(
      (a, b) => a.date - b.date
    );
    // Sort past events by date in descending order
    const sortedPastEventsData = pastEventsData.sort((a, b) => b.date - a.date);

    const formattedUpcomingEvents = sortedUpcomingEventsData.map((event) => ({
      ...event,
      date: event.date.toLocaleDateString(),
      time: event.date.toLocaleTimeString().slice(0, -3),
    }));

    const formattedPastEvents = sortedPastEventsData.map((event) => ({
      ...event,
      date: event.date.toLocaleDateString(),
      time: event.date.toLocaleTimeString().slice(0, -3),
    }));

    setUpcomingEvents(formattedUpcomingEvents);
    setPastEvents(formattedPastEvents);
  }

  return (
    <div className="lg:w-2/3 mx-auto">
      {showPast ? (
        <h1 className="p-2">Past concerts</h1>
      ) : (
        <h1 className="p-2">Upcoming concerts</h1>
      )}
      <div className="flex justify-center xl:justify-end py-4">
        <button onClick={() => setShowPast(!showPast)} className="button flex">
          {showPast ? (
            <>
              <h2>Upcoming dates</h2>
            </>
          ) : (
            <h2>Past dates</h2>
          )}
        </button>
      </div>

      {!showPast && (
        <div>
          <div className="grid gap-4">
            {upcomingEvents.map((event) => (
              <Event {...event} />
            ))}
          </div>
        </div>
      )}
      <div>
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
    </div>
  );
}

export default Calendar;