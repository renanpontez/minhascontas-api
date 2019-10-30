module.exports = {
  friendlyName: 'Read one expense',

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

  fn: async function ({id}) {
    const ExpenseItem = await Expense.findOne({id});

    if(ExpenseItem) {
      return {
        success: true,
        data: ExpenseItem
      }
    } else {
      throw 'expenseNotExists';
    } 
  }
};