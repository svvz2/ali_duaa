// ============================================
// زخارف SVG أنيقة — زاوية + شريط أزهار + ختم
// ============================================

const CornerOrnament = ({ color = '#b8924a' }) => (
  <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* قوس رئيسي */}
    <path d="M 12 128 Q 12 70 70 36 Q 100 18 128 12"
      stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.95"/>
    {/* قوس داخلي */}
    <path d="M 22 128 Q 22 82 64 52 Q 96 32 128 26"
      stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.55"/>
    {/* قوس داخلي ثاني */}
    <path d="M 32 128 Q 32 96 60 70"
      stroke={color} strokeWidth="0.5" strokeLinecap="round" fill="none" opacity="0.4"/>

    {/* وردة مركزية في القوس */}
    <g transform="translate(70 36)">
      <circle r="3.2" fill={color}/>
      <circle r="6" stroke={color} strokeWidth="0.7" fill="none" opacity="0.7"/>
      <circle r="10" stroke={color} strokeWidth="0.5" fill="none" opacity="0.4"/>
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse key={a} cx="0" cy="-7" rx="2" ry="4"
          fill="#d8a7a0" opacity="0.7"
          transform={`rotate(${a})`}/>
      ))}
      <circle r="2" fill="#d8a7a0"/>
    </g>

    {/* أوراق على القوس */}
    <ellipse cx="38" cy="80" rx="6" ry="2.4" fill={color} opacity="0.5" transform="rotate(-55 38 80)"/>
    <ellipse cx="100" cy="22" rx="6" ry="2.4" fill={color} opacity="0.5" transform="rotate(18 100 22)"/>

    {/* وردات صغيرة على الأطراف */}
    <g transform="translate(20 108)">
      <circle r="2" fill="#d8a7a0" opacity="0.85"/>
      <circle r="3.5" stroke={color} strokeWidth="0.5" fill="none" opacity="0.6"/>
    </g>
    <g transform="translate(116 20)">
      <circle r="2" fill="#d8a7a0" opacity="0.85"/>
      <circle r="3.5" stroke={color} strokeWidth="0.5" fill="none" opacity="0.6"/>
    </g>

    {/* نقاط زخرفية */}
    <circle cx="14" cy="102" r="1.2" fill={color} opacity="0.6"/>
    <circle cx="126" cy="14" r="1.2" fill={color} opacity="0.6"/>
    <circle cx="50" cy="110" r="0.9" fill={color} opacity="0.5"/>
    <circle cx="110" cy="50" r="0.9" fill={color} opacity="0.5"/>

    {/* خطوط رفيعة زخرفية */}
    <path d="M 18 120 L 24 114" stroke={color} strokeWidth="0.6" opacity="0.5"/>
    <path d="M 120 18 L 114 24" stroke={color} strokeWidth="0.6" opacity="0.5"/>
  </svg>
);

// شريط أزهار أفقي
const FloralStrip = ({ flip = false }) => (
  <svg viewBox="0 0 600 60" fill="none" xmlns="http://www.w3.org/2000/svg"
       className="floral-strip" style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
    {/* الخط الذهبي المركزي */}
    <line x1="40" y1="30" x2="560" y2="30" stroke="#b8924a" strokeWidth="0.8" opacity="0.6"/>
    <line x1="80" y1="30" x2="520" y2="30" stroke="#b8924a" strokeWidth="0.4" opacity="0.4" strokeDasharray="2 4"/>

    {/* نقاط على الخط */}
    {[120, 220, 380, 480].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy="30" r="2.6" fill="#b8924a" opacity="0.85"/>
        <circle cx={x} cy="30" r="5" stroke="#b8924a" strokeWidth="0.5" fill="none" opacity="0.45"/>
      </g>
    ))}

    {/* زهرة مركزية */}
    <g transform="translate(300 30)">
      <circle r="3.8" fill="#d8a7a0" opacity="0.95"/>
      <circle r="3.8" stroke="#b8924a" strokeWidth="0.5" fill="none" opacity="0.8"/>
      <circle r="9" stroke="#b8924a" strokeWidth="0.6" fill="none" opacity="0.55"/>
      <circle r="14" stroke="#b8924a" strokeWidth="0.4" fill="none" opacity="0.32"/>
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse key={a} cx="0" cy="-10" rx="2.6" ry="5"
          fill="#d8a7a0" opacity="0.6"
          transform={`rotate(${a})`}/>
      ))}
      <ellipse cx="-26" cy="0" rx="7" ry="2.4" fill="#7f8a5a" opacity="0.6" transform="rotate(-15 -26 0)"/>
      <ellipse cx="26" cy="0" rx="7" ry="2.4" fill="#7f8a5a" opacity="0.6" transform="rotate(15 26 0)"/>
    </g>

    {/* أوراق متناثرة */}
    <ellipse cx="170" cy="30" rx="8" ry="2.6" fill="#7f8a5a" opacity="0.5" transform="rotate(-20 170 30)"/>
    <ellipse cx="430" cy="30" rx="8" ry="2.6" fill="#7f8a5a" opacity="0.5" transform="rotate(20 430 30)"/>

    {/* نقاط طرفية */}
    <circle cx="40" cy="30" r="1.6" fill="#b8924a" opacity="0.7"/>
    <circle cx="560" cy="30" r="1.6" fill="#b8924a" opacity="0.7"/>
  </svg>
);

