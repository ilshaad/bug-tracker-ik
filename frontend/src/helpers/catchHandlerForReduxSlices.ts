export default (functionName: string, fileName: string, error?: any) => {
  console.error(
    `iK occurred within ${functionName} request function on file ${fileName} (check below console.error() for more details if there is an error data):`
  );
  console.error(error);
};
