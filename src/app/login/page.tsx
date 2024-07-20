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

return (
    <Box className="flex w-full h-screen justify-center items-center bg-green-50"
    style={{
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <div className="flex h-full items-center justify-center max-w-5xl bg-white shadow-md">
        <div className="w-full md:w-1/2 p-8 space-y-6">
          <div className="flex flex-col items-start">
            <Typography variant="h4" className="text-3xl font-bold">
              Sign in to your account
            </Typography>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              className="rounded-md"
              required
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              className="rounded-md"
              required
            />
            {error && <Typography color="error">{error}</Typography>}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">
                  Forgot your password?
                </a>
              </div>
            </div>
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
            <Typography className="text-blue-950 mt-4">
              Don't have an account?{' '}
              <Link href="/register" className="text-green-400 hover:underline">
                Sign Up
              </Link>
            </Typography>
          </form>
        </div>
        <div className="w-full md:w-1/2 h-full hidden md:block">
          <img className="object-cover w-full h-full" src="/images/img.jpg" alt="monument" />
        </div>
      </div>
    </Box>
  );
}