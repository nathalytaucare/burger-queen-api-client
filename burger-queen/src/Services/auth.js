const axios = require('axios');
// const baseUrl = 'https://appi-burger-queen-client.herokuapp.com/auth'
const baseUrl = 'https://burguer-api-2021.herokuapp.com/auth'

export const postRequest =  (formData) => {
    const resp =  axios.post(baseUrl, formData); 
    return resp;
}
