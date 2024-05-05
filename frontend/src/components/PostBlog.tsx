import React, { useState } from 'react';
import { Button } from './Button';
import { Label } from './Label';
import { Link, useNavigate } from "react-router-dom";
import { OuterblogSkeleton } from './Outerblogskeleton';
import {PostBlogInput} from '../Interfaces/AuthInterfaces'

function PostBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useNavigate();
  const handleTitleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      const data : PostBlogInput  = {
        title: title,
        content: content
      };

      fetch('https://backend.mediumapp.workers.dev/api/v1/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Blog post successful:', data);
        setTitle('');
        setContent('');
        
        router('/blog');
      })
      .catch(error => {
        console.error('Error posting blog:', error);
      }) .finally(()=> {setLoading(false)});
    }
  };

  if(loading){
    return (
        <div>
            
            <OuterblogSkeleton/>
            <OuterblogSkeleton/>
            <OuterblogSkeleton/>
            <OuterblogSkeleton/>
            <OuterblogSkeleton/>
            
        </div>
           
    );
}
  

  return (
    <div className="max-w-lg w-3/4 mx-auto p-4">
      <div className="mb-4">
      <Label
        text={"Title"}
        />
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <Label
        text={"Content"}
        />
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Tell your story..."
          rows={10}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        />
      </div>
      <Button 
      text={"Post"}
      onClick={handleSubmit}
      />
    </div>
  );
}

export default PostBlog;
