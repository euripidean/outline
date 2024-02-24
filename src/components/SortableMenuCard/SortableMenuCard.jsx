import { useSortable } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import { addCardToGrid } from "../../features/outlineSlice";
import { CSS } from "@dnd-kit/utilities";

export function MenuCard(props) {
  const { id, title } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addCardToGrid(id));
  };

  return (
    <div
      className="bg-outline-light w-full flex flex-row bg-outline-black items-center p-2 border border-outline-bg m-1 shadow-outline-bg shadow-sm"
      id={id}
      onClick={handleClick}
    >
      <i className="fa-solid fa-grip-vertical m-2"></i>
      <h2>{title}</h2>
    </div>
  );
}

export function SortableMenuCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MenuCard id={props.id} title={props.title} text={props.text} />
    </div>
  );
}
