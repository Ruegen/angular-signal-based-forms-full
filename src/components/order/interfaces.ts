import { IProduct, IUser } from "../../global-interfaces";

interface IOrder {
    orderNumber: number;
    customer: IUser | null;
    product: IProduct | null;
    quantity: number;
    deliveryDate: Date | null;
    special: string | null;
    notes: string;
}

export { IOrder };