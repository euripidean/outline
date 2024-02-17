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
// Later, we will add the ability to drag and drop the cards into the display grid.
// The card array will ultimately come from a query call to the database to get all cards associated with the project that are NOT currently in the display grid

function CardsMenu() {
  const [cards, setCards] = useState([
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 5",
  ]);

  const handleSortEnd = (event) => {
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
      <DndContext collisionDetector={closestCenter} onDragEnd={handleSortEnd}>
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
