// ============================
// LANGUAGE TOGGLE
// ============================
let currentLang = 'es';
function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  const btn = document.getElementById('langBtn');
  btn.textContent = currentLang === 'es' ? '🌐 EN' : '🌐 ES';
  
  // Translate all data-es/data-en elements
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    const text = el.getAttribute('data-' + currentLang);
    if (text) {
      if (el.tagName === 'INPUT') el.placeholder = text;
      else el.innerHTML = text;
    }
  });

  // Toggle reflection
  document.getElementById('reflEs').style.display = currentLang === 'es' ? '' : 'none';
  document.getElementById('reflEn').style.display = currentLang === 'en' ? '' : 'none';

  // Update carousel captions
  for(let i=0;i<5;i++) {
    const cap = document.getElementById('cap'+i);
    if(cap) {
      const text = cap.getAttribute('data-'+currentLang);
      if(text) cap.textContent = text;
    }
  }
  
  // Update glossary (titles, labels, definitions)
  updateGlossaryUI();
}

// ============================
// MOBILE NAV
// ============================
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ============================
// CAROUSEL
// ============================
let currentSlide = 0;
const totalSlides = 5;
let carouselInterval;

function renderDots() {
  const dots = document.getElementById('carouselDots');
  dots.innerHTML = '';
  for(let i=0;i<totalSlides;i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i===currentSlide?' active':'');
    d.onclick = ()=>goToSlide(i);
    dots.appendChild(d);
  }
}

function goToSlide(n) {
  currentSlide = (n+totalSlides)%totalSlides;
  document.getElementById('carouselTrack').style.transform = `translateX(-${currentSlide*100}%)`;
  renderDots();
}

function moveCarousel(dir) {
  goToSlide(currentSlide+dir);
  resetInterval();
}

function startInterval() {
  carouselInterval = setInterval(()=>goToSlide(currentSlide+1), 5000);
}
function resetInterval() {
  clearInterval(carouselInterval);
  startInterval();
}

renderDots();
startInterval();

// ============================
// MODAL
// ============================
function openModal(src) {
  document.getElementById('modalImg').src = src;
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if(e.key==='Escape') closeModal(); });

