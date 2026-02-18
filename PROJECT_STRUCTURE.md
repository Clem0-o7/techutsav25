# Techutsav '26 - PARADIGM - Project Structure

## Overview
A Stranger Things-themed landing page for Techutsav '26, the flagship tech festival of Thiagarajar College of Engineering.

## Color Scheme
- **Primary Blue**: `#0a1428` (Left side)
- **Primary Red**: `#e50914` (Right side)
- **Accent Cyan**: `#00ffff` (Neon highlights)
- **Accent Pink**: `#ff006e` (Secondary glow)
- **Dark Background**: `#0f0f0f`

## File Structure

```
/app
  layout.tsx              - Root layout with metadata and theme setup
  page.tsx                - Main landing page combining all sections
  globals.css             - Centralized styling with theme variables and animations

/components
  Navbar.tsx              - Navigation bar with section links and auth CTA
  Home.tsx                - Hero section with countdown timer
  About.tsx               - College and Techutsav information
  Workshops.tsx           - Multi-Agent Mastery + online workshops
  Events.tsx              - Paper Presentation, Ideathon, and event carousel
  Memories.tsx            - Past event gallery/memories section
  FAQ.tsx                 - Frequently asked questions accordion
  Contact.tsx             - Contact form with alternative contact methods
  Footer.tsx              - Footer with social links and information

/data
  sections.json           - Navigation links and about section data
  workshops.json          - Workshop details and information
  events.json             - Competition and event data
  faq.json                - FAQ content
  socialLinks.json        - Social media links with icons

/public
  /images                 - Placeholder for images (use external URLs via CDN)
  /placeholder.svg        - Default placeholder images
```

## Key Features

### Theme System
- **Centralized CSS Variables**: All colors and animations defined in `globals.css`
- **Neon Effects**: Glow animations for text and elements
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Smooth Scrolling**: HTML scroll-behavior configured
- **Mobile-First Design**: Responsive utilities for all screen sizes

### Components Design

#### Navbar
- Fixed positioning with glassmorphism effect
- Active section highlighting with smooth scroll
- Mobile hamburger menu
- Auth button (Sign In/Profile toggle)

#### Home Section
- Full-viewport hero with background image
- Countdown timer to event date
- Centered event title with neon glow
- Call-to-action button
- Animated scroll indicator

#### About Section
- Two-column layout (College | Techutsav)
- Responsive grid that stacks on mobile
- Highlight statistics
- Themed cards with glassmorphism

#### Workshops Section
- Featured main workshop with backdrop image
- Two equal-width workshop tiles
- Tags, dates, and registration buttons
- Hover effects with scale animations

#### Events Section
- Paper Presentation & Ideathon as featured tiles
- Horizontal carousel for additional events
- Scroll controls (arrows)
- "View All Events" call-to-action

#### Memories Section
- Photo gallery grid (3 columns on desktop, 1 on mobile)
- Hover zoom effect
- "Load More" pagination button

#### FAQ Section
- Accordion component
- Click to toggle answers
- Staggered fade-in animation
- "Still have questions?" support section

#### Contact Section
- Form with Name, Email, Message fields
- Form validation and submission
- Success/error status messages
- Alternative contact methods (email, phone)

#### Footer
- Social media links with icons
- Quick navigation links
- College information
- Copyright notice

## Styling Approach

### CSS Organization
- **Root Variables**: Theme colors and spacing defined in `:root`
- **Animations**: Keyframes for neon-glow, fade-in-up, float effects
- **Utility Classes**: `.neon-glow`, `.glassmorphism`, `.neon-border`, etc.
- **Tailwind Integration**: Uses Tailwind for responsive design and layout

### Responsive Design
- **Mobile First**: Base styles for mobile, enhanced for larger screens
- **Breakpoints**: Uses Tailwind breakpoints (sm, md, lg, xl)
- **Touch-Friendly**: Minimum 44px button sizes
- **Readable Text**: Appropriate font sizes for all devices

## Data Management

All content is imported from JSON files in `/data`, simulating API structure:
- Can easily switch to actual API calls
- Centralized data makes updates simple
- Reusable across components

## Dependencies Used
- **Next.js 16**: Framework
- **React 19**: UI library
- **Tailwind CSS 4**: Styling
- **Lucide React**: Icons
- **Framer Motion**: Animations (available)
- **React Scroll**: Smooth scrolling (available)

## Theme Customization

To modify the theme:
1. Edit `:root` variables in `src/styles/globals.css`
2. Update color classes in components as needed
3. Modify animations in `@keyframes` sections

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on mobile, tablet, and desktop
- CSS custom properties and Tailwind support required

## Performance Optimizations
- Image placeholders using placeholder.svg
- Lazy loading for carousel
- Optimized animations (hardware accelerated)
- Mobile-optimized navigation

## Future Enhancements
- Connect to real APIs for events and workshops
- User authentication and dashboard
- Event registration system
- Admin panel for content management
- Analytics integration
