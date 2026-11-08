// Все тексты сайта живут здесь. Правь этот файл, чтобы обновить портфолио.
// Источники: github.com/akbaralievernis, старое портфолио и Instagram @_akbaraliev_ernis.

export const PROFILE = {
  first: "Эрнис",
  last: "Акбаралиев",
  initial: "Э",
  roleA: "Веб-разработчик",
  roleB: "Next.js · Supabase · ИИ",
  location: "Ош, Кыргызстан",
  email: "astanovohrano@gmail.com",
  phone: "+996 998 220 607",
  bio: "Студент компьютерных наук. Делаю веб-приложения для школ, туризма, транспорта и бизнеса, и запускаю их в работу.",
  openTo: "Открыт к заказам и стажировкам",
  photo: "/me-suit.png",
  links: {
    github: "https://github.com/akbaralievernis",
    instagram: "https://www.instagram.com/_akbaraliev_ernis/",
    whatsapp: "https://wa.me/996998220607",
  },
} as const;

export const HERO_STATS = [
  { value: "32", label: "Репозитория\nна GitHub" },
  { value: "20+", label: "Деплоев\nна Vercel" },
  { value: "03", label: "Языка:\nKG · RU · EN" },
];

export interface Work {
  n: string;
  title: string;
  meta: string;
  summary: string;
  points: string[];
  stack: string[];
  image: string;
  links: { label: string; href: string }[];
}

const GH = "https://github.com/akbaralievernis";

