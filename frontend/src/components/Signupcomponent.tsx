import React, { useState } from 'react';
import { Label } from './Label';
import { Inputboxwithlabel } from './Inputboxwithlabel';
import { SignupType } from '../../../common/src';
import { Button } from './Button';
import { BACKEND_URL } from '../Config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signupcomponent = () => {
  const [signupProps, setSignupProps] = useState<SignupType>({
    email: '',
    password: '',
    name: '',
    userDescription: '',
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupProps);
      console.log('Sign in successful:', response.data);
      const output = response.data.jwt
      localStorage.setItem("token", output)
      navigate("/blog")

    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error, such as displaying an error message to the user
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
                  Already have an account?{' '}
                  <a href="/signin" className="underline">
                    Sign in
                  </a>
                </>
              }
            />
          </div>
        </div>

        <div className='size-full w-6/12'>
            
            <div className='pb-2'>
            <Inputboxwithlabel
                label={'Name'}
                placeholder={'John Maverick'}
                onChange={(e) =>
                setSignupProps({ ...signupProps, name: e.target.value })
                }
            />
            </div>

            <div className='pb-2'>
            <Inputboxwithlabel
                label={'About me'}
                placeholder={'I am a musician...'}
                onChange={(e) =>
                setSignupProps({ ...signupProps, userDescription: e.target.value })
                }
            />
            </div>


            <div className='pb-2'>
            <Inputboxwithlabel
                label={'Email'}
                placeholder={'example@gmail.com'}
                onChange={(e) =>
                setSignupProps({ ...signupProps, email: e.target.value })
                }
            />
            </div>

            <div>
            <Inputboxwithlabel
                label={'Password'}
                placeholder={'123456'}
                type={'password'}
                onChange={(e) =>
                setSignupProps({ ...signupProps, password: e.target.value })
                }
            />
            </div>

            <div className='pt-6'>
            <Button
                text={'Sign up'}
                onClick={handleSignup}
            />
            </div>

        </div>

        
      </div>
    </>
  );
};
