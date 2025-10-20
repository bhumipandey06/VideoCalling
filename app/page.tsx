"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const roomId = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleJoin = () => {
    const id = roomId.current?.value.trim();
    if (id) router.push(`/room/${id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md text-center border border-gray-700">
        <h1 className="text-2xl font-semibold text-white mb-6">
          Join a Meeting
        </h1>
        <input
          type="text"
          placeholder="Enter Meeting ID"
          ref={roomId}
          className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4 bg-gray-700 text-white placeholder-gray-400 transition"
        />
        <button
          type="submit"
          onClick={handleJoin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
        >
          Join
        </button>
      </div>
    </div>
  );
  
  
}
