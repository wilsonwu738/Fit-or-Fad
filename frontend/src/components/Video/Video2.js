import "./Video.css";
import React, { useRef, useEffect } from "react";
import background from "../../images/video/4k.mp4"

function Video() {
    const videoRef = useRef();

    useEffect(() => {
        videoRef.current.autoplay = true;
        videoRef.current.loop = true;
        videoRef.current.muted = true;
    }, []);

    return (
        <div id="video">
            <video
                ref={videoRef}
                className="video-background"
                src={background}
            ></video>
        </div>
    );
}

export default Video;