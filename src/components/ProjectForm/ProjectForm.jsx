import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "../../features/outlineSlice";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../features/apiSlice";

function ProjectForm(props) {
  const { action } = props;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.outline.userId);

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const synopsis = e.target.synopsis.value;
    const logline = e.target.logline.value;
    if (action === "create") {
      createProject({ title, synopsis, logline, user_id: userId });
      dispatch(closeModal());
    } else {
      updateProject({ title, synopsis, logline });
      dispatch(closeModal());
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-outline-white p-2 overflow-y-auto">
      <h2 className="text-xl font-bold">
        {action === "create" ? "Create New Project" : "Update Project"}
      </h2>
      <form className="flex flex-col w-full h-full" onSubmit={handleSubmit}>
        <label htmlFor="Name" className="text-lg font-bold">
          Name
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full border border-outline-bg p-2 rounded-md mb-4"
        />
        <label htmlFor="text" className="text-lg font-bold">
          Synopsis
        </label>
        <textarea
          id="synopsis"
          name="text"
          className="w-full h-40 border border-outline-bg p-2 rounded-md mb-4"
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
          {action === "create" ? "Create Project" : "Update Project"}
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
