const addRoommateForm = require('../templates/create-roommate.pug');
const renderRoommate = require('../templates/render-created-roommate.pug');

const AddRoommateForm = () => {
  return addRoommateForm();
};

const RoommateList = (list) => {
  return renderRoommate(list);
};

module.exports = { AddRoommateForm, RoommateList };
