import React from "react";
import LazyLoad from "react-lazy-load";

export default function Test() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ height: "500px", width: "100%" }}>sf</div>
      <div>
        <LazyLoad height={762} width={400} threshold={0.95}>
          <img
            alt=""
            src="http://apod.nasa.gov/apod/image/1502/HDR_MVMQ20Feb2015ouellet1024.jpg"
          />
        </LazyLoad>
      </div>
    </div>
  );
}
