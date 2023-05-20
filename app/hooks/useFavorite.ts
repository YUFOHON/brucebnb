import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string;
    currentUser?: SafeUser | null
    // currentUser?: any;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();

    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoritedIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            return loginModal.onOpen();
        }

        try {

            if (hasFavorited) {

                await axios.delete(`/api/favorites/${listingId}`);
                toast.success('removed from favorites');
            } else {

                await axios.post(`/api/favorites/${listingId}`);
                toast.success('added to favorites');
            }

            // await request();
            router.refresh();

        } catch (error) {
            toast.error('Operation fail.');
        }
    },
        [
            currentUser,
            hasFavorited,
            listingId,
            loginModal,
            router
        ]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;