# Dream Byte Studio — Immersive 3D Production Website

A production-ready, dark-themed WebGL/React Three Fiber experience for **Dream Byte Studio** (a photo, video, podcast, and wedding production studio in Dehradun, Uttarakhand, India; sister brand of **Dream Byte Solutions Pvt. Ltd.**).

---

## 🎨 Creative & Technical Highlights

1. **Brand Palette & Visual Identity**:
   - **Base**: Near-black (`#07070A`) with deep studio vignettes and camera viewfinder overlays.
   - **Accent**: `#FFDB59` (Studio Tungsten / Amber Gold), sampled from the parent brand palette and tungsten lighting grids. One accent color used strictly for glows, volumetric light beams, and interactive CTAs.
   - **Typography**: Clean grotesque sans-serif with camera viewfinder telemetry (`1/250s`, `f/2.8`, `ISO 400`, `REC [●]`).

2. **Hero Section 3D Scene**:
   - **Stylised Cinema Camera Rig**: Low-poly magnesium chassis, matte box with barn doors, aperture ring with `#FFDB59` markings, multi-element front glass with realistic transmission, and red tally recording LED.
   - **Studio Softbox Light**: Diffuser on a telescoping C-stand emitting a warm volumetric light cone.
   - **Podcast Microphone**: Broadcast capsule in a suspension cradle on a dual-scissor boom arm.
   - **Floating Photo Frame**: Minimalist transparency slide floating in the studio atmosphere.
   - **Volumetric Beam & Dust Motes**: Central studio spotlight with 180 floating, drifting dust particles.
   - **Continuous Scroll Dolly**: As the user scrolls, the GSAP timeline smoothly dollies the camera directly into the front optical element of the cinema lens, transitioning seamlessly into the Services section with zero hard cuts.
   - **Parallax**: Smooth mouse cursor parallax on desktop and gyroscope / touch fallback on mobile.

3. **Remaining Interactive Sections**:
   - **Preloader**: SVG shutter aperture iris blades rotating with a 0-100 exposure meter counter (`EV -2.0 -> EV 0.0`) and logo light sweep.
   - **Services**: 4 3D tilt cards (Photo Shoots, Videography, Podcasts, Wedding Shoots) with animated icons and glare reflection.
   - **Work & Reels**: 3D perspective gallery of the 4 verified production videos (`Video-478.mp4`, `video3.MP4`, `video4.MP4`, `video2.mp4`) with hover preview and fullscreen lightbox modal.
   - **The Studio**: 3D depth-displaced interactive plane mapping `P1095305.webp` responding to mouse tilt, complete facility address, and visit note.
   - **Process**: Enquire > Plan > Shoot > Deliver step pipeline.
   - **Booking CTA**: Interactive reservation form with dual routing to Next.js API `/api/booking` and instant WhatsApp prefilled redirection.
   - **Contact & Map**: Embedded Google Maps location (`30.3164945, 78.0321918`), direct click-to-call, email, and social links.
   - **Custom Cursor**: Morphs into a camera focus reticle with crosshairs when hovering interactive elements.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **3D / WebGL**: Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- **Animation & Motion**: GSAP + ScrollTrigger, Lenis (smooth inertia scroll), Framer Motion
- **Icons**: Lucide React

---

## 📁 Project Structure

```
dreambyte-studio/
├── public/
│   └── assets/
│       ├── images/
│       │   └── P1095305.webp          # Verified on-site studio photo
│       ├── videos/
│       │   ├── Video-478.mp4          # Reel 01
│       │   ├── video3.MP4             # Reel 02
│       │   ├── video4.MP4             # Reel 03
│       │   └── video2.mp4             # Reel 04
│       └── logos/
│           └── DREAM_BYTE_STUDIO_VERTICAL-02.png  # White transparent studio logo
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── booking/
│   │   │       └── route.ts           # Booking API & WhatsApp link generator
│   │   ├── globals.css                # Film grain, camera reticles, Tailwind base
│   │   ├── layout.tsx                 # Metadata, JSON-LD Schema, SmoothScroll
│   │   ├── page.tsx                   # Main studio landing experience
│   │   ├── robots.ts                  # SEO robots
│   │   └── sitemap.ts                 # XML sitemap
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── HeroCanvas.tsx         # Responsive WebGL canvas + PerformanceMonitor
│   │   │   ├── StudioScene.tsx        # 3D cinema camera, softbox, mic, beam
│   │   │   └── DisplacementPlane.tsx  # 3D interactive studio photo plane
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # Hero headline, CTAs, telemetry & dolly scrub
│   │   │   ├── ServicesSection.tsx    # 4 3D tilt cards
│   │   │   ├── WorkSection.tsx        # Video reels & photo gallery
│   │   │   ├── StudioSection.tsx      # Facility details & displacement plane
│   │   │   ├── ProcessSection.tsx     # 4-step production timeline
│   │   │   ├── BookingSection.tsx     # Booking form with shutter success state
│   │   │   ├── ContactSection.tsx     # Google map & verified contact channels
│   │   │   └── Footer.tsx             # Semantic footer & sister brand attribution
│   │   ├── ui/
│   │   │   ├── CustomCursor.tsx       # Viewfinder focus reticle cursor
│   │   │   ├── FloatingActions.tsx    # Persistent floating WhatsApp + Call
│   │   │   ├── Navbar.tsx             # Blur-on-scroll header
│   │   │   └── Preloader.tsx          # Exposure meter & aperture blades preloader
│   │   └── SmoothScroll.tsx           # Lenis + GSAP ScrollTrigger bridge
│   └── content/
│       └── siteContent.ts             # Central copy & fact registry (no component edits needed)
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 🛠️ Local Development & Setup

### 1. Prerequisites
- Node.js 18.17+ or 20.x
- npm / pnpm / yarn

### 2. Installation
```bash
# Clone or navigate to the project directory
cd dreambyte-studio

