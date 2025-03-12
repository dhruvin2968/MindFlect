import { useEffect, useRef, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import { PostCard, SkeletonCard } from "../components";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  useTitle("MindFlect - Reflect, Share, Grow");
  const [posts, setPosts] = useState(new Array(2).fill(false)); //returns array with 2 elements both are false
  const [toggle, setToggle] = useState();
  const postRef = useRef(collection(db, "posts"));
  const cardsRef = useRef([]);

  //everytime we r on homepage it should load all posts so we use useeffect
  useEffect(() => {
    async function getPosts() {
      const data = await getDocs(postRef.current);
      setPosts(
        data.docs.map((document) => ({
          ...document.data(),
          id: document.id,
          //Now this thing wil return multiple objects for individual documents
        }))
      );
    }
    //just for checking if jyada requests toh send nhi hore console.log("---");
    getPosts();
  }, [toggle]); // everytime toggle changes we reload our documents

  // usko postRef as dependency chaiye but it will create infinite calls
  //as objects and fns dependency mei nhi daalte
  //so we use useRef

  // Scroll-based animation
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%", // when card enters viewport
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }
  }, [posts]);

  return (
    <section>
      {posts.map((post, index) =>
        post ? (
          <div
            key={post.id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <PostCard
              post={post}
              toggle={toggle}
              setToggle={setToggle}
            />
          </div>
        ) : (
          <SkeletonCard key={index} />
        )
      )}
    </section>
  );
};
