#!/usr/bin/env node

const {
  getAllCodes,
  getCodeById,
  getCodeByNumber,
  searchCodes,
  getCodesByCategory,
  getCodesByDistrict,
  getSummary
} = require('./index');

const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase() : 'help';
const param = args.slice(1).join(' ');

console.log('🏛️ Bangladesh Government A-Challan Code Directory CLI');
console.log('   Architect: Mohammad Golamrabbii (https://github.com/mohammadgolamrabbii)\n');

switch (command) {
  case 'summary':
  case 'stats': {
    const summary = getSummary();
    console.log(`Total A-Challan Codes:   ${summary.total_codes}`);
    console.log(`Categories Covered:      ${summary.categories_count}`);
    console.log(`Districts Covered:       ${summary.districts_covered}`);
    console.log(`Online Portal:           ${summary.ibas_portal_url}\n`);
    console.log('Category Distribution:');
    Object.entries(summary.category_distribution || {}).forEach(([cat, count]) => {
      console.log(` - ${cat}: ${count} codes`);
    });
    break;
  }

  case 'search':
  case 'find': {
    if (!param) {
      console.log('Error: Please provide search keywords (e.g. "passport", "নামজারি", "5831", "driving")');
      process.exit(1);
    }
    const results = searchCodes(param);
    console.log(`Found ${results.length} codes matching "${param}":\n`);
    results.slice(0, 15).forEach((item, idx) => {
      console.log(`${idx + 1}. [${item.code_14}] ${item.service_name_bn}`);
      console.log(`   Fee: ${item.fee_display} | District: ${item.district_bn}`);
      console.log(`   Dept: ${item.department_bn} (${item.category})`);
      console.log(`   Guide: ${item.deposit_guide_bn.slice(0, 80)}...`);
      console.log('');
    });
    if (results.length > 15) {
      console.log(`... and ${results.length - 15} more records.`);
    }
    break;
  }

  case 'get':
  case 'code': {
    if (!param) {
      console.log('Error: Please provide a 14-digit code (e.g. "1-5831-0000-2061")');
      process.exit(1);
    }
    const record = getCodeByNumber(param) || getCodeById(param);
    if (!record) {
      console.log(`No record found for code "${param}".`);
    } else {
      console.log(JSON.stringify(record, null, 2));
    }
    break;
  }

  case 'category':
  case 'cat': {
    if (!param) {
      console.log('Error: Please provide category name (e.g. "পাসপোর্ট", "বিআরটিএ", "ভূমি")');
      process.exit(1);
    }
    const results = getCodesByCategory(param);
    console.log(`Found ${results.length} codes in category "${param}":\n`);
    results.slice(0, 10).forEach((item, idx) => {
      console.log(`${idx + 1}. ${item.code_14} - ${item.service_name_bn} (${item.fee_display})`);
    });
    break;
  }

  case 'help':
  default:
    console.log('Usage:');
    console.log('  node cli.js summary              Display dataset statistics');
    console.log('  node cli.js search <keyword>      Search codes by service name, ministry or number');
    console.log('  node cli.js get <14-digit-code>   View complete JSON record of a code');
    console.log('  node cli.js category <name>       Filter codes by category');
    break;
}
