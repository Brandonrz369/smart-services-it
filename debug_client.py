#!/usr/bin/env python3
"""
FormSpree Debug Client - A tool to connect to the website debug server
and help diagnose form submission issues.

Usage:
  python3 debug_client.py [command] [options]

Commands:
  logs          - Fetch and display logs
  clear         - Clear all logs
  test          - Test FormSpree connectivity
  env           - Get server environment information
  monitor       - Start a live monitor for form submissions
  replay        - Replay a form submission to test
  help          - Show this help message

Options:
  --limit N     - Limit results to N entries
  --type TYPE   - Filter logs by type (info, error, success, etc.)
  --search TEXT - Search for text in logs
  --verbose     - Show more detailed output
  --json        - Output raw JSON instead of formatted text

Examples:
  python3 debug_client.py logs --limit 10 --type error
  python3 debug_client.py test
  python3 debug_client.py monitor
"""

import os
import sys
import json
import time
import argparse
import requests
from datetime import datetime
from typing import Dict, List, Any, Optional
import textwrap
import signal
import re

# Configuration
DEFAULT_SERVER_URL = "http://localhost:3000/api/debug-server"
DEFAULT_API_KEY = "debug-server-key"

# Terminal colors
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

# Helper for terminal width
def get_terminal_width() -> int:
    try:
        import shutil
        return shutil.get_terminal_size().columns
    except:
        return 80

# Helper for formatting JSON
def format_json(data: Any) -> str:
    return json.dumps(data, indent=2)

# Clean ANSI color codes for file output
def clean_ansi(text: str) -> str:
    ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
    return ansi_escape.sub('', text)

# Helper to format log entries nicely
def format_log_entry(log: Dict[str, Any], verbose: bool = False) -> str:
    timestamp = datetime.fromisoformat(log.get("timestamp", "")).strftime("%Y-%m-%d %H:%M:%S")
    
    log_type = log.get("type", "unknown")
    type_color = Colors.GRAY
    if log_type == "error":
        type_color = Colors.RED
    elif log_type == "success":
        type_color = Colors.GREEN
    elif log_type == "info":
        type_color = Colors.BLUE
    elif log_type == "warn":
        type_color = Colors.YELLOW
    
    message = log.get("message", "No message")
    log_id = log.get("id", "")
    
    # Basic info line
    result = f"{Colors.GRAY}{timestamp}{Colors.RESET} [{type_color}{log_type.upper()}{Colors.RESET}] {message}"
    
    # Add data details if verbose
    if verbose and log.get("data"):
        data_str = format_json(log["data"])
        indent = " " * 4
        data_lines = data_str.split("\n")
        data_formatted = "\n".join(f"{indent}{line}" for line in data_lines)
        result += f"\n{Colors.GRAY}{data_formatted}{Colors.RESET}"
    
    return result

# Debug server client class
class DebugServerClient:
    def __init__(self, server_url: str = DEFAULT_SERVER_URL, api_key: str = DEFAULT_API_KEY):
        self.server_url = server_url
        self.api_key = api_key
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
    
    def send_request(self, action: str, data: Dict[str, Any] = None) -> Dict[str, Any]:
        payload = {
            "action": action
        }
        
        if data:
            payload.update(data)
        
        try:
            response = requests.post(self.server_url, json=payload, headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"{Colors.RED}Error connecting to debug server: {e}{Colors.RESET}")
            if hasattr(e, 'response') and e.response:
                try:
                    print(f"{Colors.GRAY}Server response: {e.response.text}{Colors.RESET}")
                except:
                    pass
            sys.exit(1)
    
    def get_logs(self, limit: int = 100, log_type: Optional[str] = None, search: Optional[str] = None) -> Dict[str, Any]:
        filter_data = {}
        if log_type:
            filter_data["type"] = log_type
        if search:
            filter_data["search"] = search
        
        return self.send_request("get_logs", {
            "data": {
                "filter": filter_data if filter_data else None,
                "limit": limit
            }
        })
    
    def clear_logs(self) -> Dict[str, Any]:
        return self.send_request("clear_logs")
    
    def test_formspree(self) -> Dict[str, Any]:
        return self.send_request("test_formspree")
    
    def check_environment(self) -> Dict[str, Any]:
        return self.send_request("check_environment")
    
    def add_log(self, log_type: str, message: str, data: Any = None) -> Dict[str, Any]:
        return self.send_request("log", {
            "type": log_type,
            "message": message,
            "data": data
        })
    
    def server_status(self) -> Dict[str, Any]:
        try:
            response = requests.get(self.server_url)
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"{Colors.RED}Error connecting to debug server: {e}{Colors.RESET}")
            sys.exit(1)

