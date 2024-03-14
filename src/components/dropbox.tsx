import { TextField } from "@mui/material";
import Image from "@/components/common/image";
import { useDropzone } from "react-dropzone";

import styled from "styled-components";

const getColor = (props) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  width: 100%;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: black;
  font-weight: bold;
  font-size: 1.4rem;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function DropBox({ onDrop }) {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    open,
    isDragAccept,
    isFocused,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  const lists = acceptedFiles.map((list: any) => (
    <li key={list.path}>
      {list.path} - {list.size} bytes
    </li>
  ));

  return (
    <>
      {" "}
      <section className="dropbox">
        <Container
          className="dropbox"
          {...getRootProps({ isDragAccept, isFocused, isDragReject })}
        >
          <input {...getInputProps()} />
          <p>Drag and drop some files here</p>
          <button type="button" className="btn" onClick={open}>
            Click to select file
          </button>
        </Container>
      </section>
      <aside>
        <h4>List</h4>
        <div>{lists}</div>
      </aside>
    </>
  );
}

export default DropBox;

export const ShowImage = ({ images }) => {
  const show = (image) => {
    return <Image height={100} width={100} alt="" src={image.src} />;
  };

  return <div className="container">{images.map(show)}</div>;
};
