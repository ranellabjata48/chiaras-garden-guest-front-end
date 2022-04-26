import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { getUserHomeImg } from "../services/userHomeService";

function Home() {
  const [api, setApi] = useState({ homeData: [] });

  useEffect(() => {
    let isMounted = true;

    async function getHomeData() {
      const { data } = await getUserHomeImg();
      if (isMounted) {
        setApi((prevState) => {
          return { ...prevState, homeData: data };
        });
      }
    }

    getHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  /* const shortMessage = [
    {
      header: `Welcome to Chiara's Garden Hotel & Resort`,
      body: `Check our accommodations today!`,
    },
  ]; */

  return (
    <>
      <Carousel>
        {api.homeData.map((data) => (
          <Carousel.Item key={data.hm_id}>
            <img
              className="d-block home-img"
              src={data.hm_img_name}
              alt="slide"
            />
            <Carousel.Caption>
              <div className="home-carousel-head">
                Welcome to Chiara's Garden Hotel & Resort
              </div>
              <div className="home-carousel-body">
                Check our accommodations today!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <br />
    </>
  );
}

export default Home;
