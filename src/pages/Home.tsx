import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import About from "../components/About";

function Home() {
  const [homeImage, setHomeImage] = useState("");

  const storage = getStorage();
  const img = ref(storage, "home.jpg");

  // Fetch about text and image URL from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch image URL from Firebase Storage
        const url = await getDownloadURL(img);

        setHomeImage(url);
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
    <div className="grid gap-8 md:gap-12">
      <img src={homeImage} alt="HomeImage" className="w-full" />
      <About />
    </div>
  );
}

export default Home;
