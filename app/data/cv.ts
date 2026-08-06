export interface CvContact {
  readonly label: string
  readonly value: string
  readonly href: string
  readonly external?: boolean
}

export interface CvMetric {
  readonly value: string
  readonly label: string
}

export interface CvExperience {
  readonly company: string
  readonly location: string
  readonly role: string
  readonly period: string
  readonly duration: string
  readonly stack: readonly string[]
  readonly summary: string
  readonly responsibilities: readonly string[]
  readonly achievements: readonly string[]
}

export interface CvSkillGroup {
  readonly title: string
  readonly items: readonly string[]
}

export interface CvEducationItem {
  readonly title: string
  readonly place: string
  readonly period: string
  readonly status: string
}

export interface CvProject {
  readonly title: string
  readonly description: string
  readonly href: string
}

export const cvProfile = {
  name: 'Владислав Адамец',
  role: 'Senior Frontend Developer',
  location: 'Калининград',
  relocation: 'Готов к релокации и командировкам',
  summary:
    'Senior Frontend Developer с 8 годами коммерческого опыта. Проектирую и развиваю веб- и мобильные продукты на React, Vue, Next.js, Nuxt.js и React Native. Умею брать на себя архитектуру, техническое лидерство, CI/CD, документацию и смежные backend-задачи, когда это помогает быстрее закрыть бизнес-цель.',
  focus: [
    'Frontend architecture',
    'React / Vue ecosystems',
    'Mobile and PWA',
    'Team leadership',
    'Design systems'
  ]
} as const

export const cvContacts: readonly CvContact[] = [
  {
    label: 'Telegram',
    value: '@adametsderschopfer',
    href: 'https://t.me/adametsderschopfer',
    external: true
  },
  {
    label: 'Email',
    value: 'adametsderschopfer@yandex.ru',
    href: 'mailto:adametsderschopfer@yandex.ru'
  },
  {
    label: 'Phone',
    value: '+7 900 346-88-10',
    href: 'tel:+79003468810'
  },
  {
    label: 'GitHub',
    value: 'adametsderschopfer',
    href: 'https://github.com/adametsderschopfer',
    external: true
  }
] as const

export const cvMetrics: readonly CvMetric[] = [
  { value: '8 лет', label: 'коммерческой разработки' },
  { value: 'Senior', label: 'frontend и full-stack задачи' },
  { value: 'React / Vue', label: 'основные экосистемы' },
  { value: 'Mobile', label: 'React Native и Kotlin' }
] as const

export const cvHighlights: readonly string[] = [
  'Строил frontend-архитектуру порталов, маркетплейсов, PWA и мобильных приложений.',
  'Вёл техническое направление: декомпозиция, code review, документация, собеседования и наставничество.',
  'Настраивал CI/CD, Docker-инфраструктуру и процессы поставки для web- и mobile-проектов.',
  'Участвовал в проектировании UX/UI и создании UI Kit / design system для продуктовых команд.'
] as const

