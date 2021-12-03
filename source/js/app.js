function toggleHidden(className) {
  const menu = document
    .getElementsByClassName(className)[0]
  menu.classList.toggle("hidden")
}

function toggleMenu() {
  toggleHidden("menu-content-popup")
  toggleHidden("page-header__menu-button--open")
  toggleHidden("page-header__menu-button--close")
  const pageHeader = document
    .getElementsByClassName("page-header")[0]
  pageHeader.classList.toggle("page-header--dark")
  pageHeader.classList.toggle("page-header--light")
}

function toggleFilter() {
  toggleHidden("filter-popup")
  const filter = document
    .getElementsByClassName("filter")[0]
  filter.classList.toggle("filter--opened")
}
