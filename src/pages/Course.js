import { useState,useContext} from "react";
import useCourseValidation from "../hooks/useCourseValidation";
import CategorySelector from "../components/CategorySelector"
import { AuthContext } from "../components/Context/AuthContext";
const Course=()=>{

const [isloadin,setIsloading]=useState(false)
const [category,setCategory]=useState('')
const[CouresCreate,setCourseRequest]=useState(true)
const[myresponse,setResponse]=useState()
const { values, errors, handleChange, isValid }=useCourseValidation({
    Title:"",
    description:"",
    CapacityCourse:"",
    CountClass:"",
    SuggestedTime:"",
    category:"", 
    images:""
})

const { fetchWithAuth } = useContext(AuthContext);
const{user}=useContext(AuthContext)
console.log(user)
const[isError,setError]=useState({
  Title:'',
  description:'',
  CapacityCourse:'',
  CountClass:'',
  SuggestedTime:'',
  images:'',
  category:'',
  additionError:'',
  Repetition:''

})


async function createCourse(formData){
  
    try {
        let response = await fetchWithAuth("https://127.0.0.1:8000/classroom/create-course/", {
          method: "POST",
          credentials: "include",
          headers: {
            
            // "Content-Type": "application/json", وقتی بصورت formdata میفرستیم نباید این تعیین شود
            //برای ارسال داده‌های FormData، نیازی به تعیین Content-Type نیست، زیرا مرورگر به طور خودکار Content-Type را تنظیم می‌کند.
          },
          body: formData,
          
        });
        if(response.ok){
          
        let data = await response.json();
        console.log(data)
        setResponse({...data})
        setIsloading(false)
        }
    
        if (!response.ok) {
          let errorData = await response.json(); // دریافت متن خطا از بک‌اند
          setIsloading(false)
          console.log(errorData)
          throw errorData; // ارسال خطا به بخش catch
          
        }
        
        
      } catch (error) {
      
       setError({...error})  
        
      }
}
async function requestCourse(courseData){
    try {
      setResponse({...{}})
        let response = await fetchWithAuth("https://127.0.0.1:8000/classroom/request-course/", {
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(courseData),
});
        if(response.ok){
        
        let data = await response.json();
        console.log("انجام شد", data);
        setResponse(data)
        setIsloading(false)
        console.log(response)
        }

        if (!response.ok) {
          let errorData = await response.json(); // دریافت متن خطا از بک‌اند
          setIsloading(false)
          throw errorData; // ارسال خطا به بخش catch
          
        }
        
        
      } catch (error) {
        
        setError({...error})
        
        
      }

}
const handleSubmit=(e)=>{
    e.preventDefault();
     setError({...{}})
     console.log(user)
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
                 setIsloading(true)
                 createCourse(formData)
            }
               
            }
            else{   
                values.category=category.id
                setIsloading(true)
                requestCourse(values)
                
            }
            
        }
}
    return(
        <>
      {isloadin?<div>
        {user==null?<div><p> برای استفاده از خدمات<span>وارد شوید </span></p></div>:<div><p> is Loading...</p></div>
        
      
      }
      </div>:
      <div>
            <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {CouresCreate ? "درخواست تشکیل کلاس" : "ایجاد کلاس"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* فیلد عنوان */}
        <div>
          <label className="block text-gray-700">عنوان کلاس</label>
          <input
            type="text"
            name="Title"
            value={values.Title}
            onChange={handleChange}
            placeholder="عنوان کلاس را وارد کنید"
            className={`w-full px-4 py-2 border rounded-lg ${errors.Title&& `ring-2 ring-red-500`} focus:ring-2 focus:ring-blue-500 `}
            required
          />
          {errors.Title && <p className="text-red-500 text-sm">{errors.Title}</p>}
        </div>

        {/* فیلد توضیحات */}
        <div>
          <label className="block text-gray-700">توضیحات</label>
          <input
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="توضیحات کلاس"
            className={`w-full px-4 py-2 border rounded-lg ${errors.description&& `ring-2 ring-red-500`} focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        {/* تعداد جلسات */}
        <div>
          <label className="block text-gray-700">تعداد جلسات</label>
          <input
            type="number"
            name="CountClass"
            value={values.CountClass}
            onChange={handleChange}
            placeholder="تعداد جلسات کلاس"
            className={`w-full px-4 py-2 border rounded-lg ${errors.CountClass&& `ring-2 ring-red-500`} focus:ring-2 focus:ring-blue-500`}
            required
          />
          {errors.CountClass && <p className="text-red-500 text-sm">{errors.CountClass}</p>}
        </div>

        {/* زمان پیشنهادی */}
        <div>
          <label className="block text-gray-700">زمان پیشنهادی</label>
          <input
            type="datetime-local"
            name="SuggestedTime"
            value={values.SuggestedTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          {isError.SuggestedTime && <p className="text-red-500 text-sm">{isError.SuggestedTime}</p>}
        </div>

        {/* انتخاب دسته‌بندی */}
        <div>
          <CategorySelector Select={setCategory} />
          {isError.category&&<p className="text-red-500 text-sm">{isError.category}</p>}
        </div>
          {
            !CouresCreate&&(
              <div>
                {isError.Repetition?<p className="text-red-500 text-sm">{isError.Repetition}</p>:(
              <>
                {myresponse&&<p className="text-red-500 text-sm">{myresponse.status}</p>}
              </>
             )}
              </div>
            )
          }
        {/* اطلاعات اضافی در حالت ایجاد کلاس */}
        {CouresCreate && (
          <>
            {/* ظرفیت کلاس */}
            <div>
              <label className="block text-gray-700">ظرفیت کلاس</label>
              <input
                type="number"
                name="CapacityCourse"
                value={values.CapacityCourse}
                onChange={handleChange}
                placeholder="ظرفیت کلاس را وارد کنید"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.CapacityCourse && <p className="text-red-500 text-sm">{errors.CapacityCourse}</p>}
            </div>

            {/* آپلود تصویر */}
            <div>
              <label className="block text-gray-700">تصویر کلاس</label>
              <input
                type="file"
                onChange={(e) => handleChange({ target: { name: "images", value: e.target.files[0] } })}
                name="images"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {isError.images && <p className="text-red-500 text-sm">{isError.images}</p>}
            </div>
            <div>
             {isError.Repetition?<p className="text-red-500 text-sm">{isError.Repetition}</p>:(
              <>
                {myresponse&&<p className="text-red-500 text-sm">{myresponse.status}</p>}
              </>
             )}
            </div>
          </>
        )}

        {/* دکمه ثبت */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          ایجاد کردن
        </button>
      </form>

      {/* دکمه تغییر بین درخواست و ایجاد کلاس */}
      <button
        onClick={() => setCourseRequest(!CouresCreate)}
        className="w-full mt-4 text-blue-600 font-semibold hover:underline"
      >
        {CouresCreate ? "متقاضی ایجاد کلاس" : "تشکیل ایجاد یک کلاس"}
      </button>
    </div>
    </div>
}
        </>
    )
}
export default Course
// <>
        //     <div>
        //         <div>
        //             <h2>
        //                 {CouresCreate?`request`:`create`}
        //             </h2>
        //             <form onSubmit={handleSubmit} >
        //                 <div>
        //                     <label>test</label>
        //                     <input type="text" name="Title" value={values.Title} onChange={handleChange} placeholder="title for request"/>
        //                     {errors.Title&&<p>{errors.Title}</p>}
        //                     {isError.Title &&<p>{isError.Title}</p>}
        //                 </div>
        //                 <div>
        //                     <label/>
        //                     <input type="text" name="description" value={values.description} onChange={handleChange} placeholder="description for request" />
        //                     {errors.description&&<p>{errors.description}</p>}
        //                     {isError.description &&<p>{isError.description}</p>}
        //                 </div>
        //                 <div>
        //                     <input type="number" name="CountClass" value={values.CountClass} onChange={handleChange} placeholder="countclass for request"/>
        //                     {errors.CountClass&&<p>{errors.CountClass}</p>}
        //                     {isError.CountClass &&<p>{isError.CountClass}</p>}
        //                 </div>
        //                 <div>
        //                     <input type="datetime-local" name="SuggestedTime" value={values.SuggestedTime} onChange={handleChange} placeholder="SuggestedTime for request"/>
        //                     {isError.SuggestedTime && <p>{isError.SuggestedTime}</p>}
        //                 </div>
        //                 <div>
        //                     <CategorySelector Select={setCategory}/>
        //                 </div>
        //                 {
        //                     CouresCreate &&(
        //                         <>  
        //                             <div>
        //                                 <input type="number" name="CapacityCourse" value={values.CapacityCourse} onChange={handleChange} placeholder="ظرفیت کلاس خودرا وارد کنید،اگر کلاس خصوصی است میتوانید وراد نکنید"/>
        //                                 {errors.CapacityCourse&&<p>{errors.CapacityCourse}</p>}
        //                                 {isError.CapacityCourse&&<p>{isError.CapacityCourse}</p>}
        //                             </div>
        //                             <div>
        //                                 <input type="file"  onChange={(e) => handleChange({ target: { name: "images", value: e.target.files[0] } })} name="images" accept="image/*" placeholder="عکس دلخواه تان را برای کلاستان بارگزاری کنید" />
        //                                 {isError.images&&<p>{isError.images}</p>}
        //                             </div>
                                    
        //                         </>
        //                     )
        //                 }
        //                 <button >
        //                     ایجاد کردن
        //                 </button>
        //             </form>
        //         </div><button onClick={()=> setCourseRequest(!CouresCreate)}>
        //                 {CouresCreate?'متقاضی ایجاد کلاس ':'تشکیل ایجاد یک کلاس'}
        //         </button>
        //     </div>
        // </>