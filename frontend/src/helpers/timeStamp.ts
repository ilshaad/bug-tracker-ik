// create a timestamp & return string of yyyy-mm-dd hh:mm:ss
// the return string format is ideal for sql timestamp
export default () => {
  const date = new Date();
  let year = date.getFullYear(),
    month = date.getMonth() + 1, //get.Month() starts from 0 index
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    seconds = date.getSeconds();

  const timestampArray = [year, month, day, hour, min, seconds];

  let timestampString = "";

  for (let dateNumber of timestampArray) {
    // if number is less than 10 than add a 0 in front of it
    if (dateNumber >= 10) {
      timestampString += dateNumber;
    } else {
      timestampString += `0${dateNumber}`;
    }
  }

  const timestampRegEx = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g;

  // create the sql timestamp format. You could change the format her if need be
  const timestamp = timestampString.replace(
    timestampRegEx,
    "$1-$2-$3 $4:$5:$6"
  );

  return timestamp;
};
