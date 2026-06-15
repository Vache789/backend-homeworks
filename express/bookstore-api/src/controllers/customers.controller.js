const customersService = require('../services/customers.service.js');

async function getAllCustomers(req, res, next) {
    try {
        const customers = await customersService.getAllCustomers();
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
}

async function getCustomerById(req, res, next) {
    try {
        const { id } = req.params;
        const customer = await customersService.getCustomerById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

async function createCustomer(req, res, next) {
    try {
        const { name, email, phone } = req.body;
        const customer = await customersService.createCustomer(name, email, phone);
        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
}

async function updateCustomer(req, res, next) {
    try {
        const { name, email, phone } = req.body;
        const { id } = req.params;

        const customer = await customersService.updateCustomer(id, name, email, phone);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found to update" });
        }

        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

async function deleteCustomer(req, res, next) {
    try {
        const { id } = req.params;
        const customer = await customersService.deleteCustomer(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found to delete" });
        }
        res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer
};
