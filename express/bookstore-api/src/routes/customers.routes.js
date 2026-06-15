const router = require("express").Router();
const customersController = require("../controllers/customers.controller");
const validateCustomer = require("../middlewares/validateCustomer.middleware");

router.get("/", customersController.getAllCustomers);
router.get("/:id", customersController.getCustomerById);
router.post("/", validateCustomer, customersController.createCustomer);
router.patch("/:id", validateCustomer, customersController.updateCustomer);
router.delete("/:id", customersController.deleteCustomer);

module.exports = router;
