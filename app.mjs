// import AWS from 'aws-sdk';
// const ses = new AWS.SES({ region: 'us-east-1' });
import { validatePostBody, errorResponse } from "./response/response.mjs";

const RECIPIENT = "jonahbutler6@gmail.com";

export const handler = async (event) => {

  console.log("hit function handler");

  const body = JSON.parse(event.body);

  console.log("the body", body);

  const response = validatePostBody(body);

  if (!response.valid) {
    const message = `The following properties are missing or do not include required data: ${response.missing.join(", ")}`;
    return errorResponse(422, message);
  }

  const {subject, message} = body;

  const params = {
    Source: RECIPIENT,
    Destination: {
      ToAddresses: [RECIPIENT],
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Text: {
          Data: message,
        }
      },
    },
  };

  // try {
  //   const result = await ses.sendEmail(params).promise();
  //   console.log("result", result);
  // } catch(error) {
  //   console.log("got an error", error);
  // }

  return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json', // Define the Content-Type
      },
      body: JSON.stringify({
          success: "true",
      }),
  };
};
