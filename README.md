<div align="center">

# AuguxtScan 🛡️
### Multi-Engine Threat Intelligence & Malware Analysis Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-09090b.svg?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![Live Production](https://img.shields.io/badge/Live-scan.auguxt.dev-18181b.svg?style=for-the-badge&logo=cloudflare&logoColor=white)](https://scan.auguxt.dev/)
[![Threat Engine](https://img.shields.io/badge/Engine-VirusTotal_v3-7c3aed.svg?style=for-the-badge)](https://docs.virustotal.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel_Edge-000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

**Privacy-preserving binary hashing and threat consensus powered by 72+ global security feeds.**

[**Launch AuguxtScan Live**](https://scan.auguxt.dev/) • [**Report Vulnerability**](https://github.com/auguxt/Auguxt-Scan/issues) • [**Portfolio**](https://auguxt.dev/)

</div>

---

## 📌 Overview

**AuguxtScan** is a cloud-native cybersecurity intelligence platform engineered for security analysts, engineers, and developers. It allows users to rapidly assess suspicious files, malicious URLs, domains, and cryptographic hashes without compromising confidential data or exposing proprietary API credentials.

By combining in-browser **W3C Web Cryptography API** execution with asynchronous **Vercel Serverless Gateways**, AuguxtScan generates binary checksums locally in memory before querying an aggregated multi-vendor threat matrix.

---

## ⚡ Key Capabilities

- **🔒 Client-Side Binary Hashing:** Computes cryptographic `SHA-256`, `MD5`, and `SHA-1` hashes locally in browser memory using hardware acceleration—raw binaries never leave your machine for known hash queries.
- **🌐 URL & Phishing Inspection:** Dissects live web endpoints, deceptive domains, and credential harvesting lures against real-time blacklists.
- **🛡️ 72+ Multi-Vendor Threat Matrix:** Aggregates real-time detection telemetry from *CrowdStrike Falcon, Microsoft Defender, Kaspersky, BitDefender, Sophos, SentinelOne, ESET-NOD32, Fortinet, Google Safe Browsing*, and more.
- **🔑 Zero Key Exposure Architecture:** Secrets are isolated in cloud-side serverless environment variables (`process.env.VIRUSTOTAL_API_KEY`), preventing credential leakage on public repositories.
- **📊 Diagnostic Telemetry:** Analyzes file entropy, MIME classification, and exports structured RFC-compliant `.json` intelligence reports.
- **🎨 Minimalist Obsidian UI:** High-contrast, zero-dependency interface built with pure HTML5, modern CSS3 variables, and ES6+ JavaScript.

---

## 🏗️ Architecture & Security Model

```
┌────────────────────────────────┐
│      Client Browser (User)     │
│  • Local File / URL / Hash     │
│  • WebCrypto SHA-256 in memory │
└───────────────┬────────────────┘
                │
                │ HTTPS POST (JSON Payload: { type, query })
                ▼
┌────────────────────────────────┐
│   Vercel Serverless Gateway    │
│         (/api/scan.js)         │
│  • Injects process.env.VT_KEY  │
│  • CORS & Sanitization Layer   │
└───────────────┬────────────────┘
                │
                │ Authenticated REST Request (x-apikey)
                ▼
┌────────────────────────────────┐
│       VirusTotal v3 API        │
│  • 72+ Antivirus Engines       │
│  • Threat Categorization       │
└────────────────────────────────┘
```

---

## 🚀 Deployment & Setup

### 1. Clone & Configure
```bash
git clone https://github.com/auguxt/Auguxt-Scan.git
cd Auguxt-Scan
```

### 2. Deploy to Vercel
1. Import the repository into your **[Vercel Dashboard](https://vercel.com/)**.
2. Add the following **Environment Variable** in Project Settings:
   - **Key:** `VIRUSTOTAL_API_KEY`
   - **Value:** `[Your 64-character VirusTotal v3 API Key]`
3. Click **Deploy**.

### 3. Custom Subdomain Setup (e.g., `scan.auguxt.dev`)
In your DNS provider (Name.com, Cloudflare, etc.), create a **CNAME** record:
| Type | Host / Name | Target / Value | TTL |
| :--- | :--- | :--- | :--- |
| `CNAME` | `scan` | `cname.vercel-dns.com` | `Automatic / 300` |

---

## 🔌 API Reference

### `POST /api/scan`
Executes an authenticated lookup against upstream threat intelligence feeds.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
  "type": "hash",
  "query": "44d88612fea8a8f36de82e1278abb02f"
}
```
*Supported `type` values: `"hash"`, `"file"`, `"url"`, `"domain"`, `"ip"`.*

#### Response Sample
```json
{
  "found": true,
  "data": {
    "attributes": {
      "last_analysis_stats": {
        "harmless": 0,
        "malicious": 62,
        "suspicious": 0,
        "undetected": 10
      }
    }
  }
}
```

---

## 🛠️ Tech Stack

- **Frontend:** Pure HTML5, CSS3, Modern ES6+ JavaScript, W3C Web Cryptography API.
- **Backend:** Node.js Serverless Gateway (`/api/scan.js`) running on Vercel Edge.
- **Threat Intelligence:** VirusTotal v3 REST API.
- **Fonts:** Plus Jakarta Sans & JetBrains Mono.

---

## 📄 License

This project is open-source software licensed under the **[MIT License](LICENSE)**.

---

<div align="center">

Crafted with security & precision by **[Syed Sameer](https://auguxt.dev)**  
*Cybersecurity • Systems • auguxt.dev*

</div>
