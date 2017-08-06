/* global document location */

const watchDemoBtn = () => {
  const demoBtnId = document.getElementById('demo');
  demoBtnId.addEventListener('click', () => {
    location.href = '/create-house/demo';
  });
};

const watchNewHouse = () => {
  const newHouseBtnId = document.getElementById('new-house');
  newHouseBtnId.addEventListener('click', () => {
    location.href = '/create-house/new-house';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  watchDemoBtn();
  watchNewHouse();
});
