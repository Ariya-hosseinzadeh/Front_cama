import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import dayjs from 'dayjs';
import CourseRequestChange from "./CourseRequestChange";
import { AuthContext } from "../components/Context/AuthContext";

const getLevelLabel = level => {
  switch (level) {
    case 1: return "مقدماتی";
    case 3: return "متوسط";
    case 5: return "پیشرفته";
    default: return "نامشخص";
  }
};

const DetailRequestCourse = ({ course, onClose }) => {
  const { fetchWithAuth } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await fetchWithAuth(
          `https://127.0.0.1:8000/classroom/detail-course-request/${course.id}`,
          { method: 'GET' }
        );
        if (!res.ok) throw res;
        const json = await res.json();
        setData(json);
      } catch {
        toast.error('خطا در هنگام بارگذاری');
      }
    };
    loadDetail();
  }, [course.id, fetchWithAuth]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-auto w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          <X size={28} />
        </button>

        {/* Info / Edit */}
        <div className="flex-1 p-8 space-y-6">
          {!editing ? (
            <>
              <h2 className="text-3xl font-extrabold">{data.Title}</h2>
              <p><span className="font-semibold">سازنده:</span> {data.username}</p>
              <p><span className="font-semibold">لینک دسترسی:</span> <a href={data.LinkAccess} className="text-blue-600 hover:underline ml-2">لینک کلاس</a></p>
              <p><span className="font-semibold">توضیحات:</span> {data.description}</p>
              <p><span className="font-semibold">تعداد جلسات:</span> {data.CountClass}</p>
              <p><span className="font-semibold">تاریخ ایجاد:</span> {dayjs(data.created_at).format('YYYY/MM/DD')}</p>
              <p><span className="font-semibold">سطح کلاس:</span> {getLevelLabel(data.level_course)}</p>

              <div className="flex space-x-4">
                <button
                  onClick={() => setInviteOpen(prev => !prev) || setEditing(false)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  {inviteOpen ? 'بستن دعوت' : 'دعوت از استاد'}
                </button>
                {!inviteOpen && (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    آپدیت کلاس
                  </button>
                )}
              </div>

              {inviteOpen && <InviteForm courseId={course.id} />}
            </>
          ) : (
            <CourseRequestChange
              course={data}
              onCancel={() => setEditing(false)}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// InviteForm component inside this file for simplicity
const InviteForm = ({ courseId }) => {
  const { fetchWithAuth } = useContext(AuthContext);
  const [form, setForm] = useState({ teacher_code: '', description: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.teacher_code.trim()) {
      return toast.error('کد دسترسی معلم را وارد کنید');
    }
    try {
      const res = await fetchWithAuth(
        `https://127.0.0.1:8000/classroom/invent-teacher/${courseId}`,
        { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) }
      );
      if (!res.ok) throw await res.json();
      const data = await res.json();
      toast.success(data.status);
      setForm({ teacher_code: '', description: '' });
    } catch (err) {
      toast.error(err.error_message || 'لطفا اطلاعات را درست وارد کنید');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium">کد دسترسی</label>
        <input
          type="text"
          value={form.teacher_code}
          onChange={e => setForm({ ...form, teacher_code: e.target.value })}
          className="mt-1 block w-full border rounded-lg p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">توضیحات</label>
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="mt-1 block w-full border rounded-lg p-2"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
        ارسال دعوت
      </button>
    </form>
  );
};

export default DetailRequestCourse;


// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "./Context/AuthContext";
// import { toast } from "react-toastify";
// import { X } from "lucide-react";

// import dayjs from 'dayjs';
// import { NavLink } from "react-router-dom";
// import CourseRequestChange from "./CourseRequestChange";

// const DetailRequestCourse = (props) => {
//     const course_id = props.course.id;
//     const [updatCourse,setUpdateCourse]=useState(false)
//     const setShowCard = props.showCart;
//     const { fetchWithAuth } = useContext(AuthContext);
//     const [dataMyCourse, setData] = useState([]);
//     const[sendInventTeacher,setSendInvent]=useState(false)
//     const [dataInvent,setDataInvent]=useState({teacher_code:'',description:''})
//     useEffect(() => {
//         fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-request/${course_id}`, { method: "GET" })
//             .then(res => res.ok ? res.json() : Promise.reject(res))
//             .then(data => setData([{ ...data }]))
//             .catch(error => toast.error('خطا در هنگام بارگذاری'));
//     }, []);


// const hanldeSubmit=(e)=>{
//     e.preventDefault()
//     let data={...dataInvent}//useState 
//     fetchWithAuth(`https://127.0.0.1:8000/classroom/invent-teacher/${course_id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data)
//       })
//       .then(res => {
//         if (res.ok) {
//           return res.json(); // موفقیت‌آمیز، داده را برگردان
//         } else {
//           // خطا دارد ولی بدنه ممکن است JSON باشد → بخوانش و reject کن
//           return res.json().then(errorData => {
//             return Promise.reject(errorData);
//           });
//         }
//       })
//         .then(data =>  toast.success(`${data.status}`))
        
//         .catch(error =>toast.error(`${error.error_message ||"لطفا اطلاعات خود را درست وارد کنید"}`))
    
// }
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//             <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row">
                
//                 {
//                     !updatCourse?(<>

//                     {/* دکمه بستن */}
//                 <button 
//                     onClick={() => setShowCard(undefined)}
//                     className="absolute top-4 left-4 text-gray-600 hover:text-black transition"
//                 >
//                     <X size={28} />
//                 </button>

//                 {dataMyCourse.map((item) => (
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
//                             <button onClick={()=>{setSendInvent(!sendInventTeacher)
//                                 setUpdateCourse(false)
//                             }}>
//                                 {
//                                     !sendInventTeacher?'دعوت از استاد':'بستن دعوت'
//                                 }
//                             </button>
//                             {
//                                 !sendInventTeacher  &&
//                                 <>
//                                     <div>
//                                         <button onClick={()=>setUpdateCourse(!updatCourse)}>
//                                             {
//                                                 updatCourse?'صرف نظر کردن':'آپدیت کلاس '
//                                             }
//                                         </button>
//                                     </div>
//                                 </>
//                             }
//                              { sendInventTeacher &&
                             
//                                 (
//                                     <>
//                                         <form onSubmit={hanldeSubmit}>
                                            
//                                             <label>کد دسترسی :</label>
//                                             <input type="text" name="teacher_code" value={dataInvent.teacher_code} placeholder=" کد دسترسی معلم راوارد کنید" onChange={(e)=>setDataInvent({...dataInvent, teacher_code: e.target.value})}
//                                             />
//                                             <label>
//                                                 توضیحات :
//                                             </label>
//                                             <input type="text" name="description"  placeholder="لطفا توضیحاتان رااضافه کنید " onChange={(e)=>setDataInvent({...dataInvent, description: e.target.value})}
//                                             />
//                                             <button>
//                                                 ارسال دعوت
//                                             </button>
                                            
//                                         </form>
                                        
//                                     </>
//                                 )
//                              }       

                            
//                         </div>
//                         </div>
                        
//                     </>
//                 ))}
                
//                     </>):(<>
//                         <CourseRequestChange id={course_id} setUpdateCourse={setUpdateCourse} image={dataMyCourse[0].images} setShowCard={setShowCard}/>
//                     </>)
//                 }
//             </div>
//         </div>
//     );
// };

// export default DetailRequestCourse;






