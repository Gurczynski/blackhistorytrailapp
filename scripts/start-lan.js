#!/usr/bin/env node
// Start Expo on LAN with a detected local IPv4 and set REACT_NATIVE_PACKAGER_HOSTNAME
const os = require('os');
const { spawn } = require('child_process');

function pickIp() {
  const ifaces = os.networkInterfaces();
  const badName = (n) => {
    const s = n.toLowerCase();
    return (
      s.includes('loopback') ||
      s.includes('vethernet') ||
      s.includes('hyper-v') ||
      s.includes('virtual') ||
      s.includes('docker') ||
      s.includes('wsl') ||
      s.includes('npcap') ||
      s.includes('bluetooth') ||
      s.includes('tailscale') ||
      s.includes('zerotier') ||
      s.includes('default switch')
    );
  };
  const entries = [];
  for (const name of Object.keys(ifaces)) {
    if (badName(name)) continue;
    for (const info of ifaces[name] || []) {
      if (info && info.family === 'IPv4' && !info.internal) {
        entries.push({ name, address: info.address });
      }
    }
  }
  const addrs = entries.map((e) => e.address);
  // Prefer common private ranges likely to be Wi‑Fi/LAN
  const candidates = [
    ...addrs.filter((a) => a.startsWith('192.168.')),
    ...addrs.filter((a) => a.startsWith('10.')),
    ...addrs.filter((a) => a.startsWith('172.')), // still allow 172.* but deprioritized by order
    ...addrs,
  ];
  // Remove duplicates while preserving order
  const seen = new Set();
  const unique = candidates.filter((a) => (seen.has(a) ? false : (seen.add(a), true)));
  return unique[0];
}

function parseArgs(argv) {
  const args = { host: undefined, port: undefined };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === '--host' && argv[i + 1]) {
      args.host = argv[++i];
    } else if (v === '--port' && argv[i + 1]) {
      args.port = argv[++i];
    }
  }
  return args;
}

const { host: hostArg, port } = parseArgs(process.argv);
const host = hostArg || pickIp();
if (!host) {
  console.error('Could not detect a LAN IPv4 address. Provide one with --host <ip>.');
  process.exit(1);
}

process.env.REACT_NATIVE_PACKAGER_HOSTNAME = host;

async function findOpenPort(preferred) {
  const net = require('net');
  const start = preferred || 8092; // avoid common conflicts on 8081/8082
  for (let p = start; p < start + 20; p++) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await new Promise((resolve) => {
      const server = net.createServer();
      server.once('error', () => resolve(false));
      server.once('listening', () => {
        server.close(() => resolve(true));
      });
      server.listen(p, '0.0.0.0');
    });
    if (ok) return p;
  }
  return preferred || 8081;
}

(async () => {
  const chosenPort = await findOpenPort(port ? Number(port) : undefined);
  const cmd = `npx expo start --lan -p ${chosenPort}`;
  console.log(`Starting Expo on LAN using host ${host} and port ${chosenPort}...`);
  const child = spawn(cmd, {
    stdio: 'inherit',
    env: process.env,
    shell: true,
  });
  child.on('exit', (code) => process.exit(code ?? 0));
})();
