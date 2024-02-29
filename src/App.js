import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "./features/outlineSlice";
import useInitializeApp from "./hooks/useInitializeApp";
import WelcomeScreen from "./components/WelcomeScreen/WelcomeScreen";
import NavBar from "./components/NavBar/NavBar";
import Overview from "./components/Overview/Overview";
import Modal from "./components/Modal/Modal";
import Toast from "./components/Toast/Toast";
import "./index.css";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.outline.showModal);
  const showToast = useSelector((state) => state.outline.showToast);
  const toastMessage = useSelector((state) => state.outline.toastMessage);
  const modalId = useSelector((state) => state.outline.modalId);
  const userId = useSelector((state) => state.outline.userId);
  const signedIn = useSelector((state) => state.outline.signedIn);
  const activeProject = useSelector((state) => state.outline.activeProject);

  const { projectsLoading, lastUpdatedLoading } = useInitializeApp(userId);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showToast) {
        dispatch(hideToast());
      }
    }, 3000);
    return () => clearTimeout(timeoutId);
  });

  if (projectsLoading || lastUpdatedLoading) {
    return <div>Loading...</div>;
  }

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
          <Overview project={activeProject} />
          {showToast && (
            <>
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 shadow-xl animate-slide-up">
                <Toast message={toastMessage} />
              </div>
            </>
          )}
        </>
      ) : (
        <WelcomeScreen />
      )}
    </div>
  );
}

export default App;
