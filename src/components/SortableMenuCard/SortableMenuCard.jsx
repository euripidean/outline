import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function MenuCard(props) {
  const { id, title, text } = props;
  return (
    <div
      className="flex flex-row items-center p-2 border border-slate-200 m-1"
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
