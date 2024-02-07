import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function CreateAssets({ nextPage = (x) => {} }) {

    return (
        <>
            <div className="wrap-upload w-full">
                <form action="#">
                    <label className="uploadfile" style={{ marginBottom: "3%" }}>
                        <img src="assets/images/box-icon/upload.png" alt="" />
                        <h5 className="to-white">Left Angle View</h5>
                        <p className="text">
                            Drag or choose your file to upload
                        </p>
                        <div className="text filename">
                            PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                        </div>
                        <input type="file" name="file" />
                    </label>
                    <br />
                    <label className="uploadfile" style={{ marginBottom: "3%" }}>
                        <img src="assets/images/box-icon/upload.png" alt="" />
                        <h5 className="to-white">Right Angle View</h5>
                        <p className="text">
                            Drag or choose your file to upload
                        </p>
                        <div className="text filename">
                            PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                        </div>
                        <input type="file" name="file" />
                    </label>{" "}
                    <br />
                    <label className="uploadfile">
                        <img src="assets/images/box-icon/upload.png" alt="" />
                        <h5 className="to-white">Mounted</h5>
                        <p className="text">
                            Drag or choose your file to upload
                        </p>
                        <div className="text filename">
                            PNG, GIF, WEBP, MP4 or MP3.Max 1Gb.
                        </div>
                        <input type="file" name="file" />
                    </label>
                </form>
            </div>
        </>
    )
}