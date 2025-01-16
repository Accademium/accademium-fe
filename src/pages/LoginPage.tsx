import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch(
                'https://c915-79-132-20-17.ngrok-free.app/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                    credentials: 'include',
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login');
            }

            navigate('/dashboard');
        } catch (error: any) {
            setErrorMessage(error.message || 'An error occurred during login');
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md mx-auto w-full">
            <CardHeader>
                <CardTitle className="text-center text-2xl font-bold">
                    Sign in to your account
                </CardTitle>
            </CardHeader>
            <CardContent>
                {errorMessage && (<div className="mb-4 text-red-600 text-center">{errorMessage}</div>)}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1"
                            placeholder="Enter your password"
                        />
                    </div>

                    <Button type="submit" className="w-full">Sign in</Button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/register" className="text-blue-600 hover:text-blue-500">Don't have an account? Sign up</Link>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default LoginPage;