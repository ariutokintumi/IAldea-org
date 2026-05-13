# User stories por rol

Contenido alineado con la pestaña **UserStories por rol** del libro *Role Model + Permission Matrix - IAldea* en Google Sheets.

En el CSV del repo la columna **Rol** va repetida en cada fila (en Sheets a veces solo aparece en la primera fila del bloque); el texto de las historias coincide con la hoja.

- **Datos tabulares (fuente en repo):** [user-stories-por-rol.csv](user-stories-por-rol.csv)
- **Historias cortas del taller Día 2:** [user-stories.md](user-stories.md)
- **Preguntas UX por etapa del ciclo:** [user-stories-matriz.md](user-stories-matriz.md)

Los roles **Admin técnico** y **Operador de Piloto** amplían el núcleo de gobernanza descrito en [role-model.md](role-model.md); conviven con los slugs técnicos (`roles.example.yaml`, `policy_config.example.yaml`).

## Ciudadano

### C-01

**User story:** Como ciudadana, quiero reportar una necesidad comunitaria por WhatsApp, para que IAldea la registre y clasifique sin que tenga que llenar un formulario complejo.


| Campo              | Contenido                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Objetivo           | Registrar necesidades desde un canal accesible.                                              |
| Privacidad         | Público, confidencial comunitario o privado sin memoria.                                     |
| Fuente requerida   | Mensaje ciudadano y contexto proporcionado.                                                  |
| Riesgo UX / Safety | Que el reporte se vuelva acusación o rumor.                                                  |
| Requisito UX       | El chatbot debe guiar con preguntas simples y evitar nombres, acusaciones o datos sensibles. |


### C-02

**User story:** Como ciudadano, quiero elegir si mi reporte será público, confidencial o privado, para saber quién podrá verlo antes de enviarlo.


| Campo              | Contenido                                                                           |
| ------------------ | ----------------------------------------------------------------------------------- |
| Objetivo           | Dar control sobre privacidad.                                                       |
| Privacidad         | Seleccionada por usuario.                                                           |
| Fuente requerida   | Confirmación de privacidad.                                                         |
| Riesgo UX / Safety | Que la persona comparta información sin entender consecuencias.                     |
| Requisito UX       | Antes de guardar, IAldea debe explicar quién verá la información y qué se guardará. |


### C-03

**User story:** Como ciudadana, quiero consultar acuerdos públicos, para entender qué se decidió antes sobre un tema comunitario.


| Campo              | Contenido                                                     |
| ------------------ | ------------------------------------------------------------- |
| Objetivo           | Recuperar memoria cívica.                                     |
| Privacidad         | Público.                                                      |
| Fuente requerida   | Actas, acuerdos, comunicados o registros validados.           |
| Riesgo UX / Safety | Que IAldea invente o interprete sin fuente.                   |
| Requisito UX       | Toda respuesta debe mostrar fuente, fecha y nivel de certeza. |


### C-04

**User story:** Como ciudadano, quiero saber si una preocupación ya fue reportada por más personas, para entender si es un patrón comunitario.


| Campo              | Contenido                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------- |
| Objetivo           | Ver tendencias agregadas.                                                                |
| Privacidad         | Agregado, sin identidad individual.                                                      |
| Fuente requerida   | Reportes comunitarios agregados.                                                         |
| Riesgo UX / Safety | Reidentificación de personas o zonas exactas.                                            |
| Requisito UX       | Mostrar patrones sólo cuando cumplan el mínimo de contribuyentes y sin datos personales. |


### C-05

**User story:** Como ciudadana, quiero recibir una respuesta clara cuando IAldea no pueda ayudarme, para saber qué camino seguro puedo seguir.


| Campo              | Contenido                                                       |
| ------------------ | --------------------------------------------------------------- |
| Objetivo           | Manejar casos fuera de alcance.                                 |
| Privacidad         | Según consulta.                                                 |
| Fuente requerida   | No aplica o fuente de derivación.                               |
| Riesgo UX / Safety | Que IAldea dé consejo legal, médico, electoral o de emergencia. |
| Requisito UX       | Mostrar refusal con explicación y alternativa segura.           |


