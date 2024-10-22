import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase/config";
import { useState } from "react";
import Swal from 'sweetalert2';

export const CreatePost = () => {
  const navigate = useNavigate();
  useTitle("Create Post - MindFlect");
  const postRef = collection(db, "posts");
  const [isDisabled, setIsDisabled] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsDisabled(true); // Disable the button immediately

    const document = {
      title: event.target.title.value,
      description: event.target.description.value,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    };

    try {
      await addDoc(postRef, document);
      Swal.fire({
        title: "Post Successful!",
        icon: "success",
        confirmButtonText: 'Cool',
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      Swal.fire({
        title: "Post Failed!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: 'Okay',
      });
    } finally {
      setIsDisabled(false); // Re-enable the button in case of failure or success
    }
  }

  return (
    <section className="create">
      <div className="heading">
        <h1>Add New Post</h1>
      </div>
      <form className="createPost" onSubmit={handleSubmit}>
        <input
          type="text"
          className="title"
          name="title"
          placeholder="Title"
          maxLength="50"
          required
        />
        <textarea
          className="description"
          name="description"
          placeholder="Description"
          maxLength="600"
          required
        ></textarea>
        <button type="submit" className="submit" disabled={isDisabled}>
          Create
        </button>
      </form>
    </section>
  );
};
