import { useContext, useState } from "react"
import { AuthContext } from "../components/Context/AuthContext"
import { toast } from "react-toastify"
import { X } from "lucide-react"

const CourseCreateChange = ({ id, showCart, onCancel }) => {
  const { fetchWithAuth, changeCourse, setChangeCourse } = useContext(AuthContext)
  const [data, setData] = useState({
    Title: '',
    description: '',
    CapacityCourse: '',
    CountClass: '',
    SuggestedTime: '',
    price_course: '',
    level_course: '',
  })

  const handleSubmit = e => {
    e.preventDefault()
    fetchWithAuth(
      `https://127.0.0.1:8000/classroom/detail-course-create/${id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }
    )
      .then(res => {
        if (res.ok) {
          toast.success('کلاس با موفقیت آپدیت شد')
          setChangeCourse(!changeCourse)
          showCart(undefined)
        } else {
          return res.json().then(err => Promise.reject(err))
        }
      })
      .catch(err => toast.error(err.error_message || 'لطفا اطلاعات خود را درست وارد کنید'))
  }

  const handleDelete = () => {
    fetchWithAuth(
      `https://127.0.0.1:8000/classroom/detail-course-create/${id}`,
      { method: 'DELETE' }
    )
      .then(res => {
        if (res.ok) {
          toast.success('کلاس با موفقیت حذف شد')
          setChangeCourse(!changeCourse)
          showCart(undefined)
        } else {
          return res.json().then(err => Promise.reject(err))
        }
      })
      .catch(err => toast.error(err.error_message || 'خطا در حذف کلاس'))
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-lg mx-auto space-y-4 relative">
      <button
        onClick={onCancel}
        className="absolute top-4 left-4 text-gray-600 hover:text-black transition"
      >
        <X size={24} />
      </button>
      <h2 className="text-xl font-bold">ویرایش کلاس</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">عنوان:</label>
          <input
            type="text"
            value={data.Title}
            onChange={e => setData({ ...data, Title: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">توضیحات:</label>
          <textarea
            value={data.description}
            onChange={e => setData({ ...data, description: e.target.value })}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">ظرفیت کلاس:</label>
            <input
              type="number"
              value={data.CapacityCourse}
              onChange={e => setData({ ...data, CapacityCourse: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">تعداد جلسات:</label>
            <input
              type="number"
              value={data.CountClass}
              onChange={e => setData({ ...data, CountClass: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">زمان برگزاری:</label>
            <input
              type="datetime-local"
              value={data.SuggestedTime}
              onChange={e => setData({ ...data, SuggestedTime: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">قیمت کلاس:</label>
            <input
              type="number"
              value={data.price_course}
              onChange={e => setData({ ...data, price_course: e.target.value })}
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">سطح کلاس:</label>
          <select
            value={data.level_course}
            onChange={e => setData({ ...data, level_course: e.target.value })}
            className="w-full border rounded-lg p-2"
          >
            <option value="">انتخاب کنید</option>
            <option value="1">مقدماتی</option>
            <option value="3">متوسط</option>
            <option value="5">پیشرفته</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            حذف کلاس
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            بروزرسانی کلاس
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseCreateChange



// import { useContext, useState } from "react"
// import { AuthContext } from "./Context/AuthContext"
// import { body } from "framer-motion/client"
// import { toast } from "react-toastify"

// const CourseCreateChange=(props)=>{
//     const id=props.id
//     const [data,setData]=useState({
//         Title:'',
//         description:'',
//         CapacityCourse:'',
//         CountClass:'',
//         SuggestedTime:'',
//         price_course:'',
//         level_course:'',
        
//     })
//     const{setChangeCourse}=useContext(AuthContext)
//     const {fetchWithAuth}=useContext(AuthContext)
// const handleSubmit=()=>{
//     let NewDateCourse={...data}
//     fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-create/${id}/`,{
//         method:'PUT',
//         headers:{
//             "Content-Type": "application/json"
//         },

//         body:NewDateCourse
//     })
//     .then(
//         res=>{
//             if(res.ok){
//                 toast.success('کلاس تان با موفقیت آپدیت شد')
//                 setTimeout(
//                     ()=>setChangeCourse(true),3000
//                 )
//             }
//             else{
//             return res.json().then(errorData=>{
//                 Promise.reject(errorData)
//             }
                
//             )
//             }
//         }
//     )
//     .catch(
//         error =>toast.error(`${error.error_message ||"لطفا اطلاعات خود را درست وارد کنید"}`)
//     )
// }

//     return(
//         <>
//             <div>
//                 <form onSubmit={handleSubmit}>
//                     <label>
//                         عنوان:
//                         <input type="text" name="Title" value={data.Title} placeholder="" onChange={(e)=>setData({...data,Title:e.target.value})}/>
//                     </label>
//                     <label>
//                         توضیحات:
//                         <input type="text" name="description" value={data.description} placeholder="" onChange={(e)=>setData({...data,description:e.target.value})}/>
//                     </label>
//                     <label>
//                         ظرفیت کلاس:
//                         <input type="number" name="CapacityCourse" value={data.CapacityCourse} placeholder="" onChange={(e)=>setData({...data,CapacityCourse:e.target.value})}/>
                        
//                     </label>
//                     <label>
//                         تعداد کلاس ها:
//                         <input type="number" name="CountClass" value={data.CountClass} placeholder="" onChange={(e)=>setData({...data,CountClass:e.target.value})}/>
//                     </label>  
//                     <label>
//                         زمان برگزاری:
//                         <input type="date" name="SuggestedTime" value={data.SuggestedTime} placeholder="" onChange={(e)=>setData({...data,SuggestedTime:e.target.value})}/>
                        
//                     </label>
//                     <label>
//                         قیمت کلاس :
//                         <input type="number" name="price_course" value={data.price_course} placeholder="" onChange={(e)=>setData({...data,price_course:e.target.value})}/>
                        
//                     </label>
//                     <label>
//                         سطح کلاس :
//                         <input type="number" name="level_course" value={data.level_course} placeholder="" onChange={(e)=>setData({...data,level_course:e.target.value})}/>
//                     </label>
//                     <button>
//                         فرستادن
//                     </button>
//                 </form>
//             </div>
//         </>
//     )
// }
// export default CourseCreateChange