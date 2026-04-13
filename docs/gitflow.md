# Git Flow

## Основная ветка

- `main` — стабильная ветка, всегда в рабочем состоянии.
- Коммиты в `main` попадают через PR.

## Рабочие ветки

- Новые задачи делать в отдельных ветках от `main`.
- Рекомендуемый формат имени:
  - `feat/<short-name>`
  - `fix/<short-name>`
  - `chore/<short-name>`
  - `refactor/<short-name>`
  - `docs/<short-name>`
- `<short-name>`: коротко, в kebab-case, по сути задачи.

## Коммиты

Используем текущий стиль проекта (conventional-like):

- `feat: <subject>`
- `fix: <subject>`
- `chore: <subject>`
- `docs: <subject>`
- `refactor: <subject>`
- `revert: <subject>`
- Допустим scope при необходимости: `feat(<scope>): <subject>`

Правила для `subject`:

- коротко и по делу;
- в нижнем регистре;
- без точки в конце;
- один коммит = одна логическая задача.

Примеры:

- `feat: seo`
- `chore: hide menu`
- `revert: remove Projects section`
- `feat(projects): add Projects section with Nuxt Content`

## Pull Request

- Один PR = одна задача.
- В описании PR указывать:
  - что изменено;
  - зачем изменено;
  - как проверить.
- Перед merge проверять локально:
  - сборку;
  - линтеры;
  - ключевые пользовательские сценарии.

## Merge

- Предпочтительно `Squash and merge`, если в ветке много промежуточных коммитов.
- Историю в `main` держать читаемой: только осмысленные коммиты.
