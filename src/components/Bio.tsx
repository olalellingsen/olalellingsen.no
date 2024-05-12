import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function Bio() {
  const { isSignedIn } = useAuth();
  let [responseBio, setResponseBio] = useState("");

  // Bio paragraphs
  const [Bio, setBio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch text data from Firestore only once
        const querySnapshot = await getDocs(collection(db, "About"));

        // Set bio paragraphs
        const bioData = querySnapshot.docs.map((doc) => doc.data())[0];
        setBio(bioData.Bio);
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

  return (
    <div>
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
    </div>
  );
}

export default Bio;
