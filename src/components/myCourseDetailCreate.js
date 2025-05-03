import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../components/Context/AuthContext"
import { toast } from "react-toastify"
import { X } from "lucide-react"
import CourseCreateChange from "./CourseCreateChange"
import dayjs from 'dayjs'

const DetailCreateCourse = ({ course, showCart }) => {
  const course_id = course.id
  const { fetchWithAuth } = useContext(AuthContext)
  const [dataMyCourse, setData] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-create/${course_id}`, { method: 'GET' })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setData(data))
      .catch(() => toast.error('خطا هنگام بارگذاری صفحه'))
  }, [fetchWithAuth, course_id])

  if (!dataMyCourse) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-auto w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={() => showCart(undefined)}
          className="absolute top-4 left-4 text-gray-600 hover:text-black transition"
        >
          <X size={28} />
        </button>
        {!editing ? (
          <div className="flex-1 p-8 space-y-4 overflow-y-auto">
            <h2 className="text-3xl font-extrabold text-gray-900">{dataMyCourse.Title}</h2>
            <p><span className="font-semibold">سازنده:</span> {dataMyCourse.username}</p>
            <p><span className="font-semibold">لینک دسترسی:</span> <a href={dataMyCourse.LinkAccess} className="text-blue-600 hover:underline ml-2">لینک کلاس</a></p>
            <p><span className="font-semibold">توضیحات:</span> {dataMyCourse.description}</p>
            <p><span className="font-semibold">تعداد جلسات:</span> {dataMyCourse.CountClass}</p>
            <p><span className="font-semibold">تاریخ ایجاد:</span> {dayjs(dataMyCourse.created_at).format('YYYY/MM/DD')}</p>
            <p><span className="font-semibold">سطح کلاس:</span> {dataMyCourse.level_course === 1 ? 'مقدماتی' : dataMyCourse.level_course === 3 ? 'متوسط' : dataMyCourse.level_course === 5 ? 'پیشرفته' : 'نامشخص'}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
              >
                ویرایش کلاس
              </button>
            </div>
          </div>
        ) : (
          <CourseCreateChange id={course_id} showCart={showCart} onCancel={() => setEditing(false)} />
        )}
      </div>
    </div>
  )
}

export default DetailCreateCourse




// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./Context/AuthContext";
// import { toast } from "react-toastify";
// import { X } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import dayjs from 'dayjs';
// import CourseCreateChange from "./CourseCreateChange";

// const DetailCreateCourse = (props) => {
//     const course_id = props.course.id;
//     const setShowCard = props.showCart;
//     const { fetchWithAuth } = useContext(AuthContext);
//     const [dataMyCourse, setData] = useState([]);
//     const[updatCourse,setUpdateCourse]=useState(false)
//     useEffect(() => {
//         fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-create/${course_id}`, { method: "GET" })
//             .then(res => res.ok ? res.json() : Promise.reject(res))
//             .then(data => setData([{ ...data }]))
//             .catch(error => {
//                 toast.error('خطا هنگام بارگذاری صفحه')
//             });
//     }, []);

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//             <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row">
                
//                 {/* دکمه بستن */}
//                 <button 
//                     onClick={() => setShowCard(undefined)}
//                     className="absolute top-4 left-4 text-gray-600 hover:text-black transition"
//                 >
//                     <X size={28} />
//                 </button>

//                 {
//                     !updatCourse ?(
//                     <>
                    
//                     {dataMyCourse.map((item) => (
//                     <>
//                         {/* تصویر کلاس */}
//                         {/* <div className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto bg-gray-100">
//                             <img 
//                                 src={item.images} 
//                                 alt="تصویر کلاس" 
//                                 className="object-cover w-full h-full"
//                             />
//                         </div> */}

//                         {/* اطلاعات کلاس */}
//                         <div className="flex-1 p-8 overflow-y-auto">
//                             <h2 className="text-3xl font-extrabold text-gray-900 mb-6">{item.Title}</h2>

//                             <div className="space-y-4 text-gray-700 text-base">
//                                 <div><span className="font-semibold">سازنده:</span> {item.username}</div>

//                                 <div><span className="font-semibold">لینک دسترسی:</span> 
//                                     <h3 
                                         
                                        
//                                         className="text-blue-600 hover:underline ml-2"
//                                     >
//                                         {item.LinkAccess}
//                                     </h3>
//                                 </div>

//                                 <div><span className="font-semibold">توضیحات:</span> {item.description}</div>

//                                 <div><span className="font-semibold">تعداد جلسات:</span> {item.CountClass}</div>

//                                 <div><span className="font-semibold">تاریخ ایجاد:</span> {dayjs(item.created_at).format('YYYY/MM/DD')}</div>

//                                 <div><span className="font-semibold">سطح کلاس:</span> 
//                                     {item.level_course === 1 ? "مقدماتی" :
//                                      item.level_course === 3 ? "متوسط" :
//                                      item.level_course === 5 ? "پیشرفته" : "نامشخص"}
//                                 </div>
//                             </div>
//                             <div>
//                             <button onClick={()=>setUpdateCourse(!updatCourse)} >
//                                آپدیت کلاس
//                             </button>

//                             <NavLink to='inventation'>
//                                 دانش آموزان
//                             </NavLink>


                            
//                         </div>
//                         </div>
                        
//                     </>
//                 ))}
//                     </>
//                     ):(
//                     <>  
//                         <CourseCreateChange/>
//                     </>
//                 )
                    
//                 }
                
//             </div>
//         </div>
//     );
// };

// export default DetailCreateCourse;