// Converts the first letter into capital

export default function capitaliseString(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
