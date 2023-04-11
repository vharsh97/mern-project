import { Routes, Route } from "react-router-dom";
import TravelHistories from "./Components/TravelHistories";
import CreateTravelHistory from "./Components/CreateTravelHistory";

export const baseurl = "http://localhost:8082";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TravelHistories />} />
        <Route
          path="/create-travel-history"
          element={<CreateTravelHistory />}
        />
        <Route path="/*" element={<>Page Not Found 404</>} />
      </Routes>
    </div>
  );
}

export default App;
