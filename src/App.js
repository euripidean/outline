import "./index.css";
import NavBar from "./components/NavBar/NavBar";
import Overview from "./components/Overview/Overview";

function App() {
  return (
    <div>
      <NavBar userSignedIn={false} />
      <Overview />
    </div>
  );
}

export default App;
