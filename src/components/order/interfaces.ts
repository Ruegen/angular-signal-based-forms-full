import { IProduct, IUser } from "../../main-interfaces";

interface IOrder {
    orderNumber: number;
    customer: IUser | null;
    product: IProduct | null;
    quantity: number;
    deliveryDate: Date | null;
    notes: string;
}

export { IOrder };