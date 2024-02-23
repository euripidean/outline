import { useDispatch } from "react-redux";
import { removeCardFromGrid } from "../../features/outlineSlice";

function SortableGridCardCloseButton(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(removeCardFromGrid(id));
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="absolute top-0 right-0 p-2 z-40"
      data-modal-toggle={id}
    >
      <i className="fa-solid fa-xmark"></i>
    </button>
  );
}

export default SortableGridCardCloseButton;
