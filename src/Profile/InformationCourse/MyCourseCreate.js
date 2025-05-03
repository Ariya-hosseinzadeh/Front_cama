import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import { toast } from "react-toastify"
import DetailCreateCourse from "../../components/myCourseDetailCreate"

const MyCourseCreate = () => {
  const [dataCourse, setDAtaCourse] = useState([])
  const [showCardCourse, setShowCard] = useState()
  const { fetchWithAuth, changeCourse } = useContext(AuthContext)

  useEffect(() => {
    fetchWithAuth('https://127.0.0.1:8000/classroom/my-course-create/', { method: 'GET' })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setDAtaCourse(data))
      .catch(() => toast.error('خطا در دریافت اطلاعات سرور'))
  }, [fetchWithAuth, changeCourse])

  return (
    <div className="p-6">
      {!showCardCourse ? (
        <>
          <h2 className="text-2xl font-bold mb-6">کلاس‌های ایجاد شده</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataCourse.map(item => (
              <button
                key={item.id}
                onClick={() => setShowCard(item)}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={item.images}
                  alt={item.Title}
                  className="w-full h-36 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-semibold">{item.Title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
              </button>
            ))}
          </div>
        </>
      ) : (
        <DetailCreateCourse course={showCardCourse} showCart={setShowCard} />
      )}
    </div>
  )
}

export default MyCourseCreate



// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../../components/Context/AuthContext"
// import { toast } from "react-toastify"
// import DetailCreateCourse from '../../components/myCourseDetailCreate'
// import { Outlet } from "react-router-dom"
// const MyCourseCreate=()=>{
//     const[dataCourse,setDAtaCourse]=useState([])
//     const [showCardCourse,setShowCard]=useState()
//     const{fetchWithAuth}=useContext(AuthContext)
//     const{changeCourse}=useContext(AuthContext)
//     useEffect(
//         ()=>{
//             fetchWithAuth('https://127.0.0.1:8000/classroom/my-course-create/',{
//                 method:'GET'
//             })
//             .then(res => res.ok ? res.json() : Promise.reject(res))
//                   .then(data => setDAtaCourse([...data]))
//                   .catch(error => {
                    
//                     toast.error('خطا در دریافت اطلاعات سرور')
//                   });
//         },[changeCourse]
//     )
//     return (
//       <div>
//         <div className="p-4">
//         {
//           showCardCourse === undefined?
//           (<>
//             <h2 className="text-xl font-bold mb-4">کلاس‌های ایجاد شده</h2>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {dataCourse.map((item) => (
//             <button onClick={()=>setShowCard({...item})}>

//               <div
//               key={item.id}
//               className="bg-card p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
//             >
//               <img
//                 src={item.images}
//                 alt="Course"
//                 className="w-full h-40 object-cover rounded-xl mb-2"
//               />
//               <h3 className="text-lg font-semibold mb-1">{item.Title}</h3>
//               <p className="text-sm text-muted-foreground">{item.description}</p>
//             </div>
//             </button>
//           ))}
//         </div>
        
//           </>)
//           :
//           (<>
//             < DetailCreateCourse showCart={setShowCard} course={showCardCourse} />
//           </>)
//         }
//       </div>
//       <div>
        
//       </div>
//       </div>
//     );
// }
// export default MyCourseCreate