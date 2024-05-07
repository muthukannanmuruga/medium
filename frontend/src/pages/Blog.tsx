import { useState, useEffect } from 'react';
import axios from 'axios';
import { Appbar } from "../components/Appbar";
import { Outerblog } from "../components/Outerblog";
import { BlogPost } from "../Interfaces/AuthInterfaces"
import { OuterblogSkeleton } from '../components/Outerblogskeleton';
import { useRecoilValue } from 'recoil';
import { usernameToStoreinrecoil } from './recoilState';

export const Blog = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]); // Specify the type as BlogPost[]
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://backend.mediumapp.workers.dev/api/v1/blog/bulk', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    const sortedBlogs = response.data.posts.sort((a: BlogPost, b: BlogPost) => {
                    // Convert publishedOn strings to Date objects
                    const dateA = a.publishedOn ? new Date(a.publishedOn) : null;
                    const dateB = b.publishedOn ? new Date(b.publishedOn) : null;

                    // Handle cases where publishedOn dates are null or undefined
                    if (!dateA && !dateB) {
                        return 0; // No change in order if both are null or undefined
                    } else if (!dateA) {
                        return 1; // Move a to the end if its publishedOn is null or undefined
                    } else if (!dateB) {
                        return -1; // Move b to the end if its publishedOn is null or undefined
                    }

                    // Get today's date
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // Set time to midnight for comparison

                    // Compare publishedOn dates
                    if (dateA.toDateString() === today.toDateString()) {
                        return -1; // Move a to the beginning if its publishedOn is today
                    } else if (dateB.toDateString() === today.toDateString()) {
                        return 1; // Move b to the beginning if its publishedOn is today
                    }

                    // Sort by publishedOn date in descending order
                    return dateB.getTime() - dateA.getTime();
                });
                    setBlogs(sortedBlogs);
                } else {
                    console.error('Failed to fetch blogs:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBlogs();
    }, []);

    const recoilUsername = useRecoilValue(usernameToStoreinrecoil)
    //const username = localStorage.getItem("username")
    const  finaluserInitial = recoilUsername ? recoilUsername.trim().charAt(0).toUpperCase() : 'A';

    if (loading) {
        return (
            <div>
                <Appbar UserInitial={finaluserInitial} />
                {/* Render skeleton components while loading */}
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
            </div>
        );
    }

    return (
        <div>
            <Appbar UserInitial={finaluserInitial} />
            {blogs.length > 0 ? (
                blogs.map((blog, index) => (
                    <Outerblog
                        key={index}
                        title={blog.title}
                        content={blog.content}
                        publishedOn={blog.publishedOn}
                        User={blog.authorName}
                        postid={blog.post_id}
                    />
                ))
            ) : (
                <div className='flex flex-row justify-center text-extrabold'>No blogs found</div>
            )}
        </div>
    );
};
