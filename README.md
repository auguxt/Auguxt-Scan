# 🐾 MeowScanner — Multi-Engine Threat & Malware Analysis

<div align="center">

![License](https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge)
![Live](https://img.shields.io/badge/Live_URL-scan.auguxt.dev-f97316.svg?style=for-the-badge)
![VirusTotal v3](https://img.shields.io/badge/VirusTotal_API-v3_Integrated-8b5cf6.svg?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black.svg?style=for-the-badge&logo=vercel)

**A sleek, privacy-focused threat intelligence and multi-engine malware scanner.**  
*Inspect suspicious files, malicious URLs, domains, and cryptographic hashes across 72+ global security feeds.*

👉 **[Launch MeowScanner Live](https://scan.auguxt.dev/)**

</div>

---

## 🌟 Overview

**MeowScanner** is an open-source cybersecurity web application engineered for analysts, developers, and everyday users to quickly inspect suspicious artifacts without compromising privacy or leaking API keys.

By combining browser-side **Web Crypto API** hashing with **Vercel Serverless Functions**, MeowScanner generates cryptographic fingerprints locally in memory before querying cloud intelligence feeds across 72+ top antivirus vendors.

---

## ✨ Features

- 📁 **Client-Side File Hashing:** Computes cryptographic `SHA-256`, `MD5`, and `SHA-1` checksums locally in browser memory without unneeded raw binary uploads.
- 🌐 **URL & Phishing Detector:** Analyzes live web endpoints, suspicious landing pages, and domains against heuristic risk rules and blacklists.
- 🔎 **Threat Intelligence Search:** Instant reputation lookups by SHA-256 / MD5 hash, domain name, or IPv4 address.
- 🛡️ **72+ Security Vendors:** Engine breakdown across *CrowdStrike Falcon, Kaspersky, Microsoft Defender, BitDefender, Sophos, SentinelOne, ESET-NOD32, Fortinet, Google Safe Browsing*, and more.
- 🔒 **Zero API Key Leakage:** Uses serverless proxying (`/api/scan`) with environment variables so your VirusTotal API key remains strictly secret.
- 📊 **Telemetry & Export:** Inspect file entropy, MIME types, and export structured `.json` threat intelligence reports.
- 🎨 **Sleek Aesthetic:** Minimalist obsidian dark theme accented with royal purple and vibrant orange styling.

---

## 🏗️ Architecture

```
┌───────────────────────────┐
│     User Browser (Client) │
│  - Drag & Drop / URL Input│
│  - Native WebCrypto SHA256│
└─────────────┬─────────────┘
              │  POST /api/scan (JSON)
              ▼
┌───────────────────────────┐
│  Vercel Serverless Backend│
│  - Reads process.env.VT   │
│  - Secret Proxying        │
└─────────────┬─────────────┘
              │  x-apikey: [SECRET]
              ▼
┌───────────────────────────┐
│    VirusTotal v3 API      │
│  - 72+ Antivirus Engines  │
│  - Threat Telemetry       │
└───────────────────────────┘
```

---

## 🚀 Quick Setup & Deployment

### 1. Clone Repository
```bash
git clone https://github.com/auguxt/meowscanner.git
cd meowscanner
```

### 2. Deploy to Vercel
1. Push your repository to GitHub.
2. Import the project into **[Vercel](https://vercel.com/)**.
3. Add the following **Environment Variable** in Vercel Settings:
   - **Key:** `VIRUSTOTAL_API_KEY`
   - **Value:** `your_64_character_virustotal_api_key`
4. Deploy!

### 3. Connect Custom Domain (Optional)
To map to a custom subdomain (e.g. `scan.auguxt.dev`):
1. In Vercel Project Settings $\rightarrow$ **Domains** $\rightarrow$ Add `scan.auguxt.dev`.
2. In your DNS manager (e.g. Name.com / Cloudflare), add a **CNAME** record:
   - **Host:** `scan`
   - **Target / Value:** `cname.vercel-dns.com`

---

## 🛠️ Tech Stack

- **Frontend:** Vanilla HTML5, CSS3 Variables, Modern ES6+ JavaScript, Web Crypto API.
- **Backend:** Node.js Serverless Function (`/api/scan.js`) on Vercel.
- **Threat Feeds:** VirusTotal v3 REST API.
- **Typography:** Plus Jakarta Sans & JetBrains Mono.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">

Crafted with 🐾 by **[Syed Sameer](https://auguxt.dev)**  
*Cybersecurity • Systems • auguxt.dev*

</div>
