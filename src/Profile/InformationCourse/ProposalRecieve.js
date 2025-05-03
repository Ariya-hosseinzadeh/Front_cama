import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/Context/AuthContext"
import DetialeInventaionRecieve from "../../components/DetaileInvetaionRecieve"
import { data } from "react-router-dom"


const ProposalRecieve=()=>{
    const [proposals,setProposals]=useState([])
    const [selectInvitations,setSelectInvitations]=useState(null)
    const {fetchWithAuth}=useContext(AuthContext)
    useEffect(
        ()=>{
            fetchWithAuth('https://127.0.0.1:8000/classroom/proposal-courses/',{
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
                data=>setProposals(data)
               
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
                console.log(proposals)
            }
            {
                selectInvitations===null?
                <div>
                {
                    proposals.map(
                        (item) => 
                        <button key={item.id} onClick={()=>setSelectInvitations(item.id)}>
                            <ul key={item.id}>
                            <li>
                                {item.Course_name}
                            </li>
                            <li>
                                {item.description}
                            </li>
                            <li>
                                {item.creator_name}
                            </li>
                        </ul>
                        </button>
                    )
                }
            </div>:
            <div>
                <DetialeInventaionRecieve id={selectInvitations}/>
            </div>
            }
        
            </div>
        </>
    )
}
export default ProposalRecieve