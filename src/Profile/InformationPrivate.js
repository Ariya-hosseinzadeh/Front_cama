import { useContext, useEffect, useState } from "react"
import useInformationPrivat from "../hooks/useInformationPrivate"
import { AuthContext } from "../components/Context/AuthContext"


const InformationPrivate=()=>{
    const {fetchWithAuth}=useContext(AuthContext)
    const [provinces,setProvinces]=useState([])
    const [cities,setCities]=useState([])
    const[city,setCity]=useState()
    const [province,setProvince]=useState(0)
    const[errorFetch,setErrorFetch]=useState({})
    const { values, errors, handleChange, isValid } = useInformationPrivat({
        bio: "",
        profileImage: "",
        birthdate: "",
        gender:"",
        addressLine:"",
        job:"",
        degree:"",
        province:province,
        city:city,
        skills:""
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
    return(
        <>
            <div>
                <form>
                    <div>
                    <label>
                        بیوگرافی
                    
                    </label>
                    <textarea onChange={handleChange}  placeholder="" name="bio" value={values.bio} >بیوگرافی تان را وارد کنید</textarea>
                    {errors.bio &&<p> بیوگرافی شما نمیتواند از 30 کاراکتر کمتر باشد</p>}
                    </div>
                    <div>
                    <label>
                        :عکس پروفایل
                    
                    </label>
                    <input onChange={handleChange} type="file" placeholder="" name="profileImage" />
                    {errors.profileImage && <p>{errors.profileImage}</p>}
                    </div>

                    <div>
                    <label>
                        :تاریخ تولد
                    
                    </label>
                    <input onChange={handleChange} type="date" placeholder="" name="birthdate" value={values.birthdate} />
                    {errors.birthdate && <p>{errors.birthdate}</p>}
                    </div>
                    <div>
                    <label>
                        :جزئیات آدرس محل زندگی تان
                    
                    </label>
                    <input onChange={handleChange} type="text" placeholder="" name="addressLine" value={values.addressLine}/>
                    </div>
                    
                    <div>
                    <label>
                        شغلتان را وارد کنید
                    </label>
                    <input onChange={handleChange} type="text" placeholder="" name="job" value={values.job}/>
                    </div>
                    
                   <div>
                        <select value={province} onChange={(e)=>setProvince(e.target.value)}>
                        <option value="">استان محل زندگی تان را انتخاب کنید</option>
                                {provinces.map(
                                    (province)=><option key={province.id} value={province.id}>
                                        {province.name}
                                    </option>
                                    
                                )}
                        </select>

                        
                   </div>
                   <div>
                        <select value={city} onChange={(e)=>{setCity(e.target.value)
                            
                        }}>
                            <option value="">شهر محل زندگی تان را انتخاب کنید</option>
                                {cities.map(
                                    (city)=><option key={city.id} value={city.id}>
                                        {city.name}
                                    </option>
                                    
                                )}
                        </select>
                        
                   </div>
                </form>
            </div>
        </>
    )
}
export default InformationPrivate