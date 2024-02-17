import { SortableCard } from "../SortableCard/SortableCard";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

// This is where the cards are rendered, we map through the array of cards and render a SortableCard for each one.

function CardsMenu() {
  const [cards, setCards] = useState([
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 5",
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCards((cards) =>
        arrayMove(cards, cards.indexOf(active.id), cards.indexOf(over.id))
      );
    }
  };

  return (
    <div
      className="cards-menu flex flex-col"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <DndContext collisionDetector={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={cards} strategy={verticalListSortingStrategy}>
          {cards.map((card, index) => (
            <SortableCard key={index} id={card} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default CardsMenu;
