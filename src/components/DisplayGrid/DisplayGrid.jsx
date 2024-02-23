import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableGridCard } from "../SortableGridCard/SortableGridCard";

function DisplayGrid(props) {
  const { id, cards } = props;

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`display grid gap-x-8 gap-y-4 md:grid-cols-3 xlg:grid-cols-4 sm:grid-cols-2 p-4 w-full min-h-[calc(100vh-80px)]`}
    >
      <SortableContext
        id={id}
        items={cards}
        strategy={horizontalListSortingStrategy}
      >
        {cards.map((card, index) => (
          <SortableGridCard
            key={index}
            id={card.id}
            title={card.title}
            text={card.text}
          />
        ))}
      </SortableContext>
    </div>
  );
}

export default DisplayGrid;
