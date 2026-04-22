exports.handler = async function (event) {
  try {
    const key = event.queryStringParameters?.key;

    if (!key) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          error: "no key"
        })
      };
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
    const configUrl = process.env.CONFIG_URL;

    if (!supabaseUrl || !supabaseKey || !configUrl) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          error: "env not set"
        })
      };
    }

    const userRes = await fetch(
      `${supabaseUrl}/rest/v1/users?subscription_key=eq.${encodeURIComponent(key)}&select=telegram_id,subscription_key,status,expires_at`,
      {
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const users = await userRes.json();

    if (!Array.isArray(users) || users.length === 0) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          error: "no active access"
        })
      };
    }

    const user = users[0];

    if (user.status !== "active") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          error: "no active access"
        })
      };
    }

    if (!user.expires_at || new Date(user.expires_at) < new Date()) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          error: "subscription expired"
        })
      };
    }

    const configRes = await fetch(configUrl);
    const configText = await configRes.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      },
      body: configText
    };
  } catch (e) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        error: "function error",
        message: String(e)
      })
    };
  }
};
