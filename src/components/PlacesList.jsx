import React, { useEffect, useState } from "react";
import { fetchPlaces } from "../api/PlaceApi";
import { sortPlacesByDistance } from "../loc";

const PlacesList = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude })
      },() => {
        setError("위치 찾기 불가능..");
      }
    );
  }, []);

  useEffect(() => {
    const getPlaces = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPlaces();

        // 위치 있으면
        if (userLocation) {
          const sortedData = sortPlacesByDistance(
            data,
            userLocation.lat,
            userLocation.lon
          );
          setPlaces(sortedData);
          console.log(sortedData);
        } else {
          setPlaces(data);
        }
        // console.log(userLocation);확인용
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError("요청하신 데이터를 찾을 수 없습니다!(404)");
          } else if (error.response.status === 500) {
            setError("서버 오류! (500)");
          }
        }
      } finally {
        setLoading(false);
      }
    };
    getPlaces();
  }, [userLocation]);

  return (
    <div>
      <h2>🍔 맛집 목록 🍔</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <p className="loading">⏳ 로딩..중.....⌛️</p>
      ) : (
        <div className="list-container">
          {places.map((place) => (
            <div key={place.id} className="place-card">
              <img
                src={`http://localhost:3000/${place.image.src}`}
                alt={place.image.alt}
              />
              <h3>{place.title}</h3>
              <p>{place.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlacesList;

// const baseUrl = "http://localhost:3000/";

// useEffect(() => {
//   axios
//     .get(`${baseUrl}places`)
//     .then((response) => {
//       console.log("API 응답 데이터:", response.data);
//       setPlaces(response.data.places);
//     })
//     .catch((error) => console.error("API 호출 실패:", error));
// }, []);
