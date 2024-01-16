import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { db } from "../firebase";

function About({ id }: { id: string }) {
  const [bio1, setBio1] = useState("");
  const [bio2, setBio2] = useState("");
  const [bio3, setBio3] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // const storage = getStorage();
  // const imagesRef = ref(storage, "about.jpg");

  // // Fetch about text and image URL from database
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch text data from Firestore
  //       // const querySnapshot = await getDocs(collection(db, "About"));
  //       // const bioData = querySnapshot.docs.map((doc) => doc.data())[0];

  //       // Fetch image URL from Firebase Storage
  //       const url = await getDownloadURL(imagesRef);
  //       setImageUrl(url);
  //     } catch (error) {
  //       console.error(
  //         "Error connecting to Firestore or accessing Storage:",
  //         error
  //       );
  //     }
  //   };

  //   // Call the function to fetch data
  //   fetchData();
  // }, [imagesRef]); // Dependency on imagesRef to re-fetch data when the image changes

  return (
    <div className="h-screen border" id={id}>
      <h1>About</h1>
      <div className="pt-4 grid gap-4 mx-auto md:w-4/5 xl:w-2/3">
        <img src={imageUrl} alt="About picture" />
        <p>{bio1}</p>
        <p>{bio2}</p>
        <p>{bio3}</p>
      </div>
    </div>
  );
}

export default About;
