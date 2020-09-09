import { FieldError } from '../generated/graphql';

export const toFormikErrors = (errors: FieldError[]) =>
  errors.reduce((acc, { field, message }) => {
    acc[field] = message;
    return acc;
  }, {} as Record<string, string>);
