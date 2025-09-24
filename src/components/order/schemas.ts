import { customError, FieldState, FieldValidationResult, FieldValidator, required, RootFieldContext, schema, validate, ValidationError } from "@angular/forms/signals";
import { IUser } from "../../main-interfaces";

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

export {customerNameSchema}
