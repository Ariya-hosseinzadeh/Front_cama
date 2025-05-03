import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import DetialeInventaionSend from "../../components/DetailInventaionSend"
const InventationSend=()=>{
    const [invitations,setInvitations]=useState([])
    const [selectInvitations,setSelectInvitations]=useState(null)
    const {fetchWithAuth}=useContext(AuthContext)
    useEffect(
        ()=>{
            fetchWithAuth('https://127.0.0.1:8000/classroom/my-inventation-send/',{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json'
                }

            })
            .then(
                res=> {
                    if(res.ok){
                        return res.json()
                    }
                    else{
                        return res.json().then(
                            errorData=>{return Promise.reject(errorData)}
                        )
                    }
                }
            )
            .then(
                data=>setInvitations(data)
            )
            .catch(
                error=>console.log(error)
            )
        },[]
    )
    return(
        <>
            <div>
            {
                selectInvitations===null?
                <div>
                {
                    invitations.map(
                        (item) => 
                        <button key={item.id} onClick={()=>setSelectInvitations(item.id)}>
                            <ul key={item.id}>
                            <li>
                                {item.Course_name}
                            </li>
                            <li>
                                {item.teacher_name}
                            </li>
                            <li>
                                {item.description}
                            </li>
                            <li>
                                {item.status}
                            </li>
                        </ul>
                        </button>
                    )
                }
            </div>:
            <div>
                <DetialeInventaionSend id={selectInvitations}/>
            </div>
            }
        
            </div>
        </>
    )
}
export default InventationSend