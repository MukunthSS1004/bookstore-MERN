export const validateBookPayload = (payload) => {
  const errors = [];
  if (!payload.title) errors.push('title required');
  if (payload.price == null) errors.push('price required');
  return errors;
};