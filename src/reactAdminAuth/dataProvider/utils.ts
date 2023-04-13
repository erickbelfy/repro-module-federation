export const camelCase = (input) => {
  return input.replace(/-(.)/g, (match, group1) => {
    return group1.toUpperCase();
  });
};
