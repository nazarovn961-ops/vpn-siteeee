exports.handler = async function () {
  const config = [
    {
      "dns": {
        "servers": [
          "1.1.1.1"
        ]
      },
      "inbounds": [
        {
          "listen": "127.0.0.1",
          "port": 10808,
          "protocol": "socks",
          "settings": {
            "auth": "noauth",
            "udp": true
          },
          "tag": "socks"
        },
        {
          "listen": "127.0.0.1",
          "port": 10809,
          "protocol": "http",
          "settings": {},
          "tag": "http"
        }
      ],
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
            }
          },
          "tag": "proxy"
        },
        {
          "protocol": "freedom",
          "tag": "direct"
        }
      ],
      "routing": {
        "domainStrategy": "IPIfNonMatch",
        "rules": []
      },
      "remarks": "TEST AUSTRIA"
    }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(config)
  };
};
