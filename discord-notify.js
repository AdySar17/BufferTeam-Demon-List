/* Helper que envía un mensaje (texto y/o embeds) a Discord a través del
   endpoint del API server. Mantiene la URL del webhook en el servidor. */

/**
 * @param {object|string} payload
 *   Si es string → se envía como `content`.
 *   Si es objeto → { content?: string, embeds?: object[], target?: "levels"|"records" }
 *   target "levels"  → DISCORD_WEBHOOK_URL          (por defecto)
 *   target "records" → DISCORD_WEBHOOKRECORDS_URL
 */
export async function notifyDiscord(payload) {
  const body = typeof payload === "string" ? { content: payload } : (payload || {});
  if (body.content) body.content = String(body.content).slice(0, 1900);
  try {
    const r = await fetch("/api/discord/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      console.warn("[discord] webhook devolvió", r.status);
    }
  } catch (e) {
    console.warn("[discord] fallo al notificar:", e);
  }
}