// ختم وردي دائري
const RoseSeal = ({ size = 64 }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} fill="none">
    <circle cx="32" cy="32" r="28" stroke="#b8924a" strokeWidth="0.6" opacity="0.5" fill="none"/>
    <circle cx="32" cy="32" r="22" stroke="#b8924a" strokeWidth="0.8" opacity="0.75" fill="none"/>
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
      <ellipse key={a} cx="32" cy="14" rx="3" ry="6"
        fill="#d8a7a0" opacity="0.75"
        transform={`rotate(${a} 32 32)`}/>
    ))}
    <circle cx="32" cy="32" r="5" fill="#d4b274"/>
    <circle cx="32" cy="32" r="2.5" fill="#8a6a2e"/>
  </svg>
);

// شعار افتتاحي
const IntroSeal = ({ size = 110 }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none">
    <circle cx="60" cy="60" r="52" stroke="#d4b274" strokeWidth="0.9" opacity="0.7"/>
    <circle cx="60" cy="60" r="44" stroke="#d4b274" strokeWidth="0.5" opacity="0.45"/>
    {[0, 90, 180, 270].map(a => (
      <g key={a} transform={`rotate(${a} 60 60)`}>
        <circle cx="60" cy="14" r="2.2" fill="#d4b274"/>
      </g>
    ))}
    {[45, 135, 225, 315].map(a => (
      <g key={a} transform={`rotate(${a} 60 60)`}>
        <circle cx="60" cy="20" r="1.1" fill="#d4b274" opacity="0.7"/>
      </g>
    ))}
    {[0, 60, 120, 180, 240, 300].map(a => (
      <ellipse key={a} cx="60" cy="48" rx="3.8" ry="7.5"
        fill="#d4b274" opacity="0.9"
        transform={`rotate(${a} 60 60)`}/>
    ))}
    <circle cx="60" cy="60" r="4.5" fill="#f5d98a"/>
  </svg>
);

// تويج / باقة ورود صغيرة (للأعلى والأسفل)
const FloralCluster = ({ flip = false, width = 220 }) => (
  <svg viewBox="0 0 220 70" width={width} height={70 * width / 220} fill="none"
       style={{ transform: flip ? 'scaleY(-1)' : 'none' }}>
    {/* فرع رئيسي */}
    <path d="M 30 60 Q 60 30 110 28 Q 160 26 190 56"
      stroke="#7f8a5a" strokeWidth="0.7" fill="none" opacity="0.55"/>
    {/* أوراق على الفرع */}
    {[
      {x: 55, y: 42, r: -30, w: 10},
      {x: 85, y: 32, r: -10, w: 11},
      {x: 135, y: 30, r: 10, w: 11},
      {x: 165, y: 38, r: 30, w: 10},
      {x: 70, y: 50, r: -45, w: 7},
      {x: 150, y: 48, r: 45, w: 7},
    ].map((l, i) => (
      <ellipse key={i} cx={l.x} cy={l.y} rx={l.w} ry={l.w * 0.32}
        fill="#7f8a5a" opacity="0.55"
        transform={`rotate(${l.r} ${l.x} ${l.y})`}/>
    ))}
    {/* ثلاث وردات */}
    {[
      {x: 60, y: 40},
      {x: 110, y: 28},
      {x: 160, y: 40},
    ].map((r, i) => (
      <g key={i} transform={`translate(${r.x} ${r.y})`}>
        {[0, 72, 144, 216, 288].map(a => (
          <ellipse key={a} cx="0" cy="-5" rx="2.2" ry="4.5"
            fill={i === 1 ? '#d8a7a0' : '#ead3cd'} opacity="0.85"
            transform={`rotate(${a})`}/>
        ))}
        <circle r="2.4" fill="#d4b274"/>
        <circle r="1.2" fill="#8a6a2e"/>
      </g>
    ))}
    {/* براعم صغيرة */}
    <circle cx="40" cy="52" r="2" fill="#ead3cd" opacity="0.7"/>
    <circle cx="180" cy="52" r="2" fill="#ead3cd" opacity="0.7"/>
  </svg>
);

Object.assign(window, { CornerOrnament, FloralStrip, RoseSeal, IntroSeal, FloralCluster });
