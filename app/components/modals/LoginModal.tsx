"use client";

import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to HealthBNB"
        subtitle="Enter your email and password to access your account"
        center
      />
      <Input
        id="email"
        label="Email"
        errors={errors}
        required
        register={register}
        disabled={isLoading}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        errors={errors}
        required
        register={register}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-4">
      <hr />
      <Button
        icon={FcGoogle}
        outline
        label="Continue with Google"
        onClick={() => console.log("I was clicked")}
      />

      <Button
        icon={AiFillGithub}
        outline
        label="Continue with Github"
        onClick={() => console.log("I was clicked")}
      />
      <div className="flex justify-center flex-row items-center gap-3">
        <div>Do not have an account ?</div>
        <div
          onClick={loginModal.onClose}
          className="text-green-700 cursor-pointer hover:underline"
        >
          Sign Up
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Sign In"
        actionLabel="Log In"
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
