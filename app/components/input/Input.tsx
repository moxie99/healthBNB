"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  formatPrice?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  formatPrice,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-slate-700 absolute top-5 left-2" />
      )}

      <input
        id={id}
        disabled={disabled}
        type={type}
        {...register(id, { required })}
        placeholder=" "
        className={`peer w-full p-4 pt-5 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed 
        ${formatPrice ? "pl-10" : "pl-4"} 
        ${errors[id] ? "border-red-500" : "border-slate-500"}
        ${errors[id] ? "focus:border-red-500" : "focus:border-slate-700"}
        `}
      />
      <label
        className={`absolute text-md duration-200 transform -translate-y-4 top-7 z-10 origin-[0] ${
          formatPrice ? "left-9" : "left-4"
        } 
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-1
        peer-focus:scale-75
        peer-focus:-translate-y-6
        ${errors[id] ? "text-red-700" : "text-slate-400"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
