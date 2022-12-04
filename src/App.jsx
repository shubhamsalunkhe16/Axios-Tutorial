import React from "react";
import Basics from "./components/Basics/Basics";
import AxiosInstance from "./components/AxiosInstance/AxiosInstance";
import AxiosInterceptor from "./components/AxiosInterceptor/AxiosInterceptor";
import AxiosCancellation from "./components/AxiosCancellation/AxiosCancellation";
// import "./API/global";

const App = () => {
  return (
    <div>
      {/* <Basics /> */}
      {/* <AxiosInstance /> */}
      {/* <AxiosInterceptor /> */}
      <AxiosCancellation />
    </div>
  );
};

export default App;
