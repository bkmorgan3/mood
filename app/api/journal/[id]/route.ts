import { analyze } from "@/utils/ai"
import { update } from "@/utils/actions"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse, NextRequest } from "next/server"

export const PATCH = async (request: NextRequest, {params}) => {
    const {content} = await request.json()
    const user = await getUserByClerkId()
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            }
        },
        data: {
            content
        }
    })
    const analysis = await analyze(updatedEntry.content)
    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id
        },
        create: {
            userId: user.id,
            entryId: updatedEntry.id,
            ...analysis
        },
        update: {
            ...analysis
        },
    })

    update(['/journal'])
    return NextResponse.json({data: {...updatedEntry, analysis: updated }})
}