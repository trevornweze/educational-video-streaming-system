const bcrypt = require('bcrypt');
const cognito = require('../config/awsConfig');
const { createToken } = require('../utils/jwtUtils');

const signUpUser = async (username, password, email) => {
  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
    ],
  };

  try {
    const result = await cognito.signUp(params).promise();
    return { success: true, message: 'User registered successfully', result };
  } catch (error) {
    throw new Error(error.message);
  }
};


const loginUser = async (username, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const data = await cognito.initiateAuth(params).promise();
    return {
      idToken: data.AuthenticationResult.IdToken,
      accessToken: data.AuthenticationResult.AccessToken,
      refreshToken: data.AuthenticationResult.RefreshToken,
      message: 'Login successful',
    };
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

module.exports = { signUpUser, loginUser };
