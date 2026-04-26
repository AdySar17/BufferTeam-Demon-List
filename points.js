/* ============================================================
 *  BFT Demon List — Cálculo automático de puntos por posición
 *
 *  Curva (piecewise log-lineal) — versión "exclusiva top":
 *    Anclas (posición → puntos):
 *
 *       Pos     Puntos
 *       1       50000
 *       2       47500
 *       3       45500
 *       5       42500
 *       10      38000
 *       25      27000      ← caída extrema 1-25
 *       50      18000
 *       75      13500
 *       100     10000      ← caída fuerte 25-100
 *       150      8200
 *       200      7000
 *       300      5600
 *       500      4200      ← caída media-fuerte 100-500
 *       750      3200
 *       1000     2500      ← caída media 500-1000
 *       1500     1800
 *       2000     1300
 *       3000      850      ← caída media-suave 1000-3000
 *       4000      500
 *       5000      300
 *       6000      180      ← caída baja 3000-6000
 *       7000      100
 *       8000       45
 *       9000       15
 *       10000       5      ← caída muy baja pero constante 6000-10000
 *
 *    Entre dos anclas (p1 → v1) y (p2 → v2) interpolamos
 *    LINEALMENTE en escala log(p):
 *
 *        t = (ln(p) - ln(p1)) / (ln(p2) - ln(p1))
 *        v = v1 + (v2 - v1) * t
 *
 *    Caída suave dentro de cada tramo, monótona decreciente, sin
 *    saltos en las anclas.
 *
 *  Garantías:
 *    • computePoints(1)     = 50000
 *    • computePoints(10000) = 5
 *    • Nunca devuelve negativos.
 *    • Mejor posición ⇒ más puntos (orden estricto).
 *    • Redondeo a máximo 1 decimal.
 *    • Las posiciones > 10000 quedan congeladas en 5.
 * ============================================================ */

/* (posición, puntos) — DEBEN estar ordenadas por posición ascendente
 * y por puntos descendente. */
const ANCHORS = [
  [    1, 50000],
  [    2, 47500],
  [    3, 45500],
  [    5, 42500],
  [   10, 38000],
  [   25, 27000],
  [   50, 18000],
  [   75, 13500],
  [  100, 10000],
  [  150,  8200],
  [  200,  7000],
  [  300,  5600],
  [  500,  4200],
  [  750,  3200],
  [ 1000,  2500],
  [ 1500,  1800],
  [ 2000,  1300],
  [ 3000,   850],
  [ 4000,   500],
  [ 5000,   300],
  [ 6000,   180],
  [ 7000,   100],
  [ 8000,    45],
  [ 9000,    15],
  [10000,     5],
];

export const TOP_POINTS    = ANCHORS[0][1];                  // 50000
export const BOTTOM_POINTS = ANCHORS[ANCHORS.length - 1][1]; //     5
export const MAX_POSITIONS = ANCHORS[ANCHORS.length - 1][0]; // 10000

function round1(v) {
  /* Máximo 1 decimal, nunca negativo. */
  if (!Number.isFinite(v) || v <= 0) return 0;
  return Math.round(v * 10) / 10;
}

export function computePoints(position) {
  const p = Number(position);
  if (!Number.isFinite(p) || p < 1) return 0;
  if (p >= MAX_POSITIONS) return BOTTOM_POINTS;

  /* Buscar el tramo [p1, p2] que contiene p. */
  for (let i = 1; i < ANCHORS.length; i++) {
    const [p1, v1] = ANCHORS[i - 1];
    const [p2, v2] = ANCHORS[i];
    if (p <= p2) {
      if (p === p1) return round1(v1);
      if (p === p2) return round1(v2);
      const lp = Math.log(p);
      const l1 = Math.log(p1);
      const l2 = Math.log(p2);
      const t  = (lp - l1) / (l2 - l1);
      return round1(v1 + (v2 - v1) * t);
    }
  }
  return BOTTOM_POINTS;
}

/* Sin export default a propósito: usar imports nombrados. */
