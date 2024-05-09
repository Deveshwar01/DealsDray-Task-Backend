import { Admin } from "../models/users.js"; // Importing the Admin model
import { Employee } from "../models/employeeSchema.js"; // Importing the Employee model
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import { sendCookie } from "../utils/features.js"; // Importing utility function for sending cookies

// Controller for user login
export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email }).select("+password");

        // If admin not found, return error
        if (!admin)
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        // If passwords don't match, return error
        if (!isMatch)
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })

        // Send cookie with success message
        sendCookie(admin, res, `Welcome back, ${admin.name}`, 200);
    } catch (error) {
        next(error);
    }
};

// Controller for user registration
export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with email already exists
        let user = await Admin.findOne({ email });
        // If user exists, return error
        if (user)
            return res.status(404).json({
                success: false,
                message: "User already exists"
            })

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create user
        user = await Admin.create({ name, email, password: hashedPassword });

        // Send cookie with success message
        sendCookie(user, res, "Registered successfully", 201);
    } catch (error) {
        next(error);
    }
};

// Controller for user logout
export const Logout = (req, res) => {
    // Clear token cookie and send success response
    res.status(200)
        .cookie("token", "", { expires: new Date(Date.now()) })
        .json({
            success: true,
            admin: req.admin,
        });
};

// Controller for creating an employee
export const createEmployee = async (req, res, next) => {
    try {
        const { name, email, mobileNo, designation, gender, course, img } = req.body;

        // Check if all required fields are present
        if (!name || !email || !mobileNo || !designation || !gender || !course || !img) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, Mobile Number, Designation, Gender, Course, and Img are required fields"
            });
        }

        // Create the employee document in the database
        await Employee.create({ name, email, mobileNo, designation, gender, course, img });

        // Respond with success message
        res.status(201).json({
            success: true,
            message: "Employee created successfully"
        });
    } catch (error) {
        next(error);
    }
}

// Controller for updating an employee
export const updateEmployee = async (req, res, next) => {
    try {
        const { _id } = req.params; // Extracting employee ID from URL params
        const { name, email, mobileNo, designation, gender, course, img } = req.body;

        // Check if ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required"
            });
        }

        // Find and update the employee by ID
        let employee = await Employee.findByIdAndUpdate(_id, {
            name,
            email,
            mobileNo,
            designation,
            gender,
            course,
            img
        }, { new: true });

        // If employee not found, return error
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Respond with success message and updated employee data
        res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            data: employee
        });
    } catch (error) {
        next(error);
    }
}


// Controller for deleting an employee
export const deleteEmployee = async (req, res, next) => {
    try {
        const { _id } = req.params; // Extracting employee ID from URL params

        // Check if ID is provided
        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Employee ID is required"
            });
        }

        // Find and delete the employee by ID
        const deletedEmployee = await Employee.findByIdAndDelete(_id);

        // If employee not found, return error
        if (!deletedEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        // Respond with success message and deleted employee data
        res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
            data: deletedEmployee
        });
    } catch (error) {
        next(error);
    }
}

// Controller for getting all employees
export const getAllEmployee = async (req, res, next) => {
    try {
        // Find all employees
        const employees = await Employee.find({}, { updatedAt: 0, __v: 0 });

        // If no employees found, return a 404 error
        if (employees.length === 0) return res.status(404).json({ success: false, message: "No employee exists" });

        // Respond with success message and employee list
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        next(error);
    }
}
