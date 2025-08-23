import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import clsx from 'clsx';
import { RegisterOptions } from 'react-hook-form';

export interface InputProps {
  register: UseFormRegister<FieldValues>;
  name: string;
  label: string;
  options: RegisterOptions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  submissionError?: string;
}

// Form input component for react-hook-forms.
const FormInput = ({
  register,
  name,
  label,
  options,
  validationError,
  submissionError,
}: InputProps): React.JSX.Element => {
  const inputType = ['password', 'confirmPassword'].includes(name) ? 'password' : 'text';

  const errorStyling = submissionError?.includes(name)
    ? 'border-2 border-red bg-[rgb(245, 152, 152)]'
    : '';
  return (
    <>
      <label className="mb-2">{label}:</label>
      <input
        className={clsx('z-10 h-[2rem] rounded-lg border-2 p-2', errorStyling)}
        type={inputType}
        {...register(name, options)}
      />
      <div className="my-1 ml-1 flex min-h-4 items-start text-xs">
        <p className="m-0 text-red-600">{validationError?.message?.toString()}</p>
      </div>
    </>
  );
};

export default FormInput;
