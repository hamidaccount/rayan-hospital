import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  Stethoscope,
  Activity,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Microscope,
  Baby,
  HeartPulse,
  Copy,
  Check,
  Menu,
  X,
  ArrowLeft,
  MessageCircle,
  Search,
  ChevronDown,
  FileText,
  Award,
  Navigation,
  Info,
} from 'lucide-react';
import {
  HOSPITAL_INFO,
  HERO_FACILITY_SLIDES,
  SERVICES,
  DOCTORS,
  WHY_US_ITEMS,
  FAQ_ITEMS,
  getNextSevenDays,
  type ServiceItem,
  type DoctorItem,
} from './data/hospitalData';

function ServiceIcon({
  name,
  className = 'w-6 h-6 text-teal-700',
}: {
  name: ServiceItem['iconName'];
  className?: string;
}) {
  switch (name) {
    case 'scalpel':
      return <Activity className={className} aria-hidden="true" />;
    case 'kidney':
      return <ShieldCheck className={className} aria-hidden="true" />;
    case 'endoscope':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'colon':
      return <HeartPulse className={className} aria-hidden="true" />;
    case 'stethoscope':
      return <Stethoscope className={className} aria-hidden="true" />;
    case 'maternity':
      return <UserCheck className={className} aria-hidden="true" />;
    case 'pediatrics':
      return <Baby className={className} aria-hidden="true" />;
    case 'microscope':
      return <Microscope className={className} aria-hidden="true" />;
  }
}

