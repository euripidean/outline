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
    <SortableContext
      id={id}
      items={cards}
      strategy={horizontalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="display grid grid-gap-4 grid-cols-3 min-h-[calc(100vh-80px)]"
      >
        {cards.map((card, index) => (
          <SortableGridCard
            key={index}
            id={card.id}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </SortableContext>
  );
}

export default DisplayGrid;
