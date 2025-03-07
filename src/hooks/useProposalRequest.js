import { useState } from "react";

const validatePrice=(price)=> price>=0&&price<10000000
const validateMessage=(message)=>message.length>50
export default function useProposalRequest(initialState){
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const handleChange=(e)=>{
        
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        
        let error = "";
        if(name==='message'&& !validateMessage(value)) error='پیشنهاد شما کوتاه است لطفا برای انتخاب بهتر کمی بیشتر از پیشنهادتان بگید'
        if(name==='price'&& !validatePrice(value)&&values.price>10000000) error='قیمت پیشنهادی تان از حد قیمت کلاس ها  برای یک جلسه بیشتر است'
        if(name==='price'&& !validatePrice(value)) error='ورودی نامعتبر'
        
        setErrors({ ...errors, [name]: error });
    }
    const isValid = () => {
        const newErrors = {};
        if(!validateMessage(values.message)){newErrors[values.message]='ورودی نا معتبر'}
        if(!validateMessage(values.price)){newErrors[values.price]='ورودی نا معتبر'}
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    return { values, errors, handleChange, isValid };
}