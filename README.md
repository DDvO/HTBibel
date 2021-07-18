#   HTBibel

Online and offline HTML-based Bible with cross-references, reading plan, and powerful text search.
So far in German only, using the text translation „Schlachter 2000“. Also available as
[Android app](HTBibel.apk).

Hypertext-Bibel mit Querverweisen, Leseplan und mächtiger Textsuchfunktion in der Übersetzung „Schlachter 2000“.
Nutzungsmöglichkeit online und offline, auch als
[Android-App](HTBibel.apk).

Diese Bibel-App dient zum Lesen und Recherchieren in der Bibel in der Übersetzung "Schlachter 2000" auch ohne Internetzugang.
Die Navigation erfolgt wie bei normalen Hypertexts (HTML-Format) in einem Browser, aber offline wie bei einem e-Book-Reader.
Mit enthalten sind Einführungen der Übersetzung, Kommentare und Querverweise, die bequem nachverfolgt werden können.
Man kann auch persönliche Merker für beliebig viele Bibelstellen setzen und jederzeit später wieder abrufen oder löschen.
Außerdem ist ein Jahres-Leseplan integriert mit je einem Strang pro Wochentag, so dass man abwechselnd an 7 Stellen liest.
Eine mächtige Textsuche ermöglicht auch das Suchen von komplexen Wortfolgen mit Einschluss- und Ausschluss- Mustern.

##  HTBibel steht für Hypertext-Bibel.

