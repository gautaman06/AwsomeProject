/**
 * It takes a hexcode and an opacity value, converts the hexcode to RGB, and returns an rgba color
 * string
 * @param {string} hexcode - The hexcode of the color you want to convert.
 * @param {number} opacity - number - This is the opacity of the color.
 * @returns the rgba value of the hexcode.
 */
const convertHexToRGBA = (hexcode: string, opacity: number) => {
  /* Taking the hexcode and converting it to RGB. */
  const red = parseInt(hexcode.substring(1, 3), 16);
  const green = parseInt(hexcode.substring(3, 5), 16);
  const blue = parseInt(hexcode.substring(5, 7), 16);

  /* Dividing the opacity by 100 to get the decimal value of the opacity. */
  const alpha = opacity / 100;

  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  return rgbaColor;
};

export { convertHexToRGBA };
