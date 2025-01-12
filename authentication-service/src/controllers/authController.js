const { signUpUser, loginUser } = require('../services/authService');

const signUp = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const result = await signUpUser(username, password, email);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await loginUser(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { signUp, login };
