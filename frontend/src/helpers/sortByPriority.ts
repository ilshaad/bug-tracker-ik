// return array of objects with sorted prioirty alphabetically by ascending or decending
//  - but also sorted by title order by using another sort naming function
// First arguments must be array of objects containing the priority property

import { sortNameByAscendingOrder_array } from "./sortByAlphabet";

type Props = {
  [anyProperties: string]: any;
  priority?: string;
};

/****************** */
// Ascending order High > Medium > Low
/****************** */
export const sortPriorityByAscendingOrder_array = (
  arrayOfObjects: Array<Props>
) => {
  // sort array by name (alphabetically) first
  // Using another sorting function (I created) to sort title order as name order
  const titleSortOrder_array = sortNameByAscendingOrder_array(
    arrayOfObjects,
    "title"
  );

  // separate array by three priorities (High / Medium / Low)
  // * All the prop types here are basically array full of object item. The object is the ticket but for some reason error would occur in .map() if I used Array<ticket_type>
  const High_array: Array<{}> = [];
  const Medium_array: Array<any> = [];
  const Low_array: {}[] = [];

  titleSortOrder_array.map((item) => {
    if (item.priority === "High") High_array.push(item);

    if (item.priority === "Medium") Medium_array.push(item);

    if (item.priority === "Low") Low_array.push(item);
  });

  // join the three priorities together in order of High > Medium > Low
  return [...High_array, ...Medium_array, ...Low_array];
};

/****************** */
// Descending order Low > Medium > High
/****************** */
export const sortPriorityByDescendingOrder_array = (
  arrayOfObjects: Array<Props>
) => {
  // sort array by name (alphabetically) first
  // Using another sorting function (I created) to sort title order as name order
  const titleSortOrder_array = sortNameByAscendingOrder_array(
    arrayOfObjects,
    "title"
  );

  // separate array by three priorities (Low / Medium / High)
  // * All the prop types here are basically array full of object item. The object is the ticket but for some reason error would occur in .map() if I used Array<ticket_type>
  const Low_array: {}[] = [];
  const Medium_array: Array<any> = [];
  const High_array: Array<{}> = [];

  titleSortOrder_array.map((item) => {
    if (item.priority === "Low") Low_array.push(item);

    if (item.priority === "Medium") Medium_array.push(item);

    if (item.priority === "High") High_array.push(item);
  });

  // join the three priorities together in order of Low > Medium > High
  return [...Low_array, ...Medium_array, ...High_array];
};
