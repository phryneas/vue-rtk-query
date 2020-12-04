import { rest } from 'msw'
import faker from 'faker'
import { Product } from '@/services/product';

const products: Product[] = [
    {
      "id": 27591,
      "name": "Handmade Frozen Bacon",
      "price": "166.00",
      "department": "Industrial",
      "status": "instock",
      "rating": 5
    },
    {
      "id": 92271,
      "name": "Gorgeous Frozen Ball",
      "price": "136.00",
      "department": "Clothing",
      "status": "lowstock",
      "rating": 4
    },
    {
      "id": 6009,
      "name": "Practical Rubber Computer",
      "price": "388.00",
      "department": "Toys",
      "status": "outofstock",
      "rating": 3
    },
    {
      "id": 39632,
      "name": "Handcrafted Steel Tuna",
      "price": "240.00",
      "department": "Kids",
      "status": "instock",
      "rating": 2
    },
    {
      "id": 67269,
      "name": "Incredible Concrete Pants",
      "price": "402.00",
      "department": "Electronics",
      "status": "instock",
      "rating": 3
    },
    {
      "id": 26773,
      "name": "Incredible Wooden Salad",
      "price": "747.00",
      "department": "Games",
      "status": "outofstock",
      "rating": 3
    },
    {
      "id": 86709,
      "name": "Generic Wooden Soap",
      "price": "998.00",
      "department": "Outdoors",
      "status": "lowstock",
      "rating": 3
    },
    {
      "id": 67294,
      "name": "Awesome Rubber Ball",
      "price": "995.00",
      "department": "Computers",
      "status": "lowstock",
      "rating": 3
    },
    {
      "id": 4082,
      "name": "Ergonomic Wooden Chicken",
      "price": "621.00",
      "department": "Home",
      "status": "instock",
      "rating": 1
    },
    {
      "id": 16978,
      "name": "Practical Concrete Hat",
      "price": "893.00",
      "department": "Kids",
      "status": "lowstock",
      "rating": 3
    },
    {
      "id": 66349,
      "name": "Generic Steel Gloves",
      "price": "896.00",
      "department": "Toys",
      "status": "outofstock",
      "rating": 5
    },
    {
      "id": 63278,
      "name": "Handmade Fresh Hat",
      "price": "362.00",
      "department": "Toys",
      "status": "lowstock",
      "rating": 4
    }
]

export const handlers = [
    rest.get('/api/products', (_, res, ctx) => {
        return res(
            ctx.delay(500),
            ctx.json({
                products,
                data: true
            }),
        );
    }),
    rest.post<Omit<Product, 'id'>>('/api/products', (req, res, ctx) => {
        const newProduct = {
            id: faker.random.number(),
            ...req.body
        }

        products.push(newProduct)

        return res(
            ctx.status(201),
            ctx.json({
                product: newProduct
            }),
        )
    }),
    rest.put<Omit<Product, 'id'>>('/api/products/:id', (req, res, ctx) => {
      const { id } = req.params
      const updatedProduct = {
          id: Number(id),
          ...req.body
      }

      console.log(req.body, req.params)
      const prodIndex = products.findIndex(i => i.id === Number(id))
      console.log(prodIndex)
      products[prodIndex] = updatedProduct

      return res(
          ctx.json({
            product: updatedProduct
          }),
      )
    }),
    rest.delete('/api/products/:id', (req, res, ctx) => {
        const { id } = req.params
        const prodIndex = products.findIndex(i => i.id === Number(id))
        products.splice(prodIndex, 1)

        return res(
            ctx.json({
                id: Number(id)
            }),
        ) 
    })
]