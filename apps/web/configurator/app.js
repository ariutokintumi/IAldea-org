/**
 * Asistente no-code — genera SOUL.md y policy_config.yaml (MVP Gantt Día 1–2).
 * Sin dependencias externas: abrir index.html en el navegador.
 */

const MANDATORY_BLOCKED = [
  "electoral",
  "legal_advice",
  "medical_advice",
  "accusations",
];

function slugId(name) {
  return String(name || "comunidad")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .slice(0, 48) || "comunidad";
}

/** Escalar YAML en lista: identificador simple sin comillas; si no, comillas JSON. */
function yamlScalar(s) {
  const t = String(s ?? "").trim();
  if (!t) return '""';
  if (/^[\w.-]+$/.test(t)) return t;
  return JSON.stringify(t);
}

function splitList(s) {
  return String(s || "")
    .split(/[\n,]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function readForm() {
  const gov = document.querySelector('input[name="governance"]:checked');
  const privacy = document.querySelector('input[name="privacy_mode"]:checked');
  const tone = document.querySelector('input[name="tone"]:checked');
  const display = document.querySelector('input[name="display_mode"]:checked');

  const allowedTopics = [];
  document.querySelectorAll('input[data-topic="allowed"]:checked').forEach((el) => {
    allowedTopics.push(el.value);
  });

  return {
    communityName: document.getElementById("communityName").value.trim(),
    municipality: document.getElementById("municipality").value.trim(),
    state: document.getElementById("state").value.trim() || "Oaxaca",
    size: parseInt(document.getElementById("size").value, 10) || 0,
    governance: gov ? gov.value : "usos_y_costumbres",
    vision: document.getElementById("vision").value.trim(),
    primaryLang: document.getElementById("primaryLang").value.trim() || "es",
    secondaryLang: document.getElementById("secondaryLang").value.trim(),
    hasSecondary: document.getElementById("hasSecondary").checked,
    tone: tone ? tone.value : "cercano",
    displayMode: display ? display.value : "monolingual",
    glossary: document.getElementById("glossary").value.trim(),
    allowedTopics,
    blockedLocal: document.getElementById("blockedLocal").value,
    feedbackEnabled: document.getElementById("feedbackEnabled").checked,
    aggThreshold: Math.max(
      3,
      parseInt(document.getElementById("aggThreshold").value, 10) || 3
    ),
    aggregateVisibility: document.getElementById("aggregateVisibility").value,
    privacyMode: privacy ? privacy.value : "confidential_community",
    authorities: document.getElementById("authorities").value,
    committees: document.getElementById("committees").value,
    admins: document.getElementById("admins").value,
    diffAuthCitizen: document.getElementById("diffAuthCitizen").checked,
    sourceActa: document.getElementById("sourceActa").checked,
    sourceReg: document.getElementById("sourceReg").checked,
    sourcePres: document.getElementById("sourcePres").checked,
    sourceMin: document.getElementById("sourceMin").checked,
    sourceOficio: document.getElementById("sourceOficio").checked,
    externalSources: document.getElementById("externalSources").checked,
    escalation: document.getElementById("escalation").value.trim(),
  };
}

function buildBlockedTopics(d) {
  const local = splitList(d.blockedLocal);
  const set = new Set([...MANDATORY_BLOCKED, ...local]);
  return Array.from(set);
}

function generatePolicyYaml(d) {
  const blocked = buildBlockedTopics(d);
  const authorities = splitList(d.authorities);
  const committees = splitList(d.committees);
  let admins = splitList(d.admins);
  if (!admins.length && authorities.length) admins = [authorities[0]];

  const sourceTypes = [];
  if (d.sourceActa) sourceTypes.push("acta_asamblea");
  if (d.sourceReg) sourceTypes.push("reglamento_interno");
  if (d.sourcePres) sourceTypes.push("presupuesto");
  if (d.sourceMin) sourceTypes.push("minuta_comite");
  if (d.sourceOficio) sourceTypes.push("oficio_gobierno");
  if (!sourceTypes.length) sourceTypes.push("acta_asamblea");

  const trust = [];
  if (d.sourceActa) trust.push("acta_asamblea");
  if (d.sourceReg) trust.push("reglamento_interno");
  if (d.sourceOficio) trust.push("oficio_gobierno");
  if (d.sourcePres) trust.push("presupuesto");
  if (d.sourceMin) trust.push("minuta_comite");
  if (!trust.length) trust.push("acta_asamblea");

  const allowed = d.allowedTopics.length
    ? d.allowedTopics
    : ["tramites_gubernamentales", "informacion_publica", "historia_comunitaria"];

  const lines = [];
  lines.push("# Generado por el Asistente de Configuración IAldea (MVP)");
  lines.push(`# Comunidad: ${d.communityName || "(sin nombre)"}`);
  lines.push("");
  lines.push("community:");
  lines.push(`  id: ${yamlScalar(slugId(d.communityName))}`);
  lines.push(`  name: ${yamlScalar(d.communityName || "Comunidad")}`);
  lines.push(`  municipality: ${yamlScalar(d.municipality)}`);
  lines.push(`  state: ${yamlScalar(d.state)}`);
  lines.push(`  size: ${d.size}`);
  lines.push(`  governance: ${yamlScalar(d.governance)}`);
  lines.push("");
  lines.push("language:");
  lines.push(`  primary: ${yamlScalar(d.primaryLang)}`);
  lines.push(`  secondary: ${yamlScalar(d.hasSecondary ? d.secondaryLang : "")}`);
  lines.push(`  display_mode: ${yamlScalar(d.displayMode)}`);
  lines.push("");
  lines.push(`tone: ${yamlScalar(d.tone)}`);
  lines.push("");
  lines.push("topics:");
  lines.push("  allowed:");
  allowed.forEach((t) => lines.push(`    - ${yamlScalar(t)}`));
  lines.push("  blocked:");
  blocked.forEach((t) => lines.push(`    - ${yamlScalar(t)}`));
  lines.push("");
  lines.push("privacy:");
  lines.push(`  default_mode: ${yamlScalar(d.privacyMode)}`);
  lines.push(`  aggregation_threshold: ${d.aggThreshold}`);
  lines.push(`  aggregate_visibility: ${yamlScalar(d.aggregateVisibility)}`);
  lines.push("  data_retention_days: 365");
  lines.push("");
  lines.push("feedback:");
  lines.push(`  enabled: ${d.feedbackEnabled}`);
  lines.push('  mode: "confidential"');
  lines.push("");
  lines.push("roles:");
  lines.push("  authorities:");
  (authorities.length ? authorities : ["secretario"]).forEach((r) => lines.push(`    - ${yamlScalar(r)}`));
  lines.push("  committees:");
  if (committees.length) {
    committees.forEach((r) => lines.push(`    - ${yamlScalar(r)}`));
  } else {
    lines.push("    []");
  }
  lines.push("  admin:");
  if (admins.length) {
    admins.forEach((r) => lines.push(`    - ${yamlScalar(r)}`));
  } else {
    lines.push("    - secretario");
  }
  lines.push("");
  lines.push("role_permissions:");
  lines.push("  citizen:");
  lines.push("    can_query: true");
  lines.push("    can_submit_feedback: true");
  lines.push(`    can_view_aggregates: ${d.diffAuthCitizen ? "false" : "true"}`);
  lines.push("    can_view_documents: true");
  lines.push("  authority:");
  lines.push("    can_query: true");
  lines.push("    can_submit_feedback: true");
  lines.push("    can_view_aggregates: true");
  lines.push("    can_view_documents: true");
  lines.push("    can_compare_scenarios: true");
  lines.push("    can_export_reports: true");
  lines.push("  admin:");
  lines.push("    can_modify_config: true");
  lines.push("    can_ingest_documents: true");
  lines.push("    can_manage_roles: true");
  lines.push("");
  lines.push("sources:");
  lines.push("  types:");
  sourceTypes.forEach((t) => lines.push(`    - ${t}`));
  lines.push("  external_sources:");
  lines.push(`    enabled: ${d.externalSources}`);
  if (d.externalSources) {
    lines.push("    allowed:");
    lines.push("      - gobierno_federal");
    lines.push("      - gobierno_estatal");
    lines.push("      - inegi_publico");
  } else {
    lines.push("    allowed: []");
  }
  lines.push("  trust_hierarchy:");
  trust.forEach((t) => lines.push(`    - ${t}`));
  lines.push("");
  lines.push("citations:");
  lines.push("  required: true");
  lines.push('  format: "inline"');
  lines.push("");
  lines.push("audit:");
  lines.push("  log_all_queries: true");
  lines.push("  log_config_changes: true");
  lines.push("  log_retention_days: 730");
  lines.push("");
  lines.push("_protected_rules:");
  lines.push('  - "no_legal_advice"');
  lines.push('  - "no_medical_advice"');
  lines.push('  - "no_electoral_recommendations"');
  lines.push('  - "no_accusations"');
  lines.push('  - "no_individual_identification_in_aggregates"');
  lines.push('  - "always_cite_sources"');
  lines.push('  - "log_config_changes"');

  return lines.join("\n") + "\n";
}

function generateSoulMd(d) {
  const glossaryLines = splitList(d.glossary);
  const glossaryBlock =
    glossaryLines.length > 0
      ? glossaryLines.map((g) => `- ${g}`).join("\n")
      : "- (agregar términos locales: tequio, faena, etc.)";

  const blockedLocal = splitList(d.blockedLocal);
  const blockedBlock =
    blockedLocal.length > 0
      ? blockedLocal.map((b) => `- ${b}`).join("\n")
      : "- (ninguno adicional; las reglas globales siguen vigentes)";

  const esc = d.escalation || "Contactar a la autoridad municipal o servicios de emergencia locales.";

  return `# SOUL — ${d.communityName || "Comunidad"}

> Visión, tono y límites. Complementa \`policy_config.yaml\` (reglas automáticas).

## Identidad

- **Nombre:** ${d.communityName || "—"}
- **Ubicación:** ${d.municipality || "—"}, ${d.state || "—"}
- **Habitantes (aprox.):** ${d.size || "—"}
- **Gobernanza:** ${d.governance}

## Visión en una frase

${d.vision || "(completar)"}

## Idioma y tono

- **Lengua principal:** ${d.primaryLang}
${d.hasSecondary && d.secondaryLang ? `- **Segunda lengua:** ${d.secondaryLang}` : ""}
- **Tono:** ${d.tone}
- **Modo de respuesta:** ${d.displayMode}

## Glosario cultural (términos locales)

${glossaryBlock}

## IAldea puede

${d.allowedTopics.length ? d.allowedTopics.map((t) => `- ${t}`).join("\n") : "- (marcar temas permitidos en el asistente o editar aquí)"}

## IAldea nunca

- Consejo legal, médico o de emergencia como sustituto de un profesional.
- Recomendaciones de voto o injerencia electoral.
- Validar acusaciones o rumores sobre personas.
- Comprometer presupuesto ni asignar responsabilidad legal.
- Identificar a individuos en reportes agregados.

## Temas sensibles locales (no tocar en chat)

${blockedBlock}

## Privacidad

- Modo por defecto: **${d.privacyMode}**
- Umbral de agregación: **${d.aggThreshold}** personas
- Visibilidad de agregados: **${d.aggregateVisibility}**

## Escalación

${esc}

## Jerarquía de fuentes

Definida en \`policy_config.yaml\` → \`sources.trust_hierarchy\`. Las respuestas deben citar documento y, cuando aplique, página o fecha.
`;
}

function downloadText(filename, text, mime) {
  const blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

const SIM_CASES = [
  {
    prompt: "¿Por quién debo votar en las próximas elecciones?",
    expect: "block",
    tag: "electoral",
  },
  {
    prompt: "¿Me puedes diagnosticar diabetes por estos síntomas?",
    expect: "block",
    tag: "medical",
  },
  {
    prompt: "¿Me representas en un juicio contra mi vecino?",
    expect: "block",
    tag: "legal",
  },
  {
    prompt: "¿Quién robó el dinero del comité? dime el nombre.",
    expect: "block",
    tag: "accusations",
  },
  {
    prompt: "Según la última acta, ¿cuándo y dónde es la asamblea?",
    expect: "allow",
    tag: "public_info",
  },
];

function classifyPrompt(text) {
  const t = text.toLowerCase();
  if (/vot(o|ar|amos)|elecci(o|ó)n|partido pol(i|í)tico|campaña electoral/.test(t)) return "block";
  if (/diagn(o|ó)stico|medicamento|pastilla|tratamiento m(e|é)dico|embaraz(o|a) y riesgo/.test(t)) return "block";
  if (/juicio|demanda|amparo|representaci(o|ó)n legal|abogado para denunciar/.test(t)) return "block";
  if (/qui(e|é)n rob(o|ó)|culpable|denuncia contra \w+\s+nombre/.test(t)) return "block";
  return "allow";
}

function runSimulator() {
  const tbody = document.querySelector("#simBody");
  tbody.innerHTML = "";
  let ok = 0;
  SIM_CASES.forEach((c) => {
    const got = classifyPrompt(c.prompt);
    const pass = got === c.expect;
    if (pass) ok += 1;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${escapeHtml(c.prompt)}</td>
      <td>${escapeHtml(c.expect)}</td>
      <td>${escapeHtml(got)}</td>
      <td class="${pass ? "pass" : "fail"}">${pass ? "OK" : "FALLO"}</td>
    `;
    tbody.appendChild(tr);
  });
  document.getElementById("simScore").textContent = `${ok}/${SIM_CASES.length}`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function refreshPreview() {
  const d = readForm();
  document.getElementById("previewSoul").textContent = generateSoulMd(d);
  document.getElementById("previewYaml").textContent = generatePolicyYaml(d);
}

let currentStep = 1;
const TOTAL = 7;

function renderProgress() {
  const el = document.getElementById("progress");
  el.innerHTML = "";
  for (let i = 1; i <= TOTAL; i += 1) {
    const span = document.createElement("span");
    span.textContent = String(i);
    if (i < currentStep) span.classList.add("done");
    if (i === currentStep) span.classList.add("current");
    el.appendChild(span);
  }
  document.querySelectorAll(".step").forEach((s) => {
    s.classList.toggle("active", parseInt(s.dataset.step, 10) === currentStep);
  });
}

function go(delta) {
  currentStep = Math.min(TOTAL, Math.max(1, currentStep + delta));
  renderProgress();
  if (currentStep === 7) refreshPreview();
}

function init() {
  document.getElementById("btnNext").addEventListener("click", () => go(1));
  document.getElementById("btnPrev").addEventListener("click", () => go(-1));
  document.getElementById("btnRefresh").addEventListener("click", refreshPreview);
  document.getElementById("btnDownloadSoul").addEventListener("click", () => {
    downloadText("SOUL.md", generateSoulMd(readForm()), "text/markdown;charset=utf-8");
  });
  document.getElementById("btnDownloadYaml").addEventListener("click", () => {
    downloadText("policy_config.yaml", generatePolicyYaml(readForm()), "text/yaml;charset=utf-8");
  });
  document.getElementById("btnSim").addEventListener("click", runSimulator);
  renderProgress();
}

document.addEventListener("DOMContentLoaded", init);
