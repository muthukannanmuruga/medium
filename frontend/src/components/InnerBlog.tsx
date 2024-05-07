import { useEffect, useState } from "react";
import { Appbar } from "./Appbar";
import axios from "axios";
import { OuterblogSkeleton } from "./Outerblogskeleton";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { usernameToStoreinrecoil } from "../pages/recoilState";
import { useRecoilValue } from "recoil";


interface Blog {
    userDescription: string;
    title: string;
    content: string;
    publishedOn: string;
    authorName: string;
    // Add other properties if needed
}

export const InnerBlog = () => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const { id = '' } = useParams<{ id?: string }>(); // Provide a default value for id
    const navigate = useNavigate(); // useNavigate hook
    const [blogIds, setBlogIds] = useState<string[]>([]);
    const [blogLoading, setBlogLoading] = useState(false);
    
    

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setBlogLoading(true);
                const response = await axios.get(
                    `https://backend.mediumapp.workers.dev/api/v1/blog/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (response.status === 200) {
                    setBlog(response.data.posts);
                } else {
                    console.error(
                        "Failed to fetch blog:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
                setBlogLoading(false);
            }
        };

        const fetchBlogIds = async () => {
            try {
                const response = await axios.get(
                    "https://backend.mediumapp.workers.dev/api/v1/blog/bulk",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
        
                if (response.status === 200) {
                    const ids = response.data.posts.map(
                        (post: { post_id: string }) => post.post_id
                    );
                    // Sort the IDs in descending order
                    const sortedIds = ids.sort((a: string, b: string) => {
                        const dateA = new Date(a);
                        const dateB = new Date(b);
                        return dateB.getTime() - dateA.getTime();
                    });
                    setBlogIds(sortedIds);
                } else {
                    console.error(
                        "Failed to fetch blog IDs:",
                        response.statusText
                    );
                }
            } catch (error) {
                console.error("Error fetching blog IDs:", error);
            }
        };
        fetchBlog();
        fetchBlogIds();
    }, [id]);

    
    let publishedDate = blog?.publishedOn?.split(" ");
    let date: string | undefined;
    if (publishedDate && publishedDate.length > 0) {
        date = publishedDate[0];
    } else {
        date = undefined;
    }
    const recoilUsername = useRecoilValue(usernameToStoreinrecoil)
    //const username = localStorage.getItem("username")
    const  finaluserInitial = recoilUsername ? recoilUsername.trim().charAt(0).toUpperCase() : 'A';
    

    const goToPrevious = () => {
        setBlogLoading(true)
        console.log(blogLoading)
        const currentIndex = blogIds.indexOf(id);
        const previousIndex =
            currentIndex > 0 ? currentIndex - 1 : blogIds.length - 1;
        navigate(`/blog/${blogIds[previousIndex]}`); // Use navigate to go to previous

    };

    const goToNext = () => {
        setBlogLoading(true)
        console.log(blogLoading)
        const currentIndex = blogIds.indexOf(id);
        const nextIndex =
            currentIndex < blogIds.length - 1 ? currentIndex + 1 : 0;
        navigate(`/blog/${blogIds[nextIndex]}`); // Use navigate to go to next
     
    };

    // Disable previous button when there is no previous post
    const isPreviousDisabled = blogIds.indexOf(id) === 0;

    // Disable next button when there is no next post
    const isNextDisabled = blogIds.indexOf(id) === blogIds.length - 1;

    if (loading || blogLoading) {
        return (
            <div>
                <Appbar UserInitial={finaluserInitial} />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
            </div>
        );
    }
    if (!blog) {
        return (
            <div className="flex flex-row justify-center h-screen items-center font-extrabold ">
                No blogs found
            </div>
        );
    }

    return (
        <div>
            <Appbar UserInitial={finaluserInitial} />
            <div className="h-auto flex flex-row justify-center mx-10 py-20">
                <div className="w-2/3  px-5 mx-5">
                    <div className="font-extrabold text-4xl">
                        {blog.title}
                    </div>
                    <div className="mt-2 text-sm text-slate-500">
                        Posted on {date}
                    </div>
                    <div className="mt-4 text-gray-700 text-base">
                        {blog.content}
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="font-bold text-gray-800">Author</div>
                    <div className="flex flex-row items-center mt-2">
                        <div className="text-base font-bold text-gray-800 rounded-full h-7 w-7 flex items-center justify-center bg-gray-300">
                            {blog.authorName ? blog.authorName.trim().charAt(0).toUpperCase() : 'A'}
                        </div>
                        <div className="mx-3 px-3">
                            <div className="font-semibold text-xl">
                                {blog.authorName}
                            </div>
                            <div className="text-base pt-1 text-slate-500 max-w-80 overflow-hidden overflow-ellipsis">
                                {blog.userDescription}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mx-10">
        
                <button className={`text-white bg-gray-900 hover:bg-gray-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 ${isPreviousDisabled ? 'cursor-not-allowed' : ''}`}  onClick={goToPrevious} disabled={isPreviousDisabled}>Previous</button>
                <button className={`text-white bg-gray-900 hover:bg-gray-700  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 ${isNextDisabled ? 'cursor-not-allowed' : ''}`}  onClick={goToNext} disabled={isNextDisabled}>Next</button>
            </div>
        </div>
    );
};
