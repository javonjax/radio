'use client';
import FormInput from '@/components/Accounts/FormInput';
import { AuthContext, AuthContextType } from '@/components/ContextProviders/AuthContext';
import { emailValidation, loginPasswordValidation } from '@/lib/schemas';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const LoginPage = (): React.JSX.Element => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);

  /*
    Clears the login error after navigating away from the login page.
    This makes it so the stale error is not still displayed on the login form later.
  */
  useEffect(() => {
    return () => {
      authContext?.clearLoginError();
    };
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = async (e: FieldValues) => {
    await authContext?.login(e);
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="my-4 flex w-[400px] flex-col rounded-md border-2 p-4">
        <h1 className="text-accent mb-4 text-xl">Login</h1>
        {authContext?.loginError && (
          <p className="m-0 mb-4 text-red-600">{authContext?.loginError}</p>
        )}
        <form className="flex grow flex-col" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            register={register}
            name="email"
            label="Email Address"
            options={emailValidation}
            validationError={errors.email}
          />
          <FormInput
            register={register}
            name="password"
            label="Password"
            options={loginPasswordValidation}
            validationError={errors.password}
          />
          <button
            className="border-accent mx-auto mt-1 mb-4 flex w-fit cursor-pointer items-center rounded-2xl border-2 p-4 disabled:cursor-default"
            type="submit"
            disabled={!isValid}
          >
            Login
          </button>
        </form>
        <div className="flex flex-col text-[hsl(var(--text-color))]">
          <p>
            Need an account?{' '}
            <Link href="/register" className="text-accent">
              Register here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
