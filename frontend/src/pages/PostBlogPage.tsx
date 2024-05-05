import PostBlog from "../components/PostBlog";
import { Appbar } from "../components/Appbar";



export const PostBlogPage = () => {

    const username = localStorage.getItem("username")
    const  finaluserInitial = username ? username.trim().charAt(0).toUpperCase() : 'A';


    return <>
        <Appbar UserInitial={finaluserInitial}/>
        <div className="h-auto flex justify-center flex-col pl-5">
            
            <PostBlog/>
        </div>
    
    </>
}