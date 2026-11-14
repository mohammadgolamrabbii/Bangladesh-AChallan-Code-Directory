"""
Bangladesh A-Challan Code Directory Python SDK
Author: Mohammad Golamrabbii (মোহাম্মদ গোলাম রাব্বী)
Website: https://github.com/mohammadgolamrabbii/Bangladesh-AChallan-Code-Directory
"""

from .core import (
    get_all_codes,
    get_code_by_id,
    get_code_by_number,
    search_codes,
    get_codes_by_category,
    get_codes_by_district,
    get_summary,
)

__version__ = "1.0.0"
__author__ = "Mohammad Golamrabbii"
__all__ = [
    "get_all_codes",
    "get_code_by_id",
    "get_code_by_number",
    "search_codes",
    "get_codes_by_category",
    "get_codes_by_district",
    "get_summary",
]
