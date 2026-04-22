export async function handler(event) {
  const config = [
    {
      "dns": {
        "servers": [
          {
            "address": "1.1.1.1",
            "skipFallback": false
          }
        ],
        "tag": "dns_out"
      },
      "inbounds": [
        {
          "listen": "127.0.0.1",
          "port": 10808,
          "protocol": "socks",
          "settings": {
            "auth": "noauth",
            "udp": true,
            "userLevel": 8
          },
          "sniffing": {
            "destOverride": ["http", "tls"],
            "enabled": true
          },
          "tag": "socks"
        },
        {
          "listen": "127.0.0.1",
          "port": 10809,
          "protocol": "http",
          "settings": {
            "userLevel": 8
          },
          "tag": "http"
        }
      ],
      "log": {
        "dnsLog": false,
        "loglevel": "warning"
      },
      "outbounds": [
        {
          "protocol": "vless",
          "settings": {
            "vnext": [
              {
                "address": "at.titun.su",
                "port": 443,
                "users": [
                  {
                    "id": "a44a6111-be40-4a96-8947-cb82fe37723b",
                    "encryption": "none",
                    "flow": "xtls-rprx-vision"
                  }
                ]
              }
            ]
          },
          "streamSettings": {
            "network": "tcp",
            "security": "reality",
            "realitySettings": {
              "serverName": "pogovorim.su",
              "publicKey": "1vSZjvhZO01oAEH3b7eebR1qF5dLU1Dq2E7xu8pwGSs",
              "shortId": "428ef87fd47a3a32",
              "fingerprint": "chrome"
            },
            "tcpSettings": {}
          },
          "tag": "proxy"
        },
        {
          "protocol": "freedom",
          "tag": "direct"
        },
        {
          "protocol": "blackhole",
          "tag": "block"
        }
      ],
      "remarks": "🇦🇹 TEST VPN",
      "routing": {
        "domainStrategy": "IPIfNonMatch",
        "rules": [
          {
            "ip": [
              "127.0.0.0/8",
              "10.0.0.0/8",
              "172.16.0.0/12",
              "192.168.0.0/16",
              "::1/128",
              "fc00::/7",
              "fe80::/10"
            ],
            "outboundTag": "direct",
            "type": "field"
          }
        ]
      },
      "stats": {}
    }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(config)
  };
}
