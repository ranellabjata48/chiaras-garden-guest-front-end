import React, { useEffect, useState } from "react";
import { getUserAbout } from "../services/userAboutServices";
import { Button } from "react-bootstrap";

function About() {
  const [api, setApi] = useState({ aboutData: [] });

  useEffect(() => {
    let isMounted = true;

    async function getAboutData() {
      if (isMounted) {
        const { data } = await getUserAbout();
        setApi((prevState) => {
          return { ...prevState, aboutData: data };
        });
      }
    }

    getAboutData();

    return () => {
      isMounted = false;
    };
  }, []);

  function backToTop() {
    document.documentElement.scrollTop = 0;
  }

  return (
    <div className="about-container">
      {api.aboutData.map((data) => (
        <div key={data.abt_id}>
          <div className="about-title">{data.abt_title}</div>
          <div className="about-description">{data.abt_descr}</div>
        </div>
      ))}
      <span className="about-backToTop-btn d-flex justify-content-end">
        <Button variant="secondary" onClick={() => backToTop()}>
          Back to top
        </Button>
      </span>
    </div>
  );
}

export default About;
