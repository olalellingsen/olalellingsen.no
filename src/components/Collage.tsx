import SmoothRender from "./SmoothRender";

function Collage() {
  const images = [
    "https://source.unsplash.com/1600x900/?nature",
    "https://source.unsplash.com/1600x900/?water",
    "https://source.unsplash.com/1600x900/?mountain",
    "https://source.unsplash.com/1600x900/?forest",
    "https://source.unsplash.com/1600x900/?sky",
    "https://source.unsplash.com/1600x900/?clouds",
    "https://source.unsplash.com/1600x900/?sunset",
    "https://source.unsplash.com/1600x900/?sunrise",
    "https://source.unsplash.com/1600x900/?moon",
    "https://source.unsplash.com/1600x900/?stars",
    "https://source.unsplash.com/1600x900/?night",
    "https://source.unsplash.com/1600x900/?day",
  ];

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <img
            src={image}
            alt={`CollageImage${index}`}
            className="object-cover w-full h-48 sm:h-64"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Collage;
