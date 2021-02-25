// second level sub menu
const subMenus = document.querySelectorAll('.hs-item-has-children')

// Custom text - This is the text in the blue bg when you hover over the first menu level
const headerCustomText = document.querySelector('.c-header__custom')

export const changeHeaderText = ({ depth }) => {
  subMenus.forEach((subMenu) => {
    const subMenuLink = subMenu.querySelector('a[role="menuitem"]')
    const subMenuText = subMenuLink.querySelector('.side-content')

    if (subMenu.classList.contains(depth)) {
      subMenuLink.parentNode.addEventListener('mouseover', (event) => {
        headerCustomText.textContent = subMenuText.textContent

        console.log(subMenu)

        if (!headerCustomText.classList.contains('active')) {
          headerCustomText.classList.add('active')
        }
      })

      subMenu.parentNode.addEventListener('mouseleave', () => {
        if (subMenu.classList.contains(depth)) headerCustomText.classList.remove('active')
      })
    }
  })
}
