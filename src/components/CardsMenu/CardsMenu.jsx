import { SortableMenuCard } from "../SortableMenuCard/SortableMenuCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

// This is where the cards are rendered, we map through the array of cards and render a SortableCard for each one.
// Later, we will add the ability to drag and drop the cards into the display grid.
// The card array will ultimately come from a query call to the database to get all cards associated with the project that are NOT currently in the display grid

function CardsMenu(props) {
  const { id, cards } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      className="cards-menu flex flex-col w-full h-screen overflow-y-auto p-4"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <SortableContext
        id={id}
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col">
          {cards.map((card, index) => (
            <SortableMenuCard key={index} id={card} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default CardsMenu;
