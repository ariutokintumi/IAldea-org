# Pop-Up 2026 — Minuta **Día 3** (13 mayo) — arquitectura de subagentes

**Foco:** arquitectura WhatsApp Bot con subagentes, niveles de acceso, orquestadores y Conmutador cifrado.

## Asistentes

- (completar)

## Lo que hicimos

- Revisamos y auditamos el estado del repo contra los entregables prometidos en Días 1 y 2.
- Limpieza de archivos: eliminados todos los `.csv` de `docs/roles/` y el script `scripts/export_role_model_excel.py` (redundantes; contenido canónico en `.md`).
- Completamos la arquitectura de subagentes en `docs/planning/dia_03_whatsapp_subagentes_orquestacion.md`:
  - Diseño de dos capas (No-AI / IA).
  - Detalle del Conmutador como túnel bidireccional cifrado.
  - Modelo de llaves por orquestador con subagentes compartibles.
  - Flujo completo de sesión con diagramas Mermaid.
  - Nota de modelo de amenazas (TLS, KMS/HSM, mTLS entre servicios).

## Decisiones

- **Auth primero:** el nivel L0–L3 se resuelve en Node.js, nunca por el LLM.
- **Zero-token en rechazo:** usuarios sin acceso no consumen tokens.
- **Conmutador cifrado:** AES-256-GCM con nonces únicos recomendado; pendiente definir implementación exacta.
- **Subagentes ciegos:** cada subagente no sabe quién lo invocó ni de la existencia de otros.
- Los `.csv` de `docs/roles/` se eliminan; los `.md` son la fuente canónica.

## Estado del repo — auditoría completa Día 3

### ✅ Lo que tenemos

| Archivo / Recurso | Ruta |
|---|---|
| Documento de gobernanza Día 2 | `docs/planning/dia_02_gobernanza_roles_y_accesos.md` |
| Arquitectura subagentes Día 3 | `docs/planning/dia_03_whatsapp_subagentes_orquestacion.md` |
| Modelo de roles | `docs/roles/role-model.md` |
| Matriz comportamiento por rol | `docs/roles/matriz-comportamiento-por-rol.md` |
| Flujos por etapa | `docs/roles/flujos-por-etapa.md` |
| Decisiones de producto | `docs/roles/decisiones-de-producto.md` |
| Roles por etapa | `docs/roles/roles-por-etapa.md` |
| Role experience matrix | `docs/roles/role-experience-matrix.md` |
| User stories (matriz, por rol, transversales, US prioritarias MVP) | `docs/roles/user-stories-*.md` |
| User stories general | `docs/roles/user-stories.md` |
| Hojas Excel documentadas | `docs/roles/excel-sheets.md` |
| README roles | `docs/roles/README.md` |
| Config roles ejemplo | `config/roles.example.yaml` |
| Config política ejemplo | `config/policy_config.example.yaml` |
| Comunidad ficticia (schema) | `examples/fictional-community/community-schema.json` |
| SOUL / identidad | `docs/governance/IaAldea_SOUL.md`, `docs/governance/SOUL-outline.md` |
| Minuta Día 1 (esqueleto) | `docs/pop-up-2026/day-1.md` — ⚠️ pendiente completar con asistentes y decisiones reales |
| Minuta Día 2 (actualizada) | `docs/pop-up-2026/day-2.md` |
| Principios, civic-safety, privacidad, visión | `docs/foundation/principles.md`, `docs/foundation/civic-safety.md`, `docs/foundation/privacy.md`, `docs/foundation/vision.md` |
| Contexto completo pop-up | `CONTEXTO-POPUP-VILLAGE.md` (raíz del repo) |

### ❌ Lo que falta (pendiente)

| Entregable | Referencia | Día objetivo |
|---|---|---|
| `docs/architecture/system-architecture.md` (modelo Kernel, pipeline de ingestión) | CONTEXTO §11, `dia_02` §13 | Día 3 / 4 |
| Implementación Conmutador (servicio cifrado bidireccional) | `dia_03` §Próximos pasos | Día 4+ |
| Implementación Orquestador 1 y 2 con keystores | `dia_03` §Próximos pasos | Día 4+ |
| DB de usuarios con campo `nivel_acceso` | `dia_03` §Próximos pasos | Día 4+ |
| Conector WhatsApp Cloud API | CONTEXTO §11, `dia_02` §2 | Día 4 |
| `apps/web/`, `apps/api/`, `packages/*` código | CONTEXTO §18 | Día 4+ |
| System prompts por subagente | `dia_03` §Próximos pasos | Pendiente |
| Definición de tools por nivel (alineado a `policy_config`) | `dia_03` §Próximos pasos | Pendiente |
| Definir subagentes exclusivos vs. compartidos | `dia_03` §Próximos pasos | Pendiente |
| Minuta Día 1 con contenido real | `docs/pop-up-2026/day-1.md` | Pendiente completar |

### ⚠️ Eliminados (intencional)

| Archivo | Motivo |
|---|---|
| `docs/roles/*.csv` (todos) | Redundantes con `.md`; limpieza repo Día 3 |
| `scripts/export_role_model_excel.py` | Ya no necesario en el proyecto actual |

## Próximos pasos — Día 4

- [ ] Revisar [`docs/architecture/system-architecture.md`](../architecture/system-architecture.md) frente al modelo Kernel y pipeline de ingestión en código.
- [ ] Definir subagentes: exclusivos por orquestador y compartidos.
- [ ] Definir system prompts base por subagente.
- [ ] Elegir e implementar algoritmo Conmutador (AES-256-GCM recomendado).
- [ ] Implementar Conmutador como servicio independiente.
- [ ] Configurar DB usuarios con `nivel_acceso` y `channel_ref_hash`.
- [ ] Integrar conector WhatsApp Cloud API.
- [ ] Testear flujos por nivel (L0 → rechazo, L1 → No-AI, L2/L3 → IA).

## Enlaces

- [`CONTEXTO-POPUP-VILLAGE.md`](../../CONTEXTO-POPUP-VILLAGE.md) §10–11 Días 3–4
- [`docs/planning/dia_03_whatsapp_subagentes_orquestacion.md`](../planning/dia_03_whatsapp_subagentes_orquestacion.md)
- [`docs/planning/dia_02_gobernanza_roles_y_accesos.md`](../planning/dia_02_gobernanza_roles_y_accesos.md)
- [`config/policy_config.example.yaml`](../../config/policy_config.example.yaml)
