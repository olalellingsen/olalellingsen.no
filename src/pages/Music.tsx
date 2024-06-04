import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";
import SmoothRender from "../components/SmoothRender";
import { useAuth } from "../context/AuthContext";
import ConfirmationDialog from "../components/ConfirmationDialog";

function Music() {
  const { isSignedIn } = useAuth();

  const [albums, setAlbums] = useState<DocumentData[]>([]);
  const [singles, setSingles] = useState<DocumentData[]>([]);

  const [spotifyLink, setSpotifyLink] = useState("");
  const [isAlbum, setIsAlbum] = useState(true);
  const [releaseYear, setReleaseYear] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<string | null>(null); // "album" or "single"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumQuery = await getDocs(collection(db, "Albums"));
        const singleQuery = await getDocs(collection(db, "Singles"));

        const albumData = albumQuery.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DocumentData[];

        const singleData = singleQuery.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as DocumentData[];

        setAlbums(albumData.sort((a, b) => b.releaseYear - a.releaseYear));
        setSingles(singleData.sort((a, b) => b.releaseYear - a.releaseYear));
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleAddOrUpdateRelease = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const releaseData = {
        spotify: spotifyLink,
        releaseYear: parseInt(releaseYear),
      };

      if (isEditing && editId) {
        // Update existing release
        const collectionName = isAlbum ? "Albums" : "Singles";
        await updateDoc(doc(db, collectionName, editId), releaseData);
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new release document to Firestore
        const collectionName = isAlbum ? "Albums" : "Singles";
        await addDoc(collection(db, collectionName), releaseData);
      }

      setSpotifyLink("");
      setReleaseYear("");

      // Fetch updated data
      const albumQuery = await getDocs(collection(db, "Albums"));
      const albumDataUpdated = albumQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DocumentData[];
      setAlbums(albumDataUpdated.sort((a, b) => b.releaseYear - a.releaseYear));

      const singleQuery = await getDocs(collection(db, "Singles"));
      const singleDataUpdated = singleQuery.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as DocumentData[];
      setSingles(
        singleDataUpdated.sort((a, b) => b.releaseYear - a.releaseYear)
      );

      console.log("Release added/updated successfully!");
    } catch (error) {
      console.error("Error adding/updating release:", error);
    }
  };

  const handleEditRelease = (id: string, type: string) => {
    const releaseToEdit =
      type === "album"
        ? albums.find((album) => album.id === id)
        : singles.find((single) => single.id === id);
    if (releaseToEdit) {
      setSpotifyLink(releaseToEdit.spotify);
      setReleaseYear(releaseToEdit.releaseYear.toString());
      setIsEditing(true);
      setEditId(id);
      setIsAlbum(type === "album");
    }
  };

  const handleDeleteRelease = (id: string, type: string) => {
    setDeleteId(id);
    setDeleteType(type);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId && deleteType) {
      try {
        const collectionName = deleteType === "album" ? "Albums" : "Singles";
        await deleteDoc(doc(db, collectionName, deleteId));

        if (deleteType === "album") {
          setAlbums(albums.filter((album) => album.id !== deleteId));
        } else {
          setSingles(singles.filter((single) => single.id !== deleteId));
        }

        console.log(
          `${deleteType === "album" ? "Album" : "Single"} deleted successfully!`
        );
      } catch (error) {
        console.error(`Error deleting ${deleteType}:`, error);
      } finally {
        setIsDialogOpen(false);
        setDeleteId(null);
        setDeleteType(null);
      }
    }
  };

  return (
    <div className="grid gap-4 mainContent">
      <h1>Music</h1>

      {isSignedIn && (
        <div className="my-8 rounded-lg text-center w-full sm:w-1/2 mx-auto">
          <h2>{isEditing ? "Edit album/single" : "Add album/single"}</h2>
          <form className="grid gap-2" onSubmit={handleAddOrUpdateRelease}>
            <input
              type="url"
              placeholder="Spotify Link"
              value={spotifyLink}
              onChange={(e) => setSpotifyLink(e.target.value)}
              required
            />
            <div className="flex justify-center">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="album"
                  checked={isAlbum}
                  onChange={() => setIsAlbum(true)}
                />
                Album
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="single"
                  checked={!isAlbum}
                  onChange={() => setIsAlbum(false)}
                />
                Single
              </label>
            </div>
            <input
              type="number"
              placeholder="Release Year"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
            />
            <button className="button" type="submit">
              {isEditing ? "Update album/single" : "Add album/single"}
            </button>
          </form>
        </div>
      )}

      {albums.length === 0 && <Spinner />}

      <h2>Albums</h2>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
        {albums.map((album, index) => (
          <SmoothRender index={index} delay={300}>
            <iframe
              src={album.spotify}
              width="100%"
              height="360"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>

            {isSignedIn && (
              <div className="flex justify-between mt-2">
                <button
                  className="button"
                  onClick={() => handleEditRelease(album.id, "album")}
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() => handleDeleteRelease(album.id, "album")}
                >
                  Delete
                </button>
              </div>
            )}
          </SmoothRender>
        ))}
      </div>

      <br />

      <h2>Singles</h2>
      <div className="grid gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 2xl:grid-cols-4">
        {singles.map((single, index) => (
          <SmoothRender index={index} delay={50}>
            <iframe
              src={single.spotify}
              width="100%"
              height="160"
              loading="lazy"
            ></iframe>

            {isSignedIn && (
              <div className="flex justify-between mt-2">
                <button
                  className="button"
                  onClick={() => handleEditRelease(single.id, "single")}
                >
                  Edit
                </button>
                <button
                  className="button"
                  onClick={() => handleDeleteRelease(single.id, "single")}
                >
                  Delete
                </button>
              </div>
            )}
          </SmoothRender>
        ))}
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        message="Are you sure you want to delete this?"
        onConfirm={confirmDelete}
        onCancel={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

export default Music;
