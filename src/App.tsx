import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { VideoFeed } from "./components/VideoFeed";

function App() {
    return (
        <div className="container">
            {/* Video Feed */}
            <VideoFeed />
            {/* <FaceRecognition /> */}
            {/* <Button variant="outline-dark">Upload </Button>{" "} */}
        </div>
    );
}

export default App;