# Command functions
def cmd_logs(client: DebugServerClient, args: argparse.Namespace) -> None:
    result = client.get_logs(limit=args.limit, log_type=args.type, search=args.search)
    
    if args.json:
        print(format_json(result))
        return
    
    logs = result.get("logs", [])
    
    if not logs:
        print(f"{Colors.YELLOW}No logs found matching your criteria.{Colors.RESET}")
        return
    
    print(f"{Colors.BOLD}Found {len(logs)} log entries:{Colors.RESET}")
    print("-" * get_terminal_width())
    
    for log in logs:
        print(format_log_entry(log, args.verbose))
        print("-" * get_terminal_width())
    
    # Optionally save logs to file
    if args.save:
        filename = args.save
        with open(filename, "w") as f:
            f.write(f"Debug Server Logs - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write("=" * 80 + "\n\n")
            for log in logs:
                f.write(clean_ansi(format_log_entry(log, verbose=True)) + "\n")
                f.write("-" * 80 + "\n")
        print(f"{Colors.GREEN}Logs saved to {filename}{Colors.RESET}")

def cmd_clear(client: DebugServerClient, args: argparse.Namespace) -> None:
    if not args.force:
        confirm = input(f"{Colors.YELLOW}Are you sure you want to clear all logs? (y/N): {Colors.RESET}")
        if confirm.lower() != "y":
            print("Operation cancelled.")
            return
    
    result = client.clear_logs()
    
    if args.json:
        print(format_json(result))
        return
    
    if result.get("success"):
        print(f"{Colors.GREEN}All logs have been cleared.{Colors.RESET}")
    else:
        print(f"{Colors.RED}Failed to clear logs.{Colors.RESET}")

def cmd_test(client: DebugServerClient, args: argparse.Namespace) -> None:
    print(f"{Colors.BOLD}Testing FormSpree connectivity...{Colors.RESET}")
    result = client.test_formspree()
    
    if args.json:
        print(format_json(result))
        return
    
    if result.get("success"):
        print(f"{Colors.GREEN}FormSpree test successful!{Colors.RESET}")
        print(f"{Colors.GRAY}Response status: {result.get('status')}{Colors.RESET}")
    else:
        print(f"{Colors.RED}FormSpree test failed.{Colors.RESET}")
        if "error" in result:
            print(f"{Colors.RED}Error: {result['error']}{Colors.RESET}")
        if "details" in result:
            print(f"{Colors.GRAY}Details: {result['details']}{Colors.RESET}")
    
    if args.verbose and "response" in result:
        print(f"\n{Colors.BOLD}Response details:{Colors.RESET}")
        print(f"{Colors.GRAY}{format_json(result['response'])}{Colors.RESET}")

def cmd_env(client: DebugServerClient, args: argparse.Namespace) -> None:
    print(f"{Colors.BOLD}Checking server environment...{Colors.RESET}")
    result = client.check_environment()
    
    if args.json:
        print(format_json(result))
        return
    
    if result.get("success") and "environment" in result:
        env = result["environment"]
        print(f"{Colors.BOLD}Server Environment:{Colors.RESET}")
        print(f"  Node.js version: {Colors.CYAN}{env.get('node_version')}{Colors.RESET}")
        print(f"  Platform: {Colors.CYAN}{env.get('platform')} ({env.get('arch')}){Colors.RESET}")
        print(f"  Environment: {Colors.CYAN}{env.get('env')}{Colors.RESET}")
        print(f"  Process ID: {Colors.CYAN}{env.get('process_id')}{Colors.RESET}")
        print(f"  Uptime: {Colors.CYAN}{env.get('uptime', 0):.2f} seconds{Colors.RESET}")
        print(f"  Current time: {Colors.CYAN}{env.get('current_time')}{Colors.RESET}")
        
        if args.verbose and "memory_usage" in env:
            print(f"\n{Colors.BOLD}Memory Usage:{Colors.RESET}")
            for key, value in env["memory_usage"].items():
                print(f"  {key}: {Colors.CYAN}{value / 1024 / 1024:.2f} MB{Colors.RESET}")
    else:
        print(f"{Colors.RED}Failed to get environment information.{Colors.RESET}")
        if "error" in result:
            print(f"{Colors.RED}Error: {result['error']}{Colors.RESET}")

def cmd_monitor(client: DebugServerClient, args: argparse.Namespace) -> None:
    print(f"{Colors.BOLD}Starting log monitor...{Colors.RESET}")
    print(f"{Colors.GRAY}Press Ctrl+C to stop{Colors.RESET}")
    print("-" * get_terminal_width())
    
    last_log_id = None
    
    # Handle Ctrl+C gracefully
    def signal_handler(sig, frame):
        print(f"\n{Colors.YELLOW}Monitor stopped.{Colors.RESET}")
        sys.exit(0)
    
    signal.signal(signal.SIGINT, signal_handler)
    
    try:
        while True:
            try:
                # Get latest logs
                logs_result = client.get_logs(limit=10)
                logs = logs_result.get("logs", [])
                
                if logs:
                    # Check if we have new logs
                    newest_log_id = logs[0].get("id")
                    
                    if newest_log_id != last_log_id and last_log_id is not None:
                        # Find all new logs
                        new_logs = []
                        for log in logs:
                            if log.get("id") == last_log_id:
                                break
                            new_logs.append(log)
                        
                        # Display new logs
                        for log in reversed(new_logs):
                            print(format_log_entry(log, args.verbose))
                            print("-" * get_terminal_width())
                    
                    # Update the last seen log ID
                    last_log_id = newest_log_id
                
                # On first run, just save the latest log ID without displaying
                if last_log_id is None and logs:
                    last_log_id = logs[0].get("id")
                    print(f"{Colors.GRAY}Monitoring for new logs...{Colors.RESET}")
                
                # Wait before checking again
                time.sleep(2)
            
            except Exception as e:
                print(f"{Colors.RED}Error during monitoring: {e}{Colors.RESET}")
                time.sleep(5)  # Wait longer after an error
    
    except KeyboardInterrupt:
        print(f"\n{Colors.YELLOW}Monitor stopped.{Colors.RESET}")

def cmd_help(args: argparse.Namespace) -> None:
    print(__doc__)

def main() -> None:
    # Configure argument parser
    parser = argparse.ArgumentParser(
        description="FormSpree Debug Client",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""
            Examples:
              python debug_client.py logs --limit 10 --type error
              python debug_client.py test --verbose
              python debug_client.py monitor
        """)
    )
    
    # Server connection arguments
    parser.add_argument("--server", default=DEFAULT_SERVER_URL, help="Debug server URL")
    parser.add_argument("--api-key", default=DEFAULT_API_KEY, help="API key for the debug server")
    
    # Global output arguments
    parser.add_argument("--verbose", action="store_true", help="Show detailed output")
    parser.add_argument("--json", action="store_true", help="Output raw JSON")
    
    # Create subcommands
    subparsers = parser.add_subparsers(dest="command", help="Command to run")
    
    # logs command
    logs_parser = subparsers.add_parser("logs", help="Fetch and display logs")
    logs_parser.add_argument("--limit", type=int, default=20, help="Limit number of logs")
    logs_parser.add_argument("--type", help="Filter logs by type")
    logs_parser.add_argument("--search", help="Search for text in logs")
    logs_parser.add_argument("--save", help="Save logs to file")
    
    # clear command
    clear_parser = subparsers.add_parser("clear", help="Clear all logs")
    clear_parser.add_argument("--force", action="store_true", help="Don't ask for confirmation")
    
    # test command
    test_parser = subparsers.add_parser("test", help="Test FormSpree connectivity")
    
    # env command
    env_parser = subparsers.add_parser("env", help="Get server environment information")
    
    # monitor command
    monitor_parser = subparsers.add_parser("monitor", help="Start a live monitor for form submissions")
    
    # help command
    help_parser = subparsers.add_parser("help", help="Show help message")
    
    # Parse arguments
    args = parser.parse_args()
    
    # Show help if no command specified
    if not args.command:
        parser.print_help()
        return
    
    # Handle help command specially
    if args.command == "help":
        cmd_help(args)
        return
    
    # Create client
    client = DebugServerClient(server_url=args.server, api_key=args.api_key)
    
    # Dispatch to command handler
    if args.command == "logs":
        cmd_logs(client, args)
    elif args.command == "clear":
        cmd_clear(client, args)
    elif args.command == "test":
        cmd_test(client, args)
    elif args.command == "env":
        cmd_env(client, args)
    elif args.command == "monitor":
        cmd_monitor(client, args)
    else:
        print(f"{Colors.RED}Unknown command: {args.command}{Colors.RESET}")
        parser.print_help()

if __name__ == "__main__":
    main()