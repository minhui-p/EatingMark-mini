import React, { useEffect, useState } from "react";
import axios from "axios";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const baseUrl = "http://localhost:3000/";

  useEffect(() => {
    axios
      .get(`${baseUrl}places`)
      .then((response) => {
        // console.log("API 응답 데이터:", response.data); 확인용
        setPlaces(response.data.places);
      })
      .catch((error) => console.error("API 호출 실패:", error));
  }, []);

  return (
    <div>
      <h2>🍔 맛집 목록 🍔</h2>
      <div className="list-container">
        {places.map((place) => (
          <div key={place.id} className="place-card">
            <img src={`${baseUrl}${place.image.src}`} alt={place.image.alt} />
            <h3>{place.title}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesList;
