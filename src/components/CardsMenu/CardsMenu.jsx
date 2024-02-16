import Card from "../Card/Card";

function CardsMenu() {
  return (
    <div
      className="cards-menu flex flex-col"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}

export default CardsMenu;
