import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import SortableGridCardCloseButton from "../SortableGridCardCloseButton/SortableGridCardCloseButton";
import { CSS } from "@dnd-kit/utilities";

export function GridCard(props) {
  const { id, title, text, isDragging } = props;
  return (
    <div className="relative min-h-60 grid grid-rows-[auto_1fr] shadow-slate-500 shadow-lg h-full w-full p-2 m-2">
      <SortableGridCardCloseButton id={id} />
      <h2 className="font-semibold border-outline-bg border-b b-1 p-2">
        {title}
      </h2>
      <p className="p-2">{text}</p>
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
