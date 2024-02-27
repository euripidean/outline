import { useSelector } from "react-redux";
import Button from "../Button/Button";
function MenuControls() {
  const activeProject = useSelector(
    (state) => state.outline.activeProject.name
  );
  const projects = useSelector((state) => state.outline.allProjects);

  if (projects.length === 0)
    return (
      <div className="flex flex-col mb-2">
        <Button id={"new-project"} text="Create a Project" />
      </div>
    );

  const projectNames = Object.values(projects);

  return (
    <>
      <div className="flex flex-col mb-2">
        <select className="my-2 text-xl bg-outline-white">
          <option className="truncate" value={activeProject}>
            {activeProject}
          </option>
          {projectNames
            .filter((project) => project !== activeProject)
            .map((project, index) => (
              <option key={index} className="truncate" value={project}>
                {project}
              </option>
            ))}
        </select>
        <Button id={"new-card"} text="New Card" />
      </div>
    </>
  );
}

export default MenuControls;
