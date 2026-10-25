# TryLocal — Startup Website for SPIT Mumbai Academic Practical

> **Tagline:** *Your Favourite Fits, Tried at Home.*  
> **Industry:** Hyperlocal Fashion E-commerce & Home-Trial Logistics  
> **Institutional Context:** Sardar Patel Institute of Technology (SPIT), Mumbai • MCA Course  
> **Subject:** Entrepreneurship, Innovation and Patent Research (EIPR)  
> **Experiments Covered:** Experiment 8 (Business Plan) & Experiment 5 (IPR Creation)  

---

## 👥 Founding Team & Key Contributors

| Sr. No. | Founder Name | Role | UCID / Roll No. | Contact Email | Helpline Phone |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | **Meet Gangwal** | CEO — Business Strategy &amp; Partnerships | `2025510018` | `meet.gangwal25@spit.ac.in` | +91 9326678457 |
| **2** | **Nupur Thakur** | CPO — Product Strategy &amp; UX Architecture | `2025510066` | `nupur.thakur25@spit.ac.in` | +91 8340602621 |
| **3** | **Aryan Dandekar** | CTO — Technology &amp; Platform | `2025510014` | `aryan.dandekar25@spit.ac.in` | +91 8390666246 |
| **4** | **Sujal Meshram** | COO — Operations &amp; Retailer Coordination | `2025510040` | `sujal.meshram25@spit.ac.in` | +91 9657652441 |

**Registered Project Address:** Grace Pinnacle, 1105, Andheri West, Mumbai, Maharashtra 400058

---

## 📁 Website Architecture & File Structure

This repository is built with clean, modern HTML5, CSS3, and JavaScript, specifically optimized for **GitHub Pages** hosting without requiring build tools or Node.js runtimes:

```
trylocal-website/
├── index.html            # Main Landing & About Us Page (Hero, Vision/Mission, 10-step Workflow, Team, Interactive Simulator)
├── profile.html          # Official Startup Profile Sheet (Executive Summary, Abstract, SWOT, Financials, IPR details)
├── brochure.html         # 2-Page Promotional Brochure Showcase & PDF Embed Viewer
├── video.html            # Promotional Pitch Video Demo Player & Script Breakdown
├── contact.html          # Retailer Onboarding, Customer Waitlist & Team Coordinates
├── css/
│   └── style.css         # Modern, mobile-responsive CSS with Design System tokens, animations & print stylesheet
├── js/
│   └── main.js           # Interactive controller: 10-step stepper, trial cart simulator, brochure switcher, video controller
├── assets/
│   ├── logo.svg          # Official TryLocal Brand Logo
│   ├── trylocal_hero.jpg # Editorial Hero Lifestyle Visual (In-Home Mirror Trial)
│   ├── trylocal_delivery.jpg # Doorstep Eco-Bag Delivery Visual
│   ├── architecture-diagram.svg # Patent Specification Architecture (Modules 101–114)
│   ├── avatar-aryan.svg  # Stylized Avatar for Aryan Dandekar (CTO)
│   ├── avatar-meet.svg   # Stylized Avatar for Meet Gangwal (CEO)
│   ├── avatar-sujal.svg  # Stylized Avatar for Sujal Meshram (COO)
│   └── avatar-nupur.svg  # Stylized Avatar for Nupur Thakur (Mktg/Fin)
└── README.md             # Documentation, Setup and Hosting Guide
```

---

## 🚀 How to Host on GitHub Pages (Step-by-Step)

Follow these quick steps to host this website live at `https://elenal0.github.io/TryLocal/`:

### Step 1: Push Code to Repository
In your terminal, navigate to the `trylocal-website` folder and run:
```bash
git add .
git commit -m "TryLocal: Complete startup website for SPIT Mumbai MCA"
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository [Settings](https://github.com/Elenal0/TryLocal/settings) tab on GitHub.
2. Scroll to the **Pages** section on the left sidebar.
3. Under **Branch**, select `main` and root directory `/`, then click **Save**.
4. In about 60 seconds, your site will be live at:
   `https://elenal0.github.io/TryLocal/`

---

## 🎬 How to Embed Your Promotional Pitch Video

In `video.html`, a placeholder video container is already configured for Google Drive and YouTube embeds.

### Using Google Drive:
1. Upload your video to Google Drive.
2. Right-click the video file → Click **Share** → Set access to **"Anyone with the link can view"**.
3. Copy the file URL (e.g., `https://drive.google.com/file/d/1A2B3C4D5E.../view?usp=sharing`).
4. Replace `/view...` with `/preview`.
5. Open `video.html` in an editor and update the `iframe` src or paste the link into the interactive input bar directly on the page!

---

## 📑 How to Link Your 2-Page Promotional Brochure PDF

You have two easy ways to attach your PDF:
1. **Local File:** Place your exported brochure PDF inside the `assets/` folder as `assets/TryLocal-Brochure.pdf`.
2. **Google Drive Link:** In `brochure.html`, paste your Google Drive preview URL in the PDF Embed container.
3. **Browser Direct Print:** Visitors can also simply click the **"Print / Save PDF"** button on `brochure.html` or `profile.html` to generate an official printout with custom `@media print` styling!

---

## 💡 Key Concept Highlights

1. **Hyperlocal Discovery:** Matching shoppers with nearby clothing retailers within 3–5 km in Mumbai.
2. **Zero-Fit Uncertainty:** Trying 3 to 5 outfits at home in front of a personal mirror before paying.
3. **Instant Spot Returns:** Delivery runner collects rejected garments on the spot in 15–20 minutes.
4. **Fee Waiver Rule:** A nominal ₹200 trial fee is completely waived if the customer keeps at least one clothing item.
