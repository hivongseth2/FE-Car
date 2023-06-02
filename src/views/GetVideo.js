import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
const GetVideo = () => {
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
              key: "AIzaSyCIVk0M0srE2_G7UdRYm7ApByefLRlT4AU",
            },
          }
        );

        // const data = response.data;
        setVideo(response.data);

        console.log("id video", video.items[0].id.videoId);
        console.log("title video", video.items[0].snippet.title);
        console.log(
          "url video",
          "https://www.youtube.com/watch?v=" + video.items[0].id.videoId
        );
        console.log("id thumbnail", video.items[0].snippet.thumbnails.high.url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="video">{video && <div>{console.log(video)}</div>}</div>
  );
};

export default GetVideo;
