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
- Missing features detected and fixed list

## Required conversation threads
- conv_users_analysis
- conv_products_analysis
- conv_sales_analysis
- conv_user_orders
- conv_business_queries
- conv_ai_discussion
- conv_dev_help
- conv_general_chat

## Suggested command workflow
```bash
php -l app/Http/Controllers/Api/ConsolidatedAIController.php
php -l app/Services/Query/AIQueryExecutor.php
php -l app/Services/Query/AIQueryParser.php
php -l config/ai_threads.php
php -l routes/api.php
php -l tests/Feature/AIConversationThreadContractTest.php
./vendor/bin/phpunit --filter AIConversationThreadContractTest
./vendor/bin/phpunit --filter AIQueryFlowTest
./vendor/bin/phpunit --filter SpatiePermissionFlowTest
npm run build
```

Then populate `docs/validation/final-report.template.json` with measured values.
