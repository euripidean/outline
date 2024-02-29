import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  closeModal,
  setActiveProject,
  showToast,
} from "../../features/outlineSlice";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useGetProjectQuery,
  useDeleteProjectMutation,
} from "../../features/apiSlice";

function ProjectForm(props) {
  const { action } = props;
  const dispatch = useDispatch();
  const currentProjectId = useSelector(
    (state) => state.outline.activeProject.id
  );
  const userId = useSelector((state) => state.outline.userId);

  const { data: activeProject } = useGetProjectQuery(currentProjectId);
  const [createProject, { error: createError }] = useCreateProjectMutation();
  const [updateProject, { error: updateError }] = useUpdateProjectMutation();
  const [deleteProject, { error: deleteError }] = useDeleteProjectMutation();

  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("novel");
  const [synopsis, setSynopsis] = useState("");
  const [logline, setLogline] = useState("");

  useEffect(() => {
    if (action === "update" && activeProject) {
      setName(activeProject.name || "");
      setProjectType(activeProject.projectType || "novel");
      setSynopsis(activeProject.synopsis || "");
      setLogline(activeProject.logline || "");
    }
  }, [action, activeProject]);

  const handleDelete = async () => {
    try {
      await deleteProject(currentProjectId).unwrap();
      dispatch(closeModal());
      dispatch(showToast("Project deleted!"));
    } catch (error) {
      dispatch(showToast("Failed to delete project"));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (action === "create") {
      const newProject = await createProject({
        name,
        projectType,
        synopsis,
        logline,
        userId,
      }).unwrap();
      dispatch(setActiveProject(newProject));
      dispatch(showToast("Project created successfully!"));
    }
    if (createError) {
      dispatch(showToast("Failed to create project"));
    }
    if (action === "update") {
      await updateProject({
        id: currentProjectId,
        body: { name, projectType, synopsis, logline },
      }).unwrap();
      dispatch(showToast("Project updated successfully!"));
    }
    if (updateError) {
      dispatch(showToast("Failed to update project"));
    }
    dispatch(closeModal());
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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="projectType" className="text-lg font-bold">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full border border-outline-bg p-2 rounded-md mb-4"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option value="novel">Novel</option>
          <option value="screenplay-film">Screenplay - Film</option>
          <option value="screenplay-tv">Screenplay - TV</option>
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
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
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
          value={logline}
          onChange={(e) => setLogline(e.target.value)}
        ></input>
        <button
          type="submit"
          className="bg-outline-bg text-white p-2 rounded-md"
        >
          {action === "create" ? "Create Project" : "Edit Project"}
        </button>
      </form>
      {action === "update" && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-md mt-4"
        >
          Delete Project
        </button>
      )}
    </div>
  );
}

export default ProjectForm;
