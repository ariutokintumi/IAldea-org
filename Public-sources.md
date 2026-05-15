# public-sources.md
## IAldea — Catálogo de fuentes públicas
### docs/public-sources.md

> El catálogo define qué fuentes públicas puede ingerir o consultar IAldea.
>
> Pregunta de diseño que guía este documento:
> **¿De dónde sabe IAldea lo que dice saber?**

**Versión:** 1.0.0
**Fecha:** [2026-05-13]
**Mantenedor:** [nombre + rol]

---

## 1. Definición

Una fuente pública es cualquier fuente de información que IAldea puede consultar
o ingerir para responder preguntas, registrar contexto o citar en una respuesta.

Para que una fuente sea usada por IAldea debe cumplir tres condiciones:

1. Estar catalogada en este documento o en `config/sources.example.yaml`.
2. Tener estado `active` y trust level asignado.
3. Haber pasado el proceso de aprobación definido en la sección 7.

Una fuente no catalogada, pendiente o comprometida no puede usarse como base factual.

---

## 2. Tipos de fuente

| Tipo | Descripción | Ejemplos |
|---|---|---|
| federal_statistics | Estadísticas y datos de instituciones federales. | INEGI, CONEVAL, SESNSP |
| federal_portal | Portales de gobierno federal con información oficial. | gob.mx, DOF, Diario Oficial |
| state_portal | Portales de gobierno estatal. | Secretarías de estado, gacetas estatales |
| municipal_portal | Portales de gobierno municipal. | Ayuntamientos, catastros municipales |
| community_document | Documento aprobado por la comunidad. | Reglamentos, acuerdos, padrones internos |
| assembly_record | Acta o minuta de asamblea con quórum válido. | Minutas firmadas, actas de sesión |
| open_data | Datos abiertos verificables. | datos.gob.mx, APIs públicas |
| budget_public | Presupuestos y cuentas públicas. | Egresos, transparencia presupuestal |
| administrative_procedure | Procedimientos administrativos públicos. | Trámites, reglamentos, lineamientos |
| geospatial | Mapas y datos geoespaciales. | INEGI cartografía, CONAGUA |
| climate_data | Datos climáticos y ambientales. | SMN, CONAGUA, SEMARNAT |
| official_announcement | Anuncios e informes institucionales. | Comunicados de prensa oficiales |
| legal_public | Documentos legales o judiciales públicos. | Leyes, reglamentos, jurisprudencia pública |

**Nota sobre fuentes legales:**
Las fuentes legales y judiciales pueden citarse como información pública.
IAldea no las interpreta como asesoría legal ni determina responsabilidades a partir de ellas.

**Nota sobre fuentes geoespaciales y de seguridad:**
Estas fuentes requieren revisión de privacidad obligatoria antes de activarse
(ver sección 7, paso 4).

---

## 3. Niveles de confianza (trust level)

| Trust | Tipo de fuente | Uso permitido |
|---|---|---|
| 1 | Fuente pública oficial con timestamp verificable | Puede usarse como fuente factual prioritaria. |
| 2 | Documento aprobado por la comunidad | Puede usarse como fuente comunitaria validada. |
| 3 | Acta o minuta de asamblea con quórum válido | Puede usarse como registro formal comunitario. |
| 4 | Feedback ciudadano autorizado | Puede usarse para patrones agregados, no como hecho definitivo. |
| 5 | Inferencia del modelo de IA | Solo puede mostrarse como inferencia, nunca como hecho confirmado. |

El trust level lo valida Validadoría o el proceso de gobernanza definido por la comunidad.
Admin técnico puede proponer un trust level, pero no aprobarlo por sí solo.

---

## 4. Política de actualización (refresh policy)

| Política | Descripción | Cuándo usar |
|---|---|---|
| daily | La fuente se actualiza automáticamente cada 24 horas. | Fuentes con datos que cambian frecuentemente (clima, estadísticas). |
| on_demand | Se actualiza cuando un rol autorizado lo solicita. | Fuentes con cambios esporádicos. |
| manual | Solo se actualiza cuando Validadoría o Secretaría lo aprueba. | Documentos comunitarios, actas, reglamentos. |

---

## 5. Parsers disponibles

| Parser | Formatos que procesa |
|---|---|
| pdf_parser | Documentos PDF texto-seleccionable |
| html_scraper | Páginas web HTML públicas |
| csv_import | Archivos CSV y datos tabulares |
| api_connector | APIs REST públicas con respuesta JSON |
| geojson_import | Datos geoespaciales GeoJSON |
| ocr | Documentos escaneados o imágenes con texto |
| xml_parser | Documentos XML y feeds estructurados |

El parser debe probarse antes de activar la fuente.
Una fuente con parser_status diferente de `tested` no puede activarse.

---

## 6. Formato de citación

Toda respuesta que use una fuente debe incluir la cita en este formato:

