import { SortableMenuCard } from "../SortableMenuCard/SortableMenuCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// The card array will ultimately come from a query call to the database to get all cards associated with the project whose location is the menu.

function CardsMenu(props) {
  const { id, cards } = props;
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="bg-outline-gold cards-menu flex flex-col w-full h-[calc(100vh-80px)] overflow-y-auto p-4">
      <SortableContext
        id={id}
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col min-h-[50vh]">
          <div className={`h-0 ${cards.length === 0 ? "h-auto" : ""}`}></div>

          {cards.map((card, index) => (
            <SortableMenuCard
              key={index}
              id={card.id}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default CardsMenu;