## Secretaría

### S-01

**User story:** Como Secretaría, quiero convertir reportes ciudadanos en registros estructurados, para que la comunidad pueda organizar necesidades por tema, zona general y prioridad.


| Campo              | Contenido                                                       |
| ------------------ | --------------------------------------------------------------- |
| Objetivo           | Ordenar información comunitaria.                                |
| Privacidad         | Según origen del reporte.                                       |
| Fuente requerida   | Reporte ciudadano autorizado.                                   |
| Riesgo UX / Safety | Exponer datos sensibles o cambiar el sentido del reporte.       |
| Requisito UX       | Mostrar resumen editable, modo de privacidad y fuente original. |


### S-02

**User story:** Como Secretaría, quiero registrar acuerdos tomados en asamblea o comité, para preservar memoria cívica verificable.


| Campo              | Contenido                                                     |
| ------------------ | ------------------------------------------------------------- |
| Objetivo           | Documentar decisiones humanas.                                |
| Privacidad         | Público o confidencial según acuerdo.                         |
| Fuente requerida   | Acta, minuta, votación o documento aprobado.                  |
| Riesgo UX / Safety | Que parezca que IAldea aprobó el acuerdo.                     |
| Requisito UX       | El botón debe decir “Registrar acuerdo”, no “Tomar decisión”. |


### S-03

**User story:** Como Secretaría, quiero redactar una minuta con apoyo de IAldea, para ahorrar tiempo sin perder trazabilidad.


| Campo              | Contenido                                                  |
| ------------------ | ---------------------------------------------------------- |
| Objetivo           | Crear documentación comunitaria.                           |
| Privacidad         | Según contenido.                                           |
| Fuente requerida   | Notas, acta, grabación autorizada o resumen de sesión.     |
| Riesgo UX / Safety | Publicar información no validada.                          |
| Requisito UX       | La minuta debe quedar como borrador hasta revisión humana. |


### S-04

**User story:** Como Secretaría, quiero preparar un comunicado basado en acuerdos y fuentes, para informar a la comunidad de forma clara y verificable.


| Campo              | Contenido                                                      |
| ------------------ | -------------------------------------------------------------- |
| Objetivo           | Informar con respaldo.                                         |
| Privacidad         | Público o confidencial.                                        |
| Fuente requerida   | Acuerdo, evidencia o validación previa.                        |
| Riesgo UX / Safety | Propaganda, manipulación o exposición de datos.                |
| Requisito UX       | El editor debe mostrar fuentes, estado y aprobación pendiente. |


### S-05

**User story:** Como Secretaría, quiero ver qué documentos están pendientes de validación, para evitar que información errónea entre a la memoria oficial.


| Campo              | Contenido                                                                                             |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| Objetivo           | Cuidar calidad de fuentes.                                                                            |
| Privacidad         | Según documento.                                                                                      |
| Fuente requerida   | Documento subido, autoría, fecha y rol.                                                               |
| Riesgo UX / Safety | Usar documentos no verificados como verdad.                                                           |
| Requisito UX       | Cada documento debe tener estado: subido, pendiente, validado, contradictorio, rechazado o archivado. |


## Coordinación

### CO-01

**User story:** Como Coordinación, quiero ver el estado completo del ciclo cívico, para saber qué temas están en entender, proponer, decidir, ejecutar, verificar, informar o aprender.


| Campo              | Contenido                                            |
| ------------------ | ---------------------------------------------------- |
| Objetivo           | Coordinar procesos.                                  |
| Privacidad         | Según permisos.                                      |
| Fuente requerida   | Registros, propuestas, acuerdos y compromisos.       |
| Riesgo UX / Safety | Centralizar demasiado poder.                         |
| Requisito UX       | Mostrar vista de proceso, no de control autoritario. |


### CO-02

**User story:** Como Coordinación, quiero enviar una propuesta a revisión de comité, para que no avance sin proceso humano.


