const User = require("../models/userModel");
const { setUser } = require('../service/auth');

const handleUserSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password || !name) {
            return res.status(400).json({ error: 'name, email and password are required' });
        }
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }
        await User.create({
            name: name,
            email: email,
            password: password,
        });
        return res.status(201).redirect('/login');
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).render('login');
        }
        
        const token = setUser(user);
        res.cookie('token', token);
        return res.status(200).redirect('/');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const handleUserLogout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).redirect('/login');
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
}