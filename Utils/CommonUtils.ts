import { DATE_FORMAT } from '../constants/constant';

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

const expochTimetoDateConvertor = (epochTime: number, format: DATE_FORMAT) => {
  // create a new Date object from the epoch time (in milliseconds)
  // const currentEpochTime = new Date().getTime();

  // Create a new Date object using the epoch time
  const currentDate = new Date(epochTime);

  // Define months array for easy month name retrieval
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

  // Extract individual date components
  const day = currentDate.getDate();
  const monthIndex = currentDate.getMonth();
  const year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const period = hours >= 12 ? 'pm' : 'am';

  // Convert hours to 12-hour format and handle midnight (0)
  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  let formattedDate;

  switch (format) {
    case DATE_FORMAT.DD_MM_YYYY_HH_MM:
      formattedDate = `${day} ${months[monthIndex]} ${year}, ${hours}:${minutes}${period}`;
      break;
    case DATE_FORMAT.MM_DD_OBJECT:
      formattedDate = {
        month: months[monthIndex],
        day: day,
      };
      break;
  }

  return formattedDate;
};

const formatErrorMessage = (errorCode: string) => {
  // Remove "auth/" from the beginning
  let formattedCode = errorCode.replace('auth/', '');

  // Replace "-" with spaces
  formattedCode = formattedCode.replace(/-/g, ' ');

  // Capitalize the first letter
  formattedCode = formattedCode.charAt(0).toUpperCase() + formattedCode.slice(1);

  return formattedCode;
};

export { convertHexToRGBA, expochTimetoDateConvertor, formatErrorMessage };
