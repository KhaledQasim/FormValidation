# FormValidation
Displays the best code security practices when it comes to running a complex form.

# How to Run

## Fast-api
### Recomended Install
Install
```
pipx
```
https://github.com/pypa/pipx

Then use Pipx to install poetry.

```
pipx install poetry
```

Then navigate into the backend folder, and once there, run this command to enter Poetry's virtual environment.
```
poetry shell
```

Then run this command to install the back-end requirements.
```
poetry install
```

Then, to run the server,
```
uvicorn app.main:app --reload
```

## React Front-end

Install node.js and npm on your machine.

Then navigate into the frontend folder and run
```
npm install
```
That should install all the needed packages.

Then run to start the server.

```
npm run dev
```
Then in a different terminal run this command

```
npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```
Now the Front-end site should be running at 

```
http://localhost:5173/
```

# Test Users 

We are using a SQLLite database, which will come with some test data to allow you to login and view previously submitted forms.

Username:

```
bob
```

email:

```
bob@gmail.com
```

password:

```
Password123???
```

# Run pyhton unit tests

Please install pytest to run these test.
Navigate to the backend folder and run

```
pytest -vv
```

