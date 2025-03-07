import { useState } from "react";
const validateTitle=(Title)=>Title.length<30;
const validateDescription=(description)=>description.length>30;
const validateCountCourse=(CountClass)=>CountClass>=1;
const validateCapicityCourse=(CapicityClass)=>CapicityClass>=1;
export default function useCourseValidation(initialState){
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        let error = "";
        if (name==="Title"&&!validateTitle(value)){
            error="لطفا عنوان کوتاه و دربرگیرنده انتخاب کنید برای توضیحات اضافی به فیلد بعدی مراجعه کنید"
        }
        else if(name==="description"&&!validateDescription(value)){
            error=" توضیحات شما نمی تواند کمتر از 30 کاراکتر باشد"
        }
        else if(name==="CountClass" && !validateCountCourse(value)){
            error=" ورودی نامعتبر"
            
        }
        else if(name==="CapacityCourse"&& !validateCapicityCourse(value)) error='ورودی نامعتبر '
        
        setErrors({ ...errors, [name]: error });
}
const isValid = () => {
    const newErrors = {};
    if (!validateTitle(values.Title)) newErrors.Title='i';
    if (!validateDescription(values.description)) newErrors.description='i';
    if (!validateCountCourse(values.CountClass)) newErrors.CountClass='d';
    if(!validateCapicityCourse(values.CapacityCourse)) newErrors.CountClass='';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}

    return { values, errors, handleChange, isValid };
}