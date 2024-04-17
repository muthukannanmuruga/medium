import {QuoteProps} from '../Interfaces/AuthInterfaces'

export const Quote = ({Quote, Author, Designation}: QuoteProps) =>
{
    return <div className="bg-slate-200 h-screen flex justify-center flex-col pl-5">
        <div className='px-20'>
            <div className="max-w-screen-md text-3xl font-bold text-left">
                {Quote}
            </div>
            <div className='pt-4'>
                <div className="max-w-screen-md text-lg font-bold text-left">
                    {Author}
                </div>
                <div className="max-w-screen-md text-base text-left font-bold text-slate-600">
                    {Designation}
                </div>
            </div>
        </div>

    </div>
}