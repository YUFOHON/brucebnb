import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request: Request,
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        bedCount,
        guestCount,
        location,
        price,

    } = body;


    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            bedCount,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id,
            ownerImg: currentUser.image || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.gravatar.com%2Fsite%2Fimplement%2Fimages%2F&psig=AOvVaw0ceqFVhvVq86iVGSXSyfFA&ust=1684634274197000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCKjysv3kgv8CFQAAAAAdAAAAABAE",
        }
    });

    return NextResponse.json(listing);
}