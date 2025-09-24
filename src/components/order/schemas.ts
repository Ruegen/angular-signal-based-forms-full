import { customError, FieldState, FieldValidationResult, FieldValidator, required, RootFieldContext, schema, validate, ValidationError } from "@angular/forms/signals";

const customerNameSchema = schema<string>((path) => {
    required(path, {message: 'Customer name is required'});
    
	const bannedNames = ['Admin', 'Root', 'Null'];

	validate(path, (ctx: RootFieldContext<string>): FieldValidationResult<ValidationError> => {
	  const value: string = ctx.value();
	  if (bannedNames.includes(value)) {
		return customError({
			kind: 'bannedName',
			message: `The name "${value}" is not allowed.`,
			allowed: bannedNames,
		})
	  }
	  return null;
	})
});

export {customerNameSchema}
