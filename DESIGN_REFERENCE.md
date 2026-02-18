# Techutsav '26 "PARADIGM" - Design Reference

## Visual Concept

**Stranger Things-Inspired Tech Festival Landing Page**

The design captures the essence of Stranger Things (2016-2022) with its distinctive visual language:
- Blue-to-red gradient aesthetic (from left to right)
- Neon glow effects for key elements
- Dark, mysterious atmosphere
- Cinematic imagery and atmosphere
- Modern, tech-forward typography

## Color Palette Reference

### Primary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Deep Blue | `#0a1428` | Left side, primary backgrounds |
| Netflix Red | `#e50914` | Right side, CTAs, accents |
| Neon Cyan | `#00ffff` | Text glow, borders, highlights |
| Neon Pink | `#ff006e` | Secondary glow, accent shadows |

### Secondary Colors
| Color | Hex Code | Usage |
|-------|----------|-------|
| Dark Background | `#0f0f0f` | Page background |
| Medium Blue | `#1e4d8b` | Secondary elements |
| Dark Red | `#a00a0f` | Darker backgrounds |
| White | `#ffffff` | Primary text |
| Light Gray | `#a3a3a3` | Secondary text |

## Typography

### Font Stack
- **Heading Font**: "Netflix Sans Variable" (fallback: system fonts)
- **Body Font**: System fonts optimized for readability
- **Code Font**: "Courier New", monospace

### Text Hierarchy
```
H1 (Hero): 48-112px, Bold, neon-glow effect
H2 (Section): 32-56px, Bold, neon-glow effect
H3 (Subsection): 20-32px, Bold, colored text
H4 (Card Title): 16-24px, Bold, colored text
Body: 14-18px, Regular, white/light gray
Small: 12-14px, Regular, gray
```

## Component Styling

### Buttons
- **Primary CTA**: Red background with neon glow on hover
- **Secondary**: Border only with cyan border
- **Size**: Minimum 44px height for accessibility
- **Hover State**: Scale, glow increase, background shift

### Cards
- **Style**: Glassmorphic (semi-transparent with blur)
- **Border**: 1-2px cyan border with glow effect
- **Background**: `rgba(15, 15, 15, 0.7)` with 10px blur
- **Hover**: Scale up, increase glow, border color shift

### Badges/Tags
- **Style**: Small rounded pills
- **Colors**: Accent color with 10% opacity background
- **Text**: Matching color text with high contrast

## Layout Patterns

### Hero Section (Home)
```
┌─────────────────────────────────────┐
│                                     │
│      🎬 Background Image            │
│      Overlay Gradient               │
│                                     │
│      ✨ Main Title (Neon Glow)     │
│      📊 Countdown Timer (4 Cards)  │
│      🔘 CTA Button                 │
│      ⬇️ Scroll Indicator            │
│                                     │
└─────────────────────────────────────┘
```

### Section Layout
```
┌─────────────────────────────────────┐
│   📌 Section Title (Centered)       │
│   ────────────────────────────       │
│                                     │
│   [Content Grid/Carousel]           │
│                                     │
│   🔘 Call to Action (Optional)     │
│                                     │
└─────────────────────────────────────┘
```

### Card Grid
```
Desktop (3 columns):
┌──────┐ ┌──────┐ ┌──────┐
│ Card │ │ Card │ │ Card │
└──────┘ └──────┘ └──────┘

Tablet (2 columns):
┌──────┐ ┌──────┐
│ Card │ │ Card │
└──────┘ └──────┘
┌──────┐ ┌──────┐
│ Card │ │ Card │
└──────┘ └──────┘

Mobile (1 column):
┌──────────┐
│   Card   │
└──────────┘
┌──────────┐
│   Card   │
└──────────┘
```

## Animation Effects

### Neon Glow Animation
```css
@keyframes neon-glow {
  0%, 100% { 
    text-shadow: 0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff;
  }
  50% { 
    text-shadow: 0 0 20px #0ff, 0 0 30px #0ff, 0 0 40px #0ff;
  }
}
```
- **Duration**: 2 seconds
- **Timing**: Ease in-out
- **Effect**: Pulsing glow on text

### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```
- **Duration**: 3 seconds
- **Effect**: Gentle hovering motion

