import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { InstagramEmbed } from "react-social-media-embed";
import { useAuth } from "../context/AuthContext";
import ButtonNav from "./ButtonNav";

function About() {
  const { isSignedIn } = useAuth();
  let [responseBio, setResponseBio] = useState("");
  let [responseSpotify, setResponseSpotify] = useState("");

  // Spotify link
  const [spotify, setSpotify] = useState("");

  // Bio paragraphs
  const [Bio, setBio] = useState("");

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

        // Set bio paragraphs
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];
        setBio(bioData.Bio);

        // Set Spotify link
        const spotify = querySnapshot.docs.map((doc) => doc.data())[1];
        setSpotify(spotify.Link);

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

  const handleUpdateBio = async () => {
    try {
      await updateDoc(doc(db, "About", "Bio"), {
        Bio,
      });
      setResponseBio("Text updated successfully!");
      // Clear response text after 2 seconds
      setTimeout(() => {
        setResponseBio("");
      }, 2000);
    } catch (error) {
      setResponseBio("Error updating text");
    }
  };

  const handleUpdateSpotify = async () => {
    try {
      await updateDoc(doc(db, "About", "Spotify"), {
        Link: spotify, // Use the spotify state variable here
      });
      setResponseSpotify("Link updated successfully!");
      // Clear response text after 2 seconds
      setTimeout(() => {
        setResponseSpotify("");
      }, 2000);
    } catch (error) {
      setResponseSpotify("Error updating link");
    }
  };

  return (
    <div className="p-2 py-4 sm:py-8 mx-auto sm:w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 grid gap-4 sm:gap-8">
      {/* about text */}
      {isSignedIn ? (
        <div>
          <h2>Edit about</h2>
          <textarea
            value={Bio}
            onChange={(e) => setBio(e.target.value)}
            rows={15}
            style={{ maxWidth: "100%", width: "100%" }} // Add this style to limit width
          />
          <div className="flex gap-4">
            <button className="button w-max" onClick={handleUpdateBio}>
              Save Changes
            </button>
            <p>{responseBio}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Render plain text paragraphs when user is not logged in */}
          <div>
            {Bio.split("\n").map((paragraph, index) => (
              <p className="py-1" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </>
      )}

      {/* collage */}
      <img src={imageUrl} alt="About picture" className="w-full" />

      {/* instagram */}
      <div className="hidden xs:block w-full">
        <InstagramEmbed url="https://www.instagram.com/olalellingsen/?next=%2Fdetnyensb%2F" />
      </div>

      {/* spotify player */}
      <div>
        <iframe
          src={spotify}
          width="100%"
          height={380}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>

        {/* Edit spotify link */}
        {isSignedIn && (
          <div>
            <input
              type="text"
              value={spotify}
              onChange={(e) => setSpotify(e.target.value)}
              className="w-full my-2"
            />
            <div className="flex gap-4">
              <button className="button w-max" onClick={handleUpdateSpotify}>
                Save Changes
              </button>
              <p>{responseSpotify}</p>
            </div>
          </div>
        )}

        <br />
        <div className="flex justify-center">
          <ButtonNav title="See discography" to="/music" />
        </div>
      </div>
    </div>
  );
}

export default About;
