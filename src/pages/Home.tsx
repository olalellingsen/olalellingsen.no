import { InstagramEmbed } from "react-social-media-embed";
import homeImg from "../assets/homeimg.jpg";
import ButtonNav from "../components/ButtonNav";
import Bio from "../components/Bio";
import SpotifyPlayer from "../components/SpotifyPlayer";

import { InView } from "react-intersection-observer";

function Home() {
  return (
    <div>
      <img
        src={homeImg}
        alt="HomeImage"
        className="object-cover w-full h-screen"
      />

      <div className="p-2 pt-8 pb-16 mx-auto sm:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 grid gap-8 sm:gap-12">
        <Bio />

        <InView>
          {({ inView, ref }) => (
            <div
              className={`transition-opacity duration-1000 ease-in-out ${
                inView ? "opacity-100" : "opacity-0"
              }`}
              ref={ref}
            >
              <div className="hidden xs:block w-full">
                <InstagramEmbed url="https://www.instagram.com/olalellingsen/?next=%2Fdetnyensb%2F" />
              </div>
            </div>
          )}
        </InView>

        <InView>
          {({ inView, ref }) => (
            <div
              className={`transition-opacity duration-1000 ease-in-out ${
                inView ? "opacity-100" : "opacity-0"
              }`}
              ref={ref}
            >
              <SpotifyPlayer link="https://open.spotify.com/embed/artist/4NZ0fCPxiuIaEHw9kUgURe?utm_source=generator&theme=0" />
              <br />
              <div className="flex justify-center">
                <ButtonNav title="See discography" to="/music" />
              </div>
            </div>
          )}
        </InView>
      </div>
    </div>
  );
}

export default Home;
