'use client'
import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

const Editor = ({entry}) => {
    const [value, setValue] = useState(entry.content)
    const [isLoading, setIsLoading] = useState(false)
    useAutosave({
        data: value,
        onSave: async (_value) => {
            setIsLoading(true)
            const updated = await updateEntry(entry.id, _value)
            setIsLoading(false)
        }
    })
    return (
        <div className="h-full w-full">
            {isLoading && <div>Loading...</div>}
            <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)} 
            className="h-full w-full"
        />
        </div>
    )
}

export default Editor