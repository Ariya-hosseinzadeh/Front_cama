import useProposalRequest from "../hooks/useProposalRequest"
const { useState} = require("react")

const ProposalCourseRequest=({id})=>{
    const idCourse={id}.id
    const[isLoading,setLoading]=useState(false)//fill
    const[isError,setError]=useState({
        message:'',
        price:''
    })// ارور ها را در یک باکس بعدن نمایش بده
    const { values, errors, handleChange, isValid }=useProposalRequest({
        message:'',
        price:0,
        is_agreement:false,
        course:idCourse

    })


async function sendOffer(offer) {
           try{
            
            const response= await fetch(`http://127.0.0.1:8000/classroom/proposers-request/${id}/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(offer),
              })
           
           if (!response.ok) {
            let errorData = await response.json(); // دریافت متن خطا از بک‌اند
            throw errorData; // ارسال خطا به بخش catch
            
          }
          let data = await response.json();
      console.log("ثبت‌نام موفق:", data);
      
    } catch (error) {
      
      console.error("خطا:", error);
      setError({
        message: error.message || "",
        price:error.price|| "",
      })
        }}
const handleSubmit=(e)=>{
    console.log(values)
    e.preventDefault();
    setLoading(true);
    if(isValid){
        sendOffer(values)
    }
    
}
    return(
        <>
            <div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="message" value={values.message} onChange={handleChange} placeholder="پیشنهاد خودتا را در اینجا وارد کنید"/>
                        {errors.message&&<p>{errors.message}</p>}
                        <input type="number" name="price" value={values.price} onChange={handleChange} placeholder=" قیمت پیشنهادی خود را وارد کنید"/>
                        {errors.price&&<p>{errors.price}</p>}
                        <button>
                            send
                        </button>
                    </form>
                </div>
            </div>
        </>
    )

}
export default ProposalCourseRequest