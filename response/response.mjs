export const errorResponse = (statusCode, message) => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  };
}

const requiredFields = ["subject", "message", "from", "returnAddress"];

export const validatePostBody = (body) => {
  const missing = [];
  const bodyKeys = Object.keys(body);

  for(const field of requiredFields) {
    const valid = bodyKeys.includes(field);
    if(!valid) {
      missing.push(field);
    }

    if (valid) {
      const hasData = body[field] !== "";

      if (!hasData) {
        missing.push(field);
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
};

export const generateEmail = (from, returnAddress, message) => {
  return `
          <html>
            <head>
              <style>
                body { font-family: Helvetica, sans-serif; }
                .header { color: #3a3939; font-size: 12px; margin-bottom: 10px; }
                .content { margin: 10px 0; }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  New message from: <strong>${from}</strong>
                </div>
                <div>
                  -------------------------
                </div>
                <div>
                Reply to: <strong>${returnAddress}</strong>
                </div>
              </div>
              <div class="content">
                <div>
                  -------------------------
                </div>
                ${message}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>
              <div>                               
                <img src="https://i.imgur.com/x1RBqEP.png" />
              </div>
            </body>
          </html>
          `
};

