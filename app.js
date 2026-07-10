"use strict";
const { useState, useEffect } = React;
// ---- Data ----------------------------------------------------------------
const CATEGORIES = [
    { name: "Foundation", items: [
            { name: "Fenty Pro Filt'r", q: "fenty pro filt'r foundation", url: "https://www.sephora.com/product/pro-filtr-soft-matte-longwear-foundation-P87985432" },
            { name: "Armani Luminous Silk", q: "armani luminous silk foundation", url: "https://www.sephora.com/product/luminous-silk-natural-glow-blurring-liquid-foundation-with-24-hour-wear-P519887" },
            { name: "Ilia Super Serum Skin Tint", q: "ilia super serum skin tint", url: "https://www.sephora.com/product/ilia-super-serum-skin-tint-spf-40-P455418" },
        ] },
    { name: "Concealer", items: [
            { name: "NARS Radiant Creamy", q: "nars radiant creamy concealer", url: "https://www.sephora.com/product/radiant-creamy-concealer-P377873" },
            { name: "Charlotte Tilbury Airbrush Flawless Blur", q: "charlotte tilbury airbrush flawless blur concealer" },
            { name: "Patrick Ta Major Skin", q: "patrick ta major skin concealer" },
        ] },
    { name: "Blush", items: [
            { name: "Rare Beauty Soft Pinch", q: "rare beauty soft pinch liquid blush", url: "https://www.sephora.com/product/rare-beauty-by-selena-gomez-soft-pinch-liquid-blush-P97989778" },
            { name: "Patrick Ta Blush Duo", q: "patrick ta blush duo", url: "https://www.sephora.com/product/patrick-ta-major-headlines-cream-powder-blush-duo-P458747" },
            { name: "Dior Backstage Rosy Glow", q: "dior backstage rosy glow blush", url: "https://www.sephora.com/product/dior-rosy-glow-blush-P454762" },
        ] },
    { name: "Mascara", items: [
            { name: "Lancôme Lash Idôle Curl Goddess", q: "lancome lash idole curl goddess", url: "https://www.sephora.com/product/lash-idole-curl-goddess-curling-volumizing-mascara-P520470" },
            { name: "Hourglass Unlocked", q: "hourglass unlocked mascara", url: "https://www.sephora.com/product/hourglass-unlocked-instant-extensions-mascara-P460829" },
            { name: "Too Faced Better Than Sex", q: "too faced better than sex mascara", url: "https://www.sephora.com/product/better-than-sex-mascara-P381000" },
            { name: "Ilia Limitless Lash", q: "ilia limitless lash mascara", url: "https://www.sephora.com/product/limitless-lash-mascara-P431750?skuId=2335198" },
        ] },
    { name: "Primer", items: [
            { name: "Tatcha The Silk Canvas", q: "tatcha silk canvas primer" },
            { name: "Milk Makeup Hydro Grip", q: "milk makeup hydro grip primer", url: "https://www.sephora.com/product/hydro-grip-primer-P441813" },
            { name: "Danessa Myricks Blur Balm", q: "danessa myricks blur balm" },
            { name: "Hourglass Veil Mineral Primer", q: "hourglass veil mineral primer", url: "https://www.sephora.com/product/veil-mineral-primer-mini-P425600?skuId=1319193" },
        ] },
    { name: "Setting Spray", items: [
            { name: "Charlotte Tilbury Airbrush Flawless", q: "charlotte tilbury airbrush flawless setting spray", url: "https://www.sephora.com/product/charlotte-tilbury-airbrush-flawless-setting-spray-P461147" },
            { name: "Urban Decay All Nighter", q: "urban decay all nighter setting spray", url: "https://www.sephora.com/product/all-nighter-setting-spray-P518812" },
            { name: "Saie City Set", q: "saie city set setting spray" },
        ] },
    { name: "Setting Powder", items: [
            { name: "Laura Mercier Translucent", q: "laura mercier translucent setting powder", url: "https://www.sephora.com/product/translucent-loose-setting-powder-P109908" },
            { name: "Huda Beauty Easy Bake", q: "huda beauty easy bake setting powder" },
            { name: "One/Size Ultimate Blurring", q: "one size ultimate blurring setting powder" },
        ] },
    { name: "Bronzer", items: [
            { name: "Charlotte Tilbury Filmstar Bronze & Glow", q: "charlotte tilbury filmstar bronze glow" },
            { name: "Benefit Hoola", q: "benefit hoola bronzer", url: "https://www.sephora.com/product/hoola-matte-bronzer-P290636" },
            { name: "Gucci Bronzer", q: "gucci bronzer powder" },
        ] },
    { name: "Contour", items: [
            { name: "Westman Atelier Contour Stick", q: "westman atelier contour stick" },
            { name: "Rare Beauty Liquid Contour", q: "rare beauty liquid contour" },
            { name: "m.ph Underpainting Palette", q: "mph mary phillips underpainting palette" },
        ] },
    { name: "Highlighter", items: [
            { name: "Rare Beauty Positive Light", q: "rare beauty positive light luminizer", url: "https://www.sephora.com/product/rare-beauty-by-selena-gomez-positive-light-liquid-luminizer-highlight-P38855877" },
            { name: "Dior Forever Glow Maximizer", q: "dior forever glow maximizer" },
            { name: "CT Hollywood Glow Wand", q: "charlotte tilbury hollywood glow wand" },
        ] },
    { name: "Eyeshadow Palette", items: [
            { name: "Natasha Denona Biba / Glam", q: "natasha denona palette" },
            { name: "Huda Beauty Nude Obsessions", q: "huda beauty nude obsessions palette" },
            { name: "Urban Decay Naked", q: "urban decay naked palette" },
        ] },
    { name: "Eyeliner", items: [
            { name: "Stila Stay All Day Liquid", q: "stila stay all day liquid eyeliner" },
            { name: "Charlotte Tilbury Rock 'N' Kohl", q: "charlotte tilbury rock n kohl eyeliner" },
            { name: "Fenty Flypencil", q: "fenty flypencil eyeliner" },
        ] },
    { name: "Brows", items: [
            { name: "ABH Brow Wiz", q: "anastasia beverly hills brow wiz", url: "https://www.sephora.com/product/brow-wiz-P202633" },
            { name: "Benefit Precisely My Brow", q: "benefit precisely my brow pencil" },
            { name: "Refy Brow Sculpt", q: "refy brow sculpt" },
        ] },
    { name: "Lipstick", items: [
            { name: "CT Matte Revolution (Pillow Talk)", q: "charlotte tilbury matte revolution pillow talk", url: "https://www.sephora.com/product/matte-revolution-lipstick-P433530" },
            { name: "MAC Velvet Teddy / Ruby Woo", q: "mac lipstick velvet teddy" },
            { name: "Rare Beauty Kind Words", q: "rare beauty kind words lipstick" },
            { name: "ABH Matte & Satin Velvet Lipstick", q: "anastasia beverly hills matte satin velvet lipstick", url: "https://www.sephora.com/product/anastasia-beverly-hills-matte-satin-velvet-lipstick-P480576?skuId=2650984" },
        ] },
    { name: "Lip Balm / Gloss / Oil", items: [
            { name: "Summer Fridays Lip Butter Balm", q: "summer fridays lip butter balm", url: "https://www.sephora.com/product/summer-fridays-lip-butter-balm-P455936" },
            { name: "Rhode Peptide Lip Treatment", q: "rhode peptide lip treatment", url: "https://www.sephora.com/product/peptide-lip-treatment-P517486" },
            { name: "Dior Lip Glow Oil", q: "dior lip glow oil", url: "https://www.sephora.com/product/dior-lip-glow-oil-hydrating-high-shine-gloss-P519637" },
        ] },
    { name: "Skin Tint / BB & CC Cream", items: [
            { name: "Saie Slip Tint SPF 35", q: "saie slip tint" },
            { name: "Summer Fridays Sheer Skin Tint", q: "summer fridays sheer skin tint" },
            { name: "Erborian CC Cream", q: "erborian cc cream" },
        ] },
    { name: "Color Corrector", items: [
            { name: "Live Tinted Huestick", q: "live tinted huestick corrector" },
            { name: "Charlotte Tilbury Magic Vanish", q: "charlotte tilbury magic vanish" },
            { name: "IT Cosmetics Bye Bye Under Eye Corrector", q: "it cosmetics bye bye under eye corrector" },
        ] },
    { name: "Lip Liner", items: [
            { name: "Charlotte Tilbury Lip Cheat", q: "charlotte tilbury lip cheat" },
            { name: "MAC Lip Pencil (Spice / Whirl)", q: "mac lip pencil spice" },
            { name: "Make Up For Ever Artist Color Pencil", q: "make up for ever artist color pencil" },
        ] },
    { name: "Lip Stain", items: [
            { name: "Benefit Benetint", q: "benefit benetint" },
            { name: "Fenty Poutsicle", q: "fenty poutsicle lip stain" },
            { name: "Wonderskin Wonder Blading", q: "wonderskin wonder blading lip stain" },
        ] },
    { name: "Eye Primer", items: [
            { name: "Urban Decay Primer Potion", q: "urban decay eyeshadow primer potion" },
            { name: "Too Faced Shadow Insurance", q: "too faced shadow insurance" },
            { name: "NARS Smudge Proof", q: "nars smudge proof eyeshadow base" },
        ] },
    { name: "Lash Serum", items: [
            { name: "GrandeLASH-MD", q: "grandelash md lash serum" },
            { name: "The Ordinary Lash & Brow Serum", q: "the ordinary multi peptide lash brow serum" },
            { name: "Vegamour GRO", q: "vegamour gro lash serum" },
        ] },
    { name: "Lash Primer & False Lashes", items: [
            { name: "Lancôme Cils Booster XL", q: "lancome cils booster lash primer" },
            { name: "Dior Diorshow Maximizer", q: "dior diorshow maximizer lash primer" },
            { name: "Velour Effortless Lashes", q: "velour effortless false lashes" },
        ] },
    { name: "Brow Gel", items: [
            { name: "Benefit Gimme Brow+", q: "benefit gimme brow" },
            { name: "ABH Brow Freeze", q: "anastasia beverly hills brow freeze" },
            { name: "Kosas Air Brow", q: "kosas air brow gel" },
        ] },
    { name: "Eyeshadow Sticks & Singles", items: [
            { name: "Laura Mercier Caviar Stick", q: "laura mercier caviar stick" },
            { name: "Bobbi Brown Long-Wear Cream Shadow Stick", q: "bobbi brown long wear cream shadow stick" },
            { name: "Kosas 10-Second Eyeshadow", q: "kosas 10 second eyeshadow" },
        ] },
    { name: "Freckle & Detail Pens", items: [
            { name: "Freck Beauty OG Freckle Pen", q: "freck beauty og freckle pen" },
            { name: "Freck Noir", q: "freck beauty noir" },
            { name: "Benefit Brow Microfilling Pen", q: "benefit brow microfilling pen" },
        ] },
    { name: "Body Makeup", items: [
            { name: "Fenty Body Lava", q: "fenty body lava" },
            { name: "Charlotte Tilbury Supermodel Body", q: "charlotte tilbury supermodel body" },
            { name: "Sol de Janeiro Glowmotions", q: "sol de janeiro glowmotions shimmer oil" },
        ] },
    { name: "Tools", items: [
            { name: "Beautyblender Original", q: "beautyblender original sponge" },
            { name: "Shiseido Eyelash Curler", q: "shiseido eyelash curler" },
            { name: "Danessa Myricks 3.0 Brush", q: "danessa myricks yummy skin 3.0 brush" },
        ] },
    { name: "Makeup Remover", items: [
            { name: "Bioderma Sensibio H2O", q: "bioderma sensibio h2o micellar water" },
            { name: "Farmacy Green Clean", q: "farmacy green clean cleansing balm" },
            { name: "Clinique Take The Day Off Balm", q: "clinique take the day off cleansing balm" },
        ] },
    { name: "Skin Prep", items: [
            { name: "Glow Recipe Watermelon Dew Drops", q: "glow recipe watermelon glow niacinamide dew drops" },
            { name: "Laneige Cream Skin Toner", q: "laneige cream skin toner" },
            { name: "Tatcha Luminous Dewy Skin Mist", q: "tatcha luminous dewy skin mist" },
            { name: "Rhode Peptide Eye Prep Patches", q: "rhode peptide eye prep depuffing patches", url: "https://www.sephora.com/product/rhode-hailey-bieber-peptide-eye-prep-depuffing-eye-patches-P518591?skuId=2908697" },
            { name: "Caudalie Beauty Elixir Face Mist", q: "caudalie beauty elixir face mist", url: "https://www.sephora.com/product/caudalie-mini-beauty-elixir-face-mist-P481818?skuId=2534493" },
        ] },
    { name: "Lip Plumper", items: [
            { name: "Too Faced Lip Injection Extreme", q: "too faced lip injection extreme" },
            { name: "Dior Addict Lip Maximizer", q: "dior addict lip maximizer" },
            { name: "CT Pillow Talk Big Lip Plumpgasm", q: "charlotte tilbury pillow talk big lip plumpgasm" },
        ] },
    { name: "Multisticks / Lip & Cheek", items: [
            { name: "Merit Flush Balm", q: "merit flush balm cheek color" },
            { name: "Milk Makeup Lip + Cheek", q: "milk makeup lip cheek stick" },
            { name: "Nudestix Nudies Matte", q: "nudestix nudies matte blush" },
        ] },
    { name: "Bronzing / Self-Tan Drops", items: [
            { name: "Drunk Elephant D-Bronzi", q: "drunk elephant d-bronzi anti-pollution bronzing drops" },
            { name: "Isle of Paradise Self-Tanning Drops", q: "isle of paradise self tanning drops" },
            { name: "Tan-Luxe The Face", q: "tan-luxe the face illuminating self-tan drops" },
        ] },
    { name: "Blotting & Touch-Up", items: [
            { name: "Fenty Invisimatte Blotting Powder", q: "fenty invisimatte blotting powder" },
            { name: "Tatcha Aburatorigami Blotting Papers", q: "tatcha blotting papers" },
            { name: "Fenty Invisimatte Blotting Paper", q: "fenty invisimatte blotting paper" },
        ] },
    { name: "Lip Treatments & Masks", items: [
            { name: "Laneige Lip Sleeping Mask", q: "laneige lip sleeping mask", url: "https://www.sephora.com/product/lip-sleeping-mask-P420652" },
            { name: "Fresh Sugar Advanced Lip Therapy", q: "fresh sugar advanced therapy lip treatment" },
            { name: "Kiehl's Buttermask", q: "kiehls buttermask lip smoothing treatment" },
        ] },
    { name: "Glitter & Face Gems", items: [
            { name: "Half Magic Glitterpils", q: "half magic glitter face gems" },
            { name: "Lemonhead LA Spacejam", q: "lemonhead la spacejam glitter" },
            { name: "Sephora Collection Face Gems", q: "sephora collection face jewels gems" },
        ] },
];
const sephoraUrl = (q) => `https://www.sephora.com/search?keyword=${encodeURIComponent(q)}`;
// Application order — the sequence you'd actually use them getting ready
const APPLICATION_ORDER = [
    "Skin Prep",
    "Lash Serum",
    "Primer",
    "Color Corrector",
    "Skin Tint / BB & CC Cream",
    "Foundation",
    "Concealer",
    "Setting Powder",
    "Contour",
    "Bronzer",
    "Blush",
    "Highlighter",
    "Brows",
    "Brow Gel",
    "Eye Primer",
    "Eyeshadow Palette",
    "Eyeshadow Sticks & Singles",
    "Eyeliner",
    "Lash Primer & False Lashes",
    "Mascara",
    "Freckle & Detail Pens",
    "Lip Treatments & Masks",
    "Lip Liner",
    "Lipstick",
    "Lip Stain",
    "Lip Balm / Gloss / Oil",
    "Lip Plumper",
    "Multisticks / Lip & Cheek",
    "Glitter & Face Gems",
    "Setting Spray",
    "Blotting & Touch-Up",
    "Bronzing / Self-Tan Drops",
    "Body Makeup",
    "Tools",
    "Makeup Remover",
];
const ORDERED_CATEGORIES = [
    ...APPLICATION_ORDER.map((n) => CATEGORIES.find((c) => c.name === n)).filter(Boolean),
    ...CATEGORIES.filter((c) => !APPLICATION_ORDER.includes(c.name)),
];
// ====== SETUP: paste your Firebase Realtime Database URL between the quotes ======
// It looks like: https://something-default-rtdb.firebaseio.com
const DB_URL = "https://rose-sephora-staples-default-rtdb.firebaseio.com";
// =================================================================================
const STORAGE_KEY = "sephora-tracker-v1";
// Status cycle: 0 = untracked, 1 = wishlist, 2 = got it
const STATUS = {
    0: { label: "Tap to track", short: "—" },
    1: { label: "Tap to get", short: "♡" },
    2: { label: "In makeup bag", short: "✓" },
};
// Marked In The Bag by default (one-time seed)
const SEED_IN_BAG = [
    "Lipstick::ABH Matte & Satin Velvet Lipstick",
    "Mascara::Ilia Limitless Lash",
    "Primer::Hourglass Veil Mineral Primer",
    "Skin Prep::Rhode Peptide Eye Prep Patches",
    "Skin Prep::Caudalie Beauty Elixir Face Mist",
];
const LAST_SEEN_KEY = "sephora-tracker-last-seen";
function SephoraTracker() {
    const [state, setState] = useState({});
    const [custom, setCustom] = useState({}); // { [categoryName]: [{name, q, url?}] }
    const [removed, setRemoved] = useState([]); // keys of hidden built-in products
    const [loaded, setLoaded] = useState(false);
    const [filter, setFilter] = useState("all"); // all | wishlist | owned | starred
    const [addingTo, setAddingTo] = useState(null); // category name with open add form
    const [newName, setNewName] = useState("");
    const [newLink, setNewLink] = useState("");
    const [newShade, setNewShade] = useState("");
    const [newNote, setNewNote] = useState("");
    const [shades, setShades] = useState({}); // { [itemKey]: "shade / color text" }
    const [editingShade, setEditingShade] = useState(null); // itemKey being edited
    const [shadeText, setShadeText] = useState("");
    const [stars, setStars] = useState({}); // { [itemKey]: true }
    const [notes, setNotes] = useState({}); // { [itemKey]: "note text" }
    const [editingNote, setEditingNote] = useState(null);
    const [noteText, setNoteText] = useState("");
    const [updatedAt, setUpdatedAt] = useState({}); // { [itemKey]: timestamp }
    const [changedKeys, setChangedKeys] = useState([]); // keys changed since this device last looked
    const [collapsed, setCollapsed] = useState({}); // { [catName]: true }
    const [collapsedInit, setCollapsedInit] = useState(false);
    const [copied, setCopied] = useState(false);
    const [saveStatus, setSaveStatus] = useState(""); // "" | saving | saved | error
    const [showHelp, setShowHelp] = useState(() => {
        try {
            return localStorage.getItem("rose-help-dismissed") !== "1";
        }
        catch (e) {
            return true;
        }
    });
    const [helpCollapsed, setHelpCollapsed] = useState(() => {
        try {
            return localStorage.getItem("rose-help-collapsed") === "1";
        }
        catch (e) {
            return false;
        }
    });
    const updateHelpCollapsed = (value) => {
        setHelpCollapsed(value);
        try {
            localStorage.setItem("rose-help-collapsed", value ? "1" : "0");
        }
        catch (e) { }
    };
    const dismissHelp = () => {
        setShowHelp(false);
        try {
            localStorage.setItem("rose-help-dismissed", "1");
        }
        catch (e) { }
    };
    const [copyFallback, setCopyFallback] = useState("");
    const loadShared = async () => {
        let statuses = {};
        let customItems = {};
        let removedKeys = [];
        let shadeMap = {};
        let starMap = {};
        let noteMap = {};
        let updatedMap = {};
        let collapsedMap = null;
        let readOk = false;
        let seeded = false;
        let seededV2 = false;
        try {
            const resp = await fetch(`${DB_URL}/tracker.json`);
            readOk = resp.ok;
            const raw = resp.ok ? await resp.json() : null;
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (parsed) {
                if (parsed && parsed.statuses) {
                    statuses = parsed.statuses || {};
                    customItems = parsed.custom || {};
                    removedKeys = parsed.removed || [];
                    shadeMap = parsed.shades || {};
                    starMap = parsed.stars || {};
                    noteMap = parsed.notes || {};
                    updatedMap = parsed.updatedAt || {};
                    collapsedMap = parsed.collapsed || null;
                    seeded = parsed.seeded === true;
                    seededV2 = parsed.seededV2 === true;
                }
                else {
                    // legacy format: plain status map
                    statuses = parsed || {};
                }
            }
        }
        catch (e) {
            // network / URL problem — readOk stays false
        }
        if (!readOk) {
            setSaveStatus("error");
        }
        else {
            setSaveStatus("");
        }
        if (!seeded) {
            SEED_IN_BAG.forEach((key) => {
                if (!(key in statuses))
                    statuses[key] = 2;
            });
        }
        // v2: make sure every product the user added (links + custom) is marked In Makeup Bag
        if (!seededV2) {
            SEED_IN_BAG.forEach((key) => {
                statuses[key] = 2;
            });
            Object.keys(customItems).forEach((catName) => {
                (customItems[catName] || []).forEach((i) => {
                    const key = `${catName}::${i.name}`;
                    if (!(key in statuses))
                        statuses[key] = 2;
                });
            });
        }
        // Recently-changed: compare shared timestamps against this device's last look (personal storage)
        let lastSeen = 0;
        try {
            const seen = localStorage.getItem(LAST_SEEN_KEY);
            if (seen)
                lastSeen = Number(seen) || 0;
        }
        catch (e) {
            // first visit on this device
        }
        setChangedKeys(lastSeen > 0 ? Object.keys(updatedMap).filter((k) => updatedMap[k] > lastSeen) : []);
        try {
            localStorage.setItem(LAST_SEEN_KEY, String(Date.now()));
        }
        catch (e) {
            // personal storage unavailable — indicator just won't persist
        }
        setState(statuses);
        setCustom(customItems);
        setRemoved(removedKeys);
        setShades(shadeMap);
        setStars(starMap);
        setNotes(noteMap);
        setUpdatedAt(updatedMap);
        if (collapsedMap && Object.keys(collapsedMap).length > 0) {
            setCollapsed(collapsedMap);
            setCollapsedInit(true);
        }
        setLoaded(true);
        if (readOk && (!seeded || !seededV2)) {
            try {
                await fetch(`${DB_URL}/tracker.json`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(JSON.stringify({ statuses, custom: customItems, removed: removedKeys, shades: shadeMap, stars: starMap, notes: noteMap, updatedAt: updatedMap, seeded: true, seededV2: true })),
                });
            }
            catch (e) {
                // storage not available yet (unpublished) — seed still shows locally
            }
        }
    };
    useEffect(() => {
        loadShared();
    }, []);
    const persist = async (changes) => {
        const data = {
            statuses: changes.statuses !== undefined ? changes.statuses : state,
            custom: changes.custom !== undefined ? changes.custom : custom,
            removed: changes.removed !== undefined ? changes.removed : removed,
            shades: changes.shades !== undefined ? changes.shades : shades,
            stars: changes.stars !== undefined ? changes.stars : stars,
            notes: changes.notes !== undefined ? changes.notes : notes,
            updatedAt: changes.updatedAt !== undefined ? changes.updatedAt : updatedAt,
            collapsed: changes.collapsed !== undefined ? changes.collapsed : collapsed,
            seeded: true,
            seededV2: true,
        };
        setState(data.statuses);
        setCustom(data.custom);
        setRemoved(data.removed);
        setShades(data.shades);
        setStars(data.stars);
        setNotes(data.notes);
        setUpdatedAt(data.updatedAt);
        setCollapsed(data.collapsed);
        try {
            setSaveStatus("saving");
            const resp = await fetch(`${DB_URL}/tracker.json`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(JSON.stringify(data)),
            });
            if (!resp.ok)
                throw new Error(`HTTP ${resp.status}`);
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus((s) => (s === "saved" ? "" : s)), 2000);
        }
        catch (e) {
            console.error("Save failed", e);
            setSaveStatus("error");
        }
    };
    const touch = (key) => ({ ...updatedAt, [key]: Date.now() });
    const saveShade = (key) => {
        const text = shadeText.trim();
        const nextShades = { ...shades };
        if (text)
            nextShades[key] = text;
        else
            delete nextShades[key];
        persist({ shades: nextShades, updatedAt: touch(key) });
        setEditingShade(null);
        setShadeText("");
    };
    const saveNote = (key) => {
        const text = noteText.trim();
        const nextNotes = { ...notes };
        if (text)
            nextNotes[key] = text;
        else
            delete nextNotes[key];
        persist({ notes: nextNotes, updatedAt: touch(key) });
        setEditingNote(null);
        setNoteText("");
    };
    const toggleStar = (key) => {
        const next = { ...stars };
        if (next[key])
            delete next[key];
        else
            next[key] = true;
        persist({ stars: next, updatedAt: touch(key) });
    };
    const cycle = (key) => {
        const cur = state[key] || 0;
        const next = { ...state, [key]: (cur + 1) % 3 };
        if (next[key] === 0)
            delete next[key];
        persist({ statuses: next, updatedAt: touch(key) });
    };
    const addProduct = (catName) => {
        const name = newName.trim();
        if (!name)
            return;
        const link = newLink.trim();
        const entry = { name, q: name };
        if (link && /^https?:\/\//i.test(link))
            entry.url = link;
        const list = [...(custom[catName] || []), entry];
        const key = `${catName}::${name}`;
        const changes = { custom: { ...custom, [catName]: list }, updatedAt: touch(key) };
        if (newShade.trim())
            changes.shades = { ...shades, [key]: newShade.trim() };
        if (newNote.trim())
            changes.notes = { ...notes, [key]: newNote.trim() };
        persist(changes);
        setNewName("");
        setNewLink("");
        setNewShade("");
        setNewNote("");
        setAddingTo(null);
    };
    const removeProduct = (catName, item) => {
        const key = `${catName}::${item.name}`;
        const nextStatuses = { ...state };
        delete nextStatuses[key];
        const nextShades = { ...shades };
        delete nextShades[key];
        const nextStars = { ...stars };
        delete nextStars[key];
        const nextNotes = { ...notes };
        delete nextNotes[key];
        const base = { statuses: nextStatuses, shades: nextShades, stars: nextStars, notes: nextNotes, updatedAt: touch(key) };
        if (item.isCustom) {
            const list = (custom[catName] || []).filter((i) => i.name !== item.name);
            const nextCustom = { ...custom, [catName]: list };
            if (list.length === 0)
                delete nextCustom[catName];
            persist({ ...base, custom: nextCustom });
        }
        else {
            persist({ ...base, removed: [...removed, key] });
        }
    };
    const restoreRemoved = () => {
        persist({ removed: [] });
    };
    const [confirmingReset, setConfirmingReset] = useState(false);
    const [sectionQuery, setSectionQuery] = useState("");
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowTopBtn(window.scrollY > 400);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const jumpToSection = (catName) => {
        setCollapsed((prev) => ({ ...prev, [catName]: false }));
        setSectionQuery("");
        setTimeout(() => {
            const el = document.getElementById(`cat-${catName}`);
            if (el)
                el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const copyWishlist = async () => {
        const lines = [];
        ORDERED_CATEGORIES.forEach((cat) => {
            const wanted = itemsFor(cat).filter((i) => state[`${cat.name}::${i.name}`] === 1);
            wanted.forEach((i) => {
                const key = `${cat.name}::${i.name}`;
                let line = `• ${i.name} (${cat.name})`;
                if (shades[key])
                    line += ` — shade: ${shades[key]}`;
                if (notes[key])
                    line += ` — ${notes[key]}`;
                if (stars[key])
                    line = line.replace("• ", "• ★ ");
                lines.push(line);
            });
        });
        const text = lines.length
            ? `Rose's Sephora Tap-to-Get list:\n${lines.join("\n")}`
            : "Nothing on the Tap-to-Get list yet.";
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
        catch (e) {
            setCopyFallback(text); // clipboard blocked — show the text to copy manually
        }
    };
    const reset = () => {
        if (!confirmingReset) {
            setConfirmingReset(true);
            setTimeout(() => setConfirmingReset(false), 3500);
            return;
        }
        setConfirmingReset(false);
        persist({ statuses: {} });
    };
    const itemsFor = (cat) => [
        ...cat.items.filter((i) => !removed.includes(`${cat.name}::${i.name}`)),
        ...(custom[cat.name] || []).map((i) => ({ ...i, isCustom: true })),
    ];
    useEffect(() => {
        if (!loaded || collapsedInit)
            return;
        const init = {};
        ORDERED_CATEGORIES.forEach((cat) => {
            const hasActivity = itemsFor(cat).some((i) => {
                const key = `${cat.name}::${i.name}`;
                return state[key] || shades[key] || notes[key] || stars[key];
            });
            init[cat.name] = !hasActivity;
        });
        setCollapsed(init);
        setCollapsedInit(true);
    }, [loaded]);
    const setAllCollapsed = (value) => {
        const next = {};
        ORDERED_CATEGORIES.forEach((c) => {
            next[c.name] = value;
        });
        setCollapsedInit(true);
        persist({ collapsed: next });
    };
    const toggleCollapse = (catName) => {
        const next = { ...collapsed, [catName]: !collapsed[catName] };
        persist({ collapsed: next });
    };
    const allItems = CATEGORIES.flatMap((c) => itemsFor(c).map((i) => `${c.name}::${i.name}`));
    const ownedCount = allItems.filter((k) => state[k] === 2).length;
    const wishCount = allItems.filter((k) => state[k] === 1).length;
    const starCount = allItems.filter((k) => stars[k]).length;
    const pct = Math.round((ownedCount / allItems.length) * 100);
    const visible = (key) => {
        const s = state[key] || 0;
        if (filter === "wishlist")
            return s === 1;
        if (filter === "owned")
            return s === 2;
        if (filter === "starred")
            return !!stars[key];
        return true;
    };
    const q = sectionQuery.trim().toLowerCase();
    const sectionMatches = q
        ? ORDERED_CATEGORIES.filter((c) => c.name.toLowerCase().includes(q) ||
            itemsFor(c).some((i) => i.name.toLowerCase().includes(q))).slice(0, 5)
        : [];
    return (React.createElement("div", { style: styles.page },
        React.createElement("div", { style: styles.inner },
            React.createElement("link", { href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Karla:wght@400;500;700&display=swap", rel: "stylesheet" }),
            React.createElement("header", { style: styles.header },
                React.createElement("div", { style: styles.eyebrow }, "ROSE KELLEY'S"),
                React.createElement("h1", { style: styles.title }, "Sephora Staples"),
                React.createElement("p", { style: styles.tagline }, "Because she deserves the best of everything"),
                React.createElement("p", { style: styles.subtitle },
                    allItems.length,
                    " potential additions \u00B7 ",
                    CATEGORIES.length,
                    " categories")),
            React.createElement("div", { style: styles.meterWrap },
                React.createElement("div", { style: styles.meterLabelRow },
                    React.createElement("span", { style: styles.meterLabel },
                        ownedCount,
                        " of ",
                        allItems.length,
                        " in makeup bag"),
                    React.createElement("span", { style: { ...styles.meterLabel, color: "#9E7238" } },
                        wishCount,
                        " tap to get")),
                React.createElement("div", { style: styles.meterTube, "aria-label": `Progress: ${pct}%` },
                    React.createElement("div", { style: { ...styles.meterFill, width: `${Math.max(pct, 2)}%` } }),
                    React.createElement("div", { style: { ...styles.meterTip, left: `calc(${Math.max(pct, 2)}% - 7px)` } }))),
            React.createElement("div", { style: styles.stickyBar },
                React.createElement("div", { style: styles.filterRow, role: "tablist" }, [
                    ["all", "Staples 💋"],
                    ["owned", `In Makeup Bag 🛍️${ownedCount ? ` (${ownedCount})` : ""}`],
                    ["wishlist", `Want to Get ♡${wishCount ? ` (${wishCount})` : ""}`],
                    ["starred", `Top Picks ★${starCount ? ` (${starCount})` : ""}`],
                ].map(([val, label]) => (React.createElement("button", { key: val, role: "tab", "aria-selected": filter === val, onClick: () => setFilter(val), style: {
                        ...styles.filterBtn,
                        ...(filter === val
                            ? val === "starred"
                                ? styles.filterBtnActiveGold
                                : styles.filterBtnActive
                            : {}),
                    } }, label)))),
                React.createElement("div", { style: styles.jumpRow },
                    React.createElement("input", { style: styles.jumpInput, placeholder: "\uD83D\uDD0D Jump to Staple Section", value: sectionQuery, onChange: (e) => setSectionQuery(e.target.value), onKeyDown: (e) => {
                            if (e.key === "Enter" && sectionMatches.length > 0)
                                jumpToSection(sectionMatches[0].name);
                        } }),
                    React.createElement("button", { onClick: loadShared, style: styles.syncBtnTop }, "Refresh List \u2191")),
                sectionMatches.length > 0 && (React.createElement("div", { style: styles.jumpChips }, sectionMatches.map((c) => (React.createElement("button", { key: c.name, style: styles.jumpChip, onClick: () => jumpToSection(c.name) }, c.name))))),
                filter === "all" && (React.createElement("div", { style: styles.bulkRow },
                    React.createElement("button", { style: styles.bulkBtn, onClick: () => setAllCollapsed(true) }, "Collapse all \u25B8"),
                    React.createElement("button", { style: styles.bulkBtn, onClick: () => setAllCollapsed(false) }, "Expand all \u25BE"),
                    React.createElement("button", { style: styles.bulkBtn, onClick: () => {
                            if (showHelp && !helpCollapsed) {
                                updateHelpCollapsed(true);
                            }
                            else {
                                setShowHelp(true);
                                updateHelpCollapsed(false);
                            }
                        } }, "The Basics")))),
            !loaded ? (React.createElement("p", { style: styles.loading }, "Opening the vanity\u2026")) : (React.createElement("main", null,
                showHelp && (React.createElement("div", { style: styles.helpCard },
                    React.createElement("div", { style: { ...styles.helpTitle, cursor: "pointer" }, onClick: () => updateHelpCollapsed(!helpCollapsed), role: "button", "aria-expanded": !helpCollapsed },
                        "The Basics",
                        React.createElement("span", { style: styles.caret }, helpCollapsed ? "▸" : "▾")),
                    !helpCollapsed && (React.createElement("div", { className: "cat-body" },
                        React.createElement("p", { style: styles.helpLine },
                            "- Tap a product once for ",
                            React.createElement("b", null, "Want to Get \u2661")),
                        React.createElement("p", { style: styles.helpLine },
                            "- Tap again for ",
                            React.createElement("b", null, "In Makeup Bag \uD83D\uDECD"),
                            " \u2014 a third tap clears it"),
                        React.createElement("p", { style: styles.helpLine },
                            "- ",
                            React.createElement("b", null, "Shop \u2197"),
                            " opens it on Sephora"),
                        React.createElement("p", { style: styles.helpLine },
                            "- ",
                            React.createElement("b", null, "+ Add a product"),
                            " at the bottom of any category adds your own"),
                        React.createElement("p", { style: styles.helpLine },
                            "- Tap ",
                            React.createElement("b", null, "+ add color"),
                            " or ",
                            React.createElement("b", null, "+ add note"),
                            " to save your shade"),
                        React.createElement("p", { style: styles.helpLine },
                            "- ",
                            React.createElement("b", null, "\u2605"),
                            " marks a Top Pick"),
                        React.createElement("p", { style: styles.helpLine },
                            "- ",
                            React.createElement("b", null, "\u00D7"),
                            " removes a product from the list"),
                        React.createElement("p", { style: styles.helpLine },
                            "- Hit ",
                            React.createElement("b", null, "Refresh List \u2191"),
                            " to see each other's latest changes"),
                        React.createElement("button", { style: styles.helpGotIt, onClick: dismissHelp }, "Got it \uD83D\uDC8B"))))),
                ORDERED_CATEGORIES.map((cat, ci) => {
                    const items = [...itemsFor(cat)].sort((a, b) => ((state[`${cat.name}::${a.name}`] || 0) === 2 ? 1 : 0) -
                        ((state[`${cat.name}::${b.name}`] || 0) === 2 ? 1 : 0));
                    const keys = items.map((i) => `${cat.name}::${i.name}`);
                    const shown = keys.filter(visible);
                    if (shown.length === 0 && filter !== "all")
                        return null;
                    const catOwned = keys.filter((k) => state[k] === 2).length;
                    const catWish = keys.filter((k) => state[k] === 1).length;
                    const catParts = [];
                    if (catWish)
                        catParts.push(`${catWish}♡`);
                    if (catOwned)
                        catParts.push(`${catOwned}🛍`);
                    const catLabel = catParts.length ? catParts.join(" · ") : `${items.length}`;
                    const isCollapsed = filter === "all" && collapsed[cat.name];
                    const catHasChanges = keys.some((k) => changedKeys.includes(k));
                    return (React.createElement("section", { key: cat.name, id: `cat-${cat.name}`, style: styles.category },
                        React.createElement("div", { style: { ...styles.catHeader, cursor: "pointer" }, onClick: () => toggleCollapse(cat.name), role: "button", "aria-expanded": !isCollapsed },
                            React.createElement("h2", { style: styles.catTitle },
                                React.createElement("span", { style: styles.stepNum }, String(ci + 1).padStart(2, "0")),
                                cat.name,
                                catHasChanges && React.createElement("span", { style: styles.changedDot, title: "Updated since your last visit" }, "\u25CF")),
                            React.createElement("span", { style: styles.catCount },
                                catLabel,
                                React.createElement("span", { style: styles.caret }, isCollapsed ? "▸" : "▾"))),
                        !isCollapsed && (React.createElement("div", { className: "cat-body" },
                            items.map((item) => {
                                const key = `${cat.name}::${item.name}`;
                                if (!visible(key))
                                    return null;
                                const s = state[key] || 0;
                                return (React.createElement("div", { key: key, onClick: () => cycle(key), role: "button", tabIndex: 0, onKeyDown: (e) => {
                                        if (e.key === "Enter" || e.key === " ")
                                            cycle(key);
                                    }, style: {
                                        ...styles.itemRow,
                                        ...(s === 2 ? styles.itemOwned : s === 1 ? styles.itemWish : {}),
                                    }, "aria-label": `${item.name}: ${STATUS[s].label}` },
                                    React.createElement("span", { style: {
                                            ...styles.badge,
                                            ...(s === 2 ? styles.badgeOwned : s === 1 ? styles.badgeWish : {}),
                                        } }, s === 1 ? "♥" : STATUS[s].short),
                                    React.createElement("span", { style: {
                                            ...styles.itemName,
                                            ...(s === 2 ? { opacity: 0.7 } : {}),
                                        } },
                                        item.name,
                                        editingShade === key ? (React.createElement("span", { style: styles.shadeEditWrap, onClick: (e) => e.stopPropagation() },
                                            React.createElement("input", { style: styles.shadeInput, placeholder: "Color / shade", value: shadeText, onChange: (e) => setShadeText(e.target.value), onKeyDown: (e) => {
                                                    if (e.key === "Enter")
                                                        saveShade(key);
                                                    if (e.key === "Escape") {
                                                        setEditingShade(null);
                                                        setShadeText("");
                                                    }
                                                }, autoFocus: true }),
                                            React.createElement("button", { style: styles.shadeSaveBtn, onClick: () => saveShade(key) }, "Save"))) : (React.createElement("span", { style: styles.inlineRow },
                                            React.createElement("span", { style: shades[key] ? styles.shadeText : styles.shadeAdd, onClick: (e) => {
                                                    e.stopPropagation();
                                                    setEditingShade(key);
                                                    setShadeText(shades[key] || "");
                                                } }, shades[key] ? `${shades[key]} ✎` : "+ add color"))),
                                        editingNote === key ? (React.createElement("span", { style: styles.shadeEditWrap, onClick: (e) => e.stopPropagation() },
                                            React.createElement("input", { style: styles.shadeInput, placeholder: "Note (e.g. wants the mini size)", value: noteText, onChange: (e) => setNoteText(e.target.value), onKeyDown: (e) => {
                                                    if (e.key === "Enter")
                                                        saveNote(key);
                                                    if (e.key === "Escape") {
                                                        setEditingNote(null);
                                                        setNoteText("");
                                                    }
                                                }, autoFocus: true }),
                                            React.createElement("button", { style: styles.shadeSaveBtn, onClick: () => saveNote(key) }, "Save"))) : (React.createElement("span", { style: styles.inlineRow },
                                            React.createElement("span", { style: notes[key] ? styles.noteText : styles.shadeAdd, onClick: (e) => {
                                                    e.stopPropagation();
                                                    setEditingNote(key);
                                                    setNoteText(notes[key] || "");
                                                } }, notes[key] ? `📝 ${notes[key]} ✎` : "+ add note"))),
                                        item.isCustom && (React.createElement("span", { style: styles.statusHintInline }, "Added to the list"))),
                                    React.createElement("div", { style: styles.actionCol, onClick: (e) => e.stopPropagation() },
                                        React.createElement("a", { href: item.url || sephoraUrl(item.q), target: "_blank", rel: "noopener noreferrer", style: styles.shopLink, "aria-label": `Shop ${item.name} on Sephora` }, "Shop \u2197"),
                                        React.createElement("div", { style: styles.actionIcons },
                                            React.createElement("button", { onClick: () => toggleStar(key), style: { ...styles.starBtn, ...(stars[key] ? styles.starBtnActive : {}) }, "aria-label": stars[key] ? `Unstar ${item.name}` : `Star ${item.name} as a top pick` }, stars[key] ? "★" : "☆"),
                                            React.createElement("button", { onClick: () => removeProduct(cat.name, item), style: styles.removeBtn, "aria-label": `Remove ${item.name}` }, "\u00D7")),
                                        React.createElement("span", { style: styles.actionStatus }, STATUS[s].label),
                                        changedKeys.includes(key) && (React.createElement("span", { style: styles.actionUpdated }, "\u25CF Updated")))));
                            }),
                            filter === "all" && (addingTo === cat.name ? (React.createElement("div", { style: styles.addForm, onClick: (e) => e.stopPropagation() },
                                React.createElement("input", { style: styles.addInput, placeholder: "Product name", value: newName, onChange: (e) => setNewName(e.target.value), autoFocus: true }),
                                React.createElement("input", { style: styles.addInput, placeholder: "Sephora link (optional)", value: newLink, onChange: (e) => setNewLink(e.target.value) }),
                                React.createElement("input", { style: styles.addInput, placeholder: "Color / shade (optional)", value: newShade, onChange: (e) => setNewShade(e.target.value) }),
                                React.createElement("input", { style: styles.addInput, placeholder: "Note (optional)", value: newNote, onChange: (e) => setNewNote(e.target.value) }),
                                React.createElement("div", { style: styles.addFormRow },
                                    React.createElement("button", { style: styles.addConfirmBtn, onClick: () => addProduct(cat.name) },
                                        "Add to ",
                                        cat.name),
                                    React.createElement("button", { style: styles.addCancelBtn, onClick: () => {
                                            setAddingTo(null);
                                            setNewName("");
                                            setNewLink("");
                                            setNewShade("");
                                            setNewNote("");
                                        } }, "Cancel")))) : (React.createElement("button", { style: styles.addRowBtn, onClick: () => setAddingTo(cat.name) }, "+ Add a product")))))));
                }),
                filter !== "all" && ownedCount === 0 && wishCount === 0 && (React.createElement("p", { style: styles.empty }, "Nothing tracked yet \u2014 tap any item to start.")),
                React.createElement("div", { style: styles.bottomActions },
                    React.createElement("button", { onClick: copyWishlist, style: styles.syncBtn }, copied ? "Copied! 💕" : "Copy Tap-to-Get list 📋"),
                    copyFallback && (React.createElement("div", { style: styles.copyFallbackWrap },
                        React.createElement("p", { style: styles.footnote }, "Couldn't reach the clipboard \u2014 long-press to copy from here:"),
                        React.createElement("textarea", { style: styles.copyFallbackBox, readOnly: true, value: copyFallback, onFocus: (e) => e.target.select() }),
                        React.createElement("button", { style: styles.resetBtn, onClick: () => setCopyFallback("") }, "Close"))),
                    React.createElement("button", { onClick: loadShared, style: styles.syncBtn }, "Refresh List \u2191"),
                    removed.length > 0 && (React.createElement("button", { onClick: restoreRemoved, style: styles.resetBtn },
                        "Restore removed products (",
                        removed.length,
                        ")")),
                    React.createElement("button", { onClick: reset, style: styles.resetBtn }, confirmingReset ? "Tap again to clear everything" : "Clear all")),
                React.createElement("p", { style: styles.footnote }, "Shared list \u2014 checkmarks save for everyone with the link. Tap sync to see the latest."))),
            saveStatus && (React.createElement("div", { style: {
                    ...styles.savePill,
                    ...(saveStatus === "error" ? styles.savePillError : {}),
                } },
                saveStatus === "saving" && "Saving…",
                saveStatus === "saved" && "Saved ✓",
                saveStatus === "error" && "⚠️ Can't reach the database — changes aren't saving. Check the Firebase URL & rules.")),
            showTopBtn && (React.createElement("button", { onClick: scrollToTop, style: styles.topBtn, "aria-label": "Back to top" }, "\u2191 Top")))));
}
// ---- Styles ----------------------------------------------------------------
const styles = {
    page: {
        minHeight: "100vh",
        background: "repeating-linear-gradient(90deg, #FFFFFF 0px, #FFFFFF 12px, #FDF1F4 12px, #FDF1F4 24px)",
        backgroundColor: "#FFFFFF",
        color: "#2B1B20",
        fontFamily: "'Karla', sans-serif",
        padding: "28px 16px 48px",
    },
    inner: {
        maxWidth: 560,
        margin: "0 auto",
    },
    header: { textAlign: "center", marginBottom: 20 },
    eyebrow: {
        fontSize: 11,
        letterSpacing: "0.28em",
        color: "#9E7238",
        fontWeight: 700,
        marginBottom: 6,
    },
    title: {
        fontFamily: "'Cormorant Garamond', serif",
        fontWeight: 600,
        fontStyle: "italic",
        fontSize: 34,
        margin: 0,
        lineHeight: 1.05,
        color: "#D2688A",
    },
    tagline: {
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 500,
        fontSize: 17,
        color: "#9C4A63",
        margin: "6px 0 0",
        lineHeight: 1.3,
    },
    subtitle: { fontSize: 13, color: "#7A5E66", margin: "6px 0 0", lineHeight: 1.5 },
    meterWrap: { margin: "0 4px 18px" },
    meterLabelRow: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    meterLabel: { fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: "#9C4A63" },
    meterTube: {
        position: "relative",
        height: 14,
        borderRadius: 8,
        background: "#FDEFF3",
        border: "1px solid #F5D8E0",
        overflow: "visible",
    },
    meterFill: {
        height: "100%",
        borderRadius: "8px 3px 3px 8px",
        background: "#F5AFC3",
        transition: "width 400ms ease",
    },
    meterTip: {
        position: "absolute",
        top: -3,
        width: 14,
        height: 20,
        borderRadius: "3px 8px 2px 2px",
        background: "#F5AFC3",
        transform: "skewX(-8deg)",
        transition: "left 400ms ease",
    },
    stickyBar: {
        position: "sticky",
        top: 0,
        zIndex: 15,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        padding: "10px 8px 8px",
        margin: "0 -8px 16px",
        borderBottom: "1px solid #F8E3E9",
        borderRadius: "0 0 16px 16px",
    },
    filterRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 },
    bulkRow: { display: "flex", justifyContent: "center", gap: 14, marginTop: 8 },
    helpCard: {
        background: "#FFFFFF",
        border: "1.5px dashed #F5AFC3",
        borderRadius: 16,
        padding: "14px 16px",
        marginBottom: 18,
        textAlign: "center",
    },
    helpTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: "italic",
        fontWeight: 600,
        fontSize: 20,
        color: "#D2688A",
        marginBottom: 6,
    },
    helpLine: { fontSize: 13, color: "#7A5E66", margin: "4px 0", lineHeight: 1.5, textAlign: "left" },
    helpGotIt: {
        marginTop: 10,
        padding: "8px 22px",
        background: "#F5AFC3",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        color: "#7A2E48",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    bulkBtn: {
        background: "transparent",
        border: "none",
        color: "#9C4A63",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
        padding: "2px 6px",
    },
    filterBtnActiveGold: {
        background: "linear-gradient(135deg, #E8B4A0 0%, #D99B8C 45%, #C98276 100%)",
        color: "#5C2E26",
        borderColor: "#D99B8C",
        fontWeight: 700,
        boxShadow: "0 2px 10px rgba(201, 130, 118, 0.45)",
    },
    filterBtn: {
        flex: "1 1 45%",
        padding: "9px 4px",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        background: "#FBD5DF",
        color: "#9C4A63",
        border: "1px solid #FBD5DF",
        borderRadius: 999,
        cursor: "pointer",
    },
    filterBtnActive: {
        background: "#F5AFC3",
        color: "#7A2E48",
        borderColor: "#F5AFC3",
        fontWeight: 700,
        boxShadow: "0 2px 8px rgba(245, 175, 195, 0.5)",
    },
    category: {
        marginBottom: 18,
        padding: "14px 14px 12px",
        borderRadius: 16,
        background: "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(253,241,244,0.9) 100%)",
        border: "1px solid #F8E3E9",
        boxShadow: "0 1px 4px rgba(154, 74, 99, 0.06)",
    },
    catHeader: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        borderBottom: "1px solid #E7CDD0",
        paddingBottom: 6,
        marginBottom: 8,
    },
    catTitle: {
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 22,
        fontWeight: 600,
        margin: 0,
    },
    stepNum: {
        fontFamily: "'Karla', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: "#9E7238",
        marginRight: 10,
        verticalAlign: "middle",
    },
    catCount: { fontSize: 12, fontWeight: 700, color: "#9E7238", letterSpacing: "0.08em" },
    itemRow: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        textAlign: "left",
        background: "#FFFFFF",
        border: "1px solid #F1DFE0",
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 8,
        cursor: "pointer",
        fontFamily: "'Karla', sans-serif",
        transition: "background 150ms ease, border-color 150ms ease",
    },
    itemWish: { borderColor: "#B98A4E", background: "#FCF4E4", boxShadow: "0 1px 4px rgba(185, 138, 78, 0.18)" },
    itemOwned: { borderColor: "#F5AFC3", background: "#FDEFF3" },
    badge: {
        flexShrink: 0,
        width: 26,
        height: 26,
        borderRadius: "50%",
        border: "1.5px solid #E0BFC7",
        color: "#A87B87",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 700,
    },
    badgeWish: {
        borderColor: "#D99B8C",
        background: "linear-gradient(135deg, #E8B4A0 0%, #D99B8C 45%, #C98276 100%)",
        color: "#5C2E26",
    },
    badgeOwned: { borderColor: "#F5AFC3", background: "#F5AFC3", color: "#7A2E48" },
    itemName: { flex: 1, minWidth: 0, fontSize: 14.5, lineHeight: 1.35, color: "#2B1B20", overflowWrap: "break-word" },
    statusHint: { fontSize: 10.5, color: "#B99AA3", letterSpacing: "0.04em", flexShrink: 0 },
    statusHintInline: {
        display: "block",
        fontSize: 10.5,
        color: "#9E7A85",
        letterSpacing: "0.04em",
        marginTop: 2,
    },
    shadeText: {
        display: "inline-block",
        fontSize: 12.5,
        fontWeight: 700,
        color: "#9C4A63",
        marginTop: 3,
        cursor: "pointer",
    },
    shadeAdd: {
        display: "inline-block",
        fontSize: 11.5,
        color: "#A87B87",
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textUnderlineOffset: "3px",
        marginTop: 3,
        cursor: "pointer",
    },
    shadeEditWrap: {
        display: "flex",
        gap: 6,
        marginTop: 4,
        alignItems: "center",
    },
    shadeInput: {
        flex: 1,
        minWidth: 0,
        padding: "6px 10px",
        border: "1px solid #F5AFC3",
        borderRadius: 8,
        fontSize: 13,
        fontFamily: "'Karla', sans-serif",
        color: "#2B1B20",
        outline: "none",
    },
    noteText: {
        display: "inline-block",
        fontSize: 12,
        color: "#7A5E66",
        marginTop: 3,
        cursor: "pointer",
        fontStyle: "italic",
    },
    caret: { marginLeft: 8, fontSize: 12, color: "#A87B87" },
    inlineRow: { display: "block" },
    actionCol: {
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
    },
    actionIcons: { display: "flex", gap: 6 },
    actionUpdated: {
        fontSize: 10,
        fontWeight: 700,
        color: "#C4385B",
        textAlign: "center",
        letterSpacing: "0.03em",
    },
    actionStatus: {
        fontSize: 10,
        color: "#9E7A85",
        textAlign: "center",
        letterSpacing: "0.03em",
        lineHeight: 1.3,
        maxWidth: 86,
    },
    savePill: {
        position: "fixed",
        bottom: "calc(64px + env(safe-area-inset-bottom))",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 30,
        maxWidth: "86vw",
        padding: "9px 16px",
        background: "#FBD5DF",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        color: "#7A2E48",
        fontSize: 12.5,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        boxShadow: "0 3px 10px rgba(154, 74, 99, 0.25)",
        textAlign: "center",
    },
    savePillError: {
        background: "#FDECEA",
        border: "1px solid #E8A2A2",
        color: "#8C2F2F",
    },
    changedDot: { marginLeft: 8, fontSize: 10, color: "#C4385B", verticalAlign: "middle" },
    starBtn: {
        flexShrink: 0,
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "1px solid #F5D8E0",
        background: "transparent",
        color: "#C9AEB4",
        fontSize: 15,
        lineHeight: 1,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    starBtnActive: { borderColor: "#B98A4E", color: "#B98A4E", background: "#FDF9F2" },
    copyFallbackWrap: { marginTop: 12 },
    copyFallbackBox: {
        display: "block",
        width: "100%",
        boxSizing: "border-box",
        minHeight: 120,
        padding: 10,
        border: "1px solid #F5AFC3",
        borderRadius: 12,
        fontSize: 12.5,
        fontFamily: "'Karla', sans-serif",
        color: "#2B1B20",
        background: "#FFFFFF",
    },
    topBtn: {
        position: "fixed",
        bottom: "calc(18px + env(safe-area-inset-bottom))",
        right: 16,
        zIndex: 20,
        padding: "10px 16px",
        background: "#F5AFC3",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        color: "#7A2E48",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
        boxShadow: "0 3px 10px rgba(154, 74, 99, 0.25)",
    },
    shadeSaveBtn: {
        flexShrink: 0,
        padding: "6px 12px",
        background: "#F5AFC3",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        color: "#7A2E48",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    shopLink: {
        flexShrink: 0,
        fontSize: 12,
        fontWeight: 700,
        color: "#9C4A63",
        textDecoration: "none",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        padding: "6px 12px",
        background: "#FBD5DF",
    },
    loading: { textAlign: "center", color: "#7A5E66", fontSize: 14 },
    empty: { textAlign: "center", color: "#7A5E66", fontSize: 14, padding: "24px 0" },
    jumpRow: { display: "flex", gap: 8, margin: "0 0 0" },
    jumpInput: {
        flex: 1,
        minWidth: 0,
        padding: "9px 14px",
        border: "1px solid #F5D8E0",
        borderRadius: 999,
        fontSize: 13,
        fontFamily: "'Karla', sans-serif",
        color: "#2B1B20",
        background: "#FFFFFF",
        outline: "none",
    },
    jumpChips: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 },
    jumpChip: {
        padding: "6px 12px",
        background: "#FFFFFF",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        color: "#9C4A63",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    syncBtnTop: {
        flexShrink: 0,
        display: "block",
        background: "#FBD5DF",
        border: "1px solid #FBD5DF",
        color: "#9C4A63",
        borderRadius: 999,
        padding: "9px 14px",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    bottomActions: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        marginTop: 26,
    },
    syncBtn: {
        display: "block",
        margin: 0,
        background: "#FBD5DF",
        border: "1px solid #F5AFC3",
        color: "#7A2E48",
        borderRadius: 999,
        padding: "10px 24px",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    resetBtn: {
        display: "block",
        margin: 0,
        background: "transparent",
        border: "1px solid #E7CDD0",
        color: "#7A5E66",
        borderRadius: 999,
        padding: "8px 22px",
        fontSize: 13,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    footnote: { textAlign: "center", fontSize: 11.5, color: "#9E7A85", marginTop: 10 },
    addRowBtn: {
        display: "block",
        width: "100%",
        padding: "10px",
        background: "transparent",
        border: "1.5px dashed #F5AFC3",
        borderRadius: 12,
        color: "#9C4A63",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    addForm: {
        background: "#FFFFFF",
        border: "1.5px dashed #F5AFC3",
        borderRadius: 12,
        padding: 12,
    },
    addInput: {
        display: "block",
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 12px",
        marginBottom: 8,
        border: "1px solid #F5D8E0",
        borderRadius: 10,
        fontSize: 14,
        fontFamily: "'Karla', sans-serif",
        color: "#2B1B20",
        outline: "none",
    },
    addFormRow: { display: "flex", gap: 8 },
    addConfirmBtn: {
        flex: 1,
        padding: "10px",
        background: "#F5AFC3",
        border: "1px solid #F5AFC3",
        borderRadius: 999,
        color: "#7A2E48",
        fontSize: 13,
        fontWeight: 700,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    addCancelBtn: {
        padding: "10px 16px",
        background: "transparent",
        border: "1px solid #F5D8E0",
        borderRadius: 999,
        color: "#9C4A63",
        fontSize: 13,
        fontFamily: "'Karla', sans-serif",
        cursor: "pointer",
    },
    removeBtn: {
        flexShrink: 0,
        width: 24,
        height: 24,
        borderRadius: "50%",
        border: "1px solid #F5D8E0",
        background: "transparent",
        color: "#B99AA3",
        fontSize: 14,
        lineHeight: 1,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
};
const rootEl = document.getElementById("root");
if (DB_URL.startsWith("PASTE_")) {
    rootEl.innerHTML = "<div style='font-family:sans-serif;padding:40px;text-align:center;color:#9C4A63'><h2>Almost there!</h2><p>Open index.html and paste your Firebase Database URL where it says PASTE_YOUR_DATABASE_URL_HERE (see README).</p></div>";
}
else {
    ReactDOM.createRoot(rootEl).render(React.createElement(SephoraTracker));
}
