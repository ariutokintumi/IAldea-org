# 📝 Fase 5: Ingesta Blindada (Escribano Digital)

Este módulo permite que la comunidad alimente la memoria de IAldea directamente desde los canales de chat (WhatsApp/Telegram), manteniendo los más altos estándares de seguridad y auditoría.

## 1. El Protocolo de Registro
Solo los usuarios con roles de **Autoridad** (Secretaría, Comité, Tesorería) están facultados para registrar nueva memoria. El proceso se activa al enviar un documento con el comando `/registrar`.

### Formato de Metadatos
El usuario debe etiquetar el documento para asegurar su correcta clasificación:
- `#dominio`: (ej. #agua, #economia, #legal)
- `#nivel`: (ej. #L1, #L2, #L3)
- `#fuente`: Nombre descriptivo del documento.

## 2. Flujo de Datos Soberano

1. **Recepción:** El Gateway detecta el archivo y valida los permisos del remitente.
2. **Cifrado en Vuelo:** El texto extraído se envía inmediatamente al **Conmutador**. No se almacena texto plano en ningún momento del proceso.
3. **Anclaje de Trust:** Se asigna un `trust_level` basado en el rol del uploader, garantizando que la jerarquía de fuentes se mantenga íntegra.
4. **Validación por Blockchain:** 
   - Se genera un hash único (huella digital) del documento original y del contenido cifrado.
   - Este hash se ancla en una **red blockchain** para garantizar que la memoria sea inmutable y auditable por cualquier miembro de la comunidad en el futuro.

## 3. Beneficios de la Arquitectura
- **Inmutabilidad:** Una vez registrado, nadie (ni siquiera un administrador) puede alterar la memoria sin dejar rastro.
- **Auditoría Transparente:** La comunidad puede verificar que lo que el bot responde coincide con los hashes registrados en la blockchain.
- **Soberanía en Tiempo Real:** La memoria de la comunidad crece al ritmo de sus conversaciones y acuerdos, sin necesidad de procesos técnicos complejos.

---
*IAldea — Inmortalizando la palabra comunitaria.*
