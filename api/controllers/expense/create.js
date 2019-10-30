module.exports = {
  friendlyName: 'Add expense',

  inputs: {
    title: {
      type: 'string',
      required: true
    },
    payDay: {
      type: 'number',
      required: true
    },
    startsAtDate: {
      type: 'string',
      required: true
    },
    value: {
      type: 'number',
      required: true
    },
    userEmailAddress: {
      type: 'string',
      required: true
    }
  },

  exits: {
    userNotExists: {
      statusCode: 409
    }
  },

  fn: async function ({title, payDay, startsAtDate, value, userEmailAddress}) {
    const moment = require('moment');

    const UserLogged = await User.findOne({ emailAddress: userEmailAddress });
    if(!UserLogged) throw 'userNotExists';

    startsAtDate = moment(startsAtDate, 'DD/MM/YYYY');
    let allExpenses = [];

    for(let i = 1; i < 13; i++) {
      let thisMonthDate = startsAtDate;

      //First expense doesn't need to add 1 month
      if(i > 1) {
        thisMonthDate = startsAtDate = thisMonthDate.add(1, 'months');
      }
      
      const NewExpense = {
        title: title, 
        payDay: payDay,
        payDate: thisMonthDate.unix(),
        value: value,
        creationDate: moment().unix(),
        modificationDate: moment().unix(),
        isActive: true,
        userId: UserLogged.id
      };
      
      allExpenses.push(NewExpense);
    }

    await Expense.createEach(allExpenses).fetch().catch(() => {
      return {
        success: false,
        error: 'Error saving expense on database'
      };
    });

    return {
      success: true,
      data: allExpenses
    }
  }


};