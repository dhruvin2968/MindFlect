import { useEffect, useRef, useState } from "react"
import { useTitle } from "../hooks/useTitle";
import {PostCard,SkeletonCard} from "../components"
import {getDocs,collection} from "firebase/firestore";
import{db} from "../firebase/config"
export const Home = () => {
  useTitle("MindFlect - Reflect, Share, Grow");
  const [posts,setPosts]=useState(new Array(2).fill(false)); //returns array with 2 elements both are false
  const [toggle,setToggle]=useState();
  const postRef=useRef(collection(db,"posts"));
  //everytime we r on homepage it should load all posts so we use useeffect
  useEffect(()=>{
    async function getPosts()
    {
      const data =await getDocs(postRef.current);
      setPosts(data.docs.map((document)=>(
        {...document.data(),id:document.id
          //Now this thing wil return multiple objects for individual documents
      })))
    }
     //just for checking if jyada requests toh send nhi hore console.log("---");
    getPosts();
  },[postRef,toggle])// everytime toggle changes we reload our documents

  // usko postRef as dependecy chaiye but it will create infinite calls
  //as objects and fns dependency mei nhi daalte
  //so we use useRef  

  return (
    <section>
      <div id="cursor"></div>
      <div id="cursor-blur"></div> 
      { posts.map((post, index) => (
        post ? (
          <PostCard key={post.id} post={post} toggle={toggle} setToggle={setToggle} />
        ) : (
          <SkeletonCard key={index} />
        )        
      )) }      
    </section>
  )
}
