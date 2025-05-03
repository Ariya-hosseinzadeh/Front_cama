import { useContext, useEffect, useState,useRef } from "react"
import useInformationPrivat from "../hooks/useInformationPrivate"
import { AuthContext } from "../components/Context/AuthContext"
import { toast } from "react-toastify"
import SkillUser from "../components/skillsUser"
import { X } from "lucide-react";
import ImageProfile from "../components/imageProfile"



const InformationPrivate=()=>{
    const {fetchWithAuth}=useContext(AuthContext) 
    const [provinces,setProvinces]=useState([])
    const [cities,setCities]=useState([])
    const[city,setCity]=useState()
    const[degree,setDegree]=useState([{name:'دیپلم',id:'1',value:'diploma'},{name:'کارشناسی ',id:2,value:'bachelor'},{name:'کارشناسی ارشد',id:3,value:'master'},{name:'دکتری',id:4,value:'ph.d'}])
    const [province,setProvince]=useState(0)
    const[selectDegree,setSelectDegree]=useState('')
    const[errorFetch,setErrorFetch]=useState({})
    const [careers,SetCareer]=useState([])
    const [userSkill,setUserSkill]=useState([])
    const [selectJob,setSelectJob]=useState()
    const [onChange ,setOnChange]=useState(0)
    const { values, errors, handleChange, isValid } = useInformationPrivat({
        bio: "",
        first_name:"",
        last_name:"",
        profileImage: "",
        birth_date: "",
        gender:"",
        addressLine:"",
      });
useEffect(
        ()=>{
        fetch('https://127.0.0.1:8000/users/province/',{method:'GET'})
        .then(res=>res.ok?res.json(): Promise.reject(res))
        .then(data=>setProvinces(data))
        .catch(error => {
            console.log(error);
        });
        
    },[]
        
    )
useEffect(
    ()=>{
        fetch(`https://127.0.0.1:8000/users/cities/by_province/?province_id=${province}`,{method:'GET'})
        .then(res=>res.ok?res.json(): Promise.reject(res))
        .then(data=>setCities(data))
        .catch(error => {
            console.log(error);
        });
        
    },[province]

)
useEffect(
    ()=>{
        fetch('https://127.0.0.1:8000/users/jobs/',{method:'GET'})
        .then(res=>res.ok?res.json(): Promise.reject(res))
        .then(data=>SetCareer(data))
        .catch(error => {
            
            toast.error('خطای ناشناخته !');
        });

    },[onChange ]
)
async function sendData(data) {
    try{
            let response=await fetchWithAuth('https://127.0.0.1:8000/users/profile-information/',{
                method:'PUT',
                credentials:'include',
                body:data

            })
            
            if(response.ok){
                toast.success('اطلاعات شما با موفقیت اضافه شد')
            }
            if(!response.ok){
            let error_data=await response.json()
            setErrorFetch({...error_data})
            console.log(errorFetch)
            throw error_data;
                
            }
    }
    catch(error){
        
        toast.error('لطفا ارور های زیر را برطرف کنید چنانچه وارد نشده اید! وارد شوید') 
    }
    
}
useEffect(
    ()=>{
        fetchWithAuth('https://127.0.0.1:8000/users/user-skill/',{
            method:"GET"
            
        })
        .then(res=>res.ok?res.json(): Promise.reject(res))
        .then(data=>setUserSkill([...data]))
        
        .catch(error=>{
             toast.error('خطا هنگام بارگذاری!')
        },
        
        )
    },[onChange]
)
const handleSubmit=(e)=>{
    e.preventDefault();
    


    let formData = new FormData();
    // if (values.profileImage instanceof File) {
    //     formData.append('profile_image', values.profileImage);
    //   }
    formData.append("first_name",values.first_name)
    formData.append('last_name',values.last_name)
    formData.append('bio',values.bio)
    formData.append('birth_date', values.birth_date);
    formData.append('province',province)
    formData.append('city',city)
    formData.append('job',selectJob)
    formData.append('degree',selectDegree)
    
    
    sendData(formData)
}

function deletSkill(id){
    fetchWithAuth(`https://127.0.0.1:8000/users/user-skill/${id}/`,{
        method:'DELETE'
    })
    .then(res => {
        if (res.ok) {
          
          setOnChange(prev => prev - 1)
          toast.success(' اطلاعات شما با موفقیت تغییر کرد')
        } else {
          console.error('Failed to delete');
        }
      })
      .catch(error => console.error('Error:', error));
}
    return(

        <>

        <div>
            <ImageProfile OnSkillAdded={setOnChange}/>
        </div>
            <div>
                <form onSubmit={handleSubmit}>

                    {/* <div>
                    <label>
                        :عکس پروفایل
                    
                    </label>
                    <input onChange={handleChange} type="file" placeholder="" name="profileImage" />
                    {errors.profileImage && <p>{errors.profileImage}</p>}
                    </div> */}

                    <div>
                        <label>
                            نام:
                        </label>
                        <input type="text" onChange={handleChange} placeholder="" name="first_name" value={values.first_name}/>
                    {errorFetch.first_name&&<p>لطفانام تان را وارد کنید</p>}
                    </div>

                    <div>
                        <label>
                            :نام خانوادگی
                        </label>
                        <input type="text" onChange={handleChange} placeholder="" name="last_name" value={values.last_name}/>
                        {errorFetch.last_name&&<p>لطفا نام خانوادگی تان را کنید</p>}
                    </div>

                    <div>
                        <label>
                                مدرک تحصیلی
                        </label>
                        <select value={selectDegree} onChange={(e)=>setSelectDegree(e.target.value)}>
                            <option value=''>
                                مدرک تحصیلی تان را انتخاب کنید
                            </option>
                            {
                                degree.map(
                                    (items)=><option key={items.id} value={items.value}>
                                        {items.name}
                                    </option>
                                )
                            }
                        </select>
                    </div>                    

                    <div>
                    <label>
                        بیوگرافی:
                    </label>
                    <textarea onChange={handleChange}  placeholder="" name="bio" value={values.bio} >بیوگرافی تان را وارد کنید</textarea>
                    {errors.bio &&<p> بیوگرافی شما نمیتواند از 30 کاراکتر کمتر باشد</p>}
                    </div>

                    <div>
                    <label>
                        :تاریخ تولد
                    
                    </label>
                    <input onChange={handleChange} type="date" placeholder="" name="birth_date" value={values.birth_date} />
                    {errors.birthdate && <p>{errors.birth_date}</p>}
                    
                    </div>
                    <div>
                    <label>
                        :جزئیات آدرس محل زندگی تان
                    
                    </label>
                    <input onChange={handleChange} type="text" placeholder="" name="addressLine" value={values.addressLine}/>
                    </div>
                    
                    
                    
                   <div>
                        <select value={province} onChange={(e) => {
    
    setProvince(e.target.value) 
  }}>
                        <option value="">استان محل زندگی تان را انتخاب کنید</option>
                                {provinces.map(
                                    (province)=><option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                    
                                )}
                        </select>
                        {errorFetch.province&&<p>لطفا استان محل زندگی تان را انتخاب کنید</p>}
                        
                   </div>
                   <div>
                        <select value={city} onChange={(e)=>setCity(e.target.value)}
                        >
                            <option value="">شهر محل زندگی تان را انتخاب کنید</option>
                                {cities.map(
                                    (city)=><option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                    
                                )}
                        </select>
                        {errorFetch.city&&<p>لطفا شهر محل زندگی تان را انتخاب کنید</p>}
                   </div>
                   <p>
                    
                   </p>
                   <div>
                    <label>
                                لطفا شعل خود را وارد کنید
                    </label>
                    <select value={selectJob} onChange={(e)=>setSelectJob(e.target.value)}

                    >
                        <option value=''>
                            شغل خود را انتخاب کنید
                        </option>
                        {
                            careers.map(
                                (job)=><option key={job.id} value={job.id}>
                                    {job.name}
                                </option>
                            )
                        }
                    </select>
                    {errorFetch.city&&<p>لطفا شهر محل زندگی تان را انتخاب کنید</p>}
                   </div>
                   <div>

                    <button className="">
                        click send
                    </button>
                   </div>
                </form>
                <div>
                <div>
                    <SkillUser OnSkillAdded={setOnChange}/>
                </div>
                    <div>
                        <p>مهارت های شما:</p>
                        {
                            userSkill.map(
                                (item)=>
                                    <div key={item.id}>
                                        <button onClick={()=>deletSkill(item.id)}>
                                            <X/>
                                        </button>
                                        <h5>
                                            {item.title}
                                        </h5>
                                    </div>

                                
                            )
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}
export default InformationPrivate