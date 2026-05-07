function pad(value) {
  return String(value).padStart(2, "0");
}

export function formatCreatedAt(isoString) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return "不明な日時";
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const seconds = pad(date.getSeconds());
  return `${year}/${month}/${day} ${hours}:${seconds}`;
}