# Install dependencies
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Production Build
```bash
npm run build
npm run start
```

---

## ☁️ Google Cloud Platform (GCP) Deployment (Cloud Run)

This application has been reviewed and optimized for **Google Cloud Run** in `asia-south2` (Delhi, closest region to Dehradun, Uttarakhand).

### Optimizations Configured:
- **Standalone Build**: `output: 'standalone'` in `next.config.js` packs only necessary dependencies, reducing image size to ~80MB and minimizing Cloud Run cold start latency.
- **Cache-Control & Security Headers**: Long-term immutable caching (`max-age=31536000`) for 3D textures, videos, and fonts, plus strict HTTP security headers (`nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`).
- **Multi-Stage Dockerfile**: Secure non-root container image exposing port `8080`.
- **Automated Cloud Build Pipeline**: `cloudbuild.yaml` automated container compilation and deployment to Google Artifact Registry and Cloud Run.

### Quick Deploy (Automated Script):
1. **Authenticate Google Cloud**:
   ```bash
   gcloud auth login
   ```
2. **Run One-Click Deploy**:
   - **Windows (PowerShell)**:
     ```powershell
     .\scripts\deploy-gcp.ps1 -ProjectId "dreambyte-studio-prod"
     ```
   - **Linux / macOS (Bash)**:
     ```bash
     bash ./scripts/deploy-gcp.sh "dreambyte-studio-prod"
     ```

### Manual Deployment via `gcloud`:
```bash
# 1. Set active project
gcloud config set project [YOUR_PROJECT_ID]

# 2. Enable Cloud Run & Cloud Build APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 3. Create Artifact Registry Docker repo in Delhi (asia-south2)
gcloud artifacts repositories create dreambyte-repo \
    --repository-format=docker \
    --location=asia-south2

# 4. Submit build and deploy to Cloud Run
gcloud builds submit --config cloudbuild.yaml
```

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub or GitLab.
2. In the Vercel dashboard, click **Add New Project** and select the repository.
3. Framework Preset: **Next.js**.
4. Root Directory: `./` (or directory path).
5. Build Command: `npm run build`
6. Output Directory: `.next`
7. Click **Deploy**.

---

## 📌 Domain & Canonical URL Notice: `dreambytestudio.in`

- The production site is configured for **`https://dreambytestudio.in`** with canonical tags, `sitemap.xml`, `robots.txt`, and Open Graph metadata pointing to this domain.
- **DNS / Domain Setup**:
  - Point the `A` record of `dreambytestudio.in` to Vercel's IP: `76.76.21.21`
  - Point the `CNAME` record of `www.dreambytestudio.in` to `cname.vercel-dns.com`
  - In your DNS provider (e.g. GoDaddy / Cloudflare), ensure a 301 Permanent Redirect is set from `http://` to `https://` and `www` to root.

---

## 📋 Comprehensive List of Required Client Placeholders

The codebase strictly adheres to verified facts only. All missing data has been marked with `[PLACEHOLDER: ...]` so that no false claims are made. Before public launch, the client should supply the following:

| Section | Required Placeholder Items |
| :--- | :--- |
| **Equipment List** | Specific camera bodies (e.g., Sony FX6/FX3, RED, Canon Cinema), prime lens sets, audio interfaces/mixers (RodeCaster, Shure SM7B/MV7), strobe & continuous lighting brands (Aputure, Godox, Profoto). |
| **Pricing / Rate Cards** | Hourly studio rental rates, half-day / full-day booking costs, pre-wedding / wedding package deliverables & prices, podcast recording tier pricing. |
| **Client Portfolio & Logos** | High-resolution logos of corporate brands, artists, fashion labels, and influencers filmed at Dream Byte Studio. |
| **Client Testimonials** | Authentic client quotes with names, project titles, and ratings. |
| **Studio Photography** | Additional high-resolution stills of the green room, podcast room, client lounge, and vanity dressing room to replace placeholder cards in the photo grid. |
| **Custom 3D Models** | Compressed `.glb` (Draco/meshopt) models of the exact camera bodies and microphones used in the studio, if desired to replace the procedural PBR models. |
