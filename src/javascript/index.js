import { Dialog } from './components/Dialog'
import './components/nav'

const targets = document.querySelectorAll('.lazy')

const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        const src = img.getAttribute('data-src')

        if (src) {
          img.setAttribute('src', src)
        }

        observer.disconnect()
      }
    })
  })

  io.observe(target)
}

targets.forEach(lazyLoad)

const hamburgerMenu = () => {
  const burger = document.querySelector('.js-burger')
  const header = document.querySelector('.c-header ul')

  burger.addEventListener('click', function (e) {
    e.stopImmediatePropagation()
    this.classList.toggle('change')
    header.classList.toggle('open')
  })
}

const dialogOverlay = document.querySelector('.c-dialog__overlay-1')
const navDialogEls = document.querySelectorAll('.c-dialog-1')

Array.prototype.slice.call(navDialogEls).forEach((navDialogEl) => {
  const Dialogs = new Dialog(navDialogEl, dialogOverlay)
  Dialogs.addEventListeners('.js-open-dialog', '.js-close-dialog-1')
})

hamburgerMenu()
