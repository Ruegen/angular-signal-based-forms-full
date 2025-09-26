import { IOrder } from "../../global-interfaces";

function extractOrder(order: IOrder) {
  const {deliveryDate, notes, quantity, product, special} = order;
  if(!product) {
    throw new Error('Product is required to extract order');
  }
  return {date: deliveryDate, notes, quantity, productId: product.id, special};
}

export {extractOrder};