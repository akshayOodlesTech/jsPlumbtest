const validation = [
    {
      field: 'newPassword',
      method: 'isEmpty',
      validWhen: false,
      message: 'Password is required.'
    },
    {
      field: 'newPassword',
      method: 'isLength',
      validWhen: true,
      args: [{ min: "8", max: "16" }],
      message: "Should have Min: 8  and Max: 16 characters."
    },
    {
    field: 'confirmPassword',
    method: 'isEmpty',
    validWhen: false,
    message: 'Confirm Password is required.'
    }
  ]

  export default validation;