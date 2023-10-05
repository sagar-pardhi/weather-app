const options1 = { weekday: "long", month: "long", day: "numeric" };
export const dateTimeFormat = new Intl.DateTimeFormat("en-US", options1);

export function convertFahrenheitToCelcius(farenheit: number) {
  return (farenheit - 32) * (5 / 9);
}

export function formateDateTime(unix_timestamp: number) {
  let date = new Date(unix_timestamp * 1000);
  return date.toDateString().slice(0, 10);
}
