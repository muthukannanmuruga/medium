import { Quote } from "../components/Quote";
import { Signincomponent } from '../components/Signincomponent';
import { useRecoilValue } from 'recoil';
import { isLoadingState, usernameToStoreinrecoil } from './recoilState';
import { OuterblogSkeleton } from '../components/Outerblogskeleton';
import { Appbar } from '../components/Appbar';

export const Signin = () => {
    const isLoading = useRecoilValue(isLoadingState);
    const recoilUsername = useRecoilValue(usernameToStoreinrecoil)
    //const username = localStorage.getItem("username")
    const  finaluserInitial = recoilUsername ? recoilUsername.trim().charAt(0).toUpperCase() : 'A';

    if (isLoading) {
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
        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="flex justify-center flex-col items-center h-screen md:h-auto">
                        <Signincomponent />
                    </div>

                    <div className="hidden md:block">
                        <Quote
                            Quote={"\"Live as if you were to die tomorrow. Learn as if you were to live forever.\""}
                            Author={"Mahatma Gandhi"}
                            Designation={"Father of India"}
                        />
                    </div>
                </div>
            </div>
        );
    }
};
