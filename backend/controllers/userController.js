const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const registerUser = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPwd,
            isAdmin: isAdmin || false
        });

        res.status(201).json({ message: "User registered successfully", user: newUser});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, "your_secret_key", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successfull", token, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message} );
    }
}

const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { username, email, isAdmin } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { username, email, isAdmin },
            { new: true, runValidators: true }
        ).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const addFavortieResort = async (req, res) => {
    const{ userId } = req.params;
    const{ resortId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (!user.favorites.includes(resortId)) {
            user.favorites.push(resortId);
            await user.save();
        }

        res.status(200).json({ message: "Resort added to favorites", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeFavoriteResort = async(req, res) => {
    const{ userId } = req.params;
    const{ resortId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.favorites = user.favorites.filter(id => id.toString() !== resortId);
        await user.save();

        res.status(200).json({ message: "Resort was removed from favorites", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const totalFavorites = async(req, res) => {
    const { resortId } = req.params;

    try {
        const result = await User.aggregate(
            [
                {
                  '$match': {
                    'favorites': new mongoose.Types.ObjectId(resortId)
                  }
                }, {
                  '$count': 'totalFavorites'
                }
              ]
        )

        if (!result.length === 0) {
            return res.status(404).json({ totalFavorites: 0 });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    addFavortieResort,
    removeFavoriteResort,
    deleteUser,
    totalFavorites
};