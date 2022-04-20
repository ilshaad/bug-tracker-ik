/** parse sql timestamp
 * just return date & time format string from a typical sql timestamp format
 * sql timestampe would look like this "2021-06-01T11:08:01.000Z"
 *  - we want it to look like this "2021-06-01 11:08:01"
 */
export default (timestampP: string) => {
  // let timestampP = "2021-06-01T11:08:01.000Z";

  const removeT = timestampP.replace("T", " ");

  const removeMicroSecondsRegEx = /\.\w+/g;

  const timestamp = removeT.replace(removeMicroSecondsRegEx, "");

  return timestamp;
};
