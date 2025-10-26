# Stroop (PL) — GitHub Pages (jsPsych)

**Uczestnicy klikają link i robią test; nic nie instalują.**  
Plik `index.html` zawiera cały test (10 trening + 50 test, limit 2000 ms).

## Publikacja na GitHub Pages
1. Załóż konto GitHub (jeśli nie masz).
2. Utwórz repozytorium, np. `stroop-pl` (publiczne).
3. **Add file → Upload files** i wgraj `index.html` (z tego pakietu).
4. **Settings → Pages**: `Source = Deploy from a branch`, `Branch = main`, folder `/ (root)` → **Save**.
5. Po chwili strona pojawi się w sekcji Pages. Link wyślij badanym.

## Zbieranie danych
Domyślnie (jeśli nie skonfigurujesz endpointu) po zakończeniu badania nastąpi **pobranie pliku CSV** z danymi (jeden plik na uczestnika).

### Opcjonalnie: automatyczny zapis do Google Sheet (darmowe)
1. W Google Drive utwórz **Arkusz Google** (np. `StroopDane`).
2. **Rozszerzenia → Apps Script** → wklej zawartość `gas_endpoint.gs` i ustaw `SHEET_NAME`.
3. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Autoryzuj i skopiuj **Web app URL**.
4. W `index.html` w sekcji `CONFIG` ustaw:
   ```js
   ENDPOINT_URL: "WKLEJ_SWÓJ_URL"
   ```
5. Wgraj zaktualizowany `index.html` do repo. Od tej pory dane będą **POST**-owane do arkusza (jedna linia = jedna próba).

## Kolumny danych (CSV / Sheet)
- `pid` — inicjały uczestnika (2 litery)
- `phase` — "training" / "main"
- `stim_word` — słowo (PL)
- `ink_color` — kolor czcionki (CSS)
- `congruency` — 1 kongruentne / 0 niekongruentne
- `correct_key` — oczekiwany klawisz (c/z/n/f/b)
- `correct_idx` — indeks klawisza (C=1, Z=2, N=3, F=4, B=5)
- `key` — naciśnięty klawisz
- `status` — 1 poprawnie, 2 błąd, 3 timeout
- `rt` — czas reakcji w ms (timeout = MAX_RT)

## Edycja parametrów
W pliku `index.html` (sekcja `CONFIG`) możesz zmienić:
- `TRAIN_N`, `TEST_N`, `MAX_RT`, `ITI`, `FIX`
- zestaw kolorów i mapowanie klawiszy
- `ENDPOINT_URL` (puste = pobieranie CSV)
