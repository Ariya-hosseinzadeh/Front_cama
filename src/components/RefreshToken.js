async function refreshToken() {
    const response = await fetch('https://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      credentials: 'include' // ارسال کوکی `httpOnly`
    });
  
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('accessToken', data.access); // ذخیره توکن جدید
      return data.access;
    } else {
      throw new Error('Session expired');
    }
  }
export default refreshToken  