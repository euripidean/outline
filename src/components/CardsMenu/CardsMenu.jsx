import { SortableMenuCard } from "../SortableMenuCard/SortableMenuCard";
import MenuControls from "../MenuControls/MenuControls";
import Button from "../Button/Button";
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
    <div
      className="cards-menu flex flex-col w-full h-screen min-h-screen overflow-y-auto p-4 "
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <MenuControls />

      <SortableContext
        id={id}
        items={cards}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col min-h-[50vh]">
          {/* Always render the placeholder, but make it invisible when there are cards */}
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

      <Button
        id={"new-card"}
        text="New Card"
        onClick={() => console.log("New Card")}
      />
    </div>
  );
}

export default CardsMenu;
