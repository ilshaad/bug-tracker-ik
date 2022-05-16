// return array of objects with sorted prioirty alphabetically by ascending or decending
// First arguments must be array of objects containing the priority property

type Props = {
  priority: string;
  [anyProperties: string | number]: any;
};

/****************** */
// Ascending order a b c
/****************** */
export const sortPriorityByAscendingOrder_array = (
  arrayOfObjects: Array<Props>
) => {
  const newArray = [...arrayOfObjects];

  // TODO

  // newArray.sort((a: Props, b: Props) =>
  //   a.priority < b.priority ? -1 : 1
  // );

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
    a[targetedProperty] > b[targetedProperty] ? -1 : 1
  );

  return newArray;
};