// ============================
// GLOSSARY
// ============================
// Format: [english_term, spanish_term, english_definition, spanish_definition]
const glossaryData = [
  ["Artificial Intelligence","Inteligencia Artificial","Simulation of human intelligence processes by machines.","Simulación de procesos de inteligencia humana por parte de máquinas."],
  ["Machine Learning","Aprendizaje Automático","AI systems that learn from data without being explicitly programmed.","Sistemas de IA que aprenden de datos sin ser programados explícitamente."],
  ["Large Language Model","Modelo de Lenguaje Grande","AI model trained on massive text datasets to generate human-like text (e.g. GPT, Claude).","Modelo de IA entrenado en grandes volúmenes de texto para generar lenguaje humano (ej. GPT, Claude)."],
  ["Agentic AI","IA Agéntica","AI that autonomously plans and executes multi-step tasks to reach a goal.","IA que planifica y ejecuta tareas de varios pasos de forma autónoma para alcanzar un objetivo."],
  ["Automation","Automatización","Use of technology to perform tasks with minimal human intervention.","Uso de tecnología para ejecutar tareas con mínima intervención humana."],
  ["Workflow","Flujo de trabajo","Sequence of steps or processes to complete a specific task.","Secuencia de pasos o procesos para completar una tarea específica."],
  ["MCP Protocol","Protocolo MCP","Model Context Protocol — open standard connecting AI models to external data and tools.","Protocolo de Contexto de Modelo — estándar abierto que conecta modelos de IA con datos y herramientas externas."],
  ["API","API","Application Programming Interface — allows different software systems to communicate.","Interfaz de Programación de Aplicaciones — permite que distintos sistemas de software se comuniquen."],
  ["Prompt Engineering","Ingeniería de Prompts","Designing effective instructions to get desired outputs from AI models.","Diseño de instrucciones efectivas para obtener los resultados deseados de modelos de IA."],
  ["Token","Token","Smallest unit of text processed by a language model (roughly a word or part of a word).","Unidad mínima de texto que procesa un modelo de lenguaje (aproximadamente una palabra o parte de ella)."],
  ["Context Window","Ventana de Contexto","Maximum amount of text an AI model can process in a single interaction.","Cantidad máxima de texto que un modelo de IA puede procesar en una sola interacción."],
  ["OSINT","OSINT","Open Source Intelligence — gathering and analyzing information from publicly available sources.","Inteligencia de Fuentes Abiertas — recopilación y análisis de información de fuentes públicas disponibles."],
  ["LLM Deployment","Despliegue de LLM","Process of making a language model available and operational in a production environment.","Proceso de poner un modelo de lenguaje disponible y operativo en un entorno de producción."],
  ["Hallucination","Alucinación","When an AI generates false or fabricated information presented as if it were fact.","Cuando una IA genera información falsa o inventada presentándola como si fuera un hecho real."],
  ["RAG","RAG","Retrieval-Augmented Generation — AI retrieves relevant documents before generating a response.","Generación Aumentada por Recuperación — la IA recupera documentos relevantes antes de responder."],
  ["Fine-tuning","Ajuste fino","Training a pre-trained model on specific data to adapt it to a particular use case.","Entrenamiento adicional de un modelo preentrenado con datos específicos para adaptarlo a un caso de uso particular."],
  ["Neural Network","Red Neuronal","Computing system loosely inspired by biological neurons that processes information in layers.","Sistema computacional inspirado en neuronas biológicas que procesa información en capas."],
  ["Deep Learning","Aprendizaje Profundo","Machine learning using many-layered neural networks to learn complex patterns from data.","Aprendizaje automático que usa redes neuronales de múltiples capas para aprender patrones complejos."],
  ["Inference","Inferencia","Process of using a trained AI model to generate outputs or predictions from new inputs.","Proceso de usar un modelo de IA ya entrenado para generar respuestas o predicciones a partir de nuevas entradas."],
  ["Vector Database","Base de Datos Vectorial","Database that stores data as mathematical vectors enabling fast semantic search for AI.","Base de datos que almacena datos como vectores matemáticos para búsqueda semántica rápida en IA."],
  ["Embedding","Incrustación","Numerical vector representation of text or data capturing its semantic meaning.","Representación vectorial numérica de texto o datos que captura su significado semántico."],
  ["Autonomous Agent","Agente Autónomo","Software that perceives its environment and independently takes actions to achieve goals.","Software que percibe su entorno y toma acciones de forma independiente para alcanzar objetivos."],
  ["Time Horizon","Horizonte de Tiempo","Measure of task difficulty: the maximum duration of tasks an AI can complete 50% of the time.","Medida de dificultad de tareas: duración máxima de tareas que una IA puede completar el 50% de las veces."],
  ["Skill","Habilidad/Skill","Packaged set of instructions an AI agent loads on demand to perform a specific task type.","Conjunto empaquetado de instrucciones que un agente de IA carga bajo demanda para realizar un tipo de tarea."],
  ["Multi-agent","Multi-agente","System where multiple AI agents collaborate in parallel to solve complex tasks faster.","Sistema donde múltiples agentes de IA colaboran en paralelo para resolver tareas complejas más rápido."],
  ["Digital Sovereignty","Soberanía Digital","Right of individuals or nations to control their own digital data and technology infrastructure.","Derecho de personas o naciones a controlar sus propios datos digitales e infraestructura tecnológica."],
  ["Scalability","Escalabilidad","Ability of a system to handle growing workloads while maintaining performance.","Capacidad de un sistema para manejar cargas de trabajo crecientes manteniendo su rendimiento."],
  ["Latency","Latencia","Time delay between a request being sent and the response being received in a computing system.","Tiempo de demora entre el envío de una solicitud y la recepción de la respuesta en un sistema informático."],
  ["OpenCode","OpenCode","Open-source agentic coding tool that runs AI models directly in the terminal.","Herramienta de código agéntico de código abierto que ejecuta modelos de IA directamente en la terminal."],
  ["Obsidian CLI","Obsidian CLI","Command-line interface for the Obsidian knowledge management application enabling scripting and automation.","Interfaz de línea de comandos para la aplicación de gestión de conocimiento Obsidian, que permite scripting y automatización."],
  ["METR","METR","Nonprofit research organization that measures and evaluates the real-world capabilities of AI models.","Organización de investigación sin fines de lucro que mide y evalúa las capacidades reales de los modelos de IA."],
  ["SAY→DO→LOG","SAY→DO→LOG","Ethical principle: AI agents must declare their planned actions, execute them, and log every step for auditability.","Principio ético: los agentes de IA deben declarar sus acciones planeadas, ejecutarlas y registrar cada paso para auditoría."],
  ["Playwright MCP","Playwright MCP","MCP server that provides browser automation capabilities to LLMs through structured accessibility snapshots.","Servidor MCP que proporciona capacidades de automatización de navegador a los LLMs mediante capturas de accesibilidad estructuradas."],
  ["Claude","Claude","AI assistant developed by Anthropic, widely used in agentic and coding workflows.","Asistente de IA desarrollado por Anthropic, ampliamente usado en flujos de trabajo agénticos y de programación."],
  ["GPT","GPT","Generative Pre-trained Transformer — OpenAI's family of foundational language models.","Transformador Generativo Preentrenado — familia de modelos de lenguaje fundamentales de OpenAI."],
];