export const cvExperiences: readonly CvExperience[] = [
  {
    company: 'ЭЛМ Технологии',
    location: 'Москва',
    role: 'Senior Frontend Developer',
    period: 'Июль 2024 - настоящее время',
    duration: '1 год 10 месяцев',
    stack: ['Vue 2/3', 'Pinia', 'Vuex', 'Python', 'Django', 'DRF'],
    summary:
      'Разработка встраиваемых виджетов и lead forms, поддержка Vue-проектов и точечная backend-разработка на Python.',
    responsibilities: [
      'Разработка и поддержка встраиваемых Vue-виджетов.',
      'Покрытие проектной логики тестами.',
      'Доработка backend-части на Python и Django.'
    ],
    achievements: []
  },
  {
    company: 'Мозен',
    location: 'Санкт-Петербург',
    role: 'Senior Frontend Developer',
    period: 'Июнь 2024 - настоящее время',
    duration: '1 год 11 месяцев',
    stack: [
      'React',
      'Next.js',
      'React Native',
      'Kotlin',
      'Redux Toolkit',
      'MobX',
      'Firebase',
      'Parse Platform',
      'PWA',
      'MUI',
      'Mantine'
    ],
    summary:
      'Развитие web- и mobile-направления: React Native, Kotlin, Next.js, PWA и интеграции с Firebase / Parse Platform.',
    responsibilities: [
      'Разработка кроссплатформенного приложения на React Native.',
      'Поддержка нативного Android-приложения на Kotlin.',
      'Миграция web-приложения на Next.js с SSR и PWA-оптимизацией.',
      'Настройка CI/CD-процессов для мобильных и web-приложений.'
    ],
    achievements: [
      'Разработал кроссплатформенное мобильное приложение на React Native.',
      'Реализовал интеграцию с Parse Platform для offline-first сценариев и быстрой синхронизации данных.'
    ]
  },
  {
    company: 'Открытая мобильная платформа',
    location: 'Санкт-Петербург',
    role: 'Lead Developer',
    period: 'Апрель 2024 - июль 2024',
    duration: '4 месяца',
    stack: [
      'Python',
      'Django',
      'PostgreSQL',
      'TypeScript',
      'React',
      'Redux Toolkit',
      'Next.js',
      'GraphQL',
      'Docker',
      'GitLab CI/CD'
    ],
    summary:
      'Техническое лидерство в разработке портала для разработчиков ПО, документации, wiki, форума, CMS, поиска и ассистента.',
    responsibilities: [
      'Проектирование архитектуры портала под требования к скорости публикации и обновления контента.',
      'Декомпозиция задач, техническое ведение команды и контроль выполнения.',
      'Внедрение инструментов автоматизации обработки документации и учебных материалов.'
    ],
    achievements: [
      'Подготовил план устранения проблем производительности, который был принят в работу.',
      'Автоматизировал сборку и деплой проекта средствами GitLab CI/CD.',
      'Описал документацию по сборке, деплою, архитектуре, инфраструктуре и проектным процессам.'
    ]
  },
  {
    company: 'ООО Гептоп',
    location: 'Краснодар',
    role: 'Tech Lead / Developer',
    period: 'Июль 2023 - апрель 2024',
    duration: '10 месяцев',
    stack: [
      'TypeScript',
      'React',
      'React Native',
      'Redux',
      'Next.js',
      'Nest.js',
      'DDD',
      'CQRS',
      'TypeORM',
      'Yandex Cloud',
      'Kubernetes',
      'Docker',
      'PostgreSQL'
    ],
    summary:
      'Развитие маркетплейса, участие в продуктовой стратегии, проектировании архитектуры и инфраструктуре.',
    responsibilities: [
      'Разработка нового функционала и поддержка существующих функций маркетплейса.',
      'Проектирование архитектурных решений, code review и развитие инженерных практик.',
      'Настройка и оптимизация инфраструктуры в Kubernetes.',
      'Проведение технических собеседований и помощь команде в планировании задач.'
    ],
    achievements: [
      'Внедрил CMS Strapi в проект.',
      'Описал API, структуру проекта, базу данных и ключевые процессы приложения.',
      'Получил глубокий практический опыт с GitLab CI/CD и DDD-подходом.'
    ]
  },
  {
    company: 'АйТи Спейшл',
    location: 'Калининград',
    role: 'Senior Frontend Developer',
    period: 'Декабрь 2022 - июль 2023',
    duration: '8 месяцев',
    stack: [
      'TypeScript',
      'React',
      'Redux Toolkit',
      'Next.js',
      'Vue',
      'Vuex',
      'Pinia',
      'Nuxt.js',
      'Strapi',
      'Nest.js',
      'WordPress',
      'Bitrix'
    ],
    summary:
      'Разработка web-приложений, поддержка Vue/Nuxt-проектов, миграции, оптимизация сборок и техническая оценка UX/UI решений.',
    responsibilities: [
      'Разработка проектов на React / Next.js и Vue / Nuxt.js.',
      'Миграция проектов с Nuxt 2 на Nuxt 3 и обновление зависимостей.',
      'Доработка сборщиков, устранение legacy-кода и поддержка старых модулей.',
      'Собеседования frontend-кандидатов, декомпозиция задач и планирование релизов.'
    ],
    achievements: [
      'Разработал модуль учебного расписания для системы iDesk.',
      'Внедрил конструктор менюбордов с редактированием шаблонов и интеграцией Quick Resto.',
      'Получил опыт построения frontend design system и наставничества младшего разработчика.'
    ]
  },
  {
    company: 'Консалт инфо. Интернет технологии',
    location: 'Калининград',
    role: 'Middle Frontend Developer',
    period: 'Январь 2021 - декабрь 2022',
    duration: '2 года',
    stack: ['TypeScript', 'React Native', 'React', 'Redux', 'MobX', 'Vue', 'Vuex', 'Bitrix'],
    summary:
      'Активная разработка React/Vue-продуктов, мобильных приложений и административных интерфейсов для e-commerce, сервисов записи и корпоративных порталов.',
    responsibilities: [
      'Разработка frontend-функциональности и участие в планировании спринтов.',
      'Проектирование дизайн-системы и устранение legacy-кода.',
      'Разработка мобильных приложений и сложных административных интерфейсов.'
    ],
    achievements: [
      'Разработал 2 React Native приложения и довёл их до production.',
      'Уверенно перешёл от Vue Options API к Composition API.',
      'Получил опыт разработки фич для Bitrix24-порталов.'
    ]
  },
  {
    company: 'ADD.Orange',
    location: 'Алматы',
    role: 'Web Developer',
    period: 'Февраль 2018 - сентябрь 2020',
    duration: '2 года 8 месяцев',
    stack: [
      'TypeScript',
      'React',
      'Redux',
      'SCSS',
      'Webpack',
      'Gulp',
      'Bitrix',
      'Joomla',
      'WordPress'
    ],
    summary:
      'Разработка сайтов и информационных порталов, подбор frontend/backend-стека и участие в финальной проработке UI.',
    responsibilities: [
      'Разработка архитектуры клиентской и серверной частей сайтов.',
      'Администрирование серверов и поддержка CMS-проектов.',
      'Разработка информационного портала с кастомной админкой на PHP.'
    ],
    achievements: [
      'С нуля разработал 2 сайта от обсуждения ТЗ до сдачи frontend и backend.',
      'Закрепил уверенный уровень React перед переходом в более крупные проекты.'
    ]
  }
] as const

