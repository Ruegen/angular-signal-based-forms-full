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

export { IUser, IProduct }