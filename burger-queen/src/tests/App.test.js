
import{ postRequest} from '../Services/auth'
import {postUser, getUsers, putUsers, deleteUsers} from '../Services/users'

import { deleteOrders, getOrders, postOrders, putOrders } from '../Services/orders';
import { deleteProduct, getProducts, postProducts, putProducts } from '../Services/products';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// test ( 'permite al usuario iniciar sesión' , async ( ) => {    
    // Representar componentes, realizar solicitudes, recibir respuestas simuladas.

// } )
const objProducts= {
    "_id": "001",
    "name": "Ham and-cheese sandwich",
    "price": "10",
    "image": "https://user-images.githubusercontent.com/75852321/123832331-dd233e80-d8ca-11eb-82a5-feba4c93b6d0.png",
    "type": "burger",
    "dateEntry": "02-01-2020"
}

const objOrders ={
    "_id": "002",
    "userId": "M01",
    "client": "juana",
    "products": [
      {
        "qty": 1,
        "product": {
          "name": "hamburguesa",
          "id": "123"
        }
      },
      {
        "qty": 1,
        "product": {
          "name": "sprite",
          "id": "111"
        }
      }
    ],
    "status": "pending",
    "dateEntry": "2021-06-13 22:00:00",
    "dateProcesed": "2021-06-13 23:57:30"
};

//AUTH
describe('AUTH', () => {
    test('PostRequest - Debería retornar email y contraseña', async () => {
      const response = await  postRequest({"email": "bq@gmail.com" , "password": "123456"});
      expect(response.data).toEqual({"email": "bq@gmail.com" , "password": "123456"});
    });
});

//USERS

describe('USERS', () => {
    test('getUsers: Debería retornar los emails de usuarios', async () => {
      const response = await getUsers();
      expect(response.data).toEqual({
        _id: '001',
        email: 'example1@gmail.com',
        roles: { admin: true },
      }
      );
    });

    test('postUser: Debería retornar al nuevo usuario', async () => {
        const objUser = {
            _id: '002',
            email: 'example3@gmail.com',
            roles: { admin: true }
        }
          const response = await postUser(objUser);
    
          expect(response.data).toEqual(objUser)}
    );

    test('putUsers: Debería retornar al usuario actualizado', async () => {
    //    const objUser = {"email": "example3@gmail.com"};
        const objResp = {
        _id: '001',
        email: 'example3@gmail.com',
        roles: { admin: true }
    }
      const response = await putUsers( objResp,'001');
      expect(response.data).toEqual(objResp);
    });


    test('deleteUsers:  Debería retornar al usurio eliminado', async () => {
        const response = await deleteUsers('003');
        expect(response.data).toBe(undefined);
      });
});
// PRODUCTS 
describe('PRODUCTS', () => {
    test('getProducts -Debería retornar un producto', async () => {
      const response = await  getProducts(1,1);
      expect(response.data).toEqual(objProducts);
    });
    test('PostProducts - Debería retornar un producto agregado', async () => {
        const response = await  postProducts(objProducts);
        expect(response.data).toEqual(objProducts);
    });
    test('DeleteProducts - Debería eliminar un producto', async () => {
        const response = await  deleteProduct("001");
        expect(response.data).toEqual(undefined);
    })
    test('PutProducts - Debería actualizar un producto', async () => {
        const response = await  putProducts(objProducts,"001");
        expect(response.data).toEqual(objProducts);
    })
});

// ORDERS
describe('ORDERS', () => {
    test('getOrders -Debería retornar una orden', async () => {
      const response = await  getOrders(1,1);
      expect(response.data).toEqual(objOrders);
    });
    test('PostOrders- Debería retornar una orden agregada', async () => {
        const response = await  postOrders(objOrders);
        expect(response.data).toEqual(objOrders);
    });
    test('DeleteOrders - Debería eliminar una orden', async () => {
        const response = await  deleteOrders("002");
        expect(response.data).toEqual(undefined);
    })
    test('PutOrders - Debería actualizar una orden', async () => {
        const response = await  putOrders(objOrders,"002");
        expect(response.data).toEqual(objOrders);
    })
});
