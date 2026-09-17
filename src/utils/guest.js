export const getGuestName = () => {
  if (typeof window === 'undefined') return 'Tamu Undangan';
  const urlParams = new URLSearchParams(window.location.search);
  const kpd = urlParams.get('kpd');
  return kpd ? decodeURIComponent(kpd) : 'Tamu Undangan';
};
