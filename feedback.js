function normalize(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const interviews = [
  {
    id: "lezzi",
    name: "Bruno Lezzi (Nachrichtendienst / UNA)",
    keywords: [
      "una", "untergruppe nachrichtendienst", "nachrichtendienst", "geheimdienst",
      "p-26", "p26", "p 26", "p-27", "p27", "p 27",
      "kgb", "sowjet", "ostblock", "jeanmaire", "bachmann", "schilling",
      "neutralitaet", "neutralität", "zusammenarbeit", "befreundete dienste"
    ],
    musts: ["una", "nachrichtendienst"],
    hints: [
      "Erwaehne die Rolle der UNA in der Lagebeurteilung.",
      "Greife die Spannung zwischen Neutralitaet und Zusammenarbeit auf.",
      "Nenne ein konkretes Beispiel (z. B. P-26/P-27 oder eine Affaere)."
    ]
  },
  {
    id: "mumenthaler",
    name: "Hans Mumenthaler (Zivilschutz)",
    keywords: [
      "zivilschutz", "luftschutz", "ortschef", "sollbestand", "sollbestaende",
      "kommunal", "foederal", "föderal", "schutzraum", "schutzraeume",
      "bundesamt", "bzs", "organisation", "bevoelkerungsschutz"
    ],
    musts: ["zivilschutz"],
    hints: [
      "Erklaere den Unterschied zwischen Luftschutz und Zivilschutz.",
      "Nenne eine organisatorische Herausforderung (Sollbestand, Foederalismus).",
      "Beziehe dich auf Schutzraeume oder Ortschef-Strukturen."
    ]
  },
  {
    id: "haesler",
    name: "Heinz Haesler (Armee)",
    keywords: [
      "armee", "to 61", "truppenordnung", "konzeptionsstreit",
      "mobile", "statische", "verteidigung", "generalstabschef",
      "nachrichtendienst", "mirage", "mirage affaere", "mirage-affaere",
      "strategie", "modernisierung"
    ],
    musts: ["armee"],
    hints: [
      "Setze den Konzeptionsstreit (mobile vs. statische Verteidigung) in Beziehung.",
      "Nenne einen Hinweis auf Modernisierung oder TO 61.",
      "Geh auf Nachrichtendienst oder einen Skandal/Fehler ein."
    ]
  },
  {
    id: "hurni",
    name: "Johanna Hurni (FHD/MFD)",
    keywords: [
      "fhd", "mfd", "frauen", "vorurteile", "dienst", "brigadier",
      "akzeptanz", "arbeitgeber", "rollenbild", "gleichberechtigung",
      "fhd mfd", "fhd -> mfd"
    ],
    musts: ["fhd", "mfd"],
    hints: [
      "Nenne die Motivation fuer den Dienst im FHD/MFD.",
      "Beschreibe eine Schwierigkeit (Vorurteile/Akzeptanz).",
      "Beziehe dich auf den Uebergang FHD -> MFD."
    ]
  },
  {
    id: "feldmann",
    name: "Josef Feldmann (Armee / Unterstabschef Front)",
    keywords: [
      "mobile verteidigung", "gesamtverteidigung", "dreizack", "bedrohung",
      "atomsperrvertrag", "abschreckung", "invasion", "manover", "manoever",
      "front", "unterstabschef"
    ],
    musts: ["gesamtverteidigung"],
    hints: [
      "Benenne die Bedrohungslage und ihre Richtung.",
      "Erklaere kurz, warum er mobile Verteidigung bevorzugt.",
      "Nenne eine Grossuebung oder die Haltung zur Nuklearfrage."
    ]
  },
  {
    id: "hochstrasser",
    name: "Urs Hochstrasser (Atomenergie)",
    keywords: [
      "atom", "nuklear", "geheimstudie", "delegierter", "uran",
      "schwellenland", "bundesrat", "atomenergie", "nuklearbewaffnung",
      "atomwaffen", "kernenergie"
    ],
    musts: ["atom"],
    hints: [
      "Erwaehne seine Funktion als Delegierter fuer Atomenergie.",
      "Beziehe dich auf die Geheimstudie zur Nuklearbewaffnung.",
      "Nenne einen Aspekt zu Uran oder Schwellenland-Status."
    ]
  },
  {
    id: "wehrli",
    name: "Willi Wehrli (Zivilschutz Ortschef)",
    keywords: [
      "zivilschutz", "ortschef", "uebung", "uebugen", "schutzraum",
      "schutzraeume", "praxis", "foederal", "pflicht", "freiwillig",
      "notliegen", "einsatz"
    ],
    musts: ["zivilschutz"],
    hints: [
      "Nenne eine konkrete Praxis- oder Uebungserfahrung.",
      "Beziehe dich auf Schutzraeume/Alltag.",
      "Greife Foederalismus oder Pflicht/Freiwilligkeit auf."
    ]
  },
  {
    id: "huwyler",
    name: "Andrea Huwyler-Bachmann (Historikerin)",
    keywords: [
      "zivilschutzanlage", "schutzanlage", "schutzraum", "schutzraeume",
      "zivile vorbereitungen", "zivilschutz", "dritter weltkrieg",
      "bevoelkerung", "schutz"
    ],
    musts: ["zivilschutz"],
    hints: [
      "Beziehe dich auf die grosse Zivilschutzanlage als Beispiel.",
      "Nenne eine konkrete zivile Vorbereitung und deren Wirkung.",
      "Ordne die Aussagen in den gesellschaftlichen Kontext ein."
    ]
  },
  {
    id: "stuessi",
    name: "Juerg Stuessi-Lauterburg (Militaerhistoriker)",
    keywords: [
      "militaer", "militaerisch", "vorbereitungen", "nuklear",
      "atomwaffen", "nuklearbewaffnung", "plaene", "bericht"
    ],
    musts: ["militaer"],
    hints: [
      "Benenne eine militaerische Vorbereitung, die er hervorhebt.",
      "Greife die Frage der Nuklearbewaffnung auf.",
      "Zeige, wie seine historische Perspektive die Aussage formt."
    ]
  }
];

const DEBUG_DEFAULT = true;

function renderForms() {
  const container = document.getElementById("forms");
  container.innerHTML = interviews.map((i) => `
    <div class="interview" id="${i.id}">
      <h3>${i.name}</h3>
      <label>Kernaussage (1-2 Saetze)
        <textarea data-field="core" rows="2"></textarea>
      </label>
      <label>Beleg/Zitat 1 (max. 15 Woerter)
        <textarea data-field="evidence1" rows="2"></textarea>
      </label>
      <label>Beleg/Zitat 2 (max. 15 Woerter)
        <textarea data-field="evidence2" rows="2"></textarea>
      </label>
      <label>Fakt vs. Deutung (2-3 Saetze)
        <textarea data-field="fact" rows="2"></textarea>
      </label>
      <label>Perspektive/Rolle
        <textarea data-field="perspective" rows="2"></textarea>
      </label>
      <label>Kontextabgleich (Kapitel/Ernstfall/Zeitstrahl)
        <textarea data-field="context" rows="2"></textarea>
      </label>
      <label class="debug-toggle">
        <input type="checkbox" data-field="debug" ${DEBUG_DEFAULT ? "checked" : ""} />
        Erkanntes anzeigen
      </label>
      <div class="actions">
        <button class="btn" data-action="check">Feedback geben</button>
        <button class="btn ghost" data-action="reset">Leeren</button>
      </div>
      <div class="feedback"></div>
    </div>
  `).join("");
}

function scoreText(text, keywords) {
  const raw = text.toLowerCase();
  const norm = normalize(text);

  const hits = [];
  keywords.forEach((k) => {
    const kRaw = k.toLowerCase();
    const kNorm = normalize(k);
    if (raw.includes(kRaw) || norm.includes(kNorm)) hits.push(k);
  });
  return { hits, count: hits.length };
}

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

function feedbackFor(interview, fields) {
  const messages = [];
  const missing = [];

  Object.entries(fields).forEach(([k, v]) => {
    if (!v.trim()) missing.push(k);
  });

  if (missing.length) {
    messages.push(`Pflichtfelder fehlen: ${missing.join(", ")}.`);
  } else {
    messages.push("Alle Pflichtfelder sind ausgefuellt.");
  }

  if (wordCount(fields.core) < 8) {
    messages.push("Kernaussage ist sehr kurz. Formuliere 1-2 ganze Saetze.");
  }

  if (wordCount(fields.fact) < 6) {
    messages.push("Fakt vs. Deutung ist zu knapp. Trenne klar Erlebnis und Bewertung.");
  }

  if (wordCount(fields.perspective) < 5) {
    messages.push("Perspektive/Rolle ist zu knapp. Nenne Funktion und Einfluss.");
  }

  if (wordCount(fields.context) < 5) {
    messages.push("Kontextabgleich ist zu knapp. Nenne eine konkrete Kontextseite und warum sie passt.");
  }

  if (wordCount(fields.evidence1) > 18 || wordCount(fields.evidence2) > 18) {
    messages.push("Mindestens ein Beleg ist zu lang. Halte Zitate unter 15 Woertern.");
  }

  const combined = Object.values(fields).join(" ");
  const { hits } = scoreText(combined, interview.keywords);
  const mustHits = interview.musts.filter(k => {
    const kRaw = k.toLowerCase();
    const kNorm = normalize(k);
    return combined.toLowerCase().includes(kRaw) || normalize(combined).includes(kNorm);
  });

  if (mustHits.length === 0) {
    messages.push("Themenabdeckung: zentrale Begriffe fehlen. Verwende mindestens einen Kernbegriff aus dem Interview.");
  } else if (hits.length <= 2) {
    messages.push(`Themenabdeckung: teilweise (erkannte Begriffe: ${hits.join(", ")}). Ergaenze weitere konkrete Aspekte.`);
  } else {
    messages.push(`Themenabdeckung: gut (erkannte Begriffe: ${hits.join(", ")}).`);
  }

  messages.push("Hinweise zur Vertiefung:");
  interview.hints.forEach(h => messages.push(`- ${h}`));

  return { messages, hits, mustHits };
}

function bindHandlers() {
  document.querySelectorAll(".interview").forEach((block, idx) => {
    const interview = interviews[idx];
    const feedbackBox = block.querySelector(".feedback");

    block.querySelector("[data-action='check']").addEventListener("click", () => {
      const fields = {};
      block.querySelectorAll("textarea").forEach((t) => {
        fields[t.dataset.field] = t.value;
      });

      const { messages, hits, mustHits } = feedbackFor(interview, fields);
      const debugEnabled = block.querySelector("[data-field='debug']").checked;

      let debug = "";
      if (debugEnabled) {
        debug = `<p class="debug">Erkannt: ${hits.length ? hits.join(", ") : "(nichts)"}<br/>Kernbegriffe: ${mustHits.length ? mustHits.join(", ") : "(keine)"}</p>`;
      }

      feedbackBox.innerHTML = `<ul>${messages.map(m => `<li>${m}</li>`).join("")}</ul>${debug}`;
      feedbackBox.classList.add("active");
    });

    block.querySelector("[data-action='reset']").addEventListener("click", () => {
      block.querySelectorAll("textarea").forEach((t) => (t.value = ""));
      feedbackBox.innerHTML = "";
      feedbackBox.classList.remove("active");
    });
  });
}

renderForms();
bindHandlers();
