// import userModel from '../models/userModel.js';
// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';

// // token helper
// const createToken = (id, role) => {
//     return jwt.sign({ id, role }, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//     });
// };

// // Route for user login
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email });

//         if (!user) {
//             return res.json({ success: false, msg: "user doesn't exist" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {
//             const token = createToken(user._id, "user");
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, msg: "invalid credentials" });
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: error.message });
//     }
// };

// // Route for user register
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, msg: "user already exist" });
//         }

//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, msg: "please enter a valid email" });
//         }

//         if (password.length < 8) {
//             return res.json({ success: false, msg: "please generate a strong password" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new userModel({ name, email, password: hashedPassword });
//         const user = await newUser.save();

//         const token = createToken(user._id, "user");
//         res.json({ success: true, token });

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, msg: error.message });
//     }
// };

// // Route for admin login
// const adminLogin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = createToken("admin-id", "admin");
//             return res.json({ success: true, token });
//         } else {
//             return res.status(401).json({ success: false, message: "Invalid credentials" });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { loginUser, registerUser, adminLogin };

import userModel from '../models/userModel.js';
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET) 
    
// }
const createToken = (id, role = "user") => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '5h' });
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, msg: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id, "user");

            // Exclude password
            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email
            };

            res.json({ success: true, token, user: userData });
        } else {
            res.json({ success: false, msg: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message });
    }
};

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, msg: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, msg: "Password should be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = createToken(user._id, "user");

        // Exclude password
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email
        };

        res.json({ success: true, token, user: userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = createToken("admin-id", "admin");
            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin };
