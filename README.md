# Green API test
A frontend application built with React, Vite, and npm. This project does not include a backend server; it runs locally in the browser.

## English

### Requirements

- Node.js (an active LTS version is recommended)
- npm (included with Node.js)

Check your installed versions:

```bash
node --version
npm --version
```

### Local setup

1. Clone the repository and enter the project directory:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed in the terminal (Vite usually uses `http://localhost:5173`).

### Other commands

```bash
npm run build    # Build the production bundle
npm run preview  # Preview the production build locally
npm run lint     # Run linting, if configured
```

The available commands depend on the scripts defined in `package.json`.

### Environment variables

If the project requires environment variables, create a `.env` file in the project root and use the variable names expected by the application. In Vite, variables exposed to client-side code must use the `VITE_` prefix, for example:

```dotenv
VITE_API_URL=https://example.com
```

No backend server is included in this project. Any API integrations require an externally available service.

### Troubleshooting

- **`npm` or `node` not found:** Install Node.js, then reopen your terminal.
- **Port is already in use:** Follow Vite's suggested alternative URL, or stop the process using the port.
- **Dependency issues:** Try `npm install` again. If the repository includes a `package-lock.json`, prefer `npm ci` for a clean, reproducible install.

---

## Русский

### Требования

- Node.js (рекомендуется актуальная LTS-версия)
- npm (поставляется вместе с Node.js)

Проверьте установленные версии:

```bash
node --version
npm --version
```

### Локальный запуск

1. Клонируйте репозиторий и перейдите в папку проекта:

   ```bash
   git clone <ссылка-на-репозиторий>
   cd <папка-проекта>
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Запустите сервер разработки:

   ```bash
   npm run dev
   ```

4. Откройте локальный адрес, который появится в терминале (обычно Vite использует `http://localhost:5173`).

### Другие команды

```bash
npm run build    # Сборка production-версии
npm run preview  # Локальный просмотр production-сборки
npm run lint     # Проверка кода линтером, если настроена
```

### Переменные окружения

Если проекту нужны переменные окружения, создайте файл `.env` в корневой папке и укажите в нём переменные, которые использует приложение. В Vite переменные, доступные клиентскому коду, должны иметь префикс `VITE_`, например:

```dotenv
VITE_APP_API_URL=https://3100.api.green-api.com
```

Backend-сервер в проект не входит. Для интеграций с API потребуется внешний сервис.

### Решение проблем

- **Команды `npm` или `node` не найдены:** Установите Node.js и заново откройте терминал.
- **Порт занят:** Используйте альтернативный адрес, предложенный Vite, либо остановите процесс, который занимает порт.
- **Проблемы с зависимостями:** Повторно выполните `npm install`. Если в репозитории есть `package-lock.json`, для чистой и воспроизводимой установки предпочтительнее использовать `npm ci`.
