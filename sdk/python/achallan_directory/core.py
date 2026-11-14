import json
from pathlib import Path
from typing import List, Dict, Any, Optional

DATA_DIR = Path(__file__).resolve().parent.parent.parent / "data" / "json"

def _load_json(filename: str) -> Any:
    file_path = DATA_DIR / filename
    if not file_path.exists():
        fallback = Path(__file__).resolve().parent / "data" / filename
        if fallback.exists():
            file_path = fallback
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)

def get_all_codes() -> List[Dict[str, Any]]:
    """Return all 1,825+ documented A-Challan codes."""
    return _load_json("achallan_codes.json")

def get_code_by_id(code_id: str) -> Optional[Dict[str, Any]]:
    """Find a record by ID, e.g. 'AC-1001'."""
    codes = get_all_codes()
    for c in codes:
        if c.get("id", "").lower() == code_id.lower():
            return c
    return None

def get_code_by_number(code_str: str) -> Optional[Dict[str, Any]]:
    """Find a record by 14-digit code (with or without hyphens)."""
    clean = code_str.replace("-", "").strip()
    codes = get_all_codes()
    for c in codes:
        if c.get("code_raw") == clean or c.get("code_14") == code_str.strip():
            return c
    return None

def search_codes(query: str) -> List[Dict[str, Any]]:
    """Search A-Challan codes across service names, codes, ministry, or department."""
    if not query:
        return get_all_codes()
    q = query.strip().lower()
    q_raw = q.replace("-", "")
    codes = get_all_codes()
    results = []
    for c in codes:
        name_bn = c.get("service_name_bn", "").lower()
        name_en = c.get("service_name_en", "").lower()
        code_14 = c.get("code_14", "").lower()
        code_raw = c.get("code_raw", "").lower()
        dept_bn = c.get("department_bn", "").lower()
        min_bn = c.get("ministry_bn", "").lower()
        cat = c.get("category", "").lower()
        dist = c.get("district_bn", "").lower()

        if (
            q in name_bn
            or q in name_en
            or q in code_14
            or q_raw in code_raw
            or q in dept_bn
            or q in min_bn
            or q in cat
            or q in dist
        ):
            results.append(c)
    return results

def get_codes_by_category(category: str) -> List[Dict[str, Any]]:
    """Filter codes by service category."""
    q = category.strip().lower()
    codes = get_all_codes()
    return [c for c in codes if q in c.get("category", "").lower()]

def get_codes_by_district(district: str) -> List[Dict[str, Any]]:
    """Filter codes by district name."""
    q = district.strip().lower()
    codes = get_all_codes()
    return [c for c in codes if q in c.get("district_bn", "").lower() or c.get("district_bn") == "জাতীয় (সকল জেলা)"]

def get_summary() -> Dict[str, Any]:
    """Return high-level summary statistics of the dataset."""
    return _load_json("summary.json")
