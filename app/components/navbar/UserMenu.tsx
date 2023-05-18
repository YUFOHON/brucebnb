'use client'
import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useLoginModal from "@/app/hooks/useLoginModal";
// import { User } from "@prisma/client";
import { signOut } from 'next-auth/react'
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
interface UserMenuProps {
    currentUser?: SafeUser | null
}

const UserMenu: React.FC<UserMenuProps> = (
    { currentUser }

) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const onRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
            return;
        }
        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal])

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="modal-exception hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Brucebnb your home
                </div>

                <div
                    onClick={toggleOpen}
                    className="
                    p-4 
                    md:py-1 
                    md:px-2 
                    border-[1px] 
                    border-neutral-200 
                    flex flex-row 
                    items-center 
                    gap-3 
                    rounded-full 
                    cursor-pointer 
                    hover:shadow-md 
                    transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block modal-exception">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">

                        {/* <>
                            <MenuItem onClick={loginModal.onOpen} label="Login" className="modal-exception" />
                            <MenuItem
                                label="Sign up"
                                onClick={registerModal.onOpen}
                                className="modal-exception"
                            />
                        </> */}

                        {currentUser ? (
                            <>
                                <MenuItem onClick={loginModal.onOpen}
                                    label="My trips"
                                    className="modal-exception"
                                />
                                <hr />
                                <MenuItem
                                    label="My favorites"
                                    onClick={registerModal.onOpen}
                                    className="modal-exception"
                                />
                                <hr />
                                <MenuItem
                                    label="My reservations"
                                    onClick={registerModal.onOpen}
                                    className="modal-exception"
                                />
                                <hr />
                                <MenuItem
                                    label="My properties"
                                    onClick={registerModal.onOpen}
                                    className="modal-exception"
                                />
                                <hr />
                                <hr />
                                <MenuItem
                                    label="Brucebnb your home"
                                    onClick={rentModal.onOpen}
                                    className="modal-exception"
                                />
                                <hr />
                                <MenuItem
                                    label="signOut"
                                    onClick={() => signOut()}
                                    className="modal-exception"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label="Login" className="modal-exception" />
                                <MenuItem
                                    label="Sign up"
                                    onClick={registerModal.onOpen}
                                    className="modal-exception"
                                />
                            </>
                        )}


                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;