// Logout.js
import { useContext } from "react";
import { AuthContext } from "../components/Context/AuthContext";

const LogOut = () => {
  const { logout } = useContext(AuthContext);
  const{fetchWithAuth}=useContext(AuthContext)
  const handleLogout = async () => {
    let response=await fetchWithAuth("https://127.0.0.1:8000/users/coustom-log-out/", {
      method: "POST",
      credentials: "include", // ارسال کوکی‌ها همراه درخواست
    });
    if(response.ok){
        
    }
    logout(); // حذف کاربر از کانتکست
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>

    </>
  )
};

export default LogOut;
