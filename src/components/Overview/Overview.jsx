import CardsMenu from "../CardsMenu/CardsMenu";
import Display from "../Display/Display";
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
  const [cards, setCards] = useState([]);
  return (
    <div className="grid grid-cols-[auto_1fr]">
      <DndContext>
        <SortableContext items={cards} strategy={closestCenter}>
          <CardsMenu setCards={setCards} />
          <Display />
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Overview;
