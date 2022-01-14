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
  if (show) {
    toggleHeader(darkSuffix, lightSuffix)
  } else {
    const isNotSticky = document
      .getElementsByClassName(`page-header--sticky`)
      .length === 0;
    if (isNotSticky) {
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
  if (mediaDesktop.matches || !mediaTablet.matches) {
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

function toggleHeader(removedSuffix, addedSuffix, removeSticky = undefined) {
  const pageHeaderClass = "page-header"
  const formWrapperClass = `${pageHeaderClass}__form-wrapper`
  const stickyClass = `${pageHeaderClass}--sticky`
  const menuContentListClass = `${pageHeaderClass}__menu-content-list`
  const menuButtonClass = `${pageHeaderClass}__menu-button`
  const logoClass = `${pageHeaderClass}__logo`
  const menuClass = "menu"

  const pageHeader = document
    .getElementsByClassName(pageHeaderClass)[0]
  const formWrapper = pageHeader.getElementsByClassName(formWrapperClass)[0]
  const buttons = pageHeader.getElementsByClassName(menuButtonClass)
  const menuContentList = pageHeader.getElementsByClassName(menuContentListClass)[0]
  const logo = pageHeader.getElementsByClassName(logoClass)[0]

  toggleClassNames(
    formWrapper,
    `${formWrapperClass}${removedSuffix}`,
    `${formWrapperClass}${addedSuffix}`
  )

  toggleClassNames(menuContentList,
    `${menuClass}${removedSuffix}`,
    `${menuClass}${addedSuffix}`)

  toggleClassNames(logo,
    `${logoClass}${removedSuffix}`,
    `${logoClass}${addedSuffix}`)

  if (removeSticky !== undefined) {
    removeSticky
      ? pageHeader.classList.remove(stickyClass)
      : addIfAbsent(pageHeader, stickyClass)
  }

  for (let i = 0; i < buttons.length; i++) {
    toggleClassNames(
      buttons[i],
      `${menuButtonClass}${removedSuffix}`,
      `${menuButtonClass}${addedSuffix}`
    )
  }
}

function toggleCountryChooser(id) {
  const chooser = document.getElementById(id)

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

const onScroll = () => {
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

window.onscroll = () => onScroll()

window.onload = () => {
  const menuContentPopup = document.getElementsByClassName("menu-content-popup")[0]
  menuContentPopup?.classList?.remove("menu-content-popup--nojs")
  menuContentPopup?.classList?.add("hidden")

  const mapIframe = document.getElementsByClassName("address__map--iframe")[0]
  mapIframe?.classList?.remove("hidden")

  const mapPicture = document.getElementsByClassName("address__map--no-js")[0]
  mapPicture?.classList?.remove("address__map--no-js")
  mapPicture?.classList?.add("hidden")
}
