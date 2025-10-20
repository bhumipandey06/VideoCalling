"use client";

import { useParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

let ZegoUIKitPrebuilt: any;
if (typeof window !== "undefined") {
  ZegoUIKitPrebuilt = require('@zegocloud/zego-uikit-prebuilt').ZegoUIKitPrebuilt;
}

const Page = () => {
  const { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const myMeeting = async (element: HTMLDivElement) => {
    const appID = 1575355159;
    const serverSecret = "205ffa826514ea6a8904e66bf029d7e4";

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId?.toString() || "",
      Date.now().toString(),
      "Bhumi"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url:
            window.location.protocol +
            '//' +
            window.location.host +
            window.location.pathname +
            '?roomID=' +
            roomId,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneOnOneCall, // fixed typo (OneONoneCall → OneOnOneCall)
      },
      showPreJoinView: true, // important to show the share link
    });
  };

  useEffect(() => {
    if (!containerRef.current) {
      console.log("Container Not Found.");
      return;
    }
    containerRef.current.innerHTML = ""; // cleanup old content
    myMeeting(containerRef.current);
  },[]);

  return (
    <div className="flex flex-col h-screen w-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-slate-800/70 backdrop-blur-md shadow-lg">
        <h1 className="text-xl font-semibold tracking-wide">💬 Video Call</h1>
        <span className="text-sm text-gray-300">
          Room: <span className="font-mono">{roomId}</span>
        </span>
      </header>

      {/* Video Container */}
      <div
        ref={containerRef}
        className="flex-1 m-4 rounded-xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950/40 relative"
      />

      {/* Footer */}
      <footer className="py-2 text-center text-xs text-gray-500 border-t border-slate-700">
        Powered by <span className="text-blue-400 font-medium">BP</span>
      </footer>
    </div>
  );
  
  
};

export default Page;
