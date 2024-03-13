import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { InstagramEmbed } from "react-social-media-embed";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function About() {
  // Bio paragraphs
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [p3, setP3] = useState("");

  // Image
  const [imageUrl, setImageUrl] = useState("");
  const storage = getStorage();
  const image = ref(storage, "about.jpg");

  // Fetch about text and image URL from database

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch text data from Firestore only once
        const querySnapshot = await getDocs(collection(db, "About"));
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];

        // Set bio paragraphs
        setP1(bioData.p1);
        setP2(bioData.p2);
        setP3(bioData.p3);

        // Fetch image URL from Firebase Storage only once
        const url = await getDownloadURL(image);
        setImageUrl(url);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full lg:w-3/4 mx-auto">
      <h1>About</h1>
      <div className="grid gap-4 sm:gap-8">
        {/* <img src={imageUrl} alt="About picture" className="" /> */}
        <div>
          <p className="py-1">{p1}</p>
          <p className="py-1">{p2}</p>
          <p className="py-1">{p3}</p>
        </div>

        {/* <InstagramEmbed url="https://www.instagram.com/olalellingsen/?next=%2Fdetnyensb%2F" /> */}

        <iframe
          src="https://open.spotify.com/embed/artist/4NZ0fCPxiuIaEHw9kUgURe?utm_source=generator&theme=0"
          width="100%"
          height={380}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        <div className="flex justify-center">
          <Link to="/music">
            <button className="button">See discography</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
