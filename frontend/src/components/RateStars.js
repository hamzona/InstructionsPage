import React from "react";
import useProfilContext from "../hooks/useProfilContext";

export default function RateStars() {
  const { profilData } = useProfilContext();
  const stars = Array(parseInt(profilData.rate)).fill(0);
  console.log(profilData.rate);

  return (
    <div>
      rating:
      {profilData.rate &&
        stars.map((_, index) => {
          return <div key={index}>&#9734;</div>;
        })}
    </div>
  );
}
