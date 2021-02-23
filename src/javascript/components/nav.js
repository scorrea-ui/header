import $ from 'jquery'

// second level sub menu
const subMenus = document.querySelectorAll('.hs-item-has-children')

// Custom text - This is the text in the blue bg when you hover over the first menu level
const headerCustomText = document.querySelector('.c-header__custom')

const changeHeaderText = ({ depth }) => {
  subMenus.forEach((subMenu, index) => {
    const subMenuLink = subMenu.querySelector('a[role="menuitem"]')
    const subMenuText = subMenuLink.querySelector('.side-content')
    const subMenuWrapper = subMenu.querySelector('.hs-menu-children-wrapper')

    if (subMenu.classList.contains(depth)) {
      subMenuLink.parentNode.addEventListener('mouseover', (event) => {
        headerCustomText.textContent = subMenuText.textContent

        if (!headerCustomText.classList.contains('active')) {
          headerCustomText.classList.add('active')
        }

        if (subMenuWrapper) {
          subMenuWrapper.classList.add('active')
        }
      })

      subMenuLink.parentNode.addEventListener('mouseleave', () => {
        if (subMenu.classList.contains(depth)) headerCustomText.classList.remove('active')
        if (subMenuWrapper) {
          subMenuWrapper.classList.remove('active')
        }
      })
    }
  })
}

changeHeaderText({ depth: 'hs-menu-depth-2' })
changeHeaderText({ depth: 'hs-menu-depth-3' })
