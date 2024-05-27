import { InstagramEmbed } from "react-social-media-embed";
import homeImg from "../assets/homeimg1.jpg";
import ButtonNav from "../components/ButtonNav";
import Bio from "../components/Bio";
import SpotifyPlayer from "../components/SpotifyPlayer";
import SmoothRender from "../components/SmoothRender";
import Collage from "../components/Collage";

function Home() {
  return (
    <div>
      <div className="bg-gradient-to-b from-black via-[#0D1114] to-black h-screen">
        <img
          src={homeImg}
          alt="HomeImage"
          className="object-cover mx-auto h-screen pt-36"
        />
      </div>

      {/* main content */}
      <div className="p-2 pt-8 pb-16 mx-auto sm:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 grid gap-8 sm:gap-12">
        <SmoothRender>
          <Bio />
        </SmoothRender>

        <SmoothRender>
          <SpotifyPlayer link="https://open.spotify.com/embed/artist/4NZ0fCPxiuIaEHw9kUgURe?utm_source=generator&theme=0" />
          <br />
          <div className="flex justify-center">
            <ButtonNav title="See discography" to="/music" />
          </div>
        </SmoothRender>

        <SmoothRender>
          <div className="hidden xs:block w-full">
            <InstagramEmbed url="https://www.instagram.com/olalellingsen/?next=%2Fdetnyensb%2F" />
          </div>
        </SmoothRender>

        <Collage />
      </div>
    </div>
  );
}

export default Home;
