const maxLength = (maxValue) => (v = "") =>
  v.trim().length <= maxValue ||
  `Максимальна довжина поля - ${maxValue} символів`;

export default {
  maxLength,
};
