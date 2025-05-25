import { useState } from "react"
import EmojiPicker from 'emoji-picker-react';
const CreatePost=()=>{
    const [content,setContent]=useState('')
    const [files,setFiles]=useState({
        video:null,
        image:null,
        file:null
    })
     const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji);
  };
    const SubmitForm=()=>{
        alert(files)
    }
    return(
        <>
            <div className="modal">
                <div>
                    header
                </div>
                <div>
                    <div >
                    <textarea name="text_post" value={content} onChange={(e)=>setContent(e.target.value)}>

                    </textarea>
                </div>
                <div>
                     <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                        😊
                    </button>
                    {
                        showEmojiPicker&&
                        (
        <div className="mt-2">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )
                    }
                </div>
                <div>
                    <ul>
                        <li>
                            <span>
                                
                                    <input type="file" name="video" accept="video/*" onChange={(e)=>setFiles({...files,video:e.target.files?.[0]|| null})}/>
                                video  
                                
                            </span>
                        </li>
                        <li>
                            <span>
                                
                                    image
                                    <input type="file" name='image' accept="image/*" onChange={(e)=>setFiles({...files,image:e.target.files?.[0]|| null})}/>
                                
                            </span>
                        </li>
                        <li>
                            <span>
                                files
                                <input type="file" name="file" onChange={(e)=>setFiles({...files,file:e.target.files?.[0]||null})}/>
                            </span>
                        </li>
                        
                    </ul>
                </div>
                <button onClick={SubmitForm}>
                    <div>   
                        send
                    </div>
                </button>
                </div>
            </div>
        </>
    )
}
export default CreatePost