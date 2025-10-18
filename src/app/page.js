"use client";

import Image from "next/image";
import { useState, useRef } from "react";

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("OKT"); // Standardmonat
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setCurrentMonth(event.month);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
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
                <a href="mailto:info@siebenbuerger-ulm.de" className="rounded-full border border-yellow-400/40 bg-yellow-600/20 px-4 py-2 text-sm font-bold text-yellow-200 transition-all hover:border-yellow-400/60 hover:bg-yellow-600/30">
                  Kontakt
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
                    href="mailto:info@siebenbuerger-ulm.de"
                    onClick={closeMobileMenu}
                    className="block rounded-lg border border-yellow-400/40 bg-yellow-600/20 px-4 py-3 text-center text-base font-bold text-yellow-200 transition-all hover:border-yellow-400/60 hover:bg-yellow-600/30"
                  >
                    Kontakt
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Mitglied werden Button - Desktop oben rechts */}
      <div className="fixed right-6 top-20 z-50 hidden lg:block">
        <a
          href="/documents/mietgliedsvertrag.pdf"
          download
          className="group flex flex-col items-center gap-2 rounded-xl border-2 border-yellow-400/40 bg-gradient-to-br from-slate-900/90 via-slate-800/95 to-slate-900/90 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-300 hover:border-yellow-400/70 hover:shadow-yellow-600/30 hover:scale-105"
        >
          <div className="relative h-16 w-16 rounded-full bg-slate-800/50 p-2 ring-2 ring-yellow-400/30 transition-all duration-300 group-hover:ring-yellow-400/60">
            <Image
              src="/pictures/sbs-siebenbuergenwappenmitschrift.png"
              alt="Siebenbürger Sachsen Wappen"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-yellow-200">
              Mitglied werden
            </p>
            <p className="mt-0.5 text-xs text-slate-300">
              PDF herunterladen
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
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-blue-950/80 via-slate-900/85 to-red-950/75 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
              {/* Kleine Wappen oben links und rechts */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>

              {/* Dekorative Ecken - Wappenfarben */}
              <div className="absolute left-3 top-3 h-10 w-10 border-l-2 border-t-2 border-yellow-400/50"></div>
              <div className="absolute right-3 top-3 h-10 w-10 border-r-2 border-t-2 border-red-400/45"></div>
              <div className="absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-blue-400/45"></div>
              <div className="absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-yellow-400/50"></div>

              <div className="text-center">
                <div className="inline-block rounded-full border-2 border-yellow-400/40 bg-gradient-to-br from-blue-900/50 to-slate-900/60 px-6 py-2 shadow-lg shadow-blue-900/30 backdrop-blur-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200/95 sm:text-sm">
                    Über uns
                  </p>
                </div>

                <h2 className="mt-8 text-3xl font-bold leading-tight text-yellow-100 sm:text-4xl lg:text-5xl">
                  Heimat gestalten in Ulm
                </h2>

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
            <div className="relative rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-red-950/80 via-slate-900/85 to-blue-950/80 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
              {/* Kleine Wappen oben links und rechts */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>

              {/* Dekorative Ecken - Wappenfarben */}
              <div className="absolute left-3 top-3 h-10 w-10 border-l-2 border-t-2 border-red-400/45"></div>
              <div className="absolute right-3 top-3 h-10 w-10 border-r-2 border-t-2 border-blue-400/45"></div>
              <div className="absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-yellow-400/50"></div>
              <div className="absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-red-400/45"></div>

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
              </div>

              {/* Kalender und Termine */}
              <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
                {/* Kalender Links - Einzelner dynamischer Kalender */}
                <div className="flex justify-center lg:w-1/3">
                  <div className="w-full max-w-sm space-y-6">
                    {/* Hinweis */}
                    {selectedEvent && (
                      <div className="rounded-lg border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-900/60 to-amber-900/60 p-4 text-center backdrop-blur-sm shadow-lg">
                        <p className="text-sm font-semibold text-yellow-50">
                          📅 {selectedEvent.title}
                        </p>
                        <p className="mt-1 text-xs text-yellow-100">
                          {selectedEvent.date}. {selectedEvent.month === "OKT" ? "Oktober" : selectedEvent.month === "NOV" ? "November" : "Dezember"} 2025
                        </p>
                      </div>
                    )}

                    {/* Dynamischer Kalender */}
                    {renderCalendar()}
                  </div>
                </div>

                {/* Termine Rechts */}
                <div className="flex-1 space-y-6">
                  {UPCOMING_EVENTS.map((event, index) => {
                    const monthMap = { OKT: 9, NOV: 10, DEZ: 11 };
                    const eventDate = new Date(2025, monthMap[event.month], parseInt(event.date));
                    const weekday = getWeekday(2025, monthMap[event.month], parseInt(event.date));
                    const weekNumber = getWeekNumber(eventDate);
                    const isSelected = selectedEvent?.date === event.date && selectedEvent?.month === event.month;

                    return (
                      <div
                        key={index}
                        onClick={() => handleEventClick(event)}
                        className={`group relative overflow-hidden rounded-lg border-2 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 lg:p-8 cursor-pointer ${
                          isSelected
                            ? "border-yellow-400/60 bg-gradient-to-br from-yellow-900/55 to-slate-900/80 shadow-yellow-600/30"
                            : "border-yellow-400/30 bg-gradient-to-br from-blue-900/45 to-slate-900/75 hover:border-yellow-400/50 hover:shadow-yellow-600/20"
                        }`}
                      >
                      {/* Dekorative Ecken */}
                      <div className="absolute left-2 top-2 h-4 w-4 border-l-2 border-t-2 border-yellow-400/40"></div>
                      <div className="absolute right-2 top-2 h-4 w-4 border-r-2 border-t-2 border-red-400/40"></div>

                      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                        {/* Datum Box */}
                        <div className="flex-shrink-0">
                          <div className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-yellow-400/40 bg-gradient-to-br from-red-900/75 to-yellow-900/75 shadow-lg shadow-red-900/30">
                            <span className="text-xs font-bold uppercase tracking-wider text-yellow-200">
                              {event.month}
                            </span>
                            <span className="mt-1 text-3xl font-bold text-white">
                              {event.date}
                            </span>
                            <span className="text-xs text-slate-100">
                              {event.year}
                            </span>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 space-y-3">
                          <h3 className="text-2xl font-bold text-yellow-50">
                            {event.title}
                          </h3>

                          {/* Wochentag und Kalenderwoche */}
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full border border-yellow-400/30 bg-yellow-900/35 px-3 py-1 font-semibold text-yellow-100">
                              {weekday}
                            </span>
                            <span className="rounded-full border border-blue-400/30 bg-blue-900/35 px-3 py-1 font-semibold text-blue-100">
                              KW {weekNumber}
                            </span>
                          </div>

                          <div className="space-y-2 text-slate-50">
                            {event.time && (
                              <p className="flex items-center gap-2 text-base">
                                <span className="text-yellow-300">🕐</span>
                                <span>{event.time}</span>
                              </p>
                            )}

                            {event.band && (
                              <p className="flex items-center gap-2 text-base">
                                <span className="text-red-300">🎵</span>
                                <span>{event.band}</span>
                              </p>
                            )}

                            <div className="mt-4 rounded-lg border border-blue-400/25 bg-slate-900/40 p-3">
                              <p className="flex items-center gap-2 text-sm font-semibold text-blue-100">
                                <span>📍</span>
                                <span>{event.location}</span>
                              </p>
                              <p className="ml-6 mt-1 text-sm text-slate-200">
                                {event.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      );
                  })}

                  {/* Weitere Termine Hinweis */}
                  <div className="rounded-lg border border-yellow-400/25 bg-slate-900/50 p-6 text-center backdrop-blur-sm">
                    <p className="text-sm text-slate-100">
                      Weitere Termine werden zeitnah bekannt gegeben
                    </p>
                  </div>
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
              {/* Kleine Wappen oben links und rechts */}
              <div className="absolute left-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16">
                <Image
                  src="/pictures/verband-wappen-sw.jpg"
                  alt=""
                  width={64}
                  height={64}
                  className="h-full w-full object-contain grayscale"
                />
              </div>
              <div className="absolute right-6 top-6 h-14 w-14 opacity-20 sm:h-16 sm:w-16">
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
