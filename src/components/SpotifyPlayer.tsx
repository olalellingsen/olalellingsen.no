function SpotifyPlayer({ link }: { link: string }) {
  return (
    <div>
      <iframe
        src={link}
        width="100%"
        height={380}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default SpotifyPlayer;
