function WhatsAppFloatingg() {
  const phoneNumber = "919345864907";

  const message = encodeURIComponent(
    "Hi 👋 Welcome to Knitora! How can I help you today? What are you looking for?"
  );

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappLink}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
    >
      💬
    </a>
  );
}

export default WhatsAppFloatingg;
