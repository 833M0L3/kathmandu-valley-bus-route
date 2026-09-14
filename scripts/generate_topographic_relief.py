import numpy as np
from PIL import Image, ImageDraw

def generate_topo_relief(output_path="public/topographic_relief.png", w=3168, h=2448):
    print(f"Generating high-res topographic relief ({w}x{h} px)...")
    x = np.linspace(0, 1, w, dtype=np.float32)
    y = np.linspace(0, 1, h, dtype=np.float32)
    xx, yy = np.meshgrid(x, y)

    noise = (
        0.06 * np.sin(18.0 * xx + 12.0 * yy) +
        0.04 * np.cos(32.0 * xx - 24.0 * yy) +
        0.03 * np.sin(55.0 * xx + 45.0 * yy) +
        0.02 * np.cos(80.0 * xx - 70.0 * yy)
    )

    cx, cy = 0.48, 0.52
    dx = (xx - cx) / 0.38 + noise * 0.4
    dy = (yy - cy) / 0.32 + noise * 0.4
    dist_bowl = np.sqrt(dx**2 + dy**2)

    elevation = 1350.0 + 800.0 * np.clip((dist_bowl - 0.68) / 0.45, 0, 1.0)**1.8

    # Mountain ranges surrounding Kathmandu Valley
    # 1. Shivapuri (North)
    r_shiva = np.sqrt(((xx - 0.54)/0.20)**2 + ((yy - 0.05)/0.09)**2) + noise * 0.25
    elev_shiva = 1050.0 * np.exp(-(r_shiva / 0.75)**2)

    # 2. Nagarjun (Northwest)
    r_nagar = np.sqrt(((xx - 0.17)/0.10)**2 + ((yy - 0.12)/0.09)**2) + noise * 0.2
    elev_nagar = 750.0 * np.exp(-(r_nagar / 0.70)**2)

    # 3. Chandragiri (West)
    r_chandra = np.sqrt(((xx - 0.04)/0.08)**2 + ((yy - 0.55)/0.24)**2) + noise * 0.2
    elev_chandra = 950.0 * np.exp(-(r_chandra / 0.75)**2)

    # 4. Phulchowki (South)
    r_phul = np.sqrt(((xx - 0.62)/0.18)**2 + ((yy - 0.95)/0.11)**2) + noise * 0.25
    elev_phul = 1150.0 * np.exp(-(r_phul / 0.75)**2)

    # 5. Champadevi (Southwest)
    r_champa = np.sqrt(((xx - 0.27)/0.10)**2 + ((yy - 0.89)/0.10)**2) + noise * 0.2
    elev_champa = 800.0 * np.exp(-(r_champa / 0.70)**2)

    # 6. Nagarkot (East)
    r_nagar_e = np.sqrt(((xx - 0.94)/0.10)**2 + ((yy - 0.40)/0.20)**2) + noise * 0.2
    elev_nagar_e = 820.0 * np.exp(-(r_nagar_e / 0.75)**2)

    elevation += elev_shiva + elev_nagar + elev_chandra + elev_phul + elev_champa + elev_nagar_e

    # Hillshade calculation (NW sun at 315 deg azimuth, 45 deg altitude)
    gy, gx = np.gradient(elevation * 0.18)
    slope = np.arctan(np.sqrt(gx**2 + gy**2))
    aspect = np.arctan2(-gy, gx)
    altitude = np.radians(45.0)
    azimuth = np.radians(315.0)
    shade = np.sin(altitude) * np.cos(slope) + np.cos(altitude) * np.sin(slope) * np.cos(azimuth - aspect)
    shade = np.clip((shade + 1.0) / 2.0, 0, 1.0)

    mountain_mask = np.clip((elevation - 1370.0) / 300.0, 0, 1.0)

    # Central valley bowl background color matching the SVG canvas #f0f5fa:
    base_r = 240.0
    base_g = 245.0
    base_b = 250.0

    r = base_r - mountain_mask * (1.0 - shade) * 45.0
    g = base_g - mountain_mask * (1.0 - shade) * 40.0
    b = base_b - mountain_mask * (1.0 - shade) * 35.0

    # Contours every 100m and index contours every 500m across terrain
    is_regular_contour = (np.abs(np.mod(elevation, 100.0)) < 3.2) & (elevation > 1400.0)
    is_index_contour = (np.abs(np.mod(elevation, 500.0)) < 4.2) & (elevation > 1400.0)

    r[is_regular_contour] *= 0.93
    g[is_regular_contour] *= 0.93
    b[is_regular_contour] *= 0.93

    r[is_index_contour] *= 0.86
    g[is_index_contour] *= 0.86
    b[is_index_contour] *= 0.86

    canvas = np.stack([r, g, b], axis=-1).astype(np.uint8)
    img_topo = Image.fromarray(canvas)
    draw = ImageDraw.Draw(img_topo)

    # Bagmati River line
    bagmati_pts = [
        (int(0.74 * w), int(0.30 * h)),
        (int(0.66 * w), int(0.38 * h)),
        (int(0.58 * w), int(0.48 * h)),
        (int(0.52 * w), int(0.52 * h)),
        (int(0.46 * w), int(0.55 * h)),
        (int(0.42 * w), int(0.62 * h)),
        (int(0.38 * w), int(0.70 * h)),
        (int(0.35 * w), int(0.80 * h)),
    ]
    draw.line(bagmati_pts, fill='#93c5fd', width=int(w * 0.002))

    # Bishnumati River line
    bishnumati_pts = [
        (int(0.45 * w), int(0.24 * h)),
        (int(0.43 * w), int(0.34 * h)),
        (int(0.42 * w), int(0.44 * h)),
        (int(0.46 * w), int(0.55 * h)),
    ]
    draw.line(bishnumati_pts, fill='#93c5fd', width=int(w * 0.0015))

    img_topo.save(output_path, "PNG", optimize=True)
    print(f"Saved {output_path} ({w}x{h} px)")

if __name__ == "__main__":
    generate_topo_relief()
