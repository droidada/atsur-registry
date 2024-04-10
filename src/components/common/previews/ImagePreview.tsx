import Image from "next/image";

interface Props {
  src: string;
  className?: string;
}

const ImagePreview: React.FC<Props> = ({ src, className }) => {
  return (
    <div className={`max-w-[450px] h-[250px] w-full relative`}>
      <Image src={src} fill alt="Image Preview" className="object-cover" />
    </div>
  );
};

export default ImagePreview;
