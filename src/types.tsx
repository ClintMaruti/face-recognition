export interface FaceLandmarks {
    scaledMesh: [number, number, number][];
    annotations: {
        [key: string]: [number, number, number];
    };
}

export interface FacePrediction {
    boundingBox: {
        topLeft: [number, number];
        bottomRight: [number, number];
    };
    landmarks: FaceLandmarks;
}

export interface FaceEstimationResult {
    facePredictions: FacePrediction[];
}

interface AnnotatedPrediction {
    faceInViewConfidence: number;
    boundingBox: [[number, number], [number, number]];
    mesh: [number, number, number][];
    scaledMesh: [number, number, number][];
    annotations: {
        [key: string]: [number, number, number];
    };
    silhouette: Uint8Array;
}

export interface FaceMeshModel {
    estimateFaces(image: HTMLImageElement): Promise<AnnotatedPrediction[]>;
}
