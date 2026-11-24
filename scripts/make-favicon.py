"""Writes the SL monogram favicons (calm and blacklight) from the Anton glyph outlines.

Usage: python3 scripts/make-favicon.py (needs fonttools). Only needed if the monogram or the colours change.
"""
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

SITE = Path(__file__).resolve().parent.parent / "site"
font = TTFont(SITE / "assets/fonts/Anton-Regular.woff")
glyphs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]

names = [cmap[ord(c)] for c in "SL"]
gap = 0.04 * font["head"].unitsPerEm
offsets, x = [], 0.0
for n in names:
    offsets.append(x)
    x += hmtx[n][0] + gap

bounds = BoundsPen(glyphs)
for n, dx in zip(names, offsets):
    glyphs[n].draw(TransformPen(bounds, (1, 0, 0, 1, dx, 0)))
x0, y0, x1, y1 = bounds.bounds

SIZE, BOX_W, BOX_H = 32, 23, 22
s = min(BOX_W / (x1 - x0), BOX_H / (y1 - y0))
tx = (SIZE - (x1 - x0) * s) / 2 - x0 * s
ty = (SIZE + (y1 - y0) * s) / 2 + y0 * s

pen = SVGPathPen(glyphs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
for n, dx in zip(names, offsets):
    glyphs[n].draw(TransformPen(pen, (s, 0, 0, -s, tx + dx * s, ty)))
d = pen.getCommands()

for name, paper, ink in (("favicon.svg", "#D9D5D0", "#191B14"), ("favicon-uv.svg", "#10062A", "#C8FF2E")):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {SIZE} {SIZE}"><rect width="{SIZE}" height="{SIZE}" fill="{paper}"/><path fill="{ink}" d="{d}"/></svg>\n'
    (SITE / "assets/img" / name).write_text(svg)
    print("wrote", name, len(svg), "bytes")
