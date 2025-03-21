#!/bin/bash

# Form Tests Cron Script
# This script is designed to be run as a cron job to periodically test form submissions
# Recommended cron schedule: 0 * * * * /path/to/form_tests_cron.sh

# Change to project directory
cd "$(dirname "$0")" || exit 1

# Set the website URL
WEBSITE_URL="http://localhost:3000"  # Change this to your actual website URL in production

# Define log file
LOG_FILE="form_test_cron.log"

# Run the test script and log results
echo "===== Form Test Run: $(date) =====" >> "$LOG_FILE"
python3 form_test.py --url "$WEBSITE_URL" >> "$LOG_FILE" 2>&1

# Check if tests failed
if [ $? -ne 0 ]; then
  echo "ALERT: Form tests failed. Check $LOG_FILE for details." >> "$LOG_FILE"
  
  # Add notification commands here if needed
  # For example:
  # mail -s "ALERT: Website Form Tests Failed" your@email.com < "$LOG_FILE"
  # or integrate with other notification systems
fi

echo "" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# Make the script executable: chmod +x form_tests_cron.sh
# Add to crontab with: crontab -e
# Example cron entry to run every hour:
# 0 * * * * /path/to/form_tests_cron.sh