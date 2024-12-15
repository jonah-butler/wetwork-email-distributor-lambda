import AWS from 'aws-sdk';
const ses = new AWS.SES({ region: 'us-east-1' });
import { validatePostBody, errorResponse, generateEmail } from "./response/response.mjs";

export const handler = async (event) => {

  const SENDER = process.env.SENDER;
  const RECIPIENT = process.env.SENDER;

  if(!SENDER || !RECIPIENT) {
    return errorResponse(400, "Environment incomplete");
  }

  const body = JSON.parse(event.body);

  const response = validatePostBody(body);

  if (!response.valid) {
    const message = `The following properties are missing or do not include required data: ${response.missing.join(", ")}`;
    return errorResponse(422, message);
  }

  const {subject, message, from, returnAddress} = body;

  const params = {
    Source: SENDER,
    Destination: {
      ToAddresses: [RECIPIENT],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: generateEmail(from, returnAddress, message),
        }
      },
    },
    ReplyToAddresses: [returnAddress],
  };

  try {
    await ses.sendEmail(params).promise();
  } catch(error) {
    return errorResponse(400, "Failed to send email: " + error.message);
  }

  return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          success: "true",
      }),
  };
};
