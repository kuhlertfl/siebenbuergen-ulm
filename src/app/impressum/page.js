"use client";

import Image from "next/image";
import Link from "next/link";

export default function Impressum() {
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
                Impressum
              </h1>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-100">
              <section>
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Angaben gemäß § 5 TMG:</h2>
                <div className="rounded-lg border border-yellow-400/20 bg-slate-900/40 p-4">
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
                  <p className="mt-4 text-base">
                    <strong className="text-yellow-200">Webmaster:</strong><br />
                    Jürgen Schnabel
                  </p>
                  <p className="mt-2 text-base">
                    <strong className="text-yellow-200">Tel:</strong> +49 (0) 731 9503295<br />
                    <strong className="text-yellow-200">E-Mail:</strong> <a href="mailto:webmaster@siebenbuerger-ulm.de" className="text-yellow-300 hover:text-yellow-200">webmaster@siebenbuerger-ulm.de</a>
                  </p>
                </div>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Satzung</h2>
                <p className="text-base leading-relaxed mb-4">
                  Es gilt die Satzung: Verband der Siebenbürger Sachsen in Deutschland e.V.
                </p>
                <p className="text-base leading-relaxed">
                  Sie können die Satzung im PDF-Format lesen bzw. herunterladen.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Online-Streitbeilegung</h2>
                <p className="text-base leading-relaxed mb-4">
                  <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.show&lng=DE" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home.show&lng=DE
                  </a>
                </p>
                <p className="text-base leading-relaxed">
                  Wir sind weder bereit noch verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Haftungsausschluss</h2>

                <h3 className="text-xl font-semibold text-yellow-200 mb-3 mt-6">Haftung für Inhalte</h3>
                <p className="text-base leading-relaxed mb-4">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>

                <h3 className="text-xl font-semibold text-yellow-200 mb-3 mt-6">Haftung für Links</h3>
                <p className="text-base leading-relaxed mb-4">
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>

                <h3 className="text-xl font-semibold text-yellow-200 mb-3 mt-6">Urheberrecht</h3>
                <p className="text-base leading-relaxed mb-4">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Datenschutz</h2>
                <p className="text-base leading-relaxed mb-4">
                  Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Datenschutzerklärung für die Nutzung von Facebook-Plugins (Like-Button)</h2>
                <p className="text-base leading-relaxed mb-4">
                  Auf unseren Seiten sind Plugins des sozialen Netzwerks Facebook, 1601 South California Avenue, Palo Alto, CA 94304, USA integriert. Die Facebook-Plugins erkennen Sie an dem Facebook-Logo oder dem &ldquo;Like-Button&rdquo; (&ldquo;Gefällt mir&rdquo;) auf unserer Seite. Eine Übersicht über die Facebook-Plugins finden Sie hier:{" "}
                  <a href="http://developers.facebook.com/docs/plugins/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    http://developers.facebook.com/docs/plugins/
                  </a>
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Wenn Sie unsere Seiten besuchen, wird über das Plugin eine direkte Verbindung zwischen Ihrem Browser und dem Facebook-Server hergestellt. Facebook erhält dadurch die Information, dass Sie mit Ihrer IP-Adresse unsere Seite besucht haben. Wenn Sie den Facebook &ldquo;Like-Button&rdquo; anklicken während Sie in Ihrem Facebook-Account eingeloggt sind, können Sie die Inhalte unserer Seiten auf Ihrem Facebook-Profil verlinken. Dadurch kann Facebook den Besuch unserer Seiten Ihrem Benutzerkonto zuordnen.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Wir weisen darauf hin, dass wir als Anbieter der Seiten keine Kenntnis vom Inhalt der übermittelten Daten sowie deren Nutzung durch Facebook erhalten. Weitere Informationen hierzu finden Sie in der Datenschutzerklärung von Facebook unter{" "}
                  <a href="http://de-de.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    http://de-de.facebook.com/policy.php
                  </a>
                </p>
                <p className="text-base leading-relaxed">
                  Wenn Sie nicht wünschen, dass Facebook den Besuch unserer Seiten Ihrem Facebook-Nutzerkonto zuordnen kann, loggen Sie sich bitte aus Ihrem Facebook-Benutzerkonto aus.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Datenschutzerklärung für die Nutzung von Google Analytics</h2>
                <p className="text-base leading-relaxed mb-4">
                  Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (&ldquo;Google&rdquo;). Google Analytics verwendet sog. &ldquo;Cookies&rdquo;, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Im Falle der Aktivierung der IP-Anonymisierung auf dieser Webseite wird Ihre IP-Adresse von Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Im Auftrag des Betreibers dieser Website wird Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem Websitebetreiber zu erbringen.
                </p>
                <p className="text-base leading-relaxed mb-4">
                  Die im Rahmen von Google Analytics von Ihrem Browser übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer Browser-Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website vollumfänglich werden nutzen können.
                </p>
                <p className="text-base leading-relaxed">
                  Sie können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren:{" "}
                  <a href="http://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 underline">
                    http://tools.google.com/dlpage/gaoptout?hl=de
                  </a>
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-2xl font-bold text-yellow-100 mb-4">Datenschutzerklärung für die Nutzung von Google AdSense</h2>
                <p className="text-base leading-relaxed mb-4">
                  Diese Website benutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Inc. (&ldquo;Google&rdquo;). Google AdSense verwendet sog. &ldquo;Cookies&rdquo;, Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website ermöglicht.
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
