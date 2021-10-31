const axios = require('axios');

const baseUrl = 'https://burguer-api-2021.herokuapp.com/orders';
const token = localStorage.token
// const baseUrl = 'https://appi-burger-queen-client.herokuapp.com/orders'

export const getOrders = async (page,limit) => {
    try {
        const resp = await axios({
            method: 'get',
            url: `${baseUrl}?page=${page}&limit=${limit}`,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
          }) 
        //   if (resp.status !== 200) {
        //     return new Error('Error');
        //   } 
          return resp;
    } catch (error) {
        return error
    }
}

export const postOrders = async (newOrder) => {
    try {
    const resp = await axios({
        method: 'post',
        data: newOrder,
        url: baseUrl,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    });
    if (resp.status !== 200) {
        return new Error('Error');
      } 
      return resp;
    } catch (error) {
        return error
    }

}

export const deleteOrders = async (orderId) => {
    try {
        const resp = await axios({
            method: 'delete',
            url: `${baseUrl}/${orderId}`,
            data: {
                orderId
            },
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (resp.status !== 200) {
            return new Error('Error');
          } 
          return resp;

    } catch (error) {
        return error
    }

}

export const putOrders = async (changeOrder, OrderId) => {
    const resp = await axios({
        method: 'put',
        url: `${baseUrl}/${OrderId}`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data:JSON.stringify(changeOrder),
      });
    return resp;
}

// PENDIENTE PUT 
// PENDIENTE GET ORDER BY ID
// PENDIENTE GET ORDER BY ID
