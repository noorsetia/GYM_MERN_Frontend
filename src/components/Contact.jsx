import axios from "axios";
import api from "../service/apiClient";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    // client-side validation to avoid sending empty fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      setLoading(false);
      toast.error("Please fill in name, email and message before sending.");
      return;
    }
    try {
      // Use the centralized API wrapper which normalizes errors
      const data = await api.post("/send/mail", { name, email, message });
      setName("");
      setEmail("");
      setMessage("");
      toast.success(data.message || "Message Sent Successfully.");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Log full error in development for debugging
      if (process.env.NODE_ENV !== "production") {
        console.error("Contact form error:", error);
      }
      
      // Always show the actual error message from the backend
      // This includes Gmail limit errors, validation errors, etc.
      const errorMessage = error?.message || "Something went wrong. Please try again.";
      
      // For true network failures (server unreachable), show helpful message
      if (error && error.code === "NETWORK_ERROR") {
        toast.error(`Network error: ${errorMessage}. Please check if the server is running.`);
      } else {
        // Backend responded with an error - show the actual message
        toast.error(errorMessage);
      }
    }
  };

  return (
    <section className="contact">
      <form onSubmit={sendMail}>
        <h1>CONTACT US</h1>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {loading && <ClipLoader size={20} color="white" />}
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;