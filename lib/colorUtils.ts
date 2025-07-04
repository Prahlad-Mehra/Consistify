// utils/colorUtils.js
export function lightenColor(hex:string, amount:number = 0.85):string {
  let r = 0, g = 0, b = 0;

  // Remove # if present
  if (hex[0] === '#') hex = hex.slice(1);

  // Parse 3-digit hex
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  }
  // Parse 6-digit hex
  else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  // Blend with white
  r = Math.round(r + (255 - r) * amount);
  g = Math.round(g + (255 - g) * amount);
  b = Math.round(b + (255 - b) * amount);

  return `rgb(${r}, ${g}, ${b})`;
}
