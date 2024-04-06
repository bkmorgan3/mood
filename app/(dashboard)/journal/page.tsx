import NewEntryCard from "@/components/NewEntryCard";
import EntryCard from "@/components/EntryCard";
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"
import Link from "next/link";
import { analyze } from "@/utils/ai";

const getEntries = async () => {
    const user = await getUserByClerkId();
    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    await analyze(`I am going to give you a journal entry and I want you to analyze it for a few things.  I want the mood, subject of the entry, and a color representing the mood. 
    I would like you to respond back with the formatted JSON like so:  {"mood": "", "subject":"", "color": "", "negative":""}.
    entry: Today is an ok day.  I have one week left at my contract job and I am worried about finding a new job.  The job market is very tough right now and I don't think I am as skilled as other engineers.  I keep applying but am not getting many interviews.  I am worried.`)
    return entries
}

const JournalPage = async () => {
    const entries = await getEntries()
    
    return(
        <div className="p-10 bg-zinc-400/10 h-full">
            <h2 className="text-3xl mb-8">Journal</h2>
            <div className="grid grid-cols-3 gap-4">
                <NewEntryCard />
                {entries.map(entry => 
                    <Link key={entry.id} href={`/journal/${entry.id}`}>
                        <EntryCard  entry={entry} />

                    </Link>
                
                )}
            </div>
        </div>
    )
}

export default JournalPage