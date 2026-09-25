# NM OnePoint Website — AI Development Instructions

## Project

This is the NM OnePoint Services production website.

The project uses:

- HTML
- CSS
- JavaScript
- Git
- GitHub
- Pull Requests
- Preview deployments

---

# CRITICAL SAFETY RULES

## 1. NEVER modify `main` directly

The `main` branch is the protected production branch.

AI development must happen on a feature or fix branch.

Before making changes, verify the current branch.

If currently on `main`, STOP and ask the user to create or switch to an appropriate feature branch.

Never bypass branch protection.

---

## 2. Inspect before editing

Before changing any file:

1. Inspect the project structure.
2. Read the relevant existing files.
3. Understand the current implementation.
4. Identify the minimum files required.
5. Make a plan.

Do not blindly rewrite files.

---

## 3. Minimal changes

Modify only what is necessary for the requested task.

Do NOT:

- Rewrite entire files unnecessarily.
- Replace working code without reason.
- Delete existing functionality.
- Modify unrelated pages.
- Modify unrelated CSS.
- Modify unrelated JavaScript.
- Rename files without approval.
- Change the project architecture without approval.

---

# HTML RULES

Existing HTML pages:

- `index.html`
- `about.html`
- `services.html`
- `projects.html`
- `contact.html`

When modifying one page:

- Preserve the existing structure.
- Preserve existing sections unless explicitly asked to change them.
- Preserve navigation.
- Preserve links.
- Preserve accessibility attributes.
- Preserve SEO metadata unless intentionally changing SEO.

If the user asks to change `services.html`, do not automatically rewrite:

- `index.html`
- `about.html`
- `projects.html`
- `contact.html`

---

# CSS RULES

CSS is modular.

Files:

- `css/variables.css`
- `css/reset.css`
- `css/style.css`
- `css/components.css`
- `css/responsive.css`

Use the appropriate existing CSS file.

Prefer reusing existing variables and components.

Do not create duplicate styles when an existing reusable style can be used.

Avoid unnecessary global CSS changes.

---

# JAVASCRIPT RULES

JavaScript files:

- `js/main.js`
- `js/navigation.js`
- `js/animations.js`
- `js/forms.js`

Preserve existing functionality.

Do not introduce JavaScript libraries or frameworks unless explicitly requested.

Avoid unnecessary JavaScript.

---

# ASSETS

Assets are stored in:

- `assets/images`
- `assets/icons`
- `assets/logos`

Do not delete or replace assets without explicit approval.

Use relative paths.

---

# TESTING

After making changes:

1. Check the modified files.
2. Check for syntax errors.
3. Run the local website.
4. Test the affected functionality.
5. Check browser console errors.
6. Check desktop layout.
7. Check mobile layout.
8. Check links and navigation.
9. Review the Git diff.

---

# GIT SAFETY

Before committing:

Run:

    git status

Then:

    git diff

Review all changes.

Never commit unrelated changes.

Use focused commits.

Examples:

    feat: add homepage hero section
    feat: add services cards
    fix: repair mobile navigation
    style: improve responsive spacing
    docs: update website documentation

---

# DO NOT PUSH TO MAIN

Never force push.

Never reset or overwrite production history.

Never delete the main branch.

Never use destructive Git commands unless explicitly approved by the user.

Examples of commands requiring explicit approval:

- git reset --hard
- git clean -fd
- git push --force
- deleting branches containing unmerged work

---

# FEATURE WORKFLOW

Expected workflow:

main
  ↓
feature branch
  ↓
AI development
  ↓
local preview
  ↓
git diff
  ↓
commit
  ↓
push feature branch
  ↓
Pull Request
  ↓
preview deployment
  ↓
user review
  ↓
merge
  ↓
main

---

# SAME-BRANCH FIXES

If a Pull Request has problems:

Do NOT create unnecessary new branches.

Fix the problem on the same feature branch.

Push the fix.

The Pull Request should update automatically.

---

# AI COMMUNICATION

Before making substantial changes, explain:

1. What will change.
2. Which files will change.
3. Why those files need changing.

After changes, report:

1. Files changed.
2. What changed.
3. Tests performed.
4. Any remaining issues.

---

# IMPORTANT

The user's instruction has priority over assumptions.

If a request is ambiguous and could cause destructive changes:

STOP and ask for clarification.

Do not guess.

---

# GOLDEN RULE

Preserve working code.

Make small, focused, reversible changes.

Never rewrite the project unnecessarily.