| Campo              | Contenido                                                          |
| ------------------ | ------------------------------------------------------------------ |
| Objetivo           | Cuidar gobernanza.                                                 |
| Privacidad         | Según propuesta.                                                   |
| Fuente requerida   | Necesidad, patrón, fuente o propuesta previa.                      |
| Riesgo UX / Safety | Saltarse asamblea o comité.                                        |
| Requisito UX       | El sistema debe pedir confirmar el proceso humano correspondiente. |


### CO-03

**User story:** Como Coordinación, quiero dar seguimiento a compromisos derivados de acuerdos, para saber qué está pendiente sin vigilar personas.


| Campo              | Contenido                                                                    |
| ------------------ | ---------------------------------------------------------------------------- |
| Objetivo           | Seguimiento no punitivo.                                                     |
| Privacidad         | Público o confidencial.                                                      |
| Fuente requerida   | Acuerdo original y compromiso asociado.                                      |
| Riesgo UX / Safety | Convertir IAldea en sistema de vigilancia.                                   |
| Requisito UX       | Asignar seguimiento a roles o comités, no exponer personas innecesariamente. |


### CO-04

**User story:** Como Coordinación, quiero revisar qué información está lista para comunicarse, para evitar publicar datos no validados.


| Campo              | Contenido                                                    |
| ------------------ | ------------------------------------------------------------ |
| Objetivo           | Cuidar comunicación.                                         |
| Privacidad         | Según contenido.                                             |
| Fuente requerida   | Evidencia validada, acuerdo o fuente oficial.                |
| Riesgo UX / Safety | Propaganda o publicación prematura.                          |
| Requisito UX       | Mostrar estado: borrador, en revisión, aprobado o publicado. |


### CO-05

**User story:** Como Coordinación, quiero saber cuándo un tema requiere revisión humana o experta, para no usar IAldea fuera de alcance.


| Campo              | Contenido                                                           |
| ------------------ | ------------------------------------------------------------------- |
| Objetivo           | Escalar correctamente.                                              |
| Privacidad         | Según tema.                                                         |
| Fuente requerida   | Clasificación de riesgo y fuente relacionada.                       |
| Riesgo UX / Safety | Consejo legal, médico, electoral, emergencia o presupuesto crítico. |
| Requisito UX       | IAldea debe bloquear y sugerir derivación humana cuando aplique.    |


## Miembro del comité

### MC-01

**User story:** Como miembro de comité, quiero revisar necesidades agregadas, para identificar temas recurrentes sin exponer identidades.


| Campo              | Contenido                                              |
| ------------------ | ------------------------------------------------------ |
| Objetivo           | Deliberar con contexto.                                |
| Privacidad         | Agregado y confidencial autorizado.                    |
| Fuente requerida   | Reportes agregados.                                    |
| Riesgo UX / Safety | Reidentificación o exposición individual.              |
| Requisito UX       | Mostrar patrones sólo si cumplen reglas de agregación. |


### MC-02

**User story:** Como miembro de comité, quiero comparar opciones de solución, para discutir alternativas con beneficios, riesgos y datos faltantes.


| Campo              | Contenido                                              |
| ------------------ | ------------------------------------------------------ |
| Objetivo           | Evaluar propuestas.                                    |
| Privacidad         | Según propuesta.                                       |
| Fuente requerida   | Necesidades, fuentes, contexto histórico.              |
| Riesgo UX / Safety | Que IAldea recomiende una opción final.                |
| Requisito UX       | El comparador no debe marcar una opción como ganadora. |


### MC-03

**User story:** Como miembro de comité, quiero comentar una propuesta, para agregar contexto antes de que avance a decisión.


| Campo              | Contenido                                                            |
| ------------------ | -------------------------------------------------------------------- |
| Objetivo           | Mejorar deliberación.                                                |
| Privacidad         | Según propuesta.                                                     |
| Fuente requerida   | Propuesta y fuentes vinculadas.                                      |
| Riesgo UX / Safety | Convertir opinión individual en decisión.                            |
| Requisito UX       | Los comentarios deben quedar como aportes, no como validación final. |


