# Start with an official Python runtime
FROM python:3.6

# Add a backend directory
WORKDIR /app/backend

# Install Python dependencies
COPY requirements.txt /app/backend
RUN pip3 install --upgrade pip -r requirements.txt

# Add the rest of the code
COPY . /app/backend

# Make port 8000 available for the app
EXPOSE 8000

# Run the server. The host has to be 0.0.0.0 or the browser
# won't be able to find it.
CMD python3 manage.py runserver 0.0.0.0:8000