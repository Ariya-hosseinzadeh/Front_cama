import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("accessToken")||'');
  const [user, setUser] = useState(null);
  
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
  
  async function login(credentials) {
    const res = await fetch('https://127.0.0.1:8000/users/login/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include"
    });

    if (res.ok) {
      const data = await res.json();
      sessionStorage.setItem("accessToken", data.access);
      
      setAccessToken(data.access);
      setUser(data.user);
      sessionStorage.setItem('User',data.user)
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

  function logout() {
    setUser(null);
    setAccessToken(null);
    sessionStorage.removeItem("accessToken");
    fetch('/api/logout', { method: 'POST', credentials: 'include' });
  }

async function fetchWithAuth(url, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: { Authorization: `Bearer ${accessToken}`, ...options.headers },
    });
  
    if (res.status === 401) {
      try {
        const newToken = await refreshToken();
        return fetch(url, {
          ...options,
          headers: { Authorization: `Bearer ${newToken}`, ...options.headers },
        });
      } catch (error) {
        
        logout();
        throw error;
      }
    }
  
    return res;
  }
  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, refreshToken,fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
