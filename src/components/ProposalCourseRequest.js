import useProposalRequest from "../hooks/useProposalRequest"
import { useState,useContext } from "react"
import {AuthContext} from './Context/AuthContext'
import { toast } from "react-toastify";
import { body, div } from "framer-motion/client";
import { data } from "autoprefixer";
const ProposalCourseRequest = ({ Id ,Content_type }) => {
  const [selectedAgrrement, setSelectedAgreement] = useState(false);
    const { fetchWithAuth } = useContext(AuthContext);
    const { values, errors, handleChange, isValid } = useProposalRequest({
      message: "",
      price: 0,
      is_agreement: selectedAgrrement,
      course: {Id},
    });
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (Content_type === 30) {
        try {
          const response = await fetchWithAuth(`https://127.0.0.1:8000/classroom/regesiter-course/${Id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})  // چون DRF انتظار یه body داره
          });
          
          setLoading(false);  // همیشه بعد از پاسخ، لودینگ رو false کن
          if(response.ok){
            
            toast.success('پیش ثبت نام شما با موفقیت انجام شد در انتظار تایید استاد بمانید')
            
          }
          if(!response.ok){
            let data=await response.json()
            throw data

          }
          
      
        } catch (error) {
          let message ;

  if (Array.isArray(error)) {
    message = error.join(", ");
  } else if (typeof error === 'object') {
    message = Object.values(error).flat().join(", ");
  } else if (typeof error === 'string') {
    message = error;
  }
  if (message===''){
    let message = "خطایی رخ داده است ،لطفا اگر وارد نشدید ابتدا وارد شوید!";
    toast.error(message);
  }
  else{
    toast.error(message);
  
  setLoading(false);
  }
        }
      }
      
        if(isValid()){
          setLoading(true);
          if(Content_type===12){
            try {
              const response = await fetchWithAuth(`https://127.0.0.1:8000/classroom/proposers-request/${Id}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              if(response.ok){
                toast.success('پیشنهاد شما ثبت شد')
                setLoading(false);
              }
              if (!response.ok){
                throw await response.json();
                setLoading(false);
              } 
              
            } catch (error) {
              setError(error);
            } 
        }
        
          }
      
      };
    
      
    return (
      <>
        {Content_type===12 &&
        (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h3 className="text-lg font-semibold">ارسال پیشنهاد</h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <textarea
            name="message"
            value={values.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="متن پیشنهاد"
            required
          />
          {errors.message && <p className="text-red-500">{errors.message}</p>}
  
          <input
            type="number"
            name="price"
            value={values.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="قیمت پیشنهادی"
            required
          />
          {errors.price && <p className="text-red-500">{errors.price}</p>}
          <label>مایل به توافق بر سر قیمت هستم
          <div>
          <label> بله 
          <input type='radio' name="agreement" value={true} checked={selectedAgrrement===true} onClick={()=>setSelectedAgreement(true)}/>
          </label>
          <label> خیر
          <input type='radio' name="agreement" value={true} checked={selectedAgrrement===false} onClick={()=>setSelectedAgreement(false)}/>
          </label>
          </div>
          </label>
          <button
            
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "ارسال پیشنهاد"}
          </button>
        </form>
      </div>
        )}
        { Content_type===30&&
        (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
              <h3 className="text-lg font-semibold">
                  ثبت نام کردن
              </h3>
              <p>
                برای پیش ثبت نام کردن کلاس کلیک کنید
              </p>
              <button
              onClick={handleSubmit}
            
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition mt-2"
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "پیش ثبت نام در کلاس"}
          </button>

          </div>
        )
      }
      </>
    );
  };
export default ProposalCourseRequest
// const ProposalCourseRequest=({id})=>{
//     const {fetchWithAuth}=useContext(AuthContext)
//     const idCourse={id}.id
//     const[isLoading,setLoading]=useState(false)//fill
//     const[isError,setError]=useState({
//         message:'',
//         price:''
//     })// ارور ها را در یک باکس بعدن نمایش بده
//     const { values, errors, handleChange, isValid }=useProposalRequest({
//         message:'',
//         price:0,
//         is_agreement:false,
//         course:idCourse

//     })


// async function sendOffer(offer) {
//            try{
            
//             const response= await fetchWithAuth(`https://127.0.0.1:8000/classroom/proposers-request/${id}/`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(offer),
//               })
           
//            if (!response.ok) {
//             let errorData = await response.json(); // دریافت متن خطا از بک‌اند
//             throw errorData; // ارسال خطا به بخش catch
            
//           }
//           let data = await response.json();
//       console.log("ثبت‌نام موفق:", data);
      
//     } catch (error) {
      
//       console.error("خطا:", error);
//       setError({
//         message: error.message || "",
//         price:error.price|| "",
//       })
//         }}
// const handleSubmit=(e)=>{
//     console.log(values)
//     e.preventDefault();
//     setLoading(true);
//     if(isValid){
//         sendOffer(values)
//     }
    
// }
//     return(
//         <>
//             <div>
//                 <div>
//                     <form onSubmit={handleSubmit}>
//                         <input type="text" name="message" value={values.message} onChange={handleChange} placeholder="پیشنهاد خودتا را در اینجا وارد کنید"/>
//                         {errors.message&&<p>{errors.message}</p>}
//                         <input type="number" name="price" value={values.price} onChange={handleChange} placeholder=" قیمت پیشنهادی خود را وارد کنید"/>
//                         {errors.price&&<p>{errors.price}</p>}
//                         <button>
//                             send
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </>
//     )

// }
// export default ProposalCourseRequest