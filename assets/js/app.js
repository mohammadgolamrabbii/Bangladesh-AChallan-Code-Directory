// Bangladesh A-Challan Code Directory Application Logic
// Architect: Mohammad Golamrabbii (মোহাম্মদ গোলাম রাব্বী)

(function () {
  'use strict';

  let allCodes = window.ACHALLAN_DATA || [];
  let summary = window.ACHALLAN_SUMMARY || {};
  let filteredCodes = [...allCodes];
  let currentPage = 1;
  const itemsPerPage = 24;

  // DOM Elements
  const searchInput = document.getElementById('mainSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryFilter = document.getElementById('categoryFilter');
  const districtFilter = document.getElementById('districtFilter');
  const sortFilter = document.getElementById('sortFilter');
  const codesGrid = document.getElementById('codesGrid');
  const resultsCount = document.getElementById('resultsCount');
  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  const pageInfo = document.getElementById('pageInfo');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const toast = document.getElementById('toast');

  // Initialize
  function init() {
    setupTheme();
    setupStats();
    populateFilters();
    bindEvents();
    renderPage();
    setupCalculators();
  }

  function setupStats() {
    const totalEl = document.getElementById('statTotalCodes');
    const catEl = document.getElementById('statCategories');
    if (totalEl && summary.total_codes) {
      totalEl.textContent = summary.total_codes.toLocaleString('bn-BD') + '+';
    }
    if (catEl && summary.categories_count) {
      catEl.textContent = summary.categories_count.toLocaleString('bn-BD') + 'টি';
    }
  }

  function populateFilters() {
    if (!categoryFilter || !districtFilter) return;

    // Categories
    const categories = Object.keys(summary.category_distribution || {}).sort();
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `${cat} (${summary.category_distribution[cat]})`;
      categoryFilter.appendChild(opt);
    });

    // Districts
    const districtSet = new Set();
    allCodes.forEach(c => {
      if (c.district_bn) districtSet.add(c.district_bn);
    });
    Array.from(districtSet).sort().forEach(dist => {
      if (dist === "জাতীয় (সকল জেলা)") return;
      const opt = document.createElement('option');
      opt.value = dist;
      opt.textContent = dist;
      districtFilter.appendChild(opt);
    });
  }

  function bindEvents() {
    // Search with debounce
    let timeout = null;
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          applyFilters();
        }, 120);
        if (clearSearchBtn) clearSearchBtn.style.display = this.value ? 'block' : 'none';
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function () {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        this.style.display = 'none';
        applyFilters();
      });
    }

    // Quick chips
    document.querySelectorAll('.quick-chip').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const query = this.getAttribute('data-search');
        if (searchInput) {
          searchInput.value = query;
          if (clearSearchBtn) clearSearchBtn.style.display = 'block';
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        applyFilters();
        const matrixSection = document.getElementById('matrixSection');
        if (matrixSection) matrixSection.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // Dropdowns
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (districtFilter) districtFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);

    // Pagination
    if (prevPageBtn) {
      prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          currentPage--;
          renderPage();
          const matrixSection = document.getElementById('matrixSection');
          if (matrixSection) matrixSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    if (nextPageBtn) {
      nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredCodes.length / itemsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          renderPage();
          const matrixSection = document.getElementById('matrixSection');
          if (matrixSection) matrixSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Theme toggle
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    const altThemeBtn = document.getElementById('themeToggle');
    if (altThemeBtn) altThemeBtn.addEventListener('click', toggleTheme);
  }

  function applyFilters() {
    const rawVal = searchInput ? (searchInput.value || '') : '';
    const query = rawVal.trim().toLowerCase();
    const queryRaw = query.replace(/-/g, '');
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedDistrict = districtFilter ? districtFilter.value : 'all';
    const sortBy = sortFilter ? sortFilter.value : 'relevance';

    filteredCodes = allCodes.filter(item => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // District check
      if (selectedDistrict !== 'all') {
        if (item.district_bn !== selectedDistrict && item.district_bn !== "জাতীয় (সকল জেলা)") {
          return false;
        }
      }

      // Search query check
      if (query) {
        const matchNameBn = item.service_name_bn && item.service_name_bn.toLowerCase().includes(query);
        const matchNameEn = item.service_name_en && item.service_name_en.toLowerCase().includes(query);
        const matchCode14 = item.code_14 && item.code_14.toLowerCase().includes(query);
        const matchCodeRaw = item.code_raw && item.code_raw.includes(queryRaw);
        const matchDept = item.department_bn && item.department_bn.toLowerCase().includes(query);
        const matchMin = item.ministry_bn && item.ministry_bn.toLowerCase().includes(query);
        const matchCat = item.category && item.category.toLowerCase().includes(query);

        if (!matchNameBn && !matchNameEn && !matchCode14 && !matchCodeRaw && !matchDept && !matchMin && !matchCat) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'fee_asc') {
      filteredCodes.sort((a, b) => (a.fee_bdt || 0) - (b.fee_bdt || 0));
    } else if (sortBy === 'fee_desc') {
      filteredCodes.sort((a, b) => (b.fee_bdt || 0) - (a.fee_bdt || 0));
    } else if (sortBy === 'name_bn') {
      filteredCodes.sort((a, b) => (a.service_name_bn || '').localeCompare(b.service_name_bn || '', 'bn'));
    }

    currentPage = 1;
    renderPage();
  }

  function renderPage() {
    const total = filteredCodes.length;
    if (resultsCount) resultsCount.textContent = total.toLocaleString('bn-BD');

    const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
    if (pageInfo) pageInfo.textContent = `পৃষ্ঠা ${currentPage.toLocaleString('bn-BD')} / ${totalPages.toLocaleString('bn-BD')}`;

    if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
    if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;

    const startIdx = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredCodes.slice(startIdx, startIdx + itemsPerPage);

    if (!codesGrid) return;

    if (pageItems.length === 0) {
      codesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 14px;"></i>
          <h3 style="font-size: 1.2rem; margin-bottom: 6px;">কোনো এ-চালান কোড পাওয়া যায়নি</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem;">অনুগ্রহ করে অন্য কোনো শব্দ, কোড নম্বর বা জেলা দিয়ে পুনরায় অনুসন্ধান করুন।</p>
        </div>
      `;
      return;
    }

    codesGrid.innerHTML = pageItems.map(item => `
      <div class="code-card">
        <div>
          <div class="card-top">
            <span class="category-tag">${item.category}</span>
            <span class="district-badge"><i class="fa-solid fa-location-dot"></i> ${item.district_bn}</span>
          </div>

          <div class="card-code-banner">
            <div class="code-digits">${item.code_14}</div>
            <button class="btn btn-sm btn-copy" onclick="copyChallanCode('${item.code_14}')">
              <i class="fa-solid fa-copy"></i> কপি
            </button>
          </div>

          <h3 class="card-service-name">${item.service_name_bn}</h3>
          <div class="card-dept">
            <i class="fa-solid fa-building"></i> ${item.department_bn}
          </div>

          <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; background: var(--bg-primary); padding: 8px 12px; border-radius: var(--radius-sm);">
            <strong><i class="fa-solid fa-circle-info"></i> নির্দেশিকা:</strong> ${item.deposit_guide_bn}
          </div>
        </div>

        <div class="card-fee-row">
          <div>
            <div class="fee-badge">${item.fee_display}</div>
            <div class="vat-text">${item.vat_info}</div>
          </div>
          <button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.75rem;" onclick="showCodeBreakdown('${item.code_14}', '${escapeHtml(item.service_name_bn)}')">
            <i class="fa-solid fa-sitemap"></i> কোড বিন্যাস
          </button>
        </div>
      </div>
    `).join('');
  }

  // Toast & Copy Functions
  window.copyChallanCode = function (text) {
    let copied = false;
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      copied = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) {}

    if (!copied && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    showToast(`কোড কপি করা হয়েছে: ${text}`);
  };

  window.copyText = window.copyChallanCode;

  let toastTimer = null;
  function showToast(msg) {
    const toastEl = document.getElementById('toast');
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  function escapeHtml(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  window.showCodeBreakdown = function (code14, title) {
    const parts = code14.split('-');
    const r = parts[0] || '1';
    const org = parts[1] || '0000';
    const op = parts[2] || '0000';
    const obj = parts[3] || '0000';

    alert(`১৪ ডিজিট এ-চালান অর্থনৈতিক কোড বিন্যাস:\n\nসেবা: ${title}\nকোড: ${code14}\n\n[১] রাজস্ব প্রাপ্তি নির্দেশক: ${r}\n[২] মন্ত্রণালয়/দপ্তর কোড: ${org}\n[৩] পরিচালন ইউনিট/সার্কেল: ${op}\n[৪] অর্থনৈতিক অবজেক্ট কোড: ${obj}\n\niBAS++ এ এই কোড নির্বাচন করে চালান জমা দিন।`);
  };

  // Calculators
  function setupCalculators() {
    // Tab switching with explicit inline styles to guarantee instant rendering
    const tabBtns = document.querySelectorAll('.calc-tab-btn');
    const tabContents = document.querySelectorAll('.calc-tab-content');

    // Ensure default state: passportTab active, others hidden
    tabContents.forEach(c => {
      if (c.id === 'passportTab') {
        c.classList.add('active');
        c.style.display = 'block';
      } else {
        c.classList.remove('active');
        c.style.display = 'none';
      }
    });

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => {
          c.classList.remove('active');
          c.style.display = 'none';
        });

        this.classList.add('active');
        const activeContent = document.getElementById(targetId);
        if (activeContent) {
          activeContent.classList.add('active');
          activeContent.style.display = 'block';
        }
      });
    });

    // Passport Calculator
    const passPages = document.getElementById('passPages');
    const passValidity = document.getElementById('passValidity');
    const passDelivery = document.getElementById('passDelivery');
    const passportTotalFee = document.getElementById('passportTotalFee');

    function calcPassport() {
      if (!passPages || !passValidity || !passDelivery || !passportTotalFee) return;
      const pages = passPages.value;
      const val = passValidity.value;
      const del = passDelivery.value;

      let fee = 4025;
      if (pages === '48' && val === '5') {
        if (del === 'regular') fee = 4025;
        else if (del === 'express') fee = 6325;
        else if (del === 'super') fee = 8625;
      } else if (pages === '48' && val === '10') {
        if (del === 'regular') fee = 5750;
        else if (del === 'express') fee = 8050;
        else if (del === 'super') fee = 10350;
      } else if (pages === '64' && val === '5') {
        if (del === 'regular') fee = 6325;
        else if (del === 'express') fee = 8625;
        else if (del === 'super') fee = 12075;
      } else if (pages === '64' && val === '10') {
        if (del === 'regular') fee = 8050;
        else if (del === 'express') fee = 10350;
        else if (del === 'super') fee = 13800;
      }

      passportTotalFee.textContent = fee.toLocaleString('bn-BD') + ' টাকা';
    }

    if (passPages) passPages.addEventListener('change', calcPassport);
    if (passValidity) passValidity.addEventListener('change', calcPassport);
    if (passDelivery) passDelivery.addEventListener('change', calcPassport);

    // BRTA Calculator
    const brtaType = document.getElementById('brtaType');
    const brtaTotalFee = document.getElementById('brtaTotalFee');
    const brtaChallanCode = document.getElementById('brtaChallanCode');
    const brtaCopyBtn = document.getElementById('brtaCopyBtn');

    function calcBRTA() {
      if (!brtaType || !brtaTotalFee || !brtaChallanCode) return;
      const type = brtaType.value;
      let fee = 748;
      let code = "1-3431-0000-2681";

      if (type === 'learner_single') {
        fee = 748;
        code = "1-3431-0000-2681";
      } else if (type === 'learner_dual') {
        fee = 1150;
        code = "1-3431-0000-2681";
      } else if (type === 'smart_pro') {
        fee = 2542;
        code = "1-3431-0000-2681";
      } else if (type === 'smart_nonpro') {
        fee = 4479;
        code = "1-3431-0000-2681";
      }

      brtaTotalFee.textContent = fee.toLocaleString('bn-BD') + ' টাকা';
      brtaChallanCode.textContent = code;
      if (brtaCopyBtn) {
        brtaCopyBtn.onclick = () => window.copyChallanCode(code);
      }
    }

    if (brtaType) {
      brtaType.addEventListener('change', calcBRTA);
      calcBRTA();
    }
  }

  // Theme Management
  function setupTheme() {
    const savedTheme = localStorage.getItem('achallan_theme') || 'light';
    applyTheme(savedTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('achallan_theme', next);
    applyTheme(next);
  }

  function updateThemeIcon(theme) {
    const icons = document.querySelectorAll('#themeToggleBtn i, #themeToggle i');
    icons.forEach(icon => {
      icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });
  }

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
