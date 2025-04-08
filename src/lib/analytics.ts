// Simple client-side analytics tracking for web tools

interface ToolUsageEvent {
  tool: string;
  action: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

// Store up to 100 most recent events
const MAX_EVENTS = 100;

// Track a tool usage event
export const trackToolUsage = (
  tool: string,
  action: string,
  metadata?: Record<string, any>,
) => {
  if (typeof window === "undefined") return;

  try {
    // Create event object
    const event: ToolUsageEvent = {
      tool,
      action,
      timestamp: Date.now(),
      metadata,
    };

    // Get existing events from localStorage
    const existingEventsStr = localStorage.getItem("toolUsageEvents");
    let events: ToolUsageEvent[] = [];

    if (existingEventsStr) {
      try {
        events = JSON.parse(existingEventsStr);
      } catch (e) {
        console.error("Failed to parse tool usage events", e);
        events = [];
      }
    }

    // Add new event and limit to MAX_EVENTS
    events.unshift(event);
    if (events.length > MAX_EVENTS) {
      events = events.slice(0, MAX_EVENTS);
    }

    // Save back to localStorage
    localStorage.setItem("toolUsageEvents", JSON.stringify(events));

    // If configured, also send to server-side analytics
    sendToAnalyticsServer(event);

    console.log(`[Analytics] Tracked: ${tool} - ${action}`);
  } catch (error) {
    console.error("[Analytics] Error tracking event:", error);
  }
};

// Get tool usage stats
export const getToolUsageStats = () => {
  if (typeof window === "undefined") return null;

  try {
    const existingEventsStr = localStorage.getItem("toolUsageEvents");
    if (!existingEventsStr) return null;

    const events: ToolUsageEvent[] = JSON.parse(existingEventsStr);

    // Group by tool
    const toolCounts: Record<string, number> = {};
    const actionCounts: Record<string, number> = {};

    events.forEach((event) => {
      // Count by tool
      toolCounts[event.tool] = (toolCounts[event.tool] || 0) + 1;

      // Count by action
      const actionKey = `${event.tool}:${event.action}`;
      actionCounts[actionKey] = (actionCounts[actionKey] || 0) + 1;
    });

    return {
      totalEvents: events.length,
      toolCounts,
      actionCounts,
      firstEventTime:
        events.length > 0
          ? new Date(events[events.length - 1].timestamp)
          : null,
      lastEventTime: events.length > 0 ? new Date(events[0].timestamp) : null,
    };
  } catch (error) {
    console.error("[Analytics] Error getting usage stats:", error);
    return null;
  }
};

// Optional: Send to server-side analytics
const sendToAnalyticsServer = (_event: ToolUsageEvent) => {
  // This could be implemented in the future to send events to a server
  // For now, we're just using localStorage
  // Example implementation:
  // fetch('/api/analytics/track', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event)
  // }).catch(err => console.error('Failed to send to analytics server:', err));
};
