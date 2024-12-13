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

