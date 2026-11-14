const fs = require('fs');
const path = require('path');

const CODES_PATH = path.join(__dirname, '..', '..', 'data', 'json', 'achallan_codes.json');
const SUMMARY_PATH = path.join(__dirname, '..', '..', 'data', 'json', 'summary.json');

let _codes = null;
let _summary = null;

function loadCodes() {
  if (!_codes) {
    _codes = JSON.parse(fs.readFileSync(CODES_PATH, 'utf-8'));
  }
  return _codes;
}

function loadSummary() {
  if (!_summary) {
    _summary = JSON.parse(fs.readFileSync(SUMMARY_PATH, 'utf-8'));
  }
  return _summary;
}

function getAllCodes() {
  return loadCodes();
}

function getCodeById(id) {
  const codes = loadCodes();
  return codes.find(c => c.id.toLowerCase() === id.toLowerCase()) || null;
}

function getCodeByNumber(codeString) {
  const clean = codeString.replace(/-/g, '').trim();
  const codes = loadCodes();
  return codes.find(c => c.code_raw === clean || c.code_14 === codeString.trim()) || null;
}

function searchCodes(query) {
  if (!query) return loadCodes();
  const q = query.trim().toLowerCase();
  const qRaw = q.replace(/-/g, '');
  const codes = loadCodes();

  return codes.filter(c =>
    (c.service_name_bn && c.service_name_bn.toLowerCase().includes(q)) ||
    (c.service_name_en && c.service_name_en.toLowerCase().includes(q)) ||
    (c.code_14 && c.code_14.toLowerCase().includes(q)) ||
    (c.code_raw && c.code_raw.includes(qRaw)) ||
    (c.department_bn && c.department_bn.toLowerCase().includes(q)) ||
    (c.ministry_bn && c.ministry_bn.toLowerCase().includes(q)) ||
    (c.category && c.category.toLowerCase().includes(q)) ||
    (c.district_bn && c.district_bn.toLowerCase().includes(q))
  );
}

function getCodesByCategory(category) {
  const q = category.trim().toLowerCase();
  const codes = loadCodes();
  return codes.filter(c => c.category && c.category.toLowerCase().includes(q));
}

function getCodesByDistrict(district) {
  const q = district.trim().toLowerCase();
  const codes = loadCodes();
  return codes.filter(c => (c.district_bn && c.district_bn.toLowerCase().includes(q)) || c.district_bn === "জাতীয় (সকল জেলা)");
}

function getSummary() {
  return loadSummary();
}

module.exports = {
  getAllCodes,
  getCodeById,
  getCodeByNumber,
  searchCodes,
  getCodesByCategory,
  getCodesByDistrict,
  getSummary
};
