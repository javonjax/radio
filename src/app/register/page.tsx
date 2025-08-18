'use client';
import FormInput from '@/components/Accounts/FormInput';
import { AuthContextType, AuthContext } from '@/components/ContextProviders/AuthContext';
import {
  confirmPasswordValidation,
  emailValidation,
  registrationPasswordValidation,
} from '@/lib/schemas';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const RegistrationPage = (): React.JSX.Element => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);

  /*
      Clears the registration error after navigating away from the registration page.
      This makes it so the stale error is not still displayed on the registration form later.
    */
  useEffect(() => {
    return () => {
      authContext?.clearRegistrationError();
    };
  }, []);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onChange' });

  // Watch the 'password' field to compare with the 'confirm password' field.
  const passwordInput = watch('password');

  const onSubmit: SubmitHandler<FieldValues> = async (e: FieldValues) => {
    await authContext?.register(e);
  };

  return (
    <div className="flex h-full w-full grow items-center justify-center">
      <div className="my-4 flex w-[400px] flex-col rounded-md border-2 p-4">
        <h1 className="text-accent mb-4 text-xl">Register</h1>
        {authContext?.registrationError && (
          <p className="m-0 mb-4 text-red-600">{authContext?.registrationError}</p>
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
            options={registrationPasswordValidation}
            validationError={errors.password}
          />
          <FormInput
            register={register}
            name="confirmPassword"
            label="Confirm Password"
            options={confirmPasswordValidation(passwordInput)}
            validationError={errors.confirmPassword}
          />
          <button
            className="border-accent mx-auto mt-1 mb-4 flex w-fit cursor-pointer items-center rounded-2xl border-2 p-4 disabled:cursor-default"
            type="submit"
            disabled={!isValid}
          >
            Create account
          </button>
        </form>
        <div className="flex flex-col text-[hsl(var(--text-color))]">
          <p>
            Already have an account?{' '}
            <Link href="/login" className="text-accent">
              Login here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
