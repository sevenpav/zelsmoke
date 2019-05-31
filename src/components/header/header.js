import '../button/button'

import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

const btn = document.querySelector('.header__button')

btn.onclick = () => {
  window.scroll({
    behavior: 'smooth',
    left: 0,
    top: document.querySelector('.order').offsetTop - 40
  })
}
