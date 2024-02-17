import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { SortableCard } from "../SortableCard/SortableCard";

function DisplayGrid() {
  const [displayedCards, setDisplayedCards] = useState([
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 5",
    "Card 6",
    "Card 7",
    "Card 8",
    "Card 9",
  ]);

  const handleGridSort = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setDisplayedCards((cards) =>
        arrayMove(cards, cards.indexOf(active.id), cards.indexOf(over.id))
      );
    }
  };

  const handleAddCard = (card) => {
    setDisplayedCards((cards) => [...cards, card]);
  };

  return (
    <div className="display grid grid-gap-4 grid-cols-3">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleGridSort}>
        <SortableContext
          items={displayedCards}
          strategy={horizontalListSortingStrategy}
        >
          {displayedCards.map((card, index) => (
            <SortableCard key={index} id={card} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default DisplayGrid;
