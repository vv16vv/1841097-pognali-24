function toggleHidden(e,t,s=document){e.preventDefault();s.getElementsByClassName(t)[0].classList.toggle("hidden")}function toggleMenu(e,t){toggleHidden(e,"menu-content-popup"),toggleHidden(e,"page-header__menu-button--open"),toggleHidden(e,"page-header__menu-button--close");const s="--light",a="--dark";if(t)toggleHeader(a,s);else{0===document.getElementsByClassName("page-header--sticky").length&&toggleHeader(s,a)}}function toggleFilter(){const e="filter",t=document.getElementsByClassName(e)[0];t.classList.toggle("filter--opened");const s="filter__button",a=document.getElementsByClassName(s)[0];a.classList.toggle("filter__button--state-open"),a.classList.toggle("filter__button--state-close");const l="filter__button-name",o=a.getElementsByClassName(l);for(let e=0;e<o.length;e++)o[e].classList.toggle(`${l}--state-in-flow`),o[e].classList.toggle(`${l}--state-in-popup`);const n="filter__popup",g=t.getElementsByClassName(n)[0];g.classList.toggle("filter__popup--state-in-flow"),g.classList.toggle("filter__popup--state-in-popup")}function toggleGroup(e,t="chooser-form-group__list"){const s=window.matchMedia(`(min-width : ${tabletWidth}px)`);if(window.matchMedia(`(min-width : ${desktopWidth}px)`).matches||!s.matches){const s=document.getElementsByClassName(e)[0],a=s.getElementsByClassName("chooser-form-group__button")[0];a.classList.toggle("chooser-form-group__button--state-closed"),a.classList.toggle("chooser-form-group__button--state-opened");s.getElementsByClassName(t)[0].classList.toggle("chooser-form-group__list-hidden")}}const tabletWidth=768,desktopWidth=1440,headerHeightMobile=73,headerHeightTablet=132,headerHeightDesktop=90;function addIfAbsent(e,t){e.classList.contains(t)||e.classList.add(t)}function toggleClassNames(e,t,s){e.classList.remove(t),addIfAbsent(e,s)}function toggleHeader(e,t,s){const a="page-header",l="page-header__form-wrapper",o="page-header--sticky",n="page-header__menu-button",g="page-header__logo",d=document.getElementsByClassName(a)[0],m=d.getElementsByClassName(l)[0],c=d.getElementsByClassName(n),i=d.getElementsByClassName("page-header__menu-content-list")[0],r=d.getElementsByClassName(g)[0];toggleClassNames(m,`${l}${e}`,`${l}${t}`),toggleClassNames(i,`menu${e}`,`menu${t}`),toggleClassNames(r,`${g}${e}`,`${g}${t}`),void 0!==s&&(s?d.classList.remove(o):addIfAbsent(d,o));for(let s=0;s<c.length;s++)toggleClassNames(c[s],`${n}${e}`,`${n}${t}`)}function toggleCountryChooser(e){const t=document.getElementById(e),s=t.getElementsByClassName("steps-select__select")[0];s.classList.toggle("steps-select__select--adder"),s.classList.toggle("steps-select__select--chooser"),s.ariaExpanded=!!s.ariaExpanded;const a=s.getElementsByClassName("steps-select__select-text");for(let e=0;e<a.length;e++)a[e].classList.toggle("hidden");t.getElementsByClassName("steps-select__no-flag")[0].classList.toggle("steps-select__no-flag--adder");const l="steps-select__button",o=t.getElementsByClassName(l)[0];o.classList.toggle(`${l}--adder`),o.classList.toggle(`${l}--chooser`);t.getElementsByClassName("steps-select__popup")[0].classList.toggle("hidden")}const switchToStep=(e,t)=>{const s="steps__item";document.getElementsByClassName(`${s}--${e}`)[0].classList.toggle("hidden");document.getElementsByClassName(`${s}--${t}`)[0].classList.toggle("hidden");const a="new-plan-markers__item",l="new-plan-markers__item--current";document.getElementsByClassName(`${a}--${e}`)[0].classList.toggle(l);document.getElementsByClassName(`${a}--${t}`)[0].classList.toggle(l);const o=document.getElementsByClassName("new-plan__markers")[0];"dates"===e&&o.classList.remove("new-plan__markers--dates"),"dates"===t&&o.classList.add("new-plan__markers--dates")},onScroll=()=>{const e=window.matchMedia(`(min-width : ${tabletWidth}px)`),t=window.matchMedia(`(min-width : ${desktopWidth}px)`).matches?90:e.matches?132:73,s="--light",a="--dark";window.pageYOffset>=t?toggleHeader(a,s,!1):toggleHeader(s,a,!0)};window.onscroll=()=>onScroll(),window.onload=()=>{document.getElementsByClassName("page-header__form-wrapper--nojs")[0]?.classList?.remove("page-header__form-wrapper--nojs");document.getElementsByClassName("page-header__logo--nojs")[0]?.classList?.remove("page-header__logo--nojs");const e=document.getElementsByClassName("menu-content-popup")[0];e?.classList?.remove("menu-content-popup--nojs"),e?.classList?.add("hidden");document.getElementsByClassName("address__map--iframe")[0]?.classList?.remove("hidden");const t=document.getElementsByClassName("address__map--no-js")[0];t?.classList?.remove("address__map--no-js"),t?.classList?.add("hidden");document.getElementsByClassName("steps__item--route")[0]?.classList?.add("hidden");document.getElementsByClassName("steps__item--entertainment")[0]?.classList?.add("hidden")};