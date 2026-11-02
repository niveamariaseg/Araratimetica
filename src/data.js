// Conteúdo demonstrativo da trilha de Introdução ao Cálculo (ICD0002).
// Estrutura: módulo -> lições -> questões de múltipla escolha.
// `graph` (opcional) é o apoio visual exibido junto ao enunciado.

export const modules = [
  {
    id: 'm1',
    title: 'Fundamentos',
    description: 'Potências, raízes, frações e porcentagem.',
    color: '#22A447',
    mascot: 'abaco',
    badge: { title: 'Mestre dos Fundamentos', icon: 'calculator' },
    lessons: [
      {
        id: 'm1l1',
        title: 'Potências e raízes',
        questions: [
          { id: 'm1l1q1', text: 'Quanto vale 2³ · 2² ?', options: ['16', '32', '64', '10'], answer: 1, hint: 'Na multiplicação de potências de mesma base, mantenha a base e some os expoentes: 2³⁺².' },
          { id: 'm1l1q2', text: 'Quanto vale √49 + 3² ?', options: ['10', '16', '13', '58'], answer: 1, hint: 'Resolva a raiz e a potência separadamente e depois some os resultados.' },
          { id: 'm1l1q3', text: 'Quanto vale (−3)² ?', options: ['−9', '9', '−6', '6'], answer: 1, hint: '(−3)² = (−3) · (−3). Menos vezes menos dá...' },
        ],
      },
      {
        id: 'm1l2',
        title: 'Frações e porcentagem',
        questions: [
          { id: 'm1l2q1', text: 'Quanto vale 1/2 + 1/3 ?', options: ['2/5', '5/6', '1/6', '2/6'], answer: 1, hint: 'Use um denominador comum: o MMC entre 2 e 3 é 6.' },
          { id: 'm1l2q2', text: 'Quanto vale 3/4 · 2/9 ?', options: ['1/6', '6/13', '5/13', '1/3'], answer: 0, hint: 'Multiplique numerador com numerador e denominador com denominador. Depois simplifique.' },
          { id: 'm1l2q3', text: 'Quanto é 25% de 80?', options: ['20', '25', '32', '40'], answer: 0, hint: '25% é o mesmo que 1/4.' },
        ],
      },
    ],
  },
  {
    id: 'm2',
    title: 'Equações',
    description: 'Equações do 1º e do 2º grau.',
    color: '#1E6FD9',
    mascot: 'igual',
    badge: { title: 'Equilibrista das Equações', icon: 'reorder-two' },
    lessons: [
      {
        id: 'm2l1',
        title: 'Equações do 1º grau',
        questions: [
          { id: 'm2l1q1', text: 'Qual é o valor de x em 2x + 6 = 14?', options: ['2', '4', '6', '8'], answer: 1, hint: 'Subtraia 6 dos dois lados. Depois, divida por 2.' },
          { id: 'm2l1q2', text: 'Qual é o valor de x em 3(x − 2) = 9?', options: ['1', '3', '5', '7'], answer: 2, hint: 'Divida os dois lados por 3 antes de isolar o x.' },
          { id: 'm2l1q3', text: 'Qual é o valor de x em x/4 + 1 = 3?', options: ['2', '4', '8', '16'], answer: 2, hint: 'Subtraia 1 dos dois lados e depois multiplique por 4.' },
        ],
      },
      {
        id: 'm2l2',
        title: 'Equações do 2º grau',
        questions: [
          { id: 'm2l2q1', text: 'Quais são as soluções de x² − 9 = 0?', options: ['x = 3', 'x = ±3', 'x = 9', 'x = ±9'], answer: 1, hint: 'Isole x² e lembre que a raiz quadrada tem dois sinais.' },
          { id: 'm2l2q2', text: 'Qual é o Δ de x² − 4x + 3 = 0?', options: ['4', '16', '−4', '28'], answer: 0, hint: 'Δ = b² − 4ac, com a = 1, b = −4 e c = 3.' },
          { id: 'm2l2q3', text: 'Quais são as raízes de x² − 5x + 6 = 0?', options: ['1 e 6', '2 e 3', '−2 e −3', '−1 e 6'], answer: 1, hint: 'Procure dois números cuja soma é 5 e o produto é 6.' },
        ],
      },
    ],
  },
  {
    id: 'm3',
    title: 'Funções',
    description: 'Função afim, quadrática e leitura de gráficos.',
    color: '#7C4DFF',
    mascot: 'transferidor',
    badge: { title: 'Leitor de Gráficos', icon: 'analytics' },
    lessons: [
      {
        id: 'm3l1',
        title: 'Função afim',
        questions: [
          { id: 'm3l1q1', text: 'Se f(x) = 2x + 1, quanto vale f(3)?', options: ['5', '6', '7', '9'], answer: 2, hint: 'Substitua x por 3: primeiro multiplique, depois some.' },
          { id: 'm3l1q2', text: 'Responda a pergunta sobre o gráfico: qual função está representada?', graph: { fn: (x) => 2 * x - 1, yMin: -4, yMax: 5 }, options: ['f(x) = 2x + 1', 'f(x) = 2x − 1', 'f(x) = −2x + 1', 'f(x) = x − 2'], answer: 1, hint: 'Veja onde a reta corta o eixo y (quando x = 0) e quanto y sobe quando x aumenta 1.' },
          { id: 'm3l1q3', text: 'Qual é o zero da função f(x) = 3x − 6?', options: ['−2', '2', '3', '6'], answer: 1, hint: 'O zero da função é o valor de x que faz f(x) = 0.' },
        ],
      },
      {
        id: 'm3l2',
        title: 'Leitura de gráficos',
        questions: [
          { id: 'm3l2q1', text: 'Em quais pontos a parábola corta o eixo x?', graph: { fn: (x) => x * x - 4, yMin: -5, yMax: 5 }, options: ['x = 0', 'x = ±2', 'x = ±4', 'x = 4'], answer: 1, hint: 'Procure onde a curva cruza a linha horizontal y = 0.' },
          { id: 'm3l2q2', text: 'A função do gráfico é crescente ou decrescente?', graph: { fn: (x) => -x + 3, yMin: -1, yMax: 6 }, options: ['Crescente', 'Decrescente', 'Constante', 'Não é função'], answer: 1, hint: 'Leia o gráfico da esquerda para a direita: a reta sobe ou desce?' },
          { id: 'm3l2q3', text: 'Qual é o valor mínimo da função do gráfico?', graph: { fn: (x) => x * x - 4, yMin: -5, yMax: 5 }, options: ['−4', '0', '2', '4'], answer: 0, hint: 'O mínimo é a altura do ponto mais baixo da parábola (o vértice).' },
        ],
      },
    ],
  },
  {
    id: 'm4',
    title: 'Funções exponenciais',
    description: 'Crescimento, decaimento e equações exponenciais.',
    color: '#FF7A00',
    mascot: 'geometria',
    badge: { title: 'Explorador Exponencial', icon: 'trending-up' },
    lessons: [
      {
        id: 'm4l1',
        title: 'Potências e crescimento',
        questions: [
          { id: 'm4l1q1', text: 'Qual é o valor de x em 2ˣ = 8?', options: ['2', '3', '4', '8'], answer: 1, hint: 'Escreva 8 como uma potência de 2.' },
          { id: 'm4l1q2', text: 'Se f(x) = 3ˣ, quanto vale f(0)?', options: ['0', '1', '3', 'Não existe'], answer: 1, hint: 'Todo número diferente de zero elevado a 0 vale 1.' },
          { id: 'm4l1q3', text: 'O gráfico mostra f(x) = 2ˣ. Quanto vale f(2)?', graph: { fn: (x) => 2 ** x, yMin: -1, yMax: 8 }, options: ['2', '4', '6', '8'], answer: 1, hint: 'Procure no gráfico a altura da curva quando x = 2.' },
        ],
      },
      {
        id: 'm4l2',
        title: 'Aplicações',
        questions: [
          { id: 'm4l2q1', text: 'Uma população começa com 100 indivíduos e dobra a cada ano. Quantos serão após 3 anos?', options: ['300', '600', '800', '900'], answer: 2, hint: 'Dobrar 3 vezes é multiplicar por 2³.' },
          { id: 'm4l2q2', text: 'Qual é o valor de x em 5ˣ⁺¹ = 25?', options: ['0', '1', '2', '5'], answer: 1, hint: '25 = 5². Com bases iguais, iguale os expoentes.' },
          { id: 'm4l2q3', text: 'O gráfico mostra f(x) = (1/2)ˣ. Essa função é:', graph: { fn: (x) => 0.5 ** x, yMin: -1, yMax: 8 }, options: ['Crescente', 'Decrescente', 'Constante', 'Linear'], answer: 1, hint: 'Quando a base está entre 0 e 1, a curva desce da esquerda para a direita.' },
        ],
      },
    ],
  },
];

