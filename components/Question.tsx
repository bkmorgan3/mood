'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const[resp, setResp] = useState()

    const handleSubmit =  async (e )=> {
        e.preventDefault()
        setLoading(true)
        const answer = await askQuestion(value)
        setResp(answer)
        setValue('')
        setLoading(false)
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input disabled={loading} value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Ask a question" className="border border-black/20 px-4 py-2 rounded-lg text-lg" />
            <button disabled={loading} type="submit" className="bg-blue-400 px-4 py-2 rounded-lg text-lg">Ask </button>
        </form>
        {loading && <div>...loading</div>}
        {resp && <div>{resp}</div>}
        
    </div>
}

export default Question