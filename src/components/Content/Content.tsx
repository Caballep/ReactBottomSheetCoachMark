import React from 'react';
import './Content.css';
import Tag from '../Tag/Tag';

interface Props {
  tagType: string;
  text1: string;
  text2: string;
  text3: string;
}

const Content: React.FC<Props> = ({ tagType, text1, text2, text3 }) => {
  return (
    <div className="container">
      <Tag tagType={tagType} />
      <p className="text text1">{text1}</p>
      <p className="text text2">{text2}</p>
      <p className="text text3">{text3}</p>
    </div>
  );
};

export default Content;
