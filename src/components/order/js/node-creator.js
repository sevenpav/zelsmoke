const template = document.getElementById('order-template');

export const getNewChoiceWrapNode = () => template.content.querySelector('.order__extra-choice-wrap').cloneNode(true);