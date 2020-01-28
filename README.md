# search-tunes

### Setup

Make sure that you have the following installed:
- .Net Core SDK 3.1.101
- Node.js v 12.14.1

After Installing the above, clone the project, and cd into 'search-tones.'
Then in a terminal run:
```
dotnet restore
```
then:
```
cd ClientApp
npm install
```

Make sure that you have postgres running locally, and adjust the connection string to the appropraite server running on your machin at:
```
SearchTunes/appsettings.json => "ConnectionStrings": {"Context":""}
```

Now run:
```
dotnet ef database update
```
This will create the database in accordance to the latest migration

Now run the project
```
dotnet run
```

And open a browser to http://localhost:5000/

