# Perplexity MCP Server Setup Plan for Roo Code

Here's a plan to set up the Perplexity MCP server for Roo Code, tailored for your Linux environment and comfort with command-line tools.

## Summary of Methods

*   **Method 1: Direct NPX Approach (Recommended)**

    *   **Pros:** Simplest approach, works well on most systems.
    *   **Cons:** May have issues on some Linux systems.
*   **Method 2: Installation Using Researcher-MCP**

    *   **Pros:** Development-focused implementation.
    *   **Cons:** Requires cloning a repository, installing dependencies, and building the project. More complex setup.
*   **Method 3: For Linux Users - UV Package Manager Approach**

    *   **Pros:** May work better on Linux if NPX has issues.
    *   **Cons:** Requires installing the UV package manager.
*   **Method 4: One-Line Installation Using Smithery**

    *   **Pros:** Quickest installation.
    *   **Cons:** Relies on Smithery CLI.

## Recommended Method

Given that you're on Linux and comfortable with command-line tools, I recommend **Method 3: UV Package Manager Approach**. This method can be more reliable on Linux systems compared to the NPX approach.

## Detailed Steps

1.  **Install UV package manager (if you haven't already):**

    ```bash
    pip install uv
    ```
2.  **Configure Roo Code:**

    *   Identify your Roo Code MCP configuration file location: `~/.config/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`
    *   Edit the file and add the following configuration:

    ```json
    {
      "mcpServers": {
        "perplexity": {
          "command": "uvx",
          "args": ["mcp-server-perplexity"],
          "env": {
            "PERPLEXITY_API_KEY": "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",
            "PATH": "/home/username/.local/bin:/usr/local/bin:/usr/bin:/bin"
          },
          "disabled": false,
          "autoApprove": [
            "search",
            "reason",
            "deep_research"
          ]
        }
      }
    }
    ```

    *   **Important:** Replace `/home/username` with your actual home directory path. You can find your home directory by running `echo $HOME` in the terminal.

## Troubleshooting

*   If you encounter issues, make sure you're editing the correct file.
*   Double-check that you've replaced `/home/username` with your actual home directory path.
*   Restart VS Code completely after making any changes.

## Further Assistance

I'm here to help! Would you like me to clarify or adapt any part of this configuration for your specific needs or system setup?