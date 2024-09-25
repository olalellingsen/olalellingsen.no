import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import SmoothRender from "./SmoothRender";

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const Collage: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [shuffledIndexes, setShuffledIndexes] = useState<number[]>([]);

  useEffect(() => {
    const storage = getStorage();
    const fetchImages = async () => {
      const imagesRef = ref(storage, "Collage/");
      const imageList = await listAll(imagesRef);
      const imagePromises = imageList.items.map((item) => getDownloadURL(item));
      const imageUrls = await Promise.all(imagePromises);

      setImages(imageUrls);

      // Create an array of indexes and shuffle it
      const indexes = Array.from({ length: imageUrls.length }, (_, i) => i);
      setShuffledIndexes(shuffleArray(indexes));
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {shuffledIndexes.map((index) => (
          <SmoothRender index={index} delay={200}>
            <img
              key={index}
              src={images[index]}
              alt={`CollageImage${index}`}
              className="object-cover w-full h-48 sm:h-64"
            />
          </SmoothRender>
        ))}
      </div>
    </div>
  );
};

export default Collage;
