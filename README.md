
# Technical Test

## Useful information

Webhook.site :  


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
  GET /company
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `siren` | `string` | siren number of a company|

#### Get jobs in progress

```http
  GET /jobs
```


