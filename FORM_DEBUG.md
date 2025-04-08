# FormSpree Debugging Tool

This debugging tool is designed to help diagnose and fix form submission issues across the website. It provides a centralized server-side logging system that captures all form submissions and allows you to view detailed information about each submission attempt.

## Components

1. **Server-Side Debug Endpoint**

   - Located at `/src/app/api/debug-server/route.ts`
   - Provides a central logging facility for all form submissions
   - Maintains a log file at `/form-submissions-log.json`
   - Provides API endpoints for logging and retrieving submission data

2. **Form Debugging Library**

   - Located at `/src/lib/form-debug.ts`
   - Provides a middleware function to intercept form submissions
   - Logs all submission attempts and responses
   - Handles actual FormSpree submissions

3. **Python Debug Client**
   - Located at `/debug_client.py`
   - Allows you to interact with the debug server from the command line
   - Provides commands for viewing logs, testing FormSpree connectivity, etc.

## How to Use

### Running the Debug Client

The Python debug client provides several commands to help diagnose form submission issues:

```bash
# View recent logs
python debug_client.py logs

# View only error logs
python debug_client.py logs --type error

# Test FormSpree connectivity
python debug_client.py test

# Monitor logs in real-time
python debug_client.py monitor

# Check server environment
python debug_client.py env

# Clear all logs
python debug_client.py clear
```

### Checking Logs

The logs include detailed information about each form submission:

1. Submission attempts (what data was submitted)
2. FormSpree responses (success or error)
3. Any exceptions that occurred during submission

Each log entry includes:

- Timestamp
- Type (info, success, error)
- Message
- Detailed data

### Common Issues and Solutions

If forms are failing to submit, check the logs for:

1. **HTTP 400 Bad Request**

   - Usually indicates invalid form data
   - Check if required fields are missing
   - Ensure data types are correct (strings vs. files)

2. **HTTP 401 Unauthorized**

   - Check if the FormSpree endpoint is correct
   - Make sure your FormSpree account is active

3. **Network Errors**

   - Look for CORS issues
   - Check for connectivity problems

4. **Formatting Issues**
   - Ensure you're sending data in the correct format (JSON vs FormData)
   - Verify Content-Type headers are set properly

## Debugging Process

1. Submit the form that's having issues
2. Run `python debug_client.py logs` to see the latest submission attempts
3. Look for error messages and details about the failed submission
4. Update the form code based on the error information
5. Test again and verify the fix by checking the logs

## Implementation Details

All forms on the website now use the centralized debugging library (`form-debug.ts`) which:

1. Captures form data before submission
2. Logs the submission attempt
3. Sends the data to FormSpree
4. Logs the response
5. Returns success/failure status to the form

This allows us to track all form submissions in one place and diagnose issues without requiring user action.

## Testing FormSpree Directly

The debug client includes a command to test FormSpree connectivity directly:

```bash
python debug_client.py test
```

This sends a test submission to your FormSpree endpoint and reports the result, helping isolate whether the issue is with FormSpree or your form code.

---

If you need further assistance with form debugging, please contact the developer who implemented this solution.
