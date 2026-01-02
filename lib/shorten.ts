export function genSusSlug(): string {
  const verbs = [
    "get",
    "fetch",
    "forward",
    "send",
    "request",
    "collect",
    "retrieve",
    "submit",
    "process",
    "check",
    "pull",
    "grab",
    "capture",
    "log",
  ];
  const nouns = [
    "creditcard",
    "otp",
    "password",
    "ssn",
    "verification",
    "account",
    "banking",
    "payment",
    "security",
    "identity",
    "session",
    "token",
    "credentials",
    "data",
  ];
  const actions = [
    "verify",
    "confirm",
    "validate",
    "authenticate",
    "update",
    "reset",
    "sync",
    "authorize",
    "complete",
    "finalize",
  ];
  const destinations = [
    "info",
    "details",
    "form",
    "page",
    "portal",
    "center",
    "service",
    "secure",
    "gateway",
    "system",
  ];
  const threats = [
    "urgent",
    "required",
    "needed",
    "pending",
    "check",
    "review",
    "update",
    "alert",
    "notification",
    "request",
  ];

  const templates = [
    () => [
      verbs[Math.floor(Math.random() * verbs.length)],
      nouns[Math.floor(Math.random() * nouns.length)],
    ],
    () => [
      actions[Math.floor(Math.random() * actions.length)],
      threats[Math.floor(Math.random() * threats.length)],
    ],
    () => [
      threats[Math.floor(Math.random() * threats.length)],
      destinations[Math.floor(Math.random() * destinations.length)],
    ],
    () => [
      verbs[Math.floor(Math.random() * verbs.length)],
      nouns[Math.floor(Math.random() * nouns.length)],
      destinations[Math.floor(Math.random() * destinations.length)],
    ],
  ];

  const template = templates[Math.floor(Math.random() * templates.length)];
  const parts = template();

  return parts.join("-").slice(0, 50);
}
