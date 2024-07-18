'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/lib/firebase/firebaseConfig'
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

const register=()=>{

    const [username,setUserName]=useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [createUserWithEmailAndPassword]=useCreateUserWithEmailAndPassword(firebaseAuth)
    const db = getFirestore();

    const handleRegister = async(e)=>{
        e.preventDefault();
        try{
          const credentials= await createUserWithEmailAndPassword(email, password)
           setUserName('')
           setEmail('')
           setPassword('')
           setDoc(doc(db,"users",credentials.user.uid),{
            email: email,
            username: username
        })
        .then(res=>{
            alert("Registration done")
            setError("")
        }
        )
        .catch(err=>{
            setError("Internal Error");
        })
        }
        catch(error){
            setError("email already in use!")
            console.error(error)
    }
}
    return(
        <Box className='flex w-full h-screen justify-center items-center bg-slate-900'>
            <form onSubmit={handleRegister} className='flex flex-col gap-4 items-start p-8 bg-slate-800 shadow-md w-96 rounded-lg '>
                <Typography variant="h5" className=' text-white'>
                    Sign Up
                </Typography>
                <TextField
                    id="outlined-basic" 
                    label="username" 
                    variant="filled"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    fullWidth
                    className='rounded-md bg-slate-400'
                    required
                />
                <TextField
                    id="outlined-basic" 
                    label="email" 
                    variant="filled"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    className='rounded-md bg-slate-400'
                    required
                />
                <TextField
                   id="outlined-basic" 
                   label="password" 
                   variant="filled"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className='rounded-md bg-slate-400'
                    required
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button 
                    variant="contained"
                    type="submit"
                    fullWidth
                    className='bg-blue-600 hover:bg-blue-700'
                >
                    Sign In
                </Button>
                <Typography className='text-white mt-4'>
                    You have an account?{' '}
                    <Link 
                        href="/register"
                        className='text-blue-400 hover:underline'
                    >
                        Sign In
                    </Link>
                </Typography>
            </form>
        </Box>
    )
}

export default register






