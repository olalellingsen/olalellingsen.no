import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Youtube } from "lucide-react";
import { Linkedin } from "lucide-react";
import SpotifyIcon from "../assets/spotify.png";

interface Props {
  face?: boolean;
  insta?: boolean;
  yt?: boolean;
  linkedin?: boolean;
  spotify?: boolean;
  size?: number;
}

function SoMe({ face, insta, yt, size, linkedin, spotify }: Props) {
  return (
    <div>
      {face && (
        <div>
          <a href="https://www.facebook.com/profile.php?id=100002368784463">
            <Facebook size={size} className="soMeIcon" />
          </a>
        </div>
      )}
      {insta && (
        <div>
          <a href="https://www.instagram.com/olalellingsen/">
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
      {linkedin && (
        <div>
          <a href="https://www.linkedin.com/in/ola-l%C3%B8mo-ellingsen-262487252/">
            <Linkedin size={size} className="soMeIcon" />
          </a>
        </div>
      )}
      {spotify && (
        <div>
          <a href="https://open.spotify.com/artist/4NZ0fCPxiuIaEHw9kUgURe?si=h5hKr1lfTt28PC1Nfn-3hw&nd=1&dlsi=0abc8c122fac4be6">
            <img
              src={SpotifyIcon}
              alt="Spotify"
              className="soMeIcon"
              width={size}
            />
          </a>
        </div>
      )}
    </div>
  );
}

export default SoMe;
