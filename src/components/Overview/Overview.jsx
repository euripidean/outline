import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import CardsMenu from "../CardsMenu/CardsMenu";
import DisplayGrid from "../DisplayGrid/DisplayGrid";
import { MenuCard } from "../SortableMenuCard/SortableMenuCard";

function Overview() {
  // Will need to replace the useState with the api call for the cards by project ID and the setCards with the api call to update the cards
  // State managed through Redux.
  const [cards, setCards] = useState({
    menuCards: [
      { id: "1", title: "Plot Card 1", text: "Plot Card 1 text" },
      { id: "2", title: "Plot Card 2", text: "Plot Card 2 text" },
      { id: "3", title: "Plot Card 3", text: "Plot Card 3 text" },
      { id: "4", title: "Plot Card 4", text: "Plot Card 4 text" },
      { id: "5", title: "Plot Card 5", text: "Plot Card 5 text" },
    ],
    gridCards: [
      { id: "6", title: "Plot Card 6", text: "Plot Card 6 text" },
      { id: "7", title: "Plot Card 7", text: "Plot Card 7 text" },
      { id: "8", title: "Plot Card 8", text: "Plot Card 8 text" },
      { id: "9", title: "Plot Card 9", text: "Plot Card 9 text" },
      { id: "10", title: "Plot Card 10", text: "Plot Card 10 text" },
    ],
  });

  const [activeId, setActiveId] = useState();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="grid gap-4 grid-cols-[25%_auto]">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <CardsMenu id="menuCards" cards={cards.menuCards} />
        <DisplayGrid id="gridCards" cards={cards.gridCards} />
        <DragOverlay>
          {activeId ? <MenuCard id={activeId} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function findSection(id) {
    return Object.keys(cards).find((key) =>
      cards[key].some((card) => card.id === id)
    );
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the appropriate sections for the active and over cards
    const activeSection = findSection(id);
    const overSection = findSection(overId);

    console.log("In handleDragOver");
    console.log("activeSection: ", activeSection);
    console.log("overSection: ", overSection);

    if (!activeSection || !overSection || activeSection === overSection) {
      return;
    }

    setCards((prev) => {
      const activeCards = prev[activeSection];
      const overCards = prev[overSection];

      // Find the indexes of the active and over cards
      const activeIndex = activeCards.findIndex((card) => card.id === id);
      const overIndex = overCards.findIndex((card) => card.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overCards.length;
      } else {
        newIndex = overIndex;
      }

      return {
        ...prev,
        [activeSection]: [
          ...prev[activeSection].filter((card) => card.id !== id),
        ],
        [overSection]: [
          ...prev[overSection].slice(0, newIndex),
          cards[activeSection][activeIndex],
          ...prev[overSection].slice(newIndex, prev[overSection].length),
        ],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeSection = findSection(id);
    const overSection = findSection(overId);

    if (!activeSection || !overSection || activeSection !== overSection) {
      return;
    }

    const activeIndex = cards[activeSection].findIndex(
      (card) => card.id === active.id
    );
    const overIndex = cards[overSection].findIndex(
      (card) => card.id === overId
    );

    if (activeIndex !== overIndex) {
      setCards((cards) => ({
        ...cards,
        [overSection]: arrayMove(cards[overSection], activeIndex, overIndex),
      }));
    }

    setActiveId(null);
  }
}

export default Overview;
