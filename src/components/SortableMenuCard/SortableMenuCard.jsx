import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function MenuCard(props) {
  const { id, title, text } = props;
  return (
    <div className="menuCard flex-row py-4 border border-slate-200 m-1" id={id}>
      {title}
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
      <MenuCard id={props.id} title={props.title} />
    </div>
  );
}
