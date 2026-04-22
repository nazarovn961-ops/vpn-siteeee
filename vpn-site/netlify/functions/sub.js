export async function handler(event) {
  const config = [
    {
      "remarks": "TEST VPN",
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
        }
      ]
    }
  ];

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(config)
  };
}
