# OpenCage Geosearch Demo Pages

This directory contains demo HTML pages showing how to use the OpenCage Geosearch plugin with both Leaflet 1.x and Leaflet 2.0.

## Demo Files

### 📄 [leaflet2-esm.html](leaflet2-esm.html)
**Leaflet 2.0 with ESM (Factory Method)**

Demonstrates the factory method approach for Leaflet 2.0 using ES modules.

- **Leaflet Version:** 2.0.0-alpha
- **Module System:** ESM (import/export)
- **Control Creation:** `openCageGeosearch(options).addTo(map)`
- **Best For:** Developers familiar with Leaflet 1.x transitioning to 2.0

```javascript
import { Map, TileLayer } from 'leaflet';
import { openCageGeosearch } from '@opencage/leaflet-opencage-geosearch';

const map = new Map('map', { center: [51.505, -0.09], zoom: 13 });
openCageGeosearch({ key: 'YOUR-API-KEY' }).addTo(map);
```

---

### 📄 [leaflet2-esm-class.html](leaflet2-esm-class.html)
**Leaflet 2.0 with ESM (Class-based)**

Shows the recommended Leaflet 2.0 approach using class constructors throughout.

- **Leaflet Version:** 2.0.0-alpha
- **Module System:** ESM (import/export)
- **Control Creation:** `new OpenCageGeosearchControl(options)`
- **Best For:** New projects using Leaflet 2.0 following modern patterns

```javascript
import { Map, TileLayer } from 'leaflet';
import { OpenCageGeosearchControl } from '@opencage/leaflet-opencage-geosearch';

const map = new Map('map', { center: [51.505, -0.09], zoom: 13 });
const control = new OpenCageGeosearchControl({ key: 'YOUR-API-KEY' });
map.addControl(control);
```

---

### 📄 [leaflet1-umd.html](leaflet1-umd.html)
**Leaflet 1.x with UMD (Classic)**

Traditional Leaflet 1.x implementation using global variables and factory methods.

- **Leaflet Version:** 1.9.4
- **Module System:** UMD (script tags)
- **Control Creation:** `L.Control.openCageGeosearch(options).addTo(map)`
- **Best For:** Existing Leaflet 1.x projects, simple HTML pages without build tools

```javascript
var map = L.map('map').setView([51.505, -0.09], 13);
L.Control.openCageGeosearch({ key: 'YOUR-API-KEY' }).addTo(map);
```

---

## Quick Start

### 1. Get an OpenCage API Key

