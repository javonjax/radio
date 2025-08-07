'use client';
import FormInput from '@/components/Accounts/FormInput';
import { emailValidation, loginPasswordValidation } from '@/lib/schemas';
import Link from 'next/link';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const LoginPage = () => {
  const [loginError, setLoginError] = useState<string>('');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = async (e) => {
    const res: globalThis.Response = await fetch('/api/accounts/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(e),
    });

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      setLoginError(data.error);
    }
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="my-4 flex w-[400px] flex-col rounded-md border-2 p-4">
        <h1 className="text-accent mb-4 text-xl">Login</h1>
        {loginError && <p className="m-0 mb-4 text-red-600">{loginError}</p>}
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
