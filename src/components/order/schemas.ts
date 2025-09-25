import { customError, disabled, FieldValidationResult, required, RootFieldContext, Schema, schema, validate, ValidationError } from "@angular/forms/signals";
import { IUser, IOrder } from "../../global-interfaces";

const customerNameSchema = schema<IUser | null>((path) => {
    required(path, {message: 'Customer name is required'});
    
	const bannedNames = ['Admin', 'Root', 'Null'];

	validate(path, (ctx: RootFieldContext<IUser | null>): FieldValidationResult<ValidationError> => {
	  const customer: IUser | null = ctx.value();
	  if (customer === null) { 
		  return customError({kind: 'required', message: 'Customer is required'});
	  }
	  if (bannedNames.includes(customer.name)) {
		return customError({
			kind: 'bannedName',
			message: `The name "${customer.name}" is not allowed.`,
			allowed: bannedNames,
		})
	  }
	  return null;
	})
});


function disableAll(callback: () => boolean): Schema<IOrder> {
	return schema((path) => {
		disabled(path.deliveryDate, () => callback())
		disabled(path.notes, () => callback())
		disabled(path.quantity, () => callback())
	})
}

// function disableAll<CustomPath>(list: Array<keyof CustomPath>, callback: () => boolean): Schema<CustomPath> {
// 	return schema<CustomPath>((path: FieldPath<CustomPath>) => {
// 		list.forEach((field: keyof CustomPath) => {
// 			disabled((path as any)[field], () => callback())
// 		})
// 	})
// }

export {customerNameSchema, disableAll}
