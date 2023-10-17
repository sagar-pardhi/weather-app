interface IOptions {
  weekday: "long" | "short" | "narrow";
  month: "long" | "short" | "narrow";
  day: "numeric" | "2-digit" | undefined;
}

const options: IOptions = { weekday: "long", month: "long", day: "numeric" };
export const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

export function convertFahrenheitToCelcius(farenheit: number) {
  return (farenheit - 32) * (5 / 9);
}

export function formateDateTime(unix_timestamp: number) {
  let date = new Date(unix_timestamp * 1000);
  return date.toDateString().slice(0, 10);
}
