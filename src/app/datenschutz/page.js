"use client";

import Image from "next/image";
import Link from "next/link";

export default function Datenschutz() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-yellow-400/20 bg-slate-950/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
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
          </Link>

          {/* Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link href="/" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/#ueber-uns" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/#termine" className="text-sm font-semibold text-slate-200 transition-colors hover:text-yellow-200">
                  Termine
                </Link>
              </li>
              <li>
                <a href="mailto:info@siebenbuerger-ulm.de" className="rounded-full border border-yellow-400/40 bg-yellow-600/20 px-4 py-2 text-sm font-bold text-yellow-200 transition-all hover:border-yellow-400/60 hover:bg-yellow-600/30">
                  Kontakt
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <Link href="/" className="md:hidden rounded p-2 text-slate-200 hover:bg-slate-800/50">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-xl border-2 border-yellow-500/30 bg-gradient-to-br from-slate-900/85 via-slate-950/90 to-slate-900/85 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-12 lg:p-16">
            {/* Dekorative Ecken */}
            <div className="absolute left-3 top-3 h-10 w-10 border-l-2 border-t-2 border-yellow-400/50"></div>
            <div className="absolute right-3 top-3 h-10 w-10 border-r-2 border-t-2 border-blue-400/45"></div>
            <div className="absolute bottom-3 left-3 h-10 w-10 border-b-2 border-l-2 border-blue-400/45"></div>
            <div className="absolute bottom-3 right-3 h-10 w-10 border-b-2 border-r-2 border-yellow-400/50"></div>

            {/* Titel */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-yellow-100 sm:text-4xl lg:text-5xl">
                Datenschutzerklärung
              </h1>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-100">
              <section>
                <p className="text-base leading-relaxed">
                  Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutzgrundverordnung (DSGVO), ist:
                </p>
                <p className="mt-4 text-base font-semibold text-yellow-200">
                  Angaben gemäß § 5 TMG:
                </p>
                <div className="mt-4 rounded-lg border border-yellow-400/20 bg-slate-900/40 p-4">
                  <p className="text-base leading-relaxed">
                    Verband der Siebenbürger Sachsen in Deutschland e.V.<br />
                    Kreisgruppe Ulm/Neu-Ulm<br />
                    Gansweidweg 1<br />
                    89155 Erbach
                  </p>
                  <p className="mt-4 text-base">
                    <strong className="text-yellow-200">Vertreten durch:</strong><br />
                    Vorsitzende Claudia Benkö
                  </p>
                  <p className="mt-4 text-base">
                    <strong className="text-yellow-200">Tel:</strong> +49 (0) 7305 1780335<br />
                    <strong className="text-yellow-200">E-Mail:</strong> <a href="mailto:vorsitzende@siebenbuerger-ulm.de" className="text-yellow-300 hover:text-yellow-200">vorsitzende@siebenbuerger-ulm.de</a>
                  </p>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Ihre Betroffenenrechte</h2>
                <p className="text-base leading-relaxed mb-4">
                  Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten können Sie jederzeit folgende Rechte ausüben:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base text-slate-200 ml-4">
                  <li>Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),</li>
                  <li>Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),</li>
                  <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),</li>
                  <li>Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),</li>
                  <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO) und</li>
                  <li>Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben (Art. 20 DSGVO).</li>
                </ul>
                <p className="mt-4 text-base leading-relaxed">
                  Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Sie können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige Behörde.
                </p>
                <p className="mt-4 text-base leading-relaxed">
                  Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen Bereich) mit Anschrift finden Sie unter:{" "}
                  <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html
                  </a>
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Verwendung von Google Maps</h2>
                <h3 className="text-xl font-semibold text-yellow-200 mb-3">Art und Zweck der Verarbeitung:</h3>
                <p className="text-base leading-relaxed mb-4">
                  Auf dieser Webseite nutzen wir das Angebot von Google Maps. Google Maps wird von Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA (nachfolgend &ldquo;Google&rdquo;) betrieben. Dadurch können wir Ihnen interaktive Karten direkt in der Webseite anzeigen und ermöglichen Ihnen die komfortable Nutzung der Karten-Funktion.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Nähere Informationen über die Datenverarbeitung durch Google können Sie den Google-Datenschutzhinweisen entnehmen. Dort können Sie im Datenschutzcenter auch Ihre persönlichen Datenschutz-Einstellungen verändern.
                </p>

                <h3 className="text-xl font-semibold text-yellow-200 mb-3 mt-6">Rechtsgrundlage:</h3>
                <p className="text-base leading-relaxed mb-4">
                  Rechtsgrundlage für die Einbindung von Google Maps und dem damit verbundenen Datentransfer zu Google ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                </p>

                <h3 className="text-xl font-semibold text-yellow-200 mb-3 mt-6">Empfänger:</h3>
                <p className="text-base leading-relaxed mb-4">
                  Durch den Besuch der Webseite erhält Google Informationen, dass Sie die entsprechende Unterseite unserer Webseite aufgerufen haben. Dies erfolgt unabhängig davon, ob Google ein Nutzerkonto bereitstellt, über das Sie eingeloggt sind, oder ob keine Nutzerkonto besteht. Wenn Sie bei Google eingeloggt sind, werden Ihre Daten direkt Ihrem Konto zugeordnet.
                </p>

                <h3 className="text-xl font-semibold text-yellow-200 mb-3 mt-6">Drittlandtransfer:</h3>
                <p className="text-base leading-relaxed mb-4">
                  Google verarbeitet Ihre Daten in den USA und hat sich dem EU_US Privacy Shield unterworfen{" "}
                  <a href="https://www.privacyshield.gov/EU-US-Framework" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    https://www.privacyshield.gov/EU-US-Framework
                  </a>
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Eingebettete YouTube-Videos</h2>
                <h3 className="text-xl font-semibold text-yellow-200 mb-3">Art und Zweck der Verarbeitung:</h3>
                <p className="text-base leading-relaxed mb-4">
                  Auf einigen unserer Webseiten betten wir YouTube-Videos ein. Betreiber der entsprechenden Plugins ist die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA (nachfolgend &ldquo;YouTube&rdquo;). Wenn Sie eine Seite mit dem YouTube-Plugin besuchen, wird eine Verbindung zu Servern von YouTube hergestellt. Dabei wird YouTube mitgeteilt, welche Seiten Sie besuchen. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, kann YouTube Ihr Surfverhalten Ihnen persönlich zuzuordnen. Dies verhindern Sie, indem Sie sich vorher aus Ihrem YouTube-Account ausloggen.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Wird ein YouTube-Video gestartet, setzt der Anbieter Cookies ein, die Hinweise über das Nutzerverhalten sammeln.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Weitere Informationen zu Zweck und Umfang der Datenerhebung und ihrer Verarbeitung durch YouTube erhalten Sie in den Datenschutzerklärungen des Anbieters unter:{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    https://policies.google.com/privacy
                  </a>
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Social Plugins</h2>
                <h3 className="text-xl font-semibold text-yellow-200 mb-3">Art und Zweck der Verarbeitung:</h3>
                <p className="text-base leading-relaxed mb-4">
                  Wir bieten Ihnen auf unserer Webseite die Möglichkeit der Nutzung von sog. &ldquo;Social-Media-Buttons&rdquo; an. Zum Schutze Ihrer Daten setzen wir bei der Implementierung auf die Lösung &ldquo;Shariff&rdquo;. Hierdurch werden diese Buttons auf der Webseite lediglich als Grafik eingebunden, die eine Verlinkung auf die entsprechende Webseite des Button-Anbieters enthält.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Änderung unserer Datenschutzbestimmungen</h2>
                <p className="text-base leading-relaxed mb-4">
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Fragen an den Datenschutzbeauftragten</h2>
                <p className="text-base leading-relaxed mb-4">
                  Wenn Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail oder wenden Sie sich direkt an die für den Datenschutz verantwortliche Person in unserer Organisation:
                </p>
                <p className="text-base">
                  <a href="mailto:info@siebenbuerger-ulm.de" className="text-yellow-300 hover:text-yellow-200 font-semibold">
                    info@siebenbuerger-ulm.de
                  </a>
                </p>
              </section>

              <section className="mt-8 pt-8 border-t border-yellow-400/20">
                <p className="text-sm text-slate-400 italic">
                  Die Datenschutzerklärung wurde mit dem Datenschutzerklärungs-Generator der activeMind AG erstellt (Version 2018-06-22).
                </p>
              </section>
            </div>

            {/* Back Button */}
            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-yellow-400/50 bg-gradient-to-r from-yellow-600/75 to-yellow-500/75 px-8 py-3 text-sm font-bold uppercase tracking-wide text-slate-900 shadow-lg shadow-yellow-900/40 backdrop-blur-sm transition-all duration-300 hover:border-yellow-300/70 hover:from-yellow-500/85 hover:to-yellow-400/85 hover:shadow-xl hover:shadow-yellow-600/50 hover:scale-105"
              >
                <span>←</span>
                <span>Zurück zur Startseite</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t border-yellow-400/20 bg-slate-950/90 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Siebenbürger Sachsen Ulm e.V. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <a href="/impressum" className="hover:text-yellow-200 transition-colors">Impressum</a>
              <a href="/datenschutz" className="hover:text-yellow-200 transition-colors">Datenschutz</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
