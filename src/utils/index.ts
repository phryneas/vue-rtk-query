import faker from 'faker'
import { Product } from '@/services/product'

export const getTagColor = (status: string): string => {
    let color: string
    if (status === 'instock') {
        color = 'success'
    } else if (status === 'lowstock') {
        color = 'warning'
    } else if (status === 'outofstock') {
        color = 'danger'
    } else {
        color = 'success'
    }
    return color
}

export const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(value)
}

export const generateProduct = (): Omit<Product, 'id'> => {
    return {
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        department: faker.commerce.department(),
        status: faker.random.arrayElement(['instock', 'lowstock', 'outofstock']),
        rating: faker.random.number({ min: 1, max: 5 })
    }
}