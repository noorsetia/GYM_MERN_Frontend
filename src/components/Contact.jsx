import axios from "axios";
import apiClient from "../service/axios.config";
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
      // Use the shared API client which already has the correct baseURL for production
      const { data } = await apiClient.post(
        "/send/mail",
        { name, email, message },
        { headers: { "Content-Type": "application/json" } }
      );
      setName("");
      setEmail("");
      setMessage("");
      toast.success(data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Network errors or CORS failures often don't include `response`.
      if (!error || !error.response) {
        // This is a network error (server unreachable, DNS, CORS preflight failed, etc.)
        toast.error("Network error: could not reach server. Please try again later.");
      } else {
        const message = error.response?.data?.message || error.message || "Something went wrong";
        toast.error(message);
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