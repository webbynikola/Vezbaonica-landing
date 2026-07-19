# Vezbaonica Landing - Design System

Izvuceno direktno iz Figme (fajl: Milica Markovic Psihoterapeut). Ovo je referenca za sve sekcije - koristi je umesto da opisujes stil u svakom promptu.

## Boje

| Naziv | Hex | Upotreba |
|---|---|---|
| Pozadina | `#FDF6E9` | Osnovna pozadina cele stranice |
| Bez Akcenat | `#F7E4C8` | Kartice, trake (top bar, social proof), pozadina sekcija koje se izdvajaju |
| Mockup pozadina | `#FBEFDC` | Unutrasnja pozadina "Program features" mockup okvira (audio/chat prikazi) |
| Crna (tekst) | `#1A1B1E` | Naslovi i primarni tekst |
| CTA | `#A64129` | Dugmad, linkovi, akcenti, kurziv u hero naslovu |
| FAQ otvoreno | `#CFAF80` | Pozadina FAQ stavke kad je otvorena (prvi FAQ primer je otvoren, ostali zatvoreni) |
| Placeholder sivo | `#D9D9D9` | Waveform/audio placeholder elementi |

Body tekst generalno ide `#1A1B1E` ili `black` sa `opacity: 0.8`.

## Tipografija

Dva fonta: **Cormorant** (naslovi, serif) i **Hanken Grotesk** (telo teksta, sans-serif).

| Element | Font | Size | Line-height | Letter-spacing | Weight |
|---|---|---|---|---|---|
| H1 (hero naslov) | Cormorant Regular | 60px | 66px | -2px | Regular (deo teksta Italic, boja CTA) |
| H2 (naslov sekcije, veci) | Cormorant Regular | 52px | 58px | -2px | Regular |
| H2 (naslov sekcije, manji, npr How it works) | Cormorant Regular | 46px | 52px | -2px | Regular |
| H2 (About/Pricing/FAQ naslov) | Cormorant Regular | 40px | 46-50px | -2px | Regular |
| H3 (naslov kartice) | Hanken Grotesk Regular | 20px | 26px | -0.2px | Regular |
| Body / opis | Hanken Grotesk Regular ili Light | 16px | 22px | -1% (-0.16px) | Regular (paragraf) / Light (opis unutar kartica) |
| Small (FAQ badge, footnote) | Hanken Grotesk Light | 14px | 22px | -0.14px | Light |
| Badge/pill tekst | Hanken Grotesk Regular | 18px | 22px | -0.36px | Regular |
| CTA dugme tekst | Hanken Grotesk Medium | 16px | 22px | -0.16px | Medium, belo |
| Cena (glavna) | Hanken Grotesk Regular | 28px | 26px | -0.28px | Regular |
| Cena (precrtana) | Hanken Grotesk Regular | 18px | 26px | -0.18px | Regular, line-through, opacity 60% |
| Rimski brojevi (I, II, III) | Cormorant Regular | 32px | 50px | -2px | Regular, opacity 60% |

**Vazna napomena:** naslovi kartica koriste Hanken Grotesk (sans-serif), NE Cormorant. Cormorant je rezervisan samo za velike sekcijske naslove i hero.

## Border-radius

| Element | Radius |
|---|---|
| Kartice (feature, pricing, FAQ, "who is it for") | 8px |
| CTA dugmad (velika, hero) | 100px (pill) |
| CTA dugmad (pricing kartice) | 60px (pill) |
| Social proof / tag pill badge | 105px |
| Slike u hero-u | 12px |
| Mali dekorativni elementi (waveform bars) | 21.818px |

## Senke

- Hero slike: `box-shadow: -2px 4px 8px rgba(0,0,0,0.2)`
- Audio mockup kartice (aktivna): `box-shadow: 0px 0px 13.831px rgba(0,0,0,0.16)`
- Audio mockup kartice (neaktivna/pozadinska): `box-shadow: 0px 0px 6.915px rgba(0,0,0,0.08)` ili `0px 0px 10.62px rgba(0,0,0,0.16)`

## Layout

- Container/frame width: **1440px** (referenca za max-width na desktopu)
- Kartice u redu od 4 (Who is it for): svaka 300px sirine, gap ~24px
- Kartice u redu od 3 (Program features, Pricing): svaka 408px sirine
- Istaknuta pricing kartica (srednja/prva "Jasna"): `border: 2px solid #A64129` dodatno na standardnu karticu

## Komponente - specificni detalji

**Top bar:** pozadina `#F7E4C8`, tekst 16px Regular, deo "POCNI ODMAH" je Medium + underline + boja CTA.

**Social proof traka:** pozadina `#F7E4C8`, horizontalno skroluje (infinite marquee), tekst 24px Regular, tackice (5px krug) izmedju stavki, fade-out gradient na ivicama (72px sirine).

**Pricing toggle (Jednokratno/Mesecno):** pill kontejner `#F7E4C8` radius 105px, aktivna opcija ima `#A64129` pozadinu + belo tekst, neaktivna providna + crn tekst.

**FAQ akordeon:** zatvorene stavke `#F7E4C8` pozadina, otvorena stavka `#CFAF80` pozadina + beo tekst. Chevron ikonica u krugu, rotira se pri otvaranju/zatvaranju.

**Pricing zakljucane kartice (Sigurna, Slobodna):** CTA dugme je "disabled" stil - `background: rgba(166,65,41,0.2)`, tekst boje CTA (ne belo), sa lock ikonicom.

**Testimonials sekcija:** masonry/staggered galerija slika (nepravilne velicine i pozicije), sa fade-out gradient trakama gore i dole (visina 80px).

## Fontovi - CDN/import

Cormorant i Hanken Grotesk su oba Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400;0,500;1,400&family=Hanken+Grotesk:wght@300;400;500&display=swap" rel="stylesheet">
```

## CSS varijable (spremno za copy-paste u style.css)

```css
:root {
  --color-bg: #FDF6E9;
  --color-accent-bg: #F7E4C8;
  --color-mockup-bg: #FBEFDC;
  --color-text: #1A1B1E;
  --color-cta: #A64129;
  --color-faq-open: #CFAF80;

  --font-heading: 'Cormorant', serif;
  --font-body: 'Hanken Grotesk', sans-serif;

  --radius-card: 8px;
  --radius-pill: 100px;
  --radius-pill-sm: 60px;
  --radius-badge: 105px;
  --radius-image: 12px;

  --container-width: 1440px;
}
```
