import React from "react";
import "./Preloader.css";

export default function Preloader() {
  return (
    <div id="preloader">
      {/* <div className="books"></div> */}
      <div className="preloaderbook">
        <div className="book__pg-shadow"></div>
        <div className="book__pg"></div>
        <div className="book__pg book__pg--2"></div>
        <div className="book__pg book__pg--3"></div>
        <div className="book__pg book__pg--4"></div>
        <div className="book__pg book__pg--5"></div>
      </div>
    </div>
  );
}
