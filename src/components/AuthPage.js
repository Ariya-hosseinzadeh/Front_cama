import { useEffect, useState} from "react";
import { X } from "lucide-react";
import useFormValidation from "../hooks/useFormValidation";

export default function AuthPage() {
  
  const[isInside,setInside]=useState(true)
  const [isLogin, setIsLogin] = useState(true);
  const[isError,setError]=useState({username: "",
    email: "",
    password: "",})
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, isValid } = useFormValidation({
    username: "",
    email: "",
    password: "",
    
  });
  async function LoginUser(userData) {
    try {
      let response = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        
      });
  
      if (!response.ok) {
        let errorData = await response.json(); // دریافت متن خطا از بک‌اند
        throw errorData; // ارسال خطا به بخش catch
        
      }
      console.log(userData);
      let data = await response.json();
      console.log("ورود موفق :", data);
    } catch (error) {
      console.error("خطا:", error);
      return error
    }
  }
  
  async function Signup(userData) {
    try {
      let response = await fetch("http://127.0.0.1:8000/users/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        let errorData = await response.json(); // دریافت متن خطا از بک‌اند
        throw errorData; // ارسال خطا به بخش catch
        
      }
      // else if(response.ok){
      //   setSuccess(true)
      // }
      let data = await response.json();
      console.log("ثبت‌نام موفق:", data);
    } catch (error) {
      
      console.error("خطا:", error);
      setError({
        username: error.username || "",
        email: error.email || "",
        password: error.password || ""
      })
      
      console.log(isError)
      
    }
    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (isValid()) {
      
      console.log("✅ اطلاعات معتبر است:", values,isLogin);
      // درخواست API برای ورود یا ثبت‌نام
      if(!isLogin){
        Signup(values)
      }
      else{
        LoginUser(values)
      }
    }
  };
  
  return (
    <>
      {isInside ? (
  <div className="fixed w-full inset-0  flex justify-center items-center">
    {/* بک‌دراپ با w-full و h-full */}
    <div className="fixed w-full h-full bg-black bg-opacity-30 backdrop-blur-sm"></div>

    <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-[82%] w-[400px]">
      {/* دکمه بستن */}
      <div className="absolute top-4 rtl:right-5 ltr:right-80">
        <button onClick={() => setInside(!isInside)}>
          <X />
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? "ورود به حساب" : "ثبت‌نام در کاما"}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="یک نام کاربری بسازید"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={values.name}
              onChange={handleChange}
              required
            />
            {isError.username !== " " && <p>{isError.username}</p>}
          </div>
        )}
        <div>
          <input
            type="email"
            name="email"
            placeholder="ایمیل"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={values.email}
            onChange={handleChange}
            required
          />
          {isError.email !== " " && <p>{isError.email}</p>}
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="رمز عبور"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={values.password}
            onChange={handleChange}
            required
          />
          {isError.password !== " " && <p>{isError.password}</p>}
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
          {isLogin ? "ورود" : "ثبت‌نام"}
        </button>
      </form>

      <p className="text-center text-sm mt-4">
        {isLogin ? "حساب ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
        <button
          className="text-blue-600 hover:underline ml-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "ثبت‌نام کنید" : "ورود"}
        </button>
      </p>
    </div>
  </div>
) : (
  <div>
    <button onClick={() => setInside(true)}>ثبت نام کنید یا وارد شوید</button>
  </div>
)}

    </>
  );
}
