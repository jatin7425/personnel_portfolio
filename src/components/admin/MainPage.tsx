import React, { useEffect, useState } from "react";
import Dashboard from "./renderPage/Dashboard";
import BasicDetails from "./renderPage/BasicDetails";
import { ProfileDetails } from "@/types/basicDetails";
import { fetchBasicDetails } from "@/services/basicDetails.service";

const MainPage = ({ selected_option }: { selected_option: string }) => {
  const [basicData, setBasicData] = useState<ProfileDetails | undefined | null>(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchBasicDetails();
      setBasicData(data ?? undefined);
    }

    fetchData();
  }, []);

  switch (selected_option) {
    case "basic-details":
      return basicData ? <BasicDetails basicData={basicData} /> : null;

    case "experience":
      return <Dashboard />;

    case "education":
      return <Dashboard />;

    case "certifications":
      return <Dashboard />;

    case "skills":
      return <Dashboard />;

    case "projects":
      return <Dashboard />;

    case "contact":
      return <Dashboard />;

    case "analytics":
      return <Dashboard />;

    default:
      return <Dashboard />;
  }
};

export default MainPage;
