import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loader, setLoader] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'get', body = null, headers = { 'Content-type': 'application/json' }) => {
        setLoader(true)

        try {
            const response = await fetch(url, { method, body, headers })

            if (!response.ok) {
                throw new Error(`error ${url},status: ${response.status}`);
            }

            const data = await response.json()

            setLoader(false)
            return data



        } catch (e) {
            setLoader(false)
            setError(e.message)
            throw e

        }
    }, [])

    const clearError = useCallback(() => setError(null), [])
    
    return { loader, error, request, clearError }

}