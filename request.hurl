POST http://127.0.0.1:3000/send-email
{
  "subject": "TEST SUBJECT",
  "message": "TEST MESSAGE",
  "from": "jonah",
  "returnAddress": "xxxyyyzzz@gmail.com"
}
HTTP 200
[Asserts]
jsonpath "$.success" == "true"