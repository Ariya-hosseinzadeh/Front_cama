import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { AuthContext } from "../components/Context/AuthContext";

const CourseRequestChange = ({ course, onCancel, onClose }) => {
  const { fetchWithAuth, change, setChange } = useContext(AuthContext);
  const [form, setForm] = useState({
    description: course.description || '',
    CountClass: course.CountClass || 0,
    SuggestedTime: course.SuggestedTime || '',
    level_course: course.level_course || 1,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetchWithAuth(
        `https://127.0.0.1:8000/classroom/detail-course-request/${course.id}/`,
        { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }
      );
      if (!res.ok) throw await res.json();
      toast.success('دیتا با موفقیت به‌روزرسانی شد');
      onCancel();
      setChange(!change);
    } catch (err) {
      toast.error(err.error_message || 'خطا در به‌روزرسانی');
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetchWithAuth(
        `https://127.0.0.1:8000/classroom/detail-course-request/${course.id}/`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw await res.json();
      setChange(!change);
      onClose();
      toast.success('کلاس با موفقیت حذف شد');
    } catch (err) {
      toast.error(err.error_message || 'خطا در حذف کلاس');
    }
  };

  return (
    <div>
      <button onClick={onCancel} className="absolute top-4 left-4 text-gray-600 hover:text-black">
        <X size={28} />
      </button>
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div>
          <label className="block text-sm font-medium">توضیحات</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="mt-1 block w-full border rounded-lg p-2"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">تعداد جلسات</label>
            <input
              type="number"
              value={form.CountClass}
              onChange={e => setForm({ ...form, CountClass: e.target.value })}
              className="mt-1 block w-full border rounded-lg p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">زمان پیشنهادی</label>
            <input
              type="date"
              value={form.SuggestedTime}
              onChange={e => setForm({ ...form, SuggestedTime: e.target.value })}
              className="mt-1 block w-full border rounded-lg p-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">سطح کلاس</label>
            <select
              value={form.level_course}
              onChange={e => setForm({ ...form, level_course: e.target.value })}
              className="mt-1 block w-full border rounded-lg p-2"
            >
              <option value={1}>مقدماتی</option>
              <option value={3}>متوسط</option>
              <option value={5}>پیشرفته</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-4">  
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            آپدیت کلاس
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            حذف کلاس
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseRequestChange;



// import { useContext, useState } from "react"
// import { AuthContext } from "./Context/AuthContext"
// import { toast } from "react-toastify"
// import { X } from "lucide-react";
// const CourseRequestChange=(props)=>{
// const {change,setChange}=useContext(AuthContext)
// const id=props.id

// const setUpdateCourse=props.setUpdateCourse
// const{fetchWithAuth}=useContext(AuthContext)
// const [dataCourse,setDataCourse]=useState({
//     description:'',
//     CountClass:'',
//     SuggestedTime:'',
//     level_course:'',
// })
// const hanldeSubmit=(e)=>{
//     e.preventDefault()
//     let data={...dataCourse}
//     fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-request/${id}/`,{method:'PUT',
//         headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data)
//     })
//     .then(res => {
//             if (res.ok) {
//               return res.json(); // موفقیت‌آمیز، داده را برگردان
//             } else {
//               // خطا دارد ولی بدنه ممکن است JSON باشد → بخوانش و reject کن
//               return res.json().then(errorData => {
                
//                 return Promise.reject(errorData);
//               });
//             }
//           })
//             .then(data =>  toast.success('با موفقیت دیتای کلاستان عوض شد'))
            
//             .catch(error =>toast.error(`${error.error_message}`))
        
 
// }
// const DeleteCourse=()=>{
//     fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-request/${id}/`,{method:'DELETE',
//         headers: { "Content-Type": "application/json" },
          
//     })
//     .then(res => {
//             if (res.ok) {
//             setChange(!change)
//             props.setShowCard(undefined)
//               toast.success('کلاس شما با موفقیت حذف شد')
//             } else {
//               return res.json().then(
//                 errorData=>Promise.reject(errorData)
//               )
//             }
            
//           })
//     .catch(
//         error=>toast.error(error.error_message||"خطا در حذف کلاس مدنظر")
//     )
            
        
// }
//     return(
//         <>
//             <div>
//             <button onClick={()=>setUpdateCourse(false)}>
//                     <X/>
//                 </button>
//                 <form onSubmit={hanldeSubmit}>
//                     <label>
//                         توضیحات
//                     </label>
//                     <input type="text" placeholder="" name="description" value={dataCourse.description} onChange={(e)=>setDataCourse({...dataCourse,description:e.target.value})}/>
//                     <label>
//                         تعداد کلاس ها
//                     </label>
//                     <input type="number" placeholder="" name="CountClass" value={dataCourse.CountClass} onChange={(e)=>setDataCourse({...dataCourse,CountClass:e.target.value})}/>
//                     <label>
//                         زمان پیشنهادی
//                     </label>
//                     <input type="date" placeholder="" name="SuggestedTime" value={dataCourse.SuggestedTime} onChange={(e)=>setDataCourse({...dataCourse,SuggestedTime:e.target.value})}/>
//                     <label>
//                         سطح کلاس 
//                     </label>
//                     <input type="number" placeholder="" name="level_course" value={dataCourse.level_course} onChange={(e)=>setDataCourse({...dataCourse,level_course:e.target.value})}/>
//                     <button>
//                         آپدیت کلاس
//                     </button>
//                 </form>
                
//             </div>
//             <div>
//                 <button onClick={()=>DeleteCourse()}>
//                     حذف کلاس 
//                 </button>
//             </div>
//         </>
//     )
// }
// export default CourseRequestChange