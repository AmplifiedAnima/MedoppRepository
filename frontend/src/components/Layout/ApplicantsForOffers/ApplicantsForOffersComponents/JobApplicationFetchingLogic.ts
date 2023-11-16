import { JobApplicationInterface } from "../JobApplication.interface";
import { Dispatch,SetStateAction } from "react";
export const fetchJobApplications = async (
  isEmployee: boolean,
  setApplications: Dispatch<SetStateAction<JobApplicationInterface[]>>,
  setDataIsBeingFetched: (truth: boolean) => void
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `http://localhost:3000/job-applications/${
        isEmployee ? "offers-applied-for" : "applications-for-user-offers"
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setApplications(data);
      setDataIsBeingFetched(false);
    } else {
      setDataIsBeingFetched(false);
      console.log("Error fetching job applications:", response.status);
    }
  } catch (error) {
    setDataIsBeingFetched(false);
    console.error("Error fetching job applications:", error);
  }
};
