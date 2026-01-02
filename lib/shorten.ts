export function genSusSlug(): string {
  const verbs = [
    "steal",
    "hack",
    "breach",
    "dump",
    "leak",
    "exfil",
    "hijack",
    "inject",
    "pwn",
    "compromise",
    "exploit",
    "grab",
    "harvest",
    "scrape",
    "intercept",
  ];
  const nouns = [
    "creditcard",
    "ssn",
    "bankaccount",
    "password",
    "otp",
    "session",
    "token",
    "apikey",
    "privatekey",
    "email",
    "phonenumber",
    "biometric",
    "credentials",
    "passport",
    "driverslic",
  ];
  const actions = [
    "verify",
    "confirm",
    "validate",
    "authenticate",
    "authorize",
    "update",
    "reset",
    "sync",
    "install",
    "execute",
  ];
  const threats = [
    "malware",
    "ransomware",
    "botnet",
    "ddos",
    "exploit",
    "payload",
    "backdoor",
    "trojan",
    "shellcode",
    "rootkit",
  ];
  const destinations = [
    "c2server",
    "darkweb",
    "buyer",
    "telegram",
    "wickr",
    "trickbot",
    "emotet",
    "cryptolocker",
    "conti",
    "alphv",
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
