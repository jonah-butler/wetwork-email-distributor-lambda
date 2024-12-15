POST http://127.0.0.1:3000/send-email
{
  "subject": "TEST SUBJECT",
  "message": "TEST MESSAGE",
  "from": "jonah",
  "returnAddress": "xxxyyyzzz@gmail.com"
}

POST http://127.0.0.1:3000/send-email
{
  "subject": "TEST SUBJECT",
  "message": "TEST MESSAGE",
  "from": "jonah",
  "returnAddress": ""
}

HTTP 422
[Asserts]
jsonpath "$.message" == "The following properties are missing or do not include required data: returnAddress"

POST http://127.0.0.1:3000/send-email
{
  "subject": "TEST SUBJECT",
  "returnAddress": "xxxyyyzzz@gmail.com"
}

HTTP 422
[Asserts]
jsonpath "$.message" == "The following properties are missing or do not include required data: message, from"