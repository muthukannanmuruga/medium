import { useRecoilValue } from "recoil";
import { Appbar } from "../components/Appbar";
import { OuterblogSkeleton } from "../components/Outerblogskeleton";
import { Quote } from "../components/Quote"
import { Signupcomponent } from "../components/Signupcomponent"
import { signupisLoadingState, usernameToStoreinrecoil } from "./recoilState";

export const Signup = () =>
{   
    const signupisLoading = useRecoilValue(signupisLoadingState);
    const recoilUsername = useRecoilValue(usernameToStoreinrecoil)

    //const username = localStorage.getItem("username")
    const  finaluserInitial = recoilUsername ? recoilUsername.trim().charAt(0).toUpperCase() : 'A';
    if (signupisLoading) {
        return (
            <div>
                {/* Render the app bar with the user initials */}
                <Appbar UserInitial={finaluserInitial} />

                {/* Render skeleton components while loading */}
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
                <OuterblogSkeleton />
            </div>
        );
    } else {
    return <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex justify-center flex-col items-center h-screen md:h-auto">
                <Signupcomponent/>
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
}