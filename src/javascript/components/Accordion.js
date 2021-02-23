import { select, selectAll } from '../helpers'

class Accordions {
  constructor ({ buttonClass, containerSelector, singleActive, activeIndex }) {
    this.buttonClass = buttonClass || '.js-accordion-btn'
    this.containerSelector = containerSelector || false
    this.accordionButtons = selectAll(
      `${this.containerSelector} ${this.buttonClass}`
    )

    const containerEl = select(containerSelector)
    const { single, active } = containerEl.dataset
    this.singleActive =
      singleActive !== undefined
        ? singleActive
        : single !== undefined
          ? parseInt(single, 0)
          : false
    this.activeIndex =
      activeIndex !== undefined
        ? activeIndex
        : active !== undefined
          ? parseInt(active, 0)
          : false

    this.checkOthers = this.checkOthers.bind(this)

    if (!this.containerSelector) {
      console.log('Tabs Error: missing container class in options')
    } else {
      this.init()
    }
  }

  checkOthers (elem) {
    const { accordionButtons, containerSelector } = this
    for (let i = 0; i < this.accordionButtons.length; i++) {
      if (accordionButtons[i] !== elem) {
        const iconSelector = accordionButtons[i].querySelector('.c-faq__icon img')
        if (accordionButtons[i].getAttribute('aria-expanded') === 'true') {
          accordionButtons[i].setAttribute('aria-expanded', 'false')
          const content = accordionButtons[i].getAttribute('aria-controls')
          select(`${containerSelector} #${content}`).setAttribute(
            'aria-hidden',
            'true'
          )
          iconSelector.src = 'https://www.buk.cl/hubfs/2021/Building%20Happiness%20FAQ/plus.png'
          select(`${containerSelector} #${content}`).style.display = 'none'
        }
      }
    }
  }

  init () {
    const {
      accordionButtons,
      checkOthers,
      singleActive,
      activeIndex,
      containerSelector
    } = this

    accordionButtons.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopImmediatePropagation()
        const control = e.currentTarget
        const accordionContent = control.getAttribute('aria-controls')
        const selector = `${containerSelector} #${accordionContent}`
        const iconSelector = control.querySelector('.c-faq__icon img')
        if (singleActive) {
          checkOthers(control)
        }

        const isAriaExp = control.getAttribute('aria-expanded')
        const newAriaExp = isAriaExp === 'false' ? 'true' : 'false'
        control.setAttribute('aria-expanded', newAriaExp)

        const isAriaHid = select(selector).getAttribute('aria-hidden')
        if (isAriaHid === 'true') {
          select(selector).setAttribute('aria-hidden', 'false')
          select(selector).style.display = 'block'
          iconSelector.src = 'https://www.buk.cl/hubfs/2021/Building%20Happiness%20FAQ/minus.png'
        } else {
          select(selector).setAttribute('aria-hidden', 'true')
          iconSelector.src = 'https://www.buk.cl/hubfs/2021/Building%20Happiness%20FAQ/plus.png'
          select(selector).style.display = 'none'
        }
      })
    })

    if (activeIndex !== false && typeof activeIndex !== 'undefined') {
      const initialExpanded = accordionButtons[activeIndex]

      if (initialExpanded) {
        initialExpanded.click()
      } else {
        console.log('Error: invalid active index')
      }
    }
  }
}

export default Accordions
