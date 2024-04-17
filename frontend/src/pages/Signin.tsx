import {Quote} from "../components/Quote"
import {Signincomponent} from '../components/Signincomponent'

export const Signin = () =>
{
    return <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center flex-col items-center h-screen md:h-auto">
                <Signincomponent/>
            </div>

            <div className="hidden md:block">
                <Quote 
                Quote={"\"The Customer service I received was exceptional. The support team went above and beyond to address my concerns.\""} 
                Author= {"Jules Winnfield"} 
                Designation={"CEO, Acme Inc"}
                />
            </div>

        </div>
        
        
        
    </div>
}