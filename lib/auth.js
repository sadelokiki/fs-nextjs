import { cookies } from "next/headers"
import { prisma } from "./prisma"
import { randomUUID } from "crypto"

export async function getOrCreateGuestUser() {
    const cookieStore = cookies()

    let guestId = cookieStore.get("guest_id")?.value 

    if(!guestId) {
        guestId = randomUUID()
        cookieStore.set("guest_id", guestId, {httpOnly: true})
    }

    let user = await prisma.user.findUnique({where:{id: guestId}})
    if(!user) {
        user = await prisma.user.create({ data: {id: guestId, name: "Guest"}})
    }
    return user;
}
