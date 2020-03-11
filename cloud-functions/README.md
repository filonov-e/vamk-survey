# MySQL REST Api server (NodeJS)

## Installation
1. `yarn install`
2. Create environment file `.env` with your credentials
3. `yarn start`

## Environment file
```
PORT=<PORT NUMBER>
DB_HOST=<HOST OF YOUR MYSQL DATABASE>
DB_USER=<USERNAME FOR THE DATABASE>
DB_PWD=<PASSWORD FOR THE DATABASE>
DB_NAME=<DATABASE NAME>
```

## End-points

- Get all surveys: 
    + method: `GET`
    + path: `/getSurveys`
    + format:
        ```
        {
            id: number,
            name: string,
            stepContent: string,    // csv array
            optionalSteps: string   // csv array
        }
        ```

