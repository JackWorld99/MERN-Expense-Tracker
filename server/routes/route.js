const routes = require("express").Router();
const controller = require('../controllers/controller');

routes.route('/api/categories').get(controller.getCategories);

module.exports = routes;