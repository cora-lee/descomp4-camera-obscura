import React from 'react';

interface SatherTowerSceneProps {
  /** If true, renders an atmosphere backdrop slice for the inverted darkroom projection */
  includeBackdrop?: boolean;
}

export const SatherTowerScene: React.FC<SatherTowerSceneProps> = ({ includeBackdrop = false }) => {
  return (
    <g id="berkeley-poster-tower" className="select-none">
      {/* ======================================================== */}
      {/* 0. INVERTED PROJECTION BACKDROP SLICE (Only in darkroom)  */}
      {/* ======================================================== */}
      {includeBackdrop && (
        <g id="backdrop-inverted">
          <rect x="0" y="0" width="340" height="420" fill="url(#skyGrad)" opacity="0.45" />
          <text
            x="195"
            y="52"
            fill="#FFFFFF"
            fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
            fontWeight="800"
            fontSize="26"
            letterSpacing="2.5"
            opacity="0.9"
          >
            BERKELEY
          </text>
        </g>
      )}

      {/* ======================================================== */}
      {/* 1. BACKGROUND: SAN FRANCISCO BAY & GOLDEN GATE BRIDGE     */}
      {/* ======================================================== */}
      {/* Deep Cerulean Blue Water of San Francisco Bay (y: 260 -> 330) */}
      <rect x="0" y="260" width="340" height="70" fill="#0095D9" />
      {/* Subtle bay water reflection shimmer */}
      <rect x="0" y="285" width="340" height="45" fill="#0082BD" opacity="0.6" />

      {/* Distant Golden Gate Bridge in International Orange */}
      <g id="golden-gate-bridge" opacity="0.88">
        {/* Bridge deck roadway */}
        <line x1="0" y1="264" x2="250" y2="264" stroke="#BD4E34" strokeWidth="2.2" />

        {/* Far Left Tower (approx x=35) */}
        <line x1="35" y1="228" x2="35" y2="278" stroke="#BD4E34" strokeWidth="3" />
        <line x1="33" y1="240" x2="37" y2="240" stroke="#BD4E34" strokeWidth="1" />
        <line x1="33" y1="252" x2="37" y2="252" stroke="#BD4E34" strokeWidth="1" />

        {/* Far Left Main Suspension Cables */}
        <path d="M 0 240 Q 18 262, 35 228" stroke="#BD4E34" strokeWidth="1.2" fill="none" />
        <path d="M 35 228 Q 72 264, 110 264" stroke="#BD4E34" strokeWidth="1.2" fill="none" />
        {/* Left vertical suspender cables */}
        <line x1="15" y1="254" x2="15" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="25" y1="247" x2="25" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="50" y1="245" x2="50" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="68" y1="256" x2="68" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="88" y1="261" x2="88" y2="264" stroke="#BD4E34" strokeWidth="0.6" />

        {/* Mid-Right Tower (behind tower, approx x=220) */}
        <line x1="220" y1="228" x2="220" y2="278" stroke="#BD4E34" strokeWidth="3" />
        <line x1="218" y1="240" x2="222" y2="240" stroke="#BD4E34" strokeWidth="1" />
        <line x1="218" y1="252" x2="222" y2="252" stroke="#BD4E34" strokeWidth="1" />

        {/* Main Suspension Cables to Mid Tower */}
        <path d="M 140 264 Q 180 264, 220 228" stroke="#BD4E34" strokeWidth="1.2" fill="none" />
        <path d="M 220 228 Q 240 252, 260 264" stroke="#BD4E34" strokeWidth="1.2" fill="none" />
        {/* Right suspender cables */}
        <line x1="180" y1="261" x2="180" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="195" y1="254" x2="195" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="208" y1="242" x2="208" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
        <line x1="235" y1="246" x2="235" y2="264" stroke="#BD4E34" strokeWidth="0.6" />
      </g>

      {/* Rolling Green Marin Hill on Right (behind bay) */}
      <path
        d="M 230 270 Q 260 205, 340 195 L 340 280 L 230 280 Z"
        fill="#1C7D47"
      />
      <path
        d="M 245 270 Q 280 215, 340 208 L 340 280 L 245 280 Z"
        fill="#268F53"
        opacity="0.85"
      />

      {/* Tiny White Sailboat with Red Hull on the Bay */}
      <g id="bay-sailboat" transform="translate(300, 255)">
        {/* Red Hull */}
        <path d="M -12 12 L 12 12 Q 10 16, 7 16 L -9 16 Q -12 16, -12 12 Z" fill="#E64A2F" />
        {/* Main White Triangular Sail */}
        <polygon points="0,0 7,10 0,10" fill="#FFFFFF" />
        {/* Jib Sail */}
        <polygon points="-1,2 -8,10 -1,10" fill="#F0F4F8" />
        {/* Mast */}
        <line x1="0" y1="0" x2="0" y2="12" stroke="#4A3B2C" strokeWidth="0.8" />
      </g>

      {/* Foreground Campus Shoreline Band */}
      <path d="M 0 325 Q 160 320, 340 325 L 340 350 L 0 350 Z" fill="#0C4F44" />

      {/* ======================================================== */}
      {/* 2. THE TOWER (Crisp White Beaux-Arts Campanile from Poster)*/}
      {/* Centerline: x = 170. Spire tip: y = 82 -> 95             */}
      {/* Clock: y = 210. Base: y = 325 -> 350                     */}
      {/* ======================================================== */}

      {/* Tower Main Shaft Outline & Base (White Granite Masonry) */}
      {/* Base shaft block */}
      <rect x="146" y="228" width="48" height="122" fill="#FAF8F2" stroke="#D3CDC0" strokeWidth="1" />
      {/* Upper shaft around clock */}
      <rect x="146" y="156" width="48" height="72" fill="#FAF8F2" stroke="#D3CDC0" strokeWidth="1" />

      {/* Clean outer white border columns/pilasters */}
      <rect x="146" y="156" width="4.5" height="194" fill="#FFFFFF" stroke="#E2DCD0" strokeWidth="0.5" />
      <rect x="189.5" y="156" width="4.5" height="194" fill="#FFFFFF" stroke="#E2DCD0" strokeWidth="0.5" />

      {/* Staggered Beige/Cream Masonry Block Texture on Tower Shaft */}
      <g id="shaft-masonry-blocks" opacity="0.65">
        {/* Course 1 */}
        <rect x="153" y="235" width="14" height="7" fill="#EFECE2" />
        <rect x="173" y="235" width="14" height="7" fill="#E8E4D8" />
        {/* Course 2 */}
        <rect x="160" y="250" width="16" height="7" fill="#ECE8DB" />
        {/* Course 3 */}
        <rect x="152" y="265" width="15" height="7" fill="#E8E4D8" />
        <rect x="172" y="265" width="15" height="7" fill="#EFECE2" />
        {/* Course 4 */}
        <rect x="160" y="280" width="16" height="7" fill="#ECE8DB" />
        {/* Course 5 */}
        <rect x="152" y="295" width="15" height="7" fill="#E8E4D8" />
        <rect x="172" y="295" width="15" height="7" fill="#EFECE2" />
        {/* Course 6 */}
        <rect x="160" y="310" width="16" height="7" fill="#ECE8DB" />
        {/* Course 7 */}
        <rect x="152" y="325" width="15" height="7" fill="#E8E4D8" />
        <rect x="172" y="325" width="15" height="7" fill="#EFECE2" />
        {/* Course 8 */}
        <rect x="160" y="338" width="16" height="7" fill="#ECE8DB" />
      </g>

      {/* 5 Vertical Rectangular Slit Windows Centered Along Shaft */}
      <g id="shaft-slit-windows">
        {/* Window 1 (uppermost, beneath clock) */}
        <rect x="168" y="238" width="4" height="12" fill="#2D3A42" rx="0.5" />
        {/* Window 2 */}
        <rect x="168" y="263" width="4" height="12" fill="#2D3A42" rx="0.5" />
        {/* Window 3 */}
        <rect x="168" y="288" width="4" height="12" fill="#2D3A42" rx="0.5" />
        {/* Window 4 */}
        <rect x="168" y="313" width="4" height="12" fill="#2D3A42" rx="0.5" />
        {/* Window 5 (lowest) */}
        <rect x="168" y="338" width="4" height="12" fill="#2D3A42" rx="0.5" />
      </g>

      {/* ======================================================== */}
      {/* 3. THE CLOCK (Centered at x: 170, y: 210 with 12:00 Hands)*/}
      {/* ======================================================== */}
      {/* White Clock Enclosure Panel */}
      <rect x="150.5" y="162" width="39" height="70" fill="#FFFFFF" stroke="#EAE5DB" strokeWidth="0.8" />

      {/* Clock Outer Ring (Dark Charcoal/Steel) */}
      <circle cx="170" cy="210" r="16" fill="#FFFFFF" stroke="#3D4B54" strokeWidth="1.2" />
      <circle cx="170" cy="210" r="14.5" fill="#FFFFFF" />

      {/* Clock Hand set to 12:00 (Straight UP as in the user's poster!) */}
      <line x1="170" y1="210" x2="170" y2="197.5" stroke="#1C262C" strokeWidth="1.6" strokeLinecap="round" />
      {/* Tiny center dial pin */}
      <circle cx="170" cy="210" r="1.3" fill="#1C262C" />

      {/* ======================================================== */}
      {/* 4. BELFRY & LOGGIA (3 Vibrant Teal Arches with Bells)     */}
      {/* ======================================================== */}
      {/* Scalloped / Arched Corbel Table frieze beneath belfry floor */}
      <path
        d="M 144 156 Q 148 152, 152 156 Q 156 152, 160 156 Q 164 152, 168 156 Q 172 152, 176 156 Q 180 152, 184 156 Q 188 152, 192 156 Q 196 152, 196 156"
        stroke="#D5CEBE"
        strokeWidth="1.2"
        fill="none"
      />
      {/* White belfry floor cornice */}
      <rect x="143" y="154" width="54" height="2.5" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.6" />

      {/* Belfry Wall Housing (White) */}
      <rect x="145" y="122" width="50" height="32" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.8" />

      {/* 3 TALL VERTICAL ARCHES WITH VIBRANT TEAL / TURQUOISE INTERIOR */}
      {/* Arch 1 (Left) */}
      <path d="M 149 148 L 149 130 Q 153 125, 157 130 L 157 148 Z" fill="#3AA394" />
      {/* Arch 2 (Center) */}
      <path d="M 162 148 L 162 130 Q 170 123, 178 130 L 178 148 Z" fill="#3AA394" />
      {/* Arch 3 (Right) */}
      <path d="M 183 148 L 183 130 Q 187 125, 191 130 L 191 148 Z" fill="#3AA394" />

      {/* White Louver Slat Lines inside the Teal Arches */}
      <line x1="149" y1="135" x2="157" y2="135" stroke="#68C7BA" strokeWidth="0.8" />
      <line x1="149" y1="141" x2="157" y2="141" stroke="#68C7BA" strokeWidth="0.8" />
      <line x1="162" y1="135" x2="178" y2="135" stroke="#68C7BA" strokeWidth="0.8" />
      <line x1="162" y1="141" x2="178" y2="141" stroke="#68C7BA" strokeWidth="0.8" />
      <line x1="183" y1="135" x2="191" y2="135" stroke="#68C7BA" strokeWidth="0.8" />
      <line x1="183" y1="141" x2="191" y2="141" stroke="#68C7BA" strokeWidth="0.8" />

      {/* Carillon Bells Hanging in the Arches (Silver/Bronze in poster) */}
      {/* Center Bell (Great Carillon Bourdon Bell) */}
      <path d="M 166 132 Q 170 130, 174 132 L 174.5 138 Q 170 140, 165.5 138 Z" fill="#E8ECEE" stroke="#8CA1AA" strokeWidth="0.6" />
      <line x1="170" y1="125" x2="170" y2="132" stroke="#2D3A42" strokeWidth="0.7" />
      {/* Left Bell */}
      <path d="M 151 133 Q 153 132, 155 133 L 155.5 137 Q 153 138.5, 150.5 137 Z" fill="#E8ECEE" stroke="#8CA1AA" strokeWidth="0.5" />
      {/* Right Bell */}
      <path d="M 185 133 Q 187 132, 189 133 L 189.5 137 Q 187 138.5, 184.5 137 Z" fill="#E8ECEE" stroke="#8CA1AA" strokeWidth="0.5" />

      {/* White Belfry Balustrade / Railing */}
      <line x1="145" y1="148" x2="195" y2="148" stroke="#D5CEBE" strokeWidth="1.2" />
      {/* White Belfry Upper Cornice */}
      <rect x="142" y="121" width="56" height="3" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.8" />

      {/* ======================================================== */}
      {/* 5. WHITE STEEP PYRAMID SPIRE WITH CORNER PINNACLES       */}
      {/* ======================================================== */}
      {/* Spire Base Platform (White) */}
      <rect x="144" y="117" width="52" height="4" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.7" />

      {/* 4 White Corner Spires / Obelisk Pinnacles */}
      {/* Left Corner Spire */}
      <polygon points="144,117 146,98 148,117" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.6" />
      <polygon points="146,117 148,103 150,117" fill="#EFECE4" />
      {/* Right Corner Spire */}
      <polygon points="192,117 194,98 196,117" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.6" />
      <polygon points="190,117 192,103 194,117" fill="#EFECE4" />

      {/* Main Steep White Pyramid Spire */}
      {/* Pyramid Shadow Flank (Right side) */}
      <polygon points="170,72 170,117 191,117" fill="#EDE9DF" stroke="#D5CEBE" strokeWidth="0.8" />
      {/* Pyramid Sunlit Flank (Left side) */}
      <polygon points="170,72 149,117 170,117" fill="#FFFFFF" stroke="#D5CEBE" strokeWidth="0.8" />

      {/* Small Square Dormer Window at Base of Pyramid (from poster!) */}
      <rect x="166" y="104" width="8" height="9" fill="#2B3A42" stroke="#FFFFFF" strokeWidth="1" />

      {/* Slender Pinnacle Spire Rod & Finial (Apex Point at y=72 -> 95) */}
      <line x1="170" y1="72" x2="170" y2="58" stroke="#3D4B54" strokeWidth="1.2" />
      {/* Mini horizontal finial crossbars */}
      <line x1="168" y1="62" x2="172" y2="62" stroke="#3D4B54" strokeWidth="0.8" />
      <circle cx="170" cy="65" r="1.4" fill="#3D4B54" />
      {/* Very needle top */}
      <line x1="170" y1="58" x2="170" y2="54" stroke="#3D4B54" strokeWidth="0.8" />

      {/* ======================================================== */}
      {/* 6. FOREGROUND STYLIZED EUCALYPTUS & PALM FOLIAGE (POSTER)*/}
      {/* ======================================================== */}
      <g id="poster-foreground-foliage">
        {/* Layer 1: Dark Teal Canopy in Background */}
        <circle cx="45" cy="350" r="35" fill="#1C5E52" />
        <circle cx="115" cy="350" r="30" fill="#154B41" />
        <circle cx="235" cy="350" r="35" fill="#154B41" />
        <circle cx="310" cy="350" r="38" fill="#1C5E52" />

        {/* Layer 2: Conical Cypress / Pines (as in poster right foreground) */}
        <polygon points="280,350 286,290 292,350" fill="#1C7D47" />
        <polygon points="274,350 280,305 286,350" fill="#176338" />
        <polygon points="320,350 326,295 332,350" fill="#1C7D47" />

        {/* Layer 3: Stylized Eucalyptus / Fan Palm Leaves (Teal, Sage & Cream) */}
        {/* Left Palm Cluster wrapping base of tower */}
        {/* Stem 1 */}
        <path d="M 120 350 Q 130 330, 142 320" stroke="#8ACAC0" strokeWidth="1.5" fill="none" />
        {/* Leaves */}
        <path d="M 142 320 Q 130 305, 115 312 Q 130 318, 142 320 Z" fill="#6CB7AA" stroke="#33786D" strokeWidth="0.5" />
        <path d="M 142 320 Q 148 302, 138 290 Q 134 308, 142 320 Z" fill="#8ACAC0" stroke="#33786D" strokeWidth="0.5" />
        <path d="M 142 320 Q 155 310, 160 300 Q 150 316, 142 320 Z" fill="#E4F1EE" stroke="#33786D" strokeWidth="0.5" />

        {/* Leftmost Foliage fronds */}
        <path d="M 50 350 Q 70 315, 60 285 Q 50 320, 50 350 Z" fill="#6CB7AA" />
        <path d="M 80 350 Q 95 310, 85 280 Q 75 315, 80 350 Z" fill="#8ACAC0" />
        <path d="M 100 350 Q 110 325, 100 300 Q 90 330, 100 350 Z" fill="#E4F1EE" />

        {/* Right Palm Fronds wrapping across base of tower */}
        {/* Palm Frond 1 */}
        <path d="M 195 350 Q 190 325, 180 315 Q 185 335, 195 350 Z" fill="#8ACAC0" />
        <path d="M 195 350 Q 205 315, 218 300 Q 210 330, 195 350 Z" fill="#6CB7AA" />
        <path d="M 215 350 Q 225 320, 240 305 Q 230 335, 215 350 Z" fill="#E4F1EE" />

        {/* Far Right Palm Frond */}
        <path d="M 260 350 Q 280 310, 295 295 Q 280 330, 260 350 Z" fill="#8ACAC0" />
        <path d="M 285 350 Q 305 315, 315 305 Q 300 335, 285 350 Z" fill="#6CB7AA" />
      </g>
    </g>
  );
};
