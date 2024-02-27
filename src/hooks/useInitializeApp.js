import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  useGetLastUpdatedProjectQuery,
  useGetProjectsQuery,
} from "../features/apiSlice";

import { setActiveProject, setProjects } from "../features/outlineSlice";

export default function useInitializeApp(userId) {
  const dispatch = useDispatch();

  // Get all the data needed to initialize the app
  // Get all projects to populate the select dropdown
  const {
    data: projectsData,
    error: projectsError,
    isLoading: projectsLoading,
  } = useGetProjectsQuery(userId);

  // Get the most recently updated project to set as the active project
  const {
    data: lastUpdatedData,
    error: lastUpdatedError,
    isLoading: lastUpdatedLoading,
  } = useGetLastUpdatedProjectQuery(userId);

  const validProjectsData =
    projectsData && !projectsError ? projectsData : null;
  const validLastUpdatedData =
    lastUpdatedData && !lastUpdatedError ? lastUpdatedData : null;

  useEffect(() => {
    if (validProjectsData) {
      // set projects to be the id of and name of each project in key value pairs
      const projects = validProjectsData.reduce((acc, project) => {
        acc[project._id] = project.name;
        return acc;
      }, {});
      dispatch(setProjects(projects));
    }

    if (validLastUpdatedData) {
      // set active project to be the id and name of the most recently updated project
      dispatch(
        setActiveProject({
          id: validLastUpdatedData[0]._id,
          name: validLastUpdatedData[0].name,
        })
      );
    }
  }, [validProjectsData, validLastUpdatedData, dispatch]);

  return { projectsLoading, lastUpdatedLoading };
}
