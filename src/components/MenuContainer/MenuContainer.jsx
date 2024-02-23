import CardsMenu from "../CardsMenu/CardsMenu";
import MenuControls from "../MenuControls/MenuControls";

function MenuContainer(props) {
  const { cards } = props;
  return (
    <div className=" bg-outline-gold flex flex-col h-full overflow-y-auto p-4">
      <MenuControls />
      <CardsMenu id="menuCards" cards={cards} />
    </div>
  );
}

export default MenuContainer;
