'use client';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";

interface ListingClientProps {
    reservations?: SafeReservation[] | any;
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

const ListingClient: React.FC<ListingClientProps> = (
    {
        listing,
        currentUser,
        reservations = [],
    }
) => {
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const router = useRouter();

    const onCreatedReservation = useCallback(
        () => {
            if (!currentUser) return loginModal.onOpen();
            setIsLoading(true);
            axios.post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing?.id
            })
                .then((response) => {
                    toast.success("Reservation created successfully");
                    setDateRange(initialDateRange);

                    router.refresh();
                })
                .catch((error) => {
                    toast.error("Something went wrong");
                })
                .finally(() => {
                    setIsLoading(false);
                })
        }
        , [totalPrice, dateRange, listing?.id, currentUser, loginModal, router])

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: { startDate: string | number | Date; endDate: string | number | Date; }) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })
            dates = [...dates, ...range];
        })
        return dates;
    }, [reservations])



    const category = useMemo(() => {
        return categories.find((items) =>
            items.label === listing.category);
    }, [listing.category]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    return (

        <div>
            <Container>
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    id={listing.id}
                    currentUser={currentUser}
                    locationValue={listing.locationValue}
                />
                <div className="p-4">
                    <ListingInfo
                        user={listing.user}
                        description={listing.description}
                        guestCount={listing.guestCount}
                        roomCount={listing.roomCount}
                        bathroomCount={listing.bathroomCount}
                        category={category}
                        locationValue={listing.locationValue}

                    />
                </div>
                <div className="p-4">
                    <ListingReservation
                        price={listing.price}
                        totalPrice={totalPrice}
                        onChangeDate={(value) => setDateRange(value)}
                        dateRange={dateRange}
                        onSubmit={onCreatedReservation}
                        disabled={isLoading || currentUser?.id === listing.user.id}
                        disabledDates={disabledDates}
                    />

                </div>
            </Container>
        </div>
    );
}

export default ListingClient;