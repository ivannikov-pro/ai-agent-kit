# Полный аудит AI Agent Kit (как части ivannikov.pro)

## Контекст и философия
Репозиторий `ai-agent-kit` является Open Source продуктом и частью общей витрины экспертности (Web3 / AI). Цель этого аудита — привести проект в соответствие с outcome-ориентированным пайплайном сайта `ivannikov.pro` (Привлечь → Убедить → Конвертировать).

В текущем виде проект выглядит как отличный технический инструмент (Output), но упускает шанс позиционировать автора как эксперта (Trusted Advisor) для потенциальных b2b-клиентов и фаундеров, которые приходят за инструментом, но на самом деле нуждаются в готовом решении (Outcome).

---

## ЧАСТЬ 1: Аудит позиционирования и месседжинга

- **Outcome, а не Output**: Строго ориентировано на Output. H1 — просто название продукта ("ai-agent-kit"). Описание говорит ЧТО это ("Curated collection..."), но не говорит ЗАЧЕМ это бизнесу/разработчику.
- **Позиционирование (Эксперт vs Подрядчик)**: Безликий корпоративный подход. Нет упоминания, что это авторская библиотека от Aleksandr Ivannikov, основанная на реальном опыте.
- **CTA**: Единственный призыв — скопировать команду инициализации. Нет возможности связаться с экспертом для заказа кастомной разработки или интеграции ИИ в бизнес.

## ЧАСТЬ 2: Постраничный аудит (Home Page)

**1. ЦЕЛЬ СТРАНИЦЫ**
- Сейчас: Дать скопировать команду для CLI.
- В идеале: Отдать бесплатную ценность (Open Source) + захватить высокоуровневых лидов ("Need this custom-built for your enterprise?").

**2. КОНТЕНТ**
- **H1**: `ai-agent-kit` → `Build Custom AI Agents Faster with Production-Ready Workflows`
- **Pre-title**: Отсутствует → Добавить `Aleksandr Ivannikov | Open Source`
- **Meta Title**: `AI Agent Kit` → `AI Agent Kit by Aleksandr Ivannikov | Custom AI Workflows`
- **Meta Description**: `Professional AI agents and tools ecosystem` → `Accelerate your AI development with production-ready agent skills, workflows, and MCP configs. Ready-to-use templates by Aleksandr Ivannikov.`
- **CTA**: `npx ... init` (оставить как основной Quick Win) → Добавить Secondary CTA: `Need a custom AI solution? Let's talk`.

**3. СКОР (1-10)**
- Positioning score: 3/10 (инструмент ради инструмента)
- SEO score: 5/10 (отсутствует Schema.org, слабые title/desc)
- Conversion score: 2/10 (нет воронки для продажи услуг) 

## ЧАСТЬ 3: SEO и техническая оптимизация

- [x] Уникальные Title / Meta Description (есть, но требуют улучшения)
- [ ] Schema.org microdata (JSON-LD) отсутствует. Нужно добавить `Person` и `SoftwareSourceCode` профили в `<head>`.
- [ ] Открытые графы (OG) настроены, но требуют синхронизации с новым позиционированием.

## ЧАСТЬ 4: Конверсионная воронка

**Текущая воронка:**
`Вход → Копирование команды CLI → Уход`

**Идеальная воронка:**
`Вход (поиск агентов) → Осознание ценности библиотеки → Копирование команды (Quick win) → Видит блок "Need help? Hire the expert" (Upsell) → Переход на ivannikov.pro/services → Звонок`

**Что добавить:**
CTA banner над футером (Exit intent/Bottom CTA): "Looking to implement autonomous AI agents in your business? Let's build it together. [Book a Discovery Call]"

## ВЫХОДНОЙ ФОРМАТ: Actionable План

### 🔴 Critical (К внедрению сейчас)
1. **Переписать Hero section**:
   - Добавить pre-title с брендом эксперта.
   - Заменить H1 на Outcome-oriented заголовок.
   - Добавить второстепенную кнопку-ссылку на консультацию.
2. **Добавить Conversion Banner**:
   - Над футером (или в футере) добавить блок с предложением консалтинга/разработки кастомных ИИ-агентов.
3. **SEO и Metadata**:
   - Обновить `layout.ts` (Title, Description).
   - Внедрить JSON-LD `SoftwareApplication` / `Person` schema.
