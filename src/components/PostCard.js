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
  const document = doc(db, "posts", id);
  async function handleDelete() {
    await deleteDoc(document);
    setToggle(!toggle);
  }

  const addsmile = async () => {
    
    if(smile) return;
    
    await updateDoc(document, {
      smilecount: increment(1),
    });
    setSmile(true);
  };

  const addlike = async () => {
    if (liked) return; // Prevent multiple clicks from the same user
    await updateDoc(document, {
      likecount: increment(1),
    });
    setLiked(true);
  };

  return (
    <div className="card">
      {/* <p className="title">{title}</p>
      <img src={author.photourl} alt="" />
       */}
        <div className="title-section">
      <p className="title">{title}</p>
      <img className="author-img" src={author.photourl} alt="Author" />
    </div>
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
