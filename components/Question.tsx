'use client'

import { useState } from "react"

const Question = () => {
    const [value, setValue] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Ask a question" className="border border-black/20 px-4 py-2 rounded-lg text-lg" />
            <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg text-lg">Ask </button>
        </form>
    </div>
}

export default Question