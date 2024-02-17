import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableCard } from "../SortableCard/SortableCard";

function DisplayGrid(props) {
  const { cards, setCards } = props;

  const handleGridSort = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCards((cards) =>
        arrayMove(cards, cards.indexOf(active.id), cards.indexOf(over.id))
      );
    }
  };

  return (
    <div className="display grid grid-gap-4 grid-cols-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleGridSort}>
        <SortableContext items={cards} strategy={horizontalListSortingStrategy}>
          {cards.map((card, index) => (
            <SortableCard key={index} id={card} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DisplayGrid;
