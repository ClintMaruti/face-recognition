import * as facemesh from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import React, { useEffect, useState } from "react";

interface Props {
    imageUrl: string;
}

export const FaceRecognition: React.FC<Props> = ({ imageUrl }) => {
    const [modelLoaded, setModelLoaded] = useState(false);
    const [predictions, setPredictions] = useState<facemesh.AnnotatedPrediction[]>([]);

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
    }, [imageUrl]);

    const detectFaces = async (model: facemesh.FaceMesh) => {
        try {
            const imageElement = document.getElementById("sample-image") as HTMLImageElement;
            const predictions = await model.estimateFaces(imageElement);
            setPredictions(predictions);
        } catch (error) {
            console.error("Error detecting faces:", error);
        }
    };

    return (
        <div>
            {modelLoaded && (
                <div style={{ position: "relative", display: "flex" }}>
                    <img id="sample-image" src={imageUrl} alt="Sample" />
                    {predictions.map((prediction, predictionIndex) => (
                        <>
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
                            ></div>
                            <div>
                                {/* Render landmarks */}
                                {Array.isArray(prediction.scaledMesh)
                                    ? prediction.scaledMesh.map((point, pointIndex) => (
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
                                      ))
                                    : null}
                            </div>
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};
