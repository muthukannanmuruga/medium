import { Link } from "react-router-dom"

export const Appbar = ({UserInitial}:{UserInitial: string}) => {

    return<>

        <div className="flex flex-row justify-between items-center px-10 my-5 border-b border-gray-150 pb-5 mb-10">
            
            <div className="font-semibold cursor-pointer">
                <Link to={'/blog'}>
                Medium
                </Link>
            </div>

            <div className="text-base font-bold text-gray-800 rounded-full h-10 w-10 flex items-center justify-center bg-gray-300">
                {UserInitial}
            </div>


        </div>
    
    
    
    
    
    </>
}