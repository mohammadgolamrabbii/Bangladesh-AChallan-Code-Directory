const assert = require('assert');
const fs = require('fs');
const path = require('path');
const sdk = require('../sdk/node/index');

console.log('🧪 Starting Bangladesh A-Challan Code Directory Test Suite...\n');

// Test 1: Load all codes via SDK
const codes = sdk.getAllCodes();
console.log(`✓ Loaded ${codes.length} A-Challan records from dataset`);
assert(codes.length >= 1500, `Expected at least 1500 codes, found ${codes.length}`);

// Test 2: Check code format and structure (13/14 digits iBAS++ standard)
codes.forEach((c, idx) => {
  assert(c.code_14, `Record ${idx} missing code_14`);
  assert(c.code_raw, `Record ${idx} missing code_raw`);
  assert(c.code_raw.length >= 13 && c.code_raw.length <= 14, `Record ${idx} (${c.code_14}) code_raw must be 13 or 14 digits`);
  assert(c.code_raw.startsWith('1'), `Record ${idx} (${c.code_14}) must start with 1 (Receipt code)`);
  assert(c.service_name_bn, `Record ${idx} missing service_name_bn`);
  assert(c.category, `Record ${idx} missing category`);
  assert(c.deposit_guide_bn, `Record ${idx} missing deposit_guide_bn`);
});
console.log(`✓ All ${codes.length} records verified for exact economic code structure`);

// Test 3: Essential Civic Services Check
const essentialChecks = [
  { name: 'Passport', query: 'পাসপোর্ট', expectedCode: '1-5831-0000-2061' },
  { name: 'Driving License', query: 'ড্রাইভিং লাইসেন্স', expectedCode: '1-3431-0000-2681' },
  { name: 'e-Namjari', query: 'ই-নামজারি', expectedCode: '1-4631-0000-2061' },
  { name: 'Police Clearance', query: 'পুলিশ ক্লিয়ারেন্স', expectedCode: '1-2211-0000-2061' },
  { name: 'VAT', query: 'ভ্যাট', expectedCode: '1-1141-0000-0311' }
];

essentialChecks.forEach(check => {
  const found = sdk.searchCodes(check.query);
  assert(found.length > 0, `Essential service "${check.name}" not found with query "${check.query}"`);
  const hasExpected = found.some(c => c.code_14 === check.expectedCode);
  assert(hasExpected, `Service "${check.name}" must contain code ${check.expectedCode}`);
  console.log(`✓ Verified essential service: ${check.name} -> ${check.expectedCode}`);
});

// Test 4: Code lookup by number string
const passportLookup = sdk.getCodeByNumber('1-5831-0000-2061');
assert(passportLookup !== null, 'Passport code lookup must not be null');
assert.strictEqual(passportLookup.category, 'পাসপোর্ট ও ইমিগ্রেশন');
console.log(`✓ Verified direct code lookup by number`);

// Test 5: Summary alignment
const summary = sdk.getSummary();
assert.strictEqual(summary.total_codes, codes.length, 'Summary count must match codes length');
assert(summary.categories_count >= 10, 'Expected at least 10 categories');
console.log(`✓ Summary verified: ${summary.total_codes} codes across ${summary.categories_count} categories`);

// Test 6: District coverage check
const districtsCovered = new Set(codes.map(c => c.district_bn).filter(Boolean));
console.log(`✓ District coverage verified: ${districtsCovered.size} distinct district entries`);
assert(districtsCovered.size >= 64, 'All 64 districts must be covered');

console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! 100% Quality Assured.\n');
