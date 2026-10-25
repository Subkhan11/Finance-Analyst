/* ==========================================================================
   SUBKHAN MAULANA PORTFOLIO - JAVASCRIPT
   Interactive Finance Demos (QBO, Invoices, Xero P&L), Tools Grid, FAQ & Contact
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initToolsGrid();
  initInvoicesDemo();
  initFaqAccordion();
  initScrollWatchers();
  initContactForm();
});

/* ==========================================
   1. THEME TOGGLE & MOBILE NAV
   ========================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const htmlTag = document.documentElement;

  const savedTheme = localStorage.getItem("theme") || "dark";
  htmlTag.setAttribute("data-theme", savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const currentTheme = htmlTag.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      htmlTag.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
}

function initMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-open");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
      });
    });
  }
}

/* ==========================================
   2. TOOLS & SOFTWARE ECOSYSTEM DISPLAY
   ========================================== */
const toolList = [
  { name: "Microsoft Excel", description: "VLOOKUP, Pivot Tables, and financial modeling.", slug: "microsoftexcel" },
  { name: "QuickBooks Online", description: "Bookkeeping, expense tracking, and bank feeds.", slug: "quickbooks" },
  { name: "Xero", description: "Cloud accounting and financial statement reporting.", slug: "xero" },
  { name: "Microsoft Power BI", description: "Interactive dashboards and financial analytics.", slug: "powerbi" },
  { name: "SQL", description: "Database queries and financial data extraction.", slug: "postgresql" },
  { name: "Google Sheets", description: "Spreadsheet reporting and expense tracking.", slug: "googlesheets" },
  { name: "Notion", description: "Financial SOPs and operational knowledge bases.", slug: "notion" },
  { name: "ChatGPT", description: "AI-assisted workflow automation and drafting.", slug: "openai" }
];

function initToolsGrid() {
  const container = document.getElementById("tools-grid");
  if (!container) return;

  container.innerHTML = "";

  toolList.forEach(tool => {
    const tile = document.createElement("div");
    tile.className = "tool-tile surface-card";

    const primaryUrl = `https://cdn.simpleicons.org/${tool.slug}`;
    const fallbackUrl = `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${tool.slug}.svg`;

    tile.innerHTML = `
      <img src="${primaryUrl}" alt="${tool.name} logo" class="tool-logo-img" id="img-${tool.slug}">
      <span class="tool-label">${tool.name}</span>
      <p class="tool-desc">${tool.description}</p>
    `;

    container.appendChild(tile);

    const imgElem = tile.querySelector(`#img-${tool.slug}`);
    let hasTriedFallback = false;

    imgElem.onerror = () => {
      if (!hasTriedFallback) {
        hasTriedFallback = true;
        imgElem.src = fallbackUrl;
      } else {
        const initial = tool.name.charAt(0).toUpperCase();
        imgElem.outerHTML = `<div class="fallback-tile-box">${initial}</div>`;
      }
    };
  });
}

/* ==========================================
   3. PROJECT 1: QUICKBOOKS ONLINE DASHBOARD DEMO
   ========================================== */
