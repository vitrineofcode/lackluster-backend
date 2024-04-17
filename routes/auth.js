import bcrypt from 'bcrypt';
import express from 'express';
import Joi from 'joi';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import config from 'config';

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // Generate a JSON Web Token
  const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
  res.send(token);
});

function validateUser(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });

  return schema.validate(user);
}

export default router;
