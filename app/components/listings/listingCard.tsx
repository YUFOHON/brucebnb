'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useMemo } from "react";
// import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import {
    SafeListing,
    SafeReservation,
    SafeUser,
    // SafeUser
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { get } from "http";

interface ListingCardProps {
    data: SafeListing;
    // data: any;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
    // currentUser?: any

};

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,
}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();

            if (disabled) {
                return;
            }

            onAction?.(actionId)
        }, [disabled, onAction, actionId]);

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        // return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);

    // get the owner's data of the listing


    const isOwner = useMemo(() => {
        if (currentUser?.id === data.userId) {
            return true;
        }
    }, [currentUser?.id, data.userId]);


    return (
        <div
            onClick={() => {
                router.push(`/listings/${data.id}`)
            }}
            className="col-span-1 cursor-pointer group"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
                >
                    <Image
                        fill
                        className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
                        src={data.imageSrc}
                        alt="Listing"
                    />

                    {data.ownerImg && (


                        <div className="
absolute
bottom-2 left-2 ">
                            <Image
                                width={76}
                                height={76}
                                className="
        
        relative
hover:scale-110 
transition
rounded-md

border-2

"
                                src={data.ownerImg}
                                alt="Owner"
                            /></div>

                    )


                    }


                    <div className="
            absolute
            top-3
            right-3
          ">

                        {!isOwner && (<HeartButton
                            listingId={data.id}
                            currentUser={currentUser}
                        />)}



                    </div>
                </div>
                <div className="font-semibold text-lg text-center">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500 text-center">
                    {reservationDate || data.category}
                </div>
                <div className=" items-center gap-1 ">
                    <div className="font-semibold text-center">
                        $ {price}
                    </div>
                    {!reservation && (
                        <div className="font-light text-center">night</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    );
}

export default ListingCard;