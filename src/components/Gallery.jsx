import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getUserGallery } from "../services/userGalleryServices";

function Gallery() {
  const [api, setApi] = useState({ galleryData: [] });

  useEffect(() => {
    let isMounted = true;

    async function getDataGallery() {
      if (isMounted) {
        const { data } = await getUserGallery();
        setApi((prevState) => {
          return { ...prevState, galleryData: data };
        });
      }
    }

    getDataGallery();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container className="gallery-container">
      <Row className="g-2">
        {api.galleryData.map((data) => (
          <Col
            key={data.gal_id}
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            xxl={4}
            className="d-flex justify-content-center"
          >
            <img
              src={data.gal_img_name}
              alt="..."
              className="gallery-col-img"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Gallery;
