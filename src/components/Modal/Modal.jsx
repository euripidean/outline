import { useDispatch } from "react-redux";
import { closeModal } from "../../features/outlineSlice";
function Modal(props) {
  const dispatch = useDispatch();
  const { id } = props;

  const handleClose = () => {
    dispatch(closeModal());
  };

  // here we'll figure out the logic of which form to render in the modal.

  return (
    <div
      className="bg-outline-white absolute top-[80px] left-0 h-[calc(100vh-80px)] w-full z-50"
      data-modal={id}
    >
      <div className="modal-content">
        <button
          onClick={handleClose}
          type="button"
          className="close-button"
          data-modal-toggle={id}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        {id === "new-card" ? "New Card Modal" : "Some rando modal"}
      </div>
    </div>
  );
}

export default Modal;
