import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  DocumentData,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import Event, { EventProps } from "../components/Event";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import SmoothRender from "../components/SmoothRender";
import ConfirmationDialog from "../components/ConfirmationDialog"; // Import the ConfirmationDialog component

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

  // State variables for editing events
  const [isEditing, setIsEditing] = useState(false);
  const [editEventId, setEditEventId] = useState<string | null>(null);

  // State variables for delete confirmation dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const concertData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DocumentData[];
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
      id: event.id,
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

      if (isEditing && editEventId) {
        // Update existing event
        await updateDoc(doc(db, "Concerts", editEventId), {
          band,
          date: dateTime,
          venue,
          venueLink,
          ticketLink,
        });
        setIsEditing(false);
        setEditEventId(null);
      } else {
        // Add new concert document to Firestore
        await addDoc(collection(db, "Concerts"), {
          band,
          date: dateTime, // Store DateTime object in Firestore
          venue,
          venueLink,
          ticketLink,
        });
      }

      // Clear form fields after adding or updating concert
      setBand("");
      setDate("");
      setTime("");
      setVenue("");
      setVenueLink("");
      setTicketLink("");

      // Fetch updated concert data
      const querySnapshot = await getDocs(collection(db, "Concerts"));
      const concertData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DocumentData[];
      setEventData(concertData);

      console.log("Concert added/updated successfully!");
    } catch (error) {
      console.error("Error adding/updating concert:", error);
    }
  };

  // Function to handle event editing
  const handleEditEvent = (id: string) => {
    const eventToEdit = eventData.find((event) => event.id === id);
    if (eventToEdit) {
      setBand(eventToEdit.band);
      setDate(eventToEdit.date.toDate().toISOString().split("T")[0]); // Set date in YYYY-MM-DD format
      setTime(
        eventToEdit.date.toDate().toISOString().split("T")[1].slice(0, 5)
      ); // Set time in HH:MM format
      setVenue(eventToEdit.venue);
      setVenueLink(eventToEdit.venueLink);
      setTicketLink(eventToEdit.ticketLink);
      setIsEditing(true);
      setEditEventId(id);
    }
  };

  // Function to handle event deletion
  const handleDeleteEvent = (id: string) => {
    setDeleteEventId(id);
    setIsDialogOpen(true);
  };

  // Function to confirm event deletion
  const confirmDeleteEvent = async () => {
    if (deleteEventId) {
      try {
        await deleteDoc(doc(db, "Concerts", deleteEventId));
        setEventData(eventData.filter((event) => event.id !== deleteEventId));
        console.log("Concert deleted successfully!");
      } catch (error) {
        console.error("Error deleting concert:", error);
      } finally {
        setIsDialogOpen(false);
        setDeleteEventId(null);
      }
    }
  };

  return (
    <div className="mainContent lg:w-4/5 xl:w-3/4 mx-auto">
      <h1>Calendar</h1>

      {isSignedIn && (
        <div className="my-8 rounded-lg text-center">
          <h2>{isEditing ? "Edit concert" : "Add concert"}</h2>
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
              {isEditing ? "Update concert" : "Add concert"}
            </button>
          </form>
        </div>
      )}

      <div className="flex justify-center py-4">
        <button onClick={() => setShowPast(!showPast)} className="button flex">
          {showPast ? <p>Show upcoming dates</p> : <p>Show past dates</p>}
        </button>
      </div>

      {eventData.length === 0 && <Spinner />}

      {!showPast && (
        <div className="grid gap-4">
          {upcomingEvents.map((event) => (
            <SmoothRender key={event.id}>
              <Event
                {...event}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            </SmoothRender>
          ))}
        </div>
      )}

      {showPast && (
        <div className="grid gap-4">
          {pastEvents.map((event) => (
            <SmoothRender key={event.id}>
              <Event
                {...event}
                isPast={true}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            </SmoothRender>
          ))}
        </div>
      )}

      <ConfirmationDialog
        isOpen={isDialogOpen}
        message="Are you sure you want to delete this concert?"
        onConfirm={confirmDeleteEvent}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default Calendar;
