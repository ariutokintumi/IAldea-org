"""
IAldea — Generador de capas derivadas del MDT
==============================================
Procesa el Modelo Digital de Terreno del INEGI (1.5m resolución)
para producir capas útiles para la comunidad:
  - pendientes.tif      → Zonas de riesgo de deslizamiento
  - sombreado.tif       → Visualización del relieve
  - orientacion.tif     → Aptitud para paneles solares
  - riesgo_derrumbe.tif → Clasificación de riesgo por pendiente

Fuente: INEGI MDT E14D58D1, Valles Centrales de Oaxaca, 2024
Resolución: 1.5m por píxel
Área: ~42.7 km² (6.1km × 7.0km) cerca de Tlacolula de Matamoros
"""

import os
import sys
import numpy as np
import rasterio
from rasterio.transform import from_bounds
import warnings
warnings.filterwarnings("ignore")

# ── Rutas ──────────────────────────────────────────────────────────────────────
BASE_DIR   = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INPUT_TIF  = os.path.join(BASE_DIR, "conjunto_de_datos", "e14d58d1_mt.tif")
OUTPUT_DIR = os.path.join(BASE_DIR, "derivados")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Helpers ────────────────────────────────────────────────────────────────────

def leer_mdt():
    """Lee el GeoTIFF y retorna (data, perfil, resolucion_metros)."""
    print(f"📂 Leyendo MDT: {INPUT_TIF}")
    with rasterio.open(INPUT_TIF) as src:
        data    = src.read(1).astype(np.float32)
        profile = src.profile.copy()
        res_x   = abs(src.transform.a)
        res_y   = abs(src.transform.e)
        nodata  = src.nodata

    # Reemplazar NoData con NaN
    if nodata is not None:
        data[data == nodata] = np.nan

    print(f"   Dimensiones : {data.shape[1]} × {data.shape[0]} píxeles")
    print(f"   Resolución  : {res_x:.1f}m × {res_y:.1f}m")
    print(f"   Elevación   : {np.nanmin(data):.0f}m – {np.nanmax(data):.0f}m")
    print(f"   Media       : {np.nanmean(data):.0f}m\n")
    return data, profile, res_x, res_y


def guardar_tif(array, perfil, nombre, descripcion, nodata_val=-9999.0):
    """Guarda un array como GeoTIFF con el mismo CRS del MDT original."""
    ruta = os.path.join(OUTPUT_DIR, nombre)
    out_profile = perfil.copy()
    out_profile.update(dtype=rasterio.float32, count=1, nodata=nodata_val)

    result = array.copy()
    result[np.isnan(result)] = nodata_val

    with rasterio.open(ruta, "w", **out_profile) as dst:
        dst.write(result.astype(np.float32), 1)
        dst.update_tags(descripcion=descripcion, fuente="INEGI MDT E14D58D1",
                        resolucion="1.5m", zona="Tlacolula, Oaxaca")
    print(f"   ✅ Guardado: {nombre}  ({os.path.getsize(ruta)/1024/1024:.1f} MB)")
    return ruta


# ── Capa 1: Pendientes (Slope) ─────────────────────────────────────────────────

def calcular_pendiente(dem, res_x, res_y):
    """
    Pendiente en grados usando diferencias finitas de 8 vecinos (algoritmo Horn).
    Entrada: DEM en metros. Salida: grados (0–90°).
    """
    print("📐 Calculando pendientes...")
    dz_dx = np.gradient(dem, axis=1) / res_x   # cambio elevación en X
    dz_dy = np.gradient(dem, axis=0) / res_y   # cambio elevación en Y
    slope_rad = np.arctan(np.sqrt(dz_dx**2 + dz_dy**2))
    slope_deg = np.degrees(slope_rad)
    slope_deg[np.isnan(dem)] = np.nan

    # Estadísticas
    v = slope_deg[~np.isnan(slope_deg)]
    print(f"   Pendiente mín/máx : {v.min():.1f}° / {v.max():.1f}°")
    print(f"   Pendiente media   : {v.mean():.1f}°")
    pct_riesgo = (v > 30).sum() / len(v) * 100
    print(f"   Área con >30°     : {pct_riesgo:.1f}%  ← zona de riesgo de deslizamiento\n")
    return slope_deg


# ── Capa 2: Orientación (Aspect) ───────────────────────────────────────────────

def calcular_orientacion(dem, res_x, res_y):
    """
    Orientación de la ladera en grados desde el Norte (0°=N, 90°=E, 180°=S, 270°=O).
    Útil para identificar laderas con mayor insolación (sur-suroeste en el hemisferio norte).
    """
    print("🧭 Calculando orientación de laderas...")
    dz_dx = np.gradient(dem, axis=1) / res_x
    dz_dy = np.gradient(dem, axis=0) / res_y
    aspect = np.degrees(np.arctan2(-dz_dy, dz_dx))
    aspect = (90 - aspect) % 360  # convertir a Norte=0
    aspect[np.isnan(dem)] = np.nan

    # Laderas con mayor sol (135°–225° = sur/suroeste)
    laderas_sur = ((aspect >= 135) & (aspect <= 225) & ~np.isnan(aspect)).sum()
    total = (~np.isnan(aspect)).sum()
    print(f"   Laderas orientadas al sur (135°–225°): {laderas_sur/total*100:.1f}%  ← mejor para paneles solares\n")
    return aspect


# ── Capa 3: Sombreado del relieve (Hillshade) ──────────────────────────────────

