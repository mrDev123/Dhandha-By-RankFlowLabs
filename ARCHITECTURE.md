# Architecture Rules

1. **Frontend handles UI only**
   - Render views/components
   - Capture user input/media
   - Call backend APIs
   - No business logic, scoring logic, or persistence logic in frontend

2. **Backend handles application logic only**
   - Request validation
   - Orchestration of storage + persistence + analysis
   - No embedded AI/model implementation details

3. **AI analysis must be an isolated module**
   - AI/image quality algorithms live in a separate module/package
   - Backend consumes this module through a service boundary

4. **No mixed logic**
   - Keep responsibilities separated across frontend, backend, and AI module
