import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [credit, setCredit] = useState(false);
  const [image, setImage] = useState(false);
  const [resultImage, setResultImage] = useState(false);
  // Fetches the backend api url from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { getToken } = useAuth();

  const navigate = useNavigate();

  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  //* Fetching Credit Balance
  const loadCreditsData = async () => {
    try {
      //* fetches user token for authentication

      const token = await getToken();
      //* sends a get request to fetch the credit balance
      const { data } = await axios.get(backendUrl + "/api/user/credits", {
        headers: { token },
      });

      //* If success ,updates the credit state
      if (data.success) {
        setCredit(data.credits);
        console.log(data.credits);
      } else {
        toast.error("Failed to load credits");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // Remove Background Function
  const removeBg = async (image) => {
    try {
      //* Checks the user is signed in or not
      if (!isSignedIn) {
        return openSignIn();
      }

      //* Stores the uploaded image
      setImage(image);
      //*  Clears the previous result
      setResultImage(false);

      navigate("/result");

      //* Gets the auth token
      const token = await getToken();
      //* prepares form data and sends a post request
      const formData = new FormData();
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/image/remove-bg",
        formData,
        { headers: { token } }
      );

      //* if success ,updates resultImage and credit balance
      if (data.success) {
        setResultImage(data.resultImage);
        data.creditBalance && setCredit(data.creditBalance);
      } else {
        toast.error(data.message);
        data.creditBalance && setCredit(data.creditBalance);
        //* if user runs out of credit redirect to buy page
        if (data.creditBalance === 0) {
          navigate("/buy");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    credit,
    setCredit,
    loadCreditsData,
    backendUrl,
    removeBg,
    image,
    resultImage,
    setResultImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
