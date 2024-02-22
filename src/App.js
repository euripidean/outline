import { useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Overview from "./components/Overview/Overview";
import Modal from "./components/Modal/Modal";
import "./index.css";

function App() {
  const showModal = useSelector((state) => state.outline.showModal);
  const modalId = useSelector((state) => state.outline.modalId);
  return (
    <div className="static">
      <NavBar userSignedIn={false} />
      {showModal && <Modal id={modalId}></Modal>}
      <Overview />
    </div>
  );
}

export default App;
