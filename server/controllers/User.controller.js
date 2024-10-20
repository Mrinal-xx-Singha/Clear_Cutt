// API CONTROLLER FUNCTION TO MANAGE CLERK USER WITH DATABASE
//HTTP://LOCALHOST:4000/API/USER/WEBHOOKS
import { Webhook } from "svix";
import userModel from "../modals/user.model.js";
const clerkWebHooks = async (req, res) => {
  try {
    // Create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
  } catch (error) {
    console.log("Error Occured", error.message);
    res.json({ success: false, message: error.message });
  }

  const { data, type } = req.body;

  switch (type) {
    case "user.created": {
      const userData = {
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        photo: data.image_url,
      };
      await userModel.create(userData);
      res.json({});
      break;
    }
    case "user.updated": {
      const userData = {
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        photo: data.image_url,
      };
      await userModel.findOneAndUpdate({clerkId:data.id},userData)
      res.json({})

      break;
    }
    case "user.deleted": {
        await userModel.findOneAndDelete({clerkId:data.id})
        res.json({})
      break;
    }
  }
};

export {clerkWebHooks} 