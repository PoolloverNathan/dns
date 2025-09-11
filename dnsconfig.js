var DSP_CF = NewDnsProvider("cf")
var REG_CHANGEME = NewRegistrar("none")

var MY_IP$ = FETCH("https://ip.wtf", { headers: { Accept: "text/plain" } }).then(function(res) { return res.text() })
MY_IP$.then(function(ip) {
	ip = ip.trim()
	D("pool.net.eu.org", REG_CHANGEME,
		DnsProvider(DSP_CF),
		DefaultTTL(1),

		// Various things
		A("eizel", "1.123.163.214"),
		A("ender", "50.108.247.154"),
		A("local", "127.0.0.1", TTL(60)),
		A("mar", "73.183.75.45", TTL(60)),
		A("*", ip),
		A("@", ip),
		A("q", "50.92.163.215"),
		A("xqoz", "209.212.36.167", TTL(120)),

		// Maven
		TXT("_dnslink.maven", "\"dnslink=/ipns/k51qzi5uqu5dm13gjm40nv9ii9kifawae4f3upf23soytez54i4588v6kb1uw3\""),
		//A("maven", "209.94.90.3", CF_PROXY_ON),
		//A("maven", "209.94.90.2", CF_PROXY_ON),
		
		// My stuff
		CNAME("cache", "h.pool.net.eu.org.", CF_PROXY_ON),
		CNAME("chat", "h.pool.net.eu.org.", CF_PROXY_ON),
		CNAME("cs", "h.pool.net.eu.org.", CF_PROXY_ON),
		CNAME("docker", "h.pool.net.eu.org."),
		CNAME("figura", "h.pool.net.eu.org.", TTL(60)),
		CNAME("phone", "h.pool.net.eu.org.", CF_PROXY_ON),
		CNAME("vsc", "h.pool.net.eu.org.", TTL(60)),
		CNAME("mavensburg", "q.pool.net.eu.org."),

		// Minecraft servers
		SRV("_minecraft._tcp.a2z", 1, 1, 25565, "ender.pool.net.eu.org."),
		SRV("_minecraft._tcp.and", 1, 1, 39781, "vsc.pool.net.eu.org."),
		SRV("_minecraft._tcp.evil.and", 1, 1, 39782, "vsc.pool.net.eu.org."),
		SRV("_minecraft._tcp.aotr", 1, 1, 42625, "vsc.pool.net.eu.org."),
		SRV("_minecraft._tcp.dorm", 1, 1, 9246, "eizel.pool.net.eu.org."),
		SRV("_minecraft._tcp.florasplash", 0, 0, 56271, "florasplash.pool.net.eu.org.", TTL(60)),

		// Email
		TXT("_dmarc", "\"v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; rua=mailto:nathan.kulzer@protonmail.com\""),
		TXT("@", "\"v=spf1 -all\""),
		TXT("*._domainkey", "\"v=DKIM1; p=\""),

		// Discord verification
		TXT("@", "\"tcu5s0chyl\""),
		TXT("_discord", '"dh=37a48a6b09bba850e08522dac7152c5a252faea9"'),
	)
})
