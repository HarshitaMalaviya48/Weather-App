import React from "react";

const DateAndTime = () => {
  const search = async () => {
    const response = await fetch(
      "/api/now?tz=Australia/Sydney&format=dd/MM/yyyy"
    );
    const data = await response.json();
    console.log(data);
  };
  search();
  return ;
};

export default DateAndTime;
