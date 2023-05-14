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

const expochTimetoDateConvertor = (epochTime: number) => {
  // create a new Date object from the epoch time (in milliseconds)
  const dateObj = new Date(epochTime * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthIndex = dateObj.getMonth();
  const monthName = months[monthIndex];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  const dateTimeString = `${day} ${monthName} ${year}, ${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
  return dateTimeString;
};

export { convertHexToRGBA, expochTimetoDateConvertor };
