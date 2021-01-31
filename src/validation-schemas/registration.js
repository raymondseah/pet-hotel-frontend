const registrationSchema = {
    "properties": {
        "email": {
            "type": "string",
            "minLength": 3,
            "maxLength": 100
        },
        "first_name": {
            "type": "string",
            "minLength": 3,
            "maxLength": 100
        },
        "last_name": {
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

export default registrationSchema