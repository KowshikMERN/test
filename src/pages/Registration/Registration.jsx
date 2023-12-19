import React, { useState } from 'react'
import img from '../../assets/reg.png'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import { CirclesWithBar } from 'react-loader-spinner'


const Registration = () => {
    const [loader,setLoader] = useState('false')
    const auth = getAuth();
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState('')

    const [emailErr, setemailErr] = useState('')
    const [fullNameErr, setFullNameErr] = useState('')
    const [passwordErr, setPasswordErr] = useState('')

    const handleClick = () => {
        if (!email) {
            setemailErr('email is requered');
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                setemailErr('email is invalid')
            }
        }
        if (!fullName) {
            setFullNameErr('fullName is requered')
        }
        if (!password) {
            setPasswordErr('password is requered');
        } else if (!/(?=.*[a-z])/.test(password)) {
            setPasswordErr('atleast one lowerCase')
        } else if (!/(?=.*[0-9])/.test(password)) {
            setPasswordErr('atleast one number')
        } else if (!/(?=.{8,})/.test(password)) {
            setPasswordErr('The string must be eight characters or longe')

        }
        if (email && fullName && password) {
            setEmail('')
            setFullName('')
            setPassword('')
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    toast.success('registration done');
                    setTimeout(() => {
                        setLoader('true')
                        navigate('/login')
                    }, 3000)
                    
                    

                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    if (errorCode.includes('auth/email-already-in-use')) {
                        setemailErr('email is already in use')
                    }

                });

        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setemailErr('')
    }

    const handleFullName = (e) => {
        setFullName(e.target.value);
        setFullNameErr('')
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setPasswordErr('')
    }
    return (
        <div className='flex'>
            <div className='w-1/2 flex justify-end'>
                <div className='mr-[69px] mt-[200px]'>
                    <h1 className='font-Nunito font-bold text-[#11175D] text-[34px] mb-[13px]'>Get started with easily register</h1>
                    <p className='text-xl font-Nunito font-normal text-[#808080] '>Free register <span className='text-[#E0E0E0]'>and</span> you can enjoy it</p>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                    />

                    <div className='mt-[50px] relative w-[368px]'>
                        <input value={email} placeholder='write your email' onChange={handleEmail} type="email" className=' w-[368px] border-2 rounded-lg px-[57px] py-[26px] border-[#B8BACF] ' />
                        <p className='absolute top-[-21px] left-[37px] font-Nunito text-sm text-[#8B8EB0]  px-[20px] py-[13px] bg-white tracking-[1px]'>Email Address</p>
                        {
                            emailErr &&
                            <p className='bg-red-500 rounded-lg text-white p-2 font-semibold text-base mt-[6px]'>{emailErr}</p>
                        }

                    </div>

                    <div className='my-[56px] relative w-[368px]'>
                        <input onChange={handleFullName} value={fullName} className='border-border border-2 rounded-lg py-[26px] pl-[52px] w-[368px]' type="text" name="" id="" placeholder='write your name' />
                        <p className='absolute top-[-8px] left-[34px] pl-[18px] pr-[15px] bg-white font-Nunito font-semibold text-[#11175D] text-[13px] tracking-[1px]'><span className='opacity-70 '>Full name</span></p>
                        {
                            fullNameErr && <p className='text-white font-bold bg-red-500 font-Nunito text-sm rounded p-2 text-center mt-[2px]'>{fullNameErr}</p>
                        }
                    </div>

                    <div className='mt-[38px] relative w-[368px]'>
                        <input value={password} onChange={handlePassword} className=' w-[368px] border-2 rounded-lg px-[57px] py-[26px] border-[#B8BACF] ' type={showPassword ? "text" : "password"} placeholder='input password' />

                        <p className='absolute top-[-21px] left-[39px] font-Nunito text-sm text-[#8B8EB0]  px-[33px] py-[13px] bg-white tracking-[1px]'>Password</p>
                        {
                            passwordErr &&
                            <p className='bg-red-500 rounded-lg text-white p-2 font-semibold text-base mt-[6px]'>{passwordErr}</p>
                        }
                        {
                            showPassword ?
                                <IoEye onClick={() => setShowPassword(!showPassword)} className='absolute top-[32px] right-[22px] text-2xl' />
                                :
                                <IoMdEyeOff onClick={() => setShowPassword(!showPassword)} className='absolute top-[32px] right-[22px] text-2xl' />
                        }
                    </div>

                    <div className='w-[368px]'>
                        <button onClick={handleClick} className='relative font-Nunito text-xl font-semibold text-white bg-praimary rounded-full mt-[38px] py-[20px] w-full'>Sign up</button>
                        {
                            loader &&
                            <CirclesWithBar
                            height="100"
                            width="100"
                            color="#4fa94d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            outerCircleColor=""
                            innerCircleColor=""
                            barColor=""
                            ariaLabel='circles-with-bar-loading'
                        />
                        }                    
                      
                        <h2 className='mt-[25px] text-center font-sans text-[#03014C] font-normal text-sm'>Already  have an account ? <span className='text-[#EA6C00] font-bold '><Link to='/login'>Sign In</Link></span></h2>
                    </div>

                </div>
            </div>
            <div className='w-1/2'>
                <img className=' h-screen object-cover' src={img} alt="" />
            </div>
        </div>
    )
}

export default Registration