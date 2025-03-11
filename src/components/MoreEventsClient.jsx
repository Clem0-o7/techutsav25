"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MoreEventsClient = ({ events, department }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (!events || events.length === 0) {
    return (
      <div className="text-center mt-10 text-lg">
        No events found for {department}
      </div>
    );
  }

  const currentEvent = events[currentIndex];
  const baseUrl = "https://clement2004.blob.core.windows.net/techutsav25";
  const jpgUrl = `${baseUrl}/${currentEvent.uniqueName}.jpg`;
  const pngUrl = `${baseUrl}/${currentEvent.uniqueName}.png`;

  const [imageUrl, setImageUrl] = useState(jpgUrl);
  const handleImageError = (e) => {
    if (e.currentTarget.src === jpgUrl) {
      setImageUrl(pngUrl);
    } else {
      setImageUrl("/images/placeholder.png");
    }
  };

  const handleThumbError = (e, event) => {
    const eventJpgUrl = `${baseUrl}/${event.uniqueName}.jpg`;
    const eventPngUrl = `${baseUrl}/${event.uniqueName}.png`;
    if (e.currentTarget.src === eventJpgUrl) {
      e.currentTarget.src = eventPngUrl;
    } else {
      e.currentTarget.src = "/images/placeholder.png";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4 md:px-8 py-8">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-gray-800">
        Events for {department}
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
        <div className="lg:w-1/2">
          <Image
            src={imageUrl}
            alt={currentEvent.uniqueName}
            width={800}
            height={500}
            className="object-cover rounded-xl shadow-2xl"
            onError={handleImageError}
          />
        </div>
        <div className="lg:w-1/2 p-8 rounded-xl shadow-2xl bg-white bg-opacity-90">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {currentEvent.eventName}
          </h2>
          <p className="mt-2 text-xl text-gray-700">
            {currentEvent.eventAbstract}
          </p>
          <p className="mt-2 text-xl text-gray-700">
            <strong>Time:</strong> {currentEvent.eventTiming}
          </p>
          <button
            className="mt-6 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            onClick={() => setModalOpen(true)}
          >
            More Details
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto py-8 gap-6 justify-center mt-8">
        {events.map((event, index) => {
          const eventJpgUrl = `${baseUrl}/${event.uniqueName}.jpg`;
          return (
            <Image
              key={event._id}
              src={eventJpgUrl}
              alt={event.uniqueName}
              width={120}
              height={120}
              className={`object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                index === currentIndex
                  ? "border-4 border-blue-600 scale-110"
                  : "border-2 border-gray-300"
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setImageUrl(`${baseUrl}/${event.uniqueName}.jpg`);
              }}
              onError={(e) => handleThumbError(e, event)}
            />
          );
        })}
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
              {currentEvent.eventName}
            </h2>
            <div className="max-h-[60vh] overflow-y-auto text-xl text-gray-700 space-y-4">
              <p>{currentEvent.eventDesp}</p>
              <p>
                <strong>Contact:</strong> {currentEvent.incharge}
              </p>
              <p>
                <strong>Mobile:</strong> {currentEvent.inchargeNumber}
              </p>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoreEventsClient;