Sign up for a free API key at [OpenCage Geocoding API](https://opencagedata.com/).

### 2. Choose Your Demo

- **For Leaflet 1.x projects:** Use `leaflet1-umd.html`
- **For Leaflet 2.0 (beginner-friendly):** Use `leaflet2-esm.html`
- **For Leaflet 2.0 (modern approach):** Use `leaflet2-esm-class.html`

### 3. Update the API Key

Open your chosen demo file and replace `YOUR-API-KEY` with your actual API key:

```javascript
key: 'YOUR-API-KEY', // <- Replace this
```

### 4. Run the Demo

#### Option A: Using a Local Web Server (Recommended)

ESM demos require a web server due to CORS restrictions. Use any of these:

```bash
# Python 3
python -m http.server 8000

# Node.js (npx)
npx serve

# PHP
php -S localhost:8000

# VS Code - Install "Live Server" extension and click "Go Live"
```

Then open: `http://localhost:8000/demo/leaflet2-esm.html`

#### Option B: Direct File Opening

The UMD demo (`leaflet1-umd.html`) can be opened directly in a browser, but ESM demos require a server.

---

## Key Differences

### Leaflet 1.x vs 2.0

| Feature | Leaflet 1.x | Leaflet 2.0 |
|---------|-------------|-------------|
| **Import Style** | `<script src="...">` | `import { Map } from 'leaflet'` |
| **Global Object** | `L` available globally | No global `L` (ESM imports) |
| **Map Creation** | `L.map('map')` | `new Map('map')` |
| **Layers** | `L.tileLayer(...)` | `new TileLayer(...)` |
| **Controls** | `L.Control.extend()` | `class extends Control` |
| **Factory Methods** | Primary pattern | Backward compatible |

### Plugin Usage Comparison

**Leaflet 1.x:**
```javascript
L.Control.openCageGeosearch(options).addTo(map);
```

**Leaflet 2.0 (Factory):**
```javascript
import { openCageGeosearch } from '@opencage/leaflet-opencage-geosearch';
openCageGeosearch(options).addTo(map);
```

**Leaflet 2.0 (Class):**
```javascript
import { OpenCageGeosearchControl } from '@opencage/leaflet-opencage-geosearch';
const control = new OpenCageGeosearchControl(options);
map.addControl(control);
```

---

## Configuration Options

All demos support these options:

```javascript
{
  // Required
  key: 'YOUR-API-KEY',

  // Optional UI
  placeholder: 'Search for places',
  defaultZoomLevel: 13,

  // Optional OpenCage API parameters
  bounds: 'min_lon,min_lat,max_lon,max_lat', // Restrict to area
  countrycode: 'us,ca',                       // Filter by country
  language: 'en',                             // Response language
  limit: 5,                                   // Max results

  // Optional Leaflet
  customMarkerOptions: {
    draggable: false,
    icon: L.icon({...})  // Custom marker icon
  },

  // Optional callbacks
  onSelect: (params) => {
    console.log('Selected:', params.item.formatted);
  },
  onActive: (params) => {
    console.log('Active item:', params);
  },
  onSubmit: (params) => {
    console.log('Submitted:', params);
  }
}
```

---

## Import Maps (for ESM demos)

The Leaflet 2.0 demos use [Import Maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) to load dependencies from CDN without a build tool:

```html
<script type="importmap">
{
  "imports": {
    "leaflet": "https://cdn.jsdelivr.net/npm/leaflet@2.0.0-alpha/dist/leaflet-src.esm.js",
    "@algolia/autocomplete-js": "https://cdn.jsdelivr.net/npm/@algolia/autocomplete-js@1.19.4/+esm",
    "@opencage/geosearch-core": "https://cdn.jsdelivr.net/npm/@opencage/geosearch-core@0.1.12/+esm"
  }
}
</script>
```

**Browser Support:** Chrome 89+, Edge 89+, Safari 16.4+, Firefox 108+

---

## Production Usage

### Using a Package Manager (Recommended)

```bash
npm install @opencage/leaflet-opencage-geosearch leaflet
```

**With Leaflet 2.0:**
```javascript
import { Map } from 'leaflet';
import { OpenCageGeosearchControl } from '@opencage/leaflet-opencage-geosearch';
import '@opencage/leaflet-opencage-geosearch/leaflet-opencage-geosearch.css';
import 'leaflet/dist/leaflet.css';

const map = new Map('map', { center: [51.505, -0.09], zoom: 13 });
const control = new OpenCageGeosearchControl({ key: 'YOUR-API-KEY' });
map.addControl(control);
```

**With Leaflet 1.x:**
```javascript
import L from 'leaflet';
import { openCageGeosearch } from '@opencage/leaflet-opencage-geosearch';
import '@opencage/leaflet-opencage-geosearch/leaflet-opencage-geosearch.css';
import 'leaflet/dist/leaflet.css';

const map = L.map('map').setView([51.505, -0.09], 13);
openCageGeosearch({ key: 'YOUR-API-KEY' }).addTo(map);
```

### Using CDN (No Build Step)

See the demo files for complete working examples using CDN.

---

## Troubleshooting

### ESM Demo Shows Blank Page

**Problem:** Import maps require a web server due to CORS.

**Solution:** Use `python -m http.server 8000` or similar, don't open `file://` directly.

### "Cannot find module 'leaflet'"

**Problem:** Import map not loaded or wrong module path.

**Solution:** Check browser console, ensure import map is defined before module scripts.

### Search Not Working

**Problem:** Invalid or missing API key.

**Solution:** Replace `YOUR-API-KEY` with a valid OpenCage API key.

### Styles Not Applied

**Problem:** CSS files not loaded.

**Solution:** Check that all CSS files are linked in `<head>`:
- Leaflet CSS
- Algolia Autocomplete CSS
- OpenCage Geosearch CSS

---

## Additional Resources

- [Leaflet Documentation](https://leafletjs.com/)
- [Leaflet 2.0 Release Notes](https://leafletjs.com/2025/05/18/leaflet-2.0.0-alpha.html)
- [OpenCage API Documentation](https://opencagedata.com/api)
- [Import Maps Specification](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap)

---

## License

These demo files are part of the @opencage/leaflet-opencage-geosearch package and are provided as examples. See the [LICENSE](../LICENSE) file for details.
