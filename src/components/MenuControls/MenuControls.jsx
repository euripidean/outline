import Button from "../Button/Button";
function MenuControls(props) {
  return (
    <div>
      <Button id={"new-card"} text="New Card" />
      <select>
        <option>Current Project</option>
        <option>Other Project</option>
        <option>Other Project</option>
      </select>
    </div>
  );
}

export default MenuControls;
