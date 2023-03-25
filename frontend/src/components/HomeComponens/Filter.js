import React, { useState } from "react";
import { usePostContext } from "../../hooks/usePostContext";
import FilterCss from "../../styles/filter.module.css";
export default function Filter() {
  const { setSubjects } = usePostContext();

  const [filter, setFiler] = useState([]);
  const subjectsConst = [
    "matematika",
    "biologija",
    "fizika",
    "hemija",
    "bosanski",
  ];
  function hendldeChange(e) {
    let copy = filter;
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked) {
      copy = [...filter, value];
    } else {
      copy = copy.filter((item) => item !== value);
    }
    setFiler(copy);
  }
  function hendleClick() {
    setSubjects(filter);
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
      <button onClick={() => hendleClick()}>Apply</button>
    </div>
  );
}
