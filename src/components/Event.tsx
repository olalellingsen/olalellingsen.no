import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Ticket } from "lucide-react";

export interface EventProps {
  band?: string;
  image?: string;
  date?: string;
  time?: string;
  venue?: string;
  venueLink?: string;
  ticketLink?: string;
  description?: string;
  isPast?: boolean;
}

function Event({
  band,
  date,
  time,
  venue,
  venueLink,
  description,
  ticketLink,
  image,
  isPast,
}: EventProps) {
  return (
    <div
      className={`card grid gap-2 ${isPast ? "bg-primary/70" : "bg-primary"}`}
    >
      <h2 className="flex">{band}</h2>
      <div className="grid gap-4">
        {image !== undefined && (
          <img src={image} alt={"Image of " + band} className="rounded-md" />
        )}
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-1">
            <Calendar />
            {date}
          </div>
          {!isPast && (
            <div className="flex gap-1">
              <Clock />
              {time === "00:00" ? "TBA" : time}
            </div>
          )}
          <div className="flex gap-1">
            <MapPin />
            <a
              className={venueLink !== undefined ? "underline" : ""}
              href={venueLink}
            >
              {venue}
            </a>
          </div>

          {ticketLink !== undefined && ticketLink !== "" && (
            <div className="flex gap-1">
              <Ticket />
              <a className="underline" href={ticketLink}>
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
