# E-Tibet Identity & Citizenship App 🚀

## Overview

The **E-Tibet Identity & Citizenship App** is a decentralized digital identity and reputation system for Tibetans worldwide. It enables users to securely prove personhood, access verifiable credentials, and build social credibility through blockchain-based attestations.

## Team Members

Kiran Sukumaran - [GitHub](https://github.com/Kiransukumaran), [LinkedIn](https://linkedin.com/in/kiran-sukumaran)
Vinod Kongadi - [LinkedIn](https://www.linkedin.com/in/vinodkongadi)
Yash V - [LinkedIn](https://www.linkedin.com/in/yash-v-/)

## Pictch Dock

[Pitch](https://gamma.app/docs/E-Tibet-Ver-11-gc3n91y8ny05ol5)

## Features

### 1️⃣ Decentralized Digital Identity (DID) & Passport

- Users create **Self-Sovereign Identity (SSI)** stored on a decentralized ledger.
- Generates a **Tibetan Digital Passport** for stateless individuals.
- Issues **verifiable credentials** (ID, education, skills).
- **Biometric authentication** (Face & Fingerprint) for enhanced security.

### 2️⃣ Proof-of-Personhood (PoP) & Reputation System

- Identity verification through:
  - **AI-powered facial recognition** & government-issued documents.
  - **Web3-based proof** (Soulbound Tokens & zkProofs).
- Users **earn reputation points** for verified contributions (e.g., community work, activism).
- Reputation score unlocks **scholarships, job opportunities, and aid**.

### 3️⃣ Secure Identity Verification & Document Storage

- AI-powered **OCR scanning** for document verification.
- Secure credential storage using **IPFS/Filecoin**.
- Identity protection using **Zero-Knowledge Proofs (zkProofs)**.

### 4️⃣ Smart Contract-Based Trust System

- Ethereum/Solana-based **smart contracts** validate user actions.
- Organizations (NGOs, Schools, Employers) issue **verifiable attestations**.
- **Web3 dApp integration** allows users to prove identity & credibility.

---

## Tech Stack

### **Frontend**

- **EJS** (for templating pages)

### **Backend**

- **Express.js** (REST API for identity management)
- **Firebase Auth** (User authentication)
- **Supabase** (Alternative backend storage)

### **Blockchain & Identity Storage**

- **Polygon ID** (for issuing DIDs)
- **Ethereum/Solana** (for smart contracts & verifiable credentials)
- **IPFS/Filecoin** (for decentralized document storage)

### **AI/ML**

- **Facial Recognition** (for biometric identity verification)
- **OCR (Optical Character Recognition)** (for document verification)

### **Smart Contracts**

- **Solidity/Rust** (for trust-based reputation system & verifiable credentials)

---

## Use Case Examples

### **1️⃣ User Onboarding**

- Registers using **biometrics & ID scan**.
- A **DID (Decentralized Identity)** is created.

### **2️⃣ Digital Passport & Credentials**

- Refugees receive a **verifiable Tibetan digital passport**.
- Schools issue **education certificates as NFTs/SBTs**.

### **3️⃣ Reputation & Proof-of-Personhood**

- Users earn **reputation points** for verified contributions (volunteering, activism, skills).
- Reputation unlocks **jobs, funding, and legal support**.

### **4️⃣ Secure Document Verification**

- NGOs and embassies **instantly verify identities**.
- Users control **who accesses their credentials** (Privacy-first approach).

---

## Deployment Guide

### **1️⃣ Setup the Project**

```sh
git clone https://github.com/your-repo/e-tibet-identity.git
cd e-tibet-identity
npm install
```

### **2️⃣ Configure Environment Variables**

Create a `.env` file and add:

```sh
INFURA_API_KEY=your_infura_key
PRIVATE_KEY=your_metamask_private_key
FIREBASE_CONFIG=your_firebase_config
```

### **3️⃣ Deploy Smart Contracts on Polygon Mumbai**

```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
```

### **4️⃣ Start Backend Server**

```sh
node server.js
```

### **5️⃣ Run Frontend**

```sh
npm run dev
```

---

## Why This is a Game-Changer? 🚀

✅ **Solves identity & statelessness issues for Tibetans.**  
✅ **Provides trust & reputation in a Web3-native way.**  
✅ **Uses decentralized storage & AI for security & privacy.**  
✅ **Enables the Tibetan diaspora to prove credentials globally.**

---

## Contribution

Want to contribute? Follow our [Contribution Guide](CONTRIBUTING.md)!

## Author

[@kiransukumaran](https://github.com/Kiransukumaran)

---

## License

This project is **open-source** under the **MIT License**.

---

## Contact

📧 Email: **contact@etibet.io**  
🌍 Website: **[www.etibet.io](https://www.etibet.io)**
