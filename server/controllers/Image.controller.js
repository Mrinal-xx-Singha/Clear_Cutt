import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import userModel from "../modals/user.model.js";

// Controller function to remove background from image

const removeBgImage = async (req, res) => {
  try {
    // Get image from frontend to backend
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: "User Not found 💀" });
    }
    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "Buy Some Credits 💸",
        creditBalance: user.creditBalance,
      });
    }

    const imagePath = req.file.path;

    //    Reading the image file
    const imageFile = fs.createReadStream(imagePath);

    const formdata = new FormData();
    formdata.append("image_file", imageFile);

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
    const base64Image = Buffer.from(data, "binary").toString("base64");

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // deducted one from the free credit
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
      message: "Background Removed ✔️",
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export { removeBgImage };
