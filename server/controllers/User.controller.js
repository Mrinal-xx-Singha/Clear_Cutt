// API CONTROLLER FUNCTION TO MANAGE CLERK USER WITH DATABASE
//HTTP://LOCALHOST:4000/API/USER/WEBHOOKS
import { Webhook } from "svix";
import userModel from "../modals/user.model.js";
import razorpay from "razorpay";
import transactionModel from "../modals/transaction.model.js";
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
      await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
      res.json({});

      break;
    }
    case "user.deleted": {
      await userModel.findOneAndDelete({ clerkId: data.id });
      res.json({});
      break;
    }
  }
};

// API Controller function to get available user credit data

const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    console.log("Error Occurred", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// initialize our razor pay payment Gateway initialize

const razorPayInstance = new razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

// Controller function for credits

const paymentRazorPay = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;

    const userData = await userModel.findOne({ clerkId });

    if (!userData || !planId) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    let credits, plan, amount, date;

    // details to create payment
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        break;
    }
    date = Date.now();

    // Creating Transation

    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };
    // store in database
    const newTransaction = await transactionModel.create(transactionData);

    // options for razorpay
    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    // Razor pay order
    await razorPayInstance.orders.create(options, (error, order) => {

      if (error) {
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log("Error Occurred", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// API CONTROLLER FUNCTION TO VERIFY RAZORPAY PAYMENT
const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status === "paid"){

      // Payment successfull
      const transactionData = await transactionModel.findById(orderInfo.receipt)


      if(transactionData.payment){
        return res.json({success:false,message:"Payment Failed"})

      }

      // Adding credits in user data
      const userData = await userModel.findOne({clerkId:transactionData.clerkId})
      // Updated credit Balance
      const creditBalance = userData.creditBalance + transactionData.credits

      // By executing this statement credtis will be credited in the users account
      await userModel.findByIdAndUpdate(userData._id,{creditBalance})

      // Making the payment true
      await transactionModel.findByIdAndUpdate(transactionData._id,{
        payment:true
      })
      res.json({success:true,message:"Credits Added"})

    }
  } catch (error) {
    console.log("Error Occurred", error.message);
    res.json({ success: false, message: error.message });
  }
};

export { clerkWebHooks, userCredits, paymentRazorPay,verifyRazorPay };
