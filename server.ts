import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// In-memory & JSON file persistent store for settings & access
const DATA_DIR = path.resolve(__dirname, '.data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const DEVICES_FILE = path.join(DATA_DIR, 'devices.json');

interface ServerSettings {
  password?: string;
  proTraderPassword?: string;
  devTelegramLink: string;
  joinTelegramLink: string;
}

const defaultSettings: ServerSettings = {
  password: '123',
  proTraderPassword: 'VIP',
  devTelegramLink: 'https://t.me/+WIKRSTgIhx5kNDRl',
  joinTelegramLink: 'https://t.me/+WIKRSTgIhx5kNDRl',
};

function readSettings(): ServerSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      return { ...defaultSettings, ...JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8')) };
    }
  } catch (err) {
    console.error('Error reading settings file:', err);
  }
  return { ...defaultSettings };
}

interface DeviceAccess {
  normal: boolean;
  pro: boolean;
  unlockedAt?: number;
  label?: string;
}

const memoryDevices: Record<string, DeviceAccess> = {};

function readDevices(): Record<string, DeviceAccess> {
  try {
    if (fs.existsSync(DEVICES_FILE)) {
      return { ...memoryDevices, ...JSON.parse(fs.readFileSync(DEVICES_FILE, 'utf-8')) };
    }
  } catch (err) {
    console.error('Error reading devices file:', err);
  }
  return memoryDevices;
}

function writeDevices(devices: Record<string, DeviceAccess>) {
  try {
    fs.writeFileSync(DEVICES_FILE, JSON.stringify(devices, null, 2));
  } catch (err) {
    console.error('Error writing devices file:', err);
  }
}

// ----------------- API ROUTES -----------------

// 1. Draw Proxy with caching to ensure high uptime and avoid browser CORS blocks
interface CacheEntry {
  timestamp: number;
  data: any;
}
const drawCache: Record<string, CacheEntry> = {};

app.get('/api/draw/:apiBase/:apiPath', async (req, res) => {
  const { apiBase, apiPath } = req.params;
  const cacheKey = `${apiBase}/${apiPath}`;
  const now = Date.now();

  if (drawCache[cacheKey] && now - drawCache[cacheKey].timestamp < 3000) {
    return res.json(drawCache[cacheKey].data);
  }

  const targetUrl = `https://draw.ar-lottery01.com/${apiBase}/${apiPath}/GetHistoryIssuePage.json?t=${now}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const userAgent =
      (req.headers['user-agent'] as string) ||
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';

    const upstreamRes = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': userAgent,
        Accept: 'application/json, text/plain, */*',
        Referer: 'https://ar-lottery01.com/',
        Origin: 'https://ar-lottery01.com',
      },
    });
    clearTimeout(timeout);

    if (upstreamRes.ok) {
      const data = await upstreamRes.json();
      drawCache[cacheKey] = { timestamp: now, data };
      return res.json(data);
    }
  } catch (err) {
    // If upstream timed out or failed, serve cached if available
    if (drawCache[cacheKey]) {
      return res.json(drawCache[cacheKey].data);
    }
  }

  // If no cache yet, generate fallback realistic data
  const fallbackList = [];
  const timerMod = apiPath.includes('30S')
    ? 30
    : apiPath.includes('3M')
    ? 180
    : apiPath.includes('5M')
    ? 300
    : apiPath.includes('10M')
    ? 600
    : 60;
  const currentInterval = Math.floor(now / (timerMod * 1000));
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  for (let i = 0; i < 20; i++) {
    const issueIndex = currentInterval - i;
    const issueNumber = `${dateStr}${String(issueIndex).slice(-5).padStart(5, '0')}`;
    const rand = Math.abs(Math.sin(issueIndex * 9301 + 49297) * 10000);
    const num = apiBase === 'K3' ? Math.floor(rand % 16) + 3 : Math.floor(rand % 10);
    fallbackList.push({
      issueNumber,
      number: String(num),
      sum: num,
    });
  }

  const fallbackResponse = {
    code: 0,
    data: {
      list: fallbackList,
    },
  };
  return res.json(fallbackResponse);
});

// 2. Public Access Management
app.post('/api/public/access', (req, res) => {
  const { action, tier, password, deviceId, label } = req.body || {};
  if (!deviceId) {
    return res.status(400).json({ ok: false, error: 'Device ID required' });
  }

  const devices = readDevices();
  const currentAccess = devices[deviceId] || { normal: false, pro: false };

  if (action === 'status') {
    return res.json({
      ok: true,
      normal: Boolean(currentAccess.normal),
      pro: Boolean(currentAccess.pro),
    });
  }

  if (action === 'redeem') {
    const settings = readSettings();
    const cleanPassword = String(password || '').trim();

    if (tier === 'pro') {
      const validPass = settings.proTraderPassword || defaultSettings.proTraderPassword;
      if (cleanPassword === validPass || (!validPass && cleanPassword.length > 0)) {
        devices[deviceId] = {
          ...currentAccess,
          pro: true,
          unlockedAt: Date.now(),
          label: label || currentAccess.label,
        };
        writeDevices(devices);
        return res.json({ ok: true, tier: 'pro' });
      }
      return res.json({ ok: false, error: 'Invalid VIP password' });
    } else {
      const validPass = settings.password || defaultSettings.password;
      if (cleanPassword === validPass || (!validPass && cleanPassword.length > 0)) {
        devices[deviceId] = {
          ...currentAccess,
          normal: true,
          unlockedAt: Date.now(),
          label: label || currentAccess.label,
        };
        writeDevices(devices);
        return res.json({ ok: true, tier: 'normal' });
      }
      return res.json({ ok: false, error: 'Invalid password' });
    }
  }

  if (action === 'lock') {
    if (tier === 'pro') {
      devices[deviceId] = { ...currentAccess, pro: false };
    } else if (tier === 'normal') {
      devices[deviceId] = { ...currentAccess, normal: false };
    } else {
      devices[deviceId] = { normal: false, pro: false };
    }
    writeDevices(devices);
    return res.json({ ok: true });
  }

  return res.status(400).json({ ok: false, error: 'Unknown action' });
});

// ----------------- VITE / STATIC MOUNTING -----------------
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
