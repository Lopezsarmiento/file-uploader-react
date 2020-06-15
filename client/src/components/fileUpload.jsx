import React, { useState } from "react";
import axios from "axios";
import Message from "./message";
import Progress from "./progress";

function FileUpload() {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    console.log("files array: ", e.target.files);
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  async function handleSubmit(event) {
    console.log("submitting file");
    const formData = new FormData(); // this is part of JavaScript
    formData.append("file", file);
    event.preventDefault();
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round(progressEvent.loaded * 100) / progressEvent.total
            )
          );
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 5000);
        },
      });

      const { filename, filePath } = res.data;
      setUploadedFile({ filename, filePath });

      console.log(`file has been uploaded`);
      setMessage("file uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        setMessage("There was a problem with the server");
      } else {
        console.log("not 500 err: ", err.response.data.msg);
        setMessage(err.response.data.msg);
      }
    }
  }

  return (
    <React.Fragment>
      {message && <Message msg={message}></Message>}
      <form onSubmit={handleSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          ></input>
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <Progress percentage={uploadPercentage}></Progress>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        ></input>
      </form>
      {uploadedFile && (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: "100%" }}
              src={uploadedFile.filePath}
              alt=""
            ></img>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default FileUpload;
