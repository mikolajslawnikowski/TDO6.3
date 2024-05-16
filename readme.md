docker run --name container63 -e POSTGRES_PASSWORD=mysecretpassword -d postgres

docker build -t app63 .
docker run -p 3000:3000 --link container63 app63

Wyświetlenie wszystkich danych w tabeli: GET http://localhost:3000/data
Wyświetlenie n-tego wiersza w tabeli: GET http://localhost:3000/data/:id
Obliczenie średniej z pola typu liczba całkowita: GET http://localhost:3000/average