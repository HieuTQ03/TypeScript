import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <header>
        <img src="https://picsum.photos/1300/300" alt="" />
      </header>
      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div style={{ width: "100%", textAlign: "center" }}>
          <Outlet />
        </div>
      </div>
      <footer>Footer</footer>
    </div>
  );
};

export default RootLayout;
