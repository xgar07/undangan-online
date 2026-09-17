CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  invitation_id TEXT NOT NULL,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK(attendance IN ('hadir', 'tidak_hadir', 'ragu')),
  guests INTEGER NOT NULL DEFAULT 1,
  message TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS guestbook (
  id TEXT PRIMARY KEY,
  invitation_id TEXT NOT NULL,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rsvps_invitation ON rsvps(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guestbook_invitation ON guestbook(invitation_id);
CREATE INDEX IF NOT EXISTS idx_guestbook_created ON guestbook(created_at);
