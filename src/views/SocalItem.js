import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Youtube.scss"; // Import external CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const SocalItem = () => {
  const [data, setData] = useState(null);
  const channelId = "UC3tBOLQ51lbd14W8taLBpBQ"; // Replace with your YouTube channel ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/channels",
          {
            params: {
              part: "snippet,statistics,brandingSettings",
              id: channelId,
              key: "AIzaSyA1o0eXgMFDKO19fRJBaBMsBBe_zsuQvVM", // Replace with your YouTube API Key
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="socal-item">
      {" "}
      {data && (
        <>
          <img
            className="ChannelAvatar"
            src={data.items[0].snippet.thumbnails.high.url}
            alt="Channel Avatar"
          />
          <div>
            <p className="ChanelName">
              {data.items[0].brandingSettings.channel.title}
            </p>
            <p>
              <span className="description">
                {data.items[0].snippet.localized.description}{" "}
              </span>
            </p>
            <p className="subrice">
              Nguời theo dõi:
              <span>{data.items[0].statistics.subscriberCount}</span>
            </p>
            <p>
              <a
                href={`https://www.youtube.com/channel/${channelId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="button-social-item-youtube">
                  <FontAwesomeIcon
                    icon={faYoutube}
                    style={{ color: "#ff0000" }}
                  />
                  <span className="content">Mở Youtube</span>
                </button>
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default SocalItem;
