import { useEffect, useState } from "react";
import axios from "axios";

// Hook personalizado para obtener los detalles del usuario
const useUserDetails = (router: any) => {
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    fullname: "",
    age: "",
    isVerified: false,
  });

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/userdata");
        const user = res.data.data;
        setUserData(user);
        if (!user.isVerified) {
          router.push("/verifyemail");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserDetails();
  }, []);

  return userData;
};

export default useUserDetails;
