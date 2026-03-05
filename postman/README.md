# Postman Validation Pack

## Files
- `Laravel-AI-Engine.postman_collection.json`
- `Laravel-AI-Engine.postman_environment.json`

## Usage
1. Import both files into Postman.
2. Set `auth_token` in environment.
3. Run collection for AI thread, security, and data endpoint checks.

## Newman
```bash
newman run postman/Laravel-AI-Engine.postman_collection.json \
  -e postman/Laravel-AI-Engine.postman_environment.json \
  --reporters cli,json \
  --reporter-json-export postman/newman-report.json
```
