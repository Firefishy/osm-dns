D(DOMAIN, REGISTRAR, DnsProvider(PROVIDER),

  // Publish CAA records indicating that only letsencrypt and globalsign (Fastly) should issue certificates

  CAA_BUILDER({
    label: "@",
    ttl: "1h",
    iodef: "mailto:hostmaster@openstreetmap.org",
    issue: [
      "letsencrypt.org",
      "globalsign.com",   // Used by Fastly for CDN certificates
    ],
    issuewild: [
      "letsencrypt.org",
      "globalsign.com",   // Used by Fastly for CDN certificates
    ],
  }),

  // Use shenron as the MX host

  MX("@", 10, QUALIFY("a.mx")),
  MX("messages", 10, QUALIFY("a.mx")),
  MX("noreply", 10, QUALIFY("a.mx")),
  MX("otrs", 10, QUALIFY("a.mx")),
  MX("community", 10, QUALIFY("a.mx")),
  A("a.mx", SHENRON_IPV4),
  AAAA("a.mx", SHENRON_IPV6),

  // Publish SPF records indicating that only shenron sends mail

  SPF_BUILDER({
    label: "@",
    parts: [
      "v=spf1",
      "ip4:212.110.172.32",       // shenron ipv4
      "ip6:2001:41c9:1:400::32",  // shenron ipv6
      "ip4:184.104.226.98",       // fafnir ipv4
      "ip6:2001:470:1:b3b::2",    // fafnir ipv6
      "mx",                       // safety net if we change mx
      "-all"
    ]
  }),

  SPF_BUILDER({
    label: "messages",
    parts: [
      "v=spf1",
      "ip4:212.110.172.32",       // shenron ipv4
      "ip6:2001:41c9:1:400::32",  // shenron ipv6
      "ip4:184.104.226.98",       // fafnir ipv4
      "ip6:2001:470:1:b3b::2",    // fafnir ipv6
      "mx",                       // safety net if we change mx
      "-all"
    ]
  }),

  SPF_BUILDER({
    label: "noreply",
    parts: [
      "v=spf1",
      "ip4:212.110.172.32",       // shenron ipv4
      "ip6:2001:41c9:1:400::32",  // shenron ipv6
      "ip4:184.104.226.98",       // fafnir ipv4
      "ip6:2001:470:1:b3b::2",    // fafnir ipv6
      "mx",                       // safety net if we change mx
      "-all"
    ]
  }),

  SPF_BUILDER({
    label: "otrs",
    parts: [
      "v=spf1",
      "ip4:212.110.172.32",       // shenron ipv4
      "ip6:2001:41c9:1:400::32",  // shenron ipv6
      "ip4:184.104.226.98",       // fafnir ipv4
      "ip6:2001:470:1:b3b::2",    // fafnir ipv6
      "mx",                       // safety net if we change mx
      "-all"
    ]
  }),

  SPF_BUILDER({
    label: "community",
    parts: [
      "v=spf1",
      "ip4:212.110.172.32",       // shenron ipv4
      "ip6:2001:41c9:1:400::32",  // shenron ipv6
      "ip4:184.104.226.98",       // fafnir ipv4
      "ip6:2001:470:1:b3b::2",    // fafnir ipv6
      "mx",                       // safety net if we change mx
      "-all"
    ]
  }),

  // Publish DKIM public key

  TXT("20200301._domainkey", "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzvoNZVOGfw1V4A171hxHMhzVTAnIUQVJ8iX3wbqCld8A5iIaXeTGYvBmewymax/cYJS4QqzbpUzkgrrTA9avuZhd+QGJDgjADgx4VyMOaOS6FwAxS0uXtLrt+lsixRDx/feKyZHaxjzJAQy46ok77xXL4UXIaaovw6G6eZpIScMzZQ2zkKNJxTICzzSOduIilHhMWte4XP+/2PdRmD7Ge9jb0U4bZjswX0AqKSGzDKYw+yxVna9l53adeCnklqg2ofoXu+ResiH+kt05aCUOMo8en3em6yBnRCMalgi1E3Tt7I5BWcYFRkT/8agUGW4gGC6XMV9IskOsYL0emG0kGwIDAQAB", AUTOSPLIT),

  // Publish DMARC report-only policy

  DMARC_BUILDER({
    policy: "none",
    rua: [
      "mailto:openstreetmap-d@dmarc.report-uri.com"
    ],
    failureOptions: 1
  }),

  // Announce MTA-STS policy and TLSRPT policy for error reports

  TXT("_mta-sts", "v=STSv1; id=202001291805Z"),
  TXT("_smtp._tls", "v=TLSRPTv1; rua=mailto:openstreetmap-d@tlsrpt.report-uri.com"),

  // Fastly cert domain ownership confirmation

  TXT("@", "_globalsign-domain-verification=ps00GlW1BzY9c2_cwH_pFqRkvzZyaCVZ-3RLssRG6S"),
  TXT("@", "_globalsign-domain-verification=W0buKB5ZmL-VwwHw2oQyQImk3I1q3hSemf2qmB1hjP"),

  // Delegate MTA-STS policy for subdomains

  CNAME("_mta-sts.messages", QUALIFY("_mta-sts")),
  CNAME("_mta-sts.noreply", QUALIFY("_mta-sts")),
  CNAME("_mta-sts.otrs", QUALIFY("_mta-sts")),
  CNAME("_mta-sts.community", QUALIFY("_mta-sts")),

  // Google postmaster tools verification

  CNAME("af323lytato5", "gv-o4v3qh5pfayqex.dv.googlehosted.com."),
  CNAME("irzdddnmh465", "gv-cwr6bvt7xsgact.dv.googlehosted.com."),

  // Main web servers and their aliases

  A("spike-01", SPIKE01_IPV4),
  AAAA("spike-01", SPIKE01_IPV6),
  // A("@", SPIKE01_IPV4),
  // AAAA("@", SPIKE01_IPV6),
  // A("www", SPIKE01_IPV4),
  // AAAA("www", SPIKE01_IPV6),
  // A("api", SPIKE01_IPV4),
  // AAAA("api", SPIKE01_IPV6),
  // A("maps", SPIKE01_IPV4),
  // AAAA("maps", SPIKE01_IPV6),
  // A("mapz", SPIKE01_IPV4),
  // AAAA("mapz", SPIKE01_IPV6),
  A("spike-01.dub", SPIKE01_INTERNAL),
  A("spike-01.oob", SPIKE01_OOB),

  A("spike-02", SPIKE02_IPV4),
  AAAA("spike-02", SPIKE02_IPV6),
  // A("@", SPIKE02_IPV4),
  // AAAA("@", SPIKE02_IPV6),
  // A("www", SPIKE02_IPV4),
  // AAAA("www", SPIKE02_IPV6),
  // A("api", SPIKE02_IPV4),
  // AAAA("api", SPIKE02_IPV6),
  // A("maps", SPIKE02_IPV4),
  // AAAA("maps", SPIKE02_IPV6),
  // A("mapz", SPIKE02_IPV4),
  // AAAA("mapz", SPIKE02_IPV6),
  A("spike-02.dub", SPIKE02_INTERNAL),
  A("spike-02.oob", SPIKE02_OOB),

  A("spike-03", SPIKE03_IPV4),
  AAAA("spike-03", SPIKE03_IPV6),
  // A("@", SPIKE03_IPV4),
  // AAAA("@", SPIKE03_IPV6),
  // A("www", SPIKE03_IPV4),
  // AAAA("www", SPIKE03_IPV6),
  // A("api", SPIKE03_IPV4),
  // AAAA("api", SPIKE03_IPV6),
  // A("maps", SPIKE03_IPV4),
  // AAAA("maps", SPIKE03_IPV6),
  // A("mapz", SPIKE03_IPV4),
  // AAAA("mapz", SPIKE03_IPV6),
  A("spike-03.dub", SPIKE03_INTERNAL),
  A("spike-03.oob", SPIKE03_OOB),

  A("spike-06", SPIKE06_IPV4),
  AAAA("spike-06", SPIKE06_IPV6),
  A("@", SPIKE06_IPV4),
  AAAA("@", SPIKE06_IPV6),
  A("www", SPIKE06_IPV4),
  AAAA("www", SPIKE06_IPV6),
  A("api", SPIKE06_IPV4),
  AAAA("api", SPIKE06_IPV6),
  A("maps", SPIKE06_IPV4),
  AAAA("maps", SPIKE06_IPV6),
  A("mapz", SPIKE06_IPV4),
  AAAA("mapz", SPIKE06_IPV6),
  A("spike-06.ams", SPIKE06_INTERNAL),
  A("spike-06.oob", SPIKE06_OOB),

  A("spike-07", SPIKE07_IPV4),
  AAAA("spike-07", SPIKE07_IPV6),
  A("@", SPIKE07_IPV4),
  AAAA("@", SPIKE07_IPV6),
  A("www", SPIKE07_IPV4),
  AAAA("www", SPIKE07_IPV6),
  A("api", SPIKE07_IPV4),
  AAAA("api", SPIKE07_IPV6),
  A("maps", SPIKE07_IPV4),
  AAAA("maps", SPIKE07_IPV6),
  A("mapz", SPIKE07_IPV4),
  AAAA("mapz", SPIKE07_IPV6),
  A("spike-07.ams", SPIKE07_INTERNAL),
  A("spike-07.oob", SPIKE07_OOB),

  A("spike-08", SPIKE08_IPV4),
  AAAA("spike-08", SPIKE08_IPV6),
  A("@", SPIKE08_IPV4),
  AAAA("@", SPIKE08_IPV6),
  A("www", SPIKE08_IPV4),
  AAAA("www", SPIKE08_IPV6),
  A("api", SPIKE08_IPV4),
  AAAA("api", SPIKE08_IPV6),
  A("maps", SPIKE08_IPV4),
  AAAA("maps", SPIKE08_IPV6),
  A("mapz", SPIKE08_IPV4),
  AAAA("mapz", SPIKE08_IPV6),
  A("spike-08.ams", SPIKE08_INTERNAL),
  A("spike-08.oob", SPIKE08_OOB),

  // Nominatim servers

  A("pummelzacken", PUMMELZACKEN_IPV4),
  A("pummelzacken.ucl", PUMMELZACKEN_INTERNAL),
  A("pummelzacken.oob", PUMMELZACKEN_OOB),

  A("dulcy", DULCY_IPV4),
  AAAA("dulcy", DULCY_IPV6),
  A("dulcy.ams", DULCY_INTERNAL),
  A("dulcy.oob", DULCY_OOB),

  A("longma", LONGMA_IPV4),
  AAAA("longma", LONGMA_IPV6),
  A("longma.dub", LONGMA_INTERNAL),
  A("longma.oob", LONGMA_OOB),

  A("stormfly-04", STORMFLY04_IPV4),
  AAAA("stormfly-04", STORMFLY04_IPV6),
  A("stormfly-04.oob", STORMFLY04_OOB),

  CNAME("nominatim", "nominatim.geo.openstreetmap.org."),
  CNAME("qgis.nominatim", "nominatim.geo.openstreetmap.org."),
  CNAME("qa-tile.nominatim", "longma.openstreetmap.org."),

  // Taginfo server

  A("grindtooth", GRINDTOOTH_IPV4),
  A("taginfo", GRINDTOOTH_IPV4, TTL("10m")),
  A("grindtooth.ucl", GRINDTOOTH_INTERNAL),
  A("grindtooth.oob", GRINDTOOTH_OOB),

  // Tile servers

  A("odin", ODIN_IPV4),
  AAAA("odin", ODIN_IPV6),
  A("odin.ams", ODIN_INTERNAL),
  A("odin.oob", ODIN_OOB),

  A("ysera", YSERA_IPV4),
  A("ysera.ucl", YSERA_INTERNAL),
  A("ysera.oob", YSERA_OOB),

  A("culebre", CULEBRE_IPV4),
  AAAA("culebre", CULEBRE_IPV6),
  A("culebre.dub", CULEBRE_INTERNAL),
  A("culebre.oob", CULEBRE_OOB),

  A("nidhogg", NIDHOGG_IPV4),
  AAAA("nidhogg", NIDHOGG_IPV6),
  A("nidhogg.oob", NIDHOGG_OOB),

  A("scorch", SCORCH_IPV4),
  AAAA("scorch", SCORCH_IPV6),

  A("rhaegal", RHAEGAL_IPV4),

  A("palulukon", PALULUKON_IPV4),

  A("pyrene", PYRENE_IPV4),
  AAAA("pyrene", PYRENE_IPV6),
  A("pyrene.oob", PYRENE_OOB),

  A("bowser", BOWSER_IPV4),

  A("balerion", BALERION_IPV4),

  A("albi", ALBI_IPV4),
  AAAA("albi", ALBI_IPV6),

  A("necrosan", NECROSAN_IPV4),
  AAAA("necrosan", NECROSAN_IPV6),

  CNAME("tile", "dualstack.n.sni.global.fastly.net.", TTL("10m")),
  CNAME("a.tile", "dualstack.n.sni.global.fastly.net.", TTL("10m")),
  CNAME("b.tile", "dualstack.n.sni.global.fastly.net.", TTL("10m")),
  CNAME("c.tile", "dualstack.n.sni.global.fastly.net.", TTL("10m")),

  A("render", CULEBRE_IPV4),
  A("render", NIDHOGG_IPV4),
  AAAA("render", CULEBRE_IPV6),
  AAAA("render", NIDHOGG_IPV6),

  // Services machine

  A("ironbelly", IRONBELLY_IPV4),
  AAAA("ironbelly", IRONBELLY_IPV6),
  A("backup", IRONBELLY_IPV4, TTL("10m")),
  AAAA("backup", IRONBELLY_IPV6, TTL("10m")),
  A("planet", IRONBELLY_IPV4, TTL("10m")),
  AAAA("planet", IRONBELLY_IPV6, TTL("10m")),
  A("logstash", IRONBELLY_IPV4),
  AAAA("logstash", IRONBELLY_IPV6),
  A("ironbelly.ams", IRONBELLY_INTERNAL),
  A("ironbelly.oob", IRONBELLY_OOB),

  A("norbert", NORBERT_IPV4),
  AAAA("norbert", NORBERT_IPV6),
  // A("backup", NORBERT_IPV4, TTL("10m")),
  // AAAA("backup", NORBERT_IPV6, TTL("10m")),
  // A("planet", NORBERT_IPV4, TTL("10m")),
  // AAAA("planet", NORBERT_IPV6, TTL("10m")),
  A("norbert.ams", NORBERT_INTERNAL),
  A("norbert.oob", NORBERT_OOB),

  A("fafnir", FAFNIR_IPV4),
  AAAA("fafnir", FAFNIR_IPV6),
  // A("backup", FAFNIR_IPV4, TTL("10m")),
  // AAAA("backup", FAFNIR_IPV6, TTL("10m")),
  // A("planet", FAFNIR_IPV4, TTL("10m")),
  // AAAA("planet", FAFNIR_IPV6, TTL("10m")),
  A("fafnir.dub", FAFNIR_INTERNAL),
  A("fafnir.oob", FAFNIR_OOB),

  A("horntail", HORNTAIL_IPV4),
  AAAA("horntail", HORNTAIL_IPV6),
  // A("backup", HORNTAIL_IPV4, TTL("10m")),
  // AAAA("backup", HORNTAIL_IPV6, TTL("10m")),
  // A("planet", HORNTAIL_IPV4, TTL("10m")),
  // AAAA("planet", HORNTAIL_IPV6, TTL("10m")),
  A("horntail.dub", HORNTAIL_INTERNAL),
  A("horntail.oob", HORNTAIL_OOB),

  A("grisu", GRISU_IPV4),
  AAAA("grisu", GRISU_IPV6),
  // A("backup", GRISU_IPV4, TTL("10m")),
  // AAAA("backup", GRISU_IPV6, TTL("10m")),
  // A("planet", GRISU_IPV4, TTL("10m")),
  // AAAA("planet", GRISU_IPV6, TTL("10m")),
  A("grisu.bm", GRISU_INTERNAL),
  A("grisu.oob", GRISU_OOB),

  // Database servers

  A("snap-01.ams", SNAP01_INTERNAL),
  A("snap-01.oob", SNAP01_OOB),

  A("snap-02.ucl", SNAP02_INTERNAL),
  A("snap-02.oob", SNAP02_OOB),

  A("snap-03.dub", SNAP03_INTERNAL),
  A("snap-03.oob", SNAP03_OOB),

  A("karm.ams", KARM_INTERNAL),
  A("karm.oob", KARM_OOB),

  A("eddie.ucl", EDDIE_INTERNAL),
  A("eddie.oob", EDDIE_OOB),

  A("katla.bm", KATLA_INTERNAL),
  A("katla.oob", KATLA_OOB),

  // Development server with wildcard alias for user sites

  A("faffy", FAFFY_IPV4),
  AAAA("faffy", FAFFY_IPV6),
  A("dev", FAFFY_IPV4),
  AAAA("dev", FAFFY_IPV6),
  A("*.dev", FAFFY_IPV4),
  AAAA("*.dev", FAFFY_IPV6),
  A("ooc", FAFFY_IPV4),
  AAAA("ooc", FAFFY_IPV6),
  A("a.ooc", FAFFY_IPV4),
  AAAA("a.ooc", FAFFY_IPV6),
  A("b.ooc", FAFFY_IPV4),
  AAAA("b.ooc", FAFFY_IPV6),
  A("c.ooc", FAFFY_IPV4),
  AAAA("c.ooc", FAFFY_IPV6),
  A("npe", FAFFY_IPV4),
  AAAA("npe", FAFFY_IPV6),
  A("faffy.ams", FAFFY_INTERNAL),
  A("faffy.oob", FAFFY_OOB),

  // Foundation server

  A("ridley", RIDLEY_IPV4),
  A("otrs", RIDLEY_IPV4),
  A("blog", RIDLEY_IPV4),
  A("foundation", RIDLEY_IPV4),
  A("hot", RIDLEY_IPV4),
  A("dmca", RIDLEY_IPV4),
  A("ridley.ucl", RIDLEY_INTERNAL),
  A("ridley.oob", RIDLEY_OOB),

  // Matomo server

  A("eustace", EUSTACE_IPV4),
  A("matomo", EUSTACE_IPV4),
  A("piwik", EUSTACE_IPV4),
  A("eustace.ucl", EUSTACE_INTERNAL),
  A("eustace.oob", EUSTACE_OOB),

  // Imagery servers

  A("draco", DRACO_IPV4),
  A("draco.ucl", DRACO_INTERNAL),
  A("draco.oob", DRACO_OOB),

  A("kessie", KESSIE_IPV4),
  AAAA("kessie", KESSIE_IPV6),
  A("agri", KESSIE_IPV4, TTL("1h")),
  AAAA("agri", KESSIE_IPV6, TTL("1h")),
  A("a.agri", KESSIE_IPV4, TTL("1h")),
  AAAA("a.agri", KESSIE_IPV6, TTL("1h")),
  A("b.agri", KESSIE_IPV4, TTL("1h")),
  AAAA("b.agri", KESSIE_IPV6, TTL("1h")),
  A("c.agri", KESSIE_IPV4, TTL("1h")),
  AAAA("c.agri", KESSIE_IPV6, TTL("1h")),
  A("os", KESSIE_IPV4, TTL("1h")),
  AAAA("os", KESSIE_IPV6, TTL("1h")),
  A("a.os", KESSIE_IPV4, TTL("1h")),
  AAAA("a.os", KESSIE_IPV6, TTL("1h")),
  A("b.os", KESSIE_IPV4, TTL("1h")),
  AAAA("b.os", KESSIE_IPV6, TTL("1h")),
  A("c.os", KESSIE_IPV4, TTL("1h")),
  AAAA("c.os", KESSIE_IPV6, TTL("1h")),
  A("kessie.oob", KESSIE_OOB),

  // Munin server

  A("urmel", URMEL_IPV4),
  A("munin", URMEL_IPV4),
  A("urmel.ucl", URMEL_INTERNAL),
  A("urmel.oob", URMEL_OOB),

  // Prometheus server

  A("stormfly-03", STORMFLY03_IPV4),
  AAAA("stormfly-03", STORMFLY03_IPV6),
  A("prometheus", STORMFLY03_IPV4, TTL("10m")),
  AAAA("prometheus", STORMFLY03_IPV6, TTL("10m")),
  A("stormfly-03.oob", STORMFLY03_OOB),

  // Management server

  A("idris", IDRIS_IPV4),
  AAAA("idris", IDRIS_IPV6),
  A("acme", IDRIS_IPV4),
  AAAA("acme", IDRIS_IPV6),
  A("chef", IDRIS_IPV4),
  AAAA("chef", IDRIS_IPV6),
  A("dns", IDRIS_IPV4),
  AAAA("dns", IDRIS_IPV6),
  A("git", IDRIS_IPV4),
  AAAA("git", IDRIS_IPV6),
  A("hardware", IDRIS_IPV4),
  AAAA("hardware", IDRIS_IPV6),
  A("idris.dub", IDRIS_INTERNAL),
  A("idris.oob", IDRIS_OOB),

  // Forum server

  A("clifford", CLIFFORD_IPV4),
  A("forum", CLIFFORD_IPV4, TTL("10m")),
  A("clifford.ucl", CLIFFORD_INTERNAL),
  A("clifford.oob", CLIFFORD_OOB),

  // KVMs

  A("kvm1.ucl", KVM1_INTERNAL),

  // Managed network switches

  A("switch1.ams", SWITCH1AMS_IPV4),
  AAAA("switch1.ams", SWITCH1AMS_IPV6),

  A("switch1.dub", SWITCH1DUB_IPV4),
  AAAA("switch1.dub", SWITCH1DUB_IPV6),

  // Managed power strips

  A("pdu1.ams", PDU1AMS_INTERNAL),
  A("pdu2.ams", PDU2AMS_INTERNAL),

  A("pdu1.dub", PDU1DUB_INTERNAL),
  A("pdu2.dub", PDU2DUB_INTERNAL),

  // Out of band access servers

  A("oob1.ams", OOB1AMS_INTERNAL),

  A("oob1.dub", OOB1DUB_INTERNAL),

  // Bytemark machine, and the services which operate from it

  A("shenron", SHENRON_IPV4),
  AAAA("shenron", SHENRON_IPV6),
  A("mail", SHENRON_IPV4),
  AAAA("mail", SHENRON_IPV6),
  A("mta-sts", SHENRON_IPV4),
  AAAA("mta-sts", SHENRON_IPV6),
  A("lists", SHENRON_IPV4),
  AAAA("lists", SHENRON_IPV6),
  A("help", SHENRON_IPV4),
  AAAA("help", SHENRON_IPV6),

  // Lockheed service

  A("lockheed", LOCKHEED_IPV4),
  AAAA("lockheed", LOCKHEED_IPV6),
  A("svn", LOCKHEED_IPV4),
  AAAA("svn", LOCKHEED_IPV6),
  A("trac", LOCKHEED_IPV4),
  AAAA("trac", LOCKHEED_IPV6),
  A("irc", LOCKHEED_IPV4),
  AAAA("irc", LOCKHEED_IPV6),
  A("blogs", LOCKHEED_IPV4),
  AAAA("blogs", LOCKHEED_IPV6),
  A("lockheed.ams", LOCKHEED_INTERNAL),
  A("lockheed.oob", LOCKHEED_OOB),

  // Wiki servers

  A("tabaluga", TABALUGA_IPV4),
  AAAA("tabaluga", TABALUGA_IPV6),
  A("wiki", TABALUGA_IPV4, TTL("10m")),
  AAAA("wiki", TABALUGA_IPV6, TTL("10m")),
  A("tabaluga.ams", TABALUGA_INTERNAL),
  A("tabaluga.oob", TABALUGA_OOB),

  // Overpass server

  A("gorwen", GORWEN_IPV4),
  AAAA("gorwen", GORWEN_IPV6),
  A("query", GORWEN_IPV4, TTL("10m")),
  AAAA("query", GORWEN_IPV6, TTL("10m")),
  A("gorwen.dub", GORWEN_INTERNAL),
  A("gorwen.oob", GORWEN_OOB),

  // GPS tile server

  A("noquiklos", NOQUIKLOS_IPV4),
  A("gps-tile", NOQUIKLOS_IPV4),
  A("a.gps-tile", NOQUIKLOS_IPV4),
  A("b.gps-tile", NOQUIKLOS_IPV4),
  A("c.gps-tile", NOQUIKLOS_IPV4),
  A("gps.tile", NOQUIKLOS_IPV4),
  A("gps-a.tile", NOQUIKLOS_IPV4),
  A("gps-b.tile", NOQUIKLOS_IPV4),
  A("gps-c.tile", NOQUIKLOS_IPV4),
  A("noquiklos.ucl", NOQUIKLOS_INTERNAL),
  A("noquiklos.oob", NOQUIKLOS_OOB),

  // Tile cache servers

  A("gorynych", GORYNYCH_IPV4),
  AAAA("gorynych", GORYNYCH_IPV6),
  A("trogdor", TROGDOR_IPV4),
  A("trogdor.oob", TROGDOR_OOB),
  A("ridgeback", RIDGEBACK_IPV4),
  A("ridgeback.oob", RIDGEBACK_OOB),
  A("nepomuk", NEPOMUK_IPV4),
  AAAA("nepomuk", NEPOMUK_IPV6),
  A("viserion", VISERION_IPV4),
  AAAA("viserion", VISERION_IPV6),
  A("drogon", DROGON_IPV4),
  AAAA("drogon", DROGON_IPV6),
  A("saphira", SAPHIRA_IPV4),
  AAAA("saphira", SAPHIRA_IPV6),
  A("toothless", TOOTHLESS_IPV4),
  AAAA("toothless", TOOTHLESS_IPV6),
  A("angor", ANGOR_IPV4),
  // AAAA("angor", ANGOR_IPV6),
  A("ladon", LADON_IPV4),
  AAAA("ladon", LADON_IPV6),
  A("ascalon", ASCALON_IPV4),
  A("takhisis", TAKHISIS_IPV4),
  AAAA("takhisis", TAKHISIS_IPV6),
  A("neak", NEAK_IPV4),
  A("meraxes", MERAXES_IPV4),
  AAAA("meraxes", MERAXES_IPV6),
  A("firnen", FIRNEN_IPV4),

  // Spare

  A("konqi", KONQI_IPV4),
  AAAA("konqi", KONQI_IPV6),
  A("konqi.dub", KONQI_INTERNAL),
  A("konqi.oob", KONQI_OOB),

  A("naga", NAGA_IPV4),
  AAAA("naga", NAGA_IPV6),
  A("naga.dub", NAGA_INTERNAL),
  A("naga.oob", NAGA_OOB),

  A("sarel", SAREL_IPV4),
  A("sarel.ucl", SAREL_INTERNAL),
  A("sarel.oob", SAREL_OOB),

  // Discourse server ("community")

  A("jakelong", JAKELONG_IPV4),
  AAAA("jakelong", JAKELONG_IPV6),
  A("community", JAKELONG_IPV4),
  A("communities", JAKELONG_IPV4),
  AAAA("community", JAKELONG_IPV6),
  AAAA("communities", JAKELONG_IPV6),
  A("jakelong.dub", JAKELONG_INTERNAL),
  A("jakelong.oob", JAKELONG_OOB),
  CNAME("community-cdn", "dualstack.n.sni.global.fastly.net."),

  // Donation site

  A("donate", RIDLEY_IPV4),

  // Uptime site at StatusCake

  CNAME("uptime", "uptimessl-new.statuscake.com."),

  // Custom Domain for https://github.com/osmfoundation/welcome-mat/

  CNAME("welcome", "osmfoundation.github.io."),

  // Dynamic DNS records

  DYNAMIC_RECORDS

);
