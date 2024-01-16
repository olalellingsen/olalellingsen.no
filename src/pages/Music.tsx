import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
// import { db } from "../firebase";
import { ArrowDown, ArrowRight } from "lucide-react";

function Music({ id }: { id: string }) {
  const [albums, setAlbums] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const albumQuery = await getDocs(collection(db, "Albums"));
        // const albumData = albumQuery.docs.map((doc) =>
        //   doc.data()
        // ) as DocumentData[];
        // setAlbums(
        //   albumData
        //     .sort((a, b) => {
        //       const aid = a.id;
        //       const bid = b.id;
        //       return bid - aid;
        //     })
        //     .map((doc) => doc.url)
        // );
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, [id]); // Add 'id' as a dependency to refetch data when 'id' changes

  return (
    <div id={id} className="h-screen border border-black grid gap-2">
      {/* Albums */}
      <h1>Music</h1>
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
