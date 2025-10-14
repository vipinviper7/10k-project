{
  "brand_attributes": ["trustworthy", "culinary-curated", "calm", "decisive", "premium-but-approachable"],
  "app_type": "Catering services discovery and booking (marketplace)",
  "audience": ["event planners", "corporate admins", "weddings/parties hosts", "busy professionals"],
  "success_actions": [
    "search completed with filters applied",
    "2–3 providers compared",
    "availability checked",
    "booking confirmed with payment or deposit",
    "message thread opened with provider"
  ],
  "visual_personality": {
    "style_fusion": "Swiss layout discipline + soft luxury editorial accents",
    "layout_inspiration": [
      "Behance event planning app case studies",
      "Dribbble catering marketplace UI cards",
      "Minimal editorial food magazine grids"
    ]
  },
  "semantic_color_system": {
    "note": "Define tokens in :root using HSL to integrate with Tailwind's var(--*) setup. Keep gradients only on section backgrounds per rule.",
    "tokens_hsl": {
      "--background": "45 33% 98%",          
      "--foreground": "220 25% 15%",          
      "--muted": "210 20% 96%",              
      "--muted-foreground": "220 9% 46%",
      "--card": "0 0% 100%",
      "--card-foreground": "220 25% 15%",
      "--border": "210 18% 88%",
      "--input": "210 18% 88%",
      "--ring": "164 28% 38%",
      "--primary": "164 28% 38%",            
      "--primary-foreground": "45 33% 98%",
      "--secondary": "30 40% 95%",            
      "--secondary-foreground": "220 25% 15%",
      "--accent": "24 92% 76%",               
      "--accent-foreground": "220 25% 15%",
      "--destructive": "4 74% 55%",
      "--destructive-foreground": "45 33% 98%",
      "--success": "156 32% 40%",
      "--warning": "35 92% 60%",
      "--info": "202 90% 43%",
      "--radius": "0.625rem"                   
    },
    "named_colors": {
      "sage": "hsl(164 28% 38%)",
      "sage-50": "hsl(156 32% 94%)",
      "champagne": "hsl(38 60% 95%)",
      "apricot": "hsl(24 92% 76%)",
      "charcoal": "hsl(220 25% 15%)",
      "steel": "hsl(220 9% 46%)",
      "ivory": "hsl(45 33% 98%)"
    },
    "gradient_usage": {
      "hero": "linear-gradient(135deg, hsl(156 32% 96%) 0%, hsl(38 60% 96%) 40%, hsl(45 33% 98%) 100%)",
      "accent_stripe": "linear-gradient(90deg, hsl(24 92% 88%), hsl(156 32% 92%))",
      "enforcement": "Limit gradient coverage to <=20% viewport. Never on text-heavy blocks or small UI."
    }
  },
  "typography": {
    "fonts": {
      "heading": "\"Playfair Display\", ui-serif, Georgia, serif",
      "ui": "Karla, ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial",
      "monospace": "Roboto Mono, ui-monospace, SFMono-Regular, Menlo"
    },
    "google_fonts": [
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Karla:wght@400;500;600;700&display=swap"
    ],
    "scale": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-semibold font-[\'Playfair Display\']",
      "h2": "text-base md:text-lg font-semibold tracking-[-0.01em] font-[Karla]",
      "body": "text-base sm:text-sm font-normal text-foreground/90 font-[Karla]",
      "small": "text-sm text-foreground/70"
    }
  },
  "spacing_radius_shadows": {
    "spacing": "Use 12px base unit; section padding: py-10 md:py-16; card gap: 6; grid gap: 6–8",
    "radius": {
      "sm": "rounded-md",
      "md": "rounded-lg",
      "lg": "rounded-xl",
      "btn": "rounded-md"
    },
    "shadows": {
      "card": "shadow-[0_2px_10px_rgba(0,0,0,0.05)]",
      "elevated": "shadow-[0_12px_30px_rgba(0,0,0,0.08)]",
      "focus": "ring-2 ring-[hsl(164_28%_38%)] ring-offset-2 ring-offset-background"
    },
    "texture": "Optional subtle noise overlay: after:absolute after:inset-0 after:bg-[url('https://grainy-gradients.vercel.app/noise.png')] after:opacity-20 pointer-events-none"
  },
  "grid_and_layout": {
    "container": "mx-auto max-w-[1200px] px-4 md:px-6",
    "search_layout": {
      "mobile": "sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70",
      "filters": "use <Sheet/> on mobile; left rail on lg: w-72 shrink-0",
      "results_grid": "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    },
    "profile_layout": "two-column on lg: [media/gallery left (2fr) | booking panel right (1fr) sticky top-24]",
    "compare_layout": "Sheet or Drawer over content on mobile; side-by-side grid on lg with 3 columns"
  },
  "navigation_and_sections": {
    "header": "top nav with logo left, search bar center (md+), actions right (Login, Cart/Bookings)",
    "home_sections": ["Hero with quick search", "Popular cuisines (chips)", "Featured providers carousel", "How it works", "Testimonials", "CTA strip"],
    "footer": "multi-column links; newsletter; contact"
  },
  "components": {
    "paths": {
      "button": "./components/ui/button",
      "input": "./components/ui/input",
      "select": "./components/ui/select",
      "checkbox": "./components/ui/checkbox",
      "radio_group": "./components/ui/radio-group",
      "slider": "./components/ui/slider",
      "tabs": "./components/ui/tabs",
      "accordion": "./components/ui/accordion",
      "card": "./components/ui/card",
      "calendar": "./components/ui/calendar",
      "dialog": "./components/ui/dialog",
      "sheet": "./components/ui/sheet",
      "popover": "./components/ui/popover",
      "hover_card": "./components/ui/hover-card",
      "tooltip": "./components/ui/tooltip",
      "badge": "./components/ui/badge",
      "skeleton": "./components/ui/skeleton",
      "carousel": "./components/ui/carousel",
      "toaster": "./components/ui/sonner"
    },
    "button_variants": {
      "primary": "bg-[hsl(164_28%_38%)] text-[hsl(45_33%_98%)] hover:bg-[hsl(164_28%_34%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(164_28%_38%)] focus-visible:ring-offset-2 rounded-md",
      "secondary": "bg-[hsl(30_40%_95%)] text-foreground hover:bg-[hsl(30_40%_92%)] rounded-md",
      "ghost": "bg-transparent text-foreground hover:bg-muted rounded-md"
    },
    "form_controls": {
      "inputs": "h-11 px-4 rounded-md border-border focus-visible:ring-2 focus-visible:ring-[hsl(164_28%_38%)] focus-visible:ring-offset-2",
      "chips": "Badge as filter chips: bg-sage-50 text-charcoal hover:bg-champagne data-[state=on]:bg-[hsl(164_28%_38%)] data-[state=on]:text-ivory"
    },
    "cards": {
      "provider_card": "Card with media aspect-[4/3], corner radius xl, hover:translate-y-[-2px] hover:shadow-lg transition-[box-shadow,transform] duration-200",
      "content": ["title (Karla 600)", "cuisine chips", "rating stars", "price per guest", "capacity", "CTA buttons"]
    },
    "availability": {
      "calendar": "Use ./components/ui/calendar (single date); combine with Select for time; Slider for guests"
    },
    "data_testid_rule": "All interactive and key informational elements MUST include data-testid in kebab-case describing the role, e.g., data-testid=\"search-submit-button\" or data-testid=\"provider-price-text\""
  },
  "micro_interactions_and_motion": {
    "library": "framer-motion",
    "principles": [
      "entrance: fade+rise 200–350ms",
      "hover: subtle scale 1.02 on cards, 1.03 on primary CTAs",
      "press: scale 0.98",
      "parallax: hero images move 10–20px on scroll",
      "skeletons for loading"
    ],
    "variants_example": {
      "card": "{ hidden: {opacity:0, y:8}, show: {opacity:1, y:0, transition:{duration:0.25}} }",
      "stagger": "container: { show: { transition: { staggerChildren: 0.06 } } }"
    }
  },
  "flows": {
    "onboarding_quicksearch": ["Location", "Event type", "Guests slider", "Date", "Quick CTA -> Results"],
    "discovery": ["Filter by cuisine (chips)", "Price per guest (slider)", "Capacity", "Dietary tags", "Top-rated toggle"],
    "comparison": ["Select up to 3 providers -> open Sheet with feature rows: price/guest, min guests, cuisines, add-ons, rating, availability"],
    "profile_and_booking": ["Gallery", "Menu & specialties (Accordion)", "Packages (RadioGroup)", "Availability (Calendar + time Select)", "Guests (Slider)", "Price summary", "Book (Dialog confirm + Sonner success)"],
    "messaging": ["Open Drawer from provider card -> conversational thread, attachments, quick templates"]
  },
  "images_urls": [
    {
      "url": "https://images.unsplash.com/photo-1716187677911-298b8e551456?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "hero_background",
      "description": "Elegant dining table scene for hero banner"
    },
    {
      "url": "https://images.unsplash.com/photo-1671612451404-f4f8fc5fe25e?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "featured_cuisine",
      "description": "Buffet line for cuisine highlights carousel"
    },
    {
      "url": "https://images.unsplash.com/photo-1642781197019-bb624cfe2e3b?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "services_bartender",
      "description": "Bartender/spirits visual for service type tiles"
    },
    {
      "url": "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?crop=entropy&cs=srgb&fm=jpg&q=85",
      "category": "testimonials",
      "description": "Glassware close-up for testimonials section backdrop"
    },
    {
      "url": "https://images.pexels.com/photos/18404369/pexels-photo-18404369.jpeg",
      "category": "profile_gallery",
      "description": "Event ambiance shot for provider profile gallery"
    },
    {
      "url": "https://images.pexels.com/photos/34221549/pexels-photo-34221549.jpeg",
      "category": "cta_strip",
      "description": "Champagne tower for CTA band"
    }
  ],
  "web_references": {
    "search_1": "https://dribbble.com/tags/catering-app",
    "search_2": "https://www.behance.net/search/projects/event%20planning%20app?locale=en_US"
  },
  "css_tokens_to_add_in_index_css": "Place under :root (light) and .dark where needed.\n:root{ --background:45 33% 98%; --foreground:220 25% 15%; --primary:164 28% 38%; --primary-foreground:45 33% 98%; --secondary:30 40% 95%; --secondary-foreground:220 25% 15%; --accent:24 92% 76%; --accent-foreground:220 25% 15%; --muted:210 20% 96%; --muted-foreground:220 9% 46%; --card:0 0% 100%; --card-foreground:220 25% 15%; --border:210 18% 88%; --input:210 18% 88%; --ring:164 28% 38%; --radius:0.625rem }\n.dark{ --background:220 25% 10%; --foreground:45 33% 98%; --card:220 25% 12%; --card-foreground:45 33% 98%; --secondary:220 18% 16%; --secondary-foreground:45 33% 98%; --muted:220 18% 16%; --muted-foreground:220 9% 70%; --accent:24 92% 70%; --accent-foreground:220 25% 15%; --border:220 18% 22%; --input:220 18% 22%; --ring:156 32% 46% }",
  "font_setup_steps": [
    "Add <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Karla:wght@400;500;600;700&display=swap\"/> to public/index.html",
    "In index.css body { font-family: Karla, ... } and use font-[\'Playfair Display\'] for h1"
  ],
  "page_templates": {
    "hero": {
      "classes": "relative overflow-hidden bg-[linear-gradient(135deg,hsl(156_32%_96%)_0%,hsl(38_60%_96%)_40%,hsl(45_33%_98%)_100%)]",
      "content": [
        "H1 with Playfair Display",
        "Quick Search: cuisine Select, guests Slider, date Calendar (Popover), CTA Button"
      ],
      "micro": "Parallax image using framer-motion useScroll"
    },
    "results": {
      "filters": "Left sidebar (lg+) with Accordion filter groups and Apply button",
      "cards": "Provider Card grid, each with Compare checkbox",
      "empty_state": "Friendly illustration + Reset filters button"
    },
    "profile": {
      "booking_panel": "Sticky on lg; includes date/time, guests, package, price summary, Book button",
      "info": "Tabs: Overview, Menu, Reviews, Policies"
    }
  },
  "accessibility": {
    "contrast": "All text/background >= 4.5:1; primary on ivory meets AA",
    "focus": "Visible 2px ring with ring-[hsl(164_28%_38%)] and offset",
    "motion_reduction": "Respect prefers-reduced-motion: disable parallax and heavy animations",
    "touch": "Targets >= 44x44px; vertical spacing 16–20px",
    "aria": "Label inputs, use aria-live for price updates"
  },
  "testid_convention": {
    "rule": "kebab-case, role-based names",
    "examples": [
      "data-testid=\"global-search-input\"",
      "data-testid=\"cuisine-filter-chip-italian\"",
      "data-testid=\"guests-slider\"",
      "data-testid=\"results-provider-card\"",
      "data-testid=\"compare-toggle\"",
      "data-testid=\"profile-book-button\"",
      "data-testid=\"booking-price-summary\"",
      "data-testid=\"toast-booking-success\""
    ]
  },
  "libraries": {
    "install": [
      "npm i framer-motion",
      "npm i recharts"
    ],
    "usage": {
      "framer_motion": "Animate card entrances, hero parallax; import { motion, useScroll, useTransform } from 'framer-motion'",
      "recharts": "For analytics (optional) e.g., price distribution in insights page"
    }
  },
  "sample_code_snippets": {
    "SearchBar.jsx": "import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/select';\nimport { Slider } from './components/ui/slider';\nimport { Button } from './components/ui/button';\nimport { Calendar } from './components/ui/calendar';\nimport { Popover, PopoverTrigger, PopoverContent } from './components/ui/popover';\nimport { useState } from 'react';\n\nexport default function SearchBar(){\n  const [date, setDate] = useState();\n  const [guests, setGuests] = useState([50]);\n  return (\n    <div className=\"w-full grid grid-cols-1 md:grid-cols-4 gap-3 items-end\">\n      <Select data-testid=\"cuisine-select\">\n        <SelectTrigger className=\"h-11\" data-testid=\"cuisine-select-trigger\"><SelectValue placeholder=\"Cuisine\" /></SelectTrigger>\n        <SelectContent><SelectItem value=\"italian\">Italian</SelectItem><SelectItem value=\"indian\">Indian</SelectItem><SelectItem value=\"japanese\">Japanese</SelectItem></SelectContent>\n      </Select>\n      <div className=\"px-2\">\n        <label className=\"block text-sm mb-1\">Guests</label>\n        <Slider data-testid=\"guests-slider\" value={guests} onValueChange={setGuests} max={500} step={10}/><div className=\"text-sm mt-1\">{guests[0]} guests</div>\n      </div>\n      <Popover>\n        <PopoverTrigger asChild><Button variant=\"secondary\" className=\"h-11\" data-testid=\"date-picker-trigger\">Select date</Button></PopoverTrigger>\n        <PopoverContent className=\"p-0\"><Calendar mode=\"single\" selected={date} onSelect={setDate} data-testid=\"date-calendar\"/></PopoverContent>\n      </Popover>\n      <Button className=\"h-11 bg-[hsl(164_28%_38%)] text-white\" data-testid=\"search-submit-button\">Search</Button>\n    </div>\n  );\n}",
    "ProviderCard.jsx": "import { Card, CardContent } from './components/ui/card';\nimport { Badge } from './components/ui/badge';\nimport { Button } from './components/ui/button';\nimport { motion } from 'framer-motion';\n\nexport function ProviderCard({ provider }){\n  return (\n    <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.25}}>\n      <Card className=\"overflow-hidden rounded-xl border\" data-testid=\"results-provider-card\">\n        <div className=\"aspect-[4/3] bg-muted\">\n          <img src={provider.image} alt=\"\" className=\"w-full h-full object-cover\"/>\n        </div>\n        <CardContent className=\"p-4 space-y-3\">\n          <div className=\"flex items-start justify-between\">\n            <div>\n              <h3 className=\"font-semibold text-lg\">{provider.name}</h3>\n              <div className=\"mt-1 flex gap-2 flex-wrap\">{provider.cuisines.map(c=> <Badge key={c}>{c}</Badge>)}</div>\n            </div>\n            <div className=\"text-right\">\n              <div className=\"text-sm text-foreground/70\">from</div>\n              <div className=\"font-semibold\" data-testid=\"provider-price-text\">${provider.pricePerGuest}/guest</div>\n            </div>\n          </div>\n          <div className=\"flex items-center justify-between\">\n            <div className=\"text-sm\">⭐ {provider.rating}</div>\n            <div className=\"flex gap-2\">\n              <Button variant=\"secondary\" data-testid=\"compare-toggle\">Compare</Button>\n              <Button data-testid=\"view-profile-button\">View</Button>\n            </div>\n          </div>\n        </CardContent>\n      </Card>\n    </motion.div>\n  )\n}",
    "BookingPanel.jsx": "import { Button } from './components/ui/button';\nimport { Calendar } from './components/ui/calendar';\nimport { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/select';\nimport { Slider } from './components/ui/slider';\nimport { useState } from 'react';\nimport { toast } from './components/ui/sonner';\n\nexport function BookingPanel(){\n  const [date,setDate] = useState();\n  const [guests,setGuests] = useState([80]);\n  const [time,setTime] = useState('18:00');\n  const onBook=()=>{ toast.success('Request sent to provider', { id:'booking', description:'You will receive a confirmation soon.'}); }\n  return (\n    <aside className=\"p-4 rounded-xl border sticky top-24 space-y-4\">\n      <Calendar mode=\"single\" selected={date} onSelect={setDate} data-testid=\"booking-date-calendar\"/>\n      <div>\n        <label className=\"block text-sm mb-1\">Time</label>\n        <Select value={time} onValueChange={setTime}>\n          <SelectTrigger data-testid=\"booking-time-select\"><SelectValue placeholder=\"Select a time\"/></SelectTrigger>\n          <SelectContent>\n            {['12:00','15:00','18:00','20:00'].map(t=> <SelectItem key={t} value={t}>{t}</SelectItem>)}\n          </SelectContent>\n        </Select>\n      </div>\n      <div>\n        <label className=\"block text-sm mb-1\">Guests</label>\n        <Slider value={guests} onValueChange={setGuests} max={500} step={10} data-testid=\"booking-guests-slider\"/>\n        <div className=\"text-sm mt-1\">{guests[0]} guests</div>\n      </div>\n      <Button className=\"w-full\" onClick={onBook} data-testid=\"profile-book-button\">Request Booking</Button>\n      <div className=\"text-sm text-foreground/70\" data-testid=\"booking-price-summary\">Price updates dynamically as selections change.</div>\n    </aside>\n  )\n}"
  },
  "component_path": [
    "./components/ui/button",
    "./components/ui/input",
    "./components/ui/select",
    "./components/ui/slider",
    "./components/ui/tabs",
    "./components/ui/accordion",
    "./components/ui/card",
    "./components/ui/calendar",
    "./components/ui/dialog",
    "./components/ui/sheet",
    "./components/ui/popover",
    "./components/ui/hover-card",
    "./components/ui/tooltip",
    "./components/ui/badge",
    "./components/ui/skeleton",
    "./components/ui/carousel",
    "./components/ui/sonner"
  ],
  "instructions_to_main_agent": [
    "Update /app/frontend/src/index.css :root tokens with the provided HSL values. Do not center the app container.",
    "Add Google Fonts link in public/index.html and set body to Karla; use Playfair Display on h1 via utility classes.",
    "Build Search page using SearchBar.jsx scaffold and ProviderCard grid. Use Sheet for mobile filters.",
    "Build Provider Profile with sticky BookingPanel.jsx on desktop.",
    "Implement Compare flow with ./components/ui/sheet; ensure rows include price/guest, min order, cuisines, rating, availability.",
    "Use ./components/ui/calendar for date selection. If time picker needed, use Select.",
    "Install framer-motion and recharts as listed. Use motion for entrances and parallax in hero.",
    "All interactive elements must include data-testid attributes following the provided convention.",
    "Use Sonner from ./components/ui/sonner.jsx for toasts. Include <Toaster/> at root.",
    "Apply gradient only to hero/section background per rules; content cards remain solid white." 
  ]
}


<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>