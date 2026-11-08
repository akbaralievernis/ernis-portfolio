export interface AgentDef {
  name: string;
  color: string;
}

export const AGENTS: AgentDef[] = [
  { name: "Разведчик", color: "#60a5fa" },
  { name: "Макет", color: "#facc15" },
  { name: "Шрифт", color: "#34d399" },
  { name: "Анимация", color: "#f472b6" },
  { name: "Тестер", color: "#a78bfa" },
  { name: "Деплой", color: "#fb923c" },
  { name: "Текст", color: "#22d3ee" },
  { name: "Линтер", color: "#e4e4e7" },
  { name: "Индекс", color: "#4ade80" },
  { name: "Рендер", color: "#c084fc" },
  { name: "Палитра", color: "#fde047" },
  { name: "Ревью", color: "#f87171" },
];

/** What an agent claims to be doing, keyed by the element's data-agent value. */
export const ACTIONS: Record<string, string[]> = {
  text: ["переписывает", "кернинг", "вычитывает", "сокращает текст", "верстает"],
  block: ["выравнивает сетку", "проверяет hover", "меряет отступы", "проверяет контраст", "собирает макет"],
  image: ["цветокоррекция", "чистит края", "проверяет кадр"],
  data: ["сверяет цифры", "сверяет резюме"],
  link: ["проверяет ссылку", "проверяет фокус"],
};
