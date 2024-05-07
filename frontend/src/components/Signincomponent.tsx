import { useState } from 'react';
import { Label } from './Label';
import { Inputboxwithlabel } from './Inputboxwithlabel';
import { SigninType } from 'mk-mediumapp-common/dist';
import { Button } from './Button';
import axios from 'axios';
import { BACKEND_URL } from '../Config';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { isLoadingState } from '../pages/recoilState';

export const Signincomponent = () => {
  const [signinProps, setSigninProps] = useState<SigninType>({
    email: '',
    password: '',
  });

  // @ts-ignore
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinProps);
      console.log('Sign in successful:', response.data);
      // Do something with the response, such as redirecting to another page
      const jwtoutput = response.data.jwt
      localStorage.setItem("token", jwtoutput)
      const username = response.data.name;
      const usernameToStore = username ? username : "Anonymous"; // Check if username is null
      localStorage.setItem("username", usernameToStore);
      navigate("/blog")
      
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error, such as displaying an error message to the user
    } finally {
      setIsLoading(false); // Set isLoading to false when sign-in process completes
    }
  };

  return (
    <>
      <div className="flex flex-col items-center  p-10 space-y-6 w-full ">
        <div className="text-3xl font-bold text-center">
          <Label text="Create an account" />
          <div className="text-base font-medium text-slate-600">
            <Label
              text={
                <>
                  Not have an account yet?{' '}
                  <a href="/signup" className="underline">
                    Sign up
                  </a>
                </>
              }
            />
          </div>
        </div>

        <div className='size-full w-6/12'>
            
            <div className='pb-2'>
            <Inputboxwithlabel
                label={'Email'}
                placeholder={'example@gmail.com'}
                onChange={(e) =>
                setSigninProps({ ...signinProps, email: e.target.value })
                }
            />
            </div>

            <div>
            <Inputboxwithlabel
                label={'Password'}
                placeholder={'123456'}
                type={'password'}
                onChange={(e) =>
                setSigninProps({ ...signinProps, password: e.target.value })
                }
            />
            </div>

            <div className='pt-6'>
            <Button
                text={'Sign in'}
                onClick={handleSignIn}
            />
            </div>

        </div>

        
      </div>
    </>
  );
};
