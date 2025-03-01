// import { doc, deleteDoc, updateDoc,increment } from "firebase/firestore";
// import { auth, db } from "../firebase/config";
// import {Comments} from "./Comments";
// import {  useState } from "react";
// export const PostCard = ({post, toggle, setToggle}) => {
//      const { id,title, description,author,likecount,smilecount} = post;
//      const isAuth = JSON.parse(localStorage.getItem("isAuth"));
//      const [dropdown, setDropdown] = useState(false);
//     async function handleDelete(){
//       const document = doc(db, "posts", id);
//       await deleteDoc(document);
//       setToggle(!toggle);
//     }
//   const [liked,setLiked]=useState(false);
//   const [smile,setSmile]=useState(false);
//   const addsmile = async () => {
//     setSmile(true);
//     const docRef = doc(db, "posts", id); // Collection "users", document "userId123"
//     await updateDoc(docRef, {
//       smilecount: increment(1) 
//     });
//   };
//   const addlike = async () => {
//     setLiked(true);
//     const docRef = doc(db, "posts", id); // Collection "users", document "userId123"
//     await updateDoc(docRef, {
//       likecount: increment(1) 
//     });
//   };
//   return (
//     <div className="card">
//         <p className="title">{title}</p>
//         <p className="description">{description}</p>
//         <p className="control">      
               
//             <span className="comment">
//               <button  className=" ico"><i className="bi bi-chat-dots"></i></button>
              
              
//               { dropdown &&  <Comments  post={post} setDropdown={setDropdown} />}
//               <button
//   onClick={() => addlike()}
//   className="ico transform transition duration-200 ease-in-out"
//   style={{ transform: liked ? 'scale(1.2)' : 'scale(1)' }}
// >
//   {!liked ? (
//     <i className="bi bi-heart "></i>
//   ) : (
//     <i className="bi bi-heart-fill text-red-600"></i>
//   )}
// </button>

              

// <button
//   onClick={() => addsmile()}
//   className="ico transform transition duration-200 ease-in-out"
//   style={{ transform: smile ? 'scale(1.2)' : 'scale(1)' }}
// >
//   {!smile ? (
//     <i className="bi bi-emoji-laughing"></i>
//   ) : (
//     <i className="bi bi-emoji-laughing-fill text-blue-800"></i>
//   )}
// </button>

              
//             </span>
//             <span className="author">{author.name}</span>
//             { isAuth &&auth.currentUser&& ((author.id === auth.currentUser.uid)||(auth.currentUser.uid==="r7eGfMftf4Uo13jhJEvyPhiOQCc2"))&& <span onClick={handleDelete} className="delete"><i className="bi bi-trash3"></i>
//             </span> }
            
//         </p>
//     </div>
//   )
// }
import { doc, deleteDoc, updateDoc, increment } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { Comments } from "./Comments";
import { useState } from "react";

export const PostCard = ({ post, toggle, setToggle }) => {
  const { id, title, description, author, likecount, smilecount } = post;
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
  const [dropdown, setDropdown] = useState(false);
  const [liked, setLiked] = useState(false);
  const [smile, setSmile] = useState(false);

  async function handleDelete() {
    const document = doc(db, "posts", id);
    await deleteDoc(document);
    setToggle(!toggle);
  }

  const addsmile = async () => {
    if(smile) return;
    setSmile(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      smilecount: increment(1),
    });
  };

  const addlike = async () => {
    if (liked) return; // Prevent multiple clicks from the same user
    setLiked(true);
    const docRef = doc(db, "posts", id);
    await updateDoc(docRef, {
      likecount: increment(1),
    });
  };

  return (
    <div className="card">
      <p className="title">{title}</p>
      <p className="description">{description}</p>
      <p className="control">
        <span className="comment">
          <button className="ico ">
            <i className="bi bi-chat-dots px-1 "></i>
          </button>

          {dropdown && <Comments post={post} setDropdown={setDropdown} />}

          <button
            onClick={addlike}
            className="ico ml-6 mr-6 transform transition duration-200 ease-in-out"
            style={{ transform: liked ? "scale(1.2)" : "scale(1)" }}
          >
            {!liked ? (
              <i className="bi bi-heart"></i>
            ) : (
              <i className="bi bi-heart-fill text-red-600"></i>
            )}
            <span className="pl-3">{likecount}</span>
          </button>
          

          <button
            onClick={addsmile}
            className="ico transform transition duration-200 ease-in-out"
            style={{ transform: smile ? "scale(1.2)" : "scale(1)" }}
          >
            {!smile ? (
              <i className="bi bi-emoji-laughing"></i>
            ) : (
              <i className="bi bi-emoji-laughing-fill text-blue-800"></i>
            )}
            <span className="pl-3">{smilecount}</span>
          </button>
          
        </span>

        <span className="author">{author.name}</span>
        {isAuth &&
          auth.currentUser &&
          ((author.id === auth.currentUser.uid) ||
            auth.currentUser.uid === "r7eGfMftf4Uo13jhJEvyPhiOQCc2") && (
            <span onClick={handleDelete} className="delete">
              <i className="bi bi-trash3"></i>
            </span>
          )}
      </p>
    </div>
  );
};
