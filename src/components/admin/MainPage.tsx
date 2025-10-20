import React, { useEffect, useState } from "react";
import Dashboard from "./renderPage/Dashboard";
import Skills from "./renderPage/Skills";
import BasicDetails from "./renderPage/BasicDetails";
import { ProfileDetails } from "@/types/basicDetails";
import { fetchBasicDetails } from "@/services/basicDetails.service";
import Experience from "./renderPage/Experience";
import LoadingPage from "../ui/LoadingPage";
import Education from "./renderPage/Education";
import Certifications from "./renderPage/Certifications";
import SyncGithubRepos from "./renderPage/SyncGithubRepos";
import Projects from "./renderPage/Projects";

const MainPage = ({ selected_option }: { selected_option: string }) => {
  const [basicData, setBasicData] = useState<ProfileDetails | undefined | null>(
    undefined
  );

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBasicDetails();
      setBasicData(data ?? undefined);
    }

    fetchData();
  }, []);

  switch (selected_option) {
    case "basic-details":
      return basicData ? (
        <BasicDetails basicData={basicData} />
      ) : (
        <LoadingPage />
      );

    case "experience":
      return <Experience />;

    case "education":
      return <Education />;

    case "certifications":
      return <Certifications />;

    case "skills":
      return <Skills />;

    case "syncgithubrepos":
      return <SyncGithubRepos />;

    case "projects":
      return <Projects />;

    case "contact":
      return <Dashboard />;

    case "analytics":
      return <Dashboard />;

    default:
      return <Dashboard />;
  }
};

export default MainPage;
