import '../modal/modal'

import img from './leonardo.png'

const successBlock = document.querySelector('.success')

window.onload = () => {
  const imgNode = successBlock.querySelector('.success__img')

  imgNode.setAttribute('src', img)
}

const modal = document.querySelector('.success__modal')
const btnClose = modal.querySelector('.modal__button')

btnClose.addEventListener('click', () => {
  modal.classList.remove('modal--show')
  document.documentElement.classList.remove('overflow-fix')
  document.body.classList.remove('darken')
})
