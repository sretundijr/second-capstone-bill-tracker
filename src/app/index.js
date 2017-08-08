/* global document location */

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
// const demoBtnId = document.getElementById('demo');
// demoBtnId.addEventListener('click', () => {
//   location.href = '/create-house/demo';
// });

// const watchNewHouse = () => {
//   const newHouseBtnId = document.getElementById('new-house');
//   newHouseBtnId.addEventListener('click', () => {
//     location.href = '/create-house/new-house';
//   });
// };

document.addEventListener('DOMContentLoaded', () => {
  watchDemoBtn();
  watchNewHouse();
});
