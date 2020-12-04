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