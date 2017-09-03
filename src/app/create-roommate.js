const addRoommateForm = require('../templates/create-roommate.pug');
const renderRoommate = require('../templates/render-created-roommate.pug');

const AddRoommateForm = () => addRoommateForm();

const RoommateList = list => renderRoommate(list);

module.exports = { AddRoommateForm, RoommateList };
