const axios = require('axios');

// const baseUrl = 'http://localhost:3001/users'
// const baseUrl = 'https://appi-burger-queen-client.herokuapp.com/users'
// const baseUrl = 'http://localhost:3001/users'
const baseUrl = 'https://burguer-api-2021.herokuapp.com/users'

const token = localStorage.token
//console.log(token)
export const getUsers = async () => {
    try {
    const resp = await axios({
        method: 'get',
        url: `${baseUrl}?page=1&limit=50`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    if (resp.status !== 200) {
        return new Error('Error');
      } 
      return resp;
}
    catch(err){
        return err
    }   
}

export const getUser = async (token, userId) => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${baseUrl}/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
             },
            }); 
        if (resp.status !== 200) {
            return new Error('Error');
          } 
        return resp;
    } catch (error) {
        return error
    }

} 

export const postUser = async (newUser) => {
    try {
        const resp = await axios({ 
            method: 'post',
            url: baseUrl,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(newUser), 
            });
        if (resp.status !== 200) {
            return new Error('Error');
         } 
            return resp;
        } catch (error) {
            return error
        }
    }

export const deleteUsers = async (userId) => {
    try {
        const resp = await axios({
            method: 'delete',
            url: `${baseUrl}/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        if (resp.status !== 200) {
            return new Error('Error');
          } 
        return resp;
    } catch (error) {
        return error
    }

}

export const putUsers = async (objectEdit, userId) => {
    try {
        const resp = await axios({
            method: 'put',
            url: `${baseUrl}/${userId}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            data:JSON.stringify(objectEdit),
          });

        return resp;
    } catch (error) {
        return error
    }

}