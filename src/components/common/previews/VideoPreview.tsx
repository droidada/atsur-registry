import React from "react";

interface Props {
  file: string;
  className?: string;
}
const VideoPreview: React.FC<Props> = ({ file, className }) => {
  return (
    <div className={`max-w-[450px] h-[250px] ${className}`}>
      <video className="w-full h-full object-cover" controls>
        <source src={file} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPreview;
