import { Mail, Phone } from "lucide-react";
import SoMe from "./SoMe";

function Footer({ id }: { id: string }) {
  return (
    <div id={id} className="bg-primary text-white p-4 xs:p-6">
      <div className="grid gap-4 xs:flex justify-between">
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
        <div className="grid gap-2">
          <div className="flex gap-2">
            <SoMe face={true} size={40} />
            <SoMe insta={true} size={40} />
          </div>
        </div>
      </div>
      <p className="text-center pt-8 font-extralight">
        © 2024 Ola Lømo Ellingsen
      </p>
    </div>
  );
}

export default Footer;
