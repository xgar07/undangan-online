const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://undangan-api.figartok.workers.dev";

const normalizeEntry = (entry) => {
  if (!entry) return entry;
  return {
    ...entry,
    createdAt: entry.created_at || entry.createdAt,
    invitationId: entry.invitation_id || entry.invitationId
  };
};

export const submitRSVP = async (invitationId, data) => {
  const response = await fetch(`${API_BASE_URL}/api/invitation/${invitationId}/rsvp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Terjadi kesalahan saat mengirim data.');
  }
  return normalizeEntry(result.data);
};

export const getRSVP = async (invitationId) => {
  const response = await fetch(`${API_BASE_URL}/api/invitation/${invitationId}/rsvp`);
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Terjadi kesalahan saat memuat data.');
  }
  return result.data.map(normalizeEntry);
};

export const submitGuestbook = async (invitationId, data) => {
  const response = await fetch(`${API_BASE_URL}/api/invitation/${invitationId}/guestbook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Terjadi kesalahan saat mengirim data.');
  }
  return normalizeEntry(result.data);
};

export const getGuestbook = async (invitationId) => {
  const response = await fetch(`${API_BASE_URL}/api/invitation/${invitationId}/guestbook`);
  const result = await response.json();
  if (!response.ok || !result.success) {
    throw new Error(result.error || 'Terjadi kesalahan saat memuat data.');
  }
  return result.data.map(normalizeEntry);
};

