import CardsMenu from "../CardsMenu/CardsMenu";
import DisplayGrid from "../DisplayGrid/DisplayGrid";
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
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useState } from "react";

function Overview() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleCardDrop = (event) => {
    const { active, over } = event;
    if (over) {
      setMenuCards((cards) => cards.filter((card) => card !== active.id));
      setGridCards((cards) => [...cards, active.id]);
    }
  };

  const [activeId, setActiveId] = useState(null);
  const [menuCards, setMenuCards] = useState(["Card 1", "Card 2", "Card 3"]);
  const [gridCards, setGridCards] = useState(["Card 4", "Card 5", "Card 6"]);

  return (
    <div className="grid grid-cols-[auto_1fr]">
      <DndContext onDragEnd={handleCardDrop}>
        <CardsMenu cards={menuCards} setCards={setMenuCards} />
        <DisplayGrid cards={gridCards} setCards={setGridCards} />
      </DndContext>
    </div>
  );
}

export default Overview;
