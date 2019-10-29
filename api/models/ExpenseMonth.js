module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
    value: {
      type: 'number',
      description: 'The expense`s price of that month. By default it`s the same of the expense',
    },

    monthYear: {
      type: 'string',
      description: 'The indicator of the month. Ex: 12/2019'
    },

    isPaid: {
      type: 'boolean'
    },

    paymentDate: {
      type: 'number',
      description: 'A timestamp that contains that date of the payment'
    
    },

    creationDate: {
      type: 'number',
      description: 'A timestamp that contains the creation date and time'
    },

    modificationDate: {
      type: 'number'
    },

    isActive: {
      type: 'boolean'
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    expenseId: { 
      collection: 'Expense', 
      via: 'expenseMonth'
    },

    userId: { 
      model: 'User', 
      description: 'The user owner of this expense.' 
    },

  },

};

