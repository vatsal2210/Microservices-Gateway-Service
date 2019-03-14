module.exports = {
    server: {
        port: 8081
    },

    email: {
        action: false,
        id: '',
        password: ''
    },

    JWT: {
        JWT_ENCRYPTION: "gatewayJWTToken",
        JWT_EXPIRATION: "7d"
    }

};