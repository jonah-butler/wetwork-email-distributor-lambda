POST http://127.0.0.1:3000/hello
{
  "subject": "TEST",
  "message": "TEST MESSAGE",
  "from": "Jonah",
  "returnAddress": "jonahbutler6@gmail.com"
}

POST http://127.0.0.1:3000/hello
{
  "subject": "TEST",
  "message": "TEST MESSAGE",
  "from": "Jonah",
  "returnAddress": ""
}
HTTP 422
[Asserts]
jsonpath "$.message" == "The following properties are missing or do not include required data: returnAddress"

POST http://127.0.0.1:3000/hello
{
  "subject": "TEST",
  "returnAddress": "test"
}
HTTP 422
[Asserts]
jsonpath "$.message" == "The following properties are missing or do not include required data: message, from"