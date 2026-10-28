import React from 'react';

interface CardIllustrationProps {
  name: string;
  className?: string;
}

export const CardIllustration: React.FC<CardIllustrationProps> = ({ name, className = 'w-full h-full' }) => {
  switch (name) {
    case 'gajah':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Elephant body */}
          <ellipse cx="56" cy="58" rx="34" ry="26" fill="#64748B" />
          {/* Legs */}
          <rect x="30" y="68" width="10" height="22" rx="4" fill="#475569" />
          <rect x="46" y="70" width="10" height="20" rx="4" fill="#334155" />
          <rect x="62" y="70" width="10" height="20" rx="4" fill="#475569" />
          <rect x="76" y="68" width="10" height="22" rx="4" fill="#334155" />
          {/* Head */}
          <circle cx="32" cy="46" r="20" fill="#64748B" />
          {/* Big Ear */}
          <ellipse cx="44" cy="44" rx="14" ry="17" fill="#94A3B8" />
          <ellipse cx="43" cy="44" rx="9" ry="11" fill="#F472B6" opacity="0.4" />
          {/* Trunk */}
          <path d="M22 48 C 16 52, 12 66, 18 72 C 22 76, 26 70, 22 66 C 18 62, 22 56, 26 52" stroke="#64748B" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Eye */}
          <circle cx="27" cy="42" r="3" fill="#0F172A" />
          <circle cx="28" cy="41" r="1" fill="#FFFFFF" />
          {/* Tusk */}
          <path d="M24 56 Q 18 58 16 52" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
          {/* Tail */}
          <path d="M88 56 Q 94 62 92 70" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'semut':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Magnifying ring hint */}
          <circle cx="50" cy="50" r="42" stroke="#CBD5E1" strokeWidth="3" strokeDasharray="4 4" fill="#F8FAFC" />
          {/* Ant Body - 3 segments */}
          <ellipse cx="68" cy="52" rx="14" ry="10" fill="#B91C1C" />
          <circle cx="50" cy="53" r="8" fill="#DC2626" />
          <circle cx="34" cy="50" r="9" fill="#EF4444" />
          {/* Eye */}
          <circle cx="30" cy="47" r="2.5" fill="#1E293B" />
          <circle cx="29" cy="46" r="0.8" fill="#FFFFFF" />
          {/* Antennae */}
          <path d="M30 43 Q 24 33 20 35" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M34 43 Q 32 31 38 30" stroke="#991B1B" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* 6 Legs */}
          <path d="M48 57 Q 44 68 38 72" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M52 57 Q 52 70 52 75" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M56 57 Q 62 68 68 73" stroke="#7F1D1D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M46 51 Q 42 42 36 38" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M52 51 Q 53 40 55 36" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M58 51 Q 65 42 70 40" stroke="#7F1D1D" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'jerapah':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Long neck */}
          <path d="M42 85 L 48 30 L 62 30 L 68 85 Z" fill="#FBBF24" />
          {/* Head */}
          <ellipse cx="54" cy="24" rx="11" ry="8" fill="#FBBF24" />
          <ellipse cx="61" cy="25" rx="5" ry="4" fill="#FDE68A" />
          {/* Horns */}
          <line x1="50" y1="18" x2="48" y2="12" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="48" cy="11" r="2" fill="#B45309" />
          <line x1="56" y1="18" x2="56" y2="12" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="56" cy="11" r="2" fill="#B45309" />
          {/* Ear */}
          <ellipse cx="44" cy="22" rx="4" ry="2" fill="#F59E0B" transform="rotate(-20 44 22)" />
          {/* Eye */}
          <circle cx="54" cy="23" r="2" fill="#1E293B" />
          {/* Spots */}
          <circle cx="52" cy="40" r="4.5" fill="#B45309" />
          <circle cx="58" cy="52" r="5" fill="#B45309" />
          <circle cx="48" cy="64" r="5.5" fill="#B45309" />
          <circle cx="59" cy="74" r="5" fill="#B45309" />
          {/* Cloud behind head */}
          <path d="M22 24 A 6 6 0 0 1 34 24 A 6 6 0 0 1 40 28 A 6 6 0 0 1 20 28 Z" fill="#E2E8F0" opacity="0.7" />
        </svg>
      );

    case 'kurakura':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground line */}
          <line x1="10" y1="78" x2="90" y2="78" stroke="#86EFAC" strokeWidth="3" strokeLinecap="round" />
          {/* Shell */}
          <ellipse cx="50" cy="62" rx="28" ry="18" fill="#15803D" />
          <ellipse cx="50" cy="64" rx="25" ry="14" fill="#22C55E" />
          {/* Shell Pattern */}
          <circle cx="50" cy="60" r="6" fill="#166534" />
          <circle cx="37" cy="63" r="4" fill="#166534" />
          <circle cx="63" cy="63" r="4" fill="#166534" />
          {/* Head low to ground */}
          <ellipse cx="78" cy="68" rx="8" ry="6" fill="#4ADE80" />
          <circle cx="81" cy="66" r="1.5" fill="#064E3B" />
          {/* Legs */}
          <ellipse cx="32" cy="74" rx="6" ry="4" fill="#4ADE80" />
          <ellipse cx="65" cy="74" rx="6" ry="4" fill="#4ADE80" />
          {/* Tiny tail */}
          <path d="M22 66 L 16 68 L 22 70 Z" fill="#4ADE80" />
        </svg>
      );

    case 'ular':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Long winding snake */}
          <path
            d="M15 65 C 20 45, 35 45, 45 65 C 55 85, 70 85, 80 60 C 85 45, 78 30, 68 28"
            stroke="#8B5CF6"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Head */}
          <ellipse cx="68" cy="27" rx="10" ry="8" fill="#7C3AED" />
          {/* Eyes */}
          <circle cx="70" cy="24" r="2.5" fill="#FEF08A" />
          <circle cx="71" cy="24" r="1" fill="#000000" />
          {/* Forked tongue */}
          <path d="M78 27 L 85 27 M 85 27 L 89 24 M 85 27 L 89 30" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          {/* Stripes */}
          <circle cx="28" cy="54" r="3" fill="#C4B5FD" />
          <circle cx="46" cy="67" r="3" fill="#C4B5FD" />
          <circle cx="64" cy="72" r="3" fill="#C4B5FD" />
        </svg>
      );

    case 'ulat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Leaf base */}
          <path d="M15 75 Q 50 85 85 70 Q 50 65 15 75 Z" fill="#86EFAC" />
          {/* Chubby short segments */}
          <circle cx="32" cy="62" r="9" fill="#EC4899" />
          <circle cx="45" cy="59" r="9" fill="#F472B6" />
          <circle cx="58" cy="57" r="10" fill="#DB2777" />
          {/* Head */}
          <circle cx="69" cy="52" r="11" fill="#BE185D" />
          {/* Eye */}
          <circle cx="72" cy="50" r="2.5" fill="#FFFFFF" />
          <circle cx="73" cy="50" r="1.2" fill="#000000" />
          {/* Cheerful smile */}
          <path d="M72 56 Q 75 58 78 55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Antenna */}
          <line x1="68" y1="42" x2="65" y2="34" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
          <circle cx="65" cy="33" r="2" fill="#F472B6" />
        </svg>
      );

    case 'api':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer flame */}
          <path
            d="M50 12 C 55 28, 78 38, 78 62 C 78 78, 66 88, 50 88 C 34 88, 22 78, 22 62 C 22 42, 38 32, 44 26 C 45 35, 48 38, 50 12 Z"
            fill="#EF4444"
          />
          {/* Middle flame */}
          <path
            d="M50 32 C 55 42, 68 50, 68 66 C 68 76, 60 82, 50 82 C 40 82, 32 76, 32 66 C 32 52, 42 46, 46 40 C 47 46, 49 48, 50 32 Z"
            fill="#F97316"
          />
          {/* Core flame */}
          <path
            d="M50 50 C 53 56, 60 62, 60 72 C 60 78, 56 80, 50 80 C 44 80, 40 78, 40 72 C 40 64, 46 58, 48 54 Z"
            fill="#FDE047"
          />
          {/* Sparks */}
          <circle cx="32" cy="30" r="2" fill="#F97316" />
          <circle cx="68" cy="26" r="2.5" fill="#EF4444" />
        </svg>
      );

    case 'es':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ice cube isometric box */}
          <polygon points="50,22 80,36 50,52 20,36" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" />
          <polygon points="20,36 50,52 50,82 20,66" fill="#7DD3FC" stroke="#0284C7" strokeWidth="2" />
          <polygon points="80,36 50,52 50,82 80,66" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          {/* Snowflakes / sparkles */}
          <path d="M50 14 L 50 6 M 46 10 L 54 10" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2" fill="#E0F2FE" />
          <circle cx="76" cy="22" r="2.5" fill="#E0F2FE" />
          {/* Shimmer reflection */}
          <line x1="30" y1="45" x2="42" y2="52" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </svg>
      );

    case 'lampu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Light rays */}
          <line x1="50" y1="12" x2="50" y2="4" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="24" x2="18" y2="18" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="76" y1="24" x2="82" y2="18" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="46" x2="8" y2="46" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="46" x2="92" y2="46" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          {/* Bulb glass */}
          <path d="M35 55 C 26 48, 26 30, 50 30 C 74 30, 74 48, 65 55 L 62 68 L 38 68 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
          {/* Filament glow */}
          <path d="M44 48 L 47 40 L 53 40 L 56 48" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Base screw */}
          <rect x="40" y="68" width="20" height="4" rx="1.5" fill="#94A3B8" />
          <rect x="42" y="73" width="16" height="4" rx="1.5" fill="#64748B" />
          <rect x="45" y="78" width="10" height="3" rx="1.5" fill="#475569" />
        </svg>
      );

    case 'malam':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dark night sky circle */}
          <circle cx="50" cy="50" r="40" fill="#1E1B4B" />
          {/* Crescent Moon */}
          <path
            d="M54 22 C 68 28, 72 48, 62 62 C 54 72, 38 76, 28 68 C 42 66, 52 54, 50 38 C 48 30, 44 26, 40 24 C 44 23, 49 22, 54 22 Z"
            fill="#FDE047"
          />
          {/* Stars */}
          <polygon points="30,30 32,35 37,35 33,38 35,43 30,40 25,43 27,38 23,35 28,35" fill="#FFFFFF" />
          <circle cx="70" cy="32" r="2" fill="#FFFFFF" />
          <circle cx="76" cy="58" r="2.5" fill="#FDE047" />
          <circle cx="34" cy="62" r="1.5" fill="#E2E8F0" />
        </svg>
      );

    case 'kelinci':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Speed motion lines */}
          <line x1="8" y1="50" x2="24" y2="50" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="12" y1="62" x2="30" y2="62" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="6" y1="72" x2="20" y2="72" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bunny Body leaning forward */}
          <ellipse cx="54" cy="60" rx="20" ry="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          {/* Head */}
          <circle cx="72" cy="48" r="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          {/* Long Ears blown back by speed */}
          <ellipse cx="56" cy="32" rx="16" ry="6" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" transform="rotate(-30 56 32)" />
          <ellipse cx="56" cy="32" rx="12" ry="3" fill="#F472B6" transform="rotate(-30 56 32)" />
          {/* Eye */}
          <circle cx="75" cy="46" r="2.5" fill="#EF4444" />
          {/* Cute Nose */}
          <ellipse cx="83" cy="50" rx="2" ry="1.5" fill="#F472B6" />
          {/* Legs running */}
          <ellipse cx="64" cy="74" rx="8" ry="4" fill="#F8FAFC" />
          <ellipse cx="40" cy="70" rx="7" ry="4" fill="#F8FAFC" />
          {/* Fluffy tail */}
          <circle cx="34" cy="58" r="5" fill="#F8FAFC" />
        </svg>
      );

    case 'siput':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shell with spiral */}
          <circle cx="58" cy="50" r="22" fill="#F59E0B" stroke="#D97706" strokeWidth="3" />
          <path d="M58 50 A 14 14 0 0 1 72 50 A 8 8 0 0 1 64 50 A 4 4 0 0 1 60 50" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Soft Body */}
          <path d="M22 75 C 22 75, 26 64, 40 64 L 75 64 C 84 64, 88 74, 84 75 Z" fill="#86EFAC" />
          {/* Head & eye stalks */}
          <ellipse cx="28" cy="62" rx="8" ry="7" fill="#86EFAC" />
          <line x1="26" y1="56" x2="22" y2="44" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="21" cy="43" r="2.5" fill="#15803D" />
          <line x1="30" y1="56" x2="32" y2="46" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="33" cy="45" r="2" fill="#15803D" />
          {/* Zzz calm symbol */}
          <text x="68" y="28" fill="#10B981" fontSize="14" fontWeight="bold">~</text>
        </svg>
      );

    case 'batu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Giant boulder */}
          <polygon points="25,75 16,52 35,28 68,24 86,45 80,78 45,82" fill="#78716C" stroke="#57534E" strokeWidth="3" />
          <polygon points="35,28 68,24 58,50 32,55" fill="#A8A29E" opacity="0.4" />
          {/* Cracks */}
          <path d="M42 45 L 48 56 L 44 66" stroke="#44403C" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Heavy weight badge */}
          <rect x="36" y="58" width="28" height="14" rx="3" fill="#292524" />
          <text x="50" y="69" fill="#FAFAF9" fontSize="9" fontWeight="bold" textAnchor="middle">1000 KG</text>
        </svg>
      );

    case 'bulu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Floating feather */}
          <path
            d="M25 80 C 35 60, 40 40, 75 22 C 78 40, 65 60, 45 74 Z"
            fill="#BAE6FD"
            stroke="#38BDF8"
            strokeWidth="2"
          />
          {/* Center spine */}
          <path d="M22 84 Q 45 55 75 22" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Soft barbs */}
          <line x1="42" y1="60" x2="52" y2="52" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="50" x2="62" y2="44" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="36" y1="68" x2="32" y2="60" stroke="#7DD3FC" strokeWidth="1.5" strokeLinecap="round" />
          {/* Gentle wind lines */}
          <path d="M14 36 Q 24 32 30 38" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M68 68 Q 78 64 86 70" stroke="#93C5FD" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'bintang':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Space backdrop */}
          <circle cx="50" cy="50" r="42" fill="#1E1B4B" />
          {/* Telescope viewing frame */}
          <circle cx="50" cy="50" r="38" stroke="#6366F1" strokeWidth="2" strokeDasharray="6 3" />
          {/* Far distant sparkling star */}
          <polygon points="50,18 55,38 75,38 58,50 64,70 50,56 36,70 42,50 25,38 45,38" fill="#FACC15" />
          <circle cx="50" cy="46" r="4" fill="#FFFFFF" />
          <circle cx="28" cy="24" r="1.5" fill="#FFFFFF" />
          <circle cx="72" cy="72" r="1.5" fill="#FFFFFF" />
        </svg>
      );

    case 'tangan':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Close up apple right in hand */}
          <circle cx="50" cy="48" r="22" fill="#EF4444" />
          <ellipse cx="50" cy="46" rx="20" ry="21" fill="#DC2626" />
          {/* Apple leaf & stem */}
          <path d="M50 28 Q 50 18 54 14" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <path d="M52 20 Q 64 16 62 26 Q 52 26 52 20 Z" fill="#22C55E" />
          {/* Friendly Hand holding it */}
          <rect x="34" y="65" width="32" height="24" rx="8" fill="#FDBA74" />
          <circle cx="36" cy="62" r="6" fill="#FDBA74" />
          <circle cx="64" cy="62" r="6" fill="#FDBA74" />
        </svg>
      );

    case 'kamus':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Giant thick book */}
          {/* Thick paper edge */}
          <rect x="25" y="30" width="50" height="48" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <line x1="28" y1="72" x2="72" y2="72" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="28" y1="68" x2="72" y2="68" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="28" y1="64" x2="72" y2="64" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="2 2" />
          {/* Thick Hard Cover */}
          <path d="M22 26 L 75 26 L 75 32 L 22 32 Z" fill="#B45309" />
          <path d="M22 26 L 22 78 L 28 78 L 28 26 Z" fill="#92400E" />
          <path d="M22 78 L 75 78 L 75 82 L 22 82 Z" fill="#B45309" />
          {/* Gold Bookmark ribbon */}
          <path d="M48 26 L 48 54 L 53 48 L 58 54 L 58 26 Z" fill="#F59E0B" />
          <text x="50" y="44" fill="#92400E" fontSize="9" fontWeight="bold" textAnchor="middle">A-Z</text>
        </svg>
      );

    case 'kertas':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Thin single paper flying */}
          <polygon points="30,22 68,22 76,34 76,78 30,78" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          {/* Folded corner */}
          <polygon points="68,22 68,34 76,34" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Ruled lines */}
          <line x1="38" y1="42" x2="68" y2="42" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="52" x2="68" y2="52" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
          <line x1="38" y1="62" x2="56" y2="62" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'berlian':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Diamond gem */}
          <polygon points="30,35 70,35 84,52 50,82 16,52" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
          <polygon points="30,35 50,52 70,35" fill="#7DD3FC" />
          <polygon points="16,52 30,35 50,52" fill="#BAE6FD" />
          <polygon points="70,35 84,52 50,52" fill="#0284C7" />
          <polygon points="16,52 50,82 50,52" fill="#0369A1" />
          <polygon points="84,52 50,82 50,52" fill="#075985" />
          {/* Sparkle */}
          <circle cx="34" cy="38" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'bantal':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soft fluffy squishy pillow */}
          <path
            d="M20 35 C 25 24, 75 24, 80 35 C 90 40, 90 60, 80 65 C 75 76, 25 76, 20 65 C 10 60, 10 40, 20 35 Z"
            fill="#FBCFE8"
            stroke="#F472B6"
            strokeWidth="3"
          />
          {/* Pillow folds */}
          <circle cx="50" cy="50" r="5" fill="#F472B6" />
          <path d="M50 50 Q 30 40 22 36" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M50 50 Q 70 40 78 36" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M50 50 Q 30 60 22 64" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M50 50 Q 70 60 78 64" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'belajar':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Open notebook */}
          <path d="M22 60 Q 50 64 50 78 Q 22 74 22 60 Z" fill="#F8FAFC" stroke="#059669" strokeWidth="2" />
          <path d="M78 60 Q 50 64 50 78 Q 78 74 78 60 Z" fill="#F8FAFC" stroke="#059669" strokeWidth="2" />
          {/* Kid studying face */}
          <circle cx="50" cy="36" r="16" fill="#FDBA74" />
          <circle cx="45" cy="35" r="2" fill="#1E293B" />
          <circle cx="55" cy="35" r="2" fill="#1E293B" />
          <path d="M46 42 Q 50 46 54 42" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Cap / Hair */}
          <path d="M34 32 C 34 22, 66 22, 66 32 Z" fill="#10B981" />
          {/* Pencil */}
          <line x1="68" y1="52" x2="60" y2="65" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'tiduran':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sleeping bed */}
          <rect x="15" y="60" width="70" height="15" rx="4" fill="#94A3B8" />
          {/* Blanket */}
          <path d="M35 54 C 45 48, 75 48, 85 60 L 35 60 Z" fill="#64748B" />
          {/* Head on pillow */}
          <ellipse cx="28" cy="52" rx="9" ry="7" fill="#FDBA74" />
          {/* Closed eyes sleeping */}
          <path d="M24 52 Q 27 55 30 52" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Big ZZZ */}
          <text x="56" y="34" fill="#64748B" fontSize="16" fontWeight="bold">Z</text>
          <text x="68" y="24" fill="#94A3B8" fontSize="12" fontWeight="bold">z</text>
        </svg>
      );

    case 'sabun':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soap bar */}
          <rect x="22" y="44" width="56" height="32" rx="12" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <rect x="28" y="50" width="44" height="20" rx="8" fill="#7DD3FC" />
          {/* Shiny bubbles */}
          <circle cx="34" cy="30" r="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
          <circle cx="62" cy="24" r="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
          <circle cx="76" cy="36" r="6" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
          {/* Sparkles */}
          <polygon points="50,14 52,19 57,19 53,22 55,27 50,24 45,27 47,22 43,19 48,19" fill="#FACC15" />
        </svg>
      );

    case 'lumpur':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mud pool puddle */}
          <path
            d="M18 68 C 12 55, 30 45, 50 48 C 65 42, 88 50, 84 68 C 82 82, 35 85, 18 68 Z"
            fill="#78350F"
            stroke="#451A03"
            strokeWidth="3"
          />
          {/* Mud splatters */}
          <circle cx="32" cy="34" r="5" fill="#78350F" />
          <circle cx="68" cy="30" r="6" fill="#78350F" />
          <circle cx="82" cy="42" r="3.5" fill="#78350F" />
          {/* Dirty footprint / handprint */}
          <ellipse cx="48" cy="62" rx="8" ry="6" fill="#451A03" />
          <circle cx="42" cy="54" r="2" fill="#451A03" />
          <circle cx="47" cy="52" r="2" fill="#451A03" />
          <circle cx="52" cy="53" r="2" fill="#451A03" />
        </svg>
      );

    case 'pasar':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Market stall awning with stripes */}
          <polygon points="15,42 85,42 80,26 20,26" fill="#EF4444" />
          <polygon points="25,42 35,42 33,26 25,26" fill="#FFFFFF" />
          <polygon points="45,42 55,42 53,26 45,26" fill="#FFFFFF" />
          <polygon points="65,42 75,42 73,26 65,26" fill="#FFFFFF" />
          {/* Crowd silhouettes */}
          <circle cx="28" cy="62" r="6" fill="#3B82F6" />
          <circle cx="45" cy="58" r="7" fill="#F59E0B" />
          <circle cx="62" cy="60" r="6.5" fill="#10B981" />
          <circle cx="76" cy="64" r="6" fill="#EC4899" />
          {/* Festive party pennants */}
          <path d="M10 20 Q 50 32 90 20" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'hutan':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Quiet solitary pine tree */}
          <polygon points="50,20 66,45 58,45 74,68 26,68 42,45 34,45" fill="#047857" stroke="#065F46" strokeWidth="2" />
          <rect x="46" y="68" width="8" height="14" fill="#78350F" />
          {/* Distant soft mountain */}
          <polygon points="12,74 28,52 44,74" fill="#334155" opacity="0.3" />
          <polygon points="65,74 80,56 94,74" fill="#334155" opacity="0.3" />
          {/* Soft calm mist */}
          <path d="M20 82 Q 50 80 80 82" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'tangga_naik':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Steps going up */}
          <path
            d="M18 78 L 36 78 L 36 60 L 54 60 L 54 42 L 72 42 L 72 24 L 84 24"
            stroke="#059669"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Big upward green arrow */}
          <path d="M42 36 L 42 16 M 34 24 L 42 16 L 50 24" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'perosotan':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Playground slide swooshing down */}
          <path
            d="M26 24 C 28 48, 48 64, 82 74"
            stroke="#F97316"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Ladder on left */}
          <line x1="22" y1="24" x2="22" y2="78" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
          <line x1="22" y1="40" x2="26" y2="40" stroke="#DC2626" strokeWidth="3" />
          <line x1="22" y1="56" x2="26" y2="56" stroke="#DC2626" strokeWidth="3" />
          {/* Downward swoosh arrow */}
          <path d="M54 46 L 68 58 M 60 62 L 68 58 L 68 50" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'kado_buka':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Open gift box body */}
          <rect x="25" y="52" width="50" height="32" rx="4" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
          <rect x="46" y="52" width="8" height="32" fill="#DC2626" />
          {/* Lid tilted open */}
          <rect x="18" y="36" width="58" height="12" rx="3" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" transform="rotate(-18 47 42)" />
          {/* Surprise stars popping out */}
          <polygon points="50,18 52,24 58,24 54,28 56,34 50,30 44,34 46,28 42,24 48,24" fill="#EF4444" />
          <circle cx="34" cy="24" r="2.5" fill="#3B82F6" />
          <circle cx="68" cy="26" r="3" fill="#10B981" />
        </svg>
      );

    case 'kado_tutup':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Closed gift box */}
          <rect x="24" y="44" width="52" height="38" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2.5" />
          <rect x="20" y="34" width="60" height="12" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Ribbon */}
          <rect x="46" y="34" width="8" height="48" fill="#FACC15" />
          {/* Bow on top */}
          <ellipse cx="43" cy="28" rx="7" ry="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <ellipse cx="57" cy="28" rx="7" ry="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <circle cx="50" cy="29" r="3" fill="#EAB308" />
        </svg>
      );

    case 'permen':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Stick */}
          <line x1="50" y1="56" x2="50" y2="86" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
          {/* Swirl lollipop */}
          <circle cx="50" cy="40" r="22" fill="#EC4899" stroke="#BE185D" strokeWidth="2.5" />
          <path d="M50 40 A 15 15 0 0 1 65 40 A 10 10 0 0 1 55 40 A 5 5 0 0 1 50 40" stroke="#FDE047" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Candy sparkle */}
          <circle cx="40" cy="30" r="2.5" fill="#FFFFFF" />
        </svg>
      );

    case 'jamu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Potion/Medicine bottle */}
          <rect x="36" y="38" width="28" height="42" rx="6" fill="#047857" stroke="#064E3B" strokeWidth="2.5" />
          <rect x="42" y="28" width="16" height="10" fill="#065F46" stroke="#064E3B" strokeWidth="2" />
          <rect x="40" y="24" width="20" height="5" rx="2" fill="#78350F" />
          {/* Bitter Herbal Leaf symbol */}
          <path d="M50 48 Q 58 56 50 64 Q 42 56 50 48 Z" fill="#A7F3D0" />
          {/* Wavy steam */}
          <path d="M48 20 Q 52 14 46 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="36" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <text x="50" y="58" fill="#475569" fontSize="24" fontWeight="bold" textAnchor="middle">?</text>
        </svg>
      );
  }
};
