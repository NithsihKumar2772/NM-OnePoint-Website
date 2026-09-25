# NM OnePoint Website — Architecture

## 1. Architecture Goal

The website must be:

- Modular
- Reusable
- Maintainable
- Responsive
- SEO-friendly
- Accessible
- AI-agent friendly
- Easy to add to
- Easy to remove from
- Easy to modify
- Safe to deploy

The project should avoid unnecessary duplication.

---

## 2. Pages

The website contains:

- `index.html` — Homepage
- `about.html` — About
- `services.html` — Services
- `projects.html` — Projects
- `contact.html` — Contact

Each page should have a clear responsibility.

---

## 3. Components

Reusable website components belong in:

`components/`

Planned components:

- `header.html`
- `footer.html`
- `hero.html`
- `service-card.html`
- `project-card.html`
- `contact-section.html`

Components should not contain unrelated page logic.

---

## 4. Data

Reusable content should be separated from layout where practical.

Data belongs in:

`data/`

Planned files:

- `site.json`
- `services.json`
- `projects.json`

Examples of centralized information:

- Company name
- Contact information
- Services
- Project information
- Social links
- Business descriptions

---

## 5. CSS Architecture

### variables.css

Global design tokens:

- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Container widths
- Transitions

### reset.css

Browser normalization.

### style.css

Global page layout and common styling.

### components.css

Reusable component styling:

- Header
- Footer
- Buttons
- Cards
- Forms
- Sections

### responsive.css

Responsive behavior:

- Mobile
- Tablet
- Desktop

---

## 6. JavaScript Architecture

### main.js

Application initialization.

### navigation.js

Navigation and mobile menu.

### animations.js

Visual animations and interactions.

### forms.js

Form validation and form behavior.

JavaScript should remain modular.

---

## 7. Assets

Assets are organized as:

- `assets/images`
- `assets/icons`
- `assets/logos`

Use descriptive filenames.

Avoid duplicate assets.

---

## 8. Modification Principle

When changing one feature:

Modify the smallest possible number of files.

Example:

"Add a service"

Prefer:

`data/services.json`

Do not unnecessarily rewrite:

- `index.html`
- `about.html`
- `projects.html`
- `contact.html`

---

## 9. Component Principle

If the same UI appears in multiple places, consider making it reusable.

Examples:

- Header
- Footer
- Buttons
- Service cards
- Project cards
- CTA sections

Avoid copy-and-paste duplication.

---

## 10. AI Development Principle

AI agents must:

1. Inspect the architecture.
2. Read relevant files.
3. Identify affected files.
4. Make minimal changes.
5. Preserve existing functionality.
6. Test the change.
7. Review the Git diff.
8. Explain what changed.

AI must not regenerate the entire website for a small request.

---

## 11. Git Principle

Production:

`main`

Development:

`feature/*`

Example:

`feature/home-page`

All production changes must go through Pull Requests.

---

## 12. Future Website Starter

After NM OnePoint is complete and stable, this project may become a reusable website starter.

The starter should contain:

- Git workflow
- AI instructions
- CSS architecture
- Component architecture
- Responsive system
- SEO structure
- Accessibility rules
- Documentation
- Deployment configuration

Business-specific content should be separated from reusable architecture.

---

## 13. Golden Rule

Build reusable systems instead of repeatedly rewriting pages.

Change one thing without unnecessarily breaking another.