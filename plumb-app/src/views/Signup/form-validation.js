const firstValidation = [
    {
        field: 'companyName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Company name is required.'
      },
      {
        field: 'fullName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required.'
      },
      {
        field: 'phoneNumber',
        method: 'isEmpty',
        validWhen: false,
        message: 'Phone number is required'
      },
      {
          field: 'phoneNumber',
          method: 'isMobilePhone',
          args:['en-IN'],
          validWhen: true,
          message: 'Invalid Phone number'
        },
  ]


  const secondValidation = [
    {
        field: 'businessEmail',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required'
        },
        {
        field: 'businessEmail',
        method: 'isEmail',
        validWhen: true,
        message: 'Invalid Email'
        },
        {
          field: 'businessPassword',
          method: 'isEmpty',
          validWhen: false,
          message: 'Password is required.'
        },
        {
          field: 'businessPassword',
          method: 'isLength',
          validWhen: true,
          args: [{ min: "8", max: "16" }],
          message: "Should have Min: 8  and Max: 16 characters."
        },
  ]
  
  export {firstValidation, secondValidation};