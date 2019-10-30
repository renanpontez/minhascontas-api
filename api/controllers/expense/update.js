module.exports = {
  friendlyName: 'Update some expense',

  inputs: {
    id: {
      type: 'number',
      required: true
    },
    title: {
      type: 'string',
      required: true
    },
    payDay: {
      type: 'number',
      required: true
    },
    value: {
      type: 'number',
      required: true
    },
    startsAtDate: {
      type: 'string',
      required: true
    },
    isActive: {
      type: 'boolean',
      required: true
    },
    isPaid: {
      type: 'boolean',
      required: true
    }
  },

  exits: {
    updateFail: {
      statusCode: 500
    }
  },

  fn: async function ({id, title, payDay, startsAtDate, value, isActive, isPaid}) {
    const moment = require('moment');

    const UpdatedExpense = {
      title: title, 
      payDay: payDay,
      payDate: moment(startsAtDate, 'DD/MM/YYYY').unix(),
      value: value,
      modificationDate: moment().unix(),
      isActive: isActive,
      isPaid: isPaid
    };

    await Expense.update({ id }).set(UpdatedExpense).catch(() => {
      throw 'updateFail';
    });

    return {
      success: true,
      data: UpdatedExpense
    }
  }


};