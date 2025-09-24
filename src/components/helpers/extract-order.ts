import { IOrder } from "../order/interfaces";

function extractOrder(order: IOrder) {
  const {deliveryDate, notes, quantity, productId} = order;
  return {date: deliveryDate, notes, quantity, productId};
}

export {extractOrder};