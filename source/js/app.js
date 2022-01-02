function toggleHidden(className, parent = document) {
  const menu = parent
    .getElementsByClassName(className)[0]
  menu.classList.toggle("hidden")
}

function toggleMenu(show) {
  toggleHidden("menu-content-popup")
  toggleHidden("page-header__menu-button--open")
  toggleHidden("page-header__menu-button--close")

  const lightSuffix = "--light"
  const darkSuffix = "--dark"
  const isDarkShown = document.getElementsByClassName(`page-header${darkSuffix}`).length > 0;
  if (isDarkShown) {
    if (show) {
      toggleHeader(darkSuffix, lightSuffix)
    } else {
      toggleHeader(lightSuffix, darkSuffix)
    }
  }
}

function toggleFilter() {
  const filterClassName = "filter";
  const filter = document
    .getElementsByClassName(filterClassName)[0]
  filter.classList.toggle(`${filterClassName}--opened`)

  const buttonClassName = `${filterClassName}__button`
  const button = document.getElementsByClassName(buttonClassName)[0]
  button.classList.toggle(`${buttonClassName}--state-open`)
  button.classList.toggle(`${buttonClassName}--state-close`)

  const spanClassName = `filter__button-name`
  const spans = button.getElementsByClassName(spanClassName)
  for (let i = 0; i < spans.length; i++) {
    spans[i].classList.toggle(`${spanClassName}--state-in-flow`)
    spans[i].classList.toggle(`${spanClassName}--state-in-popup`)
  }

  const popupClassName = `filter__popup`
  const popup = filter.getElementsByClassName(popupClassName)[0]
  popup.classList.toggle(`${popupClassName}--state-in-flow`)
  popup.classList.toggle(`${popupClassName}--state-in-popup`)
}

function toggleGroup(searchedName, toggledName = "chooser-form-group__list") {
  const mediaTablet = window.matchMedia(`(min-width : ${tabletWidth}px)`)
  const mediaDesktop = window.matchMedia(`(min-width : ${desktopWidth}px)`)
  if(mediaDesktop.matches || !mediaTablet.matches) {
    const group = document.getElementsByClassName(searchedName)[0]
    const button = group.getElementsByClassName("chooser-form-group__button")[0]
    button.classList.toggle("chooser-form-group__button--state-closed")
    button.classList.toggle("chooser-form-group__button--state-opened")
    const content = group.getElementsByClassName(toggledName)[0]
    content.classList.toggle("chooser-form-group__list-hidden")
  }
}

const tabletWidth = 768;
const desktopWidth = 1440;

const headerHeightMobile = 73;
const headerHeightTablet = 132;
const headerHeightDesktop = 90;

function addIfAbsent(component, className) {
  if (!component.classList.contains(className)) {
    component.classList.add(className)
  }
}

function toggleClassNames(component, removedClassName, addedClassName) {
  component.classList.remove(removedClassName)
  addIfAbsent(component, addedClassName)
}

function toggleHeader(firstSuffix, secondSuffix, removeSticky = undefined) {
  const baseHeader = "page-header"
  const logoPath = "logo__path"
  const logoBurger = "logo__burger"
  const stickyHeader = "page-header--sticky"
  const menuContentList = "page-header__menu-content-list"
  const menu = "menu"

  const pageHeader = document
    .getElementsByClassName(baseHeader)[0]
  const paths = pageHeader.getElementsByClassName(logoPath)
  const rects = pageHeader.getElementsByClassName(logoBurger)
  const menuList = pageHeader.getElementsByClassName(menuContentList)[0]

  toggleClassNames(
    pageHeader,
    `${baseHeader}${firstSuffix}`,
    `${baseHeader}${secondSuffix}`
  )

  toggleClassNames(menuList,
    `${menu}${secondSuffix}`,
    `${menu}${firstSuffix}`)

  if (removeSticky !== undefined) {
    removeSticky
      ? pageHeader.classList.remove(stickyHeader)
      : addIfAbsent(pageHeader, stickyHeader)
  }

  for (let i = 0; i < paths.length; i++) {
    toggleClassNames(
      paths[i],
      `${logoPath}${secondSuffix}`,
      `${logoPath}${firstSuffix}`
    )
  }
  for (let i = 0; i < rects.length; i++) {
    toggleClassNames(
      rects[i],
      `${logoBurger}${secondSuffix}`,
      `${logoBurger}${firstSuffix}`
    )
  }
}

function toggleCountryChooser(id) {
  const chooser = document.getElementById(id)

  const selectWrapper = chooser.getElementsByClassName("steps-select__select-wrapper")[0]
  selectWrapper.classList.toggle("steps-select__select-wrapper--adder")
  selectWrapper.classList.toggle("steps-select__select-wrapper--chooser")

  const select = chooser.getElementsByClassName("steps-select__select")[0]
  select.classList.toggle("steps-select__select--adder")
  select.classList.toggle("steps-select__select--chooser")

  select.ariaExpanded = !!select.ariaExpanded

  const texts = select.getElementsByClassName("steps-select__select-text")
  for (let i = 0; i < texts.length; i++) {
    texts[i].classList.toggle("hidden")
  }

  const flagMarker = chooser.getElementsByClassName("steps-select__no-flag")[0]
  flagMarker.classList.toggle("steps-select__no-flag--adder")

  const popup = chooser.getElementsByClassName("steps-select__popup")[0]
  popup.classList.toggle("hidden")
}

window.onscroll = () => {
  const mediaTablet = window.matchMedia(`(min-width : ${tabletWidth}px)`)
  const mediaDesktop = window.matchMedia(`(min-width : ${desktopWidth}px)`)

  const headerHeight = mediaDesktop.matches
    ? headerHeightDesktop
    : mediaTablet.matches
      ? headerHeightTablet
      : headerHeightMobile

  const lightSuffix = "--light"
  const darkSuffix = "--dark"

  if (window.pageYOffset >= headerHeight) {
    toggleHeader(darkSuffix, lightSuffix, false)
  } else {
    toggleHeader(lightSuffix, darkSuffix, true)
  }
};

window.onload = () => {
  const menuContentPopup = document.getElementsByClassName("menu-content-popup")[0]
  menuContentPopup.classList.remove("menu-content-popup--nojs")
  menuContentPopup.classList.add("hidden")
}
