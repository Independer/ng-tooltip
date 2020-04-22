// Parent - Children
// -----------------
export function findDeepestChild(element: Element, querySelector: string): Element {
  let firstInvalidElement: Element | null = element.querySelector(querySelector);
  return firstInvalidElement ? findDeepestChild(firstInvalidElement, querySelector) : element;
}

export function findClosestParentByClass(element: Element, cssClass: string): Element | undefined {
  let el: Element | null;
  while (element.parentElement) {
    element = element.parentElement;
    if (element.classList.contains(cssClass)) {
      return element;
    }
  }
  return undefined;
}

export function findClosestParentByAttr(element: Element, attr: string): Element | undefined {
  let el: Element | null;
  while (element.parentElement) {
    element = element.parentElement;
    if (element.hasAttribute(attr)) {
      return element;
    }
  }
  return undefined;
}

// Position - Offset
// -----------------
function getStyle(nativeEl: HTMLElement | any, cssProp: any) {
  if (nativeEl.currentStyle) {
    return nativeEl.currentStyle[cssProp];
  }
  if (window.getComputedStyle) {
    return window.getComputedStyle(nativeEl)[cssProp];
  }
  return nativeEl.style[cssProp];
}

function isStaticPositioned(nativeEl: HTMLElement | any) {
  return (getStyle(nativeEl, 'position') || 'static') === 'static';
}

function parentOffsetEl(nativeEl: HTMLElement | any) {
  let offsetParent = nativeEl.offsetParent || window.document;
  while (offsetParent && offsetParent !== window.document && isStaticPositioned(offsetParent)) {
    offsetParent = offsetParent.offsetParent;
  }
  return offsetParent || window.document;
}

export function position(nativeEl: HTMLElement | any, relativeParentEl?: HTMLElement | any) { // If relativeParentEl is not specified then search for closest relative parent
  let offsetParentBCR = { top: 0, left: 0 };
  let elBCR = offset(nativeEl);
  let offsetParentEl = relativeParentEl || parentOffsetEl(nativeEl);

  if (offsetParentEl !== window.document) {
    offsetParentBCR = offset(offsetParentEl);
    offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
    offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
  }
  let boundingClientRect = nativeEl.getBoundingClientRect();
  return {
    width: boundingClientRect.width || nativeEl.offsetWidth,
    height: boundingClientRect.height || nativeEl.offsetHeight,
    top: elBCR.top - offsetParentBCR.top,
    left: elBCR.left - offsetParentBCR.left
  };
}

export function offset(nativeEl: HTMLElement | any) {
  let boundingClientRect = nativeEl.getBoundingClientRect();
  return {
    width: boundingClientRect.width || nativeEl.offsetWidth,
    height: boundingClientRect.height || nativeEl.offsetHeight,
    top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
    left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
  };
}

export function getScrollbarWidth() {
  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.style.top = '-10000px';
  div.style.left = '-10000px';
  div.style.width = '100px';
  div.style.height = '100px';
  div.style.overflow = 'scroll';
  document.body.appendChild(div);
  const difference = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return difference;
}