### MC-04

**User story:** Como miembro de comité, quiero revisar acuerdos previos relacionados, para no duplicar decisiones o contradecir memoria existente.


| Campo              | Contenido                                               |
| ------------------ | ------------------------------------------------------- |
| Objetivo           | Usar memoria cívica.                                    |
| Privacidad         | Según acceso.                                           |
| Fuente requerida   | Actas, acuerdos, minutas validadas.                     |
| Riesgo UX / Safety | Ignorar contradicciones.                                |
| Requisito UX       | IAldea debe mostrar fuentes contradictorias si existen. |


### MC-05

**User story:** Como miembro de comité, quiero marcar una propuesta como lista para revisión humana, para pasarla al proceso correspondiente.


| Campo              | Contenido                                                                            |
| ------------------ | ------------------------------------------------------------------------------------ |
| Objetivo           | Preparar decisión.                                                                   |
| Privacidad         | Según gobernanza.                                                                    |
| Fuente requerida   | Propuesta, riesgos, fuentes y datos faltantes.                                       |
| Riesgo UX / Safety | Saltarse proceso comunitario.                                                        |
| Requisito UX       | IAldea debe pedir confirmar si va a comité, asamblea, coordinación u otro mecanismo. |


## Tesorería

### T-01

**User story:** Como Tesorería, quiero revisar la viabilidad financiera de una propuesta, para indicar si existen recursos o restricciones.


| Campo              | Contenido                                                   |
| ------------------ | ----------------------------------------------------------- |
| Objetivo           | Aportar contexto financiero.                                |
| Privacidad         | Confidencial o público según caso.                          |
| Fuente requerida   | Presupuesto, acuerdo financiero, registro contable.         |
| Riesgo UX / Safety | Que IAldea comprometa presupuesto.                          |
| Requisito UX       | Mostrar “viabilidad preliminar”, no “presupuesto aprobado”. |


### T-02

**User story:** Como Tesorería, quiero vincular un compromiso con un acuerdo financiero aprobado, para mantener trazabilidad del uso de recursos.


| Campo              | Contenido                                               |
| ------------------ | ------------------------------------------------------- |
| Objetivo           | Conectar recursos con acuerdos.                         |
| Privacidad         | Según sensibilidad.                                     |
| Fuente requerida   | Acta, acuerdo, comprobante o presupuesto aprobado.      |
| Riesgo UX / Safety | Asociar fondos sin autorización humana.                 |
| Requisito UX       | Requerir fuente y proceso antes de guardar como válido. |


### T-03

**User story:** Como Tesorería, quiero subir evidencia financiera autorizada, para respaldar avances o gastos relacionados con compromisos.


| Campo              | Contenido                                                 |
| ------------------ | --------------------------------------------------------- |
| Objetivo           | Documentar evidencia.                                     |
| Privacidad         | Confidencial o público parcial.                           |
| Fuente requerida   | Recibos, comprobantes, registros.                         |
| Riesgo UX / Safety | Exponer datos financieros sensibles.                      |
| Requisito UX       | Permitir ocultar montos o datos sensibles según permisos. |


### T-04

**User story:** Como Tesorería, quiero marcar información financiera como pendiente, validada o no concluyente, para evitar conclusiones falsas.


| Campo              | Contenido                                       |
| ------------------ | ----------------------------------------------- |
| Objetivo           | Validar evidencia financiera.                   |
| Privacidad         | Según acceso.                                   |
| Fuente requerida   | Evidencia financiera.                           |
| Riesgo UX / Safety | Presentar evidencia incompleta como confirmada. |
| Requisito UX       | Mostrar estado de validación y quién revisó.    |


### T-05

**User story:** Como Tesorería, quiero recibir un bloqueo si intento aprobar recursos desde IAldea, para recordar que la autorización debe venir del proceso humano.


