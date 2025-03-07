import { useState} from "react";
import useCourseValidation from "../hooks/useCourseValidation";
import CategorySelector from "../components/CategorySelector"
const Course=()=>{
const [isloadin,setIsloading]=useState(false)
const [category,setCategory]=useState('')
const[CouresCreate,setCourseRequest]=useState(true)
const { values, errors, handleChange, isValid }=useCourseValidation({
    Title:"",
    description:"",
    CapacityCourse:"",
    CountClass:"",
    SuggestedTime:"",
    category:"", 
    images:""
})

const[isError,setError]=useState({
    Title:"",
    description:"",
    CapacityCourse:"",
    CountClass:"",
    SuggestedTime:"",
    images:"",
    category:"",

})

async function createCourse(formData){
    try {
        let response = await fetch("http://127.0.0.1:8000/classroom/create-course/", {
          method: "POST",
          body: formData,
          
        });

    
        if (!response.ok) {
          let errorData = await response.json(); // دریافت متن خطا از بک‌اند
          throw errorData; // ارسال خطا به بخش catch
          
        }
        
        let data = await response.json();
        console.log("انجام شد", data);
      } catch (error) {
        console.error("خطا:", error);
        setError(
    {Title:error.Title || '',
    description:error.description || '',
    CapacityCourse:error.CapacityCourse || '',
    CountClass:error.CountClass|| '',
    SuggestedTime:error.SuggestedTime || '',
    images:error.images || '',
    category:error.category || '',}
        )
        
      }
}
async function requestCourse(userData){
    try {
        let response = await fetch("http://127.0.0.1:8000/classroom/request-course/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
          
        });
        
        if (!response.ok) {
          let errorData = await response.json(); // دریافت متن خطا از بک‌اند
          throw errorData; // ارسال خطا به بخش catch
          
        }
        
        let data = await response.json();
        console.log("انجام شد", data);
      } catch (error) {
        console.error("خطا:", error);
        return error
        
      }

}
const handleSubmit=(e)=>{
    e.preventDefault();
        if(isValid){
            
            if (CouresCreate){
                let formData = new FormData();
            formData.append("Title", values.Title);
            formData.append("description", values.description);
            formData.append("CapacityCourse", values.CapacityCourse);
            formData.append("CountClass", values.CountClass);
            formData.append("SuggestedTime", values.SuggestedTime);
            formData.append("category", category.id);
            if (values.images) {
                formData.append("images", values.images);
                 // ارسال فایل تصویر
                 createCourse(formData)
            }
               
            }
            else{   
                values.category=category.id
                requestCourse(values)
            }
            
        }
}
    return(
        <>
            <div>
                <div>
                    <h2>
                        {CouresCreate?`request`:`create`}
                    </h2>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <label>test</label>
                            <input type="text" name="Title" value={values.Title} onChange={handleChange} placeholder="title for request"/>
                            {errors.Title&&<p>{errors.Title}</p>}
                            {isError.Title &&<p>{isError.Title}</p>}
                        </div>
                        <div>
                            <label/>
                            <input type="text" name="description" value={values.description} onChange={handleChange} placeholder="description for request" />
                            {errors.description&&<p>{errors.description}</p>}
                            {isError.description &&<p>{isError.description}</p>}
                        </div>
                        <div>
                            <input type="number" name="CountClass" value={values.CountClass} onChange={handleChange} placeholder="countclass for request"/>
                            {errors.CountClass&&<p>{errors.CountClass}</p>}
                            {isError.CountClass &&<p>{isError.CountClass}</p>}
                        </div>
                        <div>
                            <input type="datetime-local" name="SuggestedTime" value={values.SuggestedTime} onChange={handleChange} placeholder="SuggestedTime for request"/>
                            {isError.SuggestedTime && <p>{isError.SuggestedTime}</p>}
                        </div>
                        <div>
                            <CategorySelector Select={setCategory}/>
                        </div>
                        {
                            CouresCreate &&(
                                <>  
                                    <div>
                                        <input type="number" name="CapacityCourse" value={values.CapacityCourse} onChange={handleChange} placeholder="ظرفیت کلاس خودرا وارد کنید،اگر کلاس خصوصی است میتوانید وراد نکنید"/>
                                        {errors.CapacityCourse&&<p>{errors.CapacityCourse}</p>}
                                        {isError.CapacityCourse&&<p>{isError.CapacityCourse}</p>}
                                    </div>
                                    <div>
                                        <input type="file"  onChange={(e) => handleChange({ target: { name: "images", value: e.target.files[0] } })} name="images" accept="image/*" placeholder="عکس دلخواه تان را برای کلاستان بارگزاری کنید" />
                                        {isError.images&&<p>{isError.images}</p>}
                                    </div>
                                    
                                </>
                            )
                        }
                        <button >
                            ایجاد کردن
                        </button>
                    </form>
                </div><button onClick={()=> setCourseRequest(!CouresCreate)}>
                        {CouresCreate?'متقاضی ایجاد کلاس ':'تشکیل ایجاد یک کلاس'}
                </button>
            </div>
        </>
    )
}
export default Course