### Fade In Up
```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
- **Duration**: 0.8 seconds
- **Effect**: Content appears from below

## Spacing & Sizing

### Section Padding
- **Mobile**: 20px horizontal, 80px vertical
- **Tablet**: 40px horizontal, 100px vertical
- **Desktop**: 60px horizontal, 120px vertical

### Component Gaps
- **Between elements**: 16px (gap-4)
- **Between sections**: 32px (gap-8)
- **Large gaps**: 48px (gap-12)

### Border Radius
- **Small**: 4px (images, small elements)
- **Medium**: 8px (cards, inputs)
- **Large**: 12px (large components)
- **Extra Large**: 16px (major sections)

## Responsive Breakpoints

```
Mobile (< 640px):     sm
Tablet (640-1024px):  md
Desktop (1024-1280px): lg
Large (> 1280px):     xl
```

## Imagery Guidelines

### Background Images
- Use high-contrast imagery
- Overlay with dark gradient for text readability
- Sizes: Full-width, maintain aspect ratio
- Formats: WebP with JPEG fallback

### Card Images
- Aspect Ratio: 16:9 or 1:1 depending on section
- Hover Effect: Scale 1.1 with 300ms transition
- Overlay: Dark gradient at bottom for text

### Icons
- Size: 16px, 20px, 24px, 32px
- Color: Match accent colors
- Library: Lucide React

## Glass Morphism Effect

```css
.glassmorphism {
  background: rgba(15, 15, 15, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 255, 255, 0.1);
}
```

**Usage**: Cards, overlays, navbar background

## Shadow/Glow Effects

### Text Glow
```css
text-shadow: 0 0 10px var(--color-accent-cyan),
             0 0 20px var(--color-accent-cyan);
```

### Box Glow
```css
box-shadow: 0 0 10px rgba(0, 255, 255, 0.3),
            0 0 20px rgba(255, 0, 110, 0.3);
```

## Dark Mode Support

All colors are designed for dark theme (the default and recommended mode). The color system uses:
- Dark backgrounds (#0f0f0f to #1a1a1a)
- Light text (#ffffff)
- Bright accents (#00ffff, #ff006e)
- High contrast for accessibility

## Accessibility Considerations

### Color Contrast
- Text on backgrounds: Minimum 4.5:1 ratio
- Interactive elements: Clear focus states
- Buttons: Minimum 44px hit target

### Typography
- Font size: Minimum 14px for body text
- Line height: 1.4-1.6 for readability
- Letter spacing: Adequate for large headings

### Interactive Elements
- Focus states visible
- Hover states clear
- Touch targets spacious (44px minimum)

## Sample Component States

### Button States
```
Default:   Red background, white text, neon glow
Hover:     Darker red, increased glow
Active:    Scale down slightly
Disabled:  Gray, no glow, cursor not-allowed
Focus:     Cyan border ring
```

### Form Input States
```
Default:   Dark bg, cyan border, 1px
Focus:     Cyan border, glow effect
Error:     Red border, error message
Success:   Green border, success message
```

### Card States
```
Default:   Glassmorphic, cyan border
Hover:     Scale 1.02, increased glow
Active:    Accent color highlight
Loading:   Skeleton or spinner overlay
```

## Visual Hierarchy

1. **Primary Focus**: Hero section title (largest, brightest)
2. **Secondary Focus**: Section titles, main CTAs
3. **Tertiary Focus**: Card content, descriptions
4. **Background**: Context images, decorative elements

## Layout Flow

```
Top to Bottom (Z-axis):
1. Hero image/gradient (background)
2. Overlay (semi-transparent)
3. Content (cards, text)
4. Floating elements (scroll indicator)
```

```
Left to Right (Color gradient):
1. Blue (#0a1428) - Left side
2. Purple/Magenta - Center
3. Red (#e50914) - Right side
```

## Theme Integration Checklist

- ✅ Dark background (#0f0f0f)
- ✅ Blue-to-red gradient sections
- ✅ Neon cyan/pink accents
- ✅ Glassmorphic cards
- ✅ Glowing text effects
- ✅ Animated elements
- ✅ High contrast text
- ✅ Mobile-first responsive
- ✅ Accessibility standards
- ✅ Smooth transitions

## Reference Imagery

### Start Frame
- Stranger Things forest scene
- Blue-to-red gradient lighting
- Hanging lights effect
- Dark atmospheric mood

### Multi-Agent Mastery Backdrop
- Digital/tech aesthetic
- Blue-to-red gradient
- Silhouettes with neon outlines
- Futuristic feel

## Performance Optimization

- Use CSS custom properties (no runtime calculation)
- Hardware-accelerated animations (transform, opacity)
- Lazy load images
- Minimize repaints with will-change
- Use backdrop-filter carefully (performance impact)

## Browser Rendering

- CSS Grid for layouts
- Flexbox for components
- Transform for animations
- Opacity for transitions
- GPU acceleration for smooth 60fps

---

**Last Updated**: 2026-02-18
**Design System Version**: 1.0.0
**Theme**: Stranger Things Aesthetic
**Accessibility Level**: WCAG 2.1 AA Compliant
