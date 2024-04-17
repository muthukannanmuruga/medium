import {InputboxProps} from '../Interfaces/AuthInterfaces'

type AllowedInputType = 'password' | 'text';

export const Inputboxwithlabel = ({label,placeholder,type, onChange}: InputboxProps & {type? : AllowedInputType})  => {
    return <div>
        <div>
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} onChange={onChange}  required />
        </div>
    </div>
}