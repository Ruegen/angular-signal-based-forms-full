interface IOrder {
    orderNumber: number;
    customerName: string;
    product: string;
    productId: number;
    quantity: number;
    deliveryDate: string;
    notes: string;
}

export { IOrder };