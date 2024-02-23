import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCards, setActiveId } from "../../features/outlineSlice";
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

import MenuContainer from "../MenuContainer/MenuContainer";
import DisplayGrid from "../DisplayGrid/DisplayGrid";
import { MenuCard } from "../SortableMenuCard/SortableMenuCard";
import { GridCard } from "../SortableGridCard/SortableGridCard";

function Overview() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.outline.cards);
  const activeId = useSelector((state) => state.outline.activeId);

  const [overSection, setOverSection] = useState();

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
        <MenuContainer cards={cards.menuCards} />
        <DisplayGrid id="gridCards" cards={cards.gridCards} />

        <DragOverlay>
          {activeId ? (
            overSection === "menuCards" ? (
              <div className="bg-gray-100">
                <MenuCard
                  id={activeId}
                  title={
                    cards[findSection(activeId)].find(
                      (card) => card.id === activeId
                    ).title
                  }
                />
              </div>
            ) : (
              <GridCard
                id={activeId}
                title={
                  cards[findSection(activeId)].find(
                    (card) => card.id === activeId
                  ).title
                }
                text={
                  cards[findSection(activeId)].find(
                    (card) => card.id === activeId
                  ).text
                }
              />
            )
          ) : null}
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

    dispatch(setActiveId(id));
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the appropriate sections for the active and over cards
    const activeSection = findSection(id);
    let overSection = findSection(overId);

    if (overSection === undefined) {
      overSection = activeSection === "menuCards" ? "gridCards" : "menuCards";
    }

    setOverSection(overSection);

    if (!activeSection || !overSection || activeSection === overSection) {
      return;
    }

    const activeCards = cards[activeSection];
    const overCards = cards[overSection];

    // Find the indexes of the active and over cards
    const activeIndex = activeCards.findIndex((card) => card.id === id);
    const overIndex = overCards.findIndex((card) => card.id === overId);

    let newIndex;
    if (overId in cards) {
      newIndex = overCards.length;
    } else {
      newIndex = overIndex;
    }

    const newCards = {
      ...cards,
      [activeSection]: [
        ...cards[activeSection].filter((card) => card.id !== id),
      ],
      [overSection]: [
        ...cards[overSection].slice(0, newIndex),
        cards[activeSection][activeIndex],
        ...cards[overSection].slice(newIndex, cards[overSection].length),
      ],
    };

    dispatch(setCards(newCards));
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const overId = over ? over.id : null;

    const activeSection = findSection(id);
    let overSection = findSection(overId);

    if (overSection === undefined) {
      overSection = activeSection === "menuCards" ? "gridCards" : "menuCards";
    }

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
      const newCards = {
        ...cards,
        [overSection]: arrayMove(cards[overSection], activeIndex, overIndex),
      };
      dispatch(setCards(newCards));
    }

    dispatch(setActiveId(null));
  }
}

export default Overview;
