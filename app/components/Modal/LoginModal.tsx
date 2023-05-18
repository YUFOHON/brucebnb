'use client';
import axios from 'axios';
import { signIn } from "next-auth/react"
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    set,
    useForm
} from "react-hook-form";
// import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
const LoginModal = () => {
    const router = useRouter();
    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const toggle = useCallback(() => {
        console.log("toggle");
        LoginModal.onClose();
        RegisterModal.onOpen();
    }, [LoginModal, RegisterModal])

    const onSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data

        })
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success("success login");
                    router.refresh();
                    LoginModal.onClose();
                }
                if (callback?.error) {
                    toast.error(callback.error);
                }
            }
            )

    }, []);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome Back"
                subtitle="Login in to continue"
                center
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => { signIn('google') }}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => { signIn('github') }}
            />
            <div
                className="
              text-neutral-500 
              text-center 
              mt-4 
              font-light

            "
            >
                First time here?
                <div className="text-center text-semibold  font-black flex items-center justify-center h-full">

                    <div onClick={toggle} className="modal-exception hover:underline cursor-pointer">Create an account</div>

                </div>
            </div>
        </div>
    )
    return (

        <Modal
            isOpen={LoginModal.isOpened}
            onClose={LoginModal.onClose}
            disabled={isLoading}
            title="Log in"
            actionLabel="Continue"
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}

        />

    );

}

export default LoginModal;