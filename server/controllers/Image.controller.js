import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../modals/user.model.js";

// Controller function to remove background from image

const removeBgImage = async (req, res) => {
  try {
    // Get image from frontend to backend
    const { clerkId } = req.body;


    //* Checks the user exists in the database 
    //* if no user is found, returns an error response
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: "User Not found 💀" });
    }
    //* if user has 0 credits they cannot use the bakground removal feature
    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "Buy Some Credits 💸",
        creditBalance: user.creditBalance,
      });
    }

    //* Retrieves the uploaded image file path
    const imagePath = req.file.path;

    //*    Reading the image file
    const imageFile = fs.createReadStream(imagePath);

    //* Creates a formdata object and appends the image file 
    const formdata = new FormData();
    formdata.append("image_file", imageFile);

    //* Sends a post request to clip drop api for background removal
    //* The response returns binary image data

    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formdata,
      {
        headers: {
          "x-api-key": process.env.CLIP_DROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    // sending  base 64 image to the frontend
    //* Formats the base64 image url using req.file.mimetype
    const base64Image = Buffer.from(data, "binary").toString("base64");

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // deducted one from the free credit
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    //* send the processed image (result image back to the frontend)
    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      //* Sends a success message

      message: "Background Removed ✔️",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { removeBgImage };
