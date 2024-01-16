import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
// import { db } from "../firebase";
import Event, { ConcertProps } from "./Event";
import { ArrowDown, ArrowRight } from "lucide-react";

interface Props {
  id: string;
}

function Concerts({ id }: Props) {
  const [eventData, setEventData] = useState<DocumentData[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<ConcertProps[]>([]);
  const [pastEvents, setPastEvents] = useState<ConcertProps[]>([]);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const querySnapshot = await getDocs(collection(db, "Concerts"));
        // const newConcertData = querySnapshot.docs.map((doc) =>
        //   doc.data()
        // ) as DocumentData[];
        // setConcertData(newConcertData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, [id]); // Add 'id' as a dependency to refetch data when 'id' changes

  useEffect(() => {
    filterConcertData();
  }, [eventData]); // Update the filtered data whenever eventData changes

  function filterConcertData() {
    const today = new Date();

    const upcomingEvents = eventData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return aDate.getTime() - bDate.getTime(); // Sort by nearest date
      })
      .filter((event) => {
        const eventDate = new Date(event.date.toDate());
        return eventDate > today;
      })
      .map((event) => ({
        title: event.title.toString(),
        date: event.date.toDate().toLocaleDateString(),
        time: event.date.toDate().toLocaleTimeString().slice(0, -3),
        location: event.location,
        locationLink: event.locationLink,
        ticketLink: event.ticketLink,
        description: event.description,
      }));

    const pastEvents = eventData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return bDate.getTime() - aDate.getTime(); // Sort in most recent order
      })
      .filter((event) => {
        const eventDate = new Date(event.date.toDate());
        return eventDate < today;
      })
      .map((event) => ({
        title: event.title,
        date: event.date.toDate().toLocaleDateString(),
        location: event.location,
      }));

    // Set the state variables
    setUpcomingEvents(upcomingEvents);
    setPastEvents(pastEvents);
  }

  return (
    <div id={id} className="h-screen border">
      <h1>Events</h1>
      <h2>Upcoming events</h2>
      <div className="grid gap-4 md:grid-cols-2 mt-2 mx-auto 2xl:w-2/3">
        {upcomingEvents.map((event) => (
          <Event {...event} />
        ))}
      </div>
      <div className="pt-8 mt-2 mx-auto 2xl:w-2/3">
        <button onClick={() => setShowPast(!showPast)} className="flex">
          {showPast ? (
            <>
              <h2 className="underline">Past events</h2>
              <ArrowDown height={35} />
            </>
          ) : (
            <>
              <h2 className="flex underline hover:mr-1">Show past events</h2>
              <ArrowRight height={35} />
            </>
          )}
        </button>
        {showPast && (
          <ul className="pt-2">
            {pastEvents.map((event) => (
              <li>
                <div className="flex py-1">
                  <p>
                    {event.date} - {event.title} - {event.location}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Concerts;
