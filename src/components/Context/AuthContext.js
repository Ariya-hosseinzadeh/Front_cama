import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem('accessToken'));
  const [user, setUser] = useState(null);
  const [changeCourse,setChangeCourse]=useState(false)
  const InitialAccessToken=(token)=>{
    
    setAccessToken(token)
  }

  useEffect(() => {
    if (accessToken) {
      fetchWithAuth("https://127.0.0.1:8000/users/user-current/", {credentials: "include" })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data))
      .catch(() => {
        setAccessToken(null);
        sessionStorage.removeItem("accessToken");
        console.log('error')
      });
      
    }
  }, [accessToken]);
  const userRegister=()=>{
    
    if (accessToken) {
      alert('ok')
      fetchWithAuth("https://127.0.0.1:8000/users/user-current/", {credentials: "include" })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setUser(data))
      .catch(() => {
        setAccessToken(null);
        sessionStorage.removeItem("accessToken");
        
      });
      
    }
  }
  
  async function login(credentials) {
    const res = await fetch('https://127.0.0.1:8000/users/login/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include"
    });

    if (res.ok) {
      toast.success("ورود موفقیت‌آمیز بود! در حال انتقال...");
        
      const data = await res.json();
      sessionStorage.setItem("accessToken", data.access);
      
      setAccessToken(data.access);
      setUser(data.user);
      sessionStorage.setItem('User',data.user)
    }
        
      if (!res.ok) {
        
        let errorData = await res.json(); // دریافت متن خطا از بک‌اند
        toast.error(errorData.detail || "خطا در ورود", {
          autoClose: 2000, // ۲ ثانیه
        });
        throw errorData; // ارسال خطا به بخش catch
        
      }
    
  }

  async function refreshToken() {
    
    const response = await fetch('https://127.0.0.1:8000/users/refresh-token/', {
      method: 'POST',
      credentials: 'include' // ارسال کوکی `httpOnly`
    });

    if (response.ok) {
      
      const data = await response.json();
      sessionStorage.setItem('accessToken', data.access);
      setAccessToken(data.access);
      return data.access;
    } else {
      
      logout(); // اگر توکن رفرش معتبر نباشد، کاربر را از سیستم خارج کن
      throw new Error('Session expired');
      
    }
  }
//   function getCookie(name) {
//     const cookies = document.cookie.split("; ");
//     for (let i = 0; i < cookies.length; i++) {
//         const [cookieName, cookieValue] = cookies[i].split("=");
//         if (cookieName === name) {
//             return decodeURIComponent(cookieValue);
//         }
//     }
//     return null;
// }

  async function logout() {
    let response=await fetchWithAuth("https://127.0.0.1:8000/users/coustom-log-out/", {
      method: "POST",
      credentials: "include", // ارسال کوکی‌ها همراه درخواست
    });
    if(response.ok){
      toast.success("خروج موفقیت‌آمیز بود!");
      
      setUser(null);// حذف اطلاعات محلی
      setAccessToken(null);
      sessionStorage.removeItem("accessToken");
      
      
    }
    if(!response.ok){
      toast.error("خطا در هنگام خروج لطفا دوباره امتحان کنید\nدر صورت خطای مجدد با پشتیبانی تماس بگیرید",{autoClose:3500})
    }
                  
        
}


async function fetchWithAuth(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      credentials: 'include', 
      headers: { Authorization: `Bearer ${accessToken}`, ...options.headers },
    });
  
    if (res.status === 401) {
      try {
        const newToken = await refreshToken();
        return fetch(url, {
          ...options,
          credentials: 'include', 
          headers: { Authorization: `Bearer ${newToken}`, ...options.headers },
        });
      } catch (error) {
        if(res.status===401){
          toast.error('لطفا ابتدا وارد شوید')
        }
        logout();
        throw error;
      }
    }
  
    return res;
  }
  return (
    <AuthContext.Provider value={{ user, accessToken,changeCourse,setChangeCourse, login, logout, refreshToken,fetchWithAuth,userRegister,InitialAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
