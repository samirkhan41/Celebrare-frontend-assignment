
import {useState,useReducer,useEffect,useCallback,useMemo} from 'react'

import useFetchPhotos from '../hooks/useFetchPhotos'

import {favoritesReducer,getInitialFavorites} from '../reducers/favoritesReducer'

function Gallery() {
    const { photos, loading, error } = useFetchPhotos()

    const [searchTerm, setSearchTerm] = useState('')

    const [favorites, dispatch] = useReducer(
        favoritesReducer,
        [],
        getInitialFavorites
    )

    // Save favourites in localStorage
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites))
        } catch {
            console.log('Unable to save favourites')
        }
    }, [favorites])

    // Search photos by help of  author name 
    const handleSearch = useCallback((event) => {
        setSearchTerm(event.target.value)
    }, [])

    //  it Filters photos
    const filteredPhotos = useMemo(() => {
        const search = searchTerm.trim().toLowerCase()

        return photos.filter((photo) =>
            photo.author.toLowerCase().includes(search)
        )
    }, [photos, searchTerm])

    // Add or remove a favourite
    function toggleFavorite(photoId) {
        dispatch({
            type: 'TOGGLE_FAVORITE',
            payload: photoId
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
            <header className="mx-auto mb-6 max-w-7xl">
                <h1 className="mb-2 text-center text-3xl font-bold">
                    Celebrare Photo Gallery
                </h1>

                <p className="mb-5 text-center text-gray-600">
                    Browse photos and save your favourites
                </p>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by author name..."
                    aria-label="Search photos by author"
                    className="w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="mt-3 text-sm text-gray-600">
                    Favourites: {favorites.length}
                </p>
            </header>

            <main className="mx-auto max-w-7xl">
                {loading && (
                    <div className="py-10 text-center">
                        <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
                        <p>Loading photos...</p>
                    </div>
                )}

                {!loading && error && (
                    <p className="py-10 text-center text-red-600">
                        {error}
                    </p>
                )}

                {!loading && !error && filteredPhotos.length === 0 && (
                    <p className="py-10 text-center text-gray-600">
                        No photos found.
                    </p>
                )}

                {!loading && !error && filteredPhotos.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {filteredPhotos.map((photo) => {
                            const isFavorite = favorites.includes(photo.id)

                            return (
                                <article
                                    key={photo.id}
                                    className="overflow-hidden rounded-lg bg-white shadow"
                                >
                                    <div className="relative">
                                        <img
                                            src={photo.download_url}
                                            alt={`Photo by ${photo.author}`}
                                            loading="lazy"
                                            className="h-52 w-full object-cover"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => toggleFavorite(photo.id)}
                                            aria-label={
                                                isFavorite
                                                    ? 'Remove from favourites'
                                                    : 'Add to favourites'
                                            }
                                            aria-pressed={isFavorite}
                                            className={`absolute right-3 top-3 rounded-full bg-white px-3 py-2 text-2xl ${
                                                isFavorite
                                                    ? 'text-red-500'
                                                    : 'text-gray-500'
                                            }`}
                                        >
                                            {isFavorite ? '♥' : '♡'}
                                        </button>
                                    </div>

                                    <div className="p-4">
                                        <h2 className="font-semibold">
                                            {photo.author}
                                        </h2>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}

export default Gallery
