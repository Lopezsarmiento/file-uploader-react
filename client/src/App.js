import React, { useState } from "react";
import "./App.css";
import FileUpload from "./components/fileUpload";
import Uploader from "./components/uploader";

const App = () => (
  <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
      <i className="fa fa-files-o"></i> React File Upload
    </h4>
    <FileUpload></FileUpload>
  </div>
);

export default App;
