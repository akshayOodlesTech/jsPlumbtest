const validation = [
    {
    field: 'userEmail',
    method: 'isEmpty',
    validWhen: false,
    message: 'Email is required'
    },
    {
        field: 'userEmail',
        method: 'isEmail',
        validWhen: true,
        message: 'Invalid Email'
    }
  ]

  export default validation;