| Campo              | Contenido                                                               |
| ------------------ | ----------------------------------------------------------------------- |
| Objetivo           | Prevenir mal uso.                                                       |
| Privacidad         | No aplica.                                                              |
| Fuente requerida   | Acuerdo humano necesario.                                               |
| Riesgo UX / Safety | Comprometer presupuesto desde el sistema.                               |
| Requisito UX       | Mensaje límite: “IAldea no puede autorizar ni comprometer presupuesto.” |


## Validador

### V-01

**User story:** Como Validador, quiero revisar evidencia de cumplimiento, para determinar si un compromiso puede considerarse validado, pendiente o no concluyente.


| Campo              | Contenido                                             |
| ------------------ | ----------------------------------------------------- |
| Objetivo           | Verificar avances.                                    |
| Privacidad         | Según evidencia.                                      |
| Fuente requerida   | Documentos, fotos, actas, reportes o actualizaciones. |
| Riesgo UX / Safety | Juzgar personas.                                      |
| Requisito UX       | Usar estados neutrales, no lenguaje de culpa.         |


### V-02

**User story:** Como Validador, quiero ver si una evidencia contradice otra fuente, para marcarla como inconsistente sin acusar a nadie.


| Campo              | Contenido                                                  |
| ------------------ | ---------------------------------------------------------- |
| Objetivo           | Detectar contradicciones.                                  |
| Privacidad         | Según acceso.                                              |
| Fuente requerida   | Evidencias y fuentes previas.                              |
| Riesgo UX / Safety | Convertir contradicción en acusación.                      |
| Requisito UX       | Mostrar “fuentes contradictorias” y pedir revisión humana. |


### V-03

**User story:** Como Validador, quiero marcar evidencia como sensible, para proteger datos personales o información delicada.


| Campo              | Contenido                                                      |
| ------------------ | -------------------------------------------------------------- |
| Objetivo           | Cuidar privacidad.                                             |
| Privacidad         | Confidencial.                                                  |
| Fuente requerida   | Evidencia cargada.                                             |
| Riesgo UX / Safety | Exposición de rostros, nombres, ubicaciones o datos sensibles. |
| Requisito UX       | Permitir marcar visibilidad y acceso por rol.                  |


### V-04

**User story:** Como Validador, quiero solicitar evidencia adicional, para evitar emitir conclusiones sin suficiente respaldo.


| Campo              | Contenido                                       |
| ------------------ | ----------------------------------------------- |
| Objetivo           | Evitar falsas conclusiones.                     |
| Privacidad         | Según caso.                                     |
| Fuente requerida   | Evidencia incompleta.                           |
| Riesgo UX / Safety | Validar con información insuficiente.           |
| Requisito UX       | Estado visible: “requiere evidencia adicional”. |


### V-05

**User story:** Como Validador, quiero dejar registro de mi revisión, para que la comunidad sepa quién validó y con qué evidencia.


| Campo              | Contenido                                                     |
| ------------------ | ------------------------------------------------------------- |
| Objetivo           | Asegurar trazabilidad.                                        |
| Privacidad         | Según visibilidad.                                            |
| Fuente requerida   | Checklist de validación.                                      |
| Riesgo UX / Safety | Falta de legitimidad.                                         |
| Requisito UX       | Mostrar quién validó, cuándo, qué revisó y qué estado asignó. |


## Financiador

### F-01

**User story:** Como financiador, quiero ver métricas agregadas de avance, para entender el impacto sin acceder a datos sensibles.


| Campo              | Contenido                                                           |
| ------------------ | ------------------------------------------------------------------- |
| Objetivo           | Observar impacto.                                                   |
| Privacidad         | Público agregado.                                                   |
| Fuente requerida   | Reportes aprobados y métricas agregadas.                            |
| Riesgo UX / Safety | Acceso indebido a información comunitaria.                          |
| Requisito UX       | Dashboard limitado, sin datos personales ni contenido confidencial. |


### F-02

**User story:** Como sponsor, quiero consultar comunicados públicos, para conocer avances oficiales del piloto.


