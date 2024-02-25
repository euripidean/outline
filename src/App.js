import { useSelector } from "react-redux";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import NavBar from "./components/NavBar/NavBar";
import Overview from "./components/Overview/Overview";
import Modal from "./components/Modal/Modal";
import "./index.css";

function App() {
  const showModal = useSelector((state) => state.outline.showModal);
  const modalId = useSelector((state) => state.outline.modalId);
  const signedIn = useSelector((state) => state.outline.signedIn);

  return (
    <div className="static">
      {signedIn ? (
        <>
          <NavBar userSignedIn={signedIn} />
          {showModal && (
            <>
              <div className="fixed inset-0 bg-black transition-opacity opacity-50 z-10" />
              <Modal id={modalId}></Modal>
            </>
          )}
          <Overview />
        </>
      ) : (
        <WelcomeScreen />
      )}
    </div>
  );
}

export default App;
