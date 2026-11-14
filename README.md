# 🏛️ Bangladesh A-Challan Code Directory (সরকারি এ-চালান কোড ফাইন্ডার)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Total Codes](https://img.shields.io/badge/A--Challan%20Codes-1%2C825%2B-0d9488.svg)](#dataset-overview)
[![Categories](https://img.shields.io/badge/Service%20Categories-13%20Sectors-0f766e.svg)](#categories-covered)
[![Districts Covered](https://img.shields.io/badge/Districts-64%20Districts-d97706.svg)](#features)
[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-emerald.svg)](https://mohammadgolamrabbii.github.io/Bangladesh-AChallan-Code-Directory/)
[![Author](https://img.shields.io/badge/Architect-Mohammad%20Golamrabbii-orange.svg)](https://github.com/mohammadgolamrabbii)

> **The definitive open-source civic directory and economic code finder for 1,825+ Bangladesh Government services.** Instantly search 14-digit A-Challan codes for Passports, BRTA Driving Licenses, Land e-Namjari, Police Clearance, NBR VAT/Taxes, and Trade Licenses with 1-click code copying and step-by-step deposit guides.

---

## 🌟 Live Web Portal & Code Finder

Access the live searchable web portal hosted on GitHub Pages:  
👉 **[https://mohammadgolamrabbii.github.io/Bangladesh-AChallan-Code-Directory/](https://mohammadgolamrabbii.github.io/Bangladesh-AChallan-Code-Directory/)**

---

## 👨‍💻 Project Architect & Lead Researcher

<div align="center">
  <img src="assets/img/profile.jpg" alt="Mohammad Golamrabbii" width="140" style="border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
  <h3>Mohammad Golamrabbii (মোহাম্মদ গোলাম রাব্বী)</h3>
  <p><em>Tech & Media Entrepreneur | Geospatial Archivist & Civic Tech Innovator | Digital Strategist</em></p>
  <p>
    <a href="https://github.com/mohammadgolamrabbii"><img src="https://img.shields.io/badge/GitHub-mohammadgolamrabbii-181717?style=flat&logo=github" /></a>
    <a href="https://linkedin.com/in/golamrabbii"><img src="https://img.shields.io/badge/LinkedIn-golamrabbii-0A66C2?style=flat&logo=linkedin" /></a>
    <a href="https://linktr.ee/golamrabbii"><img src="https://img.shields.io/badge/Portfolio-linktr.ee%2Fgolamrabbii-43E660?style=flat&logo=linktree" /></a>
    <a href="mailto:emarketor2025@gmail.com"><img src="https://img.shields.io/badge/Email-emarketor2025%40gmail.com-D14836?style=flat&logo=gmail" /></a>
  </p>
</div>

---

## 📌 Why This Project is Unique

1. **Eliminates Public Confusion & Bank Rejections**: Over 80% of citizens face harassment or invalid deposits due to incorrect 14-digit economic codes at banks. This directory provides verified, pinpoint codes for every service.
2. **Comprehensive Coverage (1,825+ Records)**: Catalogs national ministerial codes alongside 64 district-level circles for Land (AC Land), Passport (RPO), BRTA, Police SP offices, and Municipalities.
3. **Interactive Fee Calculators**: Dynamic calculators for E-Passports (pages, validity, delivery urgency), e-Namjari breakdown, and BRTA driving license tiers.
4. **Step-by-Step iBAS++ Deposit Guide**: Clear guidelines on navigating `ibas.finance.gov.bd/acs` with bKash, Nagad, Rocket, card payments, and over-the-counter Sonali Bank deposits.
5. **Developer First API & CLI**: Full Node.js and Python SDKs for developers integrating automated government fee lookup into fintech or civic-tech workflows.

---

## 📊 Categories Covered (1,825+ Codes)

| Category | Codes Count | Key Services Included |
| :--- | :--- | :--- |
| **পাসপোর্ট ও ইমিগ্রেশন** | 144 | 48/64 pages, 5/10 yrs Regular/Express/Super Express, Renewal, 64 RPOs |
| **বিআরটিএ ও পরিবহন সেবা** | 207 | Learner, Smart Card (Pro/Non-Pro), Tax Token, Fitness, RFID Plate |
| **ভূমি মন্ত্রণালয় ও ই-নামজারি** | 205 | e-Namjari (1,170 BDT), DCR fee, Mouza Map, LD Tax, 64 AC Land circles |
| **স্বরাষ্ট্র ও পুলিশ সেবা** | 133 | Police Clearance (PCC 500 BDT: `1-2211-0000-2061`), Arms & Security |
| **রাজস্ব বোর্ড, ভ্যাট ও ট্যাক্স** | 206 | VAT, Income Tax, TDS, Customs Duty, Travel Tax (Air/Land/Sea) |
| **শিক্ষা বোর্ড ও সনদ সেবা** | 130 | SSC/HSC Original Certificate, Transcript, Correction across all 11 Boards |
| **সিটি কর্পোরেশন ও ট্রেড লাইসেন্স** | 188 | 12 City Corporations & 64 District Municipalities Trade License codes |
| **আইন, আদালত ও কোর্ট ফি** | 134 | Civil & Criminal Court Fees, Judgment Certified Copies, Affidavits |
| **পরিবেশ, বন ও ফায়ার সার্ভিস** | 135 | Environment Clearance (ECC), Fire License issue & renewal |
| **স্বাস্থ্য ও ওষুধ প্রশাসন** | 133 | DGDA Pharmacy Drug License, BMDC Physician Registration |
| **বাণিজ্য ও কোম্পানি নিবন্ধন** | 71 | RJSC Incorporation, Name Clearance, IRC/ERC, Trademark, Copyright |
| **কৃষি, মৎস্য ও বীজ প্রত্যয়ন** | 132 | BADC Fertilizer Dealership, Seed Certification, Pesticide license |
| **নিয়োগ পরীক্ষা ও কর্ম কমিশন** | 7 | BPSC BCS Exam Application, Non-Cadre, Primary Teacher Exam |

---

## 🚀 Quick Start (Node.js SDK & CLI)

### 1. Installation
```bash
git clone https://github.com/mohammadgolamrabbii/Bangladesh-AChallan-Code-Directory.git
cd Bangladesh-AChallan-Code-Directory
```

### 2. Run the CLI
```bash
# View dataset summary
node sdk/node/cli.js summary

# Search codes by keyword
node sdk/node/cli.js search "Passport"
node sdk/node/cli.js search "নামজারি"
node sdk/node/cli.js search "driving"

# Lookup specific 14-digit code
node sdk/node/cli.js get "1-5831-0000-2061"

# Filter by category
node sdk/node/cli.js category "পাসপোর্ট"
```

### 3. Programmatic Usage (Node.js)
```javascript
const achallan = require('./sdk/node/index');

// Search codes
const results = achallan.searchCodes('পুলিশ ক্লিয়ারেন্স');
console.log(results[0].code_14, results[0].service_name_bn, results[0].fee_display);
// Output: 1-2211-0000-2061 পুলিশ ক্লিয়ারেন্স সার্টিফিকেট ফি ৫০০ টাকা
```

---

## 🐍 Python SDK Usage

```python
from sdk.python.achallan_directory import (
    get_all_codes,
    search_codes,
    get_code_by_number,
    get_summary
)

# Search
results = search_codes("নামজারি")
for item in results[:5]:
    print(item["code_14"], item["service_name_bn"], item["fee_display"])

# Lookup
pcc = get_code_by_number("1-2211-0000-2061")
print(pcc["service_name_bn"], pcc["deposit_guide_bn"])
```

---

## 💡 14-Digit Economic Code Architecture (iBAS++ Explained)

```
       1   -   XXXX   -   XXXX   -   XXXX
     [───]    [──────]   [──────]   [──────]
       │         │          │          │
Receipts/      Ministry/  Operational Object/
Revenue       Department    Circle   Economic Code
(প্রাপ্তি)       (সংস্থা)     (সার্কেল)     (নির্দিষ্ট খাত)
```

- **Digit 1 (`1`)**: Designates Government Receipts (রাজস্ব ও সরকারি প্রাপ্তি).
- **Digits 2–5**: Organization Code (e.g. `5831` = Passport, `3431` = BRTA, `2211` = Police, `4631` = Land).
- **Digits 6–9**: Operational / Regional Office Code (`0000` for Headquarters / National, `0001`–`0064` for Districts).
- **Digits 10–13/14**: Object Code (e.g. `2061` = General Administrative Fees, `2681` = Application Fees, `1101` = Registration/Court Fees).

---

## 🧪 Testing & Validation

Execute automated tests asserting 1,800+ codes, 14-digit formatting, and essential services:
```bash
npm test
```

---

## 📄 License & Attribution

This project is open-source under the **MIT License** - see the [LICENSE](LICENSE) file for details.  
Copyright (c) 2026 **Mohammad Golamrabbii (মোহাম্মদ গোলাম রাব্বী)**.
