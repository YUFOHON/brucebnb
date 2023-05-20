'use client';
import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface ListingClientProps {
    reservations?: Reservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = (

    { listing, currentUser, reservations }
) => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const category = useMemo(() => {
        return categories.find((items) =>
            items.label === listing.category);
    }, [listing.category]);



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

            </Container>
        </div>
    );
}

export default ListingClient;