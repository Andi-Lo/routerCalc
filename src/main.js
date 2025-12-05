const bitInput = document.getElementById('bit');
const bushInput = document.getElementById('bush');
const targetInput = document.getElementById('target');
const resultEl = document.getElementById('result');
const formulaEl = document.getElementById('formula-display');
const templateResultEl = document.getElementById('template-result');
const templateFormulaEl = document.getElementById('template-formula');
const langToggle = document.getElementById('lang-toggle');

let currentLang = 'de';

const translations = {
    de: {
        bit: "Fräser",
        bush: "Kopierring",
        target: "Gewünschte Fräsung",
        result_title: "ERGEBNIS",
        template_size: "SCHABLONENMASS (LOCHGRÖSSE)",
        offset: "VERSATZ",
        error: "FEHLER",
        error_msg: "Fräser > Ring",
        toggle: "DE"
    },
    en: {
        bit: "Router Bit",
        bush: "Guide Bushing",
        target: "Target Cut Size",
        result_title: "RESULT",
        template_size: "TEMPLATE SIZE (HOLE SIZE)",
        offset: "OFFSET",
        error: "ERROR",
        error_msg: "Bit > Bushing",
        toggle: "EN"
    }
};

function updateLanguage() {
    const t = translations[currentLang];

    // Update static elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerText = t[key];
    });

    // Update Toggle Button
    langToggle.innerText = t.toggle;

    // Recalculate to update dynamic text
    calculate();
}

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'de' ? 'en' : 'de';
    updateLanguage();
});

// SVG Elements
const svgBush = document.getElementById('svgBush');
const svgBit = document.getElementById('svgBit');
const dimGroup = document.getElementById('dimGroup');
const dimLine = document.getElementById('dimLine');
const dimTick1 = document.getElementById('dimTick1');
const dimTick2 = document.getElementById('dimTick2');
const dimText = document.getElementById('dimText');

function calculate() {
    let bit = parseFloat(bitInput.value.replace(',', '.'));
    let bush = parseFloat(bushInput.value.replace(',', '.'));

    if (isNaN(bit)) bit = 0;
    if (isNaN(bush)) bush = 0;

    if (bit >= bush && bush > 0) {
        resultEl.innerText = translations[currentLang].error;
        resultEl.style.color = "#ef4444"; // Red
        formulaEl.innerText = translations[currentLang].error_msg;
        dimGroup.style.opacity = 0;
        return;
    } else {
        resultEl.style.color = "var(--accent)";
        dimGroup.style.opacity = 1;
    }

    const offset = (bush - bit) / 2;
    const target = parseFloat(targetInput.value.replace(',', '.')) || 0;
    const templateSize = target + (bush - bit);

    // Result Text
    resultEl.innerText = offset.toFixed(2) + " mm";
    formulaEl.innerText = `(${bush} - ${bit}) / 2 = ${offset}`;

    // Template Result
    templateResultEl.innerText = templateSize.toFixed(2) + " mm";
    templateFormulaEl.innerText = `${target} + (${bush} - ${bit}) = ${templateSize}`;

    // --- Visualization Logic ---
    // Max radius in SVG is approx 80px available space
    // Scale logic: We assume max Bushing is around 40mm physically
    let scale = 3.5;
    let rBush = (bush / 2) * scale;
    let rBit = (bit / 2) * scale;

    // Clamping max size
    if (rBush > 80) {
        const ratio = 80 / rBush;
        rBush = 80;
        rBit = rBit * ratio;
    }
    if (rBit < 4 && bit > 0) rBit = 4; // Min visibility

    svgBush.setAttribute('r', rBush);
    svgBit.setAttribute('r', rBit);

    // Update Dimension Line (The Offset)
    // Center is 120, 100
    const startX = 120 + rBit;
    const endX = 120 + rBush;

    // Check if there is enough space to draw the arrow inside
    const width = endX - startX;
    const midX = startX + (width / 2);

    dimLine.setAttribute('x1', startX);
    dimLine.setAttribute('x2', endX);

    dimTick1.setAttribute('x1', startX);
    dimTick1.setAttribute('x2', startX);
    dimTick2.setAttribute('x1', endX);
    dimTick2.setAttribute('x2', endX);

    dimText.setAttribute('x', midX);
    dimText.textContent = offset.toFixed(1);

    // Hide dimension if too small
    if (offset <= 0) {
        dimGroup.style.opacity = 0;
    }
}

// Event Listeners
bitInput.addEventListener('input', calculate);
bushInput.addEventListener('input', calculate);
targetInput.addEventListener('input', calculate);

// Init
calculate();
