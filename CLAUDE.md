# CLAUDE.md — Unique6 Tools (Project Brain)

> Claude Code чете този файл автоматично. Единствена входна точка за контекст по проекта.

## Моята роля

Аз съм **техническият партньор** на този проект. Потребителят (собственикът) НЕ е програмист — има основни познания. Аз правя всичко техническо: код, тестове, deploy, оптимизации.

**Как работим:**
- **Винаги на български** — обяснявам просто и ясно
- **Не чакам инструкции** за технически решения — правя го сам
- **Когато има избор** (база данни, библиотека и т.н.) — обяснявам опциите просто и питам
- **Потребителят тества само в браузъра** — аз пускам всичко друго
- **След всяка промяна** — commit + push + verify

## Какво е този проект?

**Unique6 Tools** — онлайн каталог за дървообработващи машини и инструменти. Фирмата продава CNC рутери, фрезери, кантиращи машини, дискове и софтуер за мебелно производство.

**Две части:**
1. **Публичен каталог** — клиентите разглеждат продукти, търсят, филтрират по категория
2. **Админ панел** — собственикът добавя/изтрива продукти

**Домейн:** https://www.unique6.tools

## Стек

| Компонент | Технология |
|-----------|-----------|
| **Framework** | Next.js 14.0.4 (Pages Router) |
| **React** | 18.2.0 |
| **TypeScript** | 5.x |
| **Styling** | Tailwind CSS 3.4.1 + dark mode |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma 6.5.0 |
| **State** | Jotai |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Validation** | Zod |
| **Auth** | Custom cookie-based (admin only) |
| **SEO** | next-sitemap + meta tags |
| **Analytics** | Google Analytics (G-C8LZ8WJQ3L) |
| **Deploy** | Vercel |
| **Carousel** | react-slick |
| **Video** | react-youtube |

## Структура на проекта

```
unique-6-mebel-tools/
├── CLAUDE.md                    # Този файл
├── docs/                        # Документация
│   └── plans/                   # Планове за работа
├── prisma/
│   ├── schema.prisma            # DB схема (1 модел: Product)
│   └── seed.cjs                 # Seed данни
├── public/
│   └── images/                  # Снимки на продукти (~48 файла)
├── src/
│   ├── pages/
│   │   ├── index.tsx            # Главна страница (каталог)
│   │   ├── admin.tsx            # Админ панел
│   │   ├── admin-login.tsx      # Админ логин
│   │   ├── terms.tsx            # Условия за ползване
│   │   ├── privacy-policy.tsx   # Политика за поверителност
│   │   ├── cookies-policy.tsx   # Политика за бисквитки
│   │   ├── 404.tsx              # 404 страница
│   │   └── api/                 # API endpoints
│   │       ├── products.ts      # GET/POST/DELETE продукти
│   │       ├── login.ts         # POST логин
│   │       ├── logout.ts        # POST логаут
│   │       └── auth-check.ts    # GET проверка на админ
│   ├── components/              # UI компоненти (14 файла)
│   ├── styles/
│   │   └── globals.css          # Tailwind + custom CSS
│   └── utils/                   # Auth, validation, fetch helpers
├── store/
│   └── index.ts                 # Jotai atoms (auth, products, darkMode)
├── types/
│   └── product.ts               # Product interface
└── utils/                       # Дублирани utils (за изчистване)
```

## Database модел

Един модел — `Product`:
```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  price       Int?
  description String
  image       String
  category    String          // инструменти, машини, софтуер
  subcategory String?
  media       String[]        // допълнителни снимки/видеа
  createdAt   DateTime @default(now())
}
```

## Категории (на български)

- **инструменти**: индивидуални инструменти, диамантени инструменти, дискове, фрезери
- **машини**: кантиращи машини, CNC рутери, циркуляри, пробивни машини
- **софтуер**: (без подкатегории)

## Контактна информация (hardcoded в Navbar)

- Телефон: +359 89 844 7853
- Email: unique6.tools@gmail.com

## Verify команди (пускай след ВСЯКА промяна)

```bash
cd /Users/macbookpro/Documents/GitHub/unique-6-mebel-tools
npm run lint && npm run build
```

**Тестове** (когато бъдат добавени):
```bash
npm test
npx playwright test
```

## Правила

### Код
- TypeScript strict mode — без `any`
- Tailwind за styling — без inline styles
- Prisma за DB — без raw SQL
- Zod за validation

### Продукт
- Езици: Български (основен) + Английски (i18n)
- Dark mode: задължително поддържан
- Mobile-first: responsive дизайн
- SEO: всяка страница с meta tags, structured data

### Deploy
- Push to `main` → автоматичен Vercel deploy
- Проверявай build преди push

## Текущ статус

### Какво работи:
- ✅ Публичен каталог с филтри и търсене
- ✅ Админ панел (login + CRUD)
- ✅ Dark mode
- ✅ Responsive дизайн
- ✅ SEO meta tags
- ✅ Google Analytics код (може да не работи правилно)
- ✅ Sitemap generation
- ✅ Cookie consent

### Какво липсва/трябва:
- ❌ Тестове (unit, integration, e2e)
- ❌ i18n (английски език)
- ❌ Performance оптимизация
- ❌ SEO structured data (JSON-LD)
- ❌ Google Analytics проверка
- ❌ Accessibility audit
- ❌ Error handling подобрения
- ❌ Дублирани utils/ файлове (cleanup)
- ❌ Image optimization (Next.js Image component)

## Автономни правила

1. **Пускай verify командите сам** — не казвай на потребителя да ги пуска
2. **Commit + Push** след всяка завършена стъпка
3. **Обяснявай на български** — просто и ясно
4. **Тествай с Playwright** — не разчитай само на build
5. **Препоръчвай следваща стъпка** — потребителят не е технически
