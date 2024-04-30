import React from 'react';


export const OuterblogSkeleton = () => {
    return (
        <div>
                
                <div className='flex justify-center'>
                    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse  w-2/3 mb-4 flex flex-col justify-center">
                    
                    <div className="w-2/3 h-1 bg-gray-300 mb-4 rounded mb-2"></div>
                    
                    <div className="w-full h-1 bg-gray-300 mb-4 rounded mb-2"></div>
                    <div className="w-full h-1 bg-gray-300 mb-4 rounded mb-2"></div>
                    <div className="w-1/2 h-1 bg-gray-300 mb-4 rounded"></div>
                    </div>
                    
                </div>
                
            </div>
    );
};
