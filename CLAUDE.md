# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**SenSync** is an FPS sensitivity converter web application that synchronizes mouse sensitivity across different FPS games with FOV adjustment support. Built with React, Vite, and TailwindCSS.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Single-File React Application

The entire application logic resides in `src/App.jsx` (~814 lines). This is intentional for simplicity and ease of deployment.

### Key Components Structure

1. **FPSSensitivityCalculator** (main component, line 488)
   - Manages all state for DPI, sensitivity, games, FOV values
   - Handles calculations and validations
   - Coordinates child components

2. **GameSelector** (line 412)
   - Reusable component for source/target game selection
   - Handles both input mode and result display mode
   - Includes custom game deletion UI

3. **AddCustomGameModal** (line 286)
   - Modal for adding custom games with Yaw values
   - Integrates Google search for finding game Yaw values
   - Validates game name and Yaw value inputs

4. **LanguageToggle** (line 270)
   - Switches between Japanese and English

### Core Calculation Logic

- **Sensitivity conversion** (line 525-548): Uses Yaw values to convert between games
  - Formula: `(sourceSens × sourceYaw) / targetYaw`

- **FOV adjustment** (line 241-252): Uses Monitor Distance method
  - Formula: `sourceSens × (tan(targetFOV/2) / tan(sourceFOV/2))`
  - Only calculated when both source and target FOV are provided

- **eDPI calculation**: `DPI × sensitivity`

- **360° distance (cm/360)**: `(360 / (sens × DPI × yaw)) × 2.54`

### State Management

All state is local (useState) within the main component:
- `games`: Object containing both default and custom games with their Yaw values
- `dpi, sourceSens, sourceFov, targetFov`: User inputs
- `edpi, cm360, convertedSens, fovAdjustedSens`: Calculated results
- `errors`: Validation error messages for each input field

### Theme System

Centralized theme configuration (line 147-172) allows easy color scheme changes. All color values are defined in the `theme` object.

### Security & Validation

Security limits are defined at the top (line 177-187):
- DPI: 100-32000
- Yaw: 0.0001-10
- Sensitivity: 0.001-100
- FOV: 60-120
- Game name: max 50 characters

Input validation uses factory pattern (`createValidator`, line 192) for DRY validation logic.

### Internationalization

The `translations` object (line 19-142) contains all text in Japanese and English. When adding new UI text, update both language objects.

### Default Games

Eight default games are defined with their Yaw values (line 225-234):
- VALORANT: 0.07
- Apex Legends: 0.022
- CS2/CS:GO: 0.022
- Overwatch 2: 0.0066
- Fortnite: 0.5555
- Call of Duty: 0.0066
- PUBG: 0.0066
- Rainbow Six Siege: 0.00572958

Custom games are stored with `custom: true` flag and can be deleted.

## Adding New Features

- **New games**: Add to `defaultGames` object with name and Yaw value
- **New calculations**: Add logic to `calculateAll()` function
- **New UI sections**: Follow existing card pattern with theme classes
- **New languages**: Add to `translations` object and update language toggle

## Styling

- Uses TailwindCSS utility classes
- Google Fonts: Orbitron (title) and Inter (body)
- Theme uses slate color palette with blue accents
- All colors are defined in the centralized `theme` object
