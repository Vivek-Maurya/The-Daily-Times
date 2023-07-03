import React from "react";
import "../Files/News.css";

export default function Newsitem(props) {
  return (
    <>
      <div className="card my-3" >
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <button><a href={props.link} target="_blank" className="btn btn-primary">
            Read more...
          </a></button>
          <hr></hr>
        </div>
      </div>
    </>
  );
}
