const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export const toBanglaNumber = (value: string | number): string => {
  return value.toString().replace(/\d/g, d => bnDigits[Number(d)]);
};
