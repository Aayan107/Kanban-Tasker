import { useMediaQuery } from '@vueuse/core'

export function useDevice() {
  
  const isMobile = useMediaQuery('(max-width: 767px)')

  return {
    isMobile,
  }
}
