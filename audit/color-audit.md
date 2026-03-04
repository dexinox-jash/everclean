# Color Accessibility Audit - Everclean Website

## WCAG 2.1 AA Requirements
- Normal text (< 18px): **4.5:1 minimum**
- Large text (≥ 18px bold or 24px): **3:1 minimum**

## Issues Found

### 1. CRITICAL: `text-stone-muted` (#A8A29E)
**Background:** Ivory (#FAF9F6)
**Contrast Ratio:** ~2.9:1
**Status:** ❌ FAILS WCAG AA (needs 4.5:1)
**Used in:**
- Booking price labels
- Form labels
- Footer legal links
- Step indicators
- Portal empty states

### 2. WARNING: `text-stone-light` (#78716C)
**Background:** Ivory (#FAF9F6)
**Contrast Ratio:** ~4.6:1
**Status:** ⚠️ BORDERLINE (just passes AA)
**Recommendation:** Darken slightly for better readability

### 3. CRITICAL: Opacity-reduced ivory text on dark backgrounds
- `text-[var(--color-ivory)]/50` (~2.5:1) - FAILS
- `text-[var(--color-ivory)]/60` (~3.2:1) - FAILS for small text
- `text-[var(--color-ivory)]/70` (~3.9:1) - FAILS for small text
- `text-[var(--color-ivory)]/80` (~5.1:1) - PASSES

### 4. WARNING: Gold text on light backgrounds
- `text-gold-500` (#C9A962) on ivory has ~3:1 ratio
- Only acceptable for large text or UI elements

## Proposed Fixes

### New Color Values for Accessibility

| Token | Current | Proposed | Ratio on Ivory | Status |
|-------|---------|----------|----------------|--------|
| stone | #44403C | #44403C (keep) | 7.2:1 | ✅ AAA |
| stone-light | #78716C | #57534E | 6.8:1 | ✅ AA |
| stone-muted | #A8A29E | #57534E | 6.8:1 | ✅ AA |
| ivory/50 | 50% opacity | #A1A1AA | 2.5:1 | ❌ Keep for decorative only |
| ivory/60 | 60% opacity | #D4D4D8 | 4.6:1 | ✅ AA |
| ivory/70 | 70% opacity | #D4D4D8 | 4.6:1 | ✅ AA |
| ivory/80 | 80% opacity | #E4E4E7 | 6.2:1 | ✅ AA |

### Action Items
1. Replace all `text-stone-muted` with darker color
2. Remove opacity-based text colors, use solid hex values
3. Ensure footer links meet 4.5:1 minimum
4. Update gold text to only be used for large text or icons