export const WORK: Work[] = [
  {
    n: "01",
    title: "Bilim Arena",
    meta: "EdTech · платформа для школ",
    summary: "Интерактивная учебная платформа: доска в классе это главный экран, телефоны учеников это пульты.",
    points: [
      "26 игр, 17 тем и 340+ вопросов",
      "Три языка: кыргызский, русский, английский",
      "Работает без регистрации, аккаунты через Supabase",
    ],
    stack: ["JavaScript", "HTML/CSS", "Supabase"],
    image: "/work/bilim-arena.jpg",
    links: [
      { label: "Сайт", href: "https://bilim-arena-theta.vercel.app/" },
      { label: "Код", href: `${GH}/bilim_arena` },
    ],
  },
  {
    n: "02",
    title: "Bilim Arena Race",
    meta: "EdTech · мультиплеер",
    summary: "Образовательная гонка: учитель запускает соревнование, команды подключаются по коду и едут по карте, проходя испытания.",
    points: [
      "Комнаты и вход по коду или QR",
      "Общий экран с картой и таблицей лидеров",
      "Интерфейс на кыргызском и русском",
    ],
    stack: ["Next.js", "TypeScript", "Supabase"],
    image: "/work/bilim-race.jpg",
    links: [
      { label: "Сайт", href: "https://bilimarenarace.vercel.app/" },
      { label: "Код", href: `${GH}/bilimarena_race` },
    ],
  },
  {
    n: "03",
    title: "Nexus AI",
    meta: "SaaS · ИИ-чатбот",
    summary: "Мультитенантная платформа: владелец любого сайта подключает умного ИИ-чатбота одним тегом script.",
    points: [
      "Бот отвечает по базе знаний клиента (RAG)",
      "Собирает лиды и общается на языке клиента",
      "Дашборд для настройки виджета",
    ],
    stack: ["Next.js", "RAG", "OpenAI", "Supabase"],
    image: "/work/nexus-ai.jpg",
    links: [
      { label: "Сайт", href: "https://nexusai-sooty-pi.vercel.app/" },
      { label: "Код", href: `${GH}/chatbot` },
    ],
  },
  {
    n: "04",
    title: "NomadTrails",
    meta: "Туризм · Кыргызстан",
    summary: "Премиальный туристический сайт по Кыргызстану: туры, отели, транспорт и бронирование.",
    points: [
      "Многоязычность: EN, RU, KY",
      "Админ-панель для туров и бронирований",
      "Кинематографичный скролл и анимации",
    ],
    stack: ["Next.js 15", "Supabase", "NextAuth", "GSAP"],
    image: "/work/nomadtrails.jpg",
    links: [
      { label: "Сайт", href: "https://nomadtrails-kappa.vercel.app/" },
      { label: "Код", href: `${GH}/nomadtrails` },
    ],
  },
  {
    n: "05",
    title: "OshAuto",
    meta: "Транспорт · город Ош",
    summary: "Сервис городского транспорта Оша: маршруты автобусов, остановки и движение транспорта в одном месте.",
    points: [
      "Поиск маршрутов и остановок",
      "Карта и движение в реальном времени",
      "Админка для маршрутов",
    ],
    stack: ["Next.js", "Supabase", "Mapbox", "Leaflet"],
    image: "/work/oshauto.jpg",
    links: [
      { label: "Сайт", href: "https://oshauto.vercel.app/" },
      { label: "Код", href: `${GH}/oshauto` },
    ],
  },
  {
    n: "06",
    title: "ОшМУ Жатакана",
    meta: "Университет · цифровизация",
    summary: "Единая цифровая система студенческих общежитий ОшГУ.",
    points: [
      "Регистрация в общежитие онлайн",
      "Выбор комнаты и подача заявлений",
      "Интерфейс на кыргызском",
    ],
    stack: ["Next.js", "TypeScript", "Supabase"],
    image: "/work/oshsu.jpg",
    links: [
      { label: "Сайт", href: "https://oshsu.vercel.app/" },
      { label: "Код", href: `${GH}/oshsu` },
    ],
  },
  {
    n: "07",
    title: "Taxi KG",
    meta: "Сервис · вся страна",
    summary: "Такси по Кыргызстану: Бишкек, Ош, Каракол, в городе и между городами, 24/7.",
    points: [
      "Заказ такси и звонок в один клик",
      "Тарифы, направления и вопросы",
      "Тёмный и светлый интерфейс",
    ],
    stack: ["Next.js", "Supabase", "Framer Motion"],
    image: "/work/taxi-kg.jpg",
    links: [
      { label: "Сайт", href: "https://taxi-puce.vercel.app/" },
      { label: "Код", href: `${GH}/taxi` },
    ],
  },
  {
    n: "08",
    title: "Wedding.KG",
    meta: "Клиенты · онлайн-приглашения",
    summary: "Онлайн-приглашения на той: дизайн, дата, место и музыка на одной странице.",
    points: [
      "Несколько реальных приглашений для пар",
      "Тексты на кыргызском и русском",
      "Хостинг на GitHub Pages",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    image: "/work/wedding.jpg",
    links: [
      { label: "Пример", href: "https://akbaralievernis.github.io/wedding_alfia/" },
      { label: "Код", href: `${GH}/weddings` },
    ],
  },
];

/** Остальные репозитории: короткой строкой под карточками. */
export const MORE_WORK = [
  { title: "ARIS", note: "голосовой ИИ-ассистент", href: `${GH}/aris` },
  { title: "OshRent", note: "аренда авто в Оше", href: "https://arenda-beta.vercel.app/" },
  { title: "Mafia", note: "онлайн-игра", href: "https://mafia-vert.vercel.app/" },
  { title: "Okuspace", note: "CRM языковой школы", href: `${GH}/okuspace` },
  { title: "AUB-1-24", note: "портфолио группы ОшГУ", href: `${GH}/abshyrata` },
  { title: "Студпортал", note: "PHP + MySQL", href: `${GH}/aub_1_24` },
  { title: "CyberTech Hub", note: "игровая зона и IT-курсы", href: `${GH}/cybertechhub` },
  { title: "Kyrgyzstan Travel", note: "3D-лендинг", href: `${GH}/kyrgyzstantravel` },
  { title: "Ala-Too Mobile", note: "магазин смартфонов", href: `${GH}/alatoo` },
  { title: "Lexicon Drive", note: "игра для смартборда", href: `${GH}/lexicon` },
  { title: "Focus Duel", note: "учебная дуэль", href: `${GH}/focus_duel` },
];

export const WORK_STATS = [
  { value: "08", label: "Избранных\nпроектов" },
  { value: "32", label: "Репозитория\nна GitHub" },
  { value: "03", label: "Языка\nинтерфейса" },
];

export const TOOLS = [
  "Next.js",
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "Node.js",
  "PHP",
  "MySQL",
  "Python",
  "Framer Motion",
  "GSAP",
  "Three.js",
  "Mapbox",
  "OpenAI API",
  "Mistral AI",
  "Docker",
  "Git",
  "GitHub Pages",
  "Vercel",
  "Claude Code",
];

export const TIMELINE = [
  { title: "Bilim Arena и Race", sub: "Учебные игры для школ · 3 языка", tag: "2026" },
  { title: "Nexus AI", sub: "SaaS: ИИ-чатбот для любого сайта", tag: "2026" },
  { title: "NomadTrails · OshAuto · Taxi KG", sub: "Туризм и транспорт Кыргызстана", tag: "2026" },
  { title: "Wedding.KG", sub: "Онлайн-приглашения на той для пар", tag: "2025" },
  { title: "Первый JARVIS", sub: "Голосовой ассистент в браузере", tag: "2025" },
];

export const RECORD = {
  value: "32",
  text: "публичных репозитория: от школьных игр до SaaS с ИИ-чатботом.",
};

export const ABOUT_TEXT = [
  "Я Эрнис, студент компьютерных наук из Оша. Изучаю разработку, веб и искусственный интеллект и сразу применяю это в проектах: учебные игры для школ, сервисы транспорта и туризма, ИИ-чатботы и онлайн-приглашения на той.",
  "Чаще всего пишу на Next.js, TypeScript и Supabase и запускаю проекты на Vercel. Делаю интерфейсы на кыргызском, русском и английском. Вне кода путешествую: Франция, Германия, Бельгия, Швейцария, Нидерланды, Турция, Узбекистан.",
];

export const EDUCATION = {
  title: "Компьютерные науки · студент",
  sub: "Ош, Кыргызстан",
};

export const SKILLS = [
  { k: "Фронтенд", v: "Next.js, React, TypeScript" },
  { k: "Стили", v: "Tailwind, Framer Motion, GSAP" },
  { k: "Бэкенд", v: "Supabase, PostgreSQL, PHP" },
  { k: "ИИ", v: "OpenAI, Mistral, RAG" },
  { k: "Деплой", v: "Vercel, GitHub Pages, Docker" },
  { k: "Языки", v: "Кыргызский, русский, английский" },
];

export const PRINCIPLES = [
  { t: "Запуск важнее черновика", d: "Почти каждый проект живёт на Vercel или GitHub Pages." },
  { t: "Для своего региона", d: "Транспорт Оша, общежития ОшГУ, туризм Кыргызстана." },
  { t: "Три языка", d: "Кыргызский, русский и английский прямо в интерфейсе." },
  { t: "ИИ в связке", d: "Нейросети ускоряют работу, решения принимаю я." },
];

export const QUOTE = "Расширять навыки и открывать новые способы инноваций.";

export const TRAVEL = [
  { src: "/travel/paris.jpg", place: "Париж", flag: "🇫🇷" },
  { src: "/travel/brussels.jpg", place: "Брюссель", flag: "🇧🇪" },
  { src: "/travel/berlin.jpg", place: "Берлин", flag: "🇩🇪" },
  { src: "/travel/hamburg.jpg", place: "Гамбург", flag: "🇩🇪" },
];

export const NAV = [
  { id: "home", label: "Главная" },
  { id: "work", label: "Работы" },
  { id: "about", label: "Обо мне" },
  { id: "contact", label: "Контакты" },
] as const;
