import { customError, FieldPath, validate } from "@angular/forms/signals";

const validateDateRange = (path: FieldPath<Date | null>, allowed: { startDate: Date, endDate: Date }): void => {
  validate(path, (ctx) => {
    const value = ctx.value();
    if(!value) {
      return customError({
        kind: 'missingDate',
        value,
        message: 'Missing date',
        allowed,
      });
    }
    const date = new Date(value);
    const currentDate = new Date(allowed.startDate);
    const maxDate = new Date(allowed.endDate);
    maxDate.setMonth(maxDate.getMonth() + 3);

    if (date > maxDate) {
      return customError({
        kind: 'dateTooLate',
        value,
        message: 'Date must be within 3 months from today.',
        allowed: maxDate.toISOString().split('T')[0],
      });
    } 

    if (date < currentDate) {
      return customError({
        kind: 'dateTooEarly',
        value,
        message: 'Date must be from today onwards.',
        allowed: currentDate.toISOString().split('T')[0],
      });
    }

    return null
  })
};

const validateNotes = (path: FieldPath<string>, allowed: { minLength: number, maxLength: number }): void => {
  validate(path, (ctx) => {
    const value = ctx.value();
    if (value && value.length < allowed.minLength) {
      return customError({
        kind: 'minLength',
        value,
        allowed: allowed.minLength,
      });
    }
    if (value && value.length > allowed.maxLength) {
      return customError({
        kind: 'maxLength',
        value,
        allowed,
      });
    }
    return null;
  })
};

export { validateNotes, validateDateRange};