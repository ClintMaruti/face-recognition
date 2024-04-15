import * as blazeface from "@tensorflow-models/blazeface";
import React, { useEffect, useRef } from "react";

const FaceRecognition: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const runFaceDetection = async () => {
            const model = await blazeface.load();
            const returnTensors = false;
            if (videoRef.current) {
                const predictions = await model.estimateFaces(videoRef.current, returnTensors);
                console.log(predictions);
            }
        };

        if (videoRef.current) {
            runFaceDetection();
        }
    }, []);

    return <div className="text-box">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus, porro! Totam facilis rerum porro necessitatibus, eveniet accusantium recusandae voluptates fuga fugit dolor sit dolore pariatur repellendus ut architecto, delectus debitis?</div>;
};

export default FaceRecognition;
