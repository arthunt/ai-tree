# 🧹 Stage 5: Technical Polish & Global Scale
**Lead:** @ANTIGRAVITY (Architecture)
**Execution:** @SWARM (QA & cleanup)

> **Goal:** The "Feature Pivot" is done. Now we must clean up the mess (legacy code) and ensure the app is robust for localization at scale.

---

## 🤖 Swarm Assignment (QA & Polish)

### 1. Mobile & Responsive Audit
**Context:** We added `/seed` and `/dna` with complex animations. We need to ensure they work on phones.
**Tasks:**
*   [ ] **Seed Page Mobile:** Verify buttons stack correctly and touch targets are 44px+.
*   [ ] **DNA View Mobile:** Verify cards stack and don't overflow.
*   [ ] **Tree View Mobile:** Verify pan/zoom works on touch and DetailPanel opens as a Bottom Sheet (or covers correctly).

### 2. Localization Completeness
**Context:** We are moving to ParaglideJS.
**Tasks:**
*   [ ] **Audit:** Check `messages/et.json` for any missing keys mentioned in the code (e.g. `treeView.legendHeading`).
*   [ ] **Cleanup:** Remove unused keys if found (optional).

### 3. Visual Consistency
**Context:** Ensure "Dark Mode" is consistent.
**Tasks:**
*   [ ] Verify proper `dark:` classes on all new components (`SeedPage`, `DNAInput`).

---

## 👨‍💻 Antigravity Focus (Deep Refactor)

### 4. The "Next-Intl" Removal (US-136)
**Context:** We currently have two i18n libraries. This is bad for bundle size and maintenance.
**Tasks:**
*   [x] **Uninstall:** Remove `next-intl`.
*   [x] **Refactor:** Replace `NextIntlClientProvider` with pure Paraglide logic if needed (it's mostly done).
*   [x] **Verify:** Ensure `useParaglideTranslations` is used everywhere.

### 5. Type Safety (US-121)
**Context:** `Supabase` types vs `Frontend` types mismatch caused the bug in Stage 4.
**Tasks:**
*   [x] **Synchronize:** `Database` generated types with `TreeContentSimple` interfaces.
*   [x] **Strict Typing:** Add strictly typed data mapping layer in `getTreeContent.ts`.
