# Lescom Website Analysis & Design Reference

## Overview
This document contains a comprehensive analysis of the Lescom website (https://lk.lescom.su/) to serve as a reference for creating our similar website. The analysis was conducted using Playwright automation on 2025-06-28.

## Authentication System

### Login Credentials Used
- **Username**: `ame`
- **Password**: `ame`

### Login Page (`/auth`)
- Clean, professional Russian interface
- Centered login form with username/password fields
- Green "Войти" (Login) button matching brand colors
- Modern illustration of person working at computer with business icons

## Visual Design System

### Brand Identity
- **Company Name**: ЛЕСKОМ (Lescom)
- **Primary Color**: Dark green (#2D5A3D)
- **Logo**: Minimalist text-based logo
- **Typography**: Clean, modern sans-serif fonts
- **Background**: Clean white with colored elements

### UI Components
- **Card-based interface** for main navigation
- **Grid layout** (3x3 for main dashboard)
- **Professional icons** with outline style
- **Consistent spacing** and visual hierarchy
- **Responsive design** principles
- **Modern form inputs** with labels
- **Data tables** with sorting capabilities
- **Interactive charts** and visualizations

### Color Scheme
- **Primary**: Dark green (#2D5A3D)
- **Background**: White (#FFFFFF)
- **Text**: Dark gray/black
- **Accent**: Light green for highlights

## Website Structure & Routes

### Main Dashboard (`/account/`)
Card-based interface with 8 main sections arranged in a 3x3 grid:

#### Row 1:
1. **👤 Личные данные** (Personal Data) - `/account/profile`
2. **📈 Аналитика** (Analytics) - `/account/marketing`
3. **📦 Заявки обеспечения** (Collateral Applications) - `/account/collateral`

#### Row 2:
4. **💰 Цены на услуги и материалы** (Service & Material Prices) - `/account/price_catalog`
5. **🔔 Подписки** (Subscriptions) - `/account/notification`
6. **✅ Задачи** (Tasks) - `/account/task-manager`

#### Row 3:
7. **👥 Отчёт бригад** (Team Reports) - `/account/building`
8. **⚙️ Админ панель** (Admin Panel) - `/admin/`

## Detailed Feature Analysis

### 1. Personal Data (`/account/profile`) ✅ FULLY FUNCTIONAL
**Features:**
- User profile management form
- Real user data displayed:
  - Phone: "+79123916844"
  - First Name: "Егор" (Egor)
  - Last Name: "Матвеев" (Matveev)
  - Middle Name: "Андреевич" (Andreevich)
- Password change section:
  - New password field
  - Confirm password field
- "Сохранить изменения" (Save Changes) button

**UI Design:**
- Clean form layout with labeled inputs
- Separator between profile data and password change
- Consistent button styling

### 2. Analytics (`/account/marketing`) ✅ FULLY FUNCTIONAL

#### UTM Analytics Section
**Features:**
- Date range picker (Start: 2025-05-29, End: 2025-06-28)
- "Показать" (Show) button to filter data
- Traffic source statistics table:
  - "Не указано" (Not specified): 530 visits
  - "yandex": 8 visits
- Visual pie chart showing source distribution
- Detailed Yandex campaign breakdown table with columns:
  - UTM Medium (all "cpc")
  - UTM Campaign (various campaign IDs)
  - UTM Content (ad group IDs)
  - UTM Term (Russian keywords like "купить домокомплект вологда", "баня 3 3 цены")
  - Count (number of visits)

#### MOP (Manager) Statistics Section
**Features:**
- Date range picker (default: current date)
- "Показать статистику" (Show Statistics) button
- Summary metrics:
  - Total leads: 15
  - Qualified leads: 2
  - Deal amount: 0 ₽
- Detailed manager breakdown:

**Manager 1: Дмитрий Выставкин (ID: 1)**
- Leads: 10
- Calls: 0
- Deal amount: 0 ₽
- Stage distribution: "Новый лид" (New lead): 10 leads

**Manager 2: Витальевич Владимир (ID: 1236)**
- Leads: 3
- Calls: 3
- Deal amount: 0 ₽
- Stage distribution:
  - "Взят в работу" (Taken to work): 1 lead
  - "Не лид (спам)" (Not a lead - spam): 2 leads

**Manager 3: Юрий Яковлев (ID: 3923)**
- Leads: 2
- Calls: 3
- Deal amount: 0 ₽
- Stage distribution:
  - "Взят в работу" (Taken to work): 1 lead
  - "Не наш сегмент" (Not our segment): 1 lead

**Visual Components:**
- Manager activity chart with bars showing leads, calls, and deal amounts
- Lead sources pie chart

### 3. Task Management (`/account/task-manager`) ✅ FULLY FUNCTIONAL

#### View Modes
- **Table View**: "Показать как Список" (Show as List)
- **Kanban View**: "Показать как Канбан" (Show as Kanban)

#### Table View Features
- Columns: ID, Task Name, Task Type
- 15 sample tasks (Task1-Task15) with various statuses:
  - "В работе" (In Progress)
  - "Запланировано" (Planned)
  - "Готово" (Done)
  - "Тестирование" (Testing)
  - "На проверке" (Under Review)

#### Kanban View Features
**Active Columns with Tasks:**
- **В работе** (In Progress): 5 tasks (Task1, Task3, Task9, Task12, Task15)
- **Запланировано** (Planned): 5 tasks (Task2, Task5, Task8, Task11, Task14)
- **Готово** (Done): 3 tasks (Task4, Task10, Task13)
- **На проверке** (Under Review): 1 task (Task7)
- **Тестирование** (Testing): 1 task (Task6)

**Empty Status Columns:**
- Ожидание (Waiting)
- Отложено (Postponed)
- Выполняется (Executing)
- Нужна информация (Need Information)
- Ошибка (Error)
- Анализ (Analysis)
- Разработка (Development)
- Внедрение (Implementation)
- Приостановлено (Paused)
- Отменено (Cancelled)

**Task Cards Design:**
- Task name in bold
- ID displayed as "ID: X"
- Clickable cards for task details

### 4. Protected/Limited Access Routes
The following routes require higher permissions or are under development:
- `/account/collateral` (Collateral Applications)
- `/account/price_catalog` (Price Catalog)
- `/account/notification` (Subscriptions)
- `/account/building` (Team Reports)
- `/admin/` (Admin Panel)

## Technical Implementation Details

### Session Management
- Session-based authentication
- Automatic redirects for unauthorized access
- Session timeout handling

### API Structure
- `/api/` endpoint exists but returns `{"detail":"Not Found"}`
- RESTful API structure implied
- JSON response format

### SEO & Accessibility
- `/robots.txt` allows all crawling
- Semantic HTML structure
- Accessibility features in form labels
- Clean URL structure

### Cookie Management
- Cookie consent banner
- `/cookie` route for cookie policy
- GDPR-compliant implementation

## Business Domain Insights

### Industry Focus
Based on Yandex campaign keywords, the business appears to be in:
- **Construction materials** ("домокомплект" = house kit)
- **Bathhouse construction** ("баня" = bathhouse)
- **Building services** with installation

### Geographic Market
- **Primary market**: Vologda region (keywords include "вологда")
- **Russian market focus** (all content in Russian)

### Business Model
- **B2B services** (manager-based lead tracking)
- **Project-based work** (task management system)
- **Lead generation focus** (UTM tracking, manager analytics)

## Footer Design
- Clean separator line
- Company copyright: "Проект компании Леском © 2025"
- Development credit: "Разработано в Леском"
- Consistent branding

## Mobile Responsiveness
- Responsive card layout
- Mobile-friendly forms
- Adaptive navigation
- Touch-friendly interface elements

## Implementation Recommendations

### Technology Stack
- **Frontend**: Angular (based on our current project)
- **Authentication**: Session-based with role management
- **Charts**: Chart.js or similar for analytics
- **UI Framework**: Angular Material or custom components
- **Icons**: Outline-style icon library

### Key Features to Implement
1. **Card-based dashboard** with 8 main sections
2. **Comprehensive analytics** with UTM and manager tracking
3. **Advanced task management** with table/kanban views
4. **User profile management** with password changes
5. **Role-based access control** for different sections
6. **Responsive design** matching the visual style
7. **Russian localization** support

### Development Priority
1. **Phase 1**: Authentication + Dashboard layout
2. **Phase 2**: Task management system
3. **Phase 3**: Analytics and reporting
4. **Phase 4**: User management and admin features
5. **Phase 5**: Advanced features and optimizations

---

*This analysis serves as a comprehensive reference for building a similar business management platform with the same functionality and design principles.*