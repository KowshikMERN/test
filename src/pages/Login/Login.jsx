import React, { useState } from 'react'
import login from '../../assets/login.png'
import { FcGoogle } from "react-icons/fc";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [showPassword , setShowPassword] = useState('')

    const [emailErr , setEmailErr] = useState('')
    const [passwordErr , setPasswordErr] = useState('')


    const handleClick = ()=>{
        if(!email){
            setEmailErr('email is requered');
        }else{
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
                setEmailErr('email is invalid')
            }
        }
        if(!password){
            setPasswordErr('password is requered');
        }else{
            if(!/(?=.*[0-9])/.test(password)){
                setPasswordErr('at least one number')
            }
            if(!/(?=.*[a-z])/.test(password)){
                setPasswordErr('at least one lowercase')
            }
            if(!/(?=.{8,})/.test(password)){
                setPasswordErr('8 carecter or longer')
            }
        }
    }

    const handleEmail = (e)=>{
        setEmail(e.target.value);
        setEmailErr('')
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
        setPasswordErr('')
    }
    
    return (
        <div className='flex '>
            <div className='flex justify-end w-1/2'>
                <div className='pt-[222px] pr-[216px] cursor-pointer'>
                    <h1 className='font-sans text-[34px] font-bold text-[#03014C] mb-[30px]'>Login to your account!</h1>
                    <div className='flex py-[22px] px-[30px] w-[230px] border-[#03014C] border-2 rounded-lg border-opacity-30 items-center gap-x-[10px]'>
                        <FcGoogle className='text-2xl ' />
                        <p className='font-sans text-[#03014C] font-semibold tracking-[0.267px] text-sm '>Login with Google</p>
                    </div>
                    <div className='mt-[32px] w-[372px]'>
                        <p className='opacity-50 text-sm font-sans'>Email Addres</p>
                        <input onChange={handleEmail} type="email" placeholder='Youraddres@email.com' className='py-[16px] px-[10px] border-b-2 w-[372px] placeholder:text-xl placeholder:font-sans placeholder:font-semibold placeholder:text-[#03014C] outline-none' />

                       {
                        emailErr && 
                        <p className='p-2 bg-red-500 text-white text-xl mt-[5px] rounded-lg'>{emailErr}</p>
                       }
                    </div>

                    <div className='relative mt-[60px] w-[372px]'>
                        <p className='opacity-50 text-sm font-sans'>Password</p>
                        <input onChange = {handlePassword} type={showPassword ? 'text' : 'password'} placeholder='Enter your password' className='py-[16px] px-[10px] border-b-2 w-[372px] placeholder:text-xl placeholder:font-sans placeholder:font-semibold placeholder:text-[#03014C] outline-none' />

                        {
                            showPassword ?
                            <FaEye onClick = {()=>setShowPassword(!showPassword)} className='absolute top-[38px] right-0 text-2xl opacity-30' />
                            :
                            <FaEyeSlash onClick = {()=>setShowPassword(!showPassword)} className='absolute top-[38px] right-0 text-2xl opacity-30' />
                        }

                        {
                            passwordErr &&
                            <p className='p-2 bg-red-500 text-white text-xl mt-[5px] rounded-lg'>{passwordErr}</p>
                        }
                    </div>
                    <div onClick = {handleClick} className='py-[26px] px-[122px] bg-praimary rounded-lg mt-[56px] cursor-pointer'>
                        <p className='font-sans font-semibold text-xl text-white'>Login to Continue</p>
                    </div>
                    <div className = 'mt-[44px] '>
                        <p className = 'text-sm font-sans text-[#03014C]  text-center'>Don’t have an account ? <span className = 'font-bold text-[#EA6C00] '><Link to = '/registration'> Sign up</Link></span></p>

                        <p className = 'text-sm font-sans text-center mt-[20px] font-bold text-[#EA6C00]'>forgot password ?</p>
                    </div>

                </div>
            </div>

            <div className='w-1/2'>
                <img className=' h-screen object-cover' src={login} alt="" />
            </div>
        </div>
    )
}

export default Login