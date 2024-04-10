import { Document, Page } from "react-pdf";

interface Props {
  file: string;
  className?: string;
}
const PdfPreview: React.FC<Props> = ({ file }) => {
  console.log(file);
  return (
    <div className={`max-w-[450px] w-full h-[250px]`}>
      <Document className={"w-full h-full overflow-y-auto"} file={file}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfPreview;
