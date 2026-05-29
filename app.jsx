// ============================================
// دعوة علي & دعاء — التطبيق الرئيسي
// ============================================
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ---------- بيانات الدعوة (قابلة للتعديل) ----------
const INVITATION = {
  bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
  intro: "يَسرّنا دعوتكم لمشاركتنا فرحتنا",
  welcome: "بكل مودة ندعوكم لمشاركتنا فرحتنا في يومنا المميز",
  groom: "علي",
  bride: "دعاء",
  day: "الجمعة",
  date: "5 يونيو 2026",
  time: "الساعة 5 عصراً",
  venue: "قاعة الخضراء",
  address: "شارع فلسطين – بغداد",
  addressLong: "شارع فلسطين – تقاطع الموال – أمام مجسر الجامعة – بغداد",
  mapsUrl: "https://maps.google.com?q=%D9%82%D8%A7%D8%B9%D8%A9%20%D8%A7%D9%84%D8%AE%D8%B6%D8%B1%D8%A7%D8%A1%D8%8C%209C92%20PQW%D8%8C%20%D8%A8%D8%BA%D8%AF%D8%A7%D8%AF%20%D8%8C%20%D8%AA%D9%82%D8%A7%D8%B7%D8%B9%20%D8%A7%D9%84%D9%85%D9%88%D8%A7%D9%84%20%D8%8C%20%D8%A7%D9%85%D8%A7%D9%85%20%D9%85%D8%AC%D8%B3%D8%B1%20%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D8%A9%D8%8C%20%D8%A8%D8%BA%D8%AF%D8%A7%D8%AF%D8%8C%20%D8%A8%D8%BA%D8%AF%D8%A7%D8%AF%20%D9%85%D8%AD%D8%A7%D9%81%D8%B8%D8%A9&ftid=0x0:0x6b5d7d1ad9e6c9f4&entry=gps&shh=CAE&lucs=,94297699,94284475,94231188,94280568,47071704,94218641,94282134,94286869&g_st=ic",
  // رابط أقصر لل*QR* لتفادي رمز ضخم (يفتح نفس الموقع)
  mapsQrUrl: "https://maps.google.com/?q=" + encodeURIComponent("قاعة الخضراء بغداد") + "&ftid=0x0:0x6b5d7d1ad9e6c9f4",
  mapEmbed: "https://maps.google.com/maps?q=" + encodeURIComponent("قاعة الخضراء، شارع فلسطين، تقاطع الموال، أمام مجسر الجامعة، بغداد") + "&t=&z=16&ie=UTF8&iwloc=&output=embed",
  startISO: "20260605T170000", // التوقيت المحلي بغداد
  endISO:   "20260605T220000",
  // ضع هنا رابط الموقع بعد النشر؛ يستخدم window.location.href تلقائياً إن كان فارغاً
  siteUrl: ""
};

const getSiteUrl = () => INVITATION.siteUrl || window.location.href;

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1920;
const EXPORT_BACKGROUND = '#f7f1e6';

const fitQrSvg = (svg, size) => {
  if (!svg) return '';
  return svg
    .replace(/\s(?:width|height)=["'][^"']*["']/gi, '')
    .replace(/<svg([^>]*)>/i, `<svg$1 width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" style="display:block">`);
};

// ============================================
// Toast
// ============================================
const Toast = ({ msg, show }) => (
  <div className={`toast ${show ? 'show' : ''}`}>{msg}</div>
);

// ============================================
// جسيمات ذهبية
// ============================================
const Particles = ({ count = 30 }) => {
  const items = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 10 + Math.random() * 16,
    delay: -Math.random() * 16,
    drift: (Math.random() * 80 - 40) + 'px',
    opacity: 0.4 + Math.random() * 0.6,
  })), [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <span key={p.id}
          className="particle"
          style={{
            left: p.left + '%',
            bottom: -20,
            width: p.size + 'px',
            height: p.size + 'px',
            animationDuration: p.duration + 's',
            animationDelay: p.delay + 's',
            opacity: p.opacity,
            ['--drift']: p.drift,
          }}/>
      ))}
    </div>
  );
};

// بتلات وأوراق متحركة
const Petals = ({ count = 14 }) => {
  const items = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 14 + Math.random() * 14,
    delay: -Math.random() * 20,
    drift: (Math.random() * 120 - 60) + 'px',
    isPetal: Math.random() > 0.45,
    scale: 0.7 + Math.random() * 0.9,
  })), [count]);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(p => (
        <span key={p.id} className="petal"
          style={{
            left: p.left + '%',
            top: -40,
            ['--scale']: p.scale,
            ['--drift']: p.drift,
            ['--dur']: p.duration + 's',
            ['--delay']: p.delay + 's',
          }}>
          <span className={`petal-inner ${p.isPetal ? 'petal-shape' : 'leaf-shape'}`}/>
        </span>
      ))}
    </div>
  );
};

// ============================================
// مونوغرام علي و دعاء — حروف عربية مرتبة بفخامة
// ============================================
const Monogram = ({ size = 200 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mgGold" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#fff5cf"/>
        <stop offset="40%" stopColor="#f5d98a"/>
        <stop offset="80%" stopColor="#b8924a"/>
        <stop offset="100%" stopColor="#8a6a2e"/>
      </radialGradient>
      <linearGradient id="mgRing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d4b274"/>
        <stop offset="50%" stopColor="#f5d98a"/>
        <stop offset="100%" stopColor="#8a6a2e"/>
      </linearGradient>
    </defs>

    {/* حلقات خارجية */}
    <circle cx="100" cy="100" r="92" stroke="url(#mgRing)" strokeWidth="0.8" opacity="0.5" fill="none"/>
    <circle cx="100" cy="100" r="84" stroke="url(#mgRing)" strokeWidth="1.2" opacity="0.85" fill="none"/>
    <circle cx="100" cy="100" r="76" stroke="url(#mgRing)" strokeWidth="0.5" opacity="0.45" fill="none"/>

    {/* زخارف نقطية على الحلقة الكبيرة */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
      <g key={a} transform={`rotate(${a} 100 100)`}>
        <circle cx="100" cy="16" r="2.4" fill="url(#mgGold)"/>
      </g>
    ))}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(a => (
      <g key={a} transform={`rotate(${a} 100 100)`}>
        <circle cx="100" cy="20" r="1.3" fill="#d4b274" opacity="0.75"/>
      </g>
    ))}

    {/* أوراق زخرفية على الحلقة الوسطى */}
    {[30, 150, 210, 330].map(a => (
      <g key={a} transform={`rotate(${a} 100 100)`}>
        <ellipse cx="100" cy="16" rx="4" ry="2" fill="url(#mgGold)" opacity="0.7"/>
      </g>
    ))}

    {/* وردة مركزية ذهبية */}
    <g transform="translate(100 100)">
      {/* بتلات داخلية */}
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse key={'i' + a} cx="0" cy="-22" rx="6" ry="14"
          fill="url(#mgGold)" opacity="0.92"
          transform={`rotate(${a})`}/>
      ))}
      {/* بتلات خارجية أكبر مزاحة */}
      {[30, 90, 150, 210, 270, 330].map(a => (
        <ellipse key={'o' + a} cx="0" cy="-30" rx="5" ry="11"
          fill="#b8924a" opacity="0.6"
          transform={`rotate(${a})`}/>
      ))}
      <circle r="9" fill="url(#mgGold)"/>
      <circle r="4" fill="#8a6a2e"/>
      <circle r="2" fill="#fff5cf" opacity="0.9"/>
    </g>

    {/* أهلّة جانبية */}
    <path d="M 14 100 Q 6 86 6 100 Q 6 114 14 100" stroke="url(#mgRing)" strokeWidth="1.2" fill="none" opacity="0.6"/>
    <path d="M 186 100 Q 194 86 194 100 Q 194 114 186 100" stroke="url(#mgRing)" strokeWidth="1.2" fill="none" opacity="0.6"/>
  </svg>
);

// ============================================
// شاشة الافتتاحية السينمائية الفخمة
// ============================================
const Intro = ({ onDone }) => {
  const [stage, setStage] = useState(0);
  // 0: مظلم + بوكيه، 1: مونوغرام، 2: بسملة، 3: أسماء + ترحيب، 4: خروج

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 400),    // مونوغرام
      setTimeout(() => setStage(2), 1800),   // بسملة
      setTimeout(() => setStage(3), 3300),   // أسماء وترحيب
      setTimeout(() => setStage(4), 5800),   // خروج
      setTimeout(() => onDone(),     6500),  // انتهاء
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  // مواقع أضواء البوكيه
  const bokeh = useMemo(() => [
    { left: 12, top: 18, size: 80,  dur: 9,  mx: 30,  my: -20, op: 0.5 },
    { left: 78, top: 22, size: 110, dur: 11, mx: -25, my: 15,  op: 0.45 },
    { left: 22, top: 75, size: 95,  dur: 10, mx: 20,  my: -30, op: 0.55 },
    { left: 82, top: 68, size: 70,  dur: 12, mx: -20, my: 25,  op: 0.5 },
    { left: 50, top: 88, size: 130, dur: 13, mx: 15,  my: -15, op: 0.4 },
    { left: 38, top: 10, size: 60,  dur: 8,  mx: -20, my: 18,  op: 0.55 },
    { left: 65, top: 50, size: 50,  dur: 10, mx: 25,  my: 10,  op: 0.4 },
  ], []);

  return (
    <div className={`fixed inset-0 z-50 intro-bg overflow-hidden transition-all duration-700 ${stage >= 4 ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>

      {/* بوكيه ذهبي عائم */}
      {bokeh.map((b, i) => (
        <span key={i} className="bokeh" style={{
          left: b.left + '%',
          top: b.top + '%',
          width: b.size,
          height: b.size,
          ['--dur']: b.dur + 's',
          ['--mx']: b.mx + 'px',
          ['--my']: b.my + 'px',
          ['--op']: b.op,
          animationDelay: (-i * 0.7) + 's',
        }}/>
      ))}

      {/* فيغنيت متحرك يضيء من المركز */}
      <div className="vignette-glow"/>

      {/* جسيمات ذهبية */}
      <Particles count={48}/>

      {/* بتلات */}
      <Petals count={12}/>

      {/* خواتم متمددة عند ظهور البسملة */}
      {stage >= 2 && (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="ring-expand" style={{ ['--d']: '0s' }}/>
            <div className="ring-expand" style={{ ['--d']: '0.5s' }}/>
          </div>
        </>
      )}

      {/* وميض ذهبي عند ظهور الأسماء */}
      {stage === 3 && <div className="gold-flash"/>}

      {/* زر تخطّي */}
      <button
        onClick={onDone}
        className="skip-btn absolute top-5 left-5 px-4 py-2 rounded-full text-xs font-tajawal z-30">
        تخطّي المقدمة ←
      </button>

      {/* المسرح الرئيسي */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

        {/* المونوغرام يظهر أولاً ثم يتقلص للأعلى */}
        <div className={`transition-all duration-1000 ease-out ${
          stage === 0 ? 'opacity-0 scale-50' :
          stage === 1 ? 'opacity-100 scale-100' :
          stage >= 2 ? 'opacity-90 scale-[0.55] -translate-y-2' : ''
        }`}>
          {stage >= 1 && (
            <div className="monogram anim-shimmer">
              <Monogram size={210}/>
            </div>
          )}
        </div>

        {/* البسملة */}
        <div className={`mt-2 transition-all duration-700 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {stage >= 2 && (
            <>
              <p className="font-amiri bismillah-shimmer text-3xl sm:text-5xl leading-loose">
                {INVITATION.bismillah}
              </p>
              <div className="mt-4 mx-auto gold-line-draw" style={{ ['--w']: '280px', ['--d']: '0.5s' }}/>
            </>
          )}
        </div>

        {/* الأسماء — تأتي من الجانبين وتلتقي */}
        <div className={`mt-10 transition-opacity duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          {stage >= 3 && (
            <>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <span className="name-in-right font-amiri text-[#f5d98a] text-5xl sm:text-7xl name-glow"
                  style={{ animationDelay: '0.05s' }}>
                  {INVITATION.groom}
                </span>
                <span className="amp-bloom font-amiri italic text-[#d4b274] text-4xl sm:text-5xl"
                  style={{ animationDelay: '0.6s' }}>&amp;</span>
                <span className="name-in-left font-amiri text-[#f5d98a] text-5xl sm:text-7xl name-glow"
                  style={{ animationDelay: '0.05s' }}>
                  {INVITATION.bride}
                </span>
              </div>

              {/* خط مرسوم تحت الأسماء */}
              <div className="mt-6 mx-auto gold-line-draw"
                style={{ ['--w']: '360px', ['--d']: '1.1s' }}/>

              {/* عبارة الترحيب */}
              <p className="mt-6 font-amiri bismillah-shimmer text-xl sm:text-2xl anim-fade-up"
                style={{ animationDelay: '1.5s' }}>
                {INVITATION.intro}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// بطاقة الدعوة
// ============================================
const InviteCard = React.forwardRef((props, ref) => (
  <div ref={ref} className="invite-card relative p-7 sm:p-10">
    {/* طبقات الزخرفة */}
    <div className="paper-grain"></div>
    <div className="gold-frame-outer"></div>
    <div className="gold-frame-mid"></div>
    <div className="gold-frame-inner"></div>

    {/* زخارف الزوايا */}
    <div className="corner-orn corner-tl"><CornerOrnament/></div>
    <div className="corner-orn corner-tr"><CornerOrnament/></div>
    <div className="corner-orn corner-bl"><CornerOrnament/></div>
    <div className="corner-orn corner-br"><CornerOrnament/></div>

    <div className="invite-content text-center pt-6 sm:pt-8">
      {/* باقة ورد علوية */}
      <div className="flex justify-center mb-4 opacity-90">
        <FloralCluster width={200}/>
      </div>

      {/* البسملة */}
      <p className="font-amiri text-[#8a6a2e] text-xl sm:text-2xl leading-loose mb-2 tracking-wide">
        {INVITATION.bismillah}
      </p>

      {/* فاصل ذهبي + ختم */}
      <div className="flex items-center justify-center gap-3 my-4">
        <span className="h-px w-14 gold-line-light"/>
        <RoseSeal size={36}/>
        <span className="h-px w-14 gold-line-light"/>
      </div>

      {/* عبارة الترحيب */}
      <p className="font-tajawal text-[#4a4030] text-sm sm:text-base leading-relaxed mt-5 max-w-md mx-auto px-4">
        {INVITATION.welcome}
      </p>

      {/* الأسماء — فراغ آمن للذيول */}
      <div className="my-12 sm:my-14 relative">
        <h2 className="font-amiri name-glow anim-glow text-[#2a241b] text-6xl sm:text-7xl leading-[1.55] pb-6">
          {INVITATION.groom}
        </h2>

        {/* فاصل ذهبي زخرفي */}
        <div className="my-4 flex items-center justify-center gap-3">
          <span className="h-px w-20 sm:w-24 gold-line"/>
          <svg width="60" height="20" viewBox="0 0 90 30" fill="none">
            <circle cx="6" cy="15" r="3" fill="#b8924a"/>
            <path d="M45 2 L62 15 L45 28 L28 15 Z" fill="#d4b274" stroke="#8a6a2e" strokeWidth="0.8"/>
            <circle cx="45" cy="15" r="3" fill="#f5d98a"/>
            <circle cx="84" cy="15" r="3" fill="#b8924a"/>
          </svg>
          <span className="h-px w-20 sm:w-24 gold-line"/>
        </div>

        <h2 className="font-amiri name-glow anim-glow text-[#2a241b] text-6xl sm:text-7xl leading-[1.55] pt-3">
          {INVITATION.bride}
        </h2>
      </div>

      {/* شريط أزهار */}
      <div className="my-4 opacity-90">
        <FloralStrip/>
      </div>

      {/* بلوك التاريخ والوقت */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6">
        <div className="detail-block px-2 py-5">
          <p className="font-tajawal text-[10px] sm:text-xs text-[#8a6a2e] mb-2">اليوم</p>
          <p className="font-amiri detail-value text-[#2a241b] text-xl sm:text-2xl">{INVITATION.day}</p>
        </div>
        <div className="detail-block px-2 py-5">
          <p className="font-tajawal text-[10px] sm:text-xs text-[#8a6a2e] mb-2">التاريخ</p>
          <p className="font-amiri detail-value text-[#2a241b] text-2xl sm:text-3xl leading-none">5</p>
          <p className="font-tajawal text-[#4a4030] text-[11px] sm:text-xs mt-1">يونيو 2026</p>
        </div>
        <div className="detail-block px-2 py-5">
          <p className="font-tajawal text-[10px] sm:text-xs text-[#8a6a2e] mb-2">الوقت</p>
          <p className="font-amiri detail-value text-[#2a241b] text-2xl sm:text-3xl leading-none">5:00</p>
          <p className="font-tajawal text-[#4a4030] text-[11px] sm:text-xs mt-1">عصراً</p>
        </div>
      </div>

      {/* المكان */}
      <div className="mt-7 pt-6 border-t border-[#b8924a]/20">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#8a6a2e]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" stroke="currentColor" strokeWidth="1.4"/>
            <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          <span className="font-tajawal text-[11px]">المكان</span>
        </div>
        <p className="font-amiri text-[#2a241b] text-xl sm:text-2xl">{INVITATION.venue}</p>
        <p className="font-tajawal text-[#4a4030] text-sm mt-1 leading-relaxed px-2">
          {INVITATION.addressLong}
        </p>
      </div>

      {/* باقة ورد سفلية */}
      <div className="flex justify-center mt-6 opacity-90">
        <FloralCluster width={220} flip/>
      </div>
    </div>
  </div>
));

// ============================================
// قسم الخريطة + QR
// ============================================
const buildQrSvg = (text, cellSize = 4) => {
  const QR = window.qrcode || window.QRCode;
  if (!QR) return '';
  // L = أدنى تصحيح خطأ لتوفير سعة أكبر للروابط الطويلة ، برموز أصغر
  const qr = QR(0, 'L');
  qr.addData(text);
  qr.make();
  return qr.createSvgTag({ cellSize, margin: 0, scalable: false });
};

const QrBlock = ({ size = 140 }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = buildQrSvg(INVITATION.mapsQrUrl || INVITATION.mapsUrl);
    const svg = ref.current.querySelector('svg');
    if (svg) {
      svg.setAttribute('width', String(size));
      svg.setAttribute('height', String(size));
    }
  }, [size]);
  return <div ref={ref} style={{ width: size, height: size }}/>;
};

const LocationSection = () => (
  <section className="container-narrow mt-10 reveal">
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-3 mb-3">
        <span className="h-px w-10 gold-line-light"/>
        <span className="text-[#8a6a2e] font-tajawal text-[11px]">الموقع</span>
        <span className="h-px w-10 gold-line-light"/>
      </div>
      <h3 className="font-amiri text-3xl text-[#2a241b]">{INVITATION.venue}</h3>
      <p className="font-tajawal text-sm text-[#4a4030] mt-1 leading-relaxed px-4">
        {INVITATION.addressLong}
      </p>
    </div>

    <div className="map-frame mb-5">
      <iframe
        src={INVITATION.mapEmbed}
        width="100%" height="240"
        style={{ border: 0, display: 'block' }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="موقع القاعة"
      ></iframe>
    </div>

    <a
      href={INVITATION.mapsUrl}
      target="_blank" rel="noopener noreferrer"
      className="btn-gold w-full rounded-full py-4 font-tajawal text-sm sm:text-base flex items-center justify-center gap-3">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
      افتح الموقع على Google Maps
    </a>

    <div className="mt-6 flex items-center gap-5 detail-block p-5">
      <div className="qr-frame shrink-0">
        <QrBlock size={130}/>
      </div>
      <div className="flex-1 text-right">
        <p className="font-amiri text-[#2a241b] text-lg leading-snug">
          امسح الرمز للوصول
        </p>
        <p className="font-tajawal text-[#4a4030] text-xs mt-1 leading-relaxed">
          وجّه كاميرا جوّالك على الرمز ليفتح موقع القاعة على خرائط Google.
        </p>
      </div>
    </div>
  </section>
);

// ============================================
// أزرار المشاركة
// ============================================
const buildWhatsAppText = () => {
  return `${INVITATION.welcome}
${INVITATION.groom} & ${INVITATION.bride}
${INVITATION.day} ${INVITATION.date}
${INVITATION.time}
${INVITATION.venue} – ${INVITATION.address}

رابط الدعوة:
${getSiteUrl()}

الموقع على Google Maps:
${INVITATION.mapsUrl}`;
};

const buildICS = () => {
  // VTIMEZONE لبغداد (UTC+3 طوال السنة، لا توقيت صيفي حالياً)
  const tz = `BEGIN:VTIMEZONE
TZID:Asia/Baghdad
BEGIN:STANDARD
DTSTART:19700101T000000
TZOFFSETFROM:+0300
TZOFFSETTO:+0300
TZNAME:AST
END:STANDARD
END:VTIMEZONE`;
  const desc = `${INVITATION.welcome}\\n${INVITATION.day} ${INVITATION.date} - ${INVITATION.time}\\n\\nرابط الدعوة: ${getSiteUrl()}\\nGoogle Maps: ${INVITATION.mapsUrl}`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ali Duaa Invitation//AR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    tz,
    'BEGIN:VEVENT',
    `UID:ali-duaa-${INVITATION.startISO}@invitation`,
    `DTSTAMP:${INVITATION.startISO}Z`,
    `DTSTART;TZID=Asia/Baghdad:${INVITATION.startISO}`,
    `DTEND;TZID=Asia/Baghdad:${INVITATION.endISO}`,
    `SUMMARY:حفل زفاف ${INVITATION.groom} و ${INVITATION.bride}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${INVITATION.venue} - ${INVITATION.addressLong}`,
    `URL:${INVITATION.mapsUrl}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
};

const ShareSection = ({ onExportDownload, onExportShare, onShowToast, exporting, sharing }) => {
  const onWhatsapp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(buildWhatsAppText())}`;
    window.open(url, '_blank', 'noopener');
  };

  const onCopy = async () => {
    const link = getSiteUrl();
    try {
      await navigator.clipboard.writeText(link);
      onShowToast('تم نسخ رابط الدعوة ✓');
    } catch {
      const ta = document.createElement('textarea');
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); onShowToast('تم نسخ رابط الدعوة ✓'); }
      catch { onShowToast('تعذّر النسخ'); }
      document.body.removeChild(ta);
    }
  };

  const onCalendar = () => {
    const ics = buildICS();
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Ali_Duaa_Invitation.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    onShowToast('تم تنزيل ملف التقويم ✓');
  };

  const buttons = [
    {
      label: exporting ? 'جاري التحضير…' : 'تحميل الدعوة كصورة',
      onClick: onExportDownload,
      disabled: exporting || sharing,
      primary: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      label: sharing ? 'جاري التحضير…' : 'مشاركة الدعوة كصورة',
      onClick: onExportShare,
      disabled: exporting || sharing,
      primary: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      label: 'مشاركة على واتساب',
      onClick: onWhatsapp,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 21l1.6-5A8.5 8.5 0 1 1 8 19.4L3 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M8.5 9.5c.5 2 2 3.5 4 4 .8.2 1.5-.2 2-.7l.5-.5 1.7 1c.3.2.4.5.3.8-.4 1.2-1.6 1.9-2.8 1.7-3-.4-5.5-2.9-5.9-5.9-.2-1.2.5-2.4 1.7-2.8.3-.1.6 0 .8.3l1 1.7-.5.5c-.5.5-.9 1.2-.7 2z" fill="currentColor" opacity="0.85"/>
        </svg>
      )
    },
    {
      label: 'إضافة إلى التقويم',
      onClick: onCalendar,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <circle cx="12" cy="14.5" r="1.5" fill="currentColor"/>
        </svg>
      )
    },
    {
      label: 'نسخ رابط الدعوة',
      onClick: onCopy,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
      )
    }
  ];

  return (
    <section className="container-narrow mt-10 mb-12 reveal">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 gold-line-light"/>
          <span className="text-[#8a6a2e] font-tajawal text-[11px]">مشاركة</span>
          <span className="h-px w-10 gold-line-light"/>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {buttons.map((b, i) => (
          <button
            key={i}
            onClick={b.onClick}
            disabled={b.disabled}
            className={`${b.primary ? 'btn-gold' : 'btn-ghost'} rounded-full py-4 px-5 font-tajawal text-sm sm:text-base flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-wait`}>
            {b.icon}
            <span>{b.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

// ============================================
// تذييل
// ============================================
const Footer = () => (
  <footer className="container-narrow pb-12 text-center reveal">
    <div className="flex items-center justify-center gap-3 mb-4">
      <span className="h-px w-20 gold-line-light"/>
      <RoseSeal size={32}/>
      <span className="h-px w-20 gold-line-light"/>
    </div>
    <p className="font-amiri text-[#8a6a2e] text-lg">
      حضوركم يُسعدنا ويُكمل فرحتنا
    </p>
    <p className="font-tajawal text-xs text-[#4a4030]/70 mt-3 tracking-wider">
      مع خالص الود — {INVITATION.groom} &amp; {INVITATION.bride}
    </p>
  </footer>);

// ============================================
// نسخة الكارت بمقاس 1080×1920 للتصدير (تتضمن QR)
// ============================================
const ExportCard = ({ qrSvg }) => (
  <div className="export-card" style={{
    width: EXPORT_WIDTH,
    height: EXPORT_HEIGHT,
    background: 'radial-gradient(ellipse at 50% 0%, rgba(216, 167, 160, 0.28), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(127, 138, 90, 0.18), transparent 55%), #f7f1e6',
    padding: 60,
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Tajawal', sans-serif",
    direction: 'rtl',
  }}>
    {/* إطارات ذهبية */}
    <div style={{ position: 'absolute', inset: 44, border: '2px solid rgba(184, 146, 74, 0.6)', borderRadius: 40, pointerEvents: 'none' }}/>
    <div style={{ position: 'absolute', inset: 56, border: '1px solid rgba(184, 146, 74, 0.35)', borderRadius: 32, pointerEvents: 'none' }}/>
    <div style={{ position: 'absolute', inset: 68, border: '1px solid rgba(184, 146, 74, 0.2)', borderRadius: 26, pointerEvents: 'none' }}/>

    {/* زخارف الزوايا */}
    <div style={{ position: 'absolute', top: 56, right: 56, width: 200, height: 200 }}><CornerOrnament/></div>
    <div style={{ position: 'absolute', top: 56, left: 56, width: 200, height: 200, transform: 'scaleX(-1)' }}><CornerOrnament/></div>
    <div style={{ position: 'absolute', bottom: 56, right: 56, width: 200, height: 200, transform: 'scaleY(-1)' }}><CornerOrnament/></div>
    <div style={{ position: 'absolute', bottom: 56, left: 56, width: 200, height: 200, transform: 'scale(-1,-1)' }}><CornerOrnament/></div>

    {/* المحتوى */}
    <div style={{
      position: 'relative',
      height: '100%',
      padding: '86px 86px 74px',
      boxSizing: 'border-box',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* باقة علوية */}
      <div style={{ marginBottom: 18, flexShrink: 0 }}>
        <FloralCluster width={300}/>
      </div>

      {/* البسملة */}
      <p style={{ fontFamily: "'Amiri', serif", fontSize: 48, color: '#8a6a2e', margin: 0, lineHeight: 1.45, flexShrink: 0 }}>
        {INVITATION.bismillah}
      </p>

      {/* ختم وردي */}
      <div style={{ margin: '22px 0', flexShrink: 0 }}>
        <RoseSeal size={66}/>
      </div>

      {/* عبارة الترحيب */}
      <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 25, color: '#4a4030', margin: '0 auto', maxWidth: 720, lineHeight: 1.55, flexShrink: 0 }}>
        {INVITATION.welcome}
      </p>

      {/* الأسماء */}
      <div style={{
        margin: '36px 0 24px',
        padding: '0 44px',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        {/* علي */}
        <div style={{
          fontFamily: "'Amiri', serif",
          fontSize: 154,
          color: '#2a241b',
          lineHeight: 1.28,
          fontWeight: 700,
          height: 214,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          textShadow: '0 0 1px rgba(184, 146, 74, 0.5), 0 4px 28px rgba(184, 146, 74, 0.28)'
        }}>
          {INVITATION.groom}
        </div>

        {/* فاصل مستقل بين الاسمين حتى لا يدخل داخل الحروف */}
        <div style={{
          height: 58,
          margin: '46px 0 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Amiri', serif",
            fontSize: 58,
            lineHeight: 1,
            color: '#b8924a',
            textShadow: '0 4px 18px rgba(184, 146, 74, 0.22)',
          }}>&amp;</span>
        </div>

        {/* دعاء */}
        <div style={{
          fontFamily: "'Amiri', serif",
          fontSize: 154,
          color: '#2a241b',
          lineHeight: 1.28,
          fontWeight: 700,
          height: 214,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'visible',
          textShadow: '0 0 1px rgba(184, 146, 74, 0.5), 0 4px 28px rgba(184, 146, 74, 0.28)'
        }}>
          {INVITATION.bride}
        </div>
      </div>

      {/* شريط أزهار */}
      <div style={{ width: '80%', marginBottom: 26, flexShrink: 0 }}>
        <FloralStrip/>
      </div>

      {/* التفاصيل */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 14, maxWidth: 760, width: '100%', flexShrink: 0 }}>
        {[
          { label: 'اليوم', big: INVITATION.day, small: '' },
          { label: 'التاريخ', big: '5', small: 'يونيو 2026' },
          { label: 'الوقت', big: '5:00', small: 'عصراً' },
        ].map((d, i) => (
          <div key={i} style={{
            border: '1px solid rgba(184, 146, 74, 0.4)',
            borderRadius: 18,
            minHeight: 130,
            padding: '18px 12px',
            background: 'linear-gradient(180deg, rgba(255,252,244,0.7), rgba(247,241,230,0.4))',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 22, color: '#8a6a2e', marginBottom: 8 }}>
              {d.label}
            </div>
            <div style={{ fontFamily: "'Amiri', serif", fontSize: 42, color: '#2a241b', lineHeight: 1 }}>{d.big}</div>
            {d.small && <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 18, color: '#4a4030', marginTop: 6 }}>{d.small}</div>}
          </div>
        ))}
      </div>

      {/* المكان + QR — صف أفقي */}
      <div style={{
        marginTop: 30,
        paddingTop: 22,
        borderTop: '1px solid rgba(184, 146, 74, 0.3)',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 232px',
        alignItems: 'center',
        gap: 34,
        direction: 'ltr',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}>
        {/* المكان */}
        <div style={{ minWidth: 0, textAlign: 'right', direction: 'rtl' }}>
          <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 22, color: '#8a6a2e', marginBottom: 8 }}>
            المكان
          </div>
          <div style={{ fontFamily: "'Amiri', serif", fontSize: 44, color: '#2a241b', lineHeight: 1.18, overflowWrap: 'break-word' }}>
            {INVITATION.venue}
          </div>
          <div style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 20, color: '#4a4030', marginTop: 8, lineHeight: 1.45, overflowWrap: 'break-word' }}>
            {INVITATION.addressLong}
          </div>
        </div>

        {/* QR */}
        <div style={{ width: 232, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, direction: 'rtl' }}>
          <div className="qr-export-box" style={{
            background: '#fff',
            padding: 12,
            borderRadius: 14,
            border: '1px solid rgba(184, 146, 74, 0.4)',
            boxShadow: '0 8px 22px -10px rgba(138, 106, 46, 0.4)',
            width: 212,
            height: 212,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            <div
              style={{ width: 188, height: 188, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              dangerouslySetInnerHTML={{
                __html: fitQrSvg(qrSvg, 188)
              }}
            />
          </div>
          <p style={{ fontFamily: "'Tajawal', sans-serif", fontSize: 16, color: '#8a6a2e', margin: 0, maxWidth: 220, lineHeight: 1.35 }}>
            امسح للوصول إلى القاعة
          </p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// التطبيق
// ============================================
const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [toast, setToast] = useState({ msg: '', show: false });
  const [exporting, setExporting] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [qrSvg, setQrSvg] = useState('');
  const exportRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2400);
  }, []);

  // كشف العناصر عند التمرير + fallback
  useEffect(() => {
    if (showIntro) return;
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
    els.forEach(el => io.observe(el));
    const t = setTimeout(() => {
      els.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 100));
    }, 500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [showIntro]);

  // توليد QR للتصدير
  useEffect(() => {
    const url = INVITATION.mapsQrUrl || INVITATION.mapsUrl;
    const QR = window.qrcode || window.QRCode;
    if (QR) {
      setQrSvg(buildQrSvg(url, 6));
    } else {
      const t = setTimeout(() => {
        const Q = window.qrcode || window.QRCode;
        if (Q) setQrSvg(buildQrSvg(url, 6));
      }, 500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleIntroDone = useCallback(() => {
    setShowIntro(false);
    requestAnimationFrame(() => {
      setTimeout(() => {
        const card = document.getElementById('card-anchor');
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    });
  }, []);

  // التقاط البطاقة كصورة 1080×1920
  const captureCanvas = async () => {
    if (!window.html2canvas) throw new Error('html2canvas غير محمّلة');
    const stage = exportRef.current;
    if (!stage) throw new Error('export stage missing');

    // تأكد من توليد QR قبل التصدير
    if (!qrSvg) {
      const QR = window.qrcode || window.QRCode;
      if (QR) {
        const svg = buildQrSvg(INVITATION.mapsQrUrl || INVITATION.mapsUrl, 6);
        setQrSvg(svg);
        // انتظر دورة عرض حتى يحدّث React الـ DOM
        await new Promise(r => requestAnimationFrame(() => r()));
        await new Promise(r => requestAnimationFrame(() => r()));
      }
    }

    // انتظر تحميل الخطوط
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) { /* ignore */ }
    }
    // أعطِ وقتاً للرسم
    await new Promise(r => setTimeout(r, 300));

    const canvas = await window.html2canvas(stage, {
      backgroundColor: EXPORT_BACKGROUND,
      scale: 1,
      useCORS: true,
      logging: false,
      width: EXPORT_WIDTH,
      height: EXPORT_HEIGHT,
      windowWidth: EXPORT_WIDTH,
      windowHeight: EXPORT_HEIGHT,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      removeContainer: true,
      onclone: (doc) => {
        const clonedStage = doc.querySelector('.export-stage');
        if (!clonedStage) return;
        Object.assign(clonedStage.style, {
          position: 'fixed',
          top: '0',
          left: '0',
          width: `${EXPORT_WIDTH}px`,
          height: `${EXPORT_HEIGHT}px`,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: '0',
          transform: 'none',
        });
      },
    });
    return normalizeExportCanvas(canvas);
  };

  const normalizeExportCanvas = (canvas) => {
    if (canvas.width === EXPORT_WIDTH && canvas.height === EXPORT_HEIGHT) {
      return canvas;
    }
    const normalized = document.createElement('canvas');
    normalized.width = EXPORT_WIDTH;
    normalized.height = EXPORT_HEIGHT;
    const ctx = normalized.getContext('2d');
    ctx.fillStyle = EXPORT_BACKGROUND;
    ctx.fillRect(0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);
    ctx.drawImage(canvas, 0, 0, EXPORT_WIDTH, EXPORT_HEIGHT);
    return normalized;
  };

  const canvasToBlob = (canvas) =>
    new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob); else reject(new Error('blob failed'));
      }, 'image/png', 0.95);
    });

  const downloadBlob = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleExportDownload = async () => {
    setExporting(true);
    try {
      const canvas = await captureCanvas();
      const blob = await canvasToBlob(canvas);
      downloadBlob(blob, 'Ali_Duaa_Invitation.png');
      showToast('تم حفظ الدعوة بنجاح ✓');
    } catch (e) {
      console.error(e);
      showToast('تعذّر تصدير الصورة');
    } finally {
      setExporting(false);
    }
  };

  const handleExportShare = async () => {
    setSharing(true);
    try {
      const canvas = await captureCanvas();
      const blob = await canvasToBlob(canvas);
      const file = new File([blob], 'Ali_Duaa_Invitation.png', { type: 'image/png' });
      const shareData = {
        title: `دعوة زفاف ${INVITATION.groom} و ${INVITATION.bride}`,
        text: buildWhatsAppText(),
        files: [file]
      };
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share(shareData);
          showToast('تمت المشاركة ✓');
        } catch (e) {
          if (e && e.name !== 'AbortError') {
            // fallback download
            downloadBlob(blob, 'Ali_Duaa_Invitation.png');
            showToast('تم تنزيل الصورة');
          }
        }
      } else {
        // الجهاز لا يدعم Web Share — حمّل الصورة كـ fallback
        downloadBlob(blob, 'Ali_Duaa_Invitation.png');
        showToast('تم تنزيل الصورة (المشاركة غير مدعومة)');
      }
    } catch (e) {
      console.error(e);
      showToast('تعذّرت المشاركة');
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="paper-bg min-h-screen relative">
      {!showIntro && <Petals count={10}/>}
      {showIntro && <Intro onDone={handleIntroDone}/>}

      <main className={`relative z-10 transition-opacity duration-700 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <div id="card-anchor"></div>

        <div className="container-narrow pt-10 pb-2 text-center reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 gold-line-light"/>
            <span className="font-tajawal text-[10px] tracking-widest text-[#8a6a2e]">WEDDING INVITATION</span>
            <span className="h-px w-12 gold-line-light"/>
          </div>
        </div>

        <div className="container-narrow reveal">
          <InviteCard/>
          <div className="mt-6 flex flex-col items-center gap-2 opacity-80">
            <div className="scroll-cue"></div>
            <span className="text-[10px] font-tajawal text-[#8a6a2e]/70">تابِع للأسفل</span>
          </div>
        </div>

        <LocationSection/>
        <ShareSection
          onExportDownload={handleExportDownload}
          onExportShare={handleExportShare}
          onShowToast={showToast}
          exporting={exporting}
          sharing={sharing}/>
        <Footer/>
      </main>

      {/* مسرح التصدير — يبقى داخل المستند بـ visibility:hidden ليلتقطه html2canvas */}
      <div className="export-stage" ref={exportRef} aria-hidden="true">
        <ExportCard qrSvg={qrSvg}/>
      </div>

      <Toast msg={toast.msg} show={toast.show}/>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
