// collect only the date from the timestamp string, removing the time
// eg. 2021-06-01 11:08:01 =  2021-06-01

type Props = { dateTime: string | undefined };

export default function dateOnly({ dateTime }: Props) {
  if (typeof dateTime === "undefined") return;

  // collecting only the date
  const regEx = /^(.{10}).+/;

  // reform the dateTime to just display the date
  const date = dateTime.replace(regEx, "$1");

  return date;
}