export const cvSkillGroups: readonly CvSkillGroup[] = [
  {
    title: 'Frontend',
    items: [
      'TypeScript',
      'React',
      'Next.js',
      'Redux Toolkit',
      'MobX',
      'Vue',
      'Nuxt.js',
      'Pinia',
      'Vuex',
      'HTML',
      'SCSS',
      'PWA'
    ]
  },
  {
    title: 'Mobile',
    items: ['React Native', 'Kotlin / Android', 'Cordova', 'Firebase', 'Parse Platform']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Nest.js', 'Express', 'Python', 'Django', 'DRF', 'PHP', 'Bitrix', 'Laravel']
  },
  {
    title: 'Architecture & Ops',
    items: [
      'DDD',
      'CQRS',
      'Clean Architecture',
      'Docker',
      'Kubernetes',
      'GitLab CI/CD',
      'PostgreSQL',
      'GraphQL',
      'Redis'
    ]
  }
] as const

export const cvEducation: readonly CvEducationItem[] = [
  {
    title: 'Искусственный интеллект и большие данные, прикладная информатика',
    place: 'Московский финансово-промышленный университет «Синергия»',
    period: '2030',
    status: 'Неоконченное высшее'
  },
  {
    title: 'Радиофизика',
    place: 'Балтийский федеральный университет им. И. Канта',
    period: '2024',
    status: 'Неоконченное высшее'
  }
] as const

export const cvProjects: readonly CvProject[] = [
  {
    title: 'HTML5CreationEngine',
    description: '2D-движок для браузерных игр на Canvas с аудио, физикой и анимацией.',
    href: 'https://github.com/adametsderschopfer/HTML5CreationEngine'
  },
  {
    title: 'Nodarix',
    description:
      'Фреймворк для веб-приложений с роутингом, работой с базами данных, шаблонами и потоками.',
    href: 'https://github.com/adametsderschopfer/Nodarix'
  },
  {
    title: 'senfo-lang-v2',
    description: 'Примитивный интерпретатор на Java.',
    href: 'https://github.com/adametsderschopfer/senfo-lang-v2'
  }
] as const
