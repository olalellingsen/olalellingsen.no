import { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import homeImg from "../assets/homeimg1.jpg";
import ButtonNav from "../components/ButtonNav";
import Bio from "../components/Bio";
import SpotifyPlayer from "../components/SpotifyPlayer";
import SmoothRender from "../components/SmoothRender";
import Collage from "../components/Collage";

function Home() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 640) {
        const maxScroll = 100;
        const scrollTop = window.scrollY;
        const opacity = Math.max(1 - scrollTop / maxScroll, 0);
        setScrollOpacity(opacity);
      } else {
        setScrollOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* home image */}
      <div
        className="h-screen"
        style={{
          backgroundColor: `rgba(7,8,10, ${scrollOpacity})`,
        }}
      >
        <SmoothRender>
          <img
            src={homeImg}
            alt="HomeImage"
            className="mx-auto object-cover h-screen pt-36"
          />
        </SmoothRender>
      </div>

      {/* main content */}
      <div className="p-2 pt-8 mx-auto sm:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 grid gap-8 sm:gap-12">
        <SmoothRender delay={500}>
          <Bio />
        </SmoothRender>

        <SmoothRender delay={500}>
          <SpotifyPlayer link="https://open.spotify.com/embed/artist/4NZ0fCPxiuIaEHw9kUgURe?utm_source=generator&theme=0" />
          <br />
          <div className="flex justify-center">
            <ButtonNav title="See discography" to="/music" />
          </div>
        </SmoothRender>

        <SmoothRender delay={500}>
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
