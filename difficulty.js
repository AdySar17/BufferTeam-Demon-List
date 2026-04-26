/* Mapa de dificultades → imágenes (compartido por demonlist, level, profile, etc.) */
export const DIFFICULTY_IMAGES = {
  "Extreme Demon": "https://iili.io/KS9tvtI.md.png",
  "Insane Demon":  "https://iili.io/BrsR99a.png",
  "Hard Demon":    "https://iili.io/BrsRHAJ.png",
  "Medium Demon":  "https://iili.io/BrsAp8g.png",
  "Easy Demon":    "https://iili.io/BrsRJwv.png",
};

export const DIFFICULTY_DEFAULT = "Extreme Demon";

export function difficultyImage(diff) {
  const key = (diff && DIFFICULTY_IMAGES[diff]) ? diff : DIFFICULTY_DEFAULT;
  return DIFFICULTY_IMAGES[key];
}

export function difficultyName(diff) {
  return (diff && DIFFICULTY_IMAGES[diff]) ? diff : DIFFICULTY_DEFAULT;
}
