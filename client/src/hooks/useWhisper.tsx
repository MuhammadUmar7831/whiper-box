import { useState } from "react"


const useWhisper = () => {
    const [message, setMessage] = useState('');
    return {
        message,
        setMessage
    }
}

export default useWhisper