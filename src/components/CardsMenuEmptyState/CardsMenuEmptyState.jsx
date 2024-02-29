import { useSelector } from "react-redux";

function CardsMenuEmptyState() {
  const menuCards = useSelector((state) => state.outline.cards.menuCards);
  const gridCards = useSelector((state) => state.outline.cards.gridCards);

  if (menuCards.length > 0 || gridCards.length === 0) {
    return (
      <div className="cards-menu-empty-state">
        <p className="text-xl mb-2">Nothing quite like that blank page!</p>
        <p className="font-light">
          Start work on your project by creating a new card, then you can order
          them in the grid.
        </p>
      </div>
    );
  }

  return (
    <div className="cards-menu-empty-state ">
      <p className="text-xl mb-2">All your cards are in the grid!</p>
      <p className="font-light">
        Drag and drop cards here to add them to the menu, or create a new card.
      </p>
    </div>
  );
}

export default CardsMenuEmptyState;
