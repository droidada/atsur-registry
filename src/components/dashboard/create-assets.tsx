import { useState, useEffect } from "react";
import Image from "@/components/common/image";
import { useRouter } from "next/router";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAuthContext } from "@/providers/auth.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import LoadingButton from "../Form/LoadingButton";

export default function CreateAssets({ nextPage = (x) => {} }) {
  const axiosAuth = useAxiosAuth();

  const [leftImg, setLeftImg] = useState(null);
  const [rightImg, setRightImg] = useState(null);
  const [mountedImg, setMountedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const { user, error: loginError } = useAuthContext();

  const onSubmitHandler = async (values) => {
    try {
      if (!leftImg || !rightImg || !mountedImg) {
        setError("All attachments are required");
        return;
      }

      setLoading(true);
      console.log(values);
      const formData = new FormData();
      formData.append("artworkId", "65c1841f4294d10812426b3d");
      formData.append("fileLeft", leftImg);
      formData.append("fileRight", rightImg);
      formData.append("fileMounted", mountedImg);

      const result = await axiosAuth.post("/art-piece/add-assets", formData);
      //setPreviewImg(result.data.imageName)
      console.log("result here is ", result.data);

      setLoading(false);
      nextPage(13);
      //  router.replace("/dashboard");
      return;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleLeftImgUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setLeftImg(reader.result);
    }.bind(this);

    setLeftImg(event.target.files[0]);
  };

  const handleRightImgUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setRightImg(reader.result);
    }.bind(this);

    setRightImg(event.target.files[0]);
  };

  const handleMountedImgUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setMountedImg(reader.result);
    }.bind(this);

    setMountedImg(event.target.files[0]);
  };

  return (
    <>
      <div className="wrap-upload w-full">
        <form className="comment-form" autoComplete="off" noValidate>
          <label className="uploadfile" style={{ marginBottom: "3%" }}>
            {leftImg ? (
              <Image className="h-full w-full" alt={""} src={leftImg} />
            ) : (
              <Image src="/assets/images/box-icon/upload.png" alt={""} />
            )}
            <h5 className="to-white">Left Angle View</h5>
            <p className="text">Drag or choose your file to upload</p>
            <div className="text filename">
              PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
            </div>
            <input
              type="file"
              name="leftImage"
              accept="image/*"
              onChange={handleLeftImgUploadClick}
            />
          </label>
          <br />
          <label className="uploadfile" style={{ marginBottom: "3%" }}>
            {rightImg ? (
              <Image className="h-full w-full" alt={""} src={rightImg} />
            ) : (
              <Image src="/assets/images/box-icon/upload.png" alt="" />
            )}
            <h5 className="to-white">Right Angle View</h5>
            <p className="text">Drag or choose your file to upload</p>
            <div className="text filename">
              PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
            </div>
            <input
              type="file"
              name="rightImage"
              accept="image/*"
              onChange={handleRightImgUploadClick}
            />
          </label>{" "}
          <br />
          <label className="uploadfile">
            {mountedImg ? (
              <Image className="h-full w-full" alt={""} src={mountedImg} />
            ) : (
              <Image src="/assets/images/box-icon/upload.png" alt="" />
            )}
            <h5 className="to-white">Mounted</h5>
            <p className="text">Drag or choose your file to upload</p>
            <div className="text filename">
              PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
            </div>
            <input
              type="file"
              name="mountedImage"
              accept="image/*"
              onChange={handleMountedImgUploadClick}
            />
          </label>
          <div className="btn-submit flex gap30 justify-center">
            <LoadingButton
              className="tf-button style-1 h50"
              loading={loading}
              type="submit"
              // fullWidth
              onClick={onSubmitHandler}
            >
              Submit
              <i className="icon-arrow-up-right2" />
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
}
