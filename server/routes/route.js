const routes = require("express").Router();
const controller = require('../controllers/controller');

routes.route('/categories').post(controller.createCategories).get(controller.getCategories);
routes.route('/transactions').post(controller.createTranscations).get(controller.getTranscations).delete(controller.deleteTranscations);
routes.route('/labels').get(controller.getLabels);

module.exports = routes;