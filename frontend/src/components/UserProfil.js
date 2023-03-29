import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProfilContext from "../hooks/useProfilContext";
import { useAuthContext } from "../hooks/useAuthContext";
import ReactStars from "react-rating-stars-component";
import RateStars from "./RateStars";
export default function UserProfil() {
  const { profilData, dispatch } = useProfilContext();
  const { state } = useAuthContext();
  const [rate, setRate] = useState(0);
  const [isRateUser, setIsRateUser] = useState(false);
  function cancleProfil() {
    dispatch({ type: "setProfil", payload: null });
  }
  const ratingChanged = (newRating) => {
    setRate(newRating);
  };

  async function sendRate() {
    const res = await fetch(
      `http://localhost:4000/api/profil/rate?userName=${profilData.name}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Berar ${state.user.token}`,
        },
        body: JSON.stringify({ rate: rate }),
      }
    );
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      await dispatch({ type: "setProfil", payload: json });
    }
  }
  /*
  console.log(profilData);
  console.log(state.user.name);
*/
  function isRated() {
    const d = profilData.usersRated.filter(
      (item) => item.name === state.user.name
    );

    //console.log(profilData.usersRated);
    if (d.length === 0) {
      setIsRateUser(false);
    } else {
      setIsRateUser(true);
    }
  }
  useEffect(() => {
    isRated();
  }, [profilData]);
  return (
    <div>
      UserProfil
      <div>{profilData.name}</div>
      <div>{profilData.email}</div>
      <button onClick={() => cancleProfil()}>Cancle</button>
      <div>Rate</div>
      <ReactStars count={5} size={50} onChange={ratingChanged} />
      <button disabled={isRateUser} onClick={() => sendRate()}>
        Submit
      </button>
      {profilData.rate && <RateStars />}
    </div>
  );
}