def calcular_hillshade(dem, res_x, res_y, azimuth=315, altitud=45):
    """
    Sombra del relieve simulando luz solar desde el noroeste (azimuth 315°, altitud 45°).
    Produce una visualización 3D del terreno.
    """
    print(f"☀️  Calculando sombreado (azimuth={azimuth}°, altitud={altitud}°)...")
    az_rad  = np.radians(360 - azimuth + 90)
    alt_rad = np.radians(altitud)

    dz_dx = np.gradient(dem, axis=1) / res_x
    dz_dy = np.gradient(dem, axis=0) / res_y

    slope_rad  = np.arctan(np.sqrt(dz_dx**2 + dz_dy**2))
    aspect_rad = np.arctan2(-dz_dy, dz_dx)

    hillshade = (np.cos(alt_rad) * np.cos(slope_rad) +
                 np.sin(alt_rad) * np.sin(slope_rad) *
                 np.cos(az_rad - aspect_rad))

    hillshade = np.clip(hillshade * 255, 0, 255)
    hillshade[np.isnan(dem)] = np.nan
    print("   Sombreado generado (escala 0–255)\n")
    return hillshade


# ── Capa 4: Clasificación de Riesgo por Pendiente ─────────────────────────────

def clasificar_riesgo(slope_deg):
    """
    Clasifica el terreno según riesgo de deslizamiento:
      1 = Bajo      (0–8°)   — Terreno plano, seguro para construcción
      2 = Moderado  (8–15°)  — Ladera suave
      3 = Alto      (15–30°) — Ladera pronunciada, precaución
      4 = Muy alto  (30–45°) — Zona de riesgo activo
      5 = Crítico   (>45°)   — Acantilado / pared vertical
    """
    print("🚦 Clasificando zonas de riesgo de deslizamiento...")
    riesgo = np.full_like(slope_deg, np.nan)
    riesgo[slope_deg <   8] = 1  # Bajo
    riesgo[(slope_deg >=  8) & (slope_deg < 15)] = 2  # Moderado
    riesgo[(slope_deg >= 15) & (slope_deg < 30)] = 3  # Alto
    riesgo[(slope_deg >= 30) & (slope_deg < 45)] = 4  # Muy alto
    riesgo[slope_deg >= 45] = 5  # Crítico

    for nivel, nombre in [(1,"Bajo"), (2,"Moderado"), (3,"Alto"), (4,"Muy alto"), (5,"Crítico")]:
        n = (riesgo == nivel).sum()
        ha = n * 1.5 * 1.5 / 10000  # 1.5m píxeles → hectáreas
        print(f"   Riesgo {nombre:8s} ({nivel}): {n:7,} píxeles = {ha:6.1f} ha")
    print()
    return riesgo


# ── Capa 5: Topographic Wetness Index (TWI) — Zonas inundables ────────────────

def calcular_twi(slope_deg):
    """
    Índice Topográfico de Humedad simplificado.
    TWI alto → acumulación de agua → mayor riesgo de inundación/encharcamiento.
    TWI = ln(área_acumulada / tan(pendiente))
    Aproximación: usamos la pendiente local como proxy (TWI = -log(tan(slope)))
    """
    print("🌊 Calculando índice de humedad topográfica (TWI)...")
    slope_rad = np.radians(np.clip(slope_deg, 0.1, 89.9))  # evitar tan(0)
    twi = -np.log(np.tan(slope_rad))  # valores altos = zonas bajas/planas/húmedas
    twi[np.isnan(slope_deg)] = np.nan

    v = twi[~np.isnan(twi)]
    percentil_80 = np.percentile(v, 80)
    zonas_hum = (twi > percentil_80).sum()
    ha = zonas_hum * 1.5 * 1.5 / 10000
    print(f"   Zonas con alta humedad (percentil >80%): {ha:.1f} ha\n")
    return twi


# ── Main ───────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("  IAldea — Procesamiento del MDT INEGI")
    print("  Valles Centrales de Oaxaca — E14D58D1")
    print("=" * 60 + "\n")

    dem, profile, res_x, res_y = leer_mdt()

    # Calcular todas las capas
    slope   = calcular_pendiente(dem, res_x, res_y)
    aspect  = calcular_orientacion(dem, res_x, res_y)
    shade   = calcular_hillshade(dem, res_x, res_y)
    riesgo  = clasificar_riesgo(slope)
    twi     = calcular_twi(slope)

    # Guardar resultados
    print("💾 Guardando capas derivadas...")
    guardar_tif(slope,  profile, "pendientes.tif",
                "Pendiente en grados — zonas de riesgo de deslizamiento")
    guardar_tif(aspect, profile, "orientacion.tif",
                "Orientación de laderas en grados desde el Norte — aptitud solar")
    guardar_tif(shade,  profile, "sombreado.tif",
                "Sombreado del relieve (hillshade) — visualización 3D")
    guardar_tif(riesgo, profile, "riesgo_derrumbe.tif",
                "Clasificación 1-5 de riesgo de deslizamiento por pendiente")
    guardar_tif(twi,    profile, "humedad_twi.tif",
                "Índice Topográfico de Humedad — zonas con riesgo de inundación")

    print(f"\n✅ 5 capas generadas en: {OUTPUT_DIR}")
    print("\nResumen para IAldea:")
    print("  📐 pendientes.tif     → Mapa de riesgo para desastres e infraestructura")
    print("  🧭 orientacion.tif    → Zonas ideales para paneles solares")
    print("  ☀️  sombreado.tif      → Mapa visual del territorio")
    print("  🚦 riesgo_derrumbe.tif→ Clasificación 1-5 de seguridad del terreno")
    print("  🌊 humedad_twi.tif    → Zonas con mayor acumulación de agua")


if __name__ == "__main__":
    main()
