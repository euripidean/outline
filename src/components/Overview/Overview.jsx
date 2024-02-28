import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCards, setActiveId } from "../../features/outlineSlice";
import { useGetCardsQuery } from "../../features/apiSlice";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import MenuContainer from "../MenuContainer/MenuContainer";
import DisplayGrid from "../DisplayGrid/DisplayGrid";
import { MenuCard } from "../SortableMenuCard/SortableMenuCard";
import { GridCard } from "../SortableGridCard/SortableGridCard";

function Overview() {
  const project = useSelector((state) => state.outline.activeProject);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.outline.cards);
  const activeId = useSelector((state) => state.outline.activeId);

  const {
    data: allProjectCards,
    error,
    isLoading,
  } = useGetCardsQuery(project.id);

  useEffect(() => {
    if (allProjectCards) {
      const menuCards = allProjectCards.filter(
        (card) => card.cardType === "menu"
      );
      const gridCards = allProjectCards.filter(
        (card) => card.cardType === "grid"
      );
      const newCards = {
        menuCards: menuCards,
        gridCards: gridCards,
      };
      dispatch(setCards(newCards));
    }
  }, [allProjectCards, dispatch]);

  const [overSection, setOverSection] = useState();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 50,
        distance: 5,
      },
    }),
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
        <MenuContainer id="menuCards" />
        <DisplayGrid id="gridCards" />
        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: "ease",
          }}
          style={{
            backgroundColor: "#c1ac79",
            opacity: 0.9,
            zIndex: 1000,
          }}
        >
          {activeId ? (
            <GridCard
              id={activeId}
              title={
                cards[findSection(activeId)].find(
                  (card) => card._id === activeId
                ).title
              }
              text={
                cards[findSection(activeId)].find(
                  (card) => card._id === activeId
                ).text
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function findSection(id) {
    return Object.keys(cards).find((key) =>
      cards[key].some((card) => card._id === id)
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
    const activeIndex = activeCards.findIndex((card) => card._id === id);
    const overIndex = overCards.findIndex((card) => card._id === overId);

    let newIndex;
    if (overId in cards) {
      newIndex = overCards.length;
    } else {
      newIndex = overIndex;
    }

    const newCards = {
      ...cards,
      [activeSection]: [
        ...cards[activeSection].filter((card) => card._id !== id),
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
      (card) => card._id === active.id
    );
    const overIndex = cards[overSection].findIndex(
      (card) => card._id === overId
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
