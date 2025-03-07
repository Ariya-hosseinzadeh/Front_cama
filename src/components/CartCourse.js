import DetailCourse from "./DetailCourse"
const { useState,useEffect } = require("react")

const RequestCourseCart=()=>{
    const [dataCart,setData]=useState([])
    const [isloading,setLoading]=useState(true)
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/classroom/hall-waiting/");
        const dataCourse = await response.json();
        setData(
            [...dataCourse]
        )
        
      } catch (error) {
        console.error("خطا در دریافت دسته‌بندی‌ها:", error);
      } finally {
        setLoading(false);

      }
    };

    fetchData();
   
    console.log(dataCart)
  }, []);


    return(
        <> 
            <div>
                <ul>
                    {
                        dataCart.map((item)=>{
                            return(
                                <>
                                    <div key={item.id}>
                                    <div>
                                        <li>
                                            {item.Title}
                                        </li>
                                    </div>
                                    <div>
                                        <li>
                                            {item.description}
                                        </li>
                                    </div>
                                    <div>
                                        <button>test</button>
                                    </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}
export default RequestCourseCart