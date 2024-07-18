'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import {firebaseAuth} from '@/lib/firebase/firebaseConfig'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useLoading } from "@/components/loading/loadingProvider"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [signInWithEmailAndPassword]=useSignInWithEmailAndPassword(firebaseAuth)
    const { setIsLoading } = useLoading();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredentials=await signInWithEmailAndPassword(email, password);
            if (userCredentials) {
                setError('')
                setEmail('')
                setPassword('')
                setIsLoading(true);
                router.push('/dashboard')
            }
            else setError('Email or password is incorrect');
            //router.push('/dashboard'); // Redirect to dashboard after successful login
        } catch (error) {
            setError(error.message);
        }
    };

    return(
        <Box className='flex w-full h-screen justify-center items-start pt-[15vh]' 
        style={{backgroundImage: `url("/images/sahara.jpg")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            height: '100vh'
        }}
        >
            <form onSubmit={handleLogin} className='flex flex-col gap-4 items-start p-8 inset-0 bg-white bg-opacity-90 shadow-md w-96 rounded-lg '>
                <Typography variant="h5" className=' text-blue-950'>
                    Sign In
                </Typography>
                <TextField
                    id="outlined-basic" 
                    label="email" 
                    variant="standard"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    className='rounded-md'
                    required
                />
                <TextField
                   id="outlined-basic" 
                   label="password" 
                   variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    className='rounded-md'
                    required
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button 
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                        backgroundColor: 'green',
                        '&:hover': {
                          backgroundColor: 'darkgreen',
                        },
                      }}
                >
                    Sign In
                </Button>
                <Typography className=' text-blue-950 mt-4'>
                    Don't have an account?{' '}
                    <Link 
                        href="/register"
                        className='text-blue-400 hover:underline'
                    >
                        Sign Up
                    </Link>
                </Typography>
            </form>
        </Box>
    )
}