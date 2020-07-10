import { accountModel } from '../models/accountModel.js';

const highestBalance = async (req, res) => {
  try {
    const quantity = parseInt(req.params.quantity);

    const accounts = await accountModel.aggregate([
      { $project: { _id: 0, agency: 1, number: 1, name: 1, balance: 1 } },
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
      { $project: { _id: 0, agency: 1, number: 1, balance: 1 } },
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
        .send({ error: 'Agency and account not found in collection' });
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
    const { agency, number, value } = req.body;

    if (!agency || !number || !value) {
      throw new Error('Inform object with agency, acount, value properties');
    }

    const query = { agency, number };
    const project = { _id: 0, balance: 1 };
    const accountBalance = await accountModel.findOne(query, project);

    if (!accountBalance) {
      return res
        .status(404)
        .send({ error: 'Agency and account not found in collection' });
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
    const { agency, number, value } = req.body;

    if (!agency || !number || !value) {
      throw new Error('Inform object with agency, acount, value properties');
    }

    const newValue = value + rate;

    const query = { agency, number };
    const project = { _id: 0, balance: 1 };
    const accountBalance = await accountModel.findOne(query, project);

    if (!accountBalance) {
      return res
        .status(404)
        .send({ error: 'Agency and account not found in collection' });
    }

    let { balance } = accountBalance;
    if (balance - newValue < 0) {
      throw new Error('There is not enough');
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
      originNumber,
      destinyAgency,
      destinyNumber,
      value,
    } = req.body;

    if (
      !originAgency ||
      !originNumber ||
      !value ||
      !destinyAgency ||
      !destinyNumber
    ) {
      throw new Error(
        `Enter object with properties 
          { originAgency, originNumber, value, destinyAgency, destinyNumber }`
      );
    }

    const query = {
      origin: { agency: originAgency, number: originNumber },
      destiny: { agency: destinyAgency, number: destinyNumber },
    };
    const project = { _id: 0, balance: 1 };

    const originNumberBalance = await accountModel.findOne(
      query.origin,
      project
    );
    if (!originNumberBalance) {
      return res.status(404).send({
        error: `Account not found in the collection, agency: ${originAgency}, number: ${originNumber}`,
      });
    }

    const destinyNumberBalance = await accountModel.findOne(
      query.destiny,
      project
    );
    if (!destinyNumberBalance) {
      return res.status(404).send({
        error: `Account not found in the collection, agency ${destinyAgency}, number: ${destinyNumber}`,
      });
    }

    let newValue = value;
    if (query.origin.agency !== query.destiny.agency) newValue += rate;

    if (originNumberBalance.balance - newValue < 0) {
      throw new Error(
        `There is not enough for transfer, balance: ${originNumberBalance.balance}`
      );
    }

    const newBalance = {
      $set: {
        balance: originNumberBalance.balance - newValue,
      },
    };

    await accountModel.updateOne(query.origin, newBalance);

    newBalance.$set.balance = destinyNumberBalance.balance + newValue;
    await accountModel.updateOne(query.destiny, newBalance);

    return res
      .status(200)
      .send({ balance: originNumberBalance.balance - newValue });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const privateAccounts = async (_, res) => {
  try {
    const accounts = await accountModel.aggregate([
      { $project: { _id: 0, agency: 1, number: 1, name: 1, balance: 1 } },
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
