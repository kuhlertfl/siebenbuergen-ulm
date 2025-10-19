"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const UPCOMING_EVENTS = [
  {
    date: "25",
    month: "OKT",
    year: "2025",
    title: "Der Herbstball",
    time: "Einlass ab 17:00 Uhr",
    band: "mit der Band Duo Rix",
    location: "Bürgerzentrum Wiblingen",
    address: "Buchauer Str. 12, 89079 Ulm-Wiblingen",
  },
  {
    date: "05",
    month: "NOV",
    year: "2025",
    title: "Vorstandssitzung",
    time: "",
    band: "",
    location: "Bürgerzentrum Wiblingen",
    address: "Buchauer Str. 12, 89079 Ulm-Wiblingen",
  },
  {
    date: "07",
    month: "DEZ",
    year: "2025",
    title: "Adventsfeier mit Mitgliederversammlung",
    time: "Einlass 14:00 Uhr/Beginn 15:00 Uhr",
    band: "",
    location: "Bürgerzentrum Wiblingen",
    address: "Buchauer Str. 12, 89079 Ulm-Wiblingen",
  },
];

// Funktion zur Berechnung der Kalenderwoche
function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Funktion für Wochentag
function getWeekday(year, month, day) {
  const date = new Date(year, month, day);
  const weekdays = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  return weekdays[date.getDay()];
}

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(UPCOMING_EVENTS[0]);
  const [currentMonth, setCurrentMonth] = useState("OKT"); // Standardmonat
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setCurrentMonth(event.month);
  };

  const goToSlide = (index) => {
    if (index >= 0 && index < UPCOMING_EVENTS.length) {
      setActiveSlide(index);
      setSelectedEvent(UPCOMING_EVENTS[index]);
      setCurrentMonth(UPCOMING_EVENTS[index].month);
    }
  };

  const nextSlide = () => {
    goToSlide(activeSlide + 1);
  };

  const prevSlide = () => {
    goToSlide(activeSlide - 1);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const monthNames = { OKT: "Oktober", NOV: "November", DEZ: "Dezember" };

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Siebenbürger Sachsen Ulm e.V.", 105, 20, { align: "center" });

    doc.setFontSize(16);
    doc.text("Jahresttermine 2025", 105, 30, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Kreisgruppe Ulm - Tradition lebt. Gemeinschaft verbindet.", 105, 38, { align: "center" });

    // Linie
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    // Termine als Tabelle
    const tableData = UPCOMING_EVENTS.map((event, index) => {
      const monthMap = { OKT: 9, NOV: 10, DEZ: 11 };
      const eventDate = new Date(2025, monthMap[event.month], parseInt(event.date));
      const weekday = getWeekday(2025, monthMap[event.month], parseInt(event.date));

      return [
        `${event.date}. ${monthNames[event.month]} 2025`,
        weekday,
        event.title,
        event.time || "-",
        event.band || "-",
        `${event.location}\n${event.address}`
      ];
    });

    autoTable(doc, {
      startY: 48,
      head: [['Datum', 'Wochentag', 'Veranstaltung', 'Uhrzeit', 'Musik', 'Ort']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [200, 150, 50],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10
      },
      bodyStyles: {
        fontSize: 9,
        cellPadding: 3
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 25 },
        2: { cellWidth: 40 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 'auto' }
      },
      margin: { left: 15, right: 15 }
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(
        `Siebenbürger Sachsen Ulm e.V. • Bürgerzentrum Wiblingen • info@siebenbuerger-ulm.de`,
        105,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
      doc.text(
        `Seite ${i} von ${pageCount}`,
        105,
        doc.internal.pageSize.height - 5,
        { align: "center" }
      );
    }

    // PDF speichern
    doc.save('Siebenbuerger-Sachsen-Ulm-Termine-2025.pdf');
  };

  // Funktion zum Rendern des Kalenders basierend auf dem aktuellen Monat
  const renderCalendar = () => {
    const monthData = {
      OKT: { name: "Oktober", days: 31, startDay: 2, eventDay: 25 },
      NOV: { name: "November", days: 30, startDay: 5, eventDay: 5 },
      DEZ: { name: "Dezember", days: 31, startDay: 0, eventDay: 7 },
    };

    const month = monthData[currentMonth];

    return (
      <div
        key={currentMonth}
        className="overflow-hidden rounded-lg border-2 border-yellow-400/30 bg-gradient-to-br from-slate-900/85 to-slate-800/85 shadow-xl shadow-yellow-900/20 backdrop-blur-sm animate-fade-in"
      >
        <div className="border-b-2 border-yellow-400/30 bg-gradient-to-r from-red-900/60 to-blue-900/60 px-4 py-3">
          <h3 className="text-center text-lg font-bold text-yellow-50">
            {month.name} 2025
          </h3>
        </div>
        <div className="p-4">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
              <div key={day} className="p-1 text-center text-xs font-bold text-yellow-200">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {[...Array(month.startDay)].map((_, i) => (
              <div key={`empty-${i}`} className="p-1"></div>
            ))}
            {[...Array(month.days)].map((_, i) => {
              const day = i + 1;
              const isEvent = day === month.eventDay;
              return (
                <div
                  key={day}
                  className={`flex h-9 w-9 items-center justify-center rounded text-xs font-semibold transition-all duration-300 ${
                    isEvent
                      ? "border-2 border-yellow-400 bg-gradient-to-br from-yellow-600/85 to-red-600/85 text-white shadow-md shadow-yellow-600/40"
                      : "text-slate-100 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Hintergrundbild nur auf größeren Bildschirmen */}
      <div className="fixed inset-0 -z-10 hidden md:block">
        <Image
          src="/pictures/sehenswuerdigkeiten-sighisoara-schaessburg-rumaenien-17.jpg"
          alt="Historische Burg Sighișoara in Siebenbürgen"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-950/30" />
      </div>

      {/* Mobiler Hintergrund mit Wappen-Wasserzeichen */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 md:hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
            alt=""
            fill
            className="object-contain scale-150"
          />
        </div>
      </div>

      <main className="relative min-h-screen bg-transparent text-slate-100">
        {/* Header */}
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-yellow-400/20 bg-slate-950/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <div className="relative h-12 w-12 rounded-full bg-slate-900/60 p-1.5 ring-2 ring-yellow-400/30">
              <Image
                src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                alt="Siebenbürger Sachsen Wappen"
                width={48}
                height={48}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-yellow-200">Siebenbürger Sachsen</p>
              <p className="text-xs text-slate-300">Ulm e.V.</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <a href="#" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Startseite
                </a>
              </li>
              <li>
                <a href="#ueber-uns" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Über uns
                </a>
              </li>
              <li>
                <a href="#termine" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Termine
                </a>
              </li>
              <li>
                <a href="/berichte" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Berichte
                </a>
              </li>
              <li>
                <a href="#kontakt" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Kontakt
                </a>
              </li>
              <li>
                <a href="mailto:info@siebenbuerger-ulm.de" className="rounded-full border border-yellow-400/40 bg-yellow-600/20 px-4 py-2 text-sm font-bold text-yellow-200 transition-all hover:border-yellow-400/60 hover:bg-yellow-600/30">
                  E-Mail
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded p-2 text-slate-200 hover:bg-slate-800/50 transition-colors"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-yellow-400/20 bg-slate-950/98 backdrop-blur-lg">
            <nav className="px-4 py-4">
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800/50 hover:text-yellow-200"
                  >
                    Startseite
                  </a>
                </li>
                <li>
                  <a
                    href="#ueber-uns"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800/50 hover:text-yellow-200"
                  >
                    Über uns
                  </a>
                </li>
                <li>
                  <a
                    href="#termine"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800/50 hover:text-yellow-200"
                  >
                    Termine
                  </a>
                </li>
                <li>
                  <a
                    href="/berichte"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800/50 hover:text-yellow-200"
                  >
                    Berichte
                  </a>
                </li>
                <li>
                  <a
                    href="#galerie"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800/50 hover:text-yellow-200"
                  >
                    Galerie
                  </a>
                </li>
                <li>
                  <a
                    href="#kontakt"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-slate-200 transition-colors hover:bg-slate-800/50 hover:text-yellow-200"
                  >
                    Kontakt
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@siebenbuerger-ulm.de"
                    onClick={closeMobileMenu}
                    className="block rounded-lg border border-yellow-400/40 bg-yellow-600/20 px-4 py-3 text-center text-base font-bold text-yellow-200 transition-all hover:border-yellow-400/60 hover:bg-yellow-600/30"
                  >
                    E-Mail schreiben
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Mitglied werden Button - Desktop oben rechts */}
      <div className="fixed right-3 top-20 z-50 hidden lg:block xl:right-6">
        <a
          href="/documents/mietgliedsvertrag.pdf"
          download
          className="group flex flex-col items-center gap-1 rounded-lg border border-yellow-400/40 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 p-2 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/70 hover:shadow-yellow-600/30 hover:scale-105 xl:gap-2 xl:rounded-xl xl:border-2 xl:p-4 xl:shadow-2xl"
        >
          <div className="relative h-10 w-10 rounded-full bg-slate-800/50 p-1 ring-1 ring-yellow-400/30 transition-all duration-300 group-hover:ring-yellow-400/60 xl:h-16 xl:w-16 xl:p-2 xl:ring-2">
            <Image
              src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
              alt="Siebenbürger Sachsen Wappen"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-yellow-200 xl:text-sm">
              Mitglied<br />werden
            </p>
            <p className="hidden text-xs text-slate-300 xl:block">
              PDF herunterladen
            </p>
          </div>
        </a>
      </div>

      {/* Mitglied werden Button - Mobile oben links */}
      <div className="fixed left-3 top-20 z-50 lg:hidden">
        <a
          href="/documents/mietgliedsvertrag.pdf"
          download
          className="group flex flex-col items-center gap-1 rounded-lg border border-yellow-400/40 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 p-2 shadow-xl shadow-black/40 backdrop-blur-xl transition-all duration-300 active:scale-95"
        >
          <div className="relative h-10 w-10 rounded-full bg-slate-800/50 p-1 ring-1 ring-yellow-400/30">
            <Image
              src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
              alt="Siebenbürger Sachsen Wappen"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase leading-tight tracking-wide text-yellow-200">
              Mitglied<br />werden
            </p>
          </div>
        </a>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col pt-16">
        <div className="flex flex-1 items-center justify-center bg-gradient-to-b from-transparent to-transparent">
          <div className="mx-auto w-full max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            {/* Wappen - prominent zentral */}
            <div className="mb-8 flex justify-center lg:mb-12">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-slate-900/60 p-4 shadow-2xl shadow-black/40 ring-2 ring-amber-200/20 backdrop-blur-md sm:h-48 sm:w-48 lg:h-56 lg:w-56 lg:p-6">
                <Image
                  src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                  alt="Siebenbürger Sachsen Wappen"
                  width={265}
                  height={307}
                  className="h-full w-full object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Textbereich - zentriert */}
            <div className="mx-auto max-w-4xl">
              <div className="inline-block rounded-full border border-amber-200/10 bg-slate-900/40 px-5 py-2 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-200 sm:text-sm">
                  Siebenbürger Sachsen Ulm e.V.
                </p>
              </div>

              <h1 className="mt-8 text-4xl font-bold leading-tight text-white sm:text-5xl lg:mt-10 lg:text-7xl">
                Tradition lebt.
                <br />
                <span className="text-amber-200">Gemeinschaft verbindet.</span>
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg lg:text-xl">
                Verbundenheit zu unseren Wurzeln und ein herzliches
                Miteinander in der Donaustadt – willkommen bei den
                Siebenbürgern in Ulm.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:mt-12">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-amber-400 px-10 py-4 text-sm font-bold uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-500/40 lg:px-12 lg:py-5 lg:text-base"
                  href="#termine"
                >
                  Termine entdecken
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/40 bg-white/5 px-10 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:border-white hover:bg-white/10 lg:px-12 lg:py-5 lg:text-base"
                  href="mailto:info@siebenbuerger-ulm.de"
                >
                  Kontakt aufnehmen
                </a>
              </div>

              {/* Zusatzinfo */}
              <div className="mt-12 lg:mt-16">
                <div className="inline-block rounded-full border border-amber-200/10 bg-slate-900/40 px-6 py-3 backdrop-blur-md">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-200 sm:text-sm">
                    Seit 1955 • Kreisgruppe Ulm
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dekorativer Trenner */}
        <div className="flex items-center justify-center py-12 lg:py-16">
          <div className="flex w-full max-w-3xl items-center gap-4 px-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200/30 to-amber-200/50"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-slate-900/60 backdrop-blur-md">
              <div className="h-8 w-8 opacity-60">
                <Image
                  src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-200/30 to-amber-200/50"></div>
          </div>
        </div>

        {/* Über uns Sektion */}
        <div id="ueber-uns" className="py-8 lg:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-blue-950/80 via-slate-900/85 to-red-950/75 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
              {/* Kleine Wappen oben links und rechts - auf Mobile ausgeblendet */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>

              {/* Dekorative Ecken - Wappenfarben - auf Mobile kleiner */}
              <div className="absolute left-2 top-2 h-6 w-6 sm:left-3 sm:top-3 sm:h-10 sm:w-10 border-l-2 border-t-2 border-yellow-400/50"></div>
              <div className="absolute right-2 top-2 h-6 w-6 sm:right-3 sm:top-3 sm:h-10 sm:w-10 border-r-2 border-t-2 border-red-400/45"></div>
              <div className="absolute bottom-2 left-2 h-6 w-6 sm:bottom-3 sm:left-3 sm:h-10 sm:w-10 border-b-2 border-l-2 border-blue-400/45"></div>
              <div className="absolute bottom-2 right-2 h-6 w-6 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 border-b-2 border-r-2 border-yellow-400/50"></div>

              <div className="text-center">
                <div className="inline-block rounded-full border-2 border-yellow-400/40 bg-gradient-to-br from-blue-900/50 to-slate-900/60 px-6 py-2 shadow-lg shadow-blue-900/30 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200/95 sm:text-sm">
                    Über uns
                  </p>
                </div>

                <h2 className="mt-8 text-3xl font-bold leading-tight text-yellow-100 sm:text-4xl lg:text-5xl">
                  Heimat gestalten in Ulm
                </h2>

                {/* Homepagebild */}
                <div className="mx-auto mt-10 max-w-5xl">
                  <div className="relative overflow-visible rounded-xl border-2 border-yellow-400/40 shadow-2xl shadow-yellow-900/30">
                    {/* Dekorative Ecken außerhalb des Bildes */}
                    <div className="absolute -left-3 -top-3 z-10 h-8 w-8 border-l-2 border-t-2 border-yellow-400/70"></div>
                    <div className="absolute -right-3 -top-3 z-10 h-8 w-8 border-r-2 border-t-2 border-red-400/70"></div>
                    <div className="absolute -bottom-3 -left-3 z-10 h-8 w-8 border-b-2 border-l-2 border-blue-400/70"></div>
                    <div className="absolute -bottom-3 -right-3 z-10 h-8 w-8 border-b-2 border-r-2 border-yellow-400/70"></div>

                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                      <Image
                        src="/pictures/Homepagebild.jpg"
                        alt="Siebenbürger Sachsen Gemeinschaft in Ulm"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>

                <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-50/95 sm:text-lg lg:text-xl">
                  Wir bewahren die Geschichte und das kulturelle Erbe der
                  Siebenbürger Sachsen in Ulm und Umgebung – lebendig, herzlich
                  und offen für alle, die unsere Werte teilen. Ob bei Festen, in
                  Trachtengruppen oder im Ehrenamt: Bei uns wird Heimat gestaltet.
                </p>

                <div className="mt-10 lg:mt-12">
                  <a
                    className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-600/75 to-yellow-500/75 px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg shadow-yellow-900/40 backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/70 hover:from-yellow-500/85 hover:to-yellow-400/85 hover:shadow-xl hover:shadow-yellow-600/50 hover:scale-105 lg:px-10 lg:py-4"
                    href="/ueber-uns"
                  >
                    Mehr über uns erfahren
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dekorativer Trenner */}
        <div className="flex items-center justify-center py-12 lg:py-16">
          <div className="flex w-full max-w-3xl items-center gap-4 px-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200/30 to-amber-200/50"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-slate-900/60 backdrop-blur-md">
              <div className="h-8 w-8 opacity-60">
                <Image
                  src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-200/30 to-amber-200/50"></div>
          </div>
        </div>

        {/* Veranstaltungen und Termine Sektion */}
        <div id="termine" className="py-8 lg:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-visible rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-red-950/80 via-slate-900/85 to-blue-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
              {/* Kleine Wappen oben links und rechts - auf Mobile ausgeblendet */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>

              {/* Dekorative Ecken - Wappenfarben - auf Mobile kleiner */}
              <div className="absolute left-2 top-2 h-6 w-6 sm:left-3 sm:top-3 sm:h-10 sm:w-10 border-l-2 border-t-2 border-red-400/45"></div>
              <div className="absolute right-2 top-2 h-6 w-6 sm:right-3 sm:top-3 sm:h-10 sm:w-10 border-r-2 border-t-2 border-blue-400/45"></div>
              <div className="absolute bottom-2 left-2 h-6 w-6 sm:bottom-3 sm:left-3 sm:h-10 sm:w-10 border-b-2 border-l-2 border-yellow-400/50"></div>
              <div className="absolute bottom-2 right-2 h-6 w-6 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 border-b-2 border-r-2 border-red-400/45"></div>

              {/* Titel */}
              <div className="mb-12 text-center">
                <div className="inline-block rounded-full border-2 border-yellow-400/40 bg-gradient-to-br from-red-900/50 to-slate-900/60 px-6 py-2 shadow-lg shadow-red-900/30 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200/95 sm:text-sm">
                    Veranstaltungen und Termine
                  </p>
                </div>
                <h2 className="mt-6 text-3xl font-bold leading-tight text-yellow-100 sm:text-4xl lg:text-5xl">
                  Kommende Veranstaltungen
                </h2>

                {/* PDF Download Button */}
                <div className="mt-8">
                  <button
                    onClick={downloadPDF}
                    className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-600/75 to-yellow-500/75 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg shadow-yellow-900/40 backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/70 hover:from-yellow-500/85 hover:to-yellow-400/85 hover:shadow-xl hover:shadow-yellow-600/50 hover:scale-105 sm:px-8"
                  >
                    <span>📅</span>
                    <span>Alle Termine 2025 als PDF herunterladen</span>
                  </button>
                </div>
              </div>

              {/* Hauptveranstaltung - Custom Slider */}
              <div className="relative">
                {/* Navigation Buttons - Desktop */}
                <button
                  onClick={prevSlide}
                  disabled={activeSlide === 0}
                  className="absolute left-0 top-1/2 z-20 hidden -translate-x-full -translate-y-1/2 lg:flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-400/40 bg-slate-900/90 text-yellow-400 backdrop-blur-md transition-all hover:border-yellow-400/70 hover:bg-slate-900 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ marginLeft: '-5px' }}
                >
                  <span className="text-2xl font-bold">‹</span>
                </button>
                <button
                  onClick={nextSlide}
                  disabled={activeSlide === UPCOMING_EVENTS.length - 1}
                  className="absolute right-0 top-1/2 z-20 hidden translate-x-full -translate-y-1/2 lg:flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-400/40 bg-slate-900/90 text-yellow-400 backdrop-blur-md transition-all hover:border-yellow-400/70 hover:bg-slate-900 hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ marginRight: '-5px' }}
                >
                  <span className="text-2xl font-bold">›</span>
                </button>

                {/* Slider Container */}
                <div
                  className="relative overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                  >
                    {UPCOMING_EVENTS.map((event, index) => {
                      const monthMap = { OKT: 9, NOV: 10, DEZ: 11 };
                      const eventDate = new Date(2025, monthMap[event.month], parseInt(event.date));
                      const weekday = getWeekday(2025, monthMap[event.month], parseInt(event.date));
                      const weekNumber = getWeekNumber(eventDate);

                      return (
                        <div key={index} className="w-full flex-shrink-0">
                          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                            {/* Veranstaltungs-Details */}
                            <div className="flex-1">
                              <div className="group relative overflow-hidden rounded-lg border-2 border-yellow-400/60 bg-gradient-to-br from-yellow-900/55 to-slate-900/80 p-4 shadow-xl shadow-yellow-600/30 backdrop-blur-sm sm:p-6 lg:p-8">
                                {/* Dekorative Ecken */}
                                <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                                <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                                  {/* Datum Box */}
                                  <div className="flex-shrink-0 self-start">
                                    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-yellow-400/40 bg-gradient-to-br from-red-900/75 to-yellow-900/75 shadow-lg shadow-red-900/30 sm:h-28 sm:w-28">
                                      <span className="text-xs font-bold uppercase tracking-wider text-yellow-200">
                                        {event.month}
                                      </span>
                                      <span className="mt-1 text-3xl font-bold text-white sm:text-4xl">
                                        {event.date}
                                      </span>
                                      <span className="text-xs text-slate-100">
                                        {event.year}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Event Details */}
                                  <div className="flex-1 min-w-0 space-y-3">
                                    <h3 className="text-xl font-bold text-yellow-50 break-words sm:text-2xl lg:text-3xl">
                                      {event.title}
                                    </h3>

                                    {/* Wochentag und Kalenderwoche */}
                                    <div className="flex flex-wrap items-center gap-2 text-sm">
                                      <span className="rounded-full border border-yellow-400/30 bg-yellow-900/35 px-3 py-1 font-semibold text-yellow-100 text-xs sm:text-sm">
                                        {weekday}
                                      </span>
                                      <span className="rounded-full border border-blue-400/30 bg-blue-900/35 px-3 py-1 font-semibold text-blue-100 text-xs sm:text-sm">
                                        KW {weekNumber}
                                      </span>
                                    </div>

                                    <div className="space-y-2 text-slate-50">
                                      {event.time && (
                                        <p className="flex items-start gap-2 text-sm sm:text-base">
                                          <span className="text-yellow-300 flex-shrink-0">🕐</span>
                                          <span className="break-words">{event.time}</span>
                                        </p>
                                      )}

                                      {event.band && (
                                        <p className="flex items-start gap-2 text-sm sm:text-base">
                                          <span className="text-red-300 flex-shrink-0">🎵</span>
                                          <span className="break-words">{event.band}</span>
                                        </p>
                                      )}

                                      <div className="mt-4 rounded-lg border border-blue-400/25 bg-slate-900/40 p-3">
                                        <p className="flex items-start gap-2 text-sm font-semibold text-blue-100">
                                          <span className="flex-shrink-0">📍</span>
                                          <span className="break-words">{event.location}</span>
                                        </p>
                                        <p className="ml-6 mt-1 text-xs sm:text-sm text-slate-200 break-words">
                                          {event.address}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Kalender Rechts - Nur auf Desktop sichtbar */}
                            <div className="hidden lg:block lg:w-80 flex-shrink-0">
                              <div className="space-y-4">
                                {/* Hinweis */}
                                <div className="rounded-lg border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-900/60 to-amber-900/60 p-4 text-center backdrop-blur-sm shadow-lg">
                                  <p className="text-sm font-semibold text-yellow-50">
                                    📅 {event.title}
                                  </p>
                                  <p className="mt-1 text-xs text-yellow-100">
                                    {event.date}. {event.month === "OKT" ? "Oktober" : event.month === "NOV" ? "November" : "Dezember"} 2025
                                  </p>
                                </div>

                                {/* Kalender für diesen Event */}
                                {index === activeSlide && renderCalendar()}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="mt-8 flex justify-center gap-2">
                  {UPCOMING_EVENTS.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-3 w-3 rounded-full transition-all ${
                        index === activeSlide
                          ? 'bg-yellow-400 w-8'
                          : 'bg-yellow-400/30 hover:bg-yellow-400/50'
                      }`}
                      aria-label={`Gehe zu Termin ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Kompakte Übersicht aller Termine */}
              <div className="mt-12">
                <h3 className="mb-6 text-center text-xl font-bold text-yellow-100">Alle Termine im Überblick</h3>
                <div className="space-y-3">
                  {UPCOMING_EVENTS.map((event, index) => {
                    const monthNames = { OKT: "Oktober", NOV: "November", DEZ: "Dezember" };
                    const isActive = index === activeSlide;

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between rounded-lg border p-3 transition-all cursor-pointer ${
                          isActive
                            ? "border-yellow-400/60 bg-yellow-900/30"
                            : "border-yellow-400/20 bg-slate-900/40 hover:border-yellow-400/40 hover:bg-slate-900/60"
                        }`}
                        onClick={() => {
                          goToSlide(index);
                        }}
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-lg border border-yellow-400/30 bg-gradient-to-br from-red-900/50 to-yellow-900/50">
                            <div className="text-center">
                              <div className="text-xs font-bold text-yellow-200">{event.date}</div>
                              <div className="text-xs text-slate-100">{event.month}</div>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-yellow-50 truncate text-sm sm:text-base">{event.title}</p>
                            <p className="text-xs text-slate-300 truncate sm:text-sm">{event.date}. {monthNames[event.month]} 2025</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          <span className={`text-xl transition-transform ${isActive ? "text-yellow-400" : "text-slate-400"}`}>
                            →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dekorativer Trenner */}
        <div className="flex items-center justify-center py-12 lg:py-16">
          <div className="flex w-full max-w-3xl items-center gap-4 px-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200/30 to-amber-200/50"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-slate-900/60 backdrop-blur-md">
              <div className="h-8 w-8 opacity-60">
                <Image
                  src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-200/30 to-amber-200/50"></div>
          </div>
        </div>

        {/* Vergangene Veranstaltungen Sektion */}
        <div id="galerie" className="py-8 lg:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-slate-900/85 via-slate-950/90 to-blue-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
              {/* Kleine Wappen oben links und rechts - auf Mobile ausgeblendet */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>

              {/* Dekorative Ecken */}
              <div className="absolute left-3 top-3 h-10 w-10 border-l-2 border-t-2 border-yellow-400/50"></div>
              <div className="absolute right-3 top-3 h-10 w-10 border-r-2 border-t-2 border-blue-400/45"></div>
              <div className="absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-blue-400/45"></div>
              <div className="absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-yellow-400/50"></div>

              {/* Inhalt */}
              <div className="text-center">
                <div className="inline-block rounded-full border-2 border-yellow-400/40 bg-gradient-to-br from-slate-900/50 to-blue-900/60 px-6 py-2 shadow-lg shadow-blue-900/30 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200/95 sm:text-sm">
                    Unsere Gemeinschaft
                  </p>
                </div>

                <h2 className="mt-8 text-3xl font-bold leading-tight text-yellow-100 sm:text-4xl lg:text-5xl">
                  Momente, die verbinden
                </h2>

                <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-50/95 sm:text-lg lg:text-xl">
                  Von festlichen Bällen bis zu gemütlichen Adventsabenden – erleben Sie die
                  Herzlichkeit und Tradition unserer Gemeinschaft. Tauchen Sie ein in die
                  Erinnerungen an unvergessliche Feste, lebendige Trachtenauftritte und
                  fröhliche Zusammenkünfte.
                </p>

                {/* Preview Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Preview Card 1 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/60 to-slate-900/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-700/50">
                      <Image
                        src="/pictures/MamaundKatainRumaenien.JPG"
                        alt="Traditionelle Feste in Rumänien"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-yellow-100">Traditionelle Feste</h3>
                      <p className="mt-2 text-sm text-slate-300">Herbstbälle, Adventsfeier & mehr</p>
                    </div>
                  </div>

                  {/* Preview Card 2 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/60 to-slate-900/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-700/50">
                      <Image
                        src="/pictures/DuoRixMonundRick.JPG"
                        alt="Duo Rix - Mon und Rick"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-yellow-100">Immer gute Musik und gute Laune</h3>
                      <p className="mt-2 text-sm text-slate-300">Live-Musik bei unseren Festen</p>
                    </div>
                  </div>

                  {/* Preview Card 3 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/60 to-slate-900/80 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    <div className="aspect-[4/3] relative overflow-hidden bg-slate-700/50">
                      <Image
                        src="/pictures/LeoundClaudia.JPG"
                        alt="Leo und Claudia beim Faschingsball"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-base font-bold text-yellow-100">Faschingsball</h3>
                      <p className="mt-2 text-sm text-slate-300">Buntes Treiben mit Tanz & Kostümen</p>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-12 lg:mt-16">
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-600/75 to-yellow-500/75 px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg shadow-yellow-900/40 backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/70 hover:from-yellow-500/85 hover:to-yellow-400/85 hover:shadow-xl hover:shadow-yellow-600/50 hover:scale-105 lg:px-10 lg:py-4"
                    href="/galerie"
                  >
                    <span>Unsere schönsten Momente entdecken</span>
                    <span className="text-lg">→</span>
                  </a>
                  <p className="mt-4 text-sm text-slate-400">
                    Tauchen Sie ein in unsere Bildergalerie
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dekorativer Trenner */}
        <div className="flex items-center justify-center py-12 lg:py-16">
          <div className="flex w-full max-w-3xl items-center gap-4 px-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-200/30 to-amber-200/50"></div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-200/30 bg-slate-900/60 backdrop-blur-md">
              <div className="h-8 w-8 opacity-60">
                <Image
                  src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-amber-200/30 to-amber-200/50"></div>
          </div>
        </div>

        {/* Kontakt und Ansprechpartner Sektion */}
        <div id="kontakt" className="py-8 lg:py-12">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-blue-950/80 via-slate-900/85 to-red-950/75 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
              {/* Kleine Wappen oben links und rechts - auf Mobile ausgeblendet */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16 hidden sm:block">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>

              {/* Dekorative Ecken - Wappenfarben - auf Mobile kleiner */}
              <div className="absolute left-2 top-2 h-6 w-6 sm:left-3 sm:top-3 sm:h-10 sm:w-10 border-l-2 border-t-2 border-yellow-400/50"></div>
              <div className="absolute right-2 top-2 h-6 w-6 sm:right-3 sm:top-3 sm:h-10 sm:w-10 border-r-2 border-t-2 border-red-400/45"></div>
              <div className="absolute bottom-2 left-2 h-6 w-6 sm:bottom-3 sm:left-3 sm:h-10 sm:w-10 border-b-2 border-l-2 border-blue-400/45"></div>
              <div className="absolute bottom-2 right-2 h-6 w-6 sm:bottom-3 sm:right-3 sm:h-10 sm:w-10 border-b-2 border-r-2 border-yellow-400/50"></div>

              <div className="text-center">
                <div className="inline-block rounded-full border-2 border-yellow-400/40 bg-gradient-to-br from-blue-900/50 to-slate-900/60 px-6 py-2 shadow-lg shadow-blue-900/30 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200/95 sm:text-sm">
                    Kontakt & Ansprechpartner
                  </p>
                </div>

                <h2 className="mt-8 text-3xl font-bold leading-tight text-yellow-100 sm:text-4xl lg:text-5xl">
                  Unser Vorstand
                </h2>

                <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-50/95 sm:text-lg lg:text-xl">
                  Mit Herz und Engagement gestalten wir gemeinsam die Zukunft unserer
                  Kreisgruppe. Lernen Sie die Menschen kennen, die unsere Gemeinschaft
                  leiten und für unsere Traditionen einstehen.
                </p>

                {/* Vorstandsmitglieder */}
                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Vorstandsmitglied 1 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/70 to-slate-900/85 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    {/* Dekorative Ecken */}
                    <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                    <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400/40"></div>
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400/40"></div>

                    {/* Bild Platzhalter */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-slate-600/50 p-4 ring-2 ring-yellow-400/30">
                          <Image
                            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                            alt="Vorstandsmitglied"
                            width={96}
                            height={96}
                            className="h-full w-full object-contain opacity-40"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-yellow-100">Vorsitzender</h3>
                      <p className="mt-1 text-base font-semibold text-slate-200">Name folgt</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Verantwortlich für die Leitung und strategische Ausrichtung der Kreisgruppe.
                      </p>
                    </div>
                  </div>

                  {/* Vorstandsmitglied 2 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/70 to-slate-900/85 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    {/* Dekorative Ecken */}
                    <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                    <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400/40"></div>
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400/40"></div>

                    {/* Bild Platzhalter */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-slate-600/50 p-4 ring-2 ring-yellow-400/30">
                          <Image
                            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                            alt="Vorstandsmitglied"
                            width={96}
                            height={96}
                            className="h-full w-full object-contain opacity-40"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-yellow-100">Stellvertretender Vorsitzender</h3>
                      <p className="mt-1 text-base font-semibold text-slate-200">Name folgt</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Unterstützt den Vorsitzenden und koordiniert wichtige Projekte.
                      </p>
                    </div>
                  </div>

                  {/* Vorstandsmitglied 3 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/70 to-slate-900/85 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    {/* Dekorative Ecken */}
                    <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                    <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400/40"></div>
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400/40"></div>

                    {/* Bild Platzhalter */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-slate-600/50 p-4 ring-2 ring-yellow-400/30">
                          <Image
                            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                            alt="Vorstandsmitglied"
                            width={96}
                            height={96}
                            className="h-full w-full object-contain opacity-40"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-yellow-100">Kassenwart</h3>
                      <p className="mt-1 text-base font-semibold text-slate-200">Name folgt</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Verwaltet die Finanzen und sorgt für Transparenz in der Kasse.
                      </p>
                    </div>
                  </div>

                  {/* Vorstandsmitglied 4 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/70 to-slate-900/85 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    {/* Dekorative Ecken */}
                    <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                    <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400/40"></div>
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400/40"></div>

                    {/* Bild Platzhalter */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-slate-600/50 p-4 ring-2 ring-yellow-400/30">
                          <Image
                            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                            alt="Vorstandsmitglied"
                            width={96}
                            height={96}
                            className="h-full w-full object-contain opacity-40"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-yellow-100">Schriftführer</h3>
                      <p className="mt-1 text-base font-semibold text-slate-200">Name folgt</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Dokumentiert Sitzungen und kümmert sich um die Korrespondenz.
                      </p>
                    </div>
                  </div>

                  {/* Vorstandsmitglied 5 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/70 to-slate-900/85 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    {/* Dekorative Ecken */}
                    <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                    <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400/40"></div>
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400/40"></div>

                    {/* Bild Platzhalter */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-slate-600/50 p-4 ring-2 ring-yellow-400/30">
                          <Image
                            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                            alt="Vorstandsmitglied"
                            width={96}
                            height={96}
                            className="h-full w-full object-contain opacity-40"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-yellow-100">Kulturbeauftragte</h3>
                      <p className="mt-1 text-base font-semibold text-slate-200">Name folgt</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Organisiert Veranstaltungen und pflegt unser kulturelles Erbe.
                      </p>
                    </div>
                  </div>

                  {/* Vorstandsmitglied 6 */}
                  <div className="group relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-br from-slate-800/70 to-slate-900/85 shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-yellow-400/60 hover:shadow-2xl hover:shadow-yellow-600/30 hover:scale-105">
                    {/* Dekorative Ecken */}
                    <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                    <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>
                    <div className="absolute bottom-2 left-2 h-4 w-4 border-b-2 border-l-2 border-blue-400/40"></div>
                    <div className="absolute bottom-2 right-2 h-4 w-4 border-b-2 border-r-2 border-yellow-400/40"></div>

                    {/* Bild Platzhalter */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-slate-700/60 to-slate-800/70">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-slate-600/50 p-4 ring-2 ring-yellow-400/30">
                          <Image
                            src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                            alt="Vorstandsmitglied"
                            width={96}
                            height={96}
                            className="h-full w-full object-contain opacity-40"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-yellow-100">Beisitzer</h3>
                      <p className="mt-1 text-base font-semibold text-slate-200">Name folgt</p>
                      <p className="mt-3 text-sm text-slate-300">
                        Berät den Vorstand und bringt wichtige Perspektiven ein.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Kontakt Button */}
                <div className="mt-12 lg:mt-16">
                  <a
                    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-600/75 to-yellow-500/75 px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg shadow-yellow-900/40 backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/70 hover:from-yellow-500/85 hover:to-yellow-400/85 hover:shadow-xl hover:shadow-yellow-600/50 hover:scale-105 lg:px-10 lg:py-4"
                    href="mailto:info@siebenbuerger-ulm.de"
                  >
                    <span>Kontakt aufnehmen</span>
                    <span className="text-lg">✉</span>
                  </a>
                  <p className="mt-4 text-sm text-slate-300">
                    info@siebenbuerger-ulm.de
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative mt-16 border-t border-yellow-400/20 bg-slate-950/90 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Logo und Beschreibung */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-14 w-14 rounded-full bg-slate-900/60 p-2 ring-2 ring-yellow-400/30">
                    <Image
                      src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
                      alt="Siebenbürger Sachsen Wappen"
                      width={56}
                      height={56}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-yellow-200">Siebenbürger Sachsen Ulm e.V.</p>
                    <p className="text-sm text-slate-300">Seit 1955 • Kreisgruppe Ulm</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 max-w-md">
                  Wir bewahren die Geschichte und das kulturelle Erbe der Siebenbürger Sachsen
                  in Ulm und Umgebung – lebendig, herzlich und offen für alle.
                </p>
              </div>

              {/* Kontakt */}
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-yellow-200">Kontakt</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">📧</span>
                    <a href="mailto:info@siebenbuerger-ulm.de" className="hover:text-yellow-200 transition-colors">
                      info@siebenbuerger-ulm.de
                    </a>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400">📍</span>
                    <span>Bürgerzentrum Wiblingen<br/>Buchauer Str. 12<br/>89079 Ulm-Wiblingen</span>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-yellow-200">Weitere Links</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>
                    <a href="#ueber-uns" className="hover:text-yellow-200 transition-colors">Über uns</a>
                  </li>
                  <li>
                    <a href="#termine" className="hover:text-yellow-200 transition-colors">Termine</a>
                  </li>
                  <li>
                    <a href="/berichte" className="hover:text-yellow-200 transition-colors">Berichte</a>
                  </li>
                  <li>
                    <a href="/documents/mietgliedsvertrag.pdf" download className="hover:text-yellow-200 transition-colors">
                      Mitglied werden
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@siebenbuerger-ulm.de" className="hover:text-yellow-200 transition-colors">
                      Kontakt
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-t border-yellow-400/10 pt-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-slate-400">
                  © {new Date().getFullYear()} Siebenbürger Sachsen Ulm e.V. Alle Rechte vorbehalten.
                </p>
                <div className="flex gap-6 text-sm text-slate-400">
                  <a href="/impressum" className="hover:text-yellow-200 transition-colors">Impressum</a>
                  <a href="/datenschutz" className="hover:text-yellow-200 transition-colors">Datenschutz</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
    </>
  );
}
