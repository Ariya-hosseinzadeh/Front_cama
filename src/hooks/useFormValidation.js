import { useState } from "react";

// توابع بررسی اعتبار ورودی‌ها
const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatelengthPassword=(password)=>password.length>8;
const validateupperPassword=(password)=>/[A-Z]/.test(password);
const validateCharPassword=(password)=>/[!@#$%^&*]/.test(password);
const validatenumberPassword=(password)=>/[0-9]/.test(password);
const validatelowerPassword=(password)=>/[a-z]/.test(password);
export default function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
 
    
  
  // مدیریت تغییرات ورودی‌های فرم
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
      
    // بررسی و نمایش خطاها
    let error = "";
    if (name === "email" && !validateEmail(value)) {
      error = "ایمیل نامعتبر است!";
    } else if (name === "password" && !validatelengthPassword(value)) {
      error = 'رمز عبور باید بیش از 8 کاراکتر داشته باشد';
    }
    setErrors({ ...errors, [name]: error });
  };

  // بررسی صحت فرم قبل از ارسال
  const isValid = () => {
    const newErrors = {};
    if (!validateEmail(values.email)) newErrors.email = "ایمیل نامعتبر است!";
    if (!validatenumberPassword(values.password)) newErrors.password='رمز عبور باید حداقل دارای یک عدد باشد';
    if (!validatelowerPassword(values.password)) newErrors.password='رمز عبو باید حداقل دارای حرف کوچک باشد';
    if (!validateupperPassword(values.password)) newErrors.password='رمز عبور باید حداقل  داری یک حرف بزرگ باشد';
    if (!validateCharPassword(values.password)) newErrors.password = 'رمز عبور بایدحداقل  شامل یک کاراکتر خاص باشد';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, errors, handleChange, isValid };
}