| Campo              | Contenido                                        |
| ------------------ | ------------------------------------------------ |
| Objetivo           | Seguimiento externo.                             |
| Privacidad         | Público.                                         |
| Fuente requerida   | Comunicados aprobados.                           |
| Riesgo UX / Safety | Interpretar borradores como información oficial. |
| Requisito UX       | Sólo mostrar contenido publicado y aprobado.     |


### F-03

**User story:** Como financiador, quiero registrar restricciones de financiamiento como contexto, para que la comunidad las considere sin que yo decida por ella.


| Campo              | Contenido                                                 |
| ------------------ | --------------------------------------------------------- |
| Objetivo           | Aportar contexto sin capturar decisión.                   |
| Privacidad         | Público o confidencial según acuerdo.                     |
| Fuente requerida   | Condiciones de financiamiento documentadas.               |
| Riesgo UX / Safety | Captura de agenda comunitaria.                            |
| Requisito UX       | Mostrar restricciones como contexto, no como instrucción. |


### F-04

**User story:** Como sponsor, quiero recibir un reporte de impacto, para conocer resultados sin acceder a información privada.


| Campo              | Contenido                                             |
| ------------------ | ----------------------------------------------------- |
| Objetivo           | Transparencia externa.                                |
| Privacidad         | Público agregado.                                     |
| Fuente requerida   | Impact report aprobado.                               |
| Riesgo UX / Safety | Exponer datos sensibles.                              |
| Requisito UX       | El reporte debe ser agregado, anonimizado y aprobado. |


### F-05

**User story:** Como financiador, quiero que IAldea me bloquee si intento priorizar decisiones comunitarias, para respetar la autonomía del proceso.


| Campo              | Contenido                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Objetivo           | Evitar captura.                                                                             |
| Privacidad         | No aplica.                                                                                  |
| Fuente requerida   | No aplica.                                                                                  |
| Riesgo UX / Safety | Influencia indebida.                                                                        |
| Requisito UX       | Mensaje límite: “Un financiador no puede condicionar decisiones comunitarias desde IAldea.” |


## Admin técnico

### A-01

**User story:** Como admin técnico, quiero configurar roles y permisos, para que cada persona vea sólo la información que le corresponde.


| Campo              | Contenido                                                    |
| ------------------ | ------------------------------------------------------------ |
| Objetivo           | Configurar acceso.                                           |
| Privacidad         | Técnica, sin contenido privado.                              |
| Fuente requerida   | Matriz de roles y policy config.                             |
| Riesgo UX / Safety | Acceso excesivo o mal configurado.                           |
| Requisito UX       | Mostrar cambios de permisos con confirmación y trazabilidad. |


### A-02

**User story:** Como admin técnico, quiero revisar logs técnicos redactados, para diagnosticar errores sin leer contenido privado.


| Campo              | Contenido                                                    |
| ------------------ | ------------------------------------------------------------ |
| Objetivo           | Mantener sistema.                                            |
| Privacidad         | Logs sin contenido sensible.                                 |
| Fuente requerida   | Logs técnicos.                                               |
| Riesgo UX / Safety | Vigilancia o acceso a conversaciones privadas.               |
| Requisito UX       | Los logs deben ocultar contenido privado y datos personales. |


### A-03

**User story:** Como admin técnico, quiero conectar o desactivar fuentes, para mantener actualizada la memoria del sistema.


| Campo              | Contenido                                                            |
| ------------------ | -------------------------------------------------------------------- |
| Objetivo           | Gestionar fuentes.                                                   |
| Privacidad         | Según fuente.                                                        |
| Fuente requerida   | Autorización comunitaria y fuente documentada.                       |
| Riesgo UX / Safety | Conectar fuentes no autorizadas.                                     |
| Requisito UX       | Requerir confirmación de origen, visibilidad y estado de validación. |


### A-04

**User story:** Como admin técnico, quiero restaurar una versión anterior de configuración, para corregir errores sin perder trazabilidad.


