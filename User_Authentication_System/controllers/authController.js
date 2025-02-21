const User = require ('../models/userModel');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const blacklistedTokens = new Set ();

const register = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash (password, 10);

    const newUser = new User ({username, email, password: hashedPassword});
    await newUser.save ();

    res.status (201).json ({message: 'User registered successfully!'});
  } catch (error) {
    next (error);
  }
};

const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne ({email});

    if (!user) {
      return res.status (400).json ({error: 'User not found!'});
    }

    const isPasswordValid = await bcrypt.compare (password, user.password);
    if (!isPasswordValid) {
      return res.status (400).json ({error: 'Invalid credentials!'});
    }

    const token = jwt.sign ({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status (200).json ({message: 'Login successful', token});
  } catch (error) {
    next (error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = req.header ('Authorization')?.split (' ')[1];

    if (!token) {
      return res.status (400).json ({error: 'No token provided'});
    }

    blacklistedTokens.add (token);
    res.status (200).json ({message: 'Logged out successfully'});
  } catch (error) {
    next (error);
  }
};

const verifyToken = (req, res, next) => {
  const authHeader = req.header ('Authorization');
  if (!authHeader) {
    return res.status (401).json ({error: 'Access Denied'});
  }

  const token = authHeader.split (' ')[1];

  if (blacklistedTokens.has (token)) {
    return res
      .status (401)
      .json ({error: 'Token has been invalidated. Please log in again.'});
  }

  try {
    const verified = jwt.verify (token, process.env.JWT_SECRET);
    req.user = verified;
    next ();
  } catch (error) {
    res.status (400).json ({error: 'Invalid Token'});
  }
};

module.exports = {
  register,
  login,
  logout,
  verifyToken,
};
