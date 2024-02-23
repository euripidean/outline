import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function MenuCard(props) {
  const { id, title } = props;
  return (
    <div
      className="bg-outline-light flex flex-row bg-outline-black items-center p-2 border border-outline-bg m-1 shadow-outline-bg shadow-sm transition-all duration-300 ease-in-out"
      id={id}
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
