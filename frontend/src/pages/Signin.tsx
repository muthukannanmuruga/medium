import { Quote } from "../components/Quote";
import { Signincomponent } from '../components/Signincomponent';
import { useRecoilValue } from 'recoil';
import { isLoadingState } from './recoilState';
import { OuterblogSkeleton } from '../components/Outerblogskeleton';
import { Appbar } from '../components/Appbar';

export const Signin = () => {
    const isLoading = useRecoilValue(isLoadingState);
    const username = localStorage.getItem("username")
    const  finaluserInitial = username ? username.trim().charAt(0).toUpperCase() : 'A';
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
                            Quote={"\"The Customer service I received was exceptional. The support team went above and beyond to address my concerns.\""}
                            Author={"Jules Winnfield"}
                            Designation={"CEO, Acme Inc"}
                        />
                    </div>
                </div>
            </div>
        );
    }
};
