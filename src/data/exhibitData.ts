export interface ExhibitPreset {
  id: string;
  name: string;
  diameterMm: number;
  fStop: string;
  description: string;
  tagline: string;
}

export const APERTURE_PRESETS: ExhibitPreset[] = [
  {
    id: 'pinhole',
    name: 'Fine Pinhole',
    diameterMm: 1.5,
    fStop: 'f/180',
    tagline: 'Extreme Sharpness · Low Illumination',
    description: 'Rays pass strictly along narrow paths. Rays from adjacent points never overlap, yielding razor-sharp outlines, but only a scarce stream of photons enters the chamber, producing a dim, shadowy projection.',
  },
  {
    id: 'optimal',
    name: 'Balanced Aperture',
    diameterMm: 5.0,
    fStop: 'f/56',
    tagline: 'Optimal Balance · Curatorial Clarity',
    description: 'The golden ratio of traditional camera obscura installations. Admits ample ambient light to illuminate the chamber floor while maintaining circles of confusion below the human eye’s perceptible blur threshold.',
  },
  {
    id: 'wide',
    name: 'Wide Opening',
    diameterMm: 14.0,
    fStop: 'f/20',
    tagline: 'Maximum Brightness · Diffuse Overlap',
    description: 'A flood of photons bathes the back wall in brilliant light. However, wide cones of rays from different parts of the external scene overlap across the screen, turning fine architectural detail into soft, ethereal blur.',
  },
];

export interface StepCardData {
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  scientificDetail: string;
}

export const STEP_CARDS: StepCardData[] = [
  {
    number: '01',
    title: 'Rectilinear Light Emission',
    subtitle: 'The Sunlit External World',
    summary: 'Every sunlit surface scatters photons outward in all directions along strictly straight rectilinear lines.',
    scientificDetail: 'Because light does not curve around obstacles under classical macroscopic conditions, every feature of the external landscape (a spire, rooftop, or tree branch) continuously sends out millions of independent straight rays into the atmosphere.',
  },
  {
    number: '02',
    title: 'The Pinhole Crossover',
    subtitle: 'Geometric Inversion at the Threshold',
    summary: 'The pinhole acts as an optical selector, allowing only rays traveling in specific straight paths to enter the chamber.',
    scientificDetail: 'Rays emitted from the copper spire and Great Clock of Berkeley’s Sather Tower must angle downward to reach the tiny opening, continuing downward to strike the bottom of the interior wall. Rays from the granite esplanade base must travel upward through the hole, flipping the entire real image upside down and left-to-right.',
  },
  {
    number: '03',
    title: 'The Aperture Trade-Off',
    subtitle: 'Sharpness vs. Luminous Flux',
    summary: 'The diameter of the opening governs a delicate compromise between visual clarity and luminous energy.',
    scientificDetail: 'A tiny pinhole admits only one thin pencil of rays per object point, rendering sharp edges but starving the room of photons (dim image). A wider opening admits far more light, but each point forms an expanded "circle of confusion," overlapping adjacent points and softening the image.',
  },
];