```
{institution}, {name}, publicado {published_at}, consultado {last_checked_at}.
URL: {url} — Estado: {status} — Trust: {trust_level}
```

Ejemplo:
```
INEGI, Localidades y población 2025, publicado 2025-01-15, consultado 2026-05-10.
URL: https://www.inegi.org.mx/ — Estado: active — Trust: 1
```

Si la fuente está pendiente de validación, la cita debe incluir advertencia:
```
[REQUIERE REVISION HUMANA] Esta fuente está pendiente de validación.
```

Si la fuente es contradictoria:
```
[FUENTES CONTRADICTORIAS] Esta fuente contradice otra fuente relevante.
Ver comparador de contradicciones para más detalle.
```

---

## 7. Proceso para agregar una fuente nueva

| Paso | Pregunta | Responsable |
|---|---|---|
| 1. Propuesta | ¿Qué fuente se quiere agregar y para qué? | Secretaría, Coordinación, Operador de piloto o Admin técnico. Ciudadanía puede sugerir, no activar. Financiadores no proponen ni activan. |
| 2. Clasificación | ¿Qué tipo es y qué campos aplican? | Coordinación |
| 3. Trust level | ¿Qué nivel de confianza corresponde? | Validadoría o proceso de gobernanza |
| 4. Revisión de privacidad | ¿Puede exponer datos sensibles, ubicaciones exactas o infraestructura crítica? | Validadoría y Comité |
| 5. Parser | ¿Cómo se procesa técnicamente? ¿El parser funciona? | Admin técnico |
| 6. Test | ¿La fuente se puede citar correctamente? ¿No contradice fuentes existentes? | Admin técnico y Validadoría |
| 7. Aprobación | ¿Queda activa, pendiente o limitada? | Validadoría o proceso de gobernanza. Admin técnico no aprueba por sí solo. |
| 8. Activación | Actualización del catálogo y publicación del estado. | Admin técnico |

**Fuentes que requieren revisión de privacidad obligatoria:**
Geoespaciales, catastros, seguridad pública, salud, infraestructura crítica,
padrones, reportes de riesgo y documentos con datos personales.

---

## 8. Estados de fuente

| Estado | Significado | Puede usarse como base factual |
|---|---|---|
| uploaded | Fue subida, pero no revisada. | No |
| pending_validation | En espera de revisión de Validadoría. | Solo como contexto con advertencia |
| active | Fue validada y puede usarse. | Sí |
| obsolete | Fue reemplazada o perdió vigencia. | Solo como antecedente histórico |
| contradictory | Contradice otra fuente relevante. | Sí, pero con advertencia y atribución |
| compromised | Señales de manipulación o pérdida de integridad. | No |
| rejected | Rechazada por falta de confiabilidad o pertinencia. | No |
| archived | Se conserva por historial, no está activa. | No, salvo consulta histórica explícita |

---

## 9. Esquema de campos del catálogo

Cada fuente en `config/sources.example.yaml` debe tener estos campos:

```yaml
source_id:               # string kebab-case, único
name:                    # nombre legible
description:             # descripción breve de qué contiene
institution:             # institución emisora
source_type:             # enum (ver sección 2)
url:                     # URL oficial (obligatorio si aplica)
endpoint:                # endpoint de API si aplica
persistent_identifier:   # folio o clave de dataset si aplica
version:                 # versión del documento si aplica
trust_level:             # 1 a 5 (ver sección 3)
status:                  # enum (ver sección 8)
visibility:              # public | confidential_community | restricted_role
allowed_roles:           # lista de roles que pueden consultar esta fuente
privacy_review_required: # true | false
sensitivity_flags:       # lista: precise_location, personal_data, critical_infrastructure, etc.
refresh_policy:          # daily | on_demand | manual
parser:                  # enum (ver sección 5)
parser_status:           # untested | tested | failed | needs_review
published_at:            # fecha original de publicación
last_checked_at:         # última vez que IAldea consultó la fuente
last_updated_at:         # última actualización detectada en la fuente
approved_by_role:        # rol que aprobó (validador | comite | coordinacion)
approved_at:             # fecha de aprobación
citation_format:         # formato de cita para respuestas
notes:                   # notas internas no sensibles
```

---

## 10. UX requerida

Toda respuesta que use una fuente debe mostrar:
nombre de la fuente, institución, fecha de publicación, fecha de consulta,
trust level, estado y, si aplica, advertencia de contradicción o validación pendiente.

La ficha de cada fuente (visible para Secretaría, Validadoría, Admin y Operador) muestra:
nombre, institución, tipo, trust, estado, visibilidad, fecha, parser, quién validó.

El catálogo completo (para roles autorizados) incluye:
buscador, filtros por tipo, trust, estado, visibilidad y última actualización.

---

*public-sources.md versión 1.0.0 — docs/public-sources.md*
*IAldea — ETH Cinco de Mayo, 2026*
