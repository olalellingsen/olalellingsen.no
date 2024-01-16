import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { Ticket } from "lucide-react";

export interface ConcertProps {
  title?: string;
  image?: string;
  date?: string;
  time?: string;
  location?: string;
  locationLink?: string;
  ticketLink?: string;
  description?: string;
}

function Concert({
  title,
  date,
  time,
  location,
  locationLink,
  description,
  ticketLink,
  image,
}: ConcertProps) {
  return (
    <div className="card grid gap-2">
      <h2 className="flex justify-start">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {image !== undefined && (
          <img src={image} alt={"Image of " + title} className="rounded-md" />
        )}
        <div className="flex flex-wrap gap-4 sm:mt-0 md:flex-col">
          <div className="flex gap-1">
            <Calendar />
            {date}
          </div>
          <div className="flex gap-1">
            <Clock />
            {time}
          </div>
          <div className="flex gap-1">
            <MapPin />
            <a
              className={locationLink !== " " ? "underline" : ""}
              href={locationLink}
            >
              {location}
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

export default Concert;
