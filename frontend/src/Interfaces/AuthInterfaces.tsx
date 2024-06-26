import { ChangeEventHandler, MouseEventHandler } from 'react';


export interface QuoteProps {
    Quote: string; // Assuming Quote is of type string, adjust the type accordingly
    Author?: string;
    Designation?: string;
}
export interface InputboxProps {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    type?: string;

}

export interface ButtonProps{

    text: string;
    onClick: MouseEventHandler<HTMLButtonElement>;

}

export interface BlogPost {
    post_id: string;
    title: string;
    content: string;
    publishedOn: string;
    authorName: string;
}


export interface PostBlogInput {
    title: string,
    content: string
}