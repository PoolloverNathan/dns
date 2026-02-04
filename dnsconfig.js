// vim: ts=4 sts=0 sw=0 et fdm=marker
var DSP_CF = NewDnsProvider("cf")
var REG_CHANGEME = NewRegistrar("none")

D("pool.net.eu.org", REG_CHANGEME,
    DnsProvider(DSP_CF),
    DefaultTTL(1),

    A("local", "127.0.0.1", TTL(60)),
    //{{{1 Mine
    //{{{2 Various things
    CNAME("cache", "h.pool.net.eu.org.", CF_PROXY_ON),
    CNAME("chat", "h.pool.net.eu.org.", CF_PROXY_ON),
    CNAME("cs", "h.pool.net.eu.org.", CF_PROXY_ON),
    CNAME("docker", "h.pool.net.eu.org."),
    CNAME("figura", "h.pool.net.eu.org.", TTL(60)),
    CNAME("phone", "h.pool.net.eu.org.", CF_PROXY_ON),
    CNAME("vsc", "h.pool.net.eu.org.", TTL(60)),
    //{{{2 Mail
    TXT("@", "\"v=spf1 ip4:188.245.112.169 -all\""),
    MX("@", 10, "mail.pool.net.eu.org."),
    //{{{2 Verification
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
D_EXTEND("_radicle-node._tcp.pool.net.eu.org",
    PTR("_radicle-node._tcp", "seed._radicle-node._tcp.pool.net.eu.org."), // not what PTR is for, but ok
    SRV("seed", 1, 1, 8776, "pool.net.eu.org."),
    TXT("seed", "nid=z6Mkh3MbEZxUvVrCDJ2rJ23V33ptNgJTjm3ChumQSewJb454")
)

var MY_IP$ = FETCH("https://myip.wtf", { headers: { Accept: "text/plain", "User-Agent": "curl" } }).then(function(res) { return res.text() })
var MY_IP4$ = FETCH("https://4.myip.wtf", { headers: { Accept: "text/plain", "User-Agent": "curl" } }).then(function(res) { return res.text() })
var MY_IP6$ = FETCH("https://6.myip.wtf", { headers: { Accept: "text/plain", "User-Agent": "curl" } }).then(function(res) { return res.text() })
MY_IP4$.then(function(ip4) {
    D_EXTEND("pool.net.eu.org",
        A("*", ip4.trim()),
        A("@", ip4.trim()),
    )
})
MY_IP6$.then(function(ip6) {
    console.log("here")
    D_EXTEND("pool.net.eu.org",
        AAAA("*", ip6.trim()),
        AAAA("@", ip6.trim()),
    )
})
