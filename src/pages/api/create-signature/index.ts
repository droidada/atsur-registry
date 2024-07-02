import type { NextApiRequest, NextApiResponse } from "next/types";
import htmlPdf from "html-pdf-node";

const generatePdfBlob = async (html: string) => {
  const options = {
    format: "A4",
    printBackground: true,
    width: "500px",
    height: "500px",
  };
  const file = { content: html };

  console.log(file);

  const pdfBuffer = htmlPdf.generatePdf(file, options);
  //@ts-ignore
  const pdfBlob = new Blob([pdfBuffer], { type: "application/pdf" });
  console.log(pdfBuffer);

  console.log("PDF Blob generated successfully!");
  return pdfBlob;
};

export default async function POST(req: NextApiRequest, resp: NextApiResponse) {
  try {
    const { html } = await req.body;

    const pdfBlob = await generatePdfBlob(html);

    return resp.status(200).json({ pdfBlob });
  } catch (error) {
    console.error(error);
    return resp.status(500).json({ error });
  }
}
