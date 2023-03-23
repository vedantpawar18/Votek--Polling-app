import "./App.css";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/Navbar";
function App() {

  return (
    <div className="App">
      <Navbar />
      <MainRoutes />
    </div>
  );
}

export default App;
