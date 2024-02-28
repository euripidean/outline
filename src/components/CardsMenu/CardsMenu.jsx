import { useSelector } from "react-redux";
import { SortableMenuCard } from "../SortableMenuCard/SortableMenuCard";
import CardsMenuEmptyState from "../CardsMenuEmptyState/CardsMenuEmptyState";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function CardsMenu(props) {
  const cards = useSelector((state) => state.outline.cards.menuCards);
  const { id } = props;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="bg-outline-gold cards-menu flex flex-col w-full h-[calc(100vh-80px)] overflow-y-auto p-4">
      <div ref={setNodeRef} className="flex flex-col min-h-[50vh]">
        <SortableContext
          id={id}
          items={cards}
          strategy={verticalListSortingStrategy}
        >
          <div className={`h-0 ${cards.length === 0 ? "h-auto" : ""}`}></div>
          {cards.length === 0 ? (
            <CardsMenuEmptyState />
          ) : (
            cards.map((card, index) => (
              <SortableMenuCard
                key={index}
                id={card._id}
                title={card.title}
                text={card.text}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}

export default CardsMenu;
