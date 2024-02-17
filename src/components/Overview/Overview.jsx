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

const defaultAnnouncements = {
  onDragStart(id) {
    console.log(`Picked up draggable item ${id}.`);
  },
  onDragOver(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was moved over droppable area ${overId}.`
      );
      return;
    }

    console.log(`Draggable item ${id} is no longer over a droppable area.`);
  },
  onDragEnd(id, overId) {
    if (overId) {
      console.log(
        `Draggable item ${id} was dropped over droppable area ${overId}`
      );
      return;
    }

    console.log(`Draggable item ${id} was dropped.`);
  },
  onDragCancel(id) {
    console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
  },
};

function Overview() {
  const [cards, setCards] = useState({
    menuCards: [
      "Plot Card 1",
      "Plot Card 2",
      "Plot Card 3",
      "Plot Card 4",
      "Plot Card 5",
    ],
    gridCards: [
      "Plot Card 6",
      "Plot Card 7",
      "Plot Card 8",
      "Plot Card 9",
      "Plot Card 10",
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
    <div className="grid gap-4 grid-cols-[20%_auto]">
      <DndContext
        announcements={defaultAnnouncements}
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
    if (id in cards) {
      return id;
    }

    return Object.keys(cards).find((key) => cards[key].includes(id));
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
      const activeIndex = activeCards.indexOf(id);
      const overIndex = overCards.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overCards.length;
      } else {
        newIndex = overIndex;
      }

      return {
        ...prev,
        [activeSection]: [...prev[activeSection].filter((card) => card !== id)],
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

    console.log("In handleDragEnd");
    console.log("activeSection: ", activeSection);

    if (!activeSection || !overSection || activeSection !== overSection) {
      return;
    }

    const activeIndex = cards[activeSection].indexOf(active.id);
    const overIndex = cards[overSection].indexOf(overId);

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
