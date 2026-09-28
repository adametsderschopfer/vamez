export type ProjectLanguage = 'ru' | 'en'

type LocalizedText = Record<ProjectLanguage, string>

export interface Project {
  id: string
  year: number
  index: string
  tone: 'accent' | 'soft' | 'purple' | 'surface'
  category: LocalizedText
  title: LocalizedText
  summary: LocalizedText
  article: {
    lead: LocalizedText
    sections: { heading: LocalizedText; body: LocalizedText }[]
  }
  technologies: string[]
}

// Demonstration content: replace with verified portfolio projects before publishing as real work.
export const projects: Project[] = [
  {
    id: 'signal',
    year: 2026,
    index: '01',
    tone: 'accent',
    category: { ru: 'Системы', en: 'Systems' },
    title: { ru: 'Сигнал', en: 'Signal' },
    summary: {
      ru: 'Единое пространство для событий, статусов и решений.',
      en: 'One place for events, statuses, and decisions.'
    },
    article: {
      lead: {
        ru: 'Концепт платформы, которая собирает разрозненные события системы в ясную картину для команды.',
        en: 'A concept for a platform that turns scattered system events into a clear picture for a team.'
      },
      sections: [
        {
          heading: { ru: 'Задача', en: 'The challenge' },
          body: {
            ru: 'Когда сервисов много, важные сигналы теряются среди уведомлений. Интерфейс должен помогать понять, что произошло, кому действовать и насколько срочно.',
            en: 'As services multiply, important signals disappear among notifications. The interface should show what happened, who needs to act, and how urgently.'
          }
        },
        {
          heading: { ru: 'Подход', en: 'The approach' },
          body: {
            ru: 'События объединяются в один поток с понятными состояниями, приоритетами и историей решений. Детали остаются рядом с контекстом, а не прячутся в разных разделах.',
            en: 'Events become one stream with clear states, priorities, and a decision history. Details stay next to their context instead of being scattered across sections.'
          }
        }
      ]
    },
    technologies: ['TypeScript', 'Vue', 'Node.js']
  },
  {
    id: 'atlas',
    year: 2026,
    index: '02',
    tone: 'purple',
    category: { ru: 'Инструменты', en: 'Tools' },
    title: { ru: 'Атлас процессов', en: 'Process Atlas' },
    summary: {
      ru: 'Карта сложного процесса, которую удобно читать и менять.',
      en: 'A map of a complex process that is easy to read and change.'
    },
    article: {
      lead: {
        ru: 'Концепт рабочего инструмента для команд, которым важно видеть связи между этапами, людьми и данными.',
        en: 'A concept for teams that need to see the connections between stages, people, and data.'
      },
      sections: [
        {
          heading: { ru: 'Задача', en: 'The challenge' },
          body: {
            ru: 'Описание процесса быстро устаревает, если живёт отдельно от ежедневной работы. Нужна форма, в которой карта остаётся полезной и для обзора, и для конкретного шага.',
            en: 'Process documentation becomes stale when it lives apart from daily work. The map needs to serve both an overview and an individual step.'
          }
        },
        {
          heading: { ru: 'Подход', en: 'The approach' },
          body: {
            ru: 'Связи между шагами показаны явно. Каждый узел хранит владельца, входные данные и результат, а уровни детализации помогают не перегружать обзор.',
            en: 'Links between steps are explicit. Each node holds an owner, inputs, and an outcome; layers of detail keep the overview readable.'
          }
        }
      ]
    },
    technologies: ['TypeScript', 'React', 'Python']
  },
  {
    id: 'route',
    year: 2025,
    index: '03',
    tone: 'soft',
    category: { ru: 'Веб-приложение', en: 'Web app' },
    title: { ru: 'Маршрут', en: 'Route' },
    summary: {
      ru: 'Сценарии, которые ведут пользователя к результату без лишних шагов.',
      en: 'Flows that guide people to an outcome without extra steps.'
    },
    article: {
      lead: {
        ru: 'Концепт веб-приложения с пошаговым сценарием для задач, где легко потерять контекст.',
        en: 'A web app concept built around step-by-step flows for tasks where context is easy to lose.'
      },
      sections: [
        {
          heading: { ru: 'Задача', en: 'The challenge' },
          body: {
            ru: 'Длинные формы заставляют помнить слишком много. Пользователю важно видеть, где он находится и что понадобится дальше.',
            en: 'Long forms ask people to remember too much. They need to know where they are and what comes next.'
          }
        },
        {
          heading: { ru: 'Подход', en: 'The approach' },
          body: {
            ru: 'Сценарий разбит на короткие этапы. Состояние сохраняется, ошибки объясняются рядом с полями, а итог можно проверить до отправки.',
            en: 'The flow is split into short stages. Progress is saved, errors are explained beside fields, and the result can be reviewed before submission.'
          }
        }
      ]
    },
    technologies: ['Vue', 'Nuxt', 'TypeScript']
  },
  {
    id: 'pulse',
    year: 2025,
    index: '04',
    tone: 'surface',
    category: { ru: 'Аналитика', en: 'Analytics' },
    title: { ru: 'Пульс', en: 'Pulse' },
    summary: {
      ru: 'Спокойная панель показателей с акцентом на изменения.',
      en: 'A calm metrics dashboard focused on change.'
    },
    article: {
      lead: {
        ru: 'Концепт аналитической панели, где цифры помогают принять решение, а не просто занимают место.',
        en: 'An analytics dashboard concept where numbers support decisions instead of just filling space.'
      },
      sections: [
        {
          heading: { ru: 'Задача', en: 'The challenge' },
          body: {
            ru: 'Сводки часто показывают всё сразу. Из-за этого трудно заметить отклонение и понять, связано ли оно с привычной динамикой.',
            en: 'Dashboards often show everything at once, making it hard to spot a deviation and understand its context.'
          }
        },
        {
          heading: { ru: 'Подход', en: 'The approach' },
          body: {
            ru: 'Показатели собраны в небольшие группы, а изменения выделены относительно базовой линии. Подробности открываются по мере необходимости.',
            en: 'Metrics are grouped into small sets, and changes are shown against a baseline. Details appear when needed.'
          }
        }
      ]
    },
    technologies: ['Python', 'Vue', 'D3.js']
  },
  {
    id: 'frame',
    year: 2024,
    index: '05',
    tone: 'purple',
    category: { ru: 'Интерфейсы', en: 'Interfaces' },
    title: { ru: 'Каркас', en: 'Frame' },
    summary: {
      ru: 'Набор интерфейсных решений, из которых удобно собирать продукт.',
      en: 'Interface patterns designed to make products easier to build.'
    },
    article: {
      lead: {
        ru: 'Концепт небольшой дизайн-системы, которая связывает визуальный язык с поведением компонентов.',
        en: 'A small design system concept connecting a visual language with component behavior.'
      },
      sections: [
        {
          heading: { ru: 'Задача', en: 'The challenge' },
          body: {
            ru: 'Без общих правил похожие элементы постепенно расходятся в размерах, состоянии и логике. Это замедляет развитие продукта.',
            en: 'Without shared rules, similar elements drift apart in size, state, and behavior, slowing product work.'
          }
        },
        {
          heading: { ru: 'Подход', en: 'The approach' },
          body: {
            ru: 'Базовые токены, состояния и примеры использования описаны вместе. Компоненты остаются гибкими, но сохраняют общий ритм.',
            en: 'Core tokens, states, and usage examples live together. Components stay flexible while sharing a consistent rhythm.'
          }
        }
      ]
    },
    technologies: ['CSS', 'Vue', 'TypeScript']
  }
]

export const projectYears = [2026, 2025, 2024]
export const projectTechnologies = [
  'TypeScript',
  'Vue',
  'Python',
  'React',
  'Nuxt',
  'Node.js',
  'D3.js',
  'CSS'
]
