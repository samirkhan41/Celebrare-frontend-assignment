import { useState, useEffect } from 'react'
import axios from 'axios'

function useFetchPhotos() {
    const [photos, setPhotos] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function fetchPhotos() {
            try {
                const response = await axios.get(
                    'https://picsum.photos/v2/list?limit=30',
                    {
                        signal: controller.signal
                    }
                )

                setPhotos(response.data)

                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            } catch (error) {
                if (!controller.signal.aborted) {
                    setError('Unable to load photos')
                    setLoading(false)
                }
            }
        }

        fetchPhotos()

        return () => controller.abort()
    }, [])

    return { photos, loading, error }
}

export default useFetchPhotos