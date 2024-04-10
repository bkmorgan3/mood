import HistoryChart from "@/components/HistoryChart"
import { getUserByClerkId } from "@/utils/auth"
import { prisma } from "@/utils/db"



const getData = async () => {
    const user = await getUserByClerkId()
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        select: {
            sentimentScore: true
        }
    })
    const sum = analyses.reduce((all,current) => all + current.sentimentScore, 0)
    const avg = Math.round(sum / analyses.length)
    return {analyses, avg}
}

const History = async () => {
    const { avg, analyses} = await getData()
    console.log(analyses)
   
    return <div className="w-full h-full">
            <div>{`Avg Sentiment ${avg}`}</div>
            <div className="h-full w-full" >
                <HistoryChart data={analyses} />
            </div>
        </div>
}

export default History