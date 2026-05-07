export function getElement(selector, parent = document) {
  const element = parent.querySelector(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
}

export function setVisible(element, visible) {
  element.hidden = !visible;
}

