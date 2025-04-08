// Interfaces for Security Scan Data
export interface SecurityCheck {
  id: string;
  category: "critical" | "warning" | "info";
  title: string;
  description: string;
  status: "pass" | "fail" | "warning" | "info" | "pending";
  recommendation?: string;
}

export interface SecurityScore {
  overall: number; // 0-100
  ssl: number;
  headers: number;
  content: number;
}

export interface SecurityResult {
  url: string;
  scanTime: Date;
  score: SecurityScore;
  checks: SecurityCheck[];
  headers?: Record<string, string>;
  certificates?: {
    valid: boolean;
    expires?: string;
    issuer?: string;
  };
}

// Function to generate mock security scan data
export const generateMockSecurityScan = (url: string): SecurityResult => {
  const isHttps = url.startsWith("https://");

  // Generate scores
  const sslScore = isHttps ? Math.floor(Math.random() * 20) + 80 : 0;
  const headersScore = Math.floor(Math.random() * 40) + 60;
  const contentScore = Math.floor(Math.random() * 30) + 70;
  const overallScore = Math.floor(
    (sslScore + headersScore + contentScore) / 3,
  );

  // Mock headers
  const mockHeaders: Record<string, string> = {
    "Content-Security-Policy": isHttps
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com;"
      : "Not set",
    "X-Content-Type-Options": Math.random() > 0.3 ? "nosniff" : "Not set",
    "X-Frame-Options": Math.random() > 0.3 ? "DENY" : "Not set",
    "Strict-Transport-Security":
      isHttps && Math.random() > 0.5
        ? "max-age=31536000; includeSubDomains"
        : "Not set",
    "X-XSS-Protection": Math.random() > 0.3 ? "1; mode=block" : "Not set",
    "Referrer-Policy":
      Math.random() > 0.5 ? "strict-origin-when-cross-origin" : "Not set",
    "Permissions-Policy":
      Math.random() > 0.7
        ? "camera=(), microphone=(), geolocation=()"
        : "Not set",
  };

  // Mock certificate info
  const mockCertificate = isHttps
    ? {
        valid: true,
        expires: new Date(
          Date.now() + Math.floor(Math.random() * 180) * 24 * 60 * 60 * 1000,
        )
          .toISOString()
          .split("T")[0],
        issuer:
          Math.random() > 0.5
            ? "Let's Encrypt Authority X3"
            : "DigiCert Global CA G2",
      }
    : {
        valid: false,
      };

  // Generate security checks
  const checks: SecurityCheck[] = [
    {
      id: "https",
      category: "critical",
      title: "HTTPS Encryption",
      description: "Website should use HTTPS to encrypt all data in transit",
      status: isHttps ? "pass" : "fail",
      recommendation: isHttps
        ? "Excellent! Your site is using HTTPS encryption."
        : "Critical: Your site is not using HTTPS. Set up SSL/TLS certificates through your hosting provider or use a service like Let's Encrypt.",
    },
    {
      id: "content-security-policy",
      category: "critical",
      title: "Content Security Policy",
      description: "CSP header helps prevent XSS and data injection attacks",
      status:
        mockHeaders["Content-Security-Policy"] !== "Not set"
          ? "pass"
          : "fail",
      recommendation:
        mockHeaders["Content-Security-Policy"] !== "Not set"
          ? "Good! You have a Content Security Policy set up. Review periodically to ensure it's up to date with your resource needs."
          : "Add a Content Security Policy header to help prevent XSS attacks. Start with a policy that restricts resources to your own domain.",
    },
    {
      id: "x-content-type-options",
      category: "warning",
      title: "X-Content-Type-Options",
      description: "Prevents MIME type sniffing attacks",
      status:
        mockHeaders["X-Content-Type-Options"] !== "Not set"
          ? "pass"
          : "warning",
      recommendation:
        mockHeaders["X-Content-Type-Options"] !== "Not set"
          ? 'Good! X-Content-Type-Options is properly set to "nosniff".'
          : "Add X-Content-Type-Options: nosniff header to prevent browsers from interpreting files as a different MIME type.",
    },
    {
      id: "x-frame-options",
      category: "warning",
      title: "X-Frame-Options",
      description:
        "Prevents clickjacking attacks by disabling iframe embedding",
      status:
        mockHeaders["X-Frame-Options"] !== "Not set" ? "pass" : "warning",
      recommendation:
        mockHeaders["X-Frame-Options"] !== "Not set"
          ? "Good! X-Frame-Options is properly set."
          : "Add X-Frame-Options header set to DENY or SAMEORIGIN to prevent your site from being embedded in iframes on other domains.",
    },
    {
      id: "hsts",
      category: "warning",
      title: "HTTP Strict Transport Security",
      description: "Forces browsers to use HTTPS for all future connections",
      status:
        isHttps && mockHeaders["Strict-Transport-Security"] !== "Not set"
          ? "pass"
          : isHttps
            ? "warning"
            : "info",
      recommendation:
        isHttps && mockHeaders["Strict-Transport-Security"] !== "Not set"
          ? "Good! HSTS is properly configured."
          : isHttps
            ? "Add Strict-Transport-Security header to ensure clients always connect via HTTPS."
            : "HSTS requires HTTPS. Enable HTTPS first, then add HSTS header.",
    },
    {
      id: "xss-protection",
      category: "warning",
      title: "X-XSS-Protection",
      description: "Enables browser's built-in XSS filters",
      status:
        mockHeaders["X-XSS-Protection"] !== "Not set" ? "pass" : "warning",
      recommendation:
        mockHeaders["X-XSS-Protection"] !== "Not set"
          ? "Good! X-XSS-Protection is enabled."
          : "Add X-XSS-Protection: 1; mode=block header to enable the browser's XSS filter.",
    },
    {
      id: "referrer-policy",
      category: "info",
      title: "Referrer Policy",
      description:
        "Controls what information is shared when users navigate away",
      status: mockHeaders["Referrer-Policy"] !== "Not set" ? "pass" : "info",
      recommendation:
        mockHeaders["Referrer-Policy"] !== "Not set"
          ? "Good! Referrer-Policy is configured."
          : "Consider adding a Referrer-Policy header to control what information is sent when users click links to other sites.",
    },
    {
      id: "permissions-policy",
      category: "info",
      title: "Permissions Policy",
      description:
        "Controls access to browser features like camera, microphone, etc.",
      status:
        mockHeaders["Permissions-Policy"] !== "Not set" ? "pass" : "info",
      recommendation:
        mockHeaders["Permissions-Policy"] !== "Not set"
          ? "Good! Permissions Policy is configured."
          : "Consider adding a Permissions-Policy header to control which browser features your site can use.",
    },
    {
      id: "ssl-cert",
      category: "critical",
      title: "SSL Certificate Validity",
      description: "Checks if SSL certificate is valid and not expired",
      status:
        isHttps && mockCertificate.valid ? "pass" : isHttps ? "fail" : "info",
      recommendation:
        isHttps && mockCertificate.valid
          ? `Your SSL certificate is valid until ${mockCertificate.expires}.`
          : isHttps
            ? "Your SSL certificate appears to be invalid. Contact your certificate provider or hosting company."
            : "Enable HTTPS to use SSL certificates.",
    },
    {
      id: "mixed-content",
      category: "critical",
      title: "Mixed Content",
      description: "Checks for HTTP content on HTTPS pages",
      status: isHttps ? (Math.random() > 0.7 ? "fail" : "pass") : "info",
      recommendation: isHttps
        ? Math.random() > 0.7
          ? "Your HTTPS site is loading some resources over HTTP, which can lead to security warnings. Update all resource URLs to use HTTPS."
          : "Good! Your site does not load mixed content."
        : "Enable HTTPS first, then ensure all resources are loaded over HTTPS.",
    },
  ];

  return {
    url,
    scanTime: new Date(),
    score: {
      overall: overallScore,
      ssl: sslScore,
      headers: headersScore,
      content: contentScore,
    },
    checks,
    headers: mockHeaders,
    certificates: mockCertificate,
  };
};
