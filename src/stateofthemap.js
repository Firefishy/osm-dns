D(DOMAIN, REGISTRAR, DnsProvider(PROVIDER),

  // Publish CAA records indicating that only letsencrypt should issue certificates

  CAA_BUILDER({
    label: "@",
    iodef: "mailto:hostmaster@openstreetmap.org",
    issue: [
      "letsencrypt.org",
    ],
    issuewild: [
      "letsencrypt.org",
    ],
  }),

  // SPF policy

  SPF_BUILDER({
    label: "@",
    parts: [
      "v=spf1",
      "include:_spf.google.com",  // Google GSuite
      "ip4:212.110.172.32",       // shenron ipv4
      "ip6:2001:41c9:1:400::32",  // shenron ipv6
      "-all"
    ]
  }),

  // Let google handle email

  MX("@", 1, "aspmx.l.google.com.", TTL("1h")),
  MX("@", 5, "alt1.aspmx.l.google.com.", TTL("1h")),
  MX("@", 5, "alt2.aspmx.l.google.com.", TTL("1h")),
  MX("@", 10, "alt3.aspmx.l.google.com.", TTL("1h")),
  MX("@", 10, "alt4.aspmx.l.google.com.", TTL("1h")),

  // Aliases for google services

  CNAME("login", "ghs.googlehosted.com."),
  CNAME("docs", "ghs.googlehosted.com."),
  CNAME("mail", "ghs.googlehosted.com."),
  CNAME("calendar", "ghs.googlehosted.com."),
  CNAME("sites", "ghs.googlehosted.com."),

  // Main web server and it's aliases

  A("@", RIDLEY_IPV4, TTL("10m")),
  A("www", RIDLEY_IPV4, TTL("10m")),
  A("2022", RIDLEY_IPV4, TTL("10m")),
  A("2021", RIDLEY_IPV4, TTL("10m")),
  A("2020", RIDLEY_IPV4, TTL("10m")),
  A("2019", RIDLEY_IPV4, TTL("10m")),
  A("2018", RIDLEY_IPV4, TTL("10m")),
  A("2017", RIDLEY_IPV4, TTL("10m")),
  A("2016", RIDLEY_IPV4, TTL("10m")),
  A("2014", RIDLEY_IPV4, TTL("10m")),
  A("2013", RIDLEY_IPV4, TTL("10m")),
  A("2012", RIDLEY_IPV4, TTL("10m")),
  A("2011", RIDLEY_IPV4, TTL("10m")),
  A("2010", RIDLEY_IPV4, TTL("10m")),
  A("2009", RIDLEY_IPV4, TTL("10m")),
  A("2008", RIDLEY_IPV4, TTL("10m")),
  A("2007", RIDLEY_IPV4, TTL("10m")),

  // Google Site Verification - Grant
  TXT("2022", "google-site-verification=wT1dJzSYM_2By372lJ_v9IU1crF21qOySEAPABxUcyo")

);
