import CardsMenu from "../CardsMenu/CardsMenu";
import Display from "../Display/Display";

function Overview() {
  return (
    <div className="overview grid grid-flow-col auto-cols-max">
      <CardsMenu />
      <Display />
    </div>
  );
}

export default Overview;
