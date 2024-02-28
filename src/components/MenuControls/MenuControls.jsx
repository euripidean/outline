import { useSelector, useDispatch } from "react-redux";
import { setActiveProject } from "../../features/outlineSlice";
import Button from "../Button/Button";

function MenuControls() {
  const dispatch = useDispatch();
  const activeProject = useSelector((state) => state.outline.activeProject);
  const projects = useSelector((state) => state.outline.allProjects);

  if (projects.length === 0)
    return (
      <div className="flex flex-col mb-2">
        <Button id={"new-project"} text="Create a Project" />
      </div>
    );

  const handleProjectChange = (e) => {
    dispatch(
      setActiveProject({
        id: e.target.value,
        name: projects[e.target.value],
      })
    );
  };

  return (
    <div className="flex flex-col mb-2">
      <select
        onChange={handleProjectChange}
        className="my-2 text-xl bg-outline-white"
      >
        <option className="truncate" value={activeProject.id}>
          {activeProject.name}
        </option>
        {Object.entries(projects)
          .filter(([id, name]) => id !== activeProject.id)
          .map(([id, name]) => (
            <option key={id} className="truncate" value={id}>
              {name}
            </option>
          ))}
      </select>
      <Button id={"new-card"} text="New Card" />
    </div>
  );
}

export default MenuControls;
