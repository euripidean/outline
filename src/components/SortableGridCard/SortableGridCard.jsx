import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import SortableGridCardCloseButton from "../SortableGridCardCloseButton/SortableGridCardCloseButton";
import CardExpandButton from "../CardExpandButton/CardExpandButton";
import { CSS } from "@dnd-kit/utilities";

export function GridCard(props) {
  const { id, title, text, isDragging } = props;
  return (
    <div className="relative grid grid-rows-[auto_1fr] h-[50vh] shadow-slate-500 shadow-md aspect-w-5 aspect-h-3 p-2 m-1">
      <SortableGridCardCloseButton id={id} />
      <h2 className="font-semibold border-outline-bg border-b b-1 p-2">
        {title}
      </h2>
      <p className="p-2">{text}</p>
      <CardExpandButton id={id} />
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
