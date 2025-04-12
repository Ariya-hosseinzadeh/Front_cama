import { useState } from "react";
import diffrentTime from "../Tools/diffrentTime";
const validateBio=(bio)=>bio.length>30;
const validateImage = (e) => {
    const file = e.target?.files?.[0]
    if (!file) return false
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) return false
    if (file.size > 2 * 1024 * 1024) return false
    return true
  }
  
const validateBirthDate=(birthdate)=>diffrentTime(birthdate,new Date())>12;
const useInformationPrivat=(initialState)=>{
    const [values,setValues]=useState(initialState)
    const [errors,setErrors]=useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = "";
    
        if (name === "profileImage") {
          const isValidImage = validateImage(e);
          if (!isValidImage) error = 'عکس نامعتبر است!';
          const file = e.target.files?.[0]
          setValues({ ...values, profileImage: file });
        } else {
          setValues({ ...values, [name]: value });
    
          if (name === "bio" && !validateBio(value)) {
            error = 'کمی بیشتر از خودتان بگویید!';
          } else if (name === "birthdate" && !validateBirthDate(value)) {
            error = 'سن شما باید حداقل ۱۲ سال باشد';
          }
        }
    
        setErrors({ ...errors, [name]: error });
      };
    
      const isValid = () => {
        const newErrors = {};
        if (!validateBio(values.bio)) newErrors.bio = 'بیوگرافی مناسب وارد کنید';
        if (!validateImage({ target: { files: [values.profileImage] } })) newErrors.profileImage = 'فرمت عکس مناسب نیست';
        if (!validateBirthDate(values.birthdate)) newErrors.birthdate = 'سن معتبر نیست (حداقل ۱۲ سال)';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      return { values, errors, handleChange, isValid };
}
export default useInformationPrivat