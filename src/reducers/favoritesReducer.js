
export function getInitialFavorites() {
  try {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  } catch {
    return []
  }
}

export function favoritesReducer(state, action) {
  const photoId = action.payload

  if (action.type === 'TOGGLE_FAVORITE') {
    if (state.includes(photoId)) {
      return state.filter((id) => id !== photoId)
    }

    return [...state, photoId]
  }

  return state
}
