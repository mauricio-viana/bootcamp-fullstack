import { accountModel } from '../models/accountModel.js';

const highestBalance = async (req, res) => {
  try {
    const quantity = parseInt(req.params.quantity);

    const accounts = await accountModel.aggregate([
      { $project: { _id: 0, agency: 1, account: 1, name: 1, balance: 1 } },
      { $sort: { balance: -1 } },
      { $limit: quantity },
    ]);

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const lowestBalance = async (req, res) => {
  try {
    const quantity = parseInt(req.params.quantity);

    const accounts = await accountModel.aggregate([
      { $project: { _id: 0, agency: 1, account: 1, balance: 1 } },
      { $sort: { balance: 1 } },
      { $limit: quantity },
    ]);

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const averageAgency = async (req, res) => {
  try {
    const agencyParam = parseInt(req.params.agency);

    const accounts = await accountModel.aggregate([
      { $match: { agency: agencyParam } },
      { $group: { _id: '$agency', average: { $avg: '$balance' } } },
    ]);

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const accountFound = await accountModel.findOne(req.params);

    if (!accountFound) {
      return res
        .status(404)
        .send({ error: 'Agência e conta não encontrados na coleção' });
    }

    return res.status(200).send({ balance: accountFound.balance });
  } catch (error) {
    return res.status('500').send({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { agency } = req.params;
    await accountModel.deleteOne(req.params);

    const activeAccounts = await accountModel.countDocuments({ agency });

    return res.status('200').send({ activeAccounts });
  } catch (error) {
    return res.status('500').send({ error: error.message });
  }
};

const deposit = async (req, res) => {
  try {
    const { agency, account, value } = req.body;

    if (!agency || !account || !value) {
      throw new Error(
        'Informe objeto com as propriedades agency, acount, value'
      );
    }

    const query = { agency, account };
    const project = { _id: 0, balance: 1 };
    const accountBalance = await accountModel.findOne(query, project);

    if (!accountBalance) {
      return res
        .status(404)
        .send({ error: 'Agência e conta não encontrados na coleção' });
    }

    let { balance } = accountBalance;
    balance += value;

    const newBalance = {
      $set: {
        balance,
      },
    };

    await accountModel.updateOne(query, newBalance);

    return res.status(200).send({ balance });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const withdraw = async (req, res) => {
  try {
    const rate = 1;
    const { agency, account, value } = req.body;

    if (!agency || !account || !value) {
      throw new Error(
        'Informe objeto com as propriedades agency, acount, value'
      );
    }

    const newValue = value + rate;

    const query = { agency, account };
    const project = { _id: 0, balance: 1 };
    const accountBalance = await accountModel.findOne(query, project);

    if (!accountBalance) {
      return res
        .status(404)
        .send({ error: 'Agência e conta não encontrados na coleção' });
    }

    let { balance } = accountBalance;
    if (balance - newValue < 0) {
      throw new Error('Não há suficiente.');
    }

    balance -= newValue;
    const newBalance = {
      $set: {
        balance,
      },
    };

    await accountModel.updateOne(query, newBalance);

    return res.status(200).send({ balance });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const transfer = async (req, res) => {
  try {
    const rate = 8;
    const {
      originAgency,
      originAccount,
      destinyAgency,
      destinyAccount,
      value,
    } = req.body;

    if (
      !originAgency ||
      !originAccount ||
      !value ||
      !destinyAgency ||
      !destinyAccount
    ) {
      throw new Error(
        `Informe objeto com as propriedades 
          { originAgency, originAccount, value, destinyAgency, destinyAccount }`
      );
    }

    const query = {
      origin: { agency: originAgency, account: originAccount },
      destiny: { agency: destinyAgency, account: destinyAccount },
    };
    const project = { _id: 0, balance: 1 };

    const originAccountBalance = await accountModel.findOne(
      query.origin,
      project
    );
    if (!originAccountBalance) {
      return res.status(404).send({
        error: `Conta não encontrada na coleção, agencia: ${originAgency}, numero: ${originAccount}`,
      });
    }

    const destinyAccountBalance = await accountModel.findOne(
      query.destiny,
      project
    );
    if (!destinyAccountBalance) {
      return res.status(404).send({
        error: `Conta não encontrada na coleção, agencia: ${destinyAgency}, numero: ${destinyAccount}`,
      });
    }

    let newValue = value;
    if (query.origin.agency !== query.destiny.agency) newValue += rate;

    if (originAccountBalance.balance - newValue < 0) {
      throw new Error(
        `Não há suficiente para transferencia, saldo: ${originAccountBalance.balance}`
      );
    }

    const newBalance = {
      $set: {
        balance: originAccountBalance.balance - newValue,
      },
    };

    await accountModel.updateOne(query.origin, newBalance);

    newBalance.$set.balance = destinyAccountBalance.balance + newValue;
    await accountModel.updateOne(query.destiny, newBalance);

    return res
      .status(200)
      .send({ balance: originAccountBalance.balance - newValue });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const privateAccounts = async (req, res) => {
  try {
    const accounts = await accountModel.aggregate([
      { $project: { _id: 0, agency: 1, account: 1, name: 1, balance: 1 } },
      {
        $group: {
          _id: '$agency',
          maxBalance: { $max: '$balance' },
        },
      },
    ]);

    return res.status(200).send(accounts);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

export {
  highestBalance,
  lowestBalance,
  averageAgency,
  findOne,
  remove,
  deposit,
  withdraw,
  transfer,
  privateAccounts,
};
