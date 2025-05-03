import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./Context/AuthContext"

import { toast } from "react-toastify"



const ImageProfile=()=>{
    const{fetchWithAuth}=useContext(AuthContext)
    const [imageProfile,setImageprofile]=useState({})
    const[selecedtImage,setSelectedImage]=useState()
    const[imageChange,setImageChange]=useState(0)
    useEffect(
        ()=>{
            fetchWithAuth('https://127.0.0.1:8000/users/images-profile/',{method:"GET"})
            .then(res=>res.ok?res.json(): Promise.reject(res))
            .then(data=>setImageprofile({...data}))
            .catch(error=>{
                console.log(error)
                toast.error('error is this progress')
            })

        },[imageChange]

    )
    const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
      };

const handleSubmit=async(event)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('profile_image', selecedtImage);
    try {
        const response = await fetchWithAuth('https://127.0.0.1:8000/users/images-profile/', {
          method: 'PUT',
          body: formData,
          
        });
  
        if (response.ok) { 
          toast.success('با موفقیت آپلود شد')
          setImageChange(prev => prev + 1)
          
        } else {
          let errorData=await response.json() // حتما await فراموش نباید بشود من چند بار سر همین وقت گذاشتم
          
          throw errorData
        }
      } catch (error) {
        console.log(error)
        if(error.profile_image[0]){
            toast.error(error.profile_image[0])
        }
        else{
            toast.error("خطا هنگام آپلود فایل")
        }
        
        
      }
    
}
    return(
        <>
            <div>
                <div>
                    <img src={`https://localhost:8000/${imageProfile.profile_image}`} alt={`https://localhost:8000/${imageProfile.profile_image}`}/>
                    {console.log(imageProfile)}
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="file" 
                            onChange={handleFileChange} 
                            accept=".pdf,.jpg,.png" // نوع فایل‌های مجاز (اختیاری)
                            />
        <button type="submit">آپلود فایل</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default ImageProfile