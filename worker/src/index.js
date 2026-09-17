// Cloudflare Worker API for Undangan Online
// Handles RSVP and Guestbook submissions

const corsHeaders = (env) => ({
  "Access-Control-Allow-Origin": env.FRONTEND_ORIGIN || "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});

const jsonResponse = (data, env, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(env)
    }
  });
};

const errorResponse = (message, env, status = 400) => {
  return jsonResponse({ success: false, error: message }, env, status);
};

export default {
  async fetch(request, env, ctx) {
    // Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(env) });
    }

    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    // Basic Routing: /api/invitation/:invitationId/:resource
    if (pathParts[0] === "api" && pathParts[1] === "invitation" && pathParts.length === 4) {
      const invitationId = pathParts[2];
      const resource = pathParts[3];

      if (resource === "rsvp") {
        if (request.method === "GET") {
          return await getRSVPs(env, invitationId);
        } else if (request.method === "POST") {
          return await postRSVP(request, env, invitationId);
        }
      } else if (resource === "guestbook") {
        if (request.method === "GET") {
          return await getGuestbook(env, invitationId);
        } else if (request.method === "POST") {
          return await postGuestbook(request, env, invitationId);
        }
      }
    }

    return errorResponse("Not Found", env, 404);
  }
};

async function getRSVPs(env, invitationId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT * FROM rsvps WHERE invitation_id = ? ORDER BY created_at DESC`
    ).bind(invitationId).all();
    
    return jsonResponse({ success: true, data: results }, env);
  } catch (error) {
    return errorResponse("Database error", env, 500);
  }
}

async function postRSVP(request, env, invitationId) {
  try {
    const body = await request.json();
    
    // Validation
    const name = (body.name || "").trim();
    if (name.length < 1 || name.length > 100) {
      return errorResponse("Nama wajib diisi dan maksimal 100 karakter.", env);
    }

    const attendance = (body.attendance || "").trim();
    if (!["hadir", "tidak_hadir", "ragu"].includes(attendance)) {
      return errorResponse("Pilihan kehadiran tidak valid.", env);
    }

    let guests = parseInt(body.guests, 10);
    if (attendance === "tidak_hadir") {
      guests = 0;
    } else {
      if (isNaN(guests) || guests < 0 || guests > 5) {
        return errorResponse("Jumlah tamu tidak valid (maksimal 5).", env);
      }
      if (attendance === "hadir" && guests < 1) {
        return errorResponse("Jumlah tamu wajib diisi jika hadir.", env);
      }
    }

    let message = (body.message || "").trim();
    if (message.length > 500) {
      return errorResponse("Pesan terlalu panjang (maksimal 500 karakter).", env);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO rsvps (id, invitation_id, name, attendance, guests, message, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(id, invitationId, name, attendance, guests, message, createdAt).run();

    return jsonResponse({ success: true, data: { id, name, attendance, guests, message, createdAt } }, env, 201);
  } catch (error) {
    return errorResponse("Invalid request or database error", env, 400);
  }
}

async function getGuestbook(env, invitationId) {
  try {
    const { results } = await env.DB.prepare(
      `SELECT * FROM guestbook WHERE invitation_id = ? ORDER BY created_at DESC`
    ).bind(invitationId).all();
    
    return jsonResponse({ success: true, data: results }, env);
  } catch (error) {
    return errorResponse("Database error", env, 500);
  }
}

async function postGuestbook(request, env, invitationId) {
  try {
    const body = await request.json();
    
    // Validation
    const name = (body.name || "").trim();
    if (name.length < 1 || name.length > 100) {
      return errorResponse("Nama wajib diisi dan maksimal 100 karakter.", env);
    }

    const message = (body.message || "").trim();
    if (message.length < 1 || message.length > 500) {
      return errorResponse("Ucapan wajib diisi dan maksimal 500 karakter.", env);
    }

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await env.DB.prepare(
      `INSERT INTO guestbook (id, invitation_id, name, message, created_at)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(id, invitationId, name, message, createdAt).run();

    return jsonResponse({ success: true, data: { id, name, message, createdAt } }, env, 201);
  } catch (error) {
    return errorResponse("Invalid request or database error", env, 400);
  }
}
