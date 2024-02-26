
# Technical Test

## Useful information

Webhook.site :  https://webhook.site/#!/view/5c61e375-f111-4de8-ab79-06e8ad73b054/49f5b1c3-f828-4049-92e4-cf5ffa9644c4/1


## Run Locally

Clone the project

```bash
  git clone https://github.com/BenGregory23/test_technique
```


Build Docker image 

```bash
  docker build -t test_technique .
```

Run Docker container
```bash
  docker run -p 3000:8080 test_technique
```

Go to 

```bash
http://localhost:3000
```


## API Reference

#### Get company

```http
  GET /company?siren=123456789
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `siren` | `string` | siren number of a company|

#### Get jobs in progress

```http
  GET /jobs
```


