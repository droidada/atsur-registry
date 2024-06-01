import React, { useEffect, useRef, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { object, string, TypeOf, boolean, ZodVoidDef, array } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  Control,
  FieldErrors,
  useFieldArray,
} from "react-hook-form";
import InputField from "@/components/Form/InputField";
import { Button, IconButton } from "@mui/material";
import {
  MdAddCircleOutline,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";
import { LiaQrcodeSolid } from "react-icons/lia";
import { HiQrCode } from "react-icons/hi2";
import { BsQrCode } from "react-icons/bs";

interface Props {
  artPiece: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}
const GenerateQRCode: React.FC<Props> = ({ artPiece, setActiveIndex }) => {
  const [url, setUrl] = useState("");
  const [pattern, setPattern] = useState<"squares" | "dots" | "fluid">("fluid");
  const [logo, setLogo] = useState("/default-logo.png"); // Path to default logo
  const [urls, setUrls] = useState([]);
  const [qrValue, setQrValue] = useState("");
  const [steps, setSteps] = useState(["Link", "Style", "File Format"]);
  const qrRef = useRef<QRCode>(null);

  const [active, setActive] = useState(0);
  const urlSchema = object({
    urls: array(string().url()),
  });

  type UrlInput = TypeOf<typeof urlSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm<UrlInput>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      urls: ["url"],
    },
  });

  const onSubmit: SubmitHandler<UrlInput> = (data) => {
    const qrCanvas: any = document.getElementById("react-qrcode-logo");
    if (qrCanvas) {
      const pngUrl = qrCanvas.toDataURL("image/png");

      // Send to server
      console.log(pngUrl);
    }
  };

  const qrUrls = watch("urls");
  console.log(qrUrls);

  useEffect(() => {
    console.log(qrUrls);
    setQrValue(qrUrls.join("\n"));
  }, [JSON.stringify(qrUrls)]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap gap-5 ">
      <div
        style={{ aspectRatio: "1/1" }}
        className="max-w-[412px] w-full border-[1px] border-primary p-4 "
      >
        <QRCode
          ref={qrRef}
          value={qrValue}
          qrStyle={pattern}
          //   logoImage={"/artsur-logo.png"}
          removeQrCodeBehindLogo
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>

      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col">
          <div className="flex gap-4 items-start border-b-[1px] pr-4 pb-4 relative">
            {steps.map((item, index) => (
              <span
                onClick={() => {
                  setActive(index);
                }}
                key={`step-${index}`}
                className={`font-[300] relative text-[16px] cursor-pointer leading-[17px] text-primary ${
                  active === index ? "font-[600]" : ""
                }`}
              >
                {item}
                {index === active && (
                  <span className="w-full h-[1px] bg-primary absolute top-[200%] left-0 " />
                )}
              </span>
            ))}
          </div>
        </div>

        <div>
          {
            [
              <Links key={`link-${1}`} control={control} errors={errors} />,
              <Style
                key={`style-${2}`}
                setPattern={setPattern}
                pattern={pattern}
              />,
              // <FileFormat key={ `file-${3}` } setLogo={ setLogo } />,
            ][active]
          }
        </div>

        <Button
          type="submit"
          className="w-full max-w-[246px] h-[46px] text-xs font-[600] bg-primary-green"
        >
          Save QR Code
        </Button>
      </div>
    </form>
  );
};

export default GenerateQRCode;

interface LinksProps {
  errors: any;
  control: Control<any>;
}
const Links: React.FC<LinksProps> = ({ control, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "url",
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="font-[300] text-xs text-primary leading-[17px] italic ">
        Enter or paste url
      </h2>
      {fields.map((field, index) => (
        <div className="flex gap-4 items-center" key={field.id}>
          <InputField
            control={control}
            name={`urls.${index}`}
            className="flex-1"
            label=""
            inputClassName="bg-secondary-white"
            error={!!errors.urls?.[index]}
            helperText={errors.urls?.[index]?.message}
          />
          <IconButton
            className="bg-secondary w-[30px] h-[30px]"
            type="button"
            onClick={() => remove(index)}
          >
            <MdOutlineRemoveCircleOutline />
          </IconButton>
        </div>
      ))}
      <Button
        startIcon={<MdAddCircleOutline />}
        type="button"
        className="bg-secondary text-xs font-[300]"
        onClick={() => append("url")}
      >
        Add Url
      </Button>
    </div>
  );
};

interface StyleProps {
  setPattern: React.Dispatch<
    React.SetStateAction<"squares" | "dots" | "fluid">
  >;
  pattern: "squares" | "dots" | "fluid";
}

const Style: React.FC<StyleProps> = ({ setPattern, pattern }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-col">
        <label
          htmlFor="squares"
          className="text-xs font-[300] cursor-pointer text-primary leading-[17px]"
        >
          <span>Squares</span>
          <div
            className={`w-10 h-10 flex items-center justify-center ${
              pattern === "squares" ? "border-2 border-primary" : ""
            }`}
          >
            <LiaQrcodeSolid size={30} />
          </div>
        </label>
        <input
          id="squares"
          type="radio"
          name="pattern"
          value="squares"
          hidden
          className="hidden"
          checked={pattern === "squares"}
          onChange={() => setPattern("squares")}
        />
      </div>
      <div className="flex gap-2 flex-col">
        <label
          htmlFor="dots"
          className="text-xs font-[300] cursor-pointer text-primary leading-[17px]"
        >
          <span>Dots</span>
          <div
            className={`w-10 h-10 flex items-center justify-center ${
              pattern === "dots" ? "border-2 border-primary" : ""
            }`}
          >
            <HiQrCode size={30} />
          </div>
        </label>
        <input
          id="dots"
          type="radio"
          name="pattern"
          value="dots"
          hidden
          className="hidden"
          checked={pattern === "dots"}
          onChange={() => setPattern("dots")}
        />
      </div>

      <div className="flex gap-2 flex-col">
        <label
          htmlFor="fluid"
          className="text-xs font-[300] cursor-pointer text-primary leading-[17px]"
        >
          <span>Fluid</span>
          <div
            className={`w-10 h-10 flex items-center justify-center ${
              pattern === "fluid" ? "border-2 border-primary" : ""
            }`}
          >
            <BsQrCode size={30} />
          </div>
        </label>
        <input
          id="fluid"
          type="radio"
          name="pattern"
          value="fluid"
          hidden
          className="hidden"
          checked={pattern === "fluid"}
          onChange={() => setPattern("fluid")}
        />
      </div>
    </div>
  );
};