function updateQBOData() {
  const period = document.getElementById("qbo-period").value;
  const incomeElem = document.getElementById("qbo-income");
  const expenseElem = document.getElementById("qbo-expense");
  const netElem = document.getElementById("qbo-net");
  const arElem = document.getElementById("qbo-ar");
  const tbody = document.getElementById("qbo-txn-tbody");

  if (!incomeElem) return;

  if (period === "q3") {
    incomeElem.textContent = "$48,250.00";
    expenseElem.textContent = "$28,120.00";
    netElem.textContent = "$20,130.00";
    arElem.textContent = "$4,850.00";
    tbody.innerHTML = `
      <tr><td>2026-09-16</td><td>Keude Kopi Arya (Client Meeting)</td><td>Meals & Entertainment</td><td>$42.50</td><td><span class="ps-badge green">Reconciled</span></td></tr>
      <tr><td>2026-09-14</td><td>AWS Cloud Hosting</td><td>Software & Subscriptions</td><td>$320.00</td><td><span class="ps-badge green">Reconciled</span></td></tr>
      <tr><td>2026-09-10</td><td>Client Payment - Apex Corp</td><td>Sales Income</td><td>$3,450.00</td><td><span class="ps-badge green">Deposited</span></td></tr>
      <tr><td>2026-09-05</td><td>Office Supplies & Stationery</td><td>General Operations</td><td>$115.20</td><td><span class="ps-badge green">Reconciled</span></td></tr>
    `;
  } else if (period === "ytd") {
    incomeElem.textContent = "$142,500.00";
    expenseElem.textContent = "$84,200.00";
    netElem.textContent = "$58,300.00";
    arElem.textContent = "$6,120.00";
    tbody.innerHTML = `
      <tr><td>2026-08-31</td><td>Monthly SaaS Subscription Fees</td><td>Software & Subscriptions</td><td>$1,250.00</td><td><span class="ps-badge green">Reconciled</span></td></tr>
      <tr><td>2026-08-22</td><td>Vendor Payment - Pacific Indopalm</td><td>Inventory & Supplies</td><td>$4,500.00</td><td><span class="ps-badge green">Cleared</span></td></tr>
      <tr><td>2026-08-15</td><td>Client Payment - Zenith Ltd</td><td>Sales Income</td><td>$6,200.00</td><td><span class="ps-badge green">Deposited</span></td></tr>
      <tr><td>2026-08-01</td><td>Office Rent & Utilities</td><td>Facility Expenses</td><td>$1,800.00</td><td><span class="ps-badge green">Reconciled</span></td></tr>
    `;
  } else {
    incomeElem.textContent = "$195,800.00";
    expenseElem.textContent = "$116,400.00";
    netElem.textContent = "$79,400.00";
    arElem.textContent = "$5,400.00";
    tbody.innerHTML = `
      <tr><td>2026-07-15</td><td>Annual Software Licensing</td><td>Software & Subscriptions</td><td>$2,400.00</td><td><span class="ps-badge green">Reconciled</span></td></tr>
      <tr><td>2026-06-30</td><td>Quarterly Tax Provision</td><td>Tax & Compliance</td><td>$8,500.00</td><td><span class="ps-badge green">Reconciled</span></td></tr>
      <tr><td>2026-06-15</td><td>Consulting Services - Nova Inc</td><td>Professional Fees</td><td>$4,100.00</td><td><span class="ps-badge green">Deposited</span></td></tr>
      <tr><td>2026-06-01</td><td>Marketing Campaign Q2</td><td>Advertising</td><td>$1,500.00</td><td><span class="ps-badge green">Reconciled</span></td></tr>
    `;
  }
}

/* ==========================================
   4. PROJECT 2: INVOICE MANAGEMENT & TRACKING
   ========================================== */
const sampleInvoices = [
  { id: "INV-2026-001", customer: "Apex Corp", date: "2026-09-01", due: "2026-09-15", amount: "$3,450.00", rawVal: 3450, status: "Paid", items: "Consulting & Financial Data Organization (Q3 Support) - Subtotal: $3,150, Tax (10%): $300. Status: Fully Settled." },
  { id: "INV-2026-002", customer: "Zenith Ltd", date: "2026-09-05", due: "2026-09-20", amount: "$4,850.00", rawVal: 4850, status: "Pending", items: "Invoice & Expense Reconciliation Support (Monthly Retainer) - Subtotal: $4,409, Tax (10%): $441. Status: Awaiting payment due Sept 20." },
  { id: "INV-2026-003", customer: "Delta Logistics", date: "2026-08-10", due: "2026-08-25", amount: "$1,200.00", rawVal: 1200, status: "Overdue", items: "Operational Report Verification & Audit - Subtotal: $1,090, Tax (10%): $110. Status: Overdue by 30 days. Reminder notice sent." },
  { id: "INV-2026-004", customer: "Nova Enterprises", date: "2026-09-12", due: "2026-09-28", amount: "$5,000.00", rawVal: 5000, status: "Paid", items: "P&L Reporting & Spreadsheet Setup - Subtotal: $4,545, Tax (10%): $455. Status: Fully Paid via Bank Transfer." }
];

let currentFilter = "all";

function initInvoicesDemo() {
  renderInvoices(sampleInvoices);
}

