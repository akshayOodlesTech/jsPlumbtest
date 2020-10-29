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
    },
    {
      field: 'userPassword',
      method: 'isEmpty',
      validWhen: false,
      message: 'Password is required.'
    },
    {
      field: 'userPassword',
      method: 'isLength',
      validWhen: true,
      args: [{ min: "8", max: "16" }],
      message: "Should have Min: 8  and Max: 16 characters."
    },
  ]

  export default validation;