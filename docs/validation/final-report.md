# Enterprise Validation Report Template

Use `final-report.template.json` as machine-readable output and complete this checklist for human-readable reporting.

## Required metrics
- Conversation context success rate
- Database query success rate
- Vector search usage (Scout + fallback)
- RAG injection success
- LLM hallucination detection
- Formatting accuracy
- Frontend stability
- Security verification
- Overall system reliability

## Suggested command workflow
```bash
php -l app/Http/Controllers/Api/ConsolidatedAIController.php
php -l app/Services/Query/AIQueryExecutor.php
php -l routes/api.php
npm run build
./vendor/bin/phpunit --filter AIQueryFlowTest
./vendor/bin/phpunit --filter SpatiePermissionFlowTest
```

Then populate `docs/validation/final-report.template.json` with measured values.
