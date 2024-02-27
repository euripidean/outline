import { useSelector } from "react-redux";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableGridCard } from "../SortableGridCard/SortableGridCard";
import DisplayGridEmptyState from "../DisplayGridEmptyState/DisplayGridEmptyState";

function DisplayGrid(props) {
  const { id, cards } = props;
  const projectName = useSelector((state) => state.outline.activeProject.name);

  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`display grid gap-1 md:grid-cols-2 lg:grid-cols-3 xlg:grid-cols-4 sm:grid-cols-2 p-4 w-full`}
    >
      <SortableContext
        id={id}
        items={cards}
        strategy={horizontalListSortingStrategy}
      >
        {cards.length === 0 ? (
          <div className="col-span-full">
            <DisplayGridEmptyState />
          </div>
        ) : (
          cards.map((card, index) => (
            <SortableGridCard
              key={index}
              id={card.id}
              title={card.title}
              text={card.text}
            />
          ))
        )}
      </SortableContext>
    </div>
  );
}

export default DisplayGrid;
