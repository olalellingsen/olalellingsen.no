import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Youtube } from "lucide-react";

interface Props {
  face?: boolean;
  insta?: boolean;
  yt?: boolean;
  size?: number;
}

function SoMe({ face, insta, yt, size }: Props) {
  return (
    <div>
      {face && (
        <div>
          <a href="https://www.facebook.com/">
            <Facebook size={size} className="soMeIcon" />
          </a>
        </div>
      )}
      {insta && (
        <div>
          <a href="https://www.instagram.com/">
            <Instagram size={size} className="soMeIcon" />
          </a>
        </div>
      )}
      {yt && (
        <div>
          <a href="https://youtube.com/">
            <Youtube size={size} className="soMeIcon" />
          </a>
        </div>
      )}
    </div>
  );
}

export default SoMe;
