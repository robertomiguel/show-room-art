import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)

    const handleMediaQueryChange = (event) => setMatches(event.matches)

    handleMediaQueryChange(mediaQueryList); // Para establecer el estado inicial

    mediaQueryList.addEventListener('change', handleMediaQueryChange)

    return () => mediaQueryList.removeEventListener('change', handleMediaQueryChange)

  }, [query])

  return matches
}