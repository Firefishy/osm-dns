OpenStreetMap DNS
======================================

This repository contains the DNS zone templates and related code for managing OpenStreetMap.org and other domain names. The full list of domains managed by this repo are in the [dnsconfig.js](dnsconfig.js) file.

## Standard DNS Zone Files

We use [dnscontrol](https://stackexchange.github.io/dnscontrol/) to manage OpenStreetMap DNS. A set of wrapper scripts are used, which are called from the [Makefile](Makefile)

Merges to the master branch trigger a git [post-receive](https://github.com/openstreetmap/chef/blob/master/cookbooks/dns/files/default/post-receive) which runs `make update` via a [script](https://github.com/openstreetmap/chef/blob/master/cookbooks/dns/templates/default/dns-update.erb), the DNS is then updated by dnscontrol.

## GeoDNS Zones

For GeoDNS zones we use [gdnsd](https://gdnsd.org/) with gdnsd config files generated by scripts called from the [Makefile](Makefile) file.
