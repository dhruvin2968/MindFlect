import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import {Comments} from "./Comments";
import { useState } from "react";
export const PostCard = ({post, toggle, setToggle}) => {
     const { id,title, description,author} = post;
     const isAuth = JSON.parse(localStorage.getItem("isAuth"));
     const [dropdown, setDropdown] = useState(false);
    async function handleDelete(){
      const document = doc(db, "posts", id);
      await deleteDoc(document);
      setToggle(!toggle);
    }
  return (
    <div className="card">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
        <p className="control">      
               
            <span className="comment">
              <button  className=" ico"><i className="bi bi-chat-dots"></i></button>
              { dropdown &&  <Comments  post={post} setDropdown={setDropdown} />}
              <button  className=" ico"> <i className="bi bi-heart "></i></button>
              <button  className="ico"><i className="bi bi-emoji-laughing"></i></button>
              
            </span>
            <span className="author">{author.name}</span>
            { isAuth && ((author.id === auth.currentUser.uid)||(auth.currentUser.uid==="r7eGfMftf4Uo13jhJEvyPhiOQCc2"))&& <span onClick={handleDelete} className="delete"><i className="bi bi-trash3"></i>
            </span> }
            
        </p>
    </div>
  )
}