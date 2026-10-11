(function () {
  "use strict";

  const content = window.KLEIN_CONTENT;
  const clamp = (value) => Math.max(0, Math.min(100, Math.round(value)));

  const state = {
    scene: "arrival",
    mode: "student",
    activeMechanism: null,
    frustration: content.scenes.arrival.frustration,
    containment: content.scenes.arrival.containment,
    integration: 38,
    repair: 24,
    anxietyAdjustment: 0
  };

  const el = {
    sceneNumber: document.getElementById("sceneNumber"),
    sceneText: document.getElementById("sceneText"),
    observationPrompt: document.getElementById("observationPrompt"),
    teacherPrompt: document.getElementById("teacherPrompt"),
    readingTitle: document.getElementById("readingTitle"),
    readingText: document.getElementById("readingText"),
    processToken: document.getElementById("processToken"),
    positionPill: document.getElementById("positionPill"),
    frustrationRange: document.getElementById("frustrationRange"),
    containmentRange: document.getElementById("containmentRange"),
    frustrationOutput: document.getElementById("frustrationOutput"),
    containmentOutput: document.getElementById("containmentOutput"),
    interpretation: document.getElementById("teacherInterpretation"),
    integrationArc: document.getElementById("integrationArc"),
    spectrumMarker: document.getElementById("spectrumMarker"),
    quizQuestions: document.getElementById("quizQuestions"),
    quizForm: document.getElementById("quizForm"),
    quizResult: document.getElementById("quizResult"),
    retryQuiz: document.getElementById("retryQuiz"),
    responseTitle: document.getElementById("responseTitle"),
    responseText: document.getElementById("responseText"),
    responseCaution: document.getElementById("responseCaution"),
    objectResponseLabel: document.getElementById("objectResponseLabel"),
    reintrojectionLabel: document.getElementById("reintrojectionLabel"),
    reasoningItems: document.getElementById("reasoningItems"),
    reasoningForm: document.getElementById("reasoningForm"),
    reasoningResult: document.getElementById("reasoningResult"),
    resetReasoning: document.getElementById("resetReasoning")
  };

  function baseValues() {
    const anxiety = clamp(34 + state.frustration * 0.58 - state.containment * 0.28 + state.anxietyAdjustment);
    const integration = clamp(state.integration + state.containment * 0.12 - state.frustration * 0.08);
    const repair = clamp(state.repair + state.containment * 0.08 - state.frustration * 0.04);
    return { anxiety, integration, repair };
  }

  function positionFor(values) {
    if (values.integration >= 62 && values.repair >= 48 && values.anxiety < 60) {
      return { label: "Predominio depresivo", className: "depressive" };
    }
    if (values.integration >= 43 || values.repair >= 38) {
      return { label: "Movimiento de integración", className: "transition" };
    }
    return { label: "Predominio esquizoparanoide", className: "paranoid" };
  }

  function setMeter(name, value) {
    document.getElementById(`${name}Value`).textContent = value;
    document.getElementById(`${name}Bar`).style.width = `${value}%`;
  }

  function renderWorld() {
    const values = baseValues();
    const position = positionFor(values);

    setMeter("anxiety", values.anxiety);
    setMeter("integration", values.integration);
    setMeter("repair", values.repair);

    el.positionPill.textContent = position.label;
    el.positionPill.dataset.position = position.className;
    el.spectrumMarker.style.left = `${clamp(values.integration)}%`;
    el.integrationArc.style.opacity = String(Math.max(0.14, values.integration / 100));

    document.body.classList.toggle("integrated", values.integration >= 52);
    document.body.classList.toggle("high-anxiety", values.anxiety >= 66);
    document.body.classList.toggle("reparative", values.repair >= 52);

    if (!state.activeMechanism) {
      if (position.className === "depressive") {
        el.readingTitle.textContent = "La ambivalencia puede sostenerse";
        el.readingText.textContent = "El objeto se percibe con mayor complejidad. El cuidado y la frustración pueden pertenecer a la misma figura, lo que abre espacio para la preocupación y la reparación.";
        el.processToken.textContent = "El objeto total empieza a reconocerse";
      } else if (position.className === "transition") {
        el.readingTitle.textContent = "Aparece un movimiento de integración";
        el.readingText.textContent = "La separación entre lo gratificante y lo frustrante pierde rigidez. La ambivalencia todavía genera tensión, pero puede pensarse sin expulsarla por completo.";
        el.processToken.textContent = "La experiencia comienza a integrarse";
      } else {
        el.readingTitle.textContent = "Una experiencia todavía dividida";
        el.readingText.textContent = "La ansiedad favorece una separación marcada entre el objeto que cuida y el objeto que frustra. Esta lectura es una hipótesis para explorar, no una conclusión diagnóstica.";
        el.processToken.textContent = "La experiencia está fragmentada";
      }
    }

    el.interpretation.innerHTML = `<strong>${position.label}.</strong> Ansiedad ${values.anxiety}/100, integración ${values.integration}/100 y reparación ${values.repair}/100. Estos valores solo muestran relaciones dentro del simulador y no son puntuaciones clínicas.`;
  }

  function loadScene(sceneKey) {
    const scene = content.scenes[sceneKey];
    state.scene = sceneKey;
    state.activeMechanism = null;
    state.frustration = scene.frustration;
    state.containment = scene.containment;
    state.integration = sceneKey === "repair" ? 54 : sceneKey === "frustration" ? 20 : 38;
    state.repair = sceneKey === "repair" ? 52 : sceneKey === "frustration" ? 14 : 24;
    state.anxietyAdjustment = 0;

    el.sceneNumber.textContent = scene.number;
    el.sceneText.textContent = scene.text;
    el.observationPrompt.textContent = scene.observation;
    el.teacherPrompt.textContent = scene.teacher;
    el.frustrationRange.value = state.frustration;
    el.containmentRange.value = state.containment;
    el.frustrationOutput.textContent = state.frustration;
    el.containmentOutput.textContent = state.containment;

    document.querySelectorAll("[data-scene]").forEach((button) => {
      const selected = button.dataset.scene === sceneKey;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.querySelectorAll("[data-mechanism]").forEach((button) => button.classList.remove("active"));
    renderWorld();
  }

  function activateMechanism(key) {
    const mechanism = content.mechanisms[key];
    const isSame = state.activeMechanism === key;
    loadScene(state.scene);
    if (isSame) return;

    state.activeMechanism = key;
    state.integration = clamp(state.integration + mechanism.effects.integration);
    state.repair = clamp(state.repair + mechanism.effects.repair);
    state.anxietyAdjustment = mechanism.effects.anxiety;
    el.readingTitle.textContent = mechanism.title;
    el.readingText.textContent = mechanism.text;
    el.processToken.textContent = mechanism.token;
    document.querySelector(`[data-mechanism="${key}"]`).classList.add("active");
    renderWorld();
  }

  function setMode(mode) {
    state.mode = mode;
    document.querySelectorAll("[data-mode]").forEach((button) => {
      const active = button.dataset.mode === mode;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".teacher-only").forEach((node) => {
      node.hidden = mode !== "teacher";
    });
  }

  function buildGlossary() {
    document.getElementById("glossaryList").innerHTML = content.glossary.map(([term, definition]) => `
      <details>
        <summary>${term}</summary>
        <p>${definition}</p>
      </details>
    `).join("");
  }

  function buildQuiz() {
    el.quizQuestions.innerHTML = content.quiz.map((item, questionIndex) => `
      <article class="question-card" data-question-card="${questionIndex}">
        <fieldset>
          <legend>${questionIndex + 1}. ${item.question}</legend>
          ${item.options.map((option, optionIndex) => `
            <label class="option">
              <input type="radio" name="question-${questionIndex}" value="${optionIndex}">
              <span>${option}</span>
            </label>
          `).join("")}
        </fieldset>
        <p class="question-feedback" hidden></p>
      </article>
    `).join("");
  }

  function setResponseMeter(name, value) {
    document.getElementById(`${name}Output`).textContent = value;
    document.getElementById(`${name}Bar`).style.width = `${value}%`;
  }

  function resetProjectiveCycle() {
    document.querySelectorAll("[data-response]").forEach((button) => button.classList.remove("active"));
    document.querySelectorAll("[data-cycle-step]").forEach((step, index) => step.classList.toggle("active", index === 0));
    el.responseTitle.textContent = "Selecciona una respuesta";
    el.responseText.textContent = "El modelo mostrará cómo la respuesta del objeto podría participar en la continuidad o transformación del ciclo.";
    el.responseCaution.textContent = "Los valores son comparaciones didácticas, no mediciones clínicas.";
    el.objectResponseLabel.textContent = "Aún no seleccionada.";
    el.reintrojectionLabel.textContent = "El ciclo permanece abierto.";
    ["persecution", "differentiation", "symbolization"].forEach((name) => setResponseMeter(name, 50));
  }

  function activateProjectiveResponse(key) {
    const response = content.projectiveResponses[key];
    document.querySelectorAll("[data-response]").forEach((button) => {
      button.classList.toggle("active", button.dataset.response === key);
    });
    document.querySelectorAll("[data-cycle-step]").forEach((step) => step.classList.add("active"));
    el.responseTitle.textContent = response.title;
    el.responseText.textContent = response.text;
    el.responseCaution.textContent = response.caution;
    el.objectResponseLabel.textContent = response.object;
    el.reintrojectionLabel.textContent = response.reintrojection;
    Object.entries(response.metrics).forEach(([name, value]) => setResponseMeter(name, value));
  }

  function buildReasoningActivity() {
    const choices = [
      ["", "Selecciona un nivel"],
      ["observation", "Observación"],
      ["inference", "Inferencia"],
      ["hypothesis", "Hipótesis teórica"],
      ["overreach", "Conclusión injustificada"]
    ];
    el.reasoningItems.innerHTML = content.reasoningItems.map((item, index) => `
      <article class="reasoning-item" data-reasoning-item="${index}">
        <span class="reasoning-number">${index + 1}</span>
        <div>
          <p>${item.text}</p>
          <label for="reasoning-${index}">Nivel de lectura</label>
          <select id="reasoning-${index}" name="reasoning-${index}">
            ${choices.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}
          </select>
          <p class="reasoning-feedback" hidden></p>
        </div>
      </article>
    `).join("");
  }

  function gradeReasoning(event) {
    event.preventDefault();
    let score = 0;
    let answered = 0;
    content.reasoningItems.forEach((item, index) => {
      const card = document.querySelector(`[data-reasoning-item="${index}"]`);
      const selected = card.querySelector("select").value;
      const feedback = card.querySelector(".reasoning-feedback");
      card.classList.remove("correct", "incorrect");
      if (!selected) {
        feedback.textContent = "Selecciona un nivel para clasificar esta frase.";
        feedback.hidden = false;
        return;
      }
      answered += 1;
      const correct = selected === item.correct;
      if (correct) score += 1;
      card.classList.add(correct ? "correct" : "incorrect");
      feedback.textContent = `${correct ? "Correcto. " : "Conviene revisar el nivel. "}${item.explanation}`;
      feedback.hidden = false;
    });
    const complete = answered === content.reasoningItems.length;
    const title = complete ? `${score} de ${content.reasoningItems.length} clasificaciones correctas` : "Clasificación incompleta";
    const message = complete
      ? score === content.reasoningItems.length
        ? "Separaste con precisión la observación de los niveles interpretativos."
        : "Lee las explicaciones y observa dónde una frase añade significado o convierte una hipótesis en certeza."
      : `Has clasificado ${answered} de ${content.reasoningItems.length} frases.`;
    el.reasoningResult.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
    el.reasoningResult.hidden = false;
    el.resetReasoning.hidden = false;
    el.reasoningResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function gradeQuiz(event) {
    event.preventDefault();
    let score = 0;
    let answered = 0;

    content.quiz.forEach((item, index) => {
      const card = document.querySelector(`[data-question-card="${index}"]`);
      const selected = document.querySelector(`input[name="question-${index}"]:checked`);
      const feedback = card.querySelector(".question-feedback");
      card.classList.remove("correct", "incorrect");

      if (!selected) {
        feedback.textContent = "Selecciona una respuesta para revisar este punto.";
        feedback.hidden = false;
        return;
      }

      answered += 1;
      const correct = Number(selected.value) === item.correct;
      if (correct) score += 1;
      card.classList.add(correct ? "correct" : "incorrect");
      feedback.textContent = `${correct ? "Correcto. " : "Revisa la relación conceptual. "}${item.feedback}`;
      feedback.hidden = false;
    });

    const complete = answered === content.quiz.length;
    const message = complete
      ? score === content.quiz.length
        ? "Distinguiste los conceptos y mantuviste una lectura clínicamente prudente."
        : "Revisa las explicaciones de cada respuesta y vuelve a relacionarlas con la viñeta."
      : `Has respondido ${answered} de ${content.quiz.length} preguntas. Completa las restantes para obtener el resultado final.`;

    el.quizResult.innerHTML = `<h3>${complete ? `${score} de ${content.quiz.length} respuestas correctas` : "Autoevaluación incompleta"}</h3><p>${message}</p>`;
    el.quizResult.hidden = false;
    el.retryQuiz.hidden = false;
    el.quizResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.querySelectorAll("[data-scene]").forEach((button) => {
    button.addEventListener("click", () => loadScene(button.dataset.scene));
    button.addEventListener("keydown", (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      const tabs = [...document.querySelectorAll("[data-scene]")];
      const current = tabs.indexOf(button);
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = tabs[(current + direction + tabs.length) % tabs.length];
      next.focus();
      loadScene(next.dataset.scene);
    });
  });

  document.querySelectorAll("[data-mechanism]").forEach((button) => {
    button.addEventListener("click", () => activateMechanism(button.dataset.mechanism));
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  document.querySelectorAll("[data-response]").forEach((button) => {
    button.addEventListener("click", () => activateProjectiveResponse(button.dataset.response));
  });
  document.getElementById("resetResponse").addEventListener("click", resetProjectiveCycle);

  document.getElementById("resetButton").addEventListener("click", () => loadScene(state.scene));

  el.frustrationRange.addEventListener("input", (event) => {
    state.frustration = Number(event.target.value);
    state.activeMechanism = null;
    state.anxietyAdjustment = 0;
    el.frustrationOutput.textContent = state.frustration;
    document.querySelectorAll("[data-mechanism]").forEach((button) => button.classList.remove("active"));
    renderWorld();
  });

  el.containmentRange.addEventListener("input", (event) => {
    state.containment = Number(event.target.value);
    state.activeMechanism = null;
    state.anxietyAdjustment = 0;
    el.containmentOutput.textContent = state.containment;
    document.querySelectorAll("[data-mechanism]").forEach((button) => button.classList.remove("active"));
    renderWorld();
  });

  document.getElementById("toggleInterpretation").addEventListener("click", (event) => {
    const willOpen = el.interpretation.hidden;
    el.interpretation.hidden = !willOpen;
    event.currentTarget.setAttribute("aria-expanded", String(willOpen));
    event.currentTarget.textContent = willOpen ? "×" : "?";
    event.currentTarget.title = willOpen ? "Ocultar lectura orientativa" : "Mostrar lectura orientativa";
  });

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => document.getElementById(button.dataset.open).showModal());
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.querySelector("[data-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const box = dialog.getBoundingClientRect();
      const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
      if (outside) dialog.close();
    });
  });

  el.quizForm.addEventListener("submit", gradeQuiz);
  el.retryQuiz.addEventListener("click", () => {
    el.quizForm.reset();
    el.quizResult.hidden = true;
    el.retryQuiz.hidden = true;
    document.querySelectorAll(".question-card").forEach((card) => {
      card.classList.remove("correct", "incorrect");
      card.querySelector(".question-feedback").hidden = true;
    });
    document.getElementById("assessment-title").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  el.reasoningForm.addEventListener("submit", gradeReasoning);
  el.resetReasoning.addEventListener("click", () => {
    el.reasoningForm.reset();
    el.reasoningResult.hidden = true;
    el.resetReasoning.hidden = true;
    document.querySelectorAll(".reasoning-item").forEach((card) => {
      card.classList.remove("correct", "incorrect");
      card.querySelector(".reasoning-feedback").hidden = true;
    });
    document.getElementById("reasoning-title").scrollIntoView({ behavior: "smooth", block: "center" });
  });

  buildGlossary();
  buildQuiz();
  buildReasoningActivity();
  resetProjectiveCycle();
  loadScene("arrival");
  setMode("student");
})();
