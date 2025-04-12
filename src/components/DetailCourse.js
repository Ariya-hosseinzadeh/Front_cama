import {useEffect, useState } from "react"
import { X } from "lucide-react";
import ProposalCourseRequest from "./ProposalCourseRequest";

const DetailCourse = ({ id, content_type,type_course,selected }) => {
  
  const [detail, setDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isPropsal,setProposal]=useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://127.0.0.1:8000//classroom/detail-course-${content_type === 12 ? "request" : "create"}/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setDetail(data);
        }
      } catch (error) {
        console.error("خطا در دریافت جزئیات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, content_type]);

  if (isLoading) return <p className="text-center">در حال بارگذاری...</p>;
  if (!detail) return <p className="text-center text-red-500">خطایی رخ داده است!</p>;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-red-500" onClick={() => {setDetail(null)
            selected(null)
        }}>
          <X />
        </button>
        <button className="absolute top-2 left-2 text-gray-600 hover:text-red-500" onClick={()=>setProposal(!isPropsal)}>
           {isPropsal?"رفتن به جزئیات":`${content_type===12?"پیشنهاد دادن":"ثبت نام کردن"}`}
        </button>
        {
            isPropsal?<ProposalCourseRequest Id={id} Content_type={content_type}/>:
            <div>
        <h2 className="text-xl font-bold">{detail.Title}</h2>
        <p>{detail.description}</p>
        <p className="text-sm text-gray-500">ایجاد شده در: {detail.created_at}</p>
        </div>
        }
      </div>
    </div>
  );
};
export default DetailCourse
// const DetailCourse=(props)=>{
//     const {fetchWithAuth}=useContext(AuthContext)
//     const id=props.id
//     const content_type=props.content_type
//     const [errors,setError]=useState(null)
//     const [isloading,setLoading]=useState(true)
    
//     const [detail,setDetail]=useState(
//         {
//             Title:"",
//             LinkAccess:'',
//             username:'',
//             CodeCreator:'',
//             description:'',
//             CountClass:'',
//             SuggestedTime:'',
//             is_private:false,
//             created_at:'',

//         }
        
//     )
//     const [suggestionCourse,setsuggestion]=useState(false)
//     useEffect(()=>{
            
//         const fetchData = async () => {
            
//               if (content_type===12){
//                 try{
//                     let response = await fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-request/${id} `,{method:'GET'});
//                     if(response.ok){
//                         let data = await response.json();
//                         setDetail({...data})
//                     }
//                     if(!response.ok){
//                         let errorData = await response.json();
//                         throw errorData
//                     }
//             }
//             catch (error){
//                 setError({...error})

//             }}
            
//               else if(content_type===30){
//                 try{
//                     const response = await fetchWithAuth(`https://127.0.0.1:8000/classroom/detail-course-create/${id}`,{method:'GET'});
//                     if(response.ok){
//                         let data=await response.json()
//                         setDetail({...data})

//                     }
//                     if(!response.ok){
//                         let errorData=await response.json()
//                         throw errorData
//                     }
//                 }
//                 catch(error){
//                     setError({...error})
//                 }
                
            
//           };
      
          
//         }
//         fetchData();
          
//         },[id, content_type]
//     )
// const handleeventClick=()=>{
//     setsuggestion(!suggestionCourse)
// }
//     return(
//         <>
//             <div>
//                 <ul>
//                     <li>
//                          عنوان کلاس:{detail.Title}
//                     </li>
//                     <li>
//                         لینک دسترسی : {detail.LinkAccess}
//                     </li>
//                     <li>
//                        توضیحات : {detail.description}
//                     </li>
//                     <li>
//                        ایجاد کننده : {detail.username}
//                     </li>
//                     <li>
//                        کد دسترسی ایجاد کننده : {detail.CodeCreator}
//                     </li>
//                     <li>
//                        تعداد کلاس ها : {detail.CountClass}
//                     </li>
//                     <li>
//                        زمان پیشنهادی : {detail.SuggestedTime}
//                     </li>
                    
//                     <li>
//                        ایجاده شده در : {detail.created_at}
//                     </li>

//                 </ul>

//                 <button onClick={handleeventClick}>
//                     پیشنهاد دادن
//                 </button>
//             </div>
            
            
//         </>
//     )
// }
// export default DetailCourse