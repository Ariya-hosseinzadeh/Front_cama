import { useState, useEffect, } from "react";
import DetailCourse from "./DetailCourse";

const RequestCourseCart = () => {
  const [dataCart, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://127.0.0.1:8000/classroom/hall-waiting/");
        const dataCourse = await response.json();
        setData([...dataCourse]);
      } catch (error) {
        console.error("خطا در دریافت داده‌ها:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataCart.map((item) => (
            <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
              {item.content_type === 30 && item.images && (
                <img src={item.images} alt="کلاس" className="w-full h-40 object-cover rounded-md" />
              )}
              <h3 className="text-lg font-semibold mt-2">{item.Title}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="font-bold text-blue-600">قیمت: {item.price} تومان</p>
              <button
                onClick={() => setSelectedCourse(item)}
                className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                مشاهده جزئیات
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedCourse && <DetailCourse id={selectedCourse.object_id} content_type={selectedCourse.content_type} type_course={selectedCourse.type_course} selected={setSelectedCourse} />} 
    </div>
  );
};





export default RequestCourseCart;


// import { useState, useEffect } from "react";
// import DetailCourse from "./DetailCourse";
// import { X } from "lucide-react"
// const RequestCourseCart = () => {
//     const [dataCart, setData] = useState([]);
//     const [isLoading, setLoading] = useState(true);
//     // const [selectedCourse, setSelectedCourse] = useState(null);
//     const[showCart,setShow]=useState([])
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("https://127.0.0.1:8000/classroom/hall-waiting/");
//                 const dataCourse = await response.json();
//                 setData([...dataCourse]);
//             } catch (error) {
//                 console.error("خطا در دریافت دسته‌بندی‌ها:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);
    

//     // const handleShowDetails = (id, content_type) => {
        
//     //     setSelectedCourse({ id, content_type });
//     // };
//     return (
//         <> 
//             <div>
//                 {isLoading ? (
//                     <p>در حال بارگذاری...</p>
//                 ) : (
//                     dataCart.map((item) => (
//                         <div key={item.id}>
//                             <ul>
//                                 {item.content_type === 30 && item.images && (
//                                     <li>
//                                         <img src={item.images} alt="image class"/>
//                                     </li>
//                                 )}
                                
//                                 <li>  عنوان کلاس : {item.Title}  </li>
//                                 <li>توضیحات:{item.description}</li>
//                                 <li>  قیمت :{item.price}</li>
//                                 <li><img src={item.image} alt="images item"/></li>
                                
                                
                                
//                                 <div>
//                                 <button onClick={() =>{showDetail() }}>
//                                      جزئیات
//                                 </button>
                                    
//                                 </div>
//                                 {/* <div>
//                                     {selectedCourse && (
//                                     <DetailCourse id={selectedCourse.id} content_type={selectedCourse.content_type} />
//                                     )}
//                                 </div> */}
//                             </ul>
//                         </div>
//                     ))
//                 )}
//             </div>
            
//         </>
//     );
// }

// export default RequestCourseCart;