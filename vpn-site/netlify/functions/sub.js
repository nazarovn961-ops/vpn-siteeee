exports.handler = async (event) => {
  try {
    const key = event.queryStringParameters?.key;

    if (!key) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: "[]"
      };
    }

    const res = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/users?subscription_key=eq.${encodeURIComponent(key)}&select=*`,
      {
        headers: {
          "apikey": process.env.SUPABASE_SERVICE_KEY,
          "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const users = await res.json();

    if (!Array.isArray(users) || users.length === 0) {
      return {
        statusCode: 200,
        body: "[]"
      };
    }

    const user = users[0];

    if (user.status !== "active") {
      return {
        statusCode: 200,
        body: "[]"
      };
    }

    if (!user.expires_at || new Date(user.expires_at) < new Date()) {
      return {
        statusCode: 200,
        body: "[]"
      };
    }

    const configRes = await fetch(process.env.CONFIG_URL);
    const config = await configRes.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: config
    };

  } catch (e) {
    return {
      statusCode: 200,
      body: "[]"
    };
  }
};
