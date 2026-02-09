const quizData = [
  {
    id: "q1",
    type: "multi",
    prompt: "Welche Bereiche sind auf der Webseite als Navigation bzw. Rubriken sichtbar?",
    options: [
      "Zeitstrahl",
      "Kapitel",
      "Ernstfall",
      "Interviews",
      "Glossar",
      "Archiv"
    ],
    answer: [0, 1, 2, 3],
    feedback: "Die sichtbaren Rubriken umfassen Zeitstrahl, Kapitel, Ernstfall und Interviews."
  },
  {
    id: "q2",
    type: "multi",
    prompt: "Welche Themen erscheinen in der Kapiteluebersicht?",
    options: [
      "Kalter Krieg",
      "Kuba",
      "Untergang UdSSR",
      "Atomwaffen auf deutschem Boden",
      "Berliner Mauer"
    ],
    answer: [0, 1, 2, 3],
    feedback: "In der Uebersicht sind u.a. Kalter Krieg, Kuba, Untergang UdSSR und Atomwaffen auf deutschem Boden sichtbar."
  },
  {
    id: "q3",
    type: "single",
    prompt: "Welche Rubrik fuehrt zu Zeitzeugen-Interviews?",
    options: [
      "Interviews",
      "Zeitstrahl",
      "Kapitel",
      "Ernstfall"
    ],
    answer: [0],
    feedback: "Die Rubrik 'Interviews' fuehrt zu den Zeitzeugeninterviews."
  },
  {
    id: "q4",
    type: "single",
    prompt: "Wie beschreibt die Seite den Bereich Zeitstrahl?",
    options: [
      "Chronologische Darstellung des Kalten Krieges in Bildern und Dokumenten",
      "Sammlung von Literaturhinweisen",
      "Reiner Audio-Podcast",
      "Glossar wichtiger Begriffe"
    ],
    answer: [0],
    feedback: "Der Zeitstrahl stellt den Kalten Krieg in Bildern und Dokumenten chronologisch dar."
  },
  {
    id: "q5",
    type: "text",
    prompt: "Beobachtungsauftrag: Notiere 2 Hinweise aus 'Ernstfall', die zeigen, wie sich Menschen auf einen Krisenfall vorbereitet haben.",
    feedback: "Selbstcheck: Nenne konkrete Massnahmen, Orte oder Dokumente, die auf Vorbereitung/Bevoelkerungsschutz hinweisen."
  },
  {
    id: "q6",
    type: "text",
    prompt: "Beobachtungsauftrag: Waehle ein Interview aus und notiere eine Kernaussage sowie ein wörtliches Zitat (max. 15 Woerter).",
    feedback: "Selbstcheck: Aussage paraphrasieren, Zitat kurz halten und Quelle nennen."
  }
];

const quiz = document.getElementById("quiz");
const scoreBox = document.getElementById("score");
const submitBtn = document.getElementById("submit");
const resetBtn = document.getElementById("reset");

function render() {
  quiz.innerHTML = "";
  quizData.forEach((q, idx) => {
    const wrapper = document.createElement("div");
    wrapper.className = "question";

    const title = document.createElement("h3");
    title.textContent = `${idx + 1}. ${q.prompt}`;
    wrapper.appendChild(title);

    if (q.type === "text") {
      const input = document.createElement("textarea");
      input.rows = 3;
      input.name = q.id;
      input.placeholder = "Deine Notizen...";
      input.style.width = "100%";
      wrapper.appendChild(input);

      const fb = document.createElement("p");
      fb.className = "hint";
      fb.textContent = q.feedback;
      wrapper.appendChild(fb);
    } else {
      const options = document.createElement("div");
      options.className = "options";
      q.options.forEach((opt, i) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = q.type === "multi" ? "checkbox" : "radio";
        input.name = q.id;
        input.value = i;
        label.appendChild(input);
        label.append(` ${opt}`);
        options.appendChild(label);
      });
      wrapper.appendChild(options);

      const fb = document.createElement("p");
      fb.className = "hint";
      fb.dataset.feedback = q.id;
      wrapper.appendChild(fb);
    }

    quiz.appendChild(wrapper);
  });
}

function evaluate() {
  let score = 0;
  let total = 0;

  quizData.forEach((q) => {
    if (q.type === "text") return;
    total += 1;

    const inputs = Array.from(document.querySelectorAll(`input[name='${q.id}']`));
    const selected = inputs.filter((i) => i.checked).map((i) => Number(i.value));
    const correct = q.answer.slice().sort().join(",");
    const chosen = selected.slice().sort().join(",");
    const isCorrect = correct === chosen;

    if (isCorrect) score += 1;

    const fb = document.querySelector(`[data-feedback='${q.id}']`);
    fb.textContent = isCorrect ? `Richtig. ${q.feedback}` : `Noch nicht. ${q.feedback}`;
    fb.style.color = isCorrect ? "#0d4b3f" : "#b4552a";
  });

  scoreBox.textContent = `Ergebnis: ${score} / ${total} (MC-Fragen).`;
}

function resetAll() {
  document.querySelectorAll("input").forEach((i) => (i.checked = false));
  document.querySelectorAll("textarea").forEach((t) => (t.value = ""));
  document.querySelectorAll("[data-feedback]").forEach((f) => (f.textContent = ""));
  scoreBox.textContent = "";
}

render();
submitBtn.addEventListener("click", evaluate);
resetBtn.addEventListener("click", resetAll);
