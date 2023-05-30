import React from "react";
import { TikTokEmbed } from "react-social-media-embed";

const SocialItem = () => {
  return (
    <div>
      <TikTokEmbed
        url="https://www.tiktok.com/@thanhluan1303/video/7114332136051690779?is_from_webapp=1&sender_device=pc&web_id=7217060723439339010"
        caption="@thanhluan1303"
        showAuthor={false}
        showCount={false}
      />
    </div>
  );
};

export default SocialItem;
