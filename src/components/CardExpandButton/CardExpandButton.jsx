import { useDispatch } from "react-redux";
import { openModal, setActiveCard } from "../../features/outlineSlice";

function CardExpandButton(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const handleExpand = () => {
    dispatch(setActiveCard(id));
    dispatch(openModal("update-card"));
  };

  return (
    <button
      onClick={handleExpand}
      type="button"
      className="absolute bottom-0 right-0 p-2 z-40"
      data-modal-toggle={id}
    >
      <i className="fa-solid fa-expand"></i>
    </button>
  );
}

export default CardExpandButton;
