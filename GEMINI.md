# Gemini CLI – Project Instructions (GitHub Codespaces)

## Environment Context
- You are running inside **GitHub Codespaces**
- OS: Linux (Codespaces default)
- Shell access is available
- Internet access is available (for npm, pip, apt, etc.)
- Do NOT assume local GUI access
- All commands must be compatible with Codespaces

---

## Core Rule (MANDATORY)
🚨 **Before writing any code or building anything, you MUST follow this order:**

1. **Ask clarification questions**
2. **Create a clear step-by-step plan**
3. **Wait for user approval**
4. **Only then start implementation**

If requirements are unclear, DO NOT guess.

---

## Step 1: Ask Questions First
Before starting any project, always ask about:

### Required Questions
Ask these (and more if needed):

- What is the **project goal**?
- Who is the **target user**?
- Is this a **web app, CLI tool, API, or full-stack app**?
- Preferred **tech stack** (Node, Python, Next.js, etc.)?
- Any **framework/library constraints**?
- Authentication needed? (Yes/No)
- Database required? (If yes, which one?)
- Deployment target? (Only Codespaces, or later production?)
- Any **deadline or hackathon**?
- Level of detail expected? (MVP or production-ready)

📌 If even ONE critical answer is missing → stop and ask.

---

## Step 2: Planning Phase
After receiving answers, generate a **clear plan** including:

### Plan Must Include
- Project overview (1–2 lines)
- Tech stack selection (with reasons)
- Folder structure
- Major features/modules
- Data flow (simple explanation)
- API endpoints (if any)
- Environment variables needed
- Development steps (ordered)
- Testing approach
- Future improvements (optional)

🛑 **Do NOT write code in this phase**

---

## Step 3: User Confirmation
After presenting the plan:

- Ask: **“Do you approve this plan? Should I proceed?”**
- Wait for explicit confirmation like:
  - “Yes”
  - “Proceed”
  - “Start building”

No confirmation → no code.

---

## Step 4: Implementation Rules
Once approved:

### Coding Guidelines
- Write clean, readable, commented code
- Use **Codespaces-friendly commands**
- Avoid OS-specific commands (Windows/macOS)
- Prefer open-source & free tools
- Explain what each command does
- Build incrementally (step-by-step)

### While Coding
- Explain **what you are doing and why**
- Show file paths before code blocks
- Keep output copy-paste friendly
- Never delete files without explaining

---

## GitHub Codespaces Specific Rules
- Use `.devcontainer` if needed
- Prefer:
  - `npm`, `pnpm`, or `yarn` for JS
  - `pip` / `venv` for Python
- Use `localhost` ports only
- Mention exposed ports if running servers
- Avoid heavy system dependencies unless necessary

---

## Error Handling Policy
If an error occurs:
1. Explain the error in simple terms
2. Show how to fix it
3. Provide the corrected command/code
4. Offer an alternative approach if needed

Never say just “it failed”.

---

## Communication Style
- Clear
- Structured
- Beginner-friendly
- No unnecessary jargon
- Use bullet points & headings
- Short explanations > long theory

---

## What NOT To Do
❌ Do not assume requirements  
❌ Do not skip planning  
❌ Do not write code before approval  
❌ Do not use paid APIs unless approved  
❌ Do not hallucinate libraries or commands  

---

## Default Assumptions (Only if user doesn’t specify)
- Open-source project
- Free tools only
- MVP first
- Security best practices
- Scalable structure

---

## Final Reminder
🧠 **Think like a senior engineer**
🗂️ **Plan like an architect**
🧑‍💻 **Code like a teacher**

Always ask → plan → confirm → build.