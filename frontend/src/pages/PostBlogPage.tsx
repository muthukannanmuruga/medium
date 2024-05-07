import PostBlog from "../components/PostBlog";
import { Appbar } from "../components/Appbar";

import { useRecoilValue } from 'recoil';
import { usernameToStoreinrecoil } from './recoilState';



export const PostBlogPage = () => {

    const recoilUsername = useRecoilValue(usernameToStoreinrecoil)
    //const username = localStorage.getItem("username")
    const  finaluserInitial = recoilUsername ? recoilUsername.trim().charAt(0).toUpperCase() : 'A';


    return <>
        <Appbar UserInitial={finaluserInitial}/>
        <div className="h-auto flex justify-center flex-col pl-5">
            
            <PostBlog/>
        </div>
    
    </>
}