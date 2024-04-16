import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";

interface Props {
    imageUrls: string[];
}

export const FaceRecognition: React.FC<Props> = ({ imageUrls }) => {
    const [modelLoaded, setModelLoaded] = useState(false);
    const [predictions, setPredictions] = useState<facemesh.AnnotatedPrediction[][]>([]);

    useEffect(() => {
        async function loadModel() {
            try {
                await tf.setBackend("webgl");
                const model = await facemesh.load();
                setModelLoaded(true);
                detectFaces(model);
            } catch (error) {
                console.error("Error loading model:", error);
            }
        }
        loadModel();
    }, [imageUrls]);

    const detectFaces = async (model: facemesh.FaceMesh) => {
        try {
            const predictionsArray: facemesh.AnnotatedPrediction[][] = [];
            for (let i = 0; i < imageUrls.length; i++) {
                const imageElement = document.getElementById(`sample-image-${i}`) as HTMLImageElement;
                const predictions = await model.estimateFaces(imageElement);
                predictionsArray.push(predictions);
            }
            setPredictions(predictionsArray);
        } catch (error) {
            console.error("Error detecting faces:", error);
        }
    };

    return (
        <div>
            {predictions.map((imagePredictions, imageIndex) => (
                <div key={imageIndex}>
                    {imagePredictions.map((prediction, predictionIndex) => (
                        <div
                            key={predictionIndex}
                            style={{
                                position: "absolute",
                                top: prediction.boundingBox.topLeft[1],
                                left: prediction.boundingBox.topLeft[0],
                                width: prediction.boundingBox.bottomRight[0] - prediction.boundingBox.topLeft[0],
                                height: prediction.boundingBox.bottomRight[1] - prediction.boundingBox.topLeft[1],
                                border: "2px solid red",
                            }}
                        >
                            {/* Render landmarks */}
                            {Object.values(prediction.landmarks.annotations).map((point, pointIndex) => (
                                <div
                                    key={pointIndex}
                                    style={{
                                        position: "absolute",
                                        top: point[1],
                                        left: point[0],
                                        width: "4px",
                                        height: "4px",
                                        backgroundColor: "red",
                                        borderRadius: "50%",
                                    }}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
