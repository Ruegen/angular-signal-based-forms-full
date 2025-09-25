
interface IUser {
    id: string;
    name: string;
    contact: {
        email: string;
        phone: string;
    }
}

interface IProduct {
    id: string;
    name: string;
    description?: string;
    price: number;
}

interface IOrder {
    orderNumber: number;
    customer: IUser | null;
    product: IProduct | null;
    quantity: number;
    deliveryDate: Date | null;
    special: string | null;
    notes: string;
}



export { IUser, IProduct, IOrder }