function renderInvoices(invoices) {
  const tbody = document.getElementById("invoice-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (invoices.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">No invoices found matching criteria.</td></tr>`;
    return;
  }

  invoices.forEach(inv => {
    const tr = document.createElement("tr");
    let badgeClass = "green";
    if (inv.status === "Pending") badgeClass = "yellow";
    if (inv.status === "Overdue") badgeClass = "red";

    tr.innerHTML = `
      <td><strong>${inv.id}</strong></td>
      <td>${inv.customer}</td>
      <td>${inv.due}</td>
      <td>${inv.amount}</td>
      <td><span class="ps-badge ${badgeClass}">${inv.status}</span></td>
      <td><button class="btn btn-sm btn-secondary" onclick="previewInvoice('${inv.id}')">View</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function filterInvoices() {
  const query = document.getElementById("inv-search").value.toLowerCase();
  const filtered = sampleInvoices.filter(inv => {
    const matchesSearch = inv.id.toLowerCase().includes(query) || inv.customer.toLowerCase().includes(query);
    const matchesStatus = currentFilter === "all" || inv.status === currentFilter;
    return matchesSearch && matchesStatus;
  });
  renderInvoices(filtered);
}

function setInvFilter(status, event) {
  currentFilter = status;
  document.querySelectorAll(".inv-filter-buttons .btn").forEach(btn => btn.classList.remove("active"));
  if (event && event.target) event.target.classList.add("active");
  filterInvoices();
}

function previewInvoice(id) {
  const inv = sampleInvoices.find(i => i.id === id);
  const panel = document.getElementById("invoice-preview-box");
  const prevId = document.getElementById("prev-id");
  const prevDetails = document.getElementById("prev-details");

  if (!inv || !panel) return;

  panel.classList.add("active");
  prevId.textContent = inv.id;
  prevDetails.innerHTML = `
    <p><strong>Customer:</strong> ${inv.customer}</p>
    <p><strong>Issue Date:</strong> ${inv.date} | <strong>Due Date:</strong> ${inv.due}</p>
    <p><strong>Total Amount:</strong> ${inv.amount} (${inv.status})</p>
    <hr style="margin: 0.5rem 0; border-color: #CBD5E1;">
    <p><strong>Itemized Breakdown:</strong> ${inv.items}</p>
  `;
}

function closeInvoicePreview() {
  const panel = document.getElementById("invoice-preview-box");
  if (panel) panel.classList.remove("active");
}

/* ==========================================
   5. PROJECT 3: PROFIT & LOSS REPORT + XERO DASHBOARD
   ========================================== */
function updateXeroPL() {
  const period = document.getElementById("xero-period-sel").value;
  const revElem = document.getElementById("pl-rev");
  const gpElem = document.getElementById("pl-gp");
  const opexElem = document.getElementById("pl-opex");
  const netElem = document.getElementById("pl-net");
  const r1 = document.getElementById("pl-r1");
  const r2 = document.getElementById("pl-r2");
  const r3 = document.getElementById("pl-r3");
  const r4 = document.getElementById("pl-r4");
  const r5 = document.getElementById("pl-r5");
  const analysisText = document.getElementById("pl-analysis-text");

  if (!revElem) return;

  if (period === "sep2026") {
    revElem.textContent = "$18,450.00";
    gpElem.textContent = "$13,200.00";
    opexElem.textContent = "$8,450.00";
    netElem.textContent = "$4,750.00";
    r1.textContent = "$18,450.00";
    r2.textContent = "$5,250.00";
    r3.textContent = "$13,200.00";
    r4.textContent = "$8,450.00";
    r5.textContent = "$4,750.00";
    analysisText.textContent = "Net profit increased by 26.67% compared to the prior period, driven by strong top-line revenue growth in marketplace sales while operating expenses remained strictly disciplined.";
  } else if (period === "aug2026") {
    revElem.textContent = "$16,900.00";
    gpElem.textContent = "$12,100.00";
    opexElem.textContent = "$8,350.00";
    netElem.textContent = "$3,750.00";
    r1.textContent = "$16,900.00";
    r2.textContent = "$4,800.00";
    r3.textContent = "$12,100.00";
    r4.textContent = "$8,350.00";
    r5.textContent = "$3,750.00";
    analysisText.textContent = "August performance reflects stable operating margins with controlled overhead expenses and steady receivables collection.";
  } else {
    revElem.textContent = "$154,200.00";
    gpElem.textContent = "$109,500.00";
    opexElem.textContent = "$74,200.00";
    netElem.textContent = "$35,300.00";
    r1.textContent = "$154,200.00";
    r2.textContent = "$44,700.00";
    r3.textContent = "$109,500.00";
    r4.textContent = "$74,200.00";
    r5.textContent = "$35,300.00";
    analysisText.textContent = "Year-to-date figures show robust financial health with an aggregate net profit margin of 22.89%, fully reconciled across all monthly ledger records.";
  }
}

/* ==========================================
   6. ACCORDION & SCROLL OBSERVERS
   ========================================== */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-question");
    if (q) {
      q.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    }
  });
}

function initScrollWatchers() {
  const floatingHome = document.getElementById("floating-home");
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (floatingHome) {
      if (window.scrollY > 400) floatingHome.classList.add("visible");
      else floatingHome.classList.remove("visible");
    }

    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

/* ==========================================
   7. CONTACT FORM & MAILTO ACTION
   ========================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const service = document.getElementById("service-needed").value;
    const message = document.getElementById("contact-message").value;

    const subject = encodeURIComponent(`Finance Inquiry: ${service} - ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`);

    window.location.href = `mailto:sangsubkhan@gmail.com?subject=${subject}&body=${body}`;

    const feedback = document.getElementById("form-feedback");
    if (feedback) {
      feedback.className = "form-feedback success";
      feedback.textContent = "Opening your default email client to send inquiry...";
    }
  });
}