// Lista linear de lições, na ordem da trilha.
export const lessonList = modules.flatMap((m, mi) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleIndex: mi, moduleTitle: m.title, color: m.color }))
);

// RN02 – Progressão sequencial: a lição só abre após a anterior ser concluída.
export function isUnlocked(lessonId, completed) {
  const i = lessonList.findIndex((l) => l.id === lessonId);
  return i === 0 || !!completed[lessonList[i - 1].id];
}

export function previousLesson(lessonId) {
  const i = lessonList.findIndex((l) => l.id === lessonId);
  return i > 0 ? lessonList[i - 1] : null;
}

export const isModuleDone = (m, completed) => m.lessons.every((l) => completed[l.id]);

// RF08 – Emblemas de maestria (por módulo) e por metas específicas.
export function getBadges(progress, tickets) {
  return [
    ...modules.map((m) => ({
      id: 'b_' + m.id,
      title: m.badge.title,
      description: `Conclua o módulo ${m.title}`,
      icon: m.badge.icon,
      color: m.color,
      mastery: true,
      earned: isModuleDone(m, progress.completed),
    })),
    { id: 'first', title: 'Primeiro passo', description: 'Conclua sua primeira lição', icon: 'footsteps', color: '#E53935', earned: Object.keys(progress.completed).length > 0 },
    { id: 'perfect', title: 'Sem tropeços', description: 'Conclua uma lição sem errar', icon: 'checkmark-done', color: '#1E6FD9', earned: progress.perfectCount > 0 },
    { id: 'xp100', title: '100 XP', description: 'Acumule 100 XP', icon: 'flash', color: '#FFB800', earned: progress.xp >= 100 },
    { id: 'help', title: 'Coragem de perguntar', description: 'Envie seu primeiro pedido de ajuda', icon: 'chatbubbles', color: '#7C4DFF', earned: tickets.length > 0 },
  ];
}

// RF09 – Missões diárias.
export function getDailyQuests(progress) {
  return [
    { id: 'd1', title: 'Conclua 1 lição', icon: 'book', value: progress.lessonsToday, goal: 1 },
    { id: 'd2', title: 'Ganhe 50 XP', icon: 'flash', value: progress.xpToday, goal: 50 },
    { id: 'd3', title: 'Acerte 5 questões de primeira', icon: 'checkmark-circle', value: progress.firstTryToday, goal: 5 },
  ];
}

export const XP_FIRST_TRY = 10;
export const XP_RETRY = 5;
export const XP_LESSON_BONUS = 10;
