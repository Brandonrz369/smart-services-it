#!/usr/bin/env python3
"""
FormSpree Automated Test Script

This script automatically tests all forms on the website and reports results.
It can be scheduled to run periodically to ensure forms are working.

Usage:
  python form_test.py [--url URL] [--test TEST_NAME]

Options:
  --url URL       Base URL of the website (default: http://localhost:3000)
  --test TEST     Specific test to run (default: all)
                  Options: simpleContactForm, contactPage, pricingCalculator, serviceAssessment, all

Examples:
  python form_test.py
  python form_test.py --url https://example.com --test contactPage
"""

import argparse
import requests
import json
import time
import sys
import os
from datetime import datetime
from typing import Dict, List, Any, Optional

# ANSI color codes for terminal output
class Colors:
    RESET = "\033[0m"
    RED = "\033[91m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    BLUE = "\033[94m"
    PURPLE = "\033[95m"
    CYAN = "\033[96m"
    GRAY = "\033[90m"
    BOLD = "\033[1m"

def run_tests(base_url: str, test_name: Optional[str] = None) -> Dict[str, Any]:
    """Run form tests and return results"""
    endpoint = f"{base_url}/api/debug/auto-test"
    
    if test_name and test_name != 'all':
        endpoint += f"?test={test_name}"
    else:
        endpoint += "?test=all"
    
    try:
        print(f"{Colors.BLUE}Running form tests...{Colors.RESET}")
        response = requests.get(endpoint)
        
        if response.status_code != 200:
            print(f"{Colors.RED}Error: Server returned status code {response.status_code}{Colors.RESET}")
            print(f"{Colors.GRAY}Response: {response.text}{Colors.RESET}")
            return {"error": f"Server returned status code {response.status_code}"}
        
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"{Colors.RED}Error connecting to server: {e}{Colors.RESET}")
        return {"error": str(e)}
    except json.JSONDecodeError as e:
        print(f"{Colors.RED}Error parsing server response: {e}{Colors.RESET}")
        print(f"{Colors.GRAY}Response: {response.text if 'response' in locals() else 'N/A'}{Colors.RESET}")
        return {"error": f"Invalid JSON response: {e}"}

def display_results(results: Dict[str, Any]) -> bool:
    """Display test results and return True if all tests passed"""
    if "error" in results:
        print(f"{Colors.RED}Error: {results['error']}{Colors.RESET}")
        return False
    
    print(f"\n{Colors.BOLD}Form Test Results - {results.get('timestamp', 'Unknown Time')}{Colors.RESET}")
    print("=" * 80)
    
    all_passed = True
    test_results = results.get("results", {})
    
    for form_name, result in test_results.items():
        success = result.get("success", False)
        status = result.get("status", "N/A")
        error = result.get("error", None)
        
        status_color = Colors.GREEN if success else Colors.RED
        status_text = "PASSED" if success else "FAILED"
        
        print(f"{Colors.BOLD}{form_name}:{Colors.RESET} {status_color}{status_text}{Colors.RESET}")
        print(f"  Status Code: {status}")
        
        if error:
            print(f"  Error: {Colors.RED}{error}{Colors.RESET}")
        
        print("-" * 80)
        
        if not success:
            all_passed = False
    
    if all_passed:
        print(f"\n{Colors.GREEN}✓ All tests passed!{Colors.RESET}")
    else:
        print(f"\n{Colors.RED}✗ Some tests failed. Check the detailed results above.{Colors.RESET}")
    
    return all_passed

def main() -> None:
    parser = argparse.ArgumentParser(description="FormSpree Automated Test Script")
    parser.add_argument("--url", default="http://localhost:3000", help="Base URL of the website")
    parser.add_argument("--test", default="all", help="Specific test to run (default: all)")
    
    args = parser.parse_args()
    
    # Run the tests
    results = run_tests(args.url, args.test)
    
    # Display results
    all_passed = display_results(results)
    
    # Exit with appropriate code
    sys.exit(0 if all_passed else 1)

if __name__ == "__main__":
    main()