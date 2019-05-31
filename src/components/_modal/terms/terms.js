import '../modal/modal'

const modal = document.querySelector('.terms__modal')
const btnClose = modal.querySelector('.modal__button')

btnClose.addEventListener('click', () => {
  modal.classList.remove('modal--show')
  document.documentElement.classList.remove('overflow-fix')
  document.body.classList.remove('darken')
})
