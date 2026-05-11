# IAldea — Capas Derivadas del MDT

Capas geoespaciales generadas a partir del **Modelo Digital de Terreno INEGI E14D58D1**
(resolución 1.5m, Valles Centrales de Oaxaca).

## Resultados del Procesamiento

| Capa | Archivo | Tamaño | Descripción |
|---|---|---|---|
| Pendientes | `pendientes.tif` | 74.8 MB | Inclinación del terreno en grados (0°–85°) |
| Orientación | `orientacion.tif` | 74.9 MB | Dirección de la ladera en grados desde el Norte |
| Sombreado | `sombreado.tif` | 73.8 MB | Visualización 3D del relieve |
| Riesgo de derrumbe | `riesgo_derrumbe.tif` | 4.6 MB | Clasificación 1–5 de riesgo de deslizamiento |
| Humedad (TWI) | `humedad_twi.tif` | 75.8 MB | Índice de humedad topográfica — zonas inundables |

## Estadísticas clave del territorio

| Métrica | Valor |
|---|---|
| Elevación mínima | 1,504 m |
| Elevación máxima | 2,278 m |
| Elevación media | 1,766 m |
| Desnivel total | 774 m |
| Pendiente media | 19.9° |
| **Área con riesgo alto (>30°)** | **22.6% del territorio = ~963 ha** |
| Laderas orientadas al sur (solar) | 24.4% del territorio |
| Zonas con alta humedad (TWI >p80) | 834 ha |

## Clasificación de riesgo de deslizamiento

| Nivel | Grados | Área (ha) | Descripción |
|---|---|---|---|
| 1 — Bajo | 0–8° | 941.9 | Terreno plano, seguro para construcción |
| 2 — Moderado | 8–15° | 702.2 | Ladera suave, precaución menor |
| 3 — Alto | 15–30° | 1,584.1 | Ladera pronunciada, evaluar antes de construir |
| 4 — Muy alto | 30–45° | 816.2 | Zona de riesgo activo de deslizamiento |
| 5 — Crítico | >45° | 126.9 | Acantilado, no apto para ningún uso |

## Cómo usar estas capas

```python
import rasterio
import numpy as np

# Cargar el mapa de riesgo
with rasterio.open("derivados/riesgo_derrumbe.tif") as src:
    riesgo = src.read(1)
    transform = src.transform

# Zonas críticas (nivel 4 y 5)
zonas_criticas = (riesgo >= 4)
print(f"Área en riesgo crítico: {zonas_criticas.sum() * 1.5 * 1.5 / 10000:.1f} ha")
```

## Fuente

- **MDT:** INEGI, Modelo Digital de Elevación Tipo Terreno, resolución 1.5m, clave E14D58D1, 2024
- **Zona:** Valles Centrales de Oaxaca (~16.876°N, -96.667°O), cercano a Tlacolula de Matamoros
- **Licencia:** Uso conforme a términos INEGI: https://www.inegi.org.mx/inegi/terminos.html

> Los archivos `.tif` no están en el repositorio por su tamaño (~75 MB c/u).
> Ejecutar `scripts/generar_capas_mdt.py` para regenerarlos desde el MDT original.

---
*Generado por IAldea — ETH Cinco de Mayo Pop-Up City, Puerto Escondido, mayo 2026*
