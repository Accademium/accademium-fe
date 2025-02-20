import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

import Logo from "/images/Accademium_Logo.png";
import GoogleLogo from "/images/auth/Google-Symbol-1893977628.png"

interface AuthModalProps {
  onClose: () => void;
  onAuthSuccess: () => void;
  onGoogleSignIn?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  onClose,
  onAuthSuccess,
  onGoogleSignIn,
}) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  const SERVER_API = import.meta.env.VITE_SERVER_ADDRESS_API;
  // Close modal when clicking outside the modal content
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () =>
      document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        // Login endpoint
        response = await fetch(`${SERVER_API}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
        });
      } else {
        console.log
        // Registration endpoint (organisationId is static)
        response = await fetch(`${SERVER_API}/api/v1/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            organisationId: '1234567890abc',
          }),
        });
      }
      if (!response.ok) {
        const errorData = await response.json();
        toast({ description: errorData.message || 'Authentication failed. Please try again.' });
        return;
      }
      // On successful authentication, backend sets the token in cookies.
      onAuthSuccess();
    } catch (error) {
      toast({ description: 'Authentication failed. Please try again.' });
    }
  };

  const handleGoogleSignIn = async () => {
    if (onGoogleSignIn) {
      onGoogleSignIn();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 transition-opacity"
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-lg transform transition-all"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-6" />
        </div>
        {/* Title and instructions */}
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          {isLogin ? 'Welcome Back' : 'Create Your Account'}
        </h2>
        <p className="text-gray-600 text-center mb-6">
          To receive your survey results and continue further, you must be
          registered. Please sign in with your account, create a new account,
          or use your Google account.
        </p>
        {/* Google Sign In */}
        <div className="flex flex-col space-y-4 mb-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
          >
            <img
              src={GoogleLogo}
              alt="Google Logo"
              className="h-5 w-9 mr-2"
            />
            Sign in with Google
          </button>
        </div>
        {/* Toggle for Email/Password authentication */}
        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-l-lg border border-gray-300 text-center transition-colors ${
              isLogin
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-r-lg border border-gray-300 text-center transition-colors ${
              !isLogin
                ? 'bg-black text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Register
          </button>
        </div>
        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black hover:bg-gray-600 text-white rounded-md transition-colors"
          >
            {isLogin ? 'Sign In' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};
