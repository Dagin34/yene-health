# DESIGN.md

## Project Overview

YeneHealth is a digital healthcare platform designed specifically for women in Ethiopia. The visual identity focuses on warmth, trust, privacy, and accessibility. The interface combines soft feminine tones with dark green foundations to communicate professionalism without feeling overly clinical.

The overall experience should feel:

- Warm and welcoming
- Premium yet approachable
- Calm rather than crowded
- Trustworthy and safe
- Modern with subtle softness
- Focused on readability and accessibility

---

# Design Philosophy

The design balances three emotional pillars:

### Trust
Healthcare products require confidence. Deep green tones and generous whitespace create stability and reliability.

### Warmth
Soft blush backgrounds and rounded corners remove the cold feeling often associated with medical products.

### Simplicity
Every section serves one purpose. No unnecessary visual noise. Information should feel easy to digest.

---

# Color System

## Primary Dark Green

Used for navigation, buttons, footer, and strong call-to-actions.

```css
#143D3A
```

Purpose:

- Trust
- Professionalism
- Stability

---

## Accent Coral

Used sparingly for highlights and primary actions.

```css
#E76E58
```

Purpose:

- Energy
- Warmth
- Friendly interaction

---

## Soft Blush Background

Main page background.

```css
#F8F3F1
```

Purpose:

- Calm
- Feminine
- Comfortable reading experience

---

## Beige Section Background

Alternate section backgrounds.

```css
#EFE2D4
```

Purpose:

- Visual separation
- Warm contrast

---

## Card Background

```css
#FFFFFF
```

Used for:

- Feature cards
- FAQ cards
- Interactive containers

---

## Text Colors

### Primary

```css
#111111
```

### Secondary

```css
#6B6B6B
```

### Muted

```css
#9A9A9A
```

---

# Typography

### Headlines

Heavy weight with slightly rounded personality.

Suggested fonts:

- Satoshi
- General Sans
- Clash Grotesk
- Plus Jakarta Sans

Weight:

```css
700-800
```

Large headings should feel bold and friendly rather than corporate.

---

### Body Text

Weight:

```css
400-500
```

Color:

```css
#6B6B6B
```

Line-height:

```css
1.7
```

Body text should prioritize readability.

---

# Layout Principles

## Max Width

```css
1280px
```

Centered.

---

## Grid System

Desktop:

```css
12 columns
```

Tablet:

```css
8 columns
```

Mobile:

```css
4 columns
```

---

## Section Spacing

Desktop:

```css
120px
```

Tablet:

```css
96px
```

Mobile:

```css
72px
```

The page should breathe.

Never stack sections tightly.

---

# Border Radius System

### Buttons

```css
999px
```

Pill shape.

---

### Cards

```css
24px
```

---

### Large Containers

```css
32px
```

---

### Images

```css
28px
```

Soft and approachable.

---

# Shadows

Very subtle.

Avoid strong floating cards.

```css
box-shadow:
0 10px 30px rgba(0,0,0,0.04);
```

Cards should feel grounded.

---

# Navigation

Height:

```css
64px
```

Floating pill container.

Background:

```css
#143D3A
```

Features:

- Rounded capsule shape
- Small logo on left
- Center aligned links
- Coral CTA button
- Minimal and distraction-free

The navigation should feel elegant rather than tech-heavy.

---

# Hero Section

## Goal

Immediately communicate:

- Healthcare for women
- Trust
- Accessibility
- Modern experience

---

## Layout

Two-column grid.

### Left

Contains:

- Trust badge
- Large headline
- Description
- CTA buttons

### Right

Contains:

- Lifestyle image
- App mockup overlay

---

## Design Notes

Hero image should feel authentic and human.

Avoid stock-photo aesthetics.

App device mockup creates credibility without dominating the section.

---

# Stats Section

Purpose:

Create social proof.

Display:

- Downloads
- Ratings
- Partner logos

Large numbers should be visually prominent.

Minimal distractions.

---

# Ecosystem Section

Purpose:

Explain core platform capabilities.

Uses four feature cards:

- Period Tracking
- Telehealth
- E-Pharmacy
- Education

---

## Card Design

Background:

```css
#FFFFFF
```

Radius:

```css
24px
```

Spacing:

Large internal padding.

Top icon container:

Soft pastel background.

Cards should feel lightweight and approachable.

Hover:

```css
translateY(-6px)
```

Transition:

```css
300ms ease
```

---

# Community Section

Purpose:

Build emotional trust.

Layout:

Image left.

Content right.

Contains:

- Description
- Benefits list
- Safety messaging

Background:

Warm beige.

Photography should feel genuine and community-driven.

No overly staged imagery.

---

# Process Section

Purpose:

Reduce perceived complexity.

Three steps:

01 Download

02 Track & Consult

03 Receive Care

Numbers should act as visual anchors.

Lots of whitespace.

Very simple typography.

---

# FAQ Section

Purpose:

Remove friction before conversion.

Accordion cards:

Background:

```css
#FFF8F6
```

Radius:

```css
18px
```

Interaction:

Smooth height animation.

Icon rotates on open.

Only one item expanded at a time.

---

# Final CTA Section

Most visually striking section.

Background:

Dark green gradient.

Rounded container.

Split layout:

### Left

- Large heading
- Supporting text
- Download buttons

### Right

- Phone mockup

Decorative radial gradients create depth.

Should feel premium and memorable.

---

# Footer

Background:

```css
#143D3A
```

Contains:

- Logo
- Description
- Navigation links
- Support links
- Social icons

Very minimal.

Typography should have low contrast to avoid visual heaviness.

Large amount of breathing room.

---

# Motion Principles

Animations should feel calm and premium.

### Duration

```css
200ms - 500ms
```

---

### Easing

```css
cubic-bezier(0.22,1,0.36,1)
```

---

### Hover

Cards:

```css
translateY(-6px)
```

Buttons:

```css
scale(1.02)
```

Icons:

```css
rotate(5deg)
```

---

# Visual Rules

## Do

✓ Use generous whitespace

✓ Use authentic photography

✓ Keep corners soft

✓ Maintain warm colors

✓ Prioritize readability

✓ Create clear hierarchy

✓ Use subtle shadows

✓ Keep layouts balanced

✓ Make interactions smooth

---

## Don't

✗ Use harsh black colors

✗ Use overly saturated accents

✗ Add unnecessary gradients

✗ Create excessive shadows

✗ Overcrowd sections

✗ Use complex animations

✗ Introduce sharp corners

✗ Make the UI feel overly technical

---

# Emotional Goal

The user should feel:

> Safe.

> Understood.

> Empowered.

> Supported.

> Confident.

YeneHealth should feel less like a healthcare application and more like a trusted companion built by women, for women.