import React from 'react';
import './Tag.css';

interface Props {
  tagType: string;
}

const Tag: React.FC<Props> = ({ tagType }) => {
  let tagText = "";

  if (tagType === "announcement") {
    tagText = "< Announcement";
  } else if (tagType === "alert") {
    tagText = "! Alert";
  } else if (tagType === "offer") {
    tagText = "$ Offer";
  } else {
    tagText = "Unknown";
  }

  return (
    <div className={`tag tag-${tagType}`}>
      <p className="tag-text">{tagText}</p>
    </div>
  );
};

export default Tag;
