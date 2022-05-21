// return array of objects with sorted alphabetically by ascending or decending
// First arguments must be array of objects containing any properties you are targeting for sortinhg
// Second argument is a string you want to use to compare & sort the order by
//  - eg. name value = joe , andy  >> andy, joe

type Props = {
  [anyProperties: string | number]: any;
};

/****************** */
// Ascending order a b c
/****************** */
export const sortNameByAscendingOrder_array = (
  arrayOfObjects: Array<Props>,
  targetedProperty: string
) => {
  const newArray = [...arrayOfObjects];

  newArray.sort((a: Props, b: Props) =>
    a[targetedProperty].toLowerCase() < b[targetedProperty].toLowerCase()
      ? -1
      : 1
  );

  return newArray;
};

/****************** */
// Descending order c b a
/****************** */
export const sortNameByDescendingOrder_array = (
  arrayOfObjects: Array<Props>,
  targetedProperty: string
) => {
  const newArray = [...arrayOfObjects];

  newArray.sort((a: Props, b: Props) =>
    a[targetedProperty].toLowerCase() > b[targetedProperty].toLowerCase()
      ? -1
      : 1
  );

  return newArray;
};
