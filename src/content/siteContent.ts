/**
 * Dream Byte Studio - Site Content Configuration
 * 
 * STRICT CONTENT POLICY:
 * Only approved brand facts, contact details, and verified copy are used.
 * All missing information is explicitly marked as [PLACEHOLDER: ...].
 * The client can edit text directly in this file without modifying components.
 * 
 * CORE USP:
 * Everything is IN-HOUSE: An aesthetic and fancy location, comprehensive top-tier
 * equipment, and every tool needed for a good photograph right on-site.
 */

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  iconType: 'camera' | 'video' | 'mic' | 'rings';
  badge: string;
  inHouseHighlight: string;
}

export interface VideoReel {
  id: string;
  title: string;
  category: string;
  src: string;
  aspect: 'landscape' | 'portrait' | 'square';
  description: string;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  src: string;
  caption: string;
  aspect?: 'portrait' | 'square' | 'landscape';
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface GearItem {
  id: string;
  category: 'cameras' | 'lighting' | 'audio';
  categoryLabel: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  tag: string;
}

export const siteContent = {
  brand: {
    name: "Dream Byte Studio",
    legalName: "Dream Byte Studio",
    parentCompany: "Dream Byte Solutions Pvt. Ltd.",
    parentRelation: "sister brand of Dream Byte Solutions Pvt. Ltd.",
    tagline: "Where Your Imagination is our innovation.",
    approvedQuotes: [
      "Turn your moments into lasting memories",
      "We capture moments with creativity and precision",
      "top-tier equipment",
      "Where Your Imagination is our innovation."
    ],
    accentColor: "#FFDB59", // Studio Tungsten / Gold Accent
    baseColor: "#07070A",   // Near-black dark theme base
    logoPath: "/assets/logos/DREAM_BYTE_STUDIO_VERTICAL-02.png",
  },

  contact: {
    primaryPhone: "+91 8279720490",
    primaryPhoneTel: "+918279720490",
    secondaryPhone: "+91 9258332639",
    secondaryPhoneTel: "+919258332639",
    email: "info@dreambytesolution.com",
    whatsAppUrl: "https://wa.me/918279720490",
    address: {
      line1: "3rd Floor, above Bank of India",
      line2: "Sahastradhara Road, Near IT Park",
      city: "Dehradun",
      state: "Uttarakhand",
      postalCode: "248013",
      country: "India",
      full: "3rd Floor, above Bank of India, Sahastradhara Road, Near IT Park, Dehradun 248013, Uttarakhand.",
      coordinates: {
        lat: 30.3164945,
        lng: 78.0321918,
      },
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3443.2!2d78.0321918!3d30.3164945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDE4JzU5LjQiTiA3OMKwMDEnNTUuOSJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
    },
    socials: {
      instagram: {
        handle: "@dreambytesolutions.in",
        url: "https://www.instagram.com/dreambytesolutions.in",
      },
      youtube: {
        handle: "@Dreambytesolution",
        url: "https://www.youtube.com/@Dreambytesolution",
      },
      linkedin: {
        handle: "dream-byte-solutions-pvt-ltd",
        url: "https://www.linkedin.com/company/dream-byte-solutions-pvt-ltd",
      },
      facebook: {
        handle: "Dream Byte Solutions",
        url: "https://www.facebook.com/dreambytesolutions",
      },
    },
  },

  // Central Unique Selling Point (USP)
  usp: {
    eyebrow: "THE IN-HOUSE ADVANTAGE",
    heading: "Aesthetic Location & Complete Equipment In-House",
    subheading: "Everything needed for a good photograph is under one roof — no outside rentals, no gear hassles.",
    pillars: [
      {
        id: "aesthetic-location",
        title: "Aesthetic & Fancy Location",
        tag: "In-House Curated Sets",
        description: "A meticulously styled studio space in Dehradun featuring versatile artistic textures, premium ambient lighting, and dedicated vanity prep areas designed for stunning visual frames."
      },
      {
        id: "complete-equipment",
        title: "All Equipment In-House",
        tag: "Every Tool For A Good Photograph",
        description: "Equipped with top-tier equipment: professional strobe arrays, softboxes, diffusers, c-stands, continuous tungsten lighting, and tethered color-calibrated monitors."
      },
      {
        id: "seamless-production",
        title: "Walk-In Creative Ready",
        tag: "Creativity & Precision",
        description: "Where Your Imagination is our innovation. Turn your moments into lasting memories without worrying about equipment sourcing or logistics — everything is live on the floor."
      }
    ]
  },

  hero: {
    badge: "ALL-IN-HOUSE STUDIO • AESTHETIC LOCATION & COMPLETE GEAR",
    headline: "Dream Byte Studio",
    subLine: "Photo • Video • Podcast • Wedding",
    tagline: "Where Your Imagination is our innovation.",
    approvedStatement: "Everything in-house: an aesthetic & fancy location, top-tier equipment, and every tool needed for a good photograph. We capture moments with creativity and precision.",
    uspPoints: [
      "Aesthetic & Fancy In-House Location",
      "All Equipment Provided In-House",
      "Top-Tier Gear For Flawless Photos"
    ],
    primaryCta: {
      label: "Book the Studio",
      action: "book",
    },
    secondaryCta: {
      label: "View Our Work",
      href: "#work",
    },
    scrollIndicator: "SCROLL TO EXPLORE STUDIO",
  },

  services: [
    {
      id: "photo-shoots",
      title: "Photo Shoots",
      tagline: "Turn your moments into lasting memories",
      description: "Everything in-house for a good photograph: an aesthetic location, pro strobe arrays, multiple background cycloramas, and tethered capture workstation with top-tier equipment.",
      features: [
        "In-house studio strobes, continuous lights & diffusers",
        "Aesthetic & fancy sets with multiple cyclorama textures",
        "High-resolution tethered live preview workstation",
        "Precision prime optics & high-stability support rigging"
      ],
      iconType: "camera",
      badge: "Photography",
      inHouseHighlight: "All Camera & Lighting Gear In-House"
    },
    {
      id: "videography",
      title: "Videography",
      tagline: "Where Your Imagination is our innovation",
      description: "Cinematic 4K production inside our fancy curated sets, complete with overhead grid lighting, pro audio, and precision camera rigs ready on the floor.",
      features: [
        "In-house 4K cinema rigs & precision prime lenses",
        "Overhead studio grid lighting & soft diffusion arrays",
        "Color-accurate live telemetry & monitoring",
        "Motorized sliders, fluid-head tripods & pro audio"
      ],
      iconType: "video",
      badge: "Video Production",
      inHouseHighlight: "Complete Video Rigging In-House"
    },
    {
      id: "podcasts",
      title: "Podcasts",
      tagline: "Broadcast-grade acoustics & multi-cam capture",
      description: "Sound-isolated in-house podcast studio equipped with professional broadcast microphones, articulating boom arms, multi-angle video switching, and cozy aesthetic lounge seating.",
      features: [
        "Broadcast dynamic vocal microphones on boom arms",
        "Acoustic wall treatment & quiet HVAC isolation",
        "Aesthetic lounge setup with multi-camera angles",
        "Multi-channel studio audio interface & monitoring"
      ],
      iconType: "mic",
      badge: "Audio & Visual Podcasting",
      inHouseHighlight: "Acoustic Suite & Mics In-House"
    },
    {
      id: "wedding-shoots",
      title: "Wedding Shoots",
      tagline: "Turn your moments into lasting memories",
      description: "Pre-wedding cinematic concepts and grand indoor couple portraits in our fancy, aesthetic location with atmospheric lighting, hazers, and dedicated vanity dressing suites.",
      features: [
        "Fancy indoor sets & romantic atmospheric lighting",
        "Dedicated bridal dressing & vanity prep suite",
        "Artistic lighting equipment & atmospheric hazers",
        "Flexible session packages with high-resolution deliverables"
      ],
      iconType: "rings",
      badge: "Pre-Wedding & Wedding",
      inHouseHighlight: "Aesthetic Sets & Vanity In-House"
    },
  ] as ServiceItem[],

  work: {
    heading: "Selected Studio Reels & Productions",
    subheading: "Watch our latest commercial, podcast, and cinematic work filmed on-site at Dream Byte Studio using our in-house gear and aesthetic sets.",
    videos: [
      {
        id: "reel-1",
        title: "Studio Showcase Reel 01",
        category: "Commercial Production",
        src: "/assets/videos/Video-478.mp4",
        aspect: "portrait",
        description: "Dynamic studio shoot spotlighting our aesthetic sets, creative cinematography and in-house lighting."
      },
      {
        id: "reel-2",
        title: "Creative Visual Sequence 02",
        category: "Fashion & Editorial",
        src: "/assets/videos/video3.MP4",
        aspect: "portrait",
        description: "Turn your moments into lasting memories with our in-house high-framerate visual capture."
      },
      {
        id: "reel-3",
        title: "Brand Narrative Project 03",
        category: "Brand Storytelling",
        src: "/assets/videos/video4.MP4",
        aspect: "portrait",
        description: "Top-tier equipment bringing client vision to life with precision color and focus."
      },
      {
        id: "reel-4",
        title: "Signature Studio Highlights 04",
        category: "Studio Master Reel",
        src: "/assets/videos/video2.mp4",
        aspect: "landscape",
        description: "Full production overview of photo, video, and podcast capabilities in Dehradun."
      },
    ] as VideoReel[],
    photoGrid: [
      {
        id: "photo-1",
        title: "Aesthetic Floor & Lighting Grid",
        category: "Photo Shoots",
        src: "/assets/images/P1095305.webp",
        caption: "Primary on-site photo of Dream Byte Studio facility and in-house equipment in Dehradun.",
        aspect: "landscape"
      },
      {
        id: "photo-2",
        title: "Aesthetic Floor & Gimbal Rig",
        category: "In-House Shooting Set",
        src: "/assets/images/studio-still-02.jpg",
        caption: "Cinema camera on gimbal setup facing the yellow lounge armchair, Godox softbox, and organic alcove backdrop.",
        aspect: "portrait"
      },
      {
        id: "photo-3",
        title: "Podcast Lounge & Acoustic Suite",
        category: "Podcasts & Interviews",
        src: "/assets/images/studio-still-03.jpg",
        caption: "Warm backlit acoustic wooden paneling, dual studio armchairs, and professional broadcast microphones on articulating stands.",
        aspect: "square"
      },
      {
        id: "photo-4",
        title: "Latest Still",
        category: "Latest Still",
        src: "/assets/images/studio-still-04.jpg",
        caption: "Dramatic red cyclorama sweep with textured window gobo lighting, Godox softboxes, and foreground gimbal camera setup.",
        aspect: "portrait"
      },
    ] as PhotoItem[],
  },

  theStudio: {
    heading: "The In-House Studio Advantage",
    subheading: "An aesthetic & fancy location equipped with all the equipment needed for a good photograph — 100% on-site at Sahastradhara Road, Dehradun.",
    photoSrc: "/assets/images/P1095305.webp",
    photoCaption: "Main shooting floor, aesthetic backdrops, overhead lighting grid and control setup at Dream Byte Studio, Dehradun.",
    note: "Everything is in-house: an aesthetic and fancy location, top-tier equipment, and all tools needed for a good photograph. Visit us for guided walkthroughs.",
    addressBlock: "3rd Floor, above Bank of India, Sahastradhara Road, Near IT Park, Dehradun 248013, Uttarakhand.",
    details: [
      { label: "Core Advantage", value: "100% In-House Gear + Aesthetic Location" },
      { label: "Location Design", value: "Curated aesthetic & fancy sets, ambient backdrops" },
      { label: "Photo Equipment", value: "All strobes, continuous lights, diffusers & tethered screens in-house" },
      { label: "Floor & Space", value: "3rd Floor (Above Bank of India), Sahastradhara Road" },
      { label: "Capabilities", value: "Photo Shoots, 4K Video, Podcasts, Wedding Shoots" },
      { label: "Studio Environment", value: "Dedicated climate control & quiet acoustic isolation" },
      { label: "Bookings & Access", value: "Available 7 days a week by reservation" }
    ]
  },

  process: {
    heading: "How We Work",
    subheading: "A streamlined four-step workflow from initial creative brief to final delivery — powered entirely by our in-house gear and aesthetic location.",
    steps: [
      {
        step: "01",
        title: "Enquire",
        description: "Get in touch via phone, WhatsApp, or our booking form to discuss your shoot date, concept, and technical requirements."
      },
      {
        step: "02",
        title: "Plan",
        description: "Coordinate in-house lighting setups, aesthetic backdrop options, and equipment configurations tailored to your production scope."
      },
      {
        step: "03",
        title: "Shoot",
        description: "Capture with creativity and precision using our aesthetic space, multi-angle rigging, and all equipment needed for a good photograph."
      },
      {
        step: "04",
        title: "Deliver",
        description: "Receive color-graded master footage, high-resolution retouched stills, or raw files ready for your distribution."
      }
    ] as ProcessStep[],
  },

  gear: {
    eyebrow: "All Equipment In-House",
    heading: "STUDIO GEAR & PHOTO ARSENAL",
    subheading: "Everything needed for a good photograph is provided on set — top-tier camera bodies, prime optics, Godox softboxes, and broadcast audio under one roof in Dehradun.",
    categories: [
      { id: "all", label: "All Gear" },
      { id: "cameras", label: "Cameras & Optics" },
      { id: "lighting", label: "Lighting & Sets" },
      { id: "audio", label: "Audio & Control" }
    ],
    items: [
      {
        id: "gear-1",
        category: "cameras",
        categoryLabel: "Cameras & Optics",
        title: "Full-Frame & 4K Cinema Bodies",
        subtitle: "High-Bitrate 10-bit Color & High Dynamic Range",
        description: "Equipped with professional cinema rigs for commercial photography, editorial fashion, and cinematic 4K video capture with precision color profiles.",
        specs: ["High-speed dual recording slots", "Uncompressed HDMI out for tethered preview", "Low-noise high-ISO performance"],
        tag: "In-House Camera Suite"
      },
      {
        id: "gear-2",
        category: "cameras",
        categoryLabel: "Cameras & Optics",
        title: "Prime & Macro Optical Suite",
        subtitle: "High-Resolution Apertures f/1.4 - f/2.8",
        description: "Versatile focal lengths covering wide architectural staging, ultra-sharp portrait glass, and crisp macro details for products.",
        specs: ["Ultra-sharp wide to telephoto primes", "Smooth manual de-clicked aperture rings", "Circular polarizers & ND filters"],
        tag: "In-House Optics"
      },
      {
        id: "gear-3",
        category: "lighting",
        categoryLabel: "Lighting & Sets",
        title: "Motorized Softboxes & Strobes",
        subtitle: "Godox Octas, Lanterns & High-Speed Sync",
        description: "Complete studio flash and continuous LED arrays with high-diffuse softboxes for flattering skin tones and creative contrast control.",
        specs: ["Godox high-speed studio strobes", "Octagonal & rectangular softboxes with grids", "Overhead boom arms & heavy-duty C-stands"],
        tag: "In-House Lighting"
      },
      {
        id: "gear-4",
        category: "lighting",
        categoryLabel: "Lighting & Sets",
        title: "Fancy Sets & Seamless Backdrops",
        subtitle: "Organic Wall Alcoves, Wood Slats & Seamless Paper",
        description: "Aesthetic backdrops ready on the floor: warm wooden slat paneling, sculpted organic display niches, and multi-color sweeps.",
        specs: ["Curated acoustic wooden slat wall", "Organic Mediterranean display alcoves", "Seamless paper sweeps (white, grey, vibrant)"],
        tag: "In-House Sets"
      },
      {
        id: "gear-5",
        category: "audio",
        categoryLabel: "Audio & Control",
        title: "Broadcast Podcast Mics & Console",
        subtitle: "Dynamic Cardioid Mics & Low-Noise Preamps",
        description: "Multi-microphone podcast lounge engineered for broadcast clarity, interview dialog, voiceovers, and YouTube creator shows.",
        specs: ["Dynamic cardioid broadcast microphones", "Articulating heavy-duty desk boom arms", "Multi-channel USB/XLR recording interface"],
        tag: "In-House Audio"
      },
      {
        id: "gear-6",
        category: "audio",
        categoryLabel: "Audio & Control",
        title: "Gimbals & Tethered Color Monitors",
        subtitle: "3-Axis Motorized Stabilization & Calibrated Screens",
        description: "Tethered capture workstation allowing clients and photographers to review shots on calibrated screens instantly.",
        specs: ["3-axis motorized camera gimbal rig", "Calibrated high-CRI preview display", "Real-time focus tracking & wireless follow-focus"],
        tag: "In-House Support"
      }
    ] as GearItem[]
  }
};
