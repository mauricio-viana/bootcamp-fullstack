import * as controller from '../controllers/accountsController.js';

export const accountsRouter = (app) => {
  app.get('/accounts/highestBalance/:quantity', controller.highestBalance);

  app.get('/accounts/lowestBalance/:quantity', controller.lowestBalance);

  app.get('/accounts/average/:agency', controller.averageAgency);

  app.post('/accounts/deposit', controller.deposit);

  app.post('/accounts/withdraw', controller.withdraw);

  app.post('/accounts/transfer', controller.transfer);

  app
    .route('/accounts/:agency/:number')
    .get(controller.findOne)
    .delete(controller.remove);

  app.post('/accounts/privateAccounts', controller.privateAccounts);
};
