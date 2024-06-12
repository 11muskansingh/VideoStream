//We will assume that the files are already stored temporarily on our server. We are following the next steps.

import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //file system

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadonCloudinary = async (filepath) => {
  try {
    if (!filepath) return null;
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(filepath, {
      resource_type: "auto",
    });
    //file uploaded successfully
    console.log("File uploaded successfully", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(filepath); //remove the temporary saved file from our server
    return null;
  }
};
export { uploadonCloudinary };
