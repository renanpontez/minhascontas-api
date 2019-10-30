module.exports = {
  friendlyName: 'List all expenses of that user',

  inputs: {
    userEmailAddress: {
      type: 'string',
      required: true
    }, 
    filterDate: {
      type: 'string',
      description: 'Expects: MM/YYYY'
    }
  },

  exits: {
    expenseNotExists: {
      statusCode: 409
    }
  },

  fn: async function ({ userEmailAddress, filterDate }) {
    const moment = require('moment');
    
    let fitlerOptions = {
      isActive: true
    };

    if(filterDate) {
      filterDateBegin = moment(filterDate, 'MM/YYYY');

      fitlerOptions.payDate = {
        '>': filterDateBegin.unix(),
        '<': filterDateBegin.add(1, 'months').unix()
      };
    }

    const ExpensesList = await Expense.find({ userId: userEmailAddress }).where(fitlerOptions);

    return {
      success: true,
      data: ExpensesList
    }


  }
};