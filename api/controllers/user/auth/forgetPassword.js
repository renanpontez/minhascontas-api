module.exports = {
  friendlyName: 'forgetPassword',

  inputs: {
    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },
  },


  exits: {

    success: {
      statusCode: 200,
      description: 'New user account was created successfully.'
    },

    userNotExists: {
      statusCode: 400,
      description: 'The provided email does not exists.',
    },
  },

  fn: async function (inputs) {
    let user = await User.findOne({
      emailAddress: inputs.emailAddress 
    }).intercept('incorrect', 'userNotExists');;

    if(!user) return;

    return {
      success: true,
      user: user
    };
  }

};