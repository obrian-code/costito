export const calculatePt = (cant: string, pu: string): string => {
  const parsedCant = parseFloat(cant);
  const parsedPu = parseFloat(pu || "0");

  if (isNaN(parsedCant) || isNaN(parsedPu)) {
    return "0";
  }

  return (parsedCant * parsedPu).toString();
};