| Campo              | Contenido                                                            |
| ------------------ | -------------------------------------------------------------------- |
| Objetivo           | Control de versiones.                                                |
| Privacidad         | Técnica.                                                             |
| Fuente requerida   | Historial de configuración.                                          |
| Riesgo UX / Safety | Cambiar reglas sin aprobación.                                       |
| Requisito UX       | Mostrar versión anterior, nueva versión, responsable y autorización. |


### A-05

**User story:** Como admin técnico, quiero recibir bloqueo si intento acceder a contenido privado, para proteger la confianza comunitaria.


| Campo              | Contenido                                                                  |
| ------------------ | -------------------------------------------------------------------------- |
| Objetivo           | Prevenir acceso indebido.                                                  |
| Privacidad         | Privado sin memoria o confidencial.                                        |
| Fuente requerida   | No aplica.                                                                 |
| Riesgo UX / Safety | Violación de privacidad.                                                   |
| Requisito UX       | Mensaje límite: “No tienes autorización para acceder a contenido privado.” |


## Operador de Piloto

### OP-01

**User story:** Como operador de piloto, quiero configurar IAldea junto con la comunidad, para que roles, permisos y privacidad reflejen sus reglas reales.


| Campo              | Contenido                                                                           |
| ------------------ | ----------------------------------------------------------------------------------- |
| Objetivo           | Implementar con consentimiento.                                                     |
| Privacidad         | Según configuración.                                                                |
| Fuente requerida   | SOUL.md, policy config, matriz de roles.                                            |
| Riesgo UX / Safety | Imponer reglas externas.                                                            |
| Requisito UX       | Toda configuración debe quedar como aprobada o pendiente de validación comunitaria. |


### OP-02

**User story:** Como operador de piloto, quiero cargar documentos iniciales con trazabilidad, para que la memoria arranque con fuentes claras.


| Campo              | Contenido                                                                  |
| ------------------ | -------------------------------------------------------------------------- |
| Objetivo           | Crear memoria base.                                                        |
| Privacidad         | Según documento.                                                           |
| Fuente requerida   | Actas, reglamentos, acuerdos, documentos comunitarios.                     |
| Riesgo UX / Safety | Subir documentos erróneos o sin legitimidad.                               |
| Requisito UX       | Cada fuente debe mostrar quién la subió, cuándo, rol, estado y validación. |


### OP-03

**User story:** Como operador de piloto, quiero capacitar a cada rol en lo que puede y no puede hacer, para reducir errores de uso y malentendidos.


| Campo              | Contenido                                   |
| ------------------ | ------------------------------------------- |
| Objetivo           | Adopción segura.                            |
| Privacidad         | No aplica.                                  |
| Fuente requerida   | Matriz de roles y flujos.                   |
| Riesgo UX / Safety | Uso indebido por desconocimiento.           |
| Requisito UX       | Crear guías por rol con ejemplos y límites. |


### OP-04

**User story:** Como operador de piloto, quiero documentar aprendizajes del piloto, para mejorar IAldea sin cambiar reglas automáticamente.


| Campo              | Contenido                                                         |
| ------------------ | ----------------------------------------------------------------- |
| Objetivo           | Aprendizaje institucional.                                        |
| Privacidad         | Agregado y anonimizado.                                           |
| Fuente requerida   | Feedback, métricas, reportes y observaciones.                     |
| Riesgo UX / Safety | Exponer feedback sensible.                                        |
| Requisito UX       | Los aprendizajes deben mostrarse agregados y con revisión humana. |


### OP-05

**User story:** Como operador de piloto, quiero dejar un handoff claro, para que la comunidad pueda operar IAldea sin depender del equipo inicial.


| Campo              | Contenido                                                             |
| ------------------ | --------------------------------------------------------------------- |
| Objetivo           | Autonomía comunitaria.                                                |
| Privacidad         | Según contenido.                                                      |
| Fuente requerida   | Playbook, configuración, roles, fuentes.                              |
| Riesgo UX / Safety | Dependencia externa.                                                  |
| Requisito UX       | Entregar checklist, permisos, fuentes, responsables y próximos pasos. |
