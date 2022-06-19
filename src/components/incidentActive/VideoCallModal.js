import { View, Text } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import Peer from "react-native-peerjs";

const VideoCallModal = () => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState();
  const userVideo = useRef();
  const myVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: true,
        });

        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      } catch (err) {
        console.log(err);
      }
    };
    getUserMedia();
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ tri });
  };

  return (
    <View>
      <Text>VideoCallModal</Text>
    </View>
  );
};

export default VideoCallModal;
