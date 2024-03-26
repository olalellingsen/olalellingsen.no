import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Spinner from "../components/Spinner";

function Music() {
  const [albums, setAlbums] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumQuery = await getDocs(collection(db, "Discography"));
        const albumData = albumQuery.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        setAlbums(
          albumData
            .sort((a, b) => {
              const aid = a.id;
              const bid = b.id;
              return bid - aid;
            })
            .map((doc) => doc.spotify)
        );
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
    <div className="grid gap-2 mainContent">
      {/* Albums */}
      <h1>Music</h1>
      {albums.length === 0 && <Spinner />}
      <h2>Albums</h2>
      <div className="grid gap-2 md:grid-cols-2 sm:gap-4">
        {albums.map((album) => (
          <iframe
            src={album}
            className="album"
            width="100%"
            height="380"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default Music;
