module.exports = {
  friendlyName: 'Add expense',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },

  exits: {
    expenseNotExists: {
      statusCode: 409
    }
  },

  fn: async function ({ id }) {
    const moment = require('moment');
   
    const DeletedExpense = {
      modificationDate: moment().unix(),
      isActive: false
    };

    await Expense.update({ id }).set(DeletedExpense).catch(() => {
      throw 'updateFail';
    });

    return {
      success: true,
      data: DeletedExpense
    }
  }
};