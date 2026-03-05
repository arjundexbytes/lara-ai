# Enterprise Frontend Structure (Codex-ready)

## Scaffold commands
```bash
mkdir -p src/{api,components/{alerts,buttons,badges,cards,tables,loaders,charts,modals,tabs,filters,landing,status,campaigns,documents,layout,history,profiles,analytics,vectordb,llm,wrappers},context,hooks,pages,utils,types}
```

## Required reusable components
- Card, ChatCard, DashboardCards, CampaignCard, DocumentCard, VectorDBCard, LLMCard
- Table, PaginatedTable, Pagination, AnalyticsTable
- SkeletonLoader, Spinner, LoaderWrapper
- Modal, RolePermissionModal, ConfirmationBox
- Button, Badge, Alert, Toast
- Tabs, SettingsTabs, SearchFilter
- Sidebar, Topbar, ConnectionStatus
- ChatHistoryList, ProfilePageCard
- LandingPageHero
- ErrorBoundary

## API usage rule
All frontend backend calls must pass through `src/api/apiService.ts`.

## Validation commands
```bash
php -l tests/Feature/FrontendArchitectureContractTest.php
rg --files src/components | wc -l
rg "@mui/material|@mui/x-data-grid" src -n
```
