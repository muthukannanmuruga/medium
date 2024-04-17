import {ButtonProps} from '../Interfaces/AuthInterfaces'

export const Button = ({text, onClick}: ButtonProps)  => {
    return <div>
        <div>
     
        <button type="submit" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={onClick}>{text}</button>
        </div>
    </div>
}