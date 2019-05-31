const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints

export const fullpage = () => {
  const fullpage = document.querySelector('.fullpage')

  fullpage.style.height = `${window.innerHeight}px`

  window.addEventListener('resize', () => {
    if (!isTouchDevice) {
      fullpage.style.height = `${window.innerHeight}px`
    }
  })
}
