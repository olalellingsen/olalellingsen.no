import { Mail, Phone } from "lucide-react";
import SoMe from "./SoMe";
import { useAuth } from "../context/AuthContext";

function Footer() {
  const { isSignedIn, login, logout } = useAuth();

  return (
    <div className="p-1">
      <div className="grid gap-6 py-4 sm:py-0 sm:flex sm:justify-between sm:px-12 sm:pt-8">
        {/* contact */}
        <div className="grid justify-items-center sm:justify-items-start gap-2">
          <div className="flex gap-2">
            <Mail className="stroke-1" size={25} />
            <a
              href="mailto:ola.l.ellingsen@gmail.com"
              className="hover:underline"
            >
              ola.l.ellingsen@gmail.com
            </a>
          </div>
          <div className="flex gap-2">
            <Phone className="stroke-1" size={25} />
            <a href="tel:+4790197381" className="hover:underline">
              +47 90 19 73 81
            </a>
          </div>
        </div>

        {/* social media */}
        <div className="flex gap-3 justify-center py-4">
          <SoMe face={true} size={30} />
          <SoMe insta={true} size={30} />
          <SoMe spotify={true} size={30} />
          <SoMe apple_music={true} size={30} />
          <SoMe yt={true} size={30} />
          <SoMe linkedin={true} size={30} />
        </div>
      </div>

      <div className="text-center pt-2 font-thin">
        {isSignedIn ? (
          <>
            <p>Admin access</p>
            <button className="hover:underline" onClick={logout}>
              Sign out
            </button>
          </>
        ) : (
          <button onClick={login}>© 2024 Ola Lømo Ellingsen</button>
        )}
      </div>
    </div>
  );
}

export default Footer;