export default function App() {
  // Navigation & mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero facility gallery slide index
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Services filter & search state
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'surgery' | 'endoscopy' | 'clinical' | 'diagnostic'
  >('all');
  const [serviceSearchQuery, setServiceSearchQuery] = useState('');

  // Modal / Bottom-sheet states for deep mobile-friendly inspection
  const [activeServiceModal, setActiveServiceModal] =
    useState<ServiceItem | null>(null);
  const [activeDoctorModal, setActiveDoctorModal] =
    useState<DoctorItem | null>(null);

  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  // Quick 6-day dates for mobile-first horizontal date scroller
  const quickDates = useMemo(() => getNextSevenDays(), []);

  // Appointment form state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(
    SERVICES[0].title
  );
  const [selectedDoctorName, setSelectedDoctorName] = useState(
    'هر متخصص حاضر در بخش'
  );
  const [preferredDate, setPreferredDate] = useState(
    () => quickDates[1]?.isoDate || new Date().toISOString().split('T')[0]
  );
  const [preferredShift, setPreferredShift] = useState(
    'صبح (۰۸:۰۰ الی ۱۲:۰۰)'
  );
  const [patientNotes, setPatientNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  // Filter services by category AND search query (matches title, description, or common symptoms)
  const filteredServices = useMemo(() => {
    const q = serviceSearchQuery.trim().toLowerCase();
    return SERVICES.filter((service) => {
      const matchesCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        service.title.toLowerCase().includes(q) ||
        service.categoryLabel.toLowerCase().includes(q) ||
        service.shortDesc.toLowerCase().includes(q) ||
        service.commonSymptoms.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, serviceSearchQuery]);

  // Construct clean Dari WhatsApp appointment message
  const buildWhatsAppMessage = () => {
    const lines = [
      `سلام و احترام خدمت پذیرش ${HOSPITAL_INFO.name}،`,
      `درخواست ثبت نوبت معاینه دارم:`,
      `• نام مریض: ${patientName.trim() || '---'}`,
      `• شماره تماس: ${patientPhone.trim() || '---'}`,
      `• بخش تخصصی: ${selectedDepartment}`,
      `• داکتر مورد نظر: ${selectedDoctorName}`,
      `• تاریخ ترجیحی: ${preferredDate || '---'}`,
      `• زمان مراجعه: ${preferredShift}`,
    ];
    if (patientNotes.trim()) {
      lines.push(`• توضیحات: ${patientNotes.trim()}`);
    }
    lines.push(`تشکر از راهنمایی شما.`);
    return lines.join('\n');
  };

  const whatsappAppointmentUrl = `${
    HOSPITAL_INFO.whatsappBaseUrl
  }?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  const handleSelectServiceForAppointment = (service: ServiceItem) => {
    setActiveServiceModal(null);
    setSelectedDepartment(service.title);
    const matchingDoc = DOCTORS.find((d) => d.departmentId === service.id);
    setSelectedDoctorName(
      matchingDoc ? matchingDoc.name : 'هر متخصص حاضر در بخش'
    );
    setFormSubmitted(false);
    setFormError(null);
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 450);
  };

  const handleSelectDoctorForAppointment = (doctor: DoctorItem) => {
    setActiveDoctorModal(null);
    setSelectedDepartment(doctor.departmentName);
    setSelectedDoctorName(doctor.name);
    setFormSubmitted(false);
    setFormError(null);
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 450);
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = patientName.trim();
    const trimmedPhone = patientPhone.trim();

    if (trimmedName.length < 2) {
      setFormError('لطفاً نام و تخلص مریض را به صورت کامل وارد نمایید.');
      nameInputRef.current?.focus();
      return;
    }

    const digitsOnly = trimmedPhone.replace(/[^0-9۰-۹]/g, '');
    if (digitsOnly.length < 9) {
      setFormError(
        'لطفاً یک شماره تماس معتبر (مثلاً 0799088811) وارد نمایید.'
      );
      return;
    }

    if (!preferredDate) {
      setFormError('لطفاً تاریخ ترجیحی مراجعه را انتخاب نمایید.');
      return;
    }

    setFormSubmitted(true);

    // Open WhatsApp cleanly via anchor click
    const anchor = document.createElement('a');
    anchor.href = whatsappAppointmentUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleCopyWhatsAppText = async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsAppMessage());
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setCopiedMessage(false);
    }
  };

  const handleCopyPhone = async (phone: string) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedPhone(phone);
      setTimeout(() => setCopiedPhone(null), 2000);
    } catch {
      setCopiedPhone(null);
    }
  };

  const currentFacilitySlide = HERO_FACILITY_SLIDES[activeSlideIndex];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-700 selection:text-white"
    >
      {/* 1. Sticky Header — Strictly adhering to the 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/90">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (Single text element wordmark, one line) */}
          <a
            href="#home"
            className="text-base sm:text-xl font-extrabold tracking-tight text-teal-950 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700"
          >
            {HOSPITAL_INFO.name}
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links */}
          <nav
            aria-label="ناوبری اصلی"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600"
          >
            <a
              href="#home"
              className="hover:text-teal-800 hover:underline underline-offset-8 decoration-2 decoration-teal-600 transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              خانه
            </a>
            <a
              href="#services"
              className="hover:text-teal-800 hover:underline underline-offset-8 decoration-2 decoration-teal-600 transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              خدمات
            </a>
            <a
              href="#doctors"
              className="hover:text-teal-800 hover:underline underline-offset-8 decoration-2 decoration-teal-600 transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              داکترها
            </a>
            <a
              href="#appointment"
              className="hover:text-teal-800 hover:underline underline-offset-8 decoration-2 decoration-teal-600 transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              نوبت‌دهی
            </a>
            <a
              href="#contact"
              className="hover:text-teal-800 hover:underline underline-offset-8 decoration-2 decoration-teal-600 transition-colors duration-150 whitespace-nowrap shrink-0 py-1"
            >
              تماس
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={`${HOSPITAL_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
                'سلام، از طریق وب‌سایت شفاخانه تخصصی رایان دانش برای دریافت نوبت و معلومات پیام می‌دهم.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] rounded-xl shadow-xs transition-all duration-150 whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>نوبت در واتساپ</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'بستن مینو' : 'باز کردن مینو'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 transition-colors duration-150"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation with Thumb-Friendly 48px Touch Targets */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16 }}
              className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl"
            >
              <nav className="flex flex-col gap-1.5 text-base font-semibold text-slate-800">
                {[
                  { href: '#home', label: 'خانه و معرفی شفاخانه' },
                  { href: '#services', label: 'بخش‌ها و خدمات تخصصی (۸ بخش)' },
                  { href: '#why-us', label: 'چرا شفاخانه رایان دانش؟' },
                  { href: '#doctors', label: 'معرفی داکتران متخصص' },
                  { href: '#appointment', label: 'ثبت نوبت آنلاین در واتساپ' },
                  { href: '#faq', label: 'سوالات متداول و آمادگی معاینات' },
                  { href: '#contact', label: 'آدرس و شماره‌های تماس عاجل' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="min-h-[48px] px-4 rounded-xl flex items-center justify-between hover:bg-teal-50 hover:text-teal-900 active:bg-teal-100 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowLeft
                      className="w-4 h-4 text-slate-400"
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </nav>

              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${HOSPITAL_INFO.phonePrimary}`}
                  className="min-h-[48px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span dir="ltr">{HOSPITAL_INFO.phonePrimary}</span>
                </a>
                <a
                  href={`tel:${HOSPITAL_INFO.phoneSecondary}`}
                  className="min-h-[48px] rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span dir="ltr">{HOSPITAL_INFO.phoneSecondary}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* 2. Architectural Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-b from-teal-50/80 via-white to-slate-50 pt-7 pb-14 lg:pt-14 lg:pb-20 border-b border-slate-200/80"
        >
          {/* Subtle Architectural Medical Grid Pattern */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                'radial-gradient(#0d9488 0.85px, transparent 0.85px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Right Column: Primary Proposition & Quick Department Access */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-7 flex flex-col justify-between"
              >
                <div>
                  {/* Quiet Unboxed Kicker */}
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 mb-4">
                    <span>شفاخانه تخصصی خصوصی در غرب کابل</span>
                    <span aria-hidden="true">·</span>
                    <span>جاده عمومی برچی، ایستگاه مدرسه</span>
                    <span aria-hidden="true">·</span>
                    <span>خدمات ۲۴ ساعته</span>
                  </div>

                  <h1
                    className="font-extrabold text-slate-950 tracking-tight leading-[1.18] mb-5"
                    style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)' }}
                  >
                    تداوی تخصصی، با اعتماد
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
                    در{' '}
                    <strong className="font-bold text-slate-900">
                      شفاخانه تخصصی رایان دانش
                    </strong>
                    ، ما با گردهم‌آوردن تیم مجرب از داکتران متخصص و بهره‌گیری از
                    تکنالوژی پیشرفته جراحی‌های کم‌تهاجمی (لاپراسکوپی و
                    اندویورولوژی)، اندوسکوپی، کولونوسکوپی، نسایی ولادی، اطفال و
                    لابراتوار دیجیتال، مراقبت‌های طبی استندرد و مطمئن را در محیطی
                    پاک و آرام ارائه می‌دهیم.
                  </p>

                  {/* Primary & Secondary High-Touch CTAs (min-h-[48px] for Mobile Ergonomics) */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
                    <a
                      href="#appointment"
                      onClick={() => {
                        setTimeout(() => nameInputRef.current?.focus(), 400);
                      }}
                      className="min-h-[52px] px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] rounded-2xl shadow-sm flex items-center justify-center gap-2.5 transition-all duration-150 whitespace-nowrap shrink-0"
                    >
                      <Calendar className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>درخواست نوبت معاینه</span>
                    </a>

                    <a
                      href={`${HOSPITAL_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
                        'سلام، لطفاً در مورد نوبت معاینه و خدمات شفاخانه تخصصی رایان دانش معلومات بدهید.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[52px] px-6 py-3.5 text-sm sm:text-base font-bold text-teal-950 bg-white hover:bg-teal-50 border border-slate-300 rounded-2xl flex items-center justify-center gap-2.5 transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <MessageCircle
                        className="w-5 h-5 text-teal-700 shrink-0"
                        aria-hidden="true"
                      />
                      <span>مشاوره و نوبت در واتساپ</span>
                    </a>
                  </div>
                </div>

                {/* Fast-Track Department Jump Bar inside Hero */}
                <div className="pt-6 border-t border-slate-200/90">
                  <p className="text-xs font-semibold text-slate-500 mb-3">
                    انتخاب سریع بخش تخصصی برای نوبت‌گیری فوری:
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {SERVICES.slice(0, 6).map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleSelectServiceForAppointment(service)}
                        className="min-h-[40px] px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-teal-700 hover:text-white border border-slate-200/90 hover:border-teal-700 rounded-xl transition-colors duration-150 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{service.title}</span>
                        <ArrowLeft className="w-3 h-3 opacity-70" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Left Column: Interactive Hospital Facility Showcase with Slide Switcher */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="lg:col-span-5 flex"
              >
                <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200/90 bg-slate-900 flex flex-col justify-between min-h-[360px] sm:min-h-[420px] lg:h-full shadow-sm">
                  <img
                    key={currentFacilitySlide.id}
                    src={currentFacilitySlide.imageUrl}
                    alt={currentFacilitySlide.title}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== currentFacilitySlide.fallbackSvgDataUri) {
                        target.src = currentFacilitySlide.fallbackSvgDataUri;
                      }
                    }}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                  />

                  {/* Top Unboxed Glass Strip */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                    <div className="bg-slate-950/75 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-medium">
                      {currentFacilitySlide.badgeText}
                    </div>
                    <a
                      href={`tel:${HOSPITAL_INFO.phonePrimary}`}
                      dir="ltr"
                      className="bg-white/95 backdrop-blur-md text-slate-900 px-3.5 py-1.5 rounded-xl text-xs font-bold tabular-nums hover:bg-teal-50 transition-colors"
                    >
                      0799 088 811
                    </a>
                  </div>

                  {/* Bottom Measured Contrast Scrim + Interactive Facility Switcher */}
                  <div className="relative z-10 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pt-16 p-5 sm:p-6 text-white">
                    <h2 className="text-base sm:text-lg font-bold leading-snug mb-1.5">
                      {currentFacilitySlide.title}
                    </h2>
                    <p className="text-xs text-slate-200 leading-relaxed mb-4">
                      {currentFacilitySlide.subtitle}
                    </p>

                    {/* Interactive Slide Selector Buttons */}
                    <div
                      role="tablist"
                      aria-label="تصاویر بخش‌های شفاخانه"
                      className="grid grid-cols-3 gap-2 pt-3 border-t border-white/15"
                    >
                      {[
                        { idx: 0, label: 'اتاق عملیات' },
                        { idx: 1, label: 'اندوسکوپی' },
                        { idx: 2, label: 'لابراتوار ۲۴ ساعته' },
                      ].map((tab) => {
                        const isActive = activeSlideIndex === tab.idx;
                        return (
                          <button
                            key={tab.idx}
                            type="button"
                            role="tab"
                            aria-selected={isActive}
                            onClick={() => setActiveSlideIndex(tab.idx)}
                            className={`min-h-[38px] px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isActive
                                ? 'bg-teal-500 text-slate-950 font-bold'
                                : 'bg-white/10 text-slate-200 hover:bg-white/20'
                            }`}
                          >
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof & Access Strip */}
            <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>دیپارتمنت‌های فعال</span>
                  <span className="font-mono font-semibold text-teal-700 tabular-nums">
                    01 / 04
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                  ۸ بخش تخصصی و تشخیصیه
                </p>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  لاپراسکوپی، اندویورولوژی، اندوسکوپی، کولونوسکوپی، داخله، نسایی
                  ولادی و اطفال
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>پذیرش عاجل و تشخیصیه</span>
                  <span className="font-mono font-semibold text-teal-700 tabular-nums">
                    02 / 04
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                  ۲۴ ساعت · ۷ روز هفته
                </p>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  بخش عاجل، مراقبت‌های ولادی، لابراتوار و دواخانه به صورت
                  شبانه‌روزی
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200/90 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>آدرس دقیق در غرب کابل</span>
                  <span className="font-mono font-semibold text-teal-700 tabular-nums">
                    03 / 04
                  </span>
                </div>
                <p className="text-lg sm:text-xl font-extrabold text-slate-900">
                  جاده عمومی برچی، ایستگاه مدرسه
                </p>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  موقعیت روی سرک اصلی با دسترسی سریع و راحت برای مراجعین محترم
                </p>
              </div>

              <div className="bg-teal-900 text-white rounded-2xl p-5 border border-teal-800 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-teal-200 mb-2">
                  <span>شماره‌های تماس مستقیم</span>
                  <span>پاسخ‌گویی فوری</span>
                </div>
                <div
                  className="flex items-center gap-2 text-lg sm:text-xl font-extrabold text-white tabular-nums"
                  dir="ltr"
                >
                  <a
                    href={`tel:${HOSPITAL_INFO.phonePrimary}`}
                    className="hover:text-teal-300 transition-colors"
                  >
                    0799088811
                  </a>
                  <span className="text-teal-500">/</span>
                  <a
                    href={`tel:${HOSPITAL_INFO.phoneSecondary}`}
                    className="hover:text-teal-300 transition-colors"
                  >
                    0799090098
                  </a>
                </div>
                <p className="text-xs text-teal-100/90 mt-1.5 leading-relaxed">
                  برای تماس مستقیم روی شماره ضربه بزنید یا در واتساپ پیام دهید
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Services Section — Asymmetric Bento-Grid + Live Symptom Search + Clinical Drawer */}
        <section
          id="services"
          className="py-16 lg:py-24 bg-white border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header + Search & Category Controls */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div>
                <p className="text-xs sm:text-sm font-bold text-teal-800 mb-2">
                  بخش‌های تخصصی کلینیکی، جراحی درون‌بین و تشخیصیه
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  خدمات تخصصی شفاخانه رایان دانش
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                  برای مشاهده علایم مرتبط، آمادگی‌های قبل از معاینه و تجهیزات هر
                  بخش، روی کارت مورد نظر کلیک کنید یا مستقیماً نوبت خود را ثبت
                  نمایید.
                </p>
              </div>

              {/* Live Symptom & Department Search Input */}
              <div className="w-full lg:w-80">
                <label htmlFor="service-search" className="sr-only">
                  جستجوی بخش یا علایم طبی
                </label>
                <div className="relative">
                  <Search
                    className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    aria-hidden="true"
                  />
                  <input
                    id="service-search"
                    type="search"
                    value={serviceSearchQuery}
                    onChange={(e) => setServiceSearchQuery(e.target.value)}
                    placeholder="جستجوی بخش یا علایم (مثلاً: سنگ گرده، معده، بارداری)..."
                    className="w-full min-h-[44px] pr-10 pl-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Category Filter Bar (Horizontally scrollable on mobile for thumb comfort) */}
            <div className="mb-8 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div
                role="tablist"
                aria-label="فلتر دسته‌بندی خدمات"
                className="inline-flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl min-w-max"
              >
                {[
                  { id: 'all', label: 'همه بخش‌های تخصصی (۸)' },
                  { id: 'surgery', label: 'لاپراسکوپی و اندویورولوژی' },
                  { id: 'endoscopy', label: 'اندوسکوپی و کولونوسکوپی' },
                  { id: 'clinical', label: 'داخله، نسایی ولادی و اطفال' },
                  { id: 'diagnostic', label: 'لابراتوار و رادیولوژی ۲۴ ساعته' },
                ].map((tab) => {
                  const active = selectedCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() =>
                        setSelectedCategory(
                          tab.id as
                            | 'all'
                            | 'surgery'
                            | 'endoscopy'
                            | 'clinical'
                            | 'diagnostic'
                        )
                      }
                      className={`min-h-[40px] px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-teal-800 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-950'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Empty Search State */}
            {filteredServices.length === 0 ? (
              <div className="bg-slate-50 rounded-3xl p-10 text-center border border-slate-200">
                <p className="text-base font-bold text-slate-800 mb-2">
                  بخشی مطابق با عبارت «{serviceSearchQuery}» یافت نشد.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mb-4">
                  شما می‌توانید تمام ۸ بخش تخصصی را مشاهده کنید یا در واتساپ از
                  مسئول پذیرش راهنمایی بگیرید.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setServiceSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="min-h-[44px] px-5 py-2.5 text-xs font-bold text-white bg-teal-700 rounded-xl hover:bg-teal-800 transition-colors"
                >
                  نمایش همه خدمات شفاخانه
                </button>
              </div>
            ) : (
              /* Asymmetric Bento-Grid: Featured surgical capabilities span 2 cols on desktop when viewing all */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredServices.map((service) => {
                  const isMarquee =
                    service.featured &&
                    selectedCategory === 'all' &&
                    !serviceSearchQuery.trim();

                  return (
                    <article
                      key={service.id}
                      className={`group rounded-3xl p-6 sm:p-7 border transition-all duration-150 flex flex-col justify-between ${
                        isMarquee
                          ? 'lg:col-span-2 bg-gradient-to-br from-teal-50/70 via-white to-slate-50 border-teal-200/90'
                          : 'bg-slate-50/80 hover:bg-white border-slate-200/90'
                      }`}
                    >
                      <div>
                        {/* Top Row: Icon + Editorial Index */}
                        <div className="flex items-center justify-between gap-4 mb-5">
                          <div
                            className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 border ${
                              isMarquee
                                ? 'bg-teal-700 text-white border-teal-700'
                                : 'bg-white text-teal-700 border-slate-200'
                            }`}
                          >
                            <ServiceIcon
                              name={service.iconName}
                              className={
                                isMarquee
                                  ? 'w-6 h-6 text-white'
                                  : 'w-6 h-6 text-teal-700'
                              }
                            />
                          </div>

                          <div className="text-left">
                            <span className="text-xs font-mono font-bold text-slate-400 tabular-nums">
                              {service.index} / 08
                            </span>
                          </div>
                        </div>

                        {/* Unboxed Metadata Kicker */}
                        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-teal-800 mb-1.5">
                          <span>{service.categoryLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-500 font-normal">
                            {service.recoveryOrTurnaround}
                          </span>
                        </div>

                        {/* Service Title */}
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 mb-3">
                          {service.index}. {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-600 leading-relaxed mb-5">
                          {service.shortDesc}
                        </p>

                        {/* Common Symptoms / Indications Preview */}
                        <div className="bg-white/90 rounded-2xl p-4 border border-slate-200/70 mb-5">
                          <p className="text-xs font-bold text-slate-800 mb-2">
                            موارد مراجعه و علایم شایع:
                          </p>
                          <ul
                            className={`grid gap-1.5 text-xs text-slate-600 ${
                              isMarquee
                                ? 'grid-cols-1 sm:grid-cols-2'
                                : 'grid-cols-1'
                            }`}
                          >
                            {service.commonSymptoms
                              .slice(0, isMarquee ? 4 : 2)
                              .map((symptom) => (
                                <li
                                  key={symptom}
                                  className="flex items-start gap-2"
                                >
                                  <CheckCircle2
                                    className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5"
                                    aria-hidden="true"
                                  />
                                  <span>{symptom}</span>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer: Availability + Action Buttons */}
                      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleSelectServiceForAppointment(service)
                            }
                            className="min-h-[44px] flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>نوبت‌گیری در این بخش</span>
                            <ArrowLeft
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveServiceModal(service)}
                            className="min-h-[44px] px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-teal-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            راهنمای مریض
                          </button>
                        </div>

                        <span className="text-[11px] text-slate-500 tabular-nums">
                          {service.availability}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 6. Why Us — Modern Architectural Clinical Standards Section */}
        <section
          id="why-us"
          className="py-16 lg:py-24 bg-teal-950 text-white border-b border-teal-900"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12">
              <div className="lg:col-span-7">
                <p className="text-xs sm:text-sm font-bold text-teal-300 mb-2">
                  معیارهای کیفیت و مصئونیت طبی
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-wide text-white">
                  چرا خانواده‌ها به شفاخانه تخصصی رایان دانش اعتماد می‌کنند؟
                </h2>
              </div>
              <div className="lg:col-span-5">
                <p className="text-sm sm:text-base text-teal-100/90 leading-relaxed">
                  ما باور داریم که تداوی موفق نیازمند ترکیب دانش روز داکتران
                  متخصص، دستگاه‌های دقیق تشخیصی و محیطی کاملاً پاکیزه و منظم است.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_US_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-teal-900/45 rounded-3xl p-6 sm:p-7 border border-teal-800/90 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-teal-300 mb-4 tabular-nums">
                      <span className="font-mono font-bold">
                        {item.index} / 04
                      </span>
                      <span>{item.metric}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white mb-3 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-sm text-teal-100/85 leading-relaxed mb-5">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-teal-800/80 space-y-2">
                    {item.highlights.map((hl) => (
                      <div
                        key={hl}
                        className="flex items-start gap-2 text-xs text-teal-200"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-teal-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Specialist Doctors Section */}
        <section
          id="doctors"
          className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <p className="text-xs sm:text-sm font-bold text-teal-800 mb-2">
                  تیم متخصصین باسابقه و متعهد
                </p>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  داکتران متخصص شفاخانه رایان دانش
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                  هر یک از بخش‌های جراحی، نسایی ولادی، اندویورولوژی و اطفال زیر
                  نظر مستقیم متخصصین مجرب اداره می‌شود. می‌توانید مستقیماً از
                  متخصص مورد نظر خود نوبت بگیرید.
                </p>
              </div>

              <a
                href="#appointment"
                className="min-h-[44px] inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-950 whitespace-nowrap shrink-0"
              >
                <span>رفتن به فرم نوبت‌دهی مستقیم</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DOCTORS.map((doctor) => (
                <article
                  key={doctor.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 flex flex-col justify-between transition-colors hover:border-teal-300"
                >
                  <div>
                    {/* 1:1 Doctor Portrait with Resilient SVG Fallback */}
                    <div className="relative aspect-square w-full bg-slate-100 border-b border-slate-100 overflow-hidden">
                      <img
                        src={doctor.photoUrl}
                        alt={`${doctor.name} - ${doctor.specialty} در شفاخانه تخصصی رایان دانش`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== doctor.fallbackSvgDataUri) {
                            target.src = doctor.fallbackSvgDataUri;
                          }
                        }}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-4 text-white">
                        <p className="text-xs font-medium text-teal-200 tabular-nums">
                          بخش {doctor.departmentName} · {doctor.experience}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-extrabold text-slate-950 mb-1">
                        {doctor.name}
                      </h3>

                      <p className="text-xs font-semibold text-teal-800 mb-3">
                        {doctor.specialty}
                      </p>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {doctor.bio}
                      </p>

                      {/* Key Procedures Preview */}
                      <div className="pt-3 border-t border-slate-100 space-y-1.5 mb-3">
                        {doctor.procedures.slice(0, 2).map((proc) => (
                          <div
                            key={proc}
                            className="flex items-start gap-1.5 text-xs text-slate-700"
                          >
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{proc}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-[11px] text-slate-500 tabular-nums">
                        حضور در کلینیک: {doctor.schedule}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons with 44px+ Mobile Hitboxes */}
                  <div className="px-6 pb-6 pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectDoctorForAppointment(doctor)}
                      className="min-h-[44px] w-full py-2.5 px-4 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      اخذ نوبت از {doctor.name}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDoctorModal(doctor)}
                      className="min-h-[40px] w-full py-2 px-4 text-xs font-semibold text-slate-700 hover:text-teal-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      مشاهده جزئیات تخصص و ساعات کاری
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Mobile-First Interactive WhatsApp Appointment Studio */}
        <section
          id="appointment"
          className="py-16 lg:py-24 bg-white border-b border-slate-200/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Right Column: Interactive Form */}
              <div className="lg:col-span-7">
                <div className="mb-6">
                  <p className="text-xs sm:text-sm font-bold text-teal-800 mb-2">
                    رزرو سریع نوبت آنلاین · بدون انتظار در صف پذیرش
                  </p>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                    فرم هوشمند نوبت‌دهی واتساپ
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    بخش تخصصی، تاریخ مراجعه و مشخصات مریض را انتخاب نمایید تا
                    درخواست نوبت شما مستقیماً به واتساپ رسمی پذیرش شفاخانه رایان
                    دانش ارسال گردد.
                  </p>
                </div>

                <form
                  onSubmit={handleAppointmentSubmit}
                  noValidate
                  className="bg-slate-50 rounded-3xl p-5 sm:p-8 border border-slate-200/90 space-y-6"
                >
                  {formError && (
                    <div
                      role="alert"
                      className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 font-bold"
                    >
                      {formError}
                    </div>
                  )}

                  {/* Step 1: Mobile-Friendly Tappable Department Selector Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label
                        htmlFor="department-select"
                        className="text-xs sm:text-sm font-bold text-slate-900"
                      >
                        ۱. انتخاب بخش تخصصی مورد نظر{' '}
                        <span className="text-red-600">*</span>
                      </label>
                      <span className="text-xs text-teal-800 font-semibold">
                        انتخاب فعلی: {selectedDepartment}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      {SERVICES.map((service) => {
                        const isSelected = selectedDepartment === service.title;
                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => {
                              setSelectedDepartment(service.title);
                              const matchedDoc = DOCTORS.find(
                                (d) => d.departmentId === service.id
                              );
                              setSelectedDoctorName(
                                matchedDoc
                                  ? matchedDoc.name
                                  : 'هر متخصص حاضر در بخش'
                              );
                            }}
                            className={`min-h-[46px] p-2.5 rounded-xl border text-right transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'bg-teal-800 text-white border-teal-800 font-bold shadow-xs'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-600'
                            }`}
                          >
                            <ServiceIcon
                              name={service.iconName}
                              className={`w-4 h-4 shrink-0 ${
                                isSelected ? 'text-teal-200' : 'text-teal-700'
                              }`}
                            />
                            <span className="text-xs truncate">
                              {service.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Accessible Native Dropdown Synced with Tappable Grid */}
                    <select
                      id="department-select"
                      value={selectedDepartment}
                      onChange={(e) => {
                        setSelectedDepartment(e.target.value);
                        const matchedService = SERVICES.find(
                          (s) => s.title === e.target.value
                        );
                        const matchedDoc = DOCTORS.find(
                          (d) => d.departmentId === matchedService?.id
                        );
                        setSelectedDoctorName(
                          matchedDoc ? matchedDoc.name : 'هر متخصص حاضر در بخش'
                        );
                      }}
                      className="sr-only"
                    >
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Patient Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="patient-name"
                        className="block text-xs sm:text-sm font-bold text-slate-900 mb-2"
                      >
                        ۲. نام و تخلص مریض <span className="text-red-600">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="patient-name"
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => {
                          setPatientName(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="مثلاً: حاجی محمد رفیع"
                        className="w-full min-h-[48px] px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="patient-phone"
                        className="block text-xs sm:text-sm font-bold text-slate-900 mb-2"
                      >
                        ۳. شماره تماس فعال <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="patient-phone"
                        type="tel"
                        required
                        dir="ltr"
                        value={patientPhone}
                        onChange={(e) => {
                          setPatientPhone(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="0799 000 000"
                        className="w-full min-h-[48px] px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 text-right placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-teal-700 tabular-nums"
                      />
                    </div>
                  </div>

                  {/* Step 3: Horizontal Quick-Date Scroller + Date Input */}
                  <div>
                    <label
                      htmlFor="preferred-date"
                      className="block text-xs sm:text-sm font-bold text-slate-900 mb-2.5"
                    >
                      ۴. انتخاب روز و تاریخ مراجعه{' '}
                      <span className="text-red-600">*</span>
                    </label>

                    {/* Horizontal Date Scroller for One-Handed Mobile Selection */}
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                      {quickDates.map((d) => {
                        const isSelected = preferredDate === d.isoDate;
                        return (
                          <button
                            key={d.isoDate}
                            type="button"
                            onClick={() => setPreferredDate(d.isoDate)}
                            className={`min-h-[52px] p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                              isSelected
                                ? 'bg-teal-800 text-white border-teal-800 font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-600'
                            }`}
                          >
                            <span className="text-xs">{d.dayLabel}</span>
                            <span
                              className={`text-[11px] tabular-nums mt-0.5 ${
                                isSelected ? 'text-teal-200' : 'text-slate-400'
                              }`}
                            >
                              {d.dateNumeric}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        id="preferred-date"
                        type="date"
                        required
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full min-h-[48px] px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 tabular-nums"
                      />

                      <select
                        id="doctor-select"
                        aria-label="داکتر متخصص مورد نظر"
                        value={selectedDoctorName}
                        onChange={(e) => setSelectedDoctorName(e.target.value)}
                        className="w-full min-h-[48px] px-4 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700"
                      >
                        <option value="هر متخصص حاضر در بخش">
                          داکتر: هر متخصص حاضر در بخش
                        </option>
                        {DOCTORS.map((doc) => (
                          <option key={doc.id} value={doc.name}>
                            {doc.name} ({doc.departmentName})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Interactive Shift Buttons */}
                  <div>
                    <span className="block text-xs sm:text-sm font-bold text-slate-900 mb-2.5">
                      ۵. انتخاب شیفت مراجعه
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        'صبح (۰۸:۰۰ الی ۱۲:۰۰)',
                        'بعد از ظهر (۰۱:۰۰ الی ۰۵:۰۰)',
                        'شام (۰۵:۰۰ الی ۰۸:۰۰)',
                      ].map((shift) => {
                        const active = preferredShift === shift;
                        return (
                          <button
                            key={shift}
                            type="button"
                            onClick={() => setPreferredShift(shift)}
                            className={`min-h-[46px] px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                              active
                                ? 'bg-teal-800 text-white border-teal-800'
                                : 'bg-white text-slate-700 border-slate-200 hover:border-teal-600'
                            }`}
                          >
                            {shift}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional Symptoms / Notes */}
                  <div>
                    <label
                      htmlFor="patient-notes"
                      className="block text-xs sm:text-sm font-bold text-slate-900 mb-2"
                    >
                      ۶. شرح مختصر علایم یا یادداشت (اختیاری)
                    </label>
                    <textarea
                      id="patient-notes"
                      rows={2}
                      value={patientNotes}
                      onChange={(e) => setPatientNotes(e.target.value)}
                      placeholder="اگر قبلاً معاینه شده‌اید یا سوالی دارید، بنویسید..."
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      className="min-h-[52px] flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] rounded-2xl shadow-sm transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <MessageCircle
                        className="w-5 h-5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>ارسال درخواست نوبت در واتساپ (0799088811)</span>
                    </button>

                    <a
                      href={whatsappAppointmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[52px] inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-bold text-teal-950 bg-white hover:bg-teal-50 border border-slate-300 rounded-2xl transition-colors duration-150 whitespace-nowrap shrink-0"
                    >
                      <span>باز کردن مستقیم واتساپ</span>
                    </a>
                  </div>

                  {formSubmitted && (
                    <div
                      role="status"
                      className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 space-y-2"
                    >
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <CheckCircle2
                          className="w-5 h-5 text-teal-700 shrink-0"
                          aria-hidden="true"
                        />
                        <span>پیام نوبت شما آماده ارسال در واتساپ گردید!</span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        اگر واتساپ به صورت خودکار باز نشد، روی{' '}
                        <a
                          href={whatsappAppointmentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-teal-800 underline"
                        >
                          این لینک مستقیم واتساپ (0799088811)
                        </a>{' '}
                        کلیک نمایید.
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Left Column: Live WhatsApp Preview Card & Patient Preparation Tips */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <div className="bg-teal-950 text-white rounded-3xl p-6 sm:p-7 border border-teal-900">
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-teal-800">
                    <div>
                      <p className="text-xs text-teal-300 font-semibold">
                        پیش‌نمایش زنده پیام نوبت
                      </p>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        متن ارسالی به واتساپ پذیرش
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyWhatsAppText}
                      className="min-h-[38px] px-3 py-1.5 rounded-xl bg-teal-900 hover:bg-teal-800 border border-teal-700 text-xs font-semibold text-teal-100 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedMessage ? (
                        <>
                          <Check
                            className="w-3.5 h-3.5 text-teal-300"
                            aria-hidden="true"
                          />
                          <span>کاپی شد</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>کاپی متن</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs sm:text-sm text-slate-100 font-sans whitespace-pre-wrap leading-relaxed bg-teal-900/60 p-4 rounded-2xl border border-teal-800">
                    {buildWhatsAppMessage()}
                  </pre>

                  <div className="mt-4 pt-3 border-t border-teal-800/80 flex items-center justify-between text-xs text-teal-200 tabular-nums">
                    <span>شماره واتساپ رسمی پذیرش:</span>
                    <span dir="ltr" className="font-bold text-white">
                      +93 799 088 811
                    </span>
                  </div>
                </div>

                {/* Selected Department Preparation Reminder */}
                {(() => {
                  const activeSvc =
                    SERVICES.find((s) => s.title === selectedDepartment) ||
                    SERVICES[0];
                  return (
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/90 space-y-3">
                      <div className="flex items-center gap-2 text-teal-800 font-bold text-sm">
                        <Info className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>راهنمای مراجعه به بخش {activeSvc.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {activeSvc.prepNote}
                      </p>
                      <p className="text-xs text-slate-500 tabular-nums">
                        ساعات پذیرش این بخش: {activeSvc.availability}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>

        {/* Patient FAQ & Pre-Visit Preparation Section */}
        <section
          id="faq"
          className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/80"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs sm:text-sm font-bold text-teal-800 mb-2">
                پاسخ به پرسش‌های مراجعین محترم
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                سوالات متداول و راهنمای آمادگی مریضان
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full min-h-[56px] px-5 sm:px-6 py-4 text-right flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-teal-700 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. Contact & Location Section with Visual Barchi Route Schematic */}
        <section id="contact" className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12">
              <p className="text-xs sm:text-sm font-bold text-teal-800 mb-2">
                موقعیت شفاخانه و خطوط ارتباطی ۲۴ ساعته
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                تماس و آدرس شفاخانه تخصصی رایان دانش
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                شفاخانه در مسیر اصلی جاده عمومی برچی (ایستگاه مدرسه) واقع شده
                است. برای راهنمایی مسیر یا هماهنگی عاجل، با شماره‌های ذیل در
                تماس شوید.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Address & Visual Landmark Schematic Card (5 cols) */}
              <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-teal-800">
                      غرب کابل · ناحیه سیزدهم
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-950 mb-2">
                    آدرس دقیق شفاخانه
                  </h3>
                  <p className="text-base font-bold text-teal-900 leading-relaxed mb-4">
                    {HOSPITAL_INFO.address}
                  </p>

                  {/* Visual Route Schematic for Barchi Main Road */}
                  <div className="bg-white rounded-2xl p-4 border border-slate-200/90 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-3">
                      <Navigation
                        className="w-4 h-4 text-teal-700"
                        aria-hidden="true"
                      />
                      <span>مسیر راهنمای مراجعین در جاده عمومی برچی:</span>
                    </div>

                    <div className="relative py-3">
                      <div className="h-1 bg-slate-200 rounded-full w-full absolute top-1/2 -translate-y-1/2" />
                      <div className="relative flex items-center justify-between text-[11px] font-semibold">
                        <div className="bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg text-slate-600">
                          مسیر پل سوخته / گولایی
                        </div>
                        <div className="bg-teal-700 text-white px-3 py-1.5 rounded-xl font-bold shadow-xs">
                          ایستگاه مدرسه (شفاخانه رایان دانش)
                        </div>
                        <div className="bg-slate-100 border border-slate-300 px-2.5 py-1 rounded-lg text-slate-600">
                          مسیر دشت برچی / نقاش
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      واقع در کنار جاده عمومی برچی در ایستگاه مدرسه؛ دسترسی آسان
                      برای موترهای شخصی، لین‌های شهری و امبولانس.
                    </p>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'جاده عمومی برچی ایستگاه مدرسه کابل شفاخانه تخصصی رایان دانش'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] w-full px-4 py-2.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-teal-700" aria-hidden="true" />
                  <span>مشاهده موقعیت در نقشه گوگل</span>
                </a>
              </div>

              {/* Direct Phone & WhatsApp Hub Card (4 cols) */}
              <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-5">
                    <Phone
                      className="w-6 h-6 text-teal-700"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950 mb-2">
                    شماره‌های تماس و واتساپ
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-5">
                    برای تماس مستقیم تلفونی یا کاپی کردن شماره‌های پذیرش، از
                    گزینه‌های ذیل استفاده نمایید:
                  </p>

                  <div className="space-y-3.5">
                    {[
                      {
                        phone: HOSPITAL_INFO.phonePrimary,
                        label: 'شماره اول (پذیرش، عاجل و واتساپ)',
                      },
                      {
                        phone: HOSPITAL_INFO.phoneSecondary,
                        label: 'شماره دوم (معلومات و هماهنگی نوبت)',
                      },
                    ].map((item) => (
                      <div
                        key={item.phone}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90"
                      >
                        <span className="block text-xs text-slate-500 mb-1">
                          {item.label}
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={`tel:${item.phone}`}
                            dir="ltr"
                            className="text-lg font-extrabold text-slate-950 hover:text-teal-800 tabular-nums"
                          >
                            {item.phone}
                          </a>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleCopyPhone(item.phone)}
                              className="min-h-[38px] px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              {copiedPhone === item.phone ? 'کاپی شد' : 'کاپی'}
                            </button>
                            <a
                              href={`tel:${item.phone}`}
                              className="min-h-[38px] px-3.5 py-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl flex items-center justify-center transition-colors whitespace-nowrap shrink-0"
                            >
                              تماس
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <a
                    href={HOSPITAL_INFO.whatsappBaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle
                      className="w-4 h-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>ارسال پیام در واتساپ (0799088811)</span>
                  </a>
                </div>
              </div>

              {/* Working Hours Card (3 cols) */}
              <div className="lg:col-span-3 bg-slate-50 rounded-3xl p-6 sm:p-7 border border-slate-200/90 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-5">
                    <Clock
                      className="w-6 h-6 text-teal-700"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950 mb-2">
                    ساعات کاری
                  </h3>
                  <p className="text-xs text-slate-600 mb-4">
                    پایش ۲۴ ساعته مریضان عاجل و بستری در تمام ایام هفته:
                  </p>

                  <dl className="space-y-3 text-xs tabular-nums">
                    <div className="p-3.5 rounded-2xl bg-teal-900 text-white">
                      <dt className="font-bold text-teal-200">
                        عاجل، ولادت‌خانه و لابراتوار
                      </dt>
                      <dd className="mt-1 font-extrabold text-sm">
                        ۲۴ ساعته · شنبه الی جمعه
                      </dd>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90">
                      <dt className="font-bold text-slate-900">
                        کلینیک‌های تخصصی و جراحی
                      </dt>
                      <dd className="text-slate-600 mt-1">
                        شنبه الی پنجشنبه · ۰۸:۰۰ صبح تا ۰۸:۰۰ شام
                      </dd>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90">
                      <dt className="font-bold text-slate-900">
                        اندوسکوپی و کولونوسکوپی
                      </dt>
                      <dd className="text-slate-600 mt-1">
                        شنبه الی پنجشنبه · ۰۸:۰۰ صبح تا ۰۶:۰۰ شام
                      </dd>
                    </div>
                  </dl>
                </div>

                <p className="mt-5 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                  در حالات عاجل طبی و ولادی، بدون نیاز به نوبت قبلی در هر ساعت از
                  شبانه‌روز مراجعه فرمایید.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Quiet, Trustworthy Footer */}
      <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/90">
            <div className="md:col-span-5 space-y-3">
              <p className="text-xl font-extrabold text-white">
                {HOSPITAL_INFO.name}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                ارائه‌دهنده خدمات تخصصی جراحی‌های کم‌تهاجمی (لاپراسکوپی و
                اندویورولوژی)، اندوسکوپی، کولونوسکوپی، داخله عمومی، نسایی و
                ولادی، اطفال، لابراتوار و رادیولوژی با تجهیزات مدرن در کابل.
              </p>
              <p className="text-xs text-teal-400 font-semibold pt-1">
                آدرس: {HOSPITAL_INFO.address}
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <p className="text-sm font-bold text-white">بخش‌های شفاخانه</p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    جراحی لاپراسکوپی و اندویورولوژی
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    اندوسکوپی و کولونوسکوپی گوارشی
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors"
                  >
                    داخله عمومی، نسایی ولادی و اطفال
                  </a>
                </li>
                <li>
                  <a
                    href="#doctors"
                    className="hover:text-white transition-colors"
                  >
                    کادر داکتران متخصص
                  </a>
                </li>
                <li>
                  <a
                    href="#appointment"
                    className="hover:text-white transition-colors"
                  >
                    ثبت نوبت آنلاین واتساپ
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2.5 tabular-nums">
              <p className="text-sm font-bold text-white">
                ارتباط مستقیم با پذیرش
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                شماره اول و واتساپ:{' '}
                <a
                  href="tel:0799088811"
                  dir="ltr"
                  className="text-white font-bold hover:text-teal-400"
                >
                  0799088811
                </a>
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                شماره دوم معلومات:{' '}
                <a
                  href="tel:0799090098"
                  dir="ltr"
                  className="text-white font-bold hover:text-teal-400"
                >
                  0799090098
                </a>
              </p>
              <div className="pt-2">
                <a
                  href={HOSPITAL_INFO.whatsappBaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle
                    className="w-4 h-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>پیام در واتساپ رسمی شفاخانه</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              تمامی حقوق برای{' '}
              <strong className="text-slate-200">{HOSPITAL_INFO.name}</strong>{' '}
              محفوظ است.
            </p>
            <p>جاده عمومی برچی، ایستگاه مدرسه، کابل · تداوی تخصصی، با اعتماد</p>
          </div>
        </div>
      </footer>

      {/* Mobile-Friendly Bottom Sheet / Modal for Service Details */}
      <AnimatePresence>
        {activeServiceModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-service-title"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setActiveServiceModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 p-6 sm:p-8 max-h-[88vh] overflow-y-auto"
            >
              {/* Mobile Sheet Grab Handle */}
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                    <ServiceIcon name={activeServiceModal.iconName} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal-800">
                      {activeServiceModal.categoryLabel}
                    </p>
                    <h3
                      id="modal-service-title"
                      className="text-xl font-extrabold text-slate-950"
                    >
                      بخش تخصصی {activeServiceModal.title}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveServiceModal(null)}
                  aria-label="بستن پنجره"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>{activeServiceModal.clinicalDetail}</p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <p className="text-xs font-bold text-slate-900 mb-2">
                    علایم و موارد مراجعه به این بخش:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeServiceModal.commonSymptoms.map((sym) => (
                      <li key={sym} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-teal-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200/80">
                    <span className="block font-bold text-teal-950 mb-1">
                      تجهیزات مورد استفاده:
                    </span>
                    <span className="text-slate-700">
                      {activeServiceModal.equipmentUsed}
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                    <span className="block font-bold text-amber-950 mb-1">
                      آمادگی قبل از مراجعه:
                    </span>
                    <span className="text-slate-700">
                      {activeServiceModal.prepNote}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectServiceForAppointment(activeServiceModal)
                  }
                  className="min-h-[48px] flex-1 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>ثبت نوبت آنلاین در بخش {activeServiceModal.title}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveServiceModal(null)}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile-Friendly Bottom Sheet / Modal for Specialist Doctor Details */}
      <AnimatePresence>
        {activeDoctorModal && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-doctor-title"
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setActiveDoctorModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 p-6 sm:p-8 max-h-[88vh] overflow-y-auto"
            >
              <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden" />

              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <img
                    src={activeDoctorModal.photoUrl}
                    alt={activeDoctorModal.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== activeDoctorModal.fallbackSvgDataUri) {
                        target.src = activeDoctorModal.fallbackSvgDataUri;
                      }
                    }}
                    className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <p className="text-xs font-semibold text-teal-800">
                      بخش {activeDoctorModal.departmentName} ·{' '}
                      {activeDoctorModal.experience}
                    </p>
                    <h3
                      id="modal-doctor-title"
                      className="text-xl font-extrabold text-slate-950"
                    >
                      {activeDoctorModal.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {activeDoctorModal.specialty}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveDoctorModal(null)}
                  aria-label="بستن پنجره"
                  className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
                <p>{activeDoctorModal.bio}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                      <Award
                        className="w-4 h-4 text-teal-700"
                        aria-hidden="true"
                      />
                      <span>تحصیلات و بورد تخصصی:</span>
                    </div>
                    <p className="text-slate-600">
                      {activeDoctorModal.education}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                      <FileText
                        className="w-4 h-4 text-teal-700"
                        aria-hidden="true"
                      />
                      <span>سابقه فعالیت کلینیکی:</span>
                    </div>
                    <p className="text-slate-600">
                      {activeDoctorModal.completedCases}
                    </p>
                  </div>
                </div>

                <div className="bg-teal-50/70 rounded-2xl p-4 border border-teal-200/80">
                  <p className="text-xs font-bold text-teal-950 mb-2">
                    عملیات‌ها و خدمات تخصصی قابل ارائه:
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {activeDoctorModal.procedures.map((proc) => (
                      <li key={proc} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-teal-700 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{proc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-slate-500 tabular-nums">
                  ساعات حضور در معاینه‌خانه: {activeDoctorModal.schedule}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleSelectDoctorForAppointment(activeDoctorModal)
                  }
                  className="min-h-[48px] flex-1 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>اخذ نوبت از {activeDoctorModal.name}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDoctorModal(null)}
                  className="min-h-[48px] px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm cursor-pointer"
                >
                  بستن
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
