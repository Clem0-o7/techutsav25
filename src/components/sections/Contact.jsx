import { useRef, useState } from "react";
import "@/styles/button.css";

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
    <div className="w-full pt-16 flex flex-col overflow-x-hidden md:px-9 pl-9 bg-white text-black">
      {/* CONTACT Title */}
      <h1 className="text-4xl sm:text-6xl font-bold text-[#278092]">CONTACT</h1>

      {/* Container - Reduced gap between heading and form */}
      <div className="w-full h-max flex flex-col-reverse sm:flex-row items-center justify-center sm:px-16 md:my-12 mb-14 mt-4 sm:mt-0">
        {/* Contact Form */}
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col gap-6 bg-white p-8 mt-4 sm:mt-0 rounded-lg drop-shadow-[3px_5px_10px_rgba(0,0,0,0.25)]"
        >
          <div className="flex flex-col gap-3">
            <label className="font-semibold tracking-widest text-sm">Name</label>
            <input
              type="text"
              className="shadow appearance-none border rounded h-14 py-2 px-3 font-medium bg-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
              name="user_name"
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold tracking-widest text-sm">Email</label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full h-14 py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Message"
              name="message"
              required
            />
          </div>
          <button
            className={`px-7 py-1 fill-right hover:text-white border-2 border-[#278092] rounded-md ${isSubmitHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsSubmitHovered(true)}
            onMouseLeave={() => setIsSubmitHovered(false)}
          >
            SUBMIT
          </button>
        </form>

        {/* Contact Info Section */}
        <div className="flex flex-col gap-6 sm:p-9 sm:w-1/2 text-justify">
          <h1 className="text-2xl font-semibold">Have A Question? Get In Touch!</h1>
          <p>
            Thank you for visiting our website! If you have any questions or queries,
            drop us a message, and we&apos;ll get back to you promptly.
            Your time is valuable to us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
