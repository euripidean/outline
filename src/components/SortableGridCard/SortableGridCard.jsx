import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function GridCard(props) {
  return (
    <div className="grid grid-rows-[auto_1fr] shadow-md h-full w-full p-2 m-2">
      <h2 className="font-semibold border-b p-1">{props.title}</h2>
      <p className="p-1">{props.text}</p>
    </div>
  );
}

export function SortableGridCard(props) {
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
      <GridCard id={props.id} title={props.title} text={props.text} />
    </div>
  );
}
