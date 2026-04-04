# Master Plan — Unique6 Tools

## Цел
Превръщане на работещия каталог в професионално, оптимизирано и тествано уеб приложение.

---

## ФАЗА 1: Основи (Тестове + Cleanup)

### Стъпка 1 — Cleanup: дублирани файлове и структура
- [ ] Премахни дублираните `utils/` на root ниво (вече съществуват в `src/utils/`)
- [ ] Оправи всички import paths
- [ ] Провери lint + build

### Стъпка 2 — Unit тестове (Vitest)
- [ ] Инсталирай Vitest + testing-library
- [ ] Тестове за `validateProduct.ts` (Zod validation)
- [ ] Тестове за `auth.ts` (auth check logic)
- [ ] Тестове за `fetchProducts.ts`
- [ ] npm script: `npm test`

### Стъпка 3 — E2E тестове (Playwright)
- [ ] Инсталирай Playwright
- [ ] Тест: главна страница зарежда продукти
- [ ] Тест: търсене филтрира правилно
- [ ] Тест: категории филтрират правилно
- [ ] Тест: dark mode toggle работи
- [ ] Тест: admin login flow
- [ ] Тест: 404 страница
- [ ] npm script: `npm run test:e2e`

---

## ФАЗА 2: Bug Fixes + Code Quality

### Стъпка 4 — Bug audit и fixes
- [ ] Провери всички API endpoints за error handling
- [ ] Провери admin auth за security issues
- [ ] Провери responsive дизайн на всички екрани
- [ ] Провери dark mode на всички компоненти
- [ ] Провери image loading и fallbacks
- [ ] Fix Google Analytics (може да не track-ва правилно)

### Стъпка 5 — Code quality подобрения
- [ ] Добави proper error boundaries
- [ ] Подобри loading states (skeleton screens)
- [ ] Добави proper TypeScript types навсякъде
- [ ] Оптимизирай API calls (caching, error handling)

---

## ФАЗА 3: i18n (Английски език)

### Стъпка 6 — Инсталация на i18n
- [ ] Инсталирай next-i18next или подобно
- [ ] Създай translation файлове: `bg.json` + `en.json`
- [ ] Извади всички hardcoded текстове в translation keys
- [ ] Добави language switcher в Navbar
- [ ] Тествай всички страници на двата езика
- [ ] SEO: hreflang tags за BG/EN

---

## ФАЗА 4: SEO Оптимизация

### Стъпка 7 — Technical SEO
- [ ] JSON-LD structured data (Product, Organization, WebSite)
- [ ] Open Graph tags на всички страници
- [ ] Canonical URLs
- [ ] Proper heading hierarchy (h1, h2, h3)
- [ ] Image alt текстове
- [ ] robots.txt оптимизация
- [ ] Sitemap подобрения (product pages ако има)

### Стъпка 8 — Google интеграции
- [ ] Провери Google Search Console верификация
- [ ] Fix Google Analytics tracking
- [ ] Submit sitemap в Search Console
- [ ] Провери Core Web Vitals
- [ ] Fix всички SEO проблеми от Search Console

---

## ФАЗА 5: Performance

### Стъпка 9 — Image оптимизация
- [ ] Мигрирай към Next.js `<Image>` компонент
- [ ] WebP формат за всички снимки
- [ ] Lazy loading на изображения
- [ ] Proper image sizes (responsive srcset)

### Стъпка 10 — Bundle и Loading оптимизация
- [ ] Анализирай bundle size
- [ ] Code splitting (dynamic imports)
- [ ] Оптимизирай Framer Motion (lazy load)
- [ ] Font optimization (Poppins/Inter)
- [ ] Prefetch критични ресурси

---

## ФАЗА 6: Нови функционалности (бъдеще)

### Потенциални добавки:
- [ ] Индивидуални product страници (`/products/[id]`)
- [ ] Контактна форма
- [ ] Product comparison
- [ ] Favorites / Wishlist
- [ ] Admin: edit product (не само add/delete)
- [ ] Admin: image upload (не само filename)
- [ ] Email notifications
- [ ] Product search by price range

---

## Прогрес

| Фаза | Статус |
|------|--------|
| Фаза 1: Тестове + Cleanup | ⬜ Не е започната |
| Фаза 2: Bug Fixes | ⬜ Не е започната |
| Фаза 3: i18n | ⬜ Не е започната |
| Фаза 4: SEO | ⬜ Не е започната |
| Фаза 5: Performance | ⬜ Не е започната |
| Фаза 6: Нови функции | ⬜ Бъдеще |
