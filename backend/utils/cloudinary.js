import cloudinary from "cloudinary";
import ErrorHandler from "./errorHandler";


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploads=async (file,folders)=>{


   const options = {
    folder:folders
  };

  try{
    const data=cloudinary.v2.uploader.upload(file, options);
    return data;
  }catch(err){
    throw new ErrorHandler("Өөө, Файл хуулахад алдаа гарлаа !!!",400);
  }
}

const deleteImage =async (url,folders)=>{


  const options = {
    folder:folders
  };

  const publicId = url.split("/").pop().split(".")[0];
  const res=await cloudinary.v2.uploader.destroy(folders+"/"+publicId);
  console.log(res);

}

export {uploads, deleteImage, cloudinary}