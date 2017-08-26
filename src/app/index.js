
/* global document location */

require('../styles/index.css');

const pipe = (...pipeline) => input => pipeline.reduce((acc, fn) => fn(acc), input);

const addClickListener = (callback) => {
  return element => element.addEventListener('click', callback);
};

const redirectToDemoHouse = () => { location.href = '/create-house/demo'; };

const redirectToNewHouse = () => { location.href = '/create-house/new-house'; };

const getDemoHouseBtn = () => document.getElementById('demo');

const getNewHouseBtn = () => document.getElementById('new-house');

const watchDemoBtn = pipe(getDemoHouseBtn, addClickListener(redirectToDemoHouse));

const watchNewHouse = pipe(getNewHouseBtn, addClickListener(redirectToNewHouse));

document.addEventListener('DOMContentLoaded', () => {
  watchDemoBtn();
  watchNewHouse();
});
