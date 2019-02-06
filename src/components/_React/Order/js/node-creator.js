const template = document.getElementById('Order-template');

export const getNewChoiceWrapNode = () => template.content.querySelector('.order__extra-choice-wrap').cloneNode(true);