Diese elektronische Bibel basiert auf:
[Die Bibel (Schlachter 2000)](https://www.schlachterbibel.de/).
Hauptziel war es, eine Variante zu erstellen, die auf jedem Web-Browser auch mobil und offline einfach durch Installation einer
[Zip-Datei](HTBibel.zip)
benutzbar ist.
Dazu waren vor Allem die Textsuche und die Texthervorhebungen neu zu implementieren.
Das Layout ist so überarbeitet, dass es nun auch für sehr große und sehr kleine Displays geeignet ist.
Die HTBibel ist somit auch auf den meisten Smartphones (auf Android auch in Form einer
[App](HTBibel.apk))
und sonstigen Mobilgeräten wie E-Book-Lesegeräten verwendbar.
Außerdem sind eine Jahres-Bibelleseplan (nach dem
[52 Week Bible Reading Plan von Mike Coley](http://www.bible-reading.com/bible-plan.html)),
mit kleinen Verbesserungen) integriert und einige Verweise und Fußnoten korrigiert oder erweitert.

##  Navigation

Zur Navigation dienen neben den Verweisen im Text unter Anderem die Kapitel-Knöpfe und -Auswahllisten oben und unten auf den Seiten.
Zum Wechsel des Buches gibt es unter Anderem die Menüs "AT" und "NT" ganz oben sowie die seitlich versteckten Menüs.
Diese sind erreichbar, indem man mit dem Mauszeiger ganz nach links oder rechts fährt, bzw. auf einem Touch-Display seitlich wischt.
Das Menü "HTBibel" und Drücken auf die halbtransparente Positions-Info rechts unten <!--oder eine vertikale Wisch-Geste -->führt auf die Startseite.

##  Anpassungen

Benutzerdefinierbare Anpassungen der Darstellung möglich, wenn die HTBibel mit einem Browser offline benutzt wird.
Dazu die Datei
[custom_disabled.css](html/custom_disabled.css)
in die Datei
`custom.css`
umbenennen und den Kommentaren darin folgen,
z.B. um die Schriftgröße oder das Farbschema zu ändern oder den Metatext mit der Maus auswählbar zu machen.
Wer sich mit CSS auskennt, kann noch viel mehr anstellen ;-)

##  Kompatibilität

Mit jedem HTML-Browser sollten zumindest alle Texte lesbar und die Verweise (Hyperlinks) benutzbar sein.
Speziellere Features wie z.B. die Menüs, Fußnoten und Merker benötigen JavaScript.
Merker können nur gespeichert werden, wenn die Speicherung von Cookies erlaubt ist (und sie nicht automatisch gelöscht werden).
Wegen Inkompatibilitäten verschiedener Browser (besonders bei älteren Versionen des Internet Explorers)
kann es zu diversen Problemen in der Darstellung und bei den speziellen Funktionen kommen.
Die Software wurde getestet auf:
<ul><li>
  <img src="html/images/firefox.gif"   width="31" height="30" alt="[Firefox]"   title="Firefox">
  <a href="http://www.mozilla.org/de/firefox/">Mozilla Firefox</a>
  ab Version 2, auch Mobile
</li><li>
  <img src="html/images/chrome.gif"    width="31" height="30" alt="[Chrome]"    title="Chrome">
  <a href="https://www.google.com/chrome/">Google Chrome</a>
  ab Version 4
</li><li>
  <img src="html/images/opera.gif"     width="28" height="30" alt="[Opera]"     title="Opera">
  <a href="http://de.opera.com/">Opera Browser</a>
  ab Version 10 (auch Mobile ab Version 12)
</li><li>
  <img src="html/images/edge.gif"      width="30" height="30" alt="[Edge]"      title="Microsoft Edge">
  <a href="https://www.microsoft.com/de-de/edge">Microsoft Edge</a>
  Version 92
</li><li>
  <img src="html/images/ie.gif"        width="31" height="30" alt="[IE]"        title="Internet Explorer">
  <a href="http://windows.microsoft.com/de-DE/internet-explorer/products/ie/home">Microsoft Internet Explorer</a>
ab Version 7, auch Mobile
</li><li>
  <img src="html/images/konqueror.gif" width="30" height="30" alt="[Konqueror]" title="Konqueror">
  <a href="http://de.wikipedia.org/wiki/Konqueror">KDE Konqueror</a>
  Version 4
</li><li>
  <img src="html/images/android.gif"   width="30" height="30" alt="[Android]"   title="Android">
  <a href="http://www.24android.com/de/apps/die-besten-apps/die-besten-browser-android/">Android browser</a>
  (stock/WebKit, Google Chrome, Chromium, Opera, Dolphin, Skyfire, etc.)
  <br>
  Für Android empfiehlt sich die
  <a href="../HTBibel.apk">App</a>,
  ansonsten der
  <a href="https://play.google.com/store/apps/details?id=com.android.chrome">Google Chrome</a>
  oder noch besser seine Google-freie Variante
  <a href="https://chromium.de.malavida.com/android/">Chromium</a>.
</li><li>
  <img src="html/images/safari.gif"    width="28" height="30" alt="[Safari]"    title="Safari">
  <a href="http://www.apple.com/de/safari/">Apple Safari</a>
  ab Version 4, auch auf iOS
</li><li>
  <img src="html/images/symbian.gif"   width="30" height="30" alt="[Symbian]"   title="Symbian">
  <a href="http://browser.nokia.com/">Nokia Browser</a>
  für Symbian S60
</li></ul>

##  Feedback

Rückmeldungen bei Problemen oder für Anregungen gerne
[per E-Mail](http://David.von-Oheimb.de/contact.html),
insbesondere zur allgemeinen Ergonomie und zur Performance.

##  Rechtliches

Bibeltext der Schlachter Copyright &copy; 2000
[Genfer Bibelgesellschaft](http://www.bibelgesellschaft.com/).
Alle Rechte vorbehalten.

Software-Anteil &copy; 2010-2021
[David von Oheimb](http://David.von-Oheimb.de/).
Kostenlose (also nichtkommerzielle) Verbreitung und Verwendung gestattet,
aber nur in Zusammenhang dieses Gesamtwerkes und unter Erhaltung der Copyright-Vermerke.
Details dazu:
[Creative Commons Attribution-NonCommercial-ShareAlike (CC BY-NC-SA)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de).

<!--  LocalWords: LocalWords Touch zip apk stock height widthimages seitig equiv onload noscript js gt ul img initpage inbook nd activ Book Reader -->
