import '../button/button'

import IMask from 'imask'
import { total } from '../order/js/total-utils'

const form = document.querySelector('.form')
const btnAgreeNode = form.querySelector('.form__agree-btn')
const successBlock = document.querySelector('.success')
const successBtnClose = successBlock.querySelector('.success__btn-close')

const name = document.getElementById('name')
const phone = document.getElementById('phone')

btnAgreeNode.addEventListener('click', () => {
  const bodyNode = document.body
  const termsNode = document.querySelector('.terms')

  document.documentElement.classList.add('overflow-fix')
  bodyNode.classList.add('darken')
  termsNode.classList.add('terms--show')
})

const phoneMask = new IMask(phone, { mask: '+{7} (000) 000-00-00' })

successBtnClose.addEventListener('click', () => {
  document.documentElement.classList.remove('overflow-fix')
  successBlock.classList.remove('success--show')
  document.body.classList.remove('darken')
  document.body.classList.remove('fixed')
})

form.onsubmit = e => {
  e.preventDefault()
  let isError = false

  const inputs = form.querySelectorAll('.form__input')

  const addError = el => {
    el.parentElement.classList.add('form__field--error')
    setTimeout(() => {
      el.parentElement.classList.remove('form__field--error')
    }, 900)
    isError = true
  }

  inputs.forEach(el => {
    if (el.value === '') {
      addError(el)
    } else if (el.name === 'phone' && el.value.length < 18) {
      addError(el)
      const spanHelp = el.parentElement.querySelector('.form__field-help')

      spanHelp.classList.add('form__field-help--show')
      el.addEventListener(
        'input',
        () => {
          spanHelp.classList.remove('form__field-help--show')
        },
        { once: true }
      )
    }
  })

  if (isError) {
    return false
  }

  const btn = document.querySelector('.form__button')
  const spinner = document.querySelector('.button__spinner')

  btn.classList.add('form__button--loading')
  spinner.classList.add('button__spinner--active')

  const bowlsStr = total.bowls.reduce((acc, bowl, i) => {
    if (i === 0) {
      return (acc += `
				<br>${i + 1}.
				Чаша: ${bowl.name},
				Наполнитель: ${total.filler.name},
				Цена: ${bowl.price + total.filler.price} руб.
				<br>`)
    }
    if (i === total.bowls.length - 1) {
      return (acc += `${i + 1}. Чаша: ${bowl.name}, Цена: ${bowl.price} руб.`)
    }
    return (acc += `${i + 1}. Чаша: ${bowl.name}, Цена: ${bowl.price} руб.<br>`)
  }, '')

  const data = new FormData()

  data.append('name', name.value)
  data.append('phone', phone.value)
  data.append('bowls', bowlsStr)
  data.append('filler', total.filler.name)
  data.append('sum', total.finalPrice)

  fetch('/order.php', {
    method: 'POST',
    body: data
  })
    .then(res => {
      inputs.forEach(el => {
        el.value = ''
      })
      btn.classList.remove('form__button--loading')
      spinner.classList.remove('button__spinner--active')

      if (res.ok) {
        document.documentElement.classList.add('overflow-fix')
        successBlock.classList.add('success--show')
        document.body.classList.add('darken')
      } else {
        throw new Error('Ошибка отправки данных')
      }
    })
    .catch(e => {
      console.log(e.message)
    })
}
