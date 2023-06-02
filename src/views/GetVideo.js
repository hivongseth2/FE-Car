import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
const GetVideo = () => {
  // const Array_Video = ["RptZnTXJM9Q", "VRDfgBRTXb0", "f5g726CwCX8"]
  // const opts = {
  //   height: '400',
  //   width: '640',
  //   playerVars:{
  //     autoplay:1,
  //   }
  // }
  // return (
  //   <div>
  //     {Array_Video.map((videoId, index) => (
  //       <YouTubeVideo key={index} videoId={videoId} />
  //     ))}
  //   </div>
  // );

  const [video, setVideo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              channelId: "UC3tBOLQ51lbd14W8taLBpBQ",
              type: "video",
              order: "date",
              key: "AIzaSyA1o0eXgMFDKO19fRJBaBMsBBe_zsuQvVM",
            },
          }
        );

        // const data = response.data;
        setVideo(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [video]);

  const opts = {
    height: "390",
    width: "640",
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1,
    // },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <div className="video">
      {video && (
        <div key={video[0].id.videoId}>
          <YouTube
            videoId="5E7EaHjlNSU"
            opts={opts}
            // onReady={onReady}
          />
        </div>
      )}
    </div>
  );
};

export default GetVideo;
