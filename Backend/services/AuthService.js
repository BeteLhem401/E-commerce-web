const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(userData) {
    const { name, email, password, role } = userData;
    
    // Check if user exists
    const existingUser = await userRepository.findOne({ email });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 400;
      throw error;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'Customer'
    });
    
    return this.generateTokenResponse(user);
  }

  async login(email, password) {
    const user = await userRepository.findByEmailWithPassword(email);
    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    return this.generateTokenResponse(user);
  }

  generateTokenResponse(user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '30d'
    });
    
    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = new AuthService();
