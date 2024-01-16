import { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function Home({ id }: { id: string }) {
  const [homeImage, setHomeImage] = useState("");

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

  //   // Call the function to fetch data
  //   fetchData();
  // }, [img]); // Dependency on img to re-fetch data when the image changes

  return (
    <div className="h-screen border" id={id}>
      {/* <img src={homeImage} alt="" className="my-4 sm:hidden" /> */}
      <h1>Home</h1>
    </div>
  );
}

export default Home;
