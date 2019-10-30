module.exports = {

  friendlyName: 'Add friends',
  description: 'Add one or more friends.',

  inputs: {
    title: {
      type: 'string',
      required: true
    },
    payDay: {
      type: 'number',
      required: true
    },
    startsAtTimestamp: {
      type: 'number',
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

  fn: async function ({title, payDay, startsAtTimestamp, value, userEmailAddress}) {
    const UserLogged = await User.findOne({ emailAddress: userEmailAddress });

    let moment = require('moment');
    let startsAtDate = moment().unix(startsAtTimestamp);

    sails.log(startsAtDate);
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
        payDate: thisMonthDate,
        value: value,
        creationDate: moment().unix(),
        modificationDate: moment().unix(),
        isActive: true,
        userId: UserLogged.id
      };
      
      allExpenses.push(NewExpense);
    }

    await Expense.create(allExpenses).fetch().catch(() => {
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