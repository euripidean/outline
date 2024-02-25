import { useDispatch } from "react-redux";
import { closeModal } from "../../features/outlineSlice";
import CardForm from "../CardForm/CardForm";
import ProjectForm from "../ProjectForm/ProjectForm";
function Modal(props) {
  const dispatch = useDispatch();
  const { id } = props;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const chooseForm = (id) => {
    switch (id) {
      case "new-card":
        return <CardForm id={id} action={"create"} />;
      case "update-card":
        return <CardForm id={id} action={"update"} />;
      case "new-project":
        return <ProjectForm action={"create"} />;
      case "update-project":
        return <ProjectForm action={"update"} />;
      default:
        return <div>Some rando modal</div>;
    }
  };

  return (
    <div
      className="bg-outline-white flex flex-col shadow-2xl p-2 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4 h-auto w-[60vw] z-50"
      data-modal={id}
    >
      <button
        onClick={handleClose}
        className="text-outline-bg p-1 rounded-md self-end hover:text-outline-gold transition-all duration-300 ease-in-out"
      >
        <i className="text-2xl fa-regular fa-circle-xmark"></i>
      </button>
      {/* // Button to close the modal to the top right hand corner */}
      <div className="w-full h-ful p-2 rounded-md overflow-y-auto">
        {chooseForm(id)}
      </div>
    </div>
  );
}

export default Modal;
