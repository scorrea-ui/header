export class Dialog {
  constructor (dialogEl, overlayEl) {
    this.dialogEl = dialogEl
    this.overlayEl = overlayEl

    this.toHide = ['body']

    this.focusedElBeforeOpen = null

    this.focusableElements = null
    this.firstFocusableElement = null
    this.lastFocusableElement = null

    this.handleFocus(this.dialogEl)

    this.close() // Reset
  }

  handleFocus (el) {
    this.focusableElements = Array.prototype.slice.call(
      el.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
      )
    )
    this.firstFocusableElement = this.focusableElements[0]
    this.lastFocusableElement = this.focusableElements[
      this.focusableElements.length - 1
    ]
  }

  open () {
    const Dialog = this

    document.querySelector('body').classList.add('u-noscroll')

    this.dialogEl.removeAttribute('aria-hidden')
    this.overlayEl.removeAttribute('aria-hidden')

    this.focusedElBeforeOpen = document.activeElement

    this.dialogEl.addEventListener('keydown', function (e) {
      Dialog.handleKeyDown(e)
    })

    this.overlayEl.addEventListener('click', function () {
      Dialog.close()
    })

    Dialog.firstFocusableElement.focus()

    this.toHide.forEach((el) =>
      document.querySelector(el).setAttribute('aria-hidden', true)
    )
  }

  close () {
    // unmask the page background by setting its aria-hidden attribute to false
    this.toHide.forEach((el) =>
      document.querySelector(el).setAttribute('aria-hidden', false)
    )

    document.querySelector('body').classList.remove('u-noscroll')

    this.dialogEl.setAttribute('aria-hidden', true)
    this.overlayEl.setAttribute('aria-hidden', true)

    if (this.overlayEl) {
      this.overlayEl.setAttribute('aria-hidden', true)
    }

    if (this.focusedElBeforeOpen) {
      this.focusedElBeforeOpen.focus()
    }
  }

  handleBackwardTab (e) {
    const Dialog = this
    this.handleFocus(this.dialogEl)
    if (document.activeElement === Dialog.firstFocusableElement) {
      e.preventDefault()
      Dialog.lastFocusableElement.focus()
    }
  }

  handleForwardTab (e) {
    const Dialog = this
    this.handleFocus(this.dialogEl)
    if (document.activeElement === Dialog.lastFocusableElement) {
      e.preventDefault()
      Dialog.firstFocusableElement.focus()
    }
  }

  handleKeyDown (e) {
    const Dialog = this
    const tab = 'Tab' || 9
    const esc = 'Escape' || 'Esc' || 27

    this.handleFocus(this.dialogEl)

    switch (e.code || e.keyCode) {
      // User navigating with a keyboard should not be able to TAB out of the dialog content
      case tab:
        if (Dialog.focusableElements.length === 1) {
          e.preventDefault()
          break
        }

        if (e.shiftKey) {
          this.handleBackwardTab(e)
        } else {
          this.handleForwardTab(e)
        }
        break

      // When the dialog is open, pressing the ESC key should close it
      case esc:
        Dialog.close()
        break

      default:
        break
    }
  }

  addEventListeners (openDialog, closeDialog) {
    const Dialog = this

    const openDialogs = Array.prototype.slice.call(
      document.querySelectorAll(openDialog)
    )
    openDialogs.forEach((el) => {
      el.addEventListener('click', () => {
        Dialog.open()
      })
    })

    const closeDialogs = Array.prototype.slice.call(
      document.querySelectorAll(closeDialog)
    )
    closeDialogs.forEach((el) => {
      el.addEventListener('click', () => {
        Dialog.close()
      })
    })
  }
}
