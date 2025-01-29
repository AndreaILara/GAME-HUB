import { useState } from "react";
import emailjs from "@emailjs/browser"; // Importamos EmailJS
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Suggestions.css";

const Suggestions = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_c05fsft", // Reemplaza con tu Service ID
        "template_xy7usoh", // Reemplaza con tu Template ID
        formData,
        "QQcGGblHx4Sgc--kC" // Reemplaza con tu Public Key
      )
      .then(
        (response) => {
          console.log("Mensaje enviado con éxito:", response);
          toast.success("✅ ¡Mensaje enviado con éxito!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setFormData({ name: "", email: "", message: "" }); // Reseteamos el formulario
        },
        (error) => {
          console.error("Error al enviar el mensaje:", error);
          toast.error("❌ Error al enviar el mensaje. Intenta de nuevo.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <div className="suggestions-container">
      <h1>💡 Envíanos tus sugerencias</h1>
      <p>¿Tienes alguna idea para mejorar la app o los juegos? Déjanos tu mensaje.</p>

      <form className="suggestions-form" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mensaje:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Enviar Sugerencia</button>
      </form>
    </div>
  );
};

export default Suggestions;
