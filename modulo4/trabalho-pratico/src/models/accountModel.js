import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  agency: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(balance) {
      if (balance < 0)
        throw new Error('Valor negativo para a saldo não permitido');
    },
  },
});

const accountModel = mongoose.model('accounts', accountSchema);

export { accountModel };
