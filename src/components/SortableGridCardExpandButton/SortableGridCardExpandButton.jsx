import { useDispatch } from "react-redux";
import { openModal } from "../../features/outlineSlice";

function SortableGridCardExpandButton(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const handleExpand = () => {
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

export default SortableGridCardExpandButton;
