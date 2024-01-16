function Footer({ id }: { id: string }) {
  return (
    <div id={id} className="bg-primary text-white p-2 grid">
      <div>
        <h2 className="text-2xl">Contact</h2>
      </div>
      <p className="text-center">© 2024 My Template</p>
    </div>
  );
}

export default Footer;
