export function isSessionLive(startTime, endTime) {
  const now = new Date();

  return (
    now >= new Date(startTime) &&
    now <= new Date(endTime)
  );
}