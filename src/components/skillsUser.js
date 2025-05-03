import { useContext, useEffect, useState } from "react"
import { AuthContext } from "./Context/AuthContext"

import { toast } from "react-toastify"


function SkillUser({OnSkillAdded}){
    
    const{fetchWithAuth}=useContext(AuthContext)
    const [skills,setSkills]=useState([])
    const[skillSelect,setSkillSelect]=useState('')
    const[levelSkill,setLevelSkill]=useState('')
    useEffect(
        
        ()=>{
            async function fetchSkill() {
                try{
                    let respons=await fetchWithAuth('https://127.0.0.1:8000/users/skills/',{
                        method:'GET'
                    }
                )
                if(respons.ok){
                    let data=await respons.json()
                    setSkills([...data])
                }
                if(!respons.ok){
                    let error=await respons.json()
                    throw error
                }
                }
                catch(error){
                    console.log(error)
                }
            }
            fetchSkill()
        },[]
    )

async function sendSkill(data) {
    try{
        let response=await fetchWithAuth('https://127.0.0.1:8000/users/user-skill/',{
            method:"POST",
            body:JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        })
        if(response.ok){
            toast.success(`مهارت انتخاب شده با موفقیت اضافه شد`)
            OnSkillAdded(prev => prev + 1)
        }
        if(!response.ok){
            console.log(response)
            let error_fetch=response.json()
            
            throw error_fetch
        }
    }
    catch(error){
        console.log(error)
        toast.error('درخواست شما انجام نشد!')
        
    }
}
function AddSkill(){
    let dataSkill={
        skill:null,
        level:null
    }
    dataSkill.skill=skillSelect.id
    dataSkill.level=levelSkill
    
    sendSkill(dataSkill)
}
    return(
        <>
            <div>
            <select onChange={(e) => {
                const selected = skills.find(skill => skill.id === parseInt(e.target.value));
                setSkillSelect(selected);
                }}>
                <option value="">
                    مهارت های خود را انتخاب کنید
                </option>
                    {skills.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
                    ))}
            </select>
            <select value={levelSkill} onChange={(e)=>setLevelSkill(e.target.value)}>
                <option>
                    سطح مهارتان را انتخاب کنید
                </option>
                <option value={'beginner'} >
                    Beginner
                </option>
                <option value={'intermediate'} >
                    Intermediate
                </option>
                <option value={'advanced'} >
                    Advanced
                </option>
                <option value={'expert'} >
                    Expert
                </option>
            </select>
            <button onClick={AddSkill}>
                افزودن 
            </button>
            </div>
        </>
    )
}
export default SkillUser