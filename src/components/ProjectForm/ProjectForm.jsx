import { useSelector, useDispatch } from "react-redux";
import { closeModal, setActiveProject } from "../../features/outlineSlice";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useLazyGetLastUpdatedProjectQuery,
  useGetProjectQuery,
} from "../../features/apiSlice";

function ProjectForm(props) {
  const { action } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.outline.userId);

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const projectType = e.target.projectType.value;
    const synopsis = e.target.synopsis.value;
    const logline = e.target.logline.value;
    if (action === "create") {
      try {
        const newProject = await createProject({
          name,
          projectType,
          synopsis,
          logline,
          userId,
        }).unwrap();
        console.log("Project created successfully");
        dispatch(setActiveProject(newProject));
        dispatch(closeModal());
      } catch (error) {
        console.error("Failed to create project:", error);
      }
    } else {
      try {
        await updateProject({ name, projectType, synopsis, logline }).unwrap();
        dispatch(closeModal());
      } catch (error) {
        console.error("Failed to update project:", error);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-outline-white p-2 overflow-y-auto">
      <h2 className="text-xl font-bold">
        {action === "create" ? "Create New Project" : "Edit Project"}
      </h2>
      <form className="flex flex-col w-full h-full" onSubmit={handleSubmit}>
        <label htmlFor="Name" className="text-lg font-bold">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full border border-outline-bg p-2 rounded-md mb-4"
        />
        <label htmlFor="projectType" className="text-lg font-bold">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full border border-outline-bg p-2 rounded-md mb-4"
        >
          <option value="novel">Novel</option>
          <option value="screenplay">Screenplay</option>
          <option value="short-story">Short Story</option>
          <option value="other">Other</option>
        </select>
        <label htmlFor="text" className="text-lg font-bold">
          Synopsis
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          className="w-full h-40 border border-outline-bg p-2 rounded-md mb-4"
          placeholder="A brief overview of your project."
        ></textarea>
        <label htmlFor="text" className="text-lg font-bold">
          Logline
        </label>
        <input
          type="text"
          id="logline"
          name="logline"
          className="w-full border border-outline-bg p-2 rounded-md mb-4"
          placeholder="A one-sentence summary of your project."
        ></input>
        <button
          type="submit"
          className="bg-outline-bg text-white p-2 rounded-md"
        >
          {action === "create" ? "Create Project" : "Edit Project"}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
