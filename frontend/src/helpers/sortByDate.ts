// return array of objects with sorted date by oldest or newest date
// Arguments must be array of objects containing the date property such as created_on to compare
//  - date value could be eg. 1952-07-20 12:22:04
//    -iK however I think you might have to parse the timestamp first & remove T & Z from the date, but will only know when tested
//  - you can replace created_on to match the correct property date within this function if need be
type Props = {
  created_on: string | number;
  [otherProperties: string | number]: any;
};

/****************** */
// oldest date first (Ascending)
/****************** */
export const sortDateByOldestFirst_array = (arrayOfObjects: Array<Props>) => {
  const newArray = [...arrayOfObjects];

  newArray.sort((a: Props, b: Props) => (a.created_on < b.created_on ? -1 : 1));

  return newArray;
};

/****************** */
// newest date first (Decending)
/****************** */
export const sortDateByNewestFirst_array = (arrayOfObjects: Array<Props>) => {
  const newArray = [...arrayOfObjects];

  newArray.sort((a: Props, b: Props) => (a.created_on > b.created_on ? -1 : 1));

  return newArray;
};
