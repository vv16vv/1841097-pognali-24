function toggleHidden(className, parent = document) {
  const menu = parent
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
  const paths = pageHeader.getElementsByClassName("logo__path")
  for (let i = 0; i < paths.length; i++) {
    paths[i].classList.toggle("logo__path--light")
    paths[i].classList.toggle("logo__path--dark")
  }
  const rects = pageHeader.getElementsByClassName("logo__burger")
  for (let i = 0; i < rects.length; i++) {
    rects[i].classList.toggle("logo__burger--light")
    rects[i].classList.toggle("logo__burger--dark")
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

function toggleGroup(searchedName, toggledName = "filter-form-group__list") {
  const group = document.getElementsByClassName(searchedName)[0]
  toggleHidden("filter-form-group__button--state-closed", group)
  toggleHidden("filter-form-group__button--state-opened", group)
  toggleHidden(toggledName, group)
}
