import { useState } from "react";
import emailjs from "@emailjs/browser"; // EmailJS for sending emails
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
        "service_c05fsft", // Replace with your Service ID
        "template_xy7usoh", // Replace with your Template ID
        formData,
        "QQcGGblHx4Sgc--kC" // Replace with your Public Key
      )
      .then(
        (response) => {
          console.log("Message sent successfully:", response);
          toast.success("✅ Message sent successfully!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setFormData({ name: "", email: "", message: "" }); // Reset form
        },
        (error) => {
          console.error("Error sending message:", error);
          toast.error("❌ Error sending message. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <div className="suggestions-container">
      <h1>💡 Send Us Your Suggestions</h1>
      <p>Do you have any ideas to improve the app or the games? Let us know!</p>

      <form className="suggestions-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Send Suggestion</button>
      </form>
    </div>
  );
};

export default Suggestions;
