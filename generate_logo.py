import math
import shutil
from PIL import Image

# 1. Ensure manager.jpeg is in public/images
shutil.copy('manager.jpeg', 'atv-website/public/images/manager.jpeg')
print('Copied manager.jpeg')

# 2. Coordinates from 3D Animated Logo Wallpaper
band = [[185,365],[405,430],[625,365],[580,445],[405,458],[230,445]]
legL = [[185,365],[230,445],[120,610],[190,618],[285,492],[375,492],[270,648],[12,648]]
legR = [[810-p[0], p[1]] for p in legL]
top  = [[405,98],[445,110],[595,322],[405,395],[215,322],[365,110]]
hole = [[405,190],[495,300],[405,355],[315,300]]

def pts_to_d(pts):
    return 'M ' + ' L '.join(f'{x},{y}' for x, y in pts) + ' Z'

def hole_to_d(pts):
    return 'M ' + ' L '.join(f'{x},{y}' for x, y in reversed(pts)) + ' Z'

gc_x, gc_y = 405, 390
N = 36
K = math.tanh(2.2)

def make_gear_path(samples=720):
    outer = []
    inner = []
    for k in range(samples):
        t = 2 * math.pi * k / samples
        r_out = 382 + 17 * math.tanh(2.2 * math.cos(N * t)) / K + 8
        r_in  = 382 + 17 * math.tanh(2.2 * math.cos(N * t)) / K - 8
        x_o = gc_x + r_out * math.cos(t - math.pi/2)
        y_o = gc_y + r_out * math.sin(t - math.pi/2)
        x_i = gc_x + r_in * math.cos(t - math.pi/2)
        y_i = gc_y + r_in * math.sin(t - math.pi/2)
        outer.append((x_o, y_o))
        inner.append((x_i, y_i))
    
    d = 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x, y in outer) + ' Z '
    d += 'M ' + ' L '.join(f'{x:.1f},{y:.1f}' for x, y in reversed(inner)) + ' Z'
    return d

gear_d = make_gear_path()
rr = 330

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 -20 840 840" width="100%" height="100%">
  <defs>
    <linearGradient id="atvRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF3B30" />
      <stop offset="50%" stop-color="#E53935" />
      <stop offset="100%" stop-color="#C62828" />
    </linearGradient>
    <filter id="atvGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#E53935" flood-opacity="0.35"/>
    </filter>
  </defs>
  <!-- Inner Ring -->
  <circle cx="{gc_x}" cy="{gc_y}" r="{rr}" stroke="url(#atvRedGrad)" stroke-width="8" fill="none" opacity="0.9"/>
  <!-- Gear Teeth Ring -->
  <path d="{gear_d}" fill="url(#atvRedGrad)" fill-rule="evenodd" />
  <!-- Central Stylized A -->
  <g fill="url(#atvRedGrad)" filter="url(#atvGlow)">
    <path d="{pts_to_d(band)}" />
    <path d="{pts_to_d(legL)}" />
    <path d="{pts_to_d(legR)}" />
    <path d="{pts_to_d(top)} {hole_to_d(hole)}" fill-rule="evenodd" />
  </g>
</svg>'''

for path in [
    'atv-website/public/images/logo.svg',
    'atv-website/public/logo.svg',
    'atv-website/public/favicon.svg',
    'atv-website/src/assets/logo.svg'
]:
    with open(path, 'w', encoding='utf-8') as f:
        f.write(svg)

print('Saved SVG logo to all locations.')
