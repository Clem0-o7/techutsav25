import { useRef, useState } from "react";
import "@/styles/button.css";

const theme = {
  eerieBlack: "#1C2127",
  berkeleyBlue: "#0B385F",
  uclaBlue: "#3373B0",
  columbiaBlue: "#BED4E9",
  aliceBlue: "#E7F1FB",
};

const Contact = () => {
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: form.current.user_name.value,
          user_email: form.current.user_email.value,
          message: form.current.message.value,
        }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    e.target.reset();
  };

  return (
    <section id="contact" className="h-screen flex items-center justify-center" style={{ backgroundColor: theme.eerieBlack, color: theme.aliceBlue }}>
      <div className="w-full pt-16 flex flex-col overflow-x-hidden md:px-9 pl-9" style={{ backgroundColor: theme.aliceBlue, color: theme.eerieBlack }}>
        {/* CONTACT Title */}
        <h1 className="text-4xl sm:text-6xl font-bold" style={{ color: theme.uclaBlue }}>CONTACT</h1>

        {/* Container - Reduced gap between heading and form */}
        <div className="w-full h-max flex flex-col-reverse sm:flex-row items-center justify-center sm:px-16 md:my-12 mb-14 mt-4 sm:mt-0">
          {/* Contact Form */}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="flex flex-col gap-6 p-8 mt-4 sm:mt-0 rounded-lg drop-shadow-[3px_5px_10px_rgba(0,0,0,0.25)]"
            style={{ backgroundColor: theme.aliceBlue }}
          >
            <div className="flex flex-col gap-3">
              <label className="font-semibold tracking-widest text-sm">Name</label>
              <input
                type="text"
                className="shadow appearance-none border rounded h-14 py-2 px-3 font-medium leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: theme.columbiaBlue }}
                placeholder="Enter your name"
                name="user_name"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold tracking-widest text-sm">Email</label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: theme.columbiaBlue }}
                placeholder="Enter your email"
                name="user_email"
                required
              />
            </div>
            <div className="flex flex-col gap-3">
              <label className="font-semibold tracking-widest text-sm">Message</label>
              <textarea
                rows="5"
                cols="60"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{ backgroundColor: theme.columbiaBlue }}
                placeholder="Message"
                name="message"
                required
              />
            </div>
            <button
              className={`px-7 py-1 fill-right hover:text-white border-2 rounded-md ${isSubmitHovered ? "hovered" : ""}`}
              style={{ borderColor: theme.uclaBlue, color: theme.uclaBlue }}
              onMouseEnter={() => setIsSubmitHovered(true)}
              onMouseLeave={() => setIsSubmitHovered(false)}
            >
              SUBMIT
            </button>
          </form>

          {/* Contact Info Section */}
          <div className="flex flex-col gap-6 sm:p-9 sm:w-1/2 text-justify">
            <h1 className="text-2xl font-semibold">Have A Question? Get In Touch!</h1>
            <p className="hidden sm:block">
              Thank you for visiting our website! If you have any questions or queries,
              drop us a message, and we&apos;ll get back to you promptly.
              Your time is valuable to us!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
