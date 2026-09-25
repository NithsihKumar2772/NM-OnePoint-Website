# NM OnePoint Website — Development Rules

## 1. Project Goal

Build and maintain the NM OnePoint Services website using a professional,
modular, maintainable and safe development workflow.

The website must be developed incrementally from 0% to 100%.

---

## 2. Git Safety Rules

- `main` is the production branch.
- Never make development changes directly on `main`.
- Every feature, fix, redesign or content change must use a dedicated feature branch.
- Never force-push to `main`.
- Never delete `main`.
- Never reset or overwrite existing work without explicit approval.
- Preserve Git history.

---

## 3. AI Agent Rules

Before making changes:

1. Inspect the existing project structure.
2. Read the relevant files.
3. Understand the existing implementation.
4. Identify exactly which files need modification.
5. Explain the intended changes when the task is not trivial.

The AI agent must:

- Make the smallest necessary changes.
- Modify only files relevant to the requested task.
- Preserve existing functionality.
- Preserve existing design unless a redesign is explicitly requested.
- Avoid unnecessary rewrites.
- Avoid replacing complete files when a targeted edit is sufficient.
- Never delete working functionality without approval.
- Never modify unrelated pages or components.
- Never introduce dependencies without explaining why they are needed.
- Never expose secrets, API keys or credentials.

---

## 4. Existing Code Protection

Before editing an existing file:

- Read the current file.
- Preserve working sections.
- Make targeted modifications.
- Check the resulting diff.

The AI must NOT:

- Replace the entire website unnecessarily.
- Rebuild unrelated pages.
- Delete existing CSS or JavaScript without a reason.
- Rename files without approval.
- Change the project architecture without approval.

---

## 5. Feature Development Workflow

Every feature follows:

1. Create feature branch.
2. Inspect existing code.
3. Implement the requested change.
4. Run local tests.
5. Review Git diff.
6. Fix problems.
7. Commit the change.
8. Push the feature branch.
9. Open a GitHub Pull Request.
10. Generate/review preview deployment.
11. Test desktop and mobile.
12. Merge only after approval.

---

## 6. Branch Naming

Use descriptive branch names.

Examples:

- `feature/homepage`
- `feature/services-page`
- `feature/contact-form`
- `feature/mobile-navigation`
- `fix/mobile-menu`
- `fix/contact-form-validation`
- `refactor/header`

---

## 7. Commit Rules

Use clear commit messages.

Examples:

- `feat: add homepage hero section`
- `feat: add services page`
- `fix: repair mobile navigation`
- `style: improve responsive layout`
- `refactor: simplify navigation logic`
- `docs: update project requirements`

Each commit should represent a focused change.

---

## 8. File Ownership

### HTML

Page structure and page-specific content:

- `index.html`
- `about.html`
- `services.html`
- `projects.html`
- `contact.html`

### CSS

- `variables.css` — global design variables
- `reset.css` — browser normalization
- `style.css` — global page styling
- `components.css` — reusable components
- `responsive.css` — responsive/mobile behavior

### JavaScript

- `main.js` — application initialization
- `navigation.js` — navigation/menu behavior
- `animations.js` — animations and visual interactions
- `forms.js` — form behavior and validation

---

## 9. Testing Requirements

Before merging a feature:

### Desktop

Test:

- Chrome
- Edge

### Mobile

Test responsive layouts for:

- Small phone
- Large phone
- Tablet

Check:

- Navigation
- Buttons
- Forms
- Images
- Typography
- Spacing
- Links
- Animations
- Horizontal overflow
- Console errors

---

## 10. Visual Review

Every visual change must be reviewed using the local development server
or deployment preview.

Do not assume that successful code execution means the UI is correct.

Check the actual rendered page.

---

## 11. Pull Request Rules

Every feature should be reviewed through a Pull Request.

The Pull Request should include:

- What changed
- Why it changed
- Files modified
- Testing performed
- Known limitations

---

## 12. Production Rules

`main` represents production-ready code.

Never merge unfinished work.

Never merge code that has known critical errors.

Never bypass the Pull Request workflow.

---

## 13. Change Scope

When the user requests:

"Change the Services page"

The AI should normally modify:

- `services.html`
- Relevant CSS
- Relevant JavaScript

It should NOT automatically rewrite:

- `index.html`
- `about.html`
- `projects.html`
- `contact.html`

unless the requested change genuinely requires those files.

---

## 14. Before and After Editing

Before:

- Inspect.
- Plan.
- Identify files.

After:

- Review diff.
- Check for accidental changes.
- Test.
- Report exactly what changed.

---

## 15. User Approval

The user must remain in control of production changes.

AI may prepare changes.

AI may create commits and Pull Requests when explicitly authorized.

Production changes require Pull Request review and merge.

---

## 16. Golden Rule

DO NOT REWRITE THE WEBSITE.

Make focused, minimal, reversible changes.

Preserve working code.

If the requested change requires a larger architectural change,
explain the reason before proceeding.