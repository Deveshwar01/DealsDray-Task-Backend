import express from "express";
import {
    Login,
    Register,
    Logout,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployee,
} from '../controllers/admin.js'; // Importing user authentication controller functions

const router = express.Router();

// User authentication routes
router.post('/new', Register);
router.post('/login', Login);
router.get('/logout', Logout);

// Employee CRUD routes
router.post('/employees', createEmployee);
router.put('/employees/:_id', updateEmployee);
router.delete('/employees/:_id', deleteEmployee);
router.get('/employees', getAllEmployee);

export default router;
