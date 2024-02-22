import { useDispatch } from "react-redux";
import { openModal } from "../../features/outlineSlice";

function Button(props) {
  const { text, id } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal(id));
  };

  return (
    <button
      id={id}
      data-modal-toggle={id}
      type="button"
      className="border p-2"
      onClick={handleClick}
    >
      {text} <i className="fa-solid fa-circle-plus p-1"></i>
    </button>
  );
}

export default Button;
