import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Ticket } from "lucide-react";
import { Pencil, Trash } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Timestamp } from "firebase/firestore";

export interface EventProps {
  id: string;
  band?: string;
  date: Timestamp;
  venue?: string;
  venueLink?: string;
  ticketLink?: string;
  description?: string;
  isPast?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

function Event({
  id,
  band,
  date,
  venue,
  venueLink,
  description,
  ticketLink,
  isPast,
  onEdit,
  onDelete,
}: EventProps) {
  const { isSignedIn } = useAuth();

  return (
    <div
      className={` text-stone-200 p-4 rounded-lg shadow-xl ${
        isPast ? "bg-primary/70" : "bg-primary"
      }`}
    >
      <h3 className="flex justify-between">
        {band}
        {isSignedIn && (
          <div className="flex gap-2">
            <button onClick={() => onEdit && onEdit(id)}>
              <Pencil strokeWidth={1} className="hover:stroke-2" />
            </button>
            <button onClick={() => onDelete && onDelete(id)}>
              <Trash strokeWidth={1} className="hover:stroke-2" />
            </button>
          </div>
        )}
      </h3>
      <div className="grid gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-1">
            <Calendar strokeWidth={1} />
            {date.toDate().toLocaleDateString()}
          </div>
          {!isPast && (
            <div className="flex gap-1">
              <Clock strokeWidth={1} />
              {date.toDate().toLocaleTimeString() === "00:00:00"
                ? "TBA"
                : date.toDate().toLocaleTimeString().slice(0, 5)}
            </div>
          )}
          <div className="flex gap-1">
            <MapPin strokeWidth={1} />
            <a
              className={
                venueLink !== undefined ? "underline hover:no-underline" : ""
              }
              href={venueLink}
              target="_blank"
            >
              {venue}
            </a>
          </div>

          {ticketLink !== undefined && ticketLink !== "" && !isPast && (
            <div className="flex gap-1">
              <Ticket strokeWidth={1} />
              <a
                className="underline hover:no-underline"
                href={ticketLink}
                target="_blank"
              >
                Tickets
              </a>
            </div>
          )}
          {description !== "" && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
}

export default Event;
