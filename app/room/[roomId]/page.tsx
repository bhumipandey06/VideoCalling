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
  }, []);

  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      ref={containerRef}
    />
  );
};

export default Page;
