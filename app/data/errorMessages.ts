export const errorMessages = {
  ru: {
    client: {
      title: 'Страница не найдена',
      description: 'Похоже, такого адреса здесь нет.'
    },
    server: {
      title: 'Что-то пошло не так',
      description: 'Проблема возникла на нашей стороне. Попробуй обновить страницу позже.'
    },
    actions: {
      home: 'На главную'
    }
  },
  en: {
    client: {
      title: 'Page Not Found',
      description: 'It looks like this address does not exist.'
    },
    server: {
      title: 'Something Went Wrong',
      description: 'The issue happened on our side. Try refreshing the page a bit later.'
    },
    actions: {
      home: 'Back Home'
    }
  }
} as const
