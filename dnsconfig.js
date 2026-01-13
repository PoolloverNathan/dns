// vim: ts=4 sts=0 sw=0 et fdm=marker
var DSP_CF = NewDnsProvider("cf")
var REG_CHANGEME = NewRegistrar("none")

var MY_IP$ = FETCH("https://myip.wtf", { headers: { Accept: "text/plain", "User-Agent": "curl" } }).then(function(res) { return res.text() })
MY_IP$.then(function(ip) {
    ip = ip.trim()
    D("pool.net.eu.org", REG_CHANGEME,
        DnsProvider(DSP_CF),
        DefaultTTL(1),

        //{{{1 Oddities
        //{{{2 Various things
        A("local", "127.0.0.1", TTL(60)),
        A("*", ip),
        A("@", ip),
        //{{{1 Mine
        //{{{2 Various things
        CNAME("cache", "h.pool.net.eu.org.", CF_PROXY_ON),
        CNAME("chat", "h.pool.net.eu.org.", CF_PROXY_ON),
        CNAME("cs", "h.pool.net.eu.org.", CF_PROXY_ON),
        CNAME("docker", "h.pool.net.eu.org."),
        CNAME("figura", "h.pool.net.eu.org.", TTL(60)),
        CNAME("phone", "h.pool.net.eu.org.", CF_PROXY_ON),
        CNAME("vsc", "h.pool.net.eu.org.", TTL(60)),
        //{{{2 Anti-email
        //TXT("_dmarc", "\"v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; rua=mailto:nathan.kulzer@protonmail.com\""),
        //TXT("@", "\"v=spf1 -all\""),
        //TXT("*._domainkey", "\"v=DKIM1; p=\""),
        //{{{2 Verification
        TXT("git", "https://github.com/PoolloverNathan"),
        TXT("@", "tcu5s0chyl"),
        TXT("@", "abuseipdb-verification=y3TbgCsT"),
        TXT("_discord", "dh=37a48a6b09bba850e08522dac7152c5a252faea9"),
        TXT("_discord", "dh=36757e6dc48db5fff8578eee766d16907a426e68"),
        //{{{2 & server
        SRV("_minecraft._tcp.and", 1, 1, 39781, "vsc.pool.net.eu.org."),
        //{{{1 Others
        //{{{2 Mavensburg
        A("q", "75.154.230.93"),
        CNAME("mavensburg", "q.pool.net.eu.org."),
        //{{{2 Eizel
        A("eizel", "121.218.234.95"),
        SRV("_minecraft._tcp.dorm", 1, 1, 9246, "eizel.pool.net.eu.org."),
        //{{{2 Figura MSMP
        A("figura-msmp-ip", "185.83.152.76"),
        SRV("_minecraft._tcp.figura-msmp", 1, 1, 25566, "figura-msmp-ip.pool.net.eu.org."),
        //}}}1
    )
})
