import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/VideoTikTok.scss"


const VideoTikTok = () => {
  const [apiTextLink, setApiTextlink] = useState("");
  const [apiTextLink2, setApiTextlink2] = useState("");
  const [apiTextLink3, setApiTextlink3] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/2`
        );
        console.log(result);
        let data = result && result.data ? result.data : [];
        setApiTextlink(data.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/3`
        );
        console.log(result);
        let data2 = result && result.data ? result.data : [];
        setApiTextlink2(data2.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData3 = async () => {
      try {
        let result = await axios.get(
          `${
            process.env.REACT_DOMAIN ||
            "http://trungtamdaotaolaixebinhduong.com:8080"
          }/api/intro/4`
        );
        console.log(result);
        let data3 = result && result.data ? result.data : [];
        setApiTextlink3(data3.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData3();
    fetchData2();
    fetchData();
  }, []);


  const parsedApiText = React.createElement('div', { dangerouslySetInnerHTML: { __html: apiTextLink } });
  const parsedApiText2 = React.createElement('div', { dangerouslySetInnerHTML: { __html: apiTextLink2 } });
  const parsedApiText3 = React.createElement('div', { dangerouslySetInnerHTML: { __html: apiTextLink3 } });
  return (
    <div className="list-video-tiktok">
      <div className="video-tiktok-1">
        <div
          className="tiktok-embed"
          style={{ maxWidth: "605px", minWidth: "325px" }}
        >
          {parsedApiText}
          
        </div>
      </div>
      <div className="video-tiktok-2">
        <div
          className="tiktok-embed"
          style={{ maxWidth: "605px", minWidth: "325px" }}
        >
          {parsedApiText2}
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      </div>
      <div className="video-tiktok-3">
        <div
          className="tiktok-embed"
          style={{ maxWidth: "605px", minWidth: "325px" }}
        >
          {parsedApiText3}
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      </div>
    </div>
  );
};
export default VideoTikTok;
