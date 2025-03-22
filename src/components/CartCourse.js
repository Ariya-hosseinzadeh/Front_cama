import { useState, useEffect } from "react";
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
                console.error("خطا در دریافت دسته‌بندی‌ها:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowDetails = (id, content_type) => {
        setSelectedCourse({ id, content_type });
    };
    return (
        <> 
            <div>
                {isLoading ? (
                    <p>در حال بارگذاری...</p>
                ) : (
                    dataCart.map((item) => (
                        <div key={item.id}>
                            <ul>
                                {item.content_type === 30 && item.images && (
                                    <li>
                                        <img src={item.images} alt="image class"/>
                                    </li>
                                )}
                                
                                <li>  عنوان کلاس : {item.Title}  </li>
                                <li>توضیحات:{item.description}</li>
                                <li>  قیمت :{item.price}</li>
                                <li>ایجاد کننده : {item.CodeCreator} </li>
                                <li><img src={item.image} alt="images item"/></li>
                                <div>
                                <button onClick={() => handleShowDetails(item.object_id, item.content_type)}>
                                     جزئیات
                                </button>
                                    <div>
                                    
                                    </div>
                                </div>
                            </ul>
                        </div>
                    ))
                )}
            </div>
            <div>
            {selectedCourse && (
                                    <DetailCourse id={selectedCourse.id} content_type={selectedCourse.content_type} />
                                            )}
            </div>
        </>
    );
}

export default RequestCourseCart;

// import { hover } from "@testing-library/user-event/dist/hover"
// import DetailCourse from "./DetailCourse"
// const { useState,useEffect } = require("react")

// const RequestCourseCart=()=>{
//     const [dataCart,setData]=useState([])
//     const [isloading,setLoading]=useState(true)
    
// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/classroom/hall-waiting/");
//         const dataCourse = await response.json();
//         setData(
//             [...dataCourse]
//         )
        
//       } catch (error) {
//         console.error("خطا در دریافت دسته‌بندی‌ها:", error);
//       } finally {
//         setLoading(false);

//       }
//     };

//     fetchData();
   
//     console.log(dataCart)
//   }, []);
  
// const datilClass=(item_id)=>{
//     alert(item_id)
// }

//     return(
//         <> 
//             <div>
//                     {
//                         dataCart.map((item)=>{
//                             return(
//                                 <>
//                                     <ul key={item.id}>
//                                         {item.content_type===30&& <li>
//                                             <img src={item.images} alt="image class"/>
//                                         </li> }
                                        
//                                         <li>{item.Title}</li>
//                                         <li>{item.description}</li>
//                                         <li>{item.price}</li>
//                                         <div>
//                                             <button onClick={
//                                                 ()=>{
//                                                     return(
//                                                         <>
//                                                         <DetailCourse id={item.id} content_type={item.content_type} />
//                                                         </>
//                                                     )
                                                    
//                                                 }
//                                             }>
//                                                 جزئیات
//                                             </button>
//                                         </div>
//                                     </ul>
                                    
//                                 </>
//                             )
//                         })
//                     }
                   
//             </div>
//         </>
//     )
// }
// export default RequestCourseCart