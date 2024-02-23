import { useDispatch } from "react-redux";
import { removeGridCard } from "../../features/outlineSlice";

function SortableGridCardCloseButton(props) {
  const { id } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("button clicked");
    console.log("removeGridCard id", id);
    dispatch(removeGridCard(id));
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
