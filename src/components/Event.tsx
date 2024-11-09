import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
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
  ticketLink,
  isPast,
  onEdit,
  onDelete,
}: EventProps) {
  const { isSignedIn } = useAuth();

  return (
    <div
      className={`p-1 sm:pt-4 border-b border-primary ${
        isPast && "text-stone-500"
      }`}
    >
      <h2 className="flex justify-between py-2">
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
      </h2>

      {/* Details */}
      <div className="grid sm:flex flex-wrap gap-1 sm:gap-6 p-1 sm:text-lg">
        <div className="flex gap-1 my-1">
          <Calendar strokeWidth={1} />
          {date.toDate().toLocaleDateString("no-NO", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })}
        </div>
        {!isPast && (
          <div className="flex gap-1 my-1">
            <Clock strokeWidth={1} />
            {date.toDate().toLocaleTimeString() === "00:00:00"
              ? "TBA"
              : date.toDate().toLocaleTimeString().slice(0, 5)}
          </div>
        )}
        <div className="flex gap-1 my-1">
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
          <div className="p-2 sm:p-0">
            <a href={ticketLink} target="_blank">
              <button className="ticketButton w-max">Tickets</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Event;
