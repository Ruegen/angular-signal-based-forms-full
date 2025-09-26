import { applyWhen, AsyncValidatorOptions, customError, disabled, FieldValidationResult, required, RootFieldContext, Schema, schema, TreeValidationResult, validate, ValidationError } from "@angular/forms/signals";
import { IUser, IOrder, IProduct } from "../../global-interfaces";
import { resource, ResourceRef, Signal, signal } from "@angular/core";
import { fakeHttpProductCheck } from "../helpers/fake-http-product-check";

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

const orderSpecialSchema = schema<IOrder>((path) => {

	validate(path.special, (ctx) => {
		const value = ctx.value() ?? '';
		const codes = ['SPECIAL10']
		if(value && !codes.includes(value)) {
			return customError({
				kind: 'invalidSpecialCode',
				message: `The special code "${value}" is not valid.`,
				allowed: codes,
			})
		}
		return null;
	})

	required(path.special, {
		message: 'Special code does not apply to this product, please remove it.',
		when: ({valueOf}) => {
		const value = valueOf(path.special) ?? '';
		if(!value) {
			return false
		}
		const productIds: Array<string> = ['p1q2r3s5', 'x9y8z7w6'];
		return !productIds.includes(value);
	}});

});


function disableAll(callback: () => boolean): Schema<IOrder> {
	return schema((path) => {
		disabled(path.deliveryDate, () => callback())
		disabled(path.notes, () => callback())
		disabled(path.quantity, () => callback())
		disabled(path.special, () => callback())
	})
}

// function disableAll<CustomPath>(list: Array<keyof CustomPath>, callback: () => boolean): Schema<CustomPath> {
// 	return schema<CustomPath>((path: FieldPath<CustomPath>) => {
// 		list.forEach((field: keyof CustomPath) => {
// 			disabled((path as any)[field], () => callback())
// 		})
// 	})
// }

const schemaProductRef: AsyncValidatorOptions<IProduct | null, any, any> = {
	params: (ctx: RootFieldContext<IProduct | null>) => {
		const productId: string | undefined = ctx.value()?.id;
		return productId
	},
	factory: (productId: Signal<string | undefined>): ResourceRef<any> => {
	return resource({
			// Define a reactive computation.
			// The params value recomputes whenever any read signals change.
			params: () => productId(),
			// Define an async loader that retrieves data.
			// The resource calls this function every time the `params` value changes.
			loader: async (resource) => fakeHttpProductCheck(resource.params),
		})
	},
	errors: (valid: boolean, ctx: RootFieldContext<IProduct | null>): TreeValidationResult => {
		console.log('product valid?', valid);

		if(valid) {
			return null;
		}
		return customError({
			kind: 'resource',
			message: 'Product information could not be validated, please try again later.',
		});
	}
};


export {customerNameSchema, disableAll, schemaProductRef, orderSpecialSchema}
