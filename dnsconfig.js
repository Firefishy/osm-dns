var REG_NONE = NewRegistrar("none");
var REG_GANDI = NewRegistrar("gandi_v5");
var PROVIDER = NewDnsProvider("cloudflare");

var DOMAIN;
var REGISTRAR;
var DYNAMIC_RECORDS;

var QUALIFY = function (name) {
  return name + "." + DOMAIN + ".";
};

function loadTemplate(template) {
  return function (domain, registrar) {
    DOMAIN = domain;
    REGISTRAR = registrar;
    DYNAMIC_RECORDS = [];

    for (var i = 2; i < arguments.length; i++) {
      DYNAMIC_RECORDS = DYNAMIC_RECORDS.concat(arguments[i]);
    }

    require("src/" + template + ".js");
  };
}

require("src/hosts.js");

var OPENSTREETMAP = loadTemplate("openstreetmap");

require("include/sshfp.js");
require("include/nominatim.js");

try {
  require("include/geo.js");
} catch (e) {
  var GEO_NS_RECORDS = [];
}

OPENSTREETMAP_ORG_RECORDS = [
  CNAME("_acme-challenge.tile", "bxve5ryiwwv7woiraq.fastly-validations.com.", TTL("10m"))
]

OSM_ORG_RECORDS = [
  CNAME("_acme-challenge.tile", "21gvdfyyxjoc4lmsem.fastly-validations.com.", TTL("10m"))
]

OPENSTREETMAP("openstreetmap.org", REG_GANDI, OPENSTREETMAP_ORG_RECORDS, SSHFP_RECORDS, GEO_NS_RECORDS, NOMINATIM_RECORDS);
OPENSTREETMAP("openstreetmap.com", REG_GANDI);
OPENSTREETMAP("openstreetmap.net", REG_GANDI);
OPENSTREETMAP("openstreetmap.ca", REG_GANDI);
OPENSTREETMAP("openstreetmap.eu", REG_NONE);
OPENSTREETMAP("openstreetmap.pro", REG_GANDI);
OPENSTREETMAP("openstreetmap.gay", REG_GANDI);
OPENSTREETMAP("openstreetmaps.org", REG_GANDI);
OPENSTREETMAP("osm.org", REG_GANDI, OSM_ORG_RECORDS, SSHFP_RECORDS);
OPENSTREETMAP("openmaps.org", REG_GANDI);
OPENSTREETMAP("openstreetmap.io", REG_GANDI);
OPENSTREETMAP("osm.io", REG_GANDI);
OPENSTREETMAP("openstreetmap.li", REG_GANDI);
OPENSTREETMAP("openworldmap.org", REG_GANDI);
OPENSTREETMAP("freeosm.org", REG_GANDI);
OPENSTREETMAP("open-maps.org", REG_GANDI);
OPENSTREETMAP("open-maps.com", REG_GANDI);
OPENSTREETMAP("osmbugs.org", REG_GANDI);
OPENSTREETMAP("openstreetmap.ai", REG_GANDI);
OPENSTREETMAP("openstreetmap.am", REG_GANDI);
OPENSTREETMAP("openstreetmap.fi", REG_GANDI);
OPENSTREETMAP("openstreetmap.gr", REG_GANDI);
OPENSTREETMAP("openstreetmap.me", REG_GANDI);
OPENSTREETMAP("openstreetmap.mx", REG_GANDI);
OPENSTREETMAP("openstreetmap.nz", REG_GANDI);
OPENSTREETMAP("openstreetmap.pe", REG_GANDI);
OPENSTREETMAP("openstreetmap.ph", REG_GANDI);
OPENSTREETMAP("openstreetmap.sg", REG_GANDI);
OPENSTREETMAP("openstreetmap.tv", REG_GANDI);
OPENSTREETMAP("openstreetmap.wales", REG_GANDI);
OPENSTREETMAP("openstreetmapdata.org", REG_GANDI);
// Disable due to registration issue
// OPENSTREETMAP("openstreetmap.al", REG_NONE);

var OSM_LI = loadTemplate("osm-li");

OSM_LI("osm.li", REG_GANDI);

var OPENSTREETMAP_UK = loadTemplate("openstreetmap-uk");

OPENSTREETMAP_UK("openstreetmap.uk", REG_GANDI);
OPENSTREETMAP_UK("openstreetmap.org.uk", REG_GANDI);
OPENSTREETMAP_UK("openstreetmap.co.uk", REG_GANDI);

var OPENSTREETMAP_ZA = loadTemplate("openstreetmap-za");

OPENSTREETMAP_ZA("openstreetmap.org.za", REG_NONE);
OPENSTREETMAP_ZA("osm.org.za", REG_NONE);

var OSMFOUNDATION = loadTemplate("osmfoundation");

OSMFOUNDATION("osmfoundation.org", REG_GANDI);

var STATEOFTHEMAP = loadTemplate("stateofthemap");

STATEOFTHEMAP("stateofthemap.org", REG_GANDI);
STATEOFTHEMAP("stateofthemap.com", REG_GANDI);
STATEOFTHEMAP("sotm.org", REG_GANDI);


// Domain Owner Issue / Registration Issues - Disable for the moment. 31 May 2021
// var STATEOFTHEMAP_EU = loadTemplate("stateofthemap-eu");
// STATEOFTHEMAP_EU("stateofthemap.eu", REG_GANDI);

var OPENGEODATA = loadTemplate("opengeodata");
OPENGEODATA("opengeodata.org", REG_GANDI);

var SWITCH2OSM = loadTemplate("switch2osm");

SWITCH2OSM("switch2osm.org", REG_GANDI);
SWITCH2OSM("switch2osm.com", REG_GANDI);

var OSM2PGSQL = loadTemplate("osm2pgsql");

OSM2PGSQL("osm2pgsql.org", REG_GANDI);
OSM2PGSQL("osm2pgsql.com", REG_GANDI);

var IDEDITOR = loadTemplate("ideditor");

IDEDITOR("ideditor.com", REG_GANDI);

var PTR_EQUINIX_DUB_IPV4 = loadTemplate("ptr_equinix_dub_ipv4");

PTR_EQUINIX_DUB_IPV4("96-27.226.104.184.in-addr.arpa", REG_NONE);

var PTR_EQUINIX_DUB_IPV6 = loadTemplate("ptr_equinix_dub_ipv6");

PTR_EQUINIX_DUB_IPV6(REV("2001:470:1:b3b::/64"), REG_NONE);
