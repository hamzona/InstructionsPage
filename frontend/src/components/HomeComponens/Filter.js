import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
import FilterCss from "../../styles/filter.module.css";
export default function Filter() {
  const { setSubjects, setMinPrice, setMaxPrice, setJobType, setPage } =
    usePostContext();
  const [filterSubject, setFilterSubject] = useState([]);
  const [minPriceF, setMinPriceF] = useState("");
  const [maxPriceF, setMaxPriceF] = useState("");
  const [jobTypeF, setJobTypeF] = useState("");
  const subjectsConst = [
    "matematika",
    "biologija",
    "fizika",
    "hemija",
    "bosanski",
    "programiranje",
    "muzicki",
    "informatika",
  ];
  function hendldeChange(e) {
    let copy = filterSubject;
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked) {
      copy = [...filterSubject, value];
    } else {
      copy = copy.filter((item) => item !== value);
    }
    setFilterSubject(copy);
  }
  function hendleClick() {
    setSubjects(filterSubject);
    setMinPrice(minPriceF);
    setMaxPrice(maxPriceF);
    setJobType(jobTypeF);
    setPage(1);
  }
  return (
    <div className={FilterCss.container}>
      {subjectsConst.map((subject, index) => {
        return (
          <div key={index}>
            {subject}
            <input
              type="checkbox"
              value={subject}
              onChange={(e) => {
                hendldeChange(e);
              }}
            />
          </div>
        );
      })}
      <div>
        <div>Price:</div>
        <label htmlFor="min">od: </label>
        <input
          type="number"
          id="min"
          value={minPriceF}
          onChange={(e) => {
            setMinPriceF(e.target.value);
          }}
        />
        <label htmlFor="max">do: </label>

        <input
          type="number"
          id="max"
          value={maxPriceF}
          onChange={(e) => {
            setMaxPriceF(e.target.value);
          }}
        />
      </div>
      <div>
        <div>Type of work</div>
        <select
          onChange={(e) => {
            console.log(e.target.value);
            setJobTypeF(e.target.value);
          }}
        >
          {" "}
          <option value="" selected>
            unchecked
          </option>
          <option value="homework">homework</option>
          <option value="instruction">instruction</option>
          unchecked
        </select>
      </div>

      <button onClick={() => hendleClick()}>Apply</button>
    </div>
  );
}
