import { Link } from "react-router-dom";


export const Outerblog = ({title, content, publishedOn, User, postid}:{title: string, content: string, publishedOn: string, User: string, postid: string}) => {   
    const publishedDate = publishedOn ? publishedOn.split(' ') : ['']; // Split only if publishedOn is not null or undefined
    const date = publishedDate[0];
    const UserInitial = User ? User.trim().charAt(0).toUpperCase() : 'A';

    // Split content into words
    const words = content.split(' ');

    // Select the first 50 words and join them together
    const truncatedContent = words.slice(0, 50).join(' ');

    // Calculate estimated reading time
    const readingTime = Math.ceil(words.length / 60); // Assuming 60 words per minute

    return (
        <div>
                        
            <div className="flex justify-center mt-4 ">
                <div className="mx-20 w-3/4">
                    <div className="flex flex-row items-center">
                        <div className="text-base font-bold text-gray-800 rounded-full h-7 w-7 flex items-center justify-center bg-gray-300">
                            {UserInitial}
                        </div>
                        <div className="px-2 text-sm text-slate-800">{User}</div>
                        <span className="text-gray-500 mx-2">&#8226;</span>
                        <div className="text-sm text-slate-500">{date}</div>
                    </div>
                    <div className="mt-4 border-b border-gray-150 pb-5">
                        <div className="font-extrabold text-3xl">{title}</div>
                        <div className="mt-2 text-gray-700 text-base">{truncatedContent}...</div>
                        <div className="flex flex-row">
                            <div className="text-sm text-gray-500 mt-4 pr-4">{readingTime} min read</div>
                             
                            <Link className='text-sm text-gray-500 mt-4'to={`/blog/${postid}`}>Read more</Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
