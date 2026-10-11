/* Contenido científico y pedagógico separado de la lógica visual. */
window.KLEIN_CONTENT = {
  scenes: {
    arrival: {
      number: "1",
      text: "Clara, de cinco años, entra al consultorio y construye una casa. Coloca una figura pequeña dentro y deja a la figura adulta en la puerta. Cuando la terapeuta comenta que la casa parece segura, Clara responde: «Solo cuando ella quiere». El relato permite varias lecturas y todavía no define un mecanismo por sí mismo.",
      observation: "Observa cómo conviven la búsqueda de cuidado y la expectativa de frustración. ¿Puede el mismo objeto contener ambas cualidades?",
      teacher: "¿Qué datos de la escena sostienen una hipótesis kleiniana y qué información faltaría antes de formularla?",
      frustration: 44,
      containment: 58
    },
    frustration: {
      number: "2",
      text: "Una pieza no encaja y la casa se derrumba. Clara aparta a la figura adulta y dice: «La mamá mala la tiró». Después protege a la figura pequeña detrás de una muralla. La atribución aparece en un momento de frustración intensa y debe comprenderse dentro de la secuencia completa.",
      observation: "Distingue la conducta observable de la interpretación. ¿Qué cambia cuando la frustración aumenta y el objeto se vive como amenazante?",
      teacher: "¿Cómo diferenciarías una descripción del juego, una inferencia teórica y una conclusión clínica?",
      frustration: 82,
      containment: 25
    },
    repair: {
      number: "3",
      text: "La terapeuta espera y ofrece una pieza distinta. Clara reconstruye la casa, acerca nuevamente a la figura adulta y le dibuja una manta. Dice: «Ahora puede cuidarla, pero a veces se enoja». El gesto abre una posibilidad de integración y reparación, sin eliminar la ambivalencia.",
      observation: "Observa si aparece preocupación por el objeto y una mayor tolerancia a que la misma figura cuide y frustre.",
      teacher: "¿Por qué la reparación no equivale a obediencia, calma inmediata ni desaparición del conflicto?",
      frustration: 36,
      containment: 78
    }
  },
  mechanisms: {
    splitting: {
      title: "La experiencia se polariza",
      text: "La escisión organiza cualidades gratificantes y frustrantes como si pertenecieran a objetos separados. Puede proteger lo vivido como bueno cuando la ansiedad resulta difícil de tolerar.",
      token: "Objeto bueno y objeto malo se separan",
      effects: { integration: -18, repair: -5, anxiety: 13 }
    },
    projection: {
      title: "Lo amenazante se sitúa afuera",
      text: "En la proyección, impulsos o afectos propios se atribuyen al objeto. La escena puede sentirse más persecutoria, aunque una conducta aislada no permite confirmar este proceso.",
      token: "La amenaza se atribuye al objeto",
      effects: { integration: -8, repair: -4, anxiety: 17 }
    },
    introjection: {
      title: "La relación deja una huella interna",
      text: "La introyección incorpora aspectos de la experiencia con el objeto. Si predomina una relación suficientemente confiable, puede aumentar la seguridad interna; también pueden introyectarse cualidades persecutorias.",
      token: "La experiencia del vínculo se incorpora",
      effects: { integration: 12, repair: 8, anxiety: -9 }
    },
    repair: {
      title: "Surge el deseo de cuidar el vínculo",
      text: "La reparación expresa preocupación por un objeto que empieza a reconocerse como total. No borra la agresividad: permite asumir la ambivalencia e imaginar que el vínculo puede restaurarse.",
      token: "Culpa, cuidado y reparación se enlazan",
      effects: { integration: 17, repair: 22, anxiety: -13 }
    }
  },
  projectiveResponses: {
    defensive: {
      title: "La experiencia se devuelve sin elaboración",
      text: "Negar de inmediato el afecto puede dejar a Clara sola con una experiencia difícil de pensar. En este modelo, la amenaza permanece afuera y la diferenciación entre vivencia propia y respuesta del objeto cambia poco.",
      object: "Niega el afecto y lo devuelve.",
      reintrojection: "«Lo que siento es intolerable y nadie puede recibirlo».",
      caution: "Una aclaración defensiva no confirma el mecanismo; su sentido depende del tono, la secuencia y la historia del vínculo.",
      metrics: { persecution: 69, differentiation: 38, symbolization: 30 }
    },
    rejection: {
      title: "El retiro puede confirmar la expectativa persecutoria",
      text: "Al retirar el juego sin elaborar la escena, la respuesta puede vivirse como confirmación de que el objeto es rechazante o peligroso. La intensidad del ciclo aumenta dentro de esta simulación.",
      object: "Retira el juego y corta la interacción.",
      reintrojection: "«Mi enojo expulsa al objeto y el objeto me abandona».",
      caution: "Poner un límite puede ser necesario. Lo decisivo no es evitarlo, sino considerar cómo se comunica y se procesa.",
      metrics: { persecution: 82, differentiation: 28, symbolization: 18 }
    },
    enactment: {
      title: "El objeto actúa el afecto que circula",
      text: "La irritación de la terapeuta se vuelve conducta. Desde una lectura kleiniana ampliada, esto podría reforzar la fantasía de que la hostilidad pertenece por completo al objeto.",
      object: "Responde con irritación y brusquedad.",
      reintrojection: "«El objeto es tan destructivo como temía».",
      caution: "Sentir un afecto no equivale a actuarlo. La contratransferencia requiere reflexión y supervisión, no una interpretación automática.",
      metrics: { persecution: 88, differentiation: 22, symbolization: 14 }
    },
    containment: {
      title: "El afecto puede recibirse sin ser actuado",
      text: "La terapeuta reconoce el clima de enojo, conserva el límite temporal y ofrece palabras provisionales. El modelo representa una mayor posibilidad de diferenciar el afecto propio de la respuesta del objeto.",
      object: "Recibe el afecto, piensa y sostiene el límite.",
      reintrojection: "«Lo que siento puede ser contenido, pensado y devuelto de otra forma».",
      caution: "La función continente es un desarrollo poskleiniano asociado con Bion. No garantiza por sí misma integración ni cambio clínico.",
      metrics: { persecution: 34, differentiation: 74, symbolization: 81 }
    },
    premature: {
      title: "Nombrar demasiado pronto puede cerrar la exploración",
      text: "Una interpretación teóricamente plausible puede resultar intrusiva si llega antes de que la experiencia sea reconocible para Clara. El concepto desplaza la observación de lo que ocurre en la relación.",
      object: "Explica el mecanismo antes de explorar la vivencia.",
      reintrojection: "«El objeto sabe lo que me pasa, pero no necesariamente me comprende».",
      caution: "El momento, la forma y la capacidad de recibir una interpretación son tan importantes como su contenido.",
      metrics: { persecution: 61, differentiation: 44, symbolization: 39 }
    }
  },
  reasoningItems: [
    {
      text: "Clara empuja tres bloques hacia la terapeuta después de escuchar que la sesión terminará pronto.",
      correct: "observation",
      explanation: "Describe una secuencia visible sin atribuir todavía un significado psicológico."
    },
    {
      text: "La terapeuta informa que sintió un impulso repentino de apartar los juguetes con brusquedad.",
      correct: "observation",
      explanation: "Es un dato comunicado sobre la experiencia de la terapeuta. Su interpretación pertenece a un nivel posterior."
    },
    {
      text: "Clara parece vivir el final de la sesión como una experiencia amenazante.",
      correct: "inference",
      explanation: "Propone un significado probable a partir de la conducta y del contexto, pero todavía no nombra un mecanismo."
    },
    {
      text: "Si este patrón se repite, podría explorarse la hipótesis de una identificación proyectiva.",
      correct: "hypothesis",
      explanation: "Vincula provisionalmente los datos con un concepto y reconoce que necesita repetición y contexto."
    },
    {
      text: "La irritación de la terapeuta puede estar participando en la continuidad del ciclo relacional.",
      correct: "inference",
      explanation: "Relaciona dos elementos observados sin afirmar que se haya demostrado un mecanismo específico."
    },
    {
      text: "La escena confirma que Clara tiene una personalidad esquizoparanoide.",
      correct: "overreach",
      explanation: "Transforma una escena aislada en un diagnóstico y confunde una posición teórica dinámica con una categoría de personalidad."
    }
  ],
  glossary: [
    ["Objeto interno", "Representación psíquica, cargada de afecto, de otra persona o de aspectos de la relación con ella."],
    ["Escisión", "Defensa que mantiene separados aspectos vividos como buenos y malos cuando su coexistencia resulta difícil de tolerar."],
    ["Proyección", "Proceso por el cual impulsos, fantasías o afectos propios se atribuyen a un objeto externo."],
    ["Introyección", "Incorporación psíquica de aspectos del objeto y de la experiencia de relación con él."],
    ["Identificación proyectiva", "Concepto que articula fantasías de colocar partes del self en un objeto. Desarrollos posteriores examinan también cómo la relación puede convocar una experiencia o respuesta en el objeto."],
    ["Contención", "En desarrollos poskleinianos, especialmente Bion, capacidad de recibir una experiencia emocional, transformarla y devolverla en una forma más pensable."],
    ["Posición esquizoparanoide", "Configuración caracterizada por escisión, objetos parciales y ansiedades persecutorias. No es un diagnóstico."],
    ["Posición depresiva", "Configuración en la que aumenta la integración del objeto, la ambivalencia, la preocupación y el impulso reparador."],
    ["Reparación", "Impulso a preservar o restaurar el objeto que se teme haber dañado en la fantasía o en la relación."],
    ["Ambivalencia", "Posibilidad de reconocer sentimientos amorosos y hostiles hacia una misma persona sin dividirla por completo en dos objetos."]
  ],
  quiz: [
    {
      question: "Cuando Clara dice que la «mamá mala» derribó la casa, ¿cuál es la respuesta más prudente?",
      options: [
        "La escena demuestra por sí sola una identificación proyectiva.",
        "La escena permite explorar escisión y proyección como hipótesis, pero necesita contexto.",
        "La frase confirma una posición depresiva consolidada."
      ],
      correct: 1,
      feedback: "Una escena aislada puede orientar preguntas, pero no confirma automáticamente un mecanismo ni una organización clínica."
    },
    {
      question: "¿Qué cambio representa mejor una mayor integración del objeto?",
      options: [
        "Aceptar que la misma figura puede cuidar, frustrar y enojarse.",
        "Eliminar cualquier sentimiento hostil hacia la figura adulta.",
        "Separar por completo a la figura buena de la figura mala."
      ],
      correct: 0,
      feedback: "La integración implica tolerar cualidades y afectos ambivalentes en relación con un objeto total."
    },
    {
      question: "En la teoría kleiniana, la reparación se comprende mejor como:",
      options: [
        "Una conducta obediente que reduce el conflicto.",
        "Una técnica para evitar la culpa.",
        "Un movimiento de cuidado hacia el objeto que se teme haber dañado."
      ],
      correct: 2,
      feedback: "La reparación se vincula con preocupación, culpa y deseo de preservar o restaurar el objeto."
    },
    {
      question: "¿Cómo deben entenderse las posiciones esquizoparanoide y depresiva?",
      options: [
        "Como diagnósticos mutuamente excluyentes.",
        "Como modos dinámicos de organizar ansiedades, defensas y vínculos.",
        "Como edades cronológicas que no reaparecen en la vida adulta."
      ],
      correct: 1,
      feedback: "Las posiciones son configuraciones dinámicas. Pueden coexistir y reactivarse según el contexto."
    }
  ]
};
