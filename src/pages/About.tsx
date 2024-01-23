import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { set } from "firebase/database";

function About({ id }: { id: string }) {
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
        // Fetch text data from Firestore
        const querySnapshot = await getDocs(collection(db, "About"));
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];

        // Set bio paragraphs
        setP1(bioData.p1);
        setP2(bioData.p2);
        setP3(bioData.p3);

        // Fetch image URL from Firebase Storage
        const url = await getDownloadURL(image);
        setImageUrl(url);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    // Call the function to fetch data
    fetchData();
  }, [image]); // Dependency on image to re-fetch data when the image changes

  return (
    <div className="" id={id}>
      <div className="pt-4 grid gap-4 md:grid-cols-2">
        <img src={imageUrl} alt="About picture" />
        <div>
          <p className="py-1">{p1}</p>
          <p className="py-1">{p2}</p>
          <p className="py-1">{p3}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