// Glossary section title texts per language
const glossaryTitles = {
  es: { label: 'GLOSARIO TÉCNICO', title: 'Glosario <span class="accent">Técnico</span>', termLabel: 'Término en inglés', transLabel: 'Traducción', defLabel: 'Definición' },
  en: { label: 'TECHNICAL GLOSSARY', title: 'Technical <span class="accent">Glossary</span>', termLabel: 'English Term', transLabel: 'Translation', defLabel: 'Definition' },
};

function renderGlossary(data) {
  const grid = document.getElementById('glossaryGrid');
  grid.innerHTML = '';
  const isEs = currentLang === 'es';
  data.forEach(([en, es, defEn, defEs]) => {
    const primaryTerm = isEs ? es : en;
    const secondaryTerm = isEs ? en : es;
    const def = isEs ? defEs : defEn;
    grid.innerHTML += `<div class="gloss-item">
      <div class="gloss-en">${primaryTerm}</div>
      <div class="gloss-es">${secondaryTerm}</div>
      <div class="gloss-def">${def}</div>
    </div>`;
  });
}

function filterGlossary() {
  const q = document.getElementById('glossSearch').value.toLowerCase();
  const filtered = q ? glossaryData.filter(([en,es,defEn,defEs]) =>
    en.toLowerCase().includes(q) || es.toLowerCase().includes(q) ||
    defEn.toLowerCase().includes(q) || defEs.toLowerCase().includes(q)
  ) : glossaryData;
  renderGlossary(filtered);
}

function updateGlossaryUI() {
  const t = glossaryTitles[currentLang];
  const labelEl = document.querySelector('#glossary .section-label');
  const titleEl = document.querySelector('#glossary .section-title');
  const searchEl = document.getElementById('glossSearch');
  if (labelEl) labelEl.textContent = t.label;
  if (titleEl) titleEl.innerHTML = t.title;
  if (searchEl) searchEl.placeholder = currentLang === 'es' ? 'Buscar término...' : 'Search term...';
  filterGlossary();
}

renderGlossary(glossaryData);

// ============================
// SCROLL REVEAL
// ============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));