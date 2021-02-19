const loginSchema = {
    "properties": {
        "email": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100
        },
        "password": {
          "type": "string",
          "minLength": 3,
          "maxLength": 100,
        }
    }
}

export default loginSchema