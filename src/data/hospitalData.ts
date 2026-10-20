export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: 'surgery' | 'endoscopy' | 'clinical' | 'diagnostic';
  categoryLabel: string;
  featured?: boolean;
  shortDesc: string;
  clinicalDetail: string;
  prepNote: string;
  availability: string;
  commonSymptoms: string[];
  equipmentUsed: string;
  recoveryOrTurnaround: string;
  iconName:
    | 'scalpel'
    | 'kidney'
    | 'endoscope'
    | 'colon'
    | 'stethoscope'
    | 'maternity'
    | 'pediatrics'
    | 'microscope';
}

export interface DoctorItem {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  departmentName: string;
  experience: string;
  completedCases: string;
  schedule: string;
  education: string;
  bio: string;
  procedures: string[];
  photoUrl: string;
  fallbackSvgDataUri: string;
}

export interface WhyUsItem {
  id: string;
  index: string;
  title: string;
  metric: string;
  description: string;
  highlights: string[];
}

export interface FacilitySlide {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  imageUrl: string;
  fallbackSvgDataUri: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const createSvgDataUri = (svgString: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;

export const HERO_FACILITY_SLIDES: FacilitySlide[] = [
  {
    id: 'surgical-suite',
    title: 'اتاق‌های عملیات استندرد و بخش جراحی لاپراسکوپی',
    subtitle:
      'مجهز به سیستم‌های تصویربرداری فول‌اچ‌دی، دستگاه بیهوشی مدرن و سیستم تصفیه و استریلیزاسیون هوا',
    badgeText: 'جراحی کم‌تهاجمی · استریلیزاسیون ۱۰۰٪',
    imageUrl:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="55%" stop-color="#134e4a" />
            <stop offset="100%" stop-color="#0f766e" />
          </linearGradient>
          <linearGradient id="card1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#f0fdfa" stop-opacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="1200" height="750" fill="url(#bg1)" />
        <circle cx="980" cy="140" r="240" fill="#2dd4bf" opacity="0.15" />
        <circle cx="200" cy="600" r="280" fill="#38bdf8" opacity="0.12" />
        <rect x="90" y="80" width="1020" height="590" rx="32" fill="url(#card1)" />
        <rect x="140" y="135" width="460" height="480" rx="22" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
        <circle cx="370" cy="245" r="56" fill="#e0f2fe" stroke="#0284c7" stroke-width="4" />
        <circle cx="370" cy="245" r="20" fill="#0d9488" />
        <rect x="220" y="340" width="300" height="54" rx="12" fill="#0f766e" />
        <path d="M 210 445 L 530 445" stroke="#94a3b8" stroke-width="3" stroke-linecap="round" />
        <path d="M 210 485 L 480 485" stroke="#cbd5e1" stroke-width="3" stroke-linecap="round" />
        <rect x="640" y="135" width="420" height="225" rx="22" fill="#f0fdfa" stroke="#99f6e4" stroke-width="2" />
        <path d="M 680 265 L 755 265 L 780 215 L 805 305 L 835 195 L 865 285 L 890 250 L 1010 250" fill="none" stroke="#0d9488" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="640" y="390" width="420" height="225" rx="22" fill="#ffffff" stroke="#e2e8f0" stroke-width="2" />
        <circle cx="730" cy="502" r="54" fill="#ccfbf1" />
        <path d="M 708 502 L 724 518 L 756 486" fill="none" stroke="#0f766e" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
        <rect x="810" y="465" width="200" height="20" rx="10" fill="#0f172a" opacity="0.8" />
        <rect x="810" y="505" width="150" height="14" rx="7" fill="#0d9488" opacity="0.7" />
      </svg>
    `),
  },
  {
    id: 'endoscopy-unit',
    title: 'واحد تخصصی اندوسکوپی، کولونوسکوپی و اندویورولوژی',
    subtitle:
      'تشخیص و تداوی بدون جراحی باز با کمره‌های دیجیتال با وضاحت بالا و دستگاه‌های ضدعفونی اتوماتیک',
    badgeText: 'تشخیص دقیق · بدون درد و برش جراحی',
    imageUrl:
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0c4a6e" />
            <stop offset="100%" stop-color="#0f766e" />
          </linearGradient>
        </defs>
        <rect width="1200" height="750" fill="url(#bg2)" />
        <rect x="110" y="95" width="980" height="560" rx="30" fill="#f8fafc" />
        <rect x="160" y="150" width="520" height="360" rx="20" fill="#0f172a" />
        <circle cx="420" cy="330" r="110" fill="#134e4a" stroke="#2dd4bf" stroke-width="4" />
        <path d="M 360 330 Q 420 260 480 330 Q 420 400 360 330 Z" fill="#14b8a6" opacity="0.6" />
        <rect x="720" y="150" width="320" height="440" rx="20" fill="#f0fdfa" stroke="#99f6e4" stroke-width="2" />
        <rect x="760" y="200" width="240" height="24" rx="12" fill="#0f766e" />
        <rect x="760" y="250" width="190" height="16" rx="8" fill="#64748b" opacity="0.5" />
        <rect x="760" y="290" width="210" height="16" rx="8" fill="#64748b" opacity="0.4" />
      </svg>
    `),
  },
  {
    id: 'diagnostic-lab',
    title: 'لابراتوار دیجیتال، سونوگرافی و پذیرش ۲۴ ساعته',
    subtitle:
      'انجام معاینات بیوشیمی، هورمونی، هماتولوژی و رادیولوژی دیجیتال با جواب‌دهی دقیق و سریع',
    badgeText: 'خدمات ۲۴ ساعته · جواب‌دهی سریع',
    imageUrl:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#115e59" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="1200" height="750" fill="url(#bg3)" />
        <rect x="110" y="95" width="980" height="560" rx="30" fill="#ffffff" />
        <circle cx="400" cy="375" r="160" fill="#f0fdfa" stroke="#0d9488" stroke-width="5" />
        <rect x="375" y="260" width="50" height="140" rx="12" fill="#0f766e" />
        <path d="M 320 440 L 480 440" stroke="#0f172a" stroke-width="10" stroke-linecap="round" />
        <rect x="620" y="190" width="400" height="370" rx="22" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" />
        <rect x="665" y="245" width="310" height="24" rx="12" fill="#0f766e" />
        <rect x="665" y="295" width="250" height="16" rx="8" fill="#475569" opacity="0.6" />
        <rect x="665" y="335" width="280" height="16" rx="8" fill="#475569" opacity="0.4" />
      </svg>
    `),
  },
];

export const HERO_IMAGE = {
  url: HERO_FACILITY_SLIDES[0].imageUrl,
  alt: 'نمای داخلی شفاخانه تخصصی رایان دانش با تجهیزات مدرن طبی و محیط پاک استندرد در کابل',
  fallbackSvgDataUri: HERO_FACILITY_SLIDES[0].fallbackSvgDataUri,
};

const createDoctorPortraitSvg = (
  primaryColor: string,
  bgTint: string,
  isFemale: boolean
): string =>
  createSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
      <defs>
        <linearGradient id="docBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${bgTint}" />
          <stop offset="100%" stop-color="#e2e8f0" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#docBg)" />
      <circle cx="480" cy="110" r="110" fill="${primaryColor}" opacity="0.08" />
      <circle cx="110" cy="490" r="140" fill="${primaryColor}" opacity="0.06" />
      <!-- Shoulders / White Medical Coat -->
      <path d="M 110 600 C 115 445 200 395 300 395 C 400 395 485 445 490 600 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="3" />
      <!-- Inner Scrubs / Attire -->
      <path d="M 245 398 L 300 520 L 355 398 Z" fill="${primaryColor}" />
      <!-- Coat Lapels -->
      <path d="M 225 402 L 285 555 L 300 520 L 245 398 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      <path d="M 375 402 L 315 555 L 300 520 L 355 398 Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2" />
      <!-- Stethoscope -->
      <path d="M 215 415 C 205 490 245 535 280 535" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
      <path d="M 385 415 C 395 485 370 525 345 525" fill="none" stroke="#0f172a" stroke-width="6" stroke-linecap="round" />
      <circle cx="345" cy="528" r="16" fill="#0f766e" stroke="#ffffff" stroke-width="3" />
      ${
        isFemale
          ? `
        <path d="M 190 250 C 190 145 240 115 300 115 C 360 115 410 145 410 250 C 410 345 385 415 300 425 C 215 415 190 345 190 250 Z" fill="${primaryColor}" />
        <ellipse cx="300" cy="255" rx="74" ry="88" fill="#f1d5be" />
      `
          : `
        <rect x="268" y="330" width="64" height="75" rx="20" fill="#e6c2a6" />
        <ellipse cx="300" cy="245" rx="82" ry="98" fill="#eccab0" />
        <path d="M 218 225 C 218 145 255 128 300 128 C 345 128 382 145 382 225 C 368 185 335 170 300 170 C 265 170 232 185 218 225 Z" fill="#1e293b" />
      `
      }
      <path d="M 262 238 Q 275 230 286 238" fill="none" stroke="#334155" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 314 238 Q 325 230 338 238" fill="none" stroke="#334155" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 278 292 Q 300 308 322 292" fill="none" stroke="#475569" stroke-width="3.5" stroke-linecap="round" />
      <rect x="368" y="485" width="46" height="30" rx="5" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" />
      <path d="M 380 500 L 402 500" stroke="#0369a1" stroke-width="3" stroke-linecap="round" />
    </svg>
  `);

export const HOSPITAL_INFO = {
  name: 'شفاخانه تخصصی رایان دانش',
  tagline: 'تداوی تخصصی، با اعتماد',
  address: 'جاده عمومی برچی، ایستگاه مدرسه، کابل، افغانستان',
  shortAddress: 'جاده عمومی برچی، ایستگاه مدرسه، کابل',
  phonePrimary: '0799088811',
  phoneSecondary: '0799090098',
  whatsappNumber: '93799088811',
  whatsappBaseUrl: 'https://wa.me/93799088811',
  workingHours: {
    emergency: 'بخش عاجل، لابراتوار و فارمسی: ۲۴ ساعته در تمام روزهای هفته',
    clinics: 'معاینه‌خانه‌های تخصصی: شنبه الی پنجشنبه، ۰۸:۰۰ صبح الی ۰۸:۰۰ شام',
    friday: 'روزهای جمعه: بخش عاجل، نسایی ولادی و خدمات تشخیصیه فعال است',
  },
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'laparoscopy',
    index: '01',
    title: 'لاپراسکوپی',
    category: 'surgery',
    categoryLabel: 'جراحی کم‌تهاجمی پیشرفته',
    featured: true,
    shortDesc:
      'انجام عملیات‌های جراحی بطنی (کیسه صفرا، اپندیکس، فتق و کیست‌ها) با کمره پیشرفته و بدون باز کردن کامل شکم، همراه با درد کمتر و بهبودی سریع.',
    clinicalDetail:
      'در بخش جراحی لاپراسکوپی شفاخانه رایان دانش، عملیات‌ها با سیستم تصویربرداری فول‌اچ‌دی از طریق منافذ بسیار کوچک (نیم سانتی‌متر) انجام می‌شود که خطر عفونت را به حداقل رسانده و مریض در عرض ۲۴ تا ۴۸ ساعت مرخص می‌گردد.',
    prepNote: 'ناشتا بودن ۸ ساعت قبل از عملیات و انجام معاینات خون و قلب الزامی است.',
    availability: 'شنبه الی پنجشنبه · ۰۸:۰۰ صبح الی ۰۶:۰۰ عصر (عاجل ۲۴ ساعته)',
    commonSymptoms: [
      'دردهای شدید یا مکرر کیسه صفرا و سنگ صفراوی',
      'التهاب حاد اپندیکس (اپندیسیت)',
      'فتق‌های شکمی و مغبنی (Hernia)',
      'کیست‌های تخمدان و توده‌های بطنی',
    ],
    equipmentUsed: 'تاور لاپراسکوپی دیجیتال Full-HD با پمپ اتوماتیک CO2 و الکتروکوتر پیشرفته',
    recoveryOrTurnaround: 'ترخیص معمولاً ظرف ۲۴ ساعت پس از عملیات',
    iconName: 'scalpel',
  },
  {
    id: 'endourology',
    index: '02',
    title: 'اندویورولوژی',
    category: 'surgery',
    categoryLabel: 'جراحی بسته گرده و مجاری ادرار',
    featured: true,
    shortDesc:
      'تشخیص و تداوی تخصصی سنگ‌های گرده، حالب و مثانه و بزرگی پروستات با روش‌های مدرن درون‌بین (لیزر و اندوسکوپیک) بدون نیاز به برش جراحی.',
    clinicalDetail:
      'با استفاده از یورتروسکوپ، نفروسکوپ و سیستوسکوپ پیشرفته، سنگ‌های گرده و مجاری ادرار بدون هیچ‌گونه برش پوستی شکستانده و خارج می‌شوند و بزرگی پروستات به روش بسته (TURP) تداوی می‌گردد.',
    prepNote: 'همراه داشتن سونوگرافی یا ایکسری قبلی گرده و مثانه هنگام مراجعه.',
    availability: 'شنبه الی پنجشنبه · ۰۸:۰۰ صبح الی ۰۵:۰۰ عصر',
    commonSymptoms: [
      'سنگ‌های گرده، حالب و مثانه همراه با درد پهلو',
      'بزرگی پروستات و مشکل در دفع ادرار در مردان مسن',
      'سوزش، تکرر یا مشاهده خون در ادرار',
      'تنگی مجرای ادرار و عفونت‌های مکرر بولی',
    ],
    equipmentUsed: 'سیستم سنگ‌شکن درون‌بین، یورتروسکوپ ظریف و ست کامل TURP',
    recoveryOrTurnaround: 'برگشت سریع به فعالیت عادی در ۱ الی ۲ روز',
    iconName: 'kidney',
  },
  {
    id: 'endoscopy',
    index: '03',
    title: 'اندوسکوپی',
    category: 'endoscopy',
    categoryLabel: 'تشخیص و تداوی گوارشی فوقانی',
    shortDesc:
      'معاینه دقیق و بدون درد مری، معده و اثنی‌عشر با کمره‌های ویدیویی دیجیتال جهت تشخیص زخم معده، التهابات، خون‌ریزی‌ها و نمونه‌برداری.',
    clinicalDetail:
      'اندوسکوپی ویدیویی با لوله بسیار نرم و انعطاف‌پذیر همراه با بی‌حسی موضعی یا آرام‌بخش خفیف انجام شده و تمام مراحل روی مانیتور با وضاحت بالا ثبت و گزارش فوری ارائه می‌گردد.',
    prepNote: 'ناشتا بودن کامل (نخوردن غذا و آب) حداقل ۶ الی ۸ ساعت قبل از معاینه.',
    availability: 'همه‌روزه · ۰۸:۰۰ صبح الی ۰۴:۰۰ عصر',
    commonSymptoms: [
      'سوزش سر دل، ترش کردن و درد مداوم معده',
      'مشکل یا درد هنگام بلعیدن غذا',
      'تهوع مداوم، کم‌خونی یا مشکوک بودن به میکروب معده (H. Pylori)',
      'کنترول و بند ساختن خون‌ریزی‌های گوارشی',
    ],
    equipmentUsed: 'ویدیو اندوسکوپ دیجیتال HD به همراه دستگاه شستشو و ضدعفونی اتوماتیک',
    recoveryOrTurnaround: 'دریافت گزارش و نتیجه بلافاصله پس از معاینه (۱۵ دقیقه)',
    iconName: 'endoscope',
  },
  {
    id: 'colonoscopy',
    index: '04',
    title: 'کولونوسکوپی',
    category: 'endoscopy',
    categoryLabel: 'بررسی تخصصی روده کلان',
    shortDesc:
      'بررسی کامل و تخصصی روده کلان برای تشخیص پولیپ‌ها، التهابات مزمن روده، بواسیر و علت خون‌ریزی‌های گوارشی با آرام‌بخش مصئون.',
    clinicalDetail:
      'تشخیص زودهنگام پولیپ‌ها و توده‌های روده کلان، نمونه‌برداری دقیق (بیوپسی) و برداشتن پولیپ‌ها در همان جلسه بدون نیاز به جراحی باز، با رعایت کامل محرمیت و آرامش مریض.',
    prepNote: 'نیاز به پاک‌سازی روده با دوای مخصوص از روز قبل طبق دستور داکتر.',
    availability: 'شنبه الی پنجشنبه · با تعیین نوبت قبلی',
    commonSymptoms: [
      'خون‌ریزی مقعدی یا وجود خون در مواد غایطه',
      'قبضیت مزمن یا اسهالات طولانی‌مدت بدون علت مشخص',
      'دردهای مزمن بطنی و کاهش وزن ناگهانی',
      'بررسی پولیپ‌ها و التهاب روده (کولیت)',
    ],
    equipmentUsed: 'ویدیو کولونوسکوپ پیشرفته با قابلیت پولیپکتومی (برداشتن پولیپ)',
    recoveryOrTurnaround: 'استراحت کوتاه ۳۰ دقیقه‌ای و دریافت گزارش کامل تصویری',
    iconName: 'colon',
  },
  {
    id: 'internal-medicine',
    index: '05',
    title: 'داخله عمومی',
    category: 'clinical',
    categoryLabel: 'کلینیک تخصصی و بخش بستری',
    shortDesc:
      'تشخیص، کنترول و تداوی امراض شکر، فشار خون، امراض معده و جگر، مشکلات تنفسی، کم‌خونی، تیروئید و عفونت‌های سیستمیک در بزرگسالان.',
    clinicalDetail:
      'مدیریت علمی و دوامدار امراض مزمن، تنظیم دقیق نسخه‌های دوایی برای جلوگیری از تداخل دواها، و بخش بستری مجهز با مراقبت ۲۴ ساعته نرس‌های ورزیده و داکتران نوکریوال.',
    prepNote: 'نسخه‌های قبلی، نتایج معاینات و دواهای فعلی خود را همراه داشته باشید.',
    availability: 'همه‌روزه · ۰۸:۰۰ صبح الی ۰۸:۰۰ شام',
    commonSymptoms: [
      'کنترول شکر خون (دیابت) و فشار خون بالا یا نوسانی',
      'سرفه‌های مزمن، تنگی نفس، آسم و عفونت‌های سینه',
      'امراض جگر (زردی، چربی جگر)، معده و کم‌خونی‌ها',
      'امراض تیروئید، دردهای مفصلی و تب‌های شدید',
    ],
    equipmentUsed: 'مانیتورهای علایم حیاتی، دستگاه نوار قلب (ECG)، نیبولایزر و بخش بستری مجهز',
    recoveryOrTurnaround: 'معاینه دقیق حضوری و تنظیم پلان تداوی اختصاصی',
    iconName: 'stethoscope',
  },
  {
    id: 'obgyn',
    index: '06',
    title: 'نسایی و ولادی',
    category: 'clinical',
    categoryLabel: 'مراقبت‌های مادر و نوزاد (کادر زنانه)',
    shortDesc:
      'مراقبت‌های منظم دوران بارداری، ولادت طبیعی مصئون و سزارین، تداوی امراض نسایی و نازایی در محیط کاملاً زنانه زیر نظر متخصصین مجرب خانم.',
    clinicalDetail:
      'بخش نسایی و ولادی شفاخانه رایان دانش در فضایی کاملاً محرم و اختصاصی با حضور ۲۴ ساعته داکتران متخصص خانم و قابله‌های مجرب، خدمات مراقبت بارداری پرخطر، ولادت بدون درد، سزارین و جراحی‌های نسایی را ارائه می‌دهد.',
    prepNote: 'مراقبت‌های عاجل ولادی و اتاق ولادت ۲۴ ساعته در تمام روزها فعال است.',
    availability: '۲۴ ساعته در ۷ روز هفته',
    commonSymptoms: [
      'چک‌آپ ماهوار دوران حاملگی و سونوگرافی سلامت جنین',
      'ولادت طبیعی مصئون و عملیات سزارین',
      'مشاوره و تداوی نازایی و اختلالات هورمونی بانوان',
      'تداوی عفونت‌ها، فیبروم و کیست‌های نسایی',
    ],
    equipmentUsed: 'مانیتور قلب جنین (CTG)، اتاق ولادت و عملیات استندرد، سونوگرافی تخصصی',
    recoveryOrTurnaround: 'مراقبت ۲۴ ساعته مادر و نوزاد در اتاق‌های خصوصی و پاک',
    iconName: 'maternity',
  },
  {
    id: 'pediatrics',
    index: '07',
    title: 'اطفال',
    category: 'clinical',
    categoryLabel: 'صحت نوزادان و کودکان',
    shortDesc:
      'معاینه تخصصی نوزادان و اطفال، تداوی زردی نوزادی، عفونت‌های تنفسی و گوارشی، بررسی رشد و تغذیه کودک با برخورد مهربانانه.',
    clinicalDetail:
      'رسیدگی دقیق به امراض نوزادان از بدو تولد الی نوجوانی، پایش منحنی رشد و وزن، مشاوره تغذیه با شیر مادر، و تداوی زردی نوزادان با دستگاه‌های فوتوتراپی استندرد.',
    prepNote: 'کارت واکسین و سوابق طبی کودک را هنگام مراجعه همراه داشته باشید.',
    availability: 'همه‌روزه · ۰۸:۰۰ صبح الی ۰۸:۰۰ شام (عاجل ۲۴ ساعته)',
    commonSymptoms: [
      'زردی نوزادان و مشکلات تغذیه در ماه‌های اول تولد',
      'تب، سرفه، سینه‌بغل و حساسیت‌های فصلی کودکان',
      'اسهال، استفراغ و کم‌آبی بدن در اطفال',
      'کاهش وزن، کم‌خونی و بررسی رشد قد و وزن کودک',
    ],
    equipmentUsed: 'انکوباتور نوزادان، دستگاه‌های فوتوتراپی LED، پالس‌اکسی‌متر مخصوص نوزاد',
    recoveryOrTurnaround: 'معاینه با حوصله‌مندی و راهنمایی کامل والدین',
    iconName: 'pediatrics',
  },
  {
    id: 'lab-radiology',
    index: '08',
    title: 'لابراتوار و رادیولوژی',
    category: 'diagnostic',
    categoryLabel: 'تشخیصیه دقیق ۲۴ ساعته',
    shortDesc:
      'انجام تمام معاینات خون، بیوشیمی، هورمونی، کشت میکروبی، التراساوند (سونوگرافی) رنگی و ایکسری دیجیتال با دستگاه‌های اتوماتیک و جواب‌دهی سریع.',
    clinicalDetail:
      'لابراتوار شفاخانه تخصصی رایان دانش با استفاده از انالایزرهای تمام‌اتوماتیک و ریجنت‌های باکیفیت، نتایج دقیق معاینات خون، هورمون، تیروئید، شکر، چربی و عفونت‌ها را در کوتاه‌ترین زمان آماده می‌سازد.',
    prepNote: 'برای معاینات شکر ناشتا (FBS) و چربی خون (Lipid Profile) ۱۰ تا ۱۲ ساعت ناشتا باشید.',
    availability: '۲۴ ساعته · تحویل فوری نتایج عاجل',
    commonSymptoms: [
      'معاینات کامل چک‌آپ عمومی، کم‌خونی، شکر، چربی و وظایف گرده و جگر',
      'معاینات هورمونی، تیروئید، ویتامین D و تست‌های بارداری',
      'التراساوند (سونوگرافی) بطنی، حوصلی، بارداری و داپلر رنگی',
      'ایکسری دیجیتال قفسه سینه، استخوان‌ها و مفاصل',
    ],
    equipmentUsed: 'انالایزرهای اتوماتیک بیوشیمی، الایزا/هورمونی، هماتولوژی و سونوگرافی دیجیتال',
    recoveryOrTurnaround: 'نتایج عاجل در کمتر از ۴۵ دقیقه · نتایج روتین در همان روز',
    iconName: 'microscope',
  },
];

export const DOCTORS: DoctorItem[] = [
  {
    id: 'dr-rahimi',
    name: 'داکتر احمد رشاد رحیمی',
    specialty: 'متخصص جراحی عمومی و لاپراسکوپی پیشرفته',
    departmentId: 'laparoscopy',
    departmentName: 'لاپراسکوپی',
    experience: '۱۴ سال سابقه تخصصی',
    completedCases: 'بیش از ۲٬۸۰۰ عملیات موفق لاپراسکوپی و جراحی عمومی',
    schedule: 'شنبه الی پنجشنبه · ۰۸:۳۰ صبح الی ۰۴:۳۰ عصر',
    education: 'متخصص جراحی عمومی و دوره تکمیلی جراحی لاپراسکوپی پیشرفته',
    bio: 'متخصص با تجربه در جراحی‌های بسته کیسه صفرا، فتق، اپندیکس و جراحی‌های جهاز هاضمه با تمرکز بر کاهش درد پس از عملیات و بهبودی سریع مریضان.',
    procedures: [
      'جراحی لاپراسکوپیک کیسه صفرا (کوله سیستکتومی)',
      'جراحی بسته اپندیکس و فتق‌های شکمی',
      'جراحی‌های تیروئید و توده‌های نسج نرم',
      'جراحی‌های دستگاه گوارش و مقعد (بواسیر و شقاق)',
    ],
    photoUrl:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createDoctorPortraitSvg('#0f766e', '#f0fdfa', false),
  },
  {
    id: 'dr-hosseini',
    name: 'داکتر مریم سادات حسینی',
    specialty: 'متخصص نسایی، ولادی و بارداری‌های پرخطر',
    departmentId: 'obgyn',
    departmentName: 'نسایی و ولادی',
    experience: '۱۲ سال سابقه تخصصی',
    completedCases: 'بیش از ۳٬۵۰۰ مراقبت بارداری، ولادت مصئون و جراحی نسایی',
    schedule: 'شنبه الی پنجشنبه · ۰۸:۰۰ صبح الی ۰۵:۰۰ عصر',
    education: 'متخصص نسایی و ولادی و سونوگرافی تخصصی بارداری',
    bio: 'ارائه‌دهنده مراقبت‌های کامل دوران حاملگی، تداوی نازایی، جراحی‌های نسایی و ولادت‌های طبیعی و سزارین در محیط کاملاً مصئون و آرام.',
    procedures: [
      'مراقبت‌های تخصصی بارداری‌های پرخطر و سونوگرافی جنین',
      'انجام ولادت طبیعی مصئون و عملیات سزارین استندرد',
      'تشخیص و تداوی نازایی و اختلالات هورمونی بانوان',
      'جراحی‌های نسایی، کیست تخمدان و فیبروم رحم',
    ],
    photoUrl:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createDoctorPortraitSvg('#0d9488', '#f0fdfa', true),
  },
  {
    id: 'dr-mousavi',
    name: 'داکتر سید فرهاد موسوی',
    specialty: 'متخصص یورولوژی، اندویورولوژی و اندوسکوپی',
    departmentId: 'endourology',
    departmentName: 'اندویورولوژی',
    experience: '۱۱ سال سابقه تخصصی',
    completedCases: 'بیش از ۱٬۹۰۰ عملیات درون‌بین سنگ گرده و پروستات',
    schedule: 'شنبه الی پنجشنبه · ۰۹:۰۰ صبح الی ۰۵:۰۰ عصر',
    education: 'متخصص جراحی کلیه و مجاری ادرار (اندویورولوژی)',
    bio: 'متخصص در تداوی بدون برش سنگ‌های گرده، حالب و مثانه و تداوی امراض پروستات و سیستم تناسلی و بولی با تجهیزات مدرن درون‌بین.',
    procedures: [
      'شکستاندن درون‌بین سنگ‌های گرده، حالب و مثانه (TUL / PCNL)',
      'جراحی بسته بزرگی پروستات بدون برش پوستی (TURP)',
      'سیستوسکوپی تشخیصی و تداوی تنگی مجرای ادرار',
      'تداوی عفونت‌های مزمن بولی و مشکلات کلیوی',
    ],
    photoUrl:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createDoctorPortraitSvg('#0369a1', '#f0f9ff', false),
  },
  {
    id: 'dr-akbari',
    name: 'داکتر فرشته اکبری',
    specialty: 'متخصص امراض داخله و صحت اطفال و نوزادان',
    departmentId: 'pediatrics',
    departmentName: 'اطفال',
    experience: '۹ سال سابقه تخصصی',
    completedCases: 'بیش از ۴٬۲۰۰ معاینه و تداوی موفق اطفال و داخله',
    schedule: 'شنبه الی پنجشنبه · ۰۸:۳۰ صبح الی ۰۶:۰۰ شام',
    education: 'متخصص صحت طفل و امراض داخله عمومی',
    bio: 'متخصص در تشخیص و تداوی امراض تنفسی، گوارشی و عفونی کودکان و نوزادان، پایش رشد و تغذیه، و کنترول امراض داخله با حوصله‌مندی و دقت بالا.',
    procedures: [
      'معاینات تخصصی نوزادان و تداوی زردی نوزادی',
      'تداوی عفونت‌های تنفسی، سینه‌بغل، آسم و حساسیت کودکان',
      'بررسی رشد قد و وزن، کم‌خونی و تغذیه اطفال',
      'کنترول شکر، فشار خون و امراض داخله بزرگسالان',
    ],
    photoUrl:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=60&auto=format&fit=crop',
    fallbackSvgDataUri: createDoctorPortraitSvg('#0284c7', '#f0f9ff', true),
  },
];

export const WHY_US_ITEMS: WhyUsItem[] = [
  {
    id: 'modern-equipment',
    index: '01',
    title: 'تجهیزات مدرن',
    metric: '۸ بخش مجهز تشخیصی و جراحی',
    description:
      'بهره‌گیری از دستگاه‌های پیشرفته لاپراسکوپی فول‌اچ‌دی، اندویورولوژی، اندوسکوپی ویدیویی، کولونوسکوپی و لابراتوار دیجیتال اتوماتیک برای تشخیص دقیق و تداوی کم‌تهاجمی.',
    highlights: [
      'جراحی بدون برش بزرگ و با حداقل خون‌ریزی',
      'انالایزرهای اتوماتیک لابراتوار با کنترول کیفیت روزانه',
    ],
  },
  {
    id: 'specialist-doctors',
    index: '02',
    title: 'داکترهای متخصص',
    metric: 'بیش از ۱۰ سال تجربه اوسط کلینیکی',
    description:
      'حضور مستمر داکتران متخصص و مجرب آقا و خانم در بخش‌های جراحی، داخله، نسایی ولادی، یورولوژی و اطفال با رویکرد علمی، دلسوزانه و اخلاق طبی.',
    highlights: [
      'کادر کاملاً زنانه و مجرب در بخش نسایی و ولادی',
      'مشاوره شفاف به مریض و خانواده قبل از هر اقدام طبی',
    ],
  },
  {
    id: 'organized-reception',
    index: '03',
    title: 'پذیرش منظم',
    metric: 'کمتر از ۱۵ دقیقه انتظار با نوبت قبلی',
    description:
      'سیستم نوبت‌دهی منظم حضوری و آنلاین از طریق واتساپ، ثبت دقیق دوسیه طبی مریضان و راهنمایی محترمانه مراجعین از لحظه ورود تا ختم تداوی.',
    highlights: [
      'ثبت نوبت سریع از طریق واتساپ بدون نیاز به مراجعه قبلی',
      'احترام به وقت مریضان و اولویت‌دهی فوری به مریضان عاجل',
    ],
  },
  {
    id: 'clean-environment',
    index: '04',
    title: 'محیط پاک',
    metric: 'استریلیزاسیون ۱۰۰٪ استندرد اتاق‌های عملیات',
    description:
      'رعایت سخت‌گیرانه اصول حفظ‌الصحه، ضدعفونی مداوم اتاق‌های معاینه، بستر و عملیات، و فراهم‌سازی فضای آرام، روشن و پاکیزه برای مریضان و همراهان.',
    highlights: [
      'ضدعفونی سطح بالای وسایل اندوسکوپی و جراحی پس از هر مریض',
      'اتاق‌های بستری پاکیزه، آرام و دارای تهویه مناسب',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'چگونه می‌توانم بدون انتظار طولانی نوبت داکتر بگیرم؟',
    answer:
      'شما می‌توانید از طریق فرم نوبت‌دهی همین وب‌سایت، نام مریض، بخش مورد نظر و تاریخ مراجعه را انتخاب نموده و دکمه ارسال در واتساپ (0799088811) را بزنید. بخش پذیرش شفاخانه ساعت دقیق معاینه را برای شما ارسال می‌نماید.',
  },
  {
    id: 'faq-2',
    question: 'آیا برای انجام اندوسکوپی یا معاینات لابراتوار باید ناشتا باشیم؟',
    answer:
      'بلی؛ برای انجام اندوسکوپی معده حداقل ۶ تا ۸ ساعت ناشتا بودن الزامی است. همچنین برای معاینات شکر خون ناشتا و چربی خون در لابراتوار، توصیه می‌شود ۸ تا ۱۲ ساعت قبل از نمونه‌گیری غذا میل نفرمایید (نوشیدن مقدار کم آب ساده مانعی ندارد).',
  },
  {
    id: 'faq-3',
    question: 'آیا در بخش نسایی و ولادی تمام داکتران و پرسونل خانم هستند؟',
    answer:
      'بلی، تمامی معاینات، سونوگرافی‌های بارداری، مراقبت‌های ولادت طبیعی و عملیات‌های سزارین در بخش نسایی و ولادی شفاخانه تخصصی رایان دانش در محیطی کاملاً محرم و توسط متخصصین و قابله‌های مجرب خانم به صورت ۲۴ ساعته انجام می‌شود.',
  },
  {
    id: 'faq-4',
    question: 'تفاوت جراحی لاپراسکوپی و اندویورولوژی با جراحی باز چیست؟',
    answer:
      'در لاپراسکوپی و اندویورولوژی، به جای ایجاد برش بزرگ روی شکم یا پهلو، عملیات با استفاده از کمره‌های ظریف دیجیتال انجام می‌شود. در نتیجه درد پس از عملیات بسیار کمتر بوده، جای زخم باقی نمی‌ماند و مریض بسیار زودتر به زندگی روزمره برمی‌گردد.',
  },
  {
    id: 'faq-5',
    question: 'آدرس دقیق شفاخانه کجاست و در روزهای جمعه کدام بخش‌ها فعال است؟',
    answer:
      'شفاخانه تخصصی رایان دانش در کابل، جاده عمومی برچی، ایستگاه مدرسه موقعیت دارد. بخش عاجل، ولادت‌خانه، لابراتوار و دواخانه شفاخانه در تمام روزهای هفته (به‌شمول روزهای جمعه و رخصتی‌ها) به صورت ۲۴ ساعته فعال می‌باشد.',
  },
];

export interface QuickDateOption {
  isoDate: string;
  dayLabel: string;
  dateNumeric: string;
}

const DARI_WEEKDAYS = [
  'یکشنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنجشنبه',
  'جمعه',
  'شنبه',
];

const toPersianDigits = (input: number | string): string =>
  String(input).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);

export const getNextSevenDays = (): QuickDateOption[] => {
  const result: QuickDateOption[] = [];
  const base = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const isoDate = d.toISOString().split('T')[0];
    const dayName =
      i === 0
        ? 'امروز'
        : i === 1
        ? 'فردا'
        : i === 2
        ? 'پس‌فردا'
        : DARI_WEEKDAYS[d.getDay()];
    const monthDay = `${toPersianDigits(d.getDate())}/${toPersianDigits(
      d.getMonth() + 1
    )}`;
    result.push({
      isoDate,
      dayLabel: dayName,
      dateNumeric: monthDay,
    });
  }
  return result;
};
