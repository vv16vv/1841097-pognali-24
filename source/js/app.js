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
  toggleHidden("filter-popup")
  const filter = document
    .getElementsByClassName("filter")[0]
  filter.classList.toggle("filter--opened")
  toggleHidden("filter__button--state-open")
  toggleHidden("filter__button--state-close")
}

function toggleGroup(searchedName, toggledName = "chooser-form-group__list") {
  const group = document.getElementsByClassName(searchedName)[0]
  toggleHidden("chooser-form-group__button--state-closed", group)
  toggleHidden("chooser-form-group__button--state-opened", group)
  toggleHidden(toggledName, group)
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
