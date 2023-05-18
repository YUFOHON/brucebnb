'use client'
import { useState, useEffect, useCallback } from "react";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { toast } from "react-hot-toast";
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);
    const containerRef = useRef(null);


    useEffect(() => {
        if (isOpen)
            setShowModal(true);

        // In Modal.tsx
        const handleClickOutsideModal = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !(containerRef.current as HTMLElement)?.contains(e.target as Node) &&
                !(e.target as HTMLElement).classList.contains('modal-exception')
            ) {
                console.log('click outside modal');
                handleClose();
            }
        };

        window.addEventListener('click', handleClickOutsideModal);

        return () => {
            window.removeEventListener('click', handleClickOutsideModal);
        };
    }, [isOpen]);



    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            toast.error("please wait for a while");
            return;
        }
        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);
    if (!isOpen) {
        return null;
    }

    return (<div
        className="
    justify-center 
    items-center 
    flex 
    overflow-x-hidden 
    overflow-y-auto 
    fixed 
    inset-0 
    z-50 
    outline-none 
    focus:outline-none
    bg-neutral-800/70">
        <div
            ref={containerRef}
            className="
    relative
    w-full
    md:w-4/6
    lg:w=3/6
    xl:w-2/5
    my-6
    mx-auto
    h-full
    lg:h-auto
    md:h-auto
">
            {/* content */}
            <div className={`
    h-full 
    ${showModal ? 'opacity-100 duration-300' : 'opacity-0 duration-0'}
    transition-opacity
    `}>
                <div className="
              translate
              h-full
              lg:h-auto
              md:h-auto
              border-0
              rounded-lg 
              shadow-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
                >
                    {/* header */}
                    <div className="
                flex 
                items-center 
                p-6
                rounded-t
                justify-center
                relative
                border-b-[1px]
                "
                    >
                        <button
                            className="
                    p-1
                    border-0 
                    hover:opacity-70
                    transition
                    absolute
                    left-9
                  "
                            onClick={handleClose}
                        >
                            <IoMdClose size={18} />
                        </button>
                        <div className="text-lg font-semibold">
                            {title}
                        </div>
                    </div>
                    {/* body */}
                    <div className="relative p-6 flex-auto">
                        {body}
                    </div>
                    {/* footer */}
                    <div className="
                    modal-exception
                    flex
                    flex-row
                    items-center
                    gap-4
                    w-full
                    p-4">
                        {secondaryAction &&
                            secondaryActionLabel &&
                            (<Button
                                outline
                                disabled={disabled}
                                label={secondaryActionLabel}
                                onClick={handleSecondaryAction}
                            />)}
                        <Button
                            disabled={disabled}
                            label={actionLabel}
                            onClick={handleSubmit}
                        />

                    </div>
                    <div className="p-1">{footer}</div>
                </div>
            </div>
        </div>
    </div>);
}

export default Modal;