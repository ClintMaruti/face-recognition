import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FaceRecognition } from "./FaceRecognition";

export function VideoFeed() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [capturedImages, setCapturedImages] = useState<string[]>([]);
    const [stream, setStream] = useState<MediaStream | null>(null);

    useEffect(() => {
        startVideo();

        return () => {
            stopVideo();
        };
    }, []);

    const startVideo = () => {
        setStream(null);
        setCapturedImages([]);
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((videoStream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;
                    setStream(videoStream);
                }
            })
            .catch((err) => console.error(err));
    };

    const stopVideo = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    const handleCapture = () => {
        setStream(null);
        if (videoRef.current) {
            const canvas = document.createElement("canvas");
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL("image/png"); // Convert to base64
            setCapturedImages([...capturedImages, imageUrl]);
        }
    };
    return (
        <>
            <div className="video-box">
                <video ref={videoRef} autoPlay playsInline />

                <div className="button-wrapper">
                    {stream ? (
                        <Button onClick={stopVideo} variant="outline-danger">
                            Stop Video
                        </Button>
                    ) : (
                        <Button onClick={startVideo} variant="outline-primary">
                            Start Video
                        </Button>
                    )}
                    <Button onClick={handleCapture}>Capture Image</Button>
                </div>
            </div>
            <div className="video-thumbnails">
                {/* {capturedImages.map((image, index) => (
                    <Card key={index} style={{ width: "300px" }}>
                        <Card.Img variant="top" src={image} />
                    </Card>
                ))} */}
                {capturedImages.length ? capturedImages.map((img) => <FaceRecognition imageUrl={img} />) : null}
            </div>
        </>
    );
}
