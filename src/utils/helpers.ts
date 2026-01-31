export function getGreeting(): string {
  const hr = new Date().getHours();
  if (hr < 11) return 'Selamat Pagi';
  if (hr < 15) return 'Selamat Siang';
  if (hr < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
