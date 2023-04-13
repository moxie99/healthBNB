"use client";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../input/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered!");
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal])
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to HealthBNB"
        subtitle="Please, Create an Account to continue"
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
        id="name"
        label="Name"
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
        onClick={() => signIn("google")}
      />

      <Button
        icon={AiFillGithub}
        outline
        label="Continue with Github"
        onClick={() => signIn("github")}
      />
      <div className="flex justify-center flex-row items-center gap-3">
        <div>Already have an account ?</div>
        <div
          onClick={toggle}
          className="text-green-700 cursor-pointer hover:underline"
        >
          Log in
        </div>
      </div>
    </div>
  ); 
  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Sign Up"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default RegisterModal;
