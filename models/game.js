import Joi from 'joi';
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Genre',
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

const Game = mongoose.model('Game', gameSchema);

function validateGame(game) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(255).required(),
    genre: Joi.string().valid().required(),
    numberInStock: Joi.number().min(0).max(255).required(),
    dailyRentalRate: Joi.number().min(0).max(255).required()
  });

  return schema.validate(game);
}

export { Game, validateGame };
