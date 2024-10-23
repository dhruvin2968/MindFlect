import { Link } from "react-router-dom";

export const Comments = ({ post, setDropdown }) => {
  const { comment1 ,author} = post;
  
  return (
    <div 
      id="dropdownAvatar" 
      className="select-none absolute z-50 max-w-80 bg-white rounded divide-y divide-blue-100 shadow dark:bg-blue-200 dark:divide-blue-100"
    >
      <ul 
        className="py-1 text-sm text-blue-700 dark:text-blue-200" 
        aria-labelledby="dropdownUserAvatarButton"
      >
        <li>
          <Link 
            onClick={() => setDropdown(false)} 
            to="/products" 
            className="block py-2 px-4 hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            
           

            <div className="logoname">
            <span2 className="author comment name">{author.name}</span2>
            <span className="comment border-b-2 border-black" >{comment1}</span>
        </div>
          </Link>
        </li>
        <li>
          <Link 
            onClick={() => setDropdown(false)}  
            className="block py-2 px-4 hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            Login
          </Link>
        </li>
        <li>
          <Link 
            onClick={() => setDropdown(false)} 
            to="/register" 
            className="block py-2 px-4 hover:bg-blue-100 dark:hover:bg-blue-600 dark:hover:text-white"
          >
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
