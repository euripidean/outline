import Button from "../Button/Button";
function MenuControls(props) {
  const { projects, currentProject } = props;
  return (
    <div className="flex flex-col mb-2">
      <select className="my-2 text-xl bg-outline-white">
        <option>Select Project</option>
        <option>Current Project</option>
        <option>Other Project</option>
        <option>Other Project</option>
      </select>
      <Button id={"new-card"} text="New Card" />
    </div>
  );
}

export default MenuControls;
