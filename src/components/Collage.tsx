import { useEffect, useState } from "react";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
import SmoothRender from "./SmoothRender";

function Collage() {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const storage = getStorage();
    const fetchImages = async () => {
      const imagesRef = ref(storage, "Collage/");
      const imageList = await listAll(imagesRef);
      const imagePromises = imageList.items.map((item) => getDownloadURL(item));
      const imageUrls = await Promise.all(imagePromises);
      setImages(imageUrls);
    };

    fetchImages();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <SmoothRender index={index}>
            <img
              src={image}
              alt={`CollageImage${index}`}
              className="object-cover w-full h-48 sm:h-64"
              key={index}
            />
          </SmoothRender>
        ))}
      </div>
    </div>
  );
}

export default Collage;
