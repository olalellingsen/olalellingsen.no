// import { useEffect, useState } from "react";
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import About from "../components/About";
import homeImg from "../assets/homeimg.jpg";

function Home() {
  // const [homeImage, setHomeImage] = useState("");

  // const storage = getStorage();
  // const img = ref(storage, "home.jpg");

  // // Fetch about text and image URL from database
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch image URL from Firebase Storage
  //       const url = await getDownloadURL(img);

  //       setHomeImage(url);
  //     } catch (error) {
  //       console.error(
  //         "Error connecting to Firestore or accessing Storage:",
  //         error
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <img
        src={homeImg}
        alt="HomeImage"
        className="object-cover w-full h-screen"
      />
      <About />
    </div>
  );
}

export default Home;
