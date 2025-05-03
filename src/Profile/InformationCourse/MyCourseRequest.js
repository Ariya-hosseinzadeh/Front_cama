import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import { toast } from "react-toastify";
import DetailRequestCourse from "../../components/myCourseDetailRequest";

const MyCourseRequest = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { fetchWithAuth, change } = useContext(AuthContext);

  // Fetch list, re-run when `change` toggles
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const res = await fetchWithAuth(
          'https://127.0.0.1:8000/classroom/my-course-request/',
          { method: 'GET' }
        );
        if (!res.ok) throw res;
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        toast.error('خطا در دریافت اطلاعات سرور');
      }
    };
    loadCourses();
  }, [fetchWithAuth, change]);

  return (
    <div className="p-6">
      {!selectedCourse ? (
        <>
          <h2 className="text-2xl font-bold mb-6">کلاس‌های درخواست شده</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedCourse(item)}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col items-start"
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
        <DetailRequestCourse
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};

export default MyCourseRequest;
// import { useContext, useEffect, useState } from "react"
// import { AuthContext } from "../../components/Context/AuthContext"
// import { toast } from "react-toastify"
// import DetailRequestCourse from "../../components/myCourseDetailRequest"



// const MyCourseRequest=()=>{
//     const[dataCourse,setDAtaCourse]=useState([])
//     const [showCardCourse,setShowCard]=useState()
//     const{fetchWithAuth}=useContext(AuthContext)
    
    
//     useEffect(
//         ()=>{
//             fetchWithAuth('https://127.0.0.1:8000/classroom/my-course-request/',{
//                 method:'GET'
//             })
//             .then(res => res.ok ? res.json() : Promise.reject(res))
//                   .then(data => setDAtaCourse([...data]))
//                   .catch(error => {
//                     toast.error('خطا در دریافت اطلاعات سرور')
//                   });
//         },[]
//     )
//     return (
//         <div>
//           <div className="p-4">
//           {
//             showCardCourse === undefined?
//             (<>
//               <h2 className="text-xl font-bold mb-4">کلاس‌های درخواست شده</h2>
          
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {dataCourse.map((item) => (
//               <button onClick={()=>setShowCard({...item})}>

//                 <div
//                 key={item.id}
//                 className="bg-card p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow"
//               >
//                 <img
//                   src={item.images}
//                   alt="Course"
//                   className="w-full h-40 object-cover rounded-xl mb-2"
//                 />
//                 <h3 className="text-lg font-semibold mb-1">{item.Title}</h3>
//                 <p className="text-sm text-muted-foreground">{item.description}</p>
//               </div>
//               </button>
//             ))}
//           </div>
          
//             </>)
//             :
//             (<>
//               <DetailRequestCourse showCart={setShowCard} course={showCardCourse} />
//             </>)
//           }
//         </div>
//         <div>
          
//         </div>
//         </div>
//       );
    
// }
// export default MyCourseRequest