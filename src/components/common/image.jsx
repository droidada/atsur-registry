import Image from "next/image";

const NextImage = ({ src, alt = "", width = 10, height = 20, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      // layout="fill"
      width={width}
      height={height}
      objectFit="contain"
      objectPosition="center"
      {...props}
    />
  );
};

export default NextImage;
