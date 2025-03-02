export const validationsRuleProducto = {
  producto: { required: true, minLength: 5 },
  descripcion: { required: true, minLength: 5 },
  margenUtilidad: { required: true, greaterThanZero: true },
};
export const validationsRuleForm = {
  name: { required: true, minLength: 5 },
  pt: { required: true, greaterThanZero: true },
  cant: { required: true, greaterThanZero: true },
  pu: { required: true, greaterThanZero: true },
};
