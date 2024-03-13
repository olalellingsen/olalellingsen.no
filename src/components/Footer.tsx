import { Mail, Phone } from "lucide-react";
import SoMe from "./SoMe";
import { useAuth } from "../context/AuthContext";

function Footer() {
  const { isSignedIn, login, logout, user } = useAuth();

  return (
    <div className="bg-primary text-white p-4">
      <div className="grid gap-8 sm:flex justify-between p-2 sm:p-6 sm:px-12">
        {/* contact */}
        <div className="grid gap-2">
          <div className="flex gap-2 underline">
            <Mail size={25} />
            <a href="mailto:ola.l.ellingsen@gmail.com">
              ola.l.ellingsen@gmail.com
            </a>
          </div>
          <div className="flex gap-2">
            <Phone size={25} />
            <a href="tel:+4790197381">+47 90 19 73 81</a>
          </div>
        </div>

        {/* social media */}
        <div className="flex justify-between gap-2">
          <SoMe face={true} size={40} />
          <SoMe insta={true} size={40} />
          <SoMe linkedin={true} size={40} />
          <SoMe spotify={true} size={40} />
        </div>
      </div>

      <div className="text-center pt-8 font-extralight">
        <p>© 2024 Ola Lømo Ellingsen</p>
        {isSignedIn ? (
          <>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button onClick={login}>Sign in</button>
        )}
      </div>
    </div>
  );
}

export default Footer;
