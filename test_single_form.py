#!/usr/bin/env python3
"""
Simple script to test a single form submission directly to FormSpree
"""

import requests
import json
import sys

# FormSpree endpoint
FORMSPREE_ENDPOINT = "https://formspree.io/f/xzzeddgr"

# Test data
test_data = {
    "name": "Test User (Script)",
    "email": "test@example.com",
    "message": "This is an automated test from the Python script."
}

def test_form():
    print("Testing form submission directly to FormSpree...")
    
    # Send the request
    response = requests.post(
        FORMSPREE_ENDPOINT,
        json=test_data,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    )
    
    # Print result
    print(f"Status code: {response.status_code}")
    
    try:
        response_json = response.json()
        print(f"Response: {json.dumps(response_json, indent=2)}")
    except:
        print(f"Response text: {response.text}")
    
    # Return success/failure
    return response.status_code == 200

if __name__ == "__main__":
    success = test_form()
    sys.exit(0 if success else 1)