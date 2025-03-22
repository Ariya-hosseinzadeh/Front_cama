import { useContext, useEffect, useState} from "react";
import { DoorClosed, X } from "lucide-react";
import useFormValidation from "../hooks/useFormValidation";
import { AuthContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function AuthPage() {
  const {InitialAccessToken}=useContext(AuthContext)
  const {userRegister}=useContext(AuthContext)
  const{user}=useContext(AuthContext)
  const[isInside,setInside]=useState(true);
  const [isLogin, setIsLogin] = useState(true);
  
  const[isError,setError]=useState({username: '',
    email: '',
    password: '',error:''})
  const [loading, setLoading] = useState(false);
  const { values, errors, handleChange, isValid } = useFormValidation({
    username: "",
    email: "",
    password: "",
    
    
  });
  
  const navigate = useNavigate();
  async function LoginUser(userData) {
    try {
      let response = await fetch("https://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: 'include' // برای ارسال کوکی از سمت سرور
        
        
      });
      if(response.ok){
        let data = await response.json();
        sessionStorage.setItem('accessToken', data.access);
        InitialAccessToken(sessionStorage.getItem('accessToken'))
        
        setLoading(false)
        toast.success("ورود موفقیت‌آمیز بود! در حال انتقال...");
        setTimeout(() => {
          navigate("/");
          
        }, 2500); 
        
        userRegister()
      };
        
        
      if (!response.ok) {
        setLoading(false)
        let errorData = await response.json(); // دریافت متن خطا از بک‌اند
        toast.error(errorData.detail || "خطا در ورود", {
          autoClose: 2000, // ۲ ثانیه
        });
        throw errorData; // ارسال خطا به بخش catch
        
      }
      
      
      // sessionStorage.setItem('user',data.user.id)
      
    } catch (error) {
      console.error("خطا:", error);
      setError({
        username: error.username || "",
        email: error.email || "",
        password: error.error || "",
        
      })
      return error
    }
  }
  
  async function Signup(userData) {
    try {
      let response = await fetch("https://127.0.0.1:8000/users/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        let errorData = await response.json(); // دریافت متن خطا از بک‌اند
        setLoading(false)
        throw errorData; // ارسال خطا به بخش catch
        
      }
      // else if(response.ok){
      //   setSuccess(true)
      // }
      if(response.ok){
        let data = await response.json();
      console.log("ثبت‌نام موفق:", data);
      setLoading(false)
      }
    } catch (error) {
      
      console.error("خطا:", error);
      setError({
        username: error.username || "",
        email: error.email || "",
        password: error.error || "",
        
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
  useEffect(() => {
    if (isInside) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isInside]);
  return (
    <>
      {isInside ? (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          {/* بک‌دراپ با افکت Fade In / Fade Out */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            onClick={() => setInside(false)} // کلیک روی بک‌دراپ مدال را ببندد
          />

          {/* مدال با انیمیشن Slide Down */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-[82%] w-[400px] z-50"
          >
            {/* دکمه بستن */}
            <button
              onClick={() => setInside(false)}
              className="absolute top-4 rtl:right-5 ltr:right-5"
            >
              <X />
            </button>

            {/* عنوان */}
            <h2 className="text-2xl font-semibold text-center mb-4">
              {isLogin ? "ورود به حساب" : "ثبت‌نام در کاما"}
            </h2>

            {/* فرم ورود / ثبت‌نام */}
              
       <form className="space-y-4" onSubmit={handleSubmit}>
         {!isLogin && (
          <div>
            <input
              type="text"
              name="username"
              placeholder="یک نام کاربری بسازید"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={values.username}
              onChange={handleChange}
              required
            />
            {isError.username && <p>{isError.username}</p>}
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
          {/* {isError.email !== " " && <p>{isError.email}</p>}
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>} */}
          <div className="text-red-500 text-sm">
            {isError.email && <p>{isError.email}</p>}
            {errors.email && <p>{errors.email}</p>}
          </div>
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
          {/* {isError.password !== " " && <p>{isError.password}</p>}
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>} */}
          <div className="text-red-500 text-sm">
            {isError.password && <p>{isError.password}</p>}
            {errors.password&& <p>{errors.password}</p>}
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
          {isLogin ? "ورود" : "ثبت‌نام"}
        </button>
        <div className="text-red-500 text-sm">
            {isError.error && <p>{isError.error}</p>}
            
          </div>
      </form>


            {/* لینک تغییر حالت ورود/ثبت‌نام */}
            <p className="text-center text-sm mt-4">
              {isLogin ? "حساب ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
              <button
                className="text-blue-600 hover:underline ml-2"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading}
              >
                {loading ? "در حال ارسال..." : isLogin ? "ثبت‌نام" : "ورود"}
              </button>
              <div>
                {console.log(user)}
              </div>
            </p>
          </motion.div>
        </div>
      ) : (
        <button
          onClick={() => setInside(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          ثبت‌نام کنید یا وارد شوید
        </button>
      )}
    </>
  );
}
//   return (
//     <>
//       {isInside ? (
//   <div className="fixed w-full inset-0  flex justify-center items-center">
//     {/* بک‌دراپ با w-full و h-full */}
//     <div className="fixed w-full h-full bg-black bg-opacity-30 backdrop-blur-sm"></div>

//     <div className="relative bg-white p-8 rounded-2xl shadow-2xl max-w-[82%] w-[400px]">
//       {/* دکمه بستن */}
//       <div className="absolute top-4 rtl:right-5 ltr:right-80">
//         <button onClick={() => setInside(!isInside)}>
//           <X />
//         </button>
//       </div>

//       <h2 className="text-2xl font-semibold text-center mb-4">
//         {isLogin ? "ورود به حساب" : "ثبت‌نام در کاما"}
//       </h2>
      
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         {!isLogin && (
//           <div>
//             <input
//               type="text"
//               name="username"
//               placeholder="یک نام کاربری بسازید"
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//               value={values.name}
//               onChange={handleChange}
//               required
//             />
//             {isError.username !== " " && <p>{isError.username}</p>}
//           </div>
//         )}
//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="ایمیل"
//             className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//             value={values.email}
//             onChange={handleChange}
//             required
//           />
//           {isError.email !== " " && <p>{isError.email}</p>}
//           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//         </div>
//         <div>
//           <input
//             type="password"
//             name="password"
//             placeholder="رمز عبور"
//             className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
//             value={values.password}
//             onChange={handleChange}
//             required
//           />
//           {isError.password !== " " && <p>{isError.password}</p>}
//           {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
//         </div>

//         <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition">
//           {isLogin ? "ورود" : "ثبت‌نام"}
//         </button>
//       </form>

//       <p className="text-center text-sm mt-4">
//         {isLogin ? "حساب ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
//         <button
//           className="text-blue-600 hover:underline ml-2"
//           onClick={() => setIsLogin(!isLogin)}
//         >
//           {isLogin ? "ثبت‌نام کنید" : "ورود"}
//         </button>
//       </p>
//     </div>
//   </div>
// ) : (
//   <div>
//     <button onClick={() => setInside(true)}>ثبت نام کنید یا وارد شوید</button>
//   </div>
// )}

//     </>
//   );


