# Challenge Weather Api
###### Autor: Charles Rodríguez
## Api Running in heroku ~>

<a target="_blank" rel="noopener noreferrer" href="https://weather-api-charles.herokuapp.com/v1">
<img src="https://tiansss.github.io/img/heroku.png" alt="" style="max-width:100%;margin: auto;display: block;">
</a>
<a target="_blank" rel="noopener noreferrer" href="https://weather-api-charles.herokuapp.com/v1">
<img src="https://img.favpng.com/14/5/8/logo-node-js-heroku-scalable-vector-graphics-font-png-favpng-kRgbJRPKs2FdgHTuPaeu4Ec61.jpg" alt="" style="max-width:100%;margin: auto;display: block;">
</a>

## Instalación
1. clona el repositorio de Soup Api:
```
git clone git@github.com:charlescart/weather-api.git
```

2. instalar paquetes de npm:
```
npm i
```

3. basado en el archivo `.env.example` ubicado en la raiz del proyecto generar un archivo `.env` y guardar igualmente en la raíz del proyecto.
```
.env.example => .env
```
4. ejecutar a traves de tu consola ubicado en la carpeta del proyecto el comando `npm start` para levantar el api y para confirmar que efectivamente el api fué levantada exitosamente dirigiendote a traves de tu navegador a `http://localhost:8086/api`:
```
npm start
```
<a target="_blank" rel="noopener noreferrer" href="https://weather-api-charles.herokuapp.com/v1">
<img src="https://img.favpng.com/14/5/8/logo-node-js-heroku-scalable-vector-graphics-font-png-favpng-kRgbJRPKs2FdgHTuPaeu4Ec61.jpg" alt="" style="max-width:100%;margin: auto;display: block;">
</a>


5. Para generar la transpilacion de TypeScript a Js a traves de la consola ubicados en la raiz del proyecto lanzar el comando `npm run tsc`. El transpilado se genera en la raiz del proyecto especificamente en la carpeta dist `/dist`.
<br>***Nota: este paso es opcional y solo si quieres ver el codigo compilado.***

> # Como usar
***coleccion de Postman del Api***
<br> [Documentación Detallada Online](https://documenter.getpostman.com/view/11620246/Szzg8yR1)
<br> [Backup de Postman](https://documenter.getpostman.com/view/11620246/Szzg8yR1)
>
***Ejemplo #1:*** Obtiene informacion del clima a traves de geolocalizacion de IP.
<br> Metodo ***GET***
```
localhost:8086/v1/location
```
Respuesta:
```
{
    "clientIp": "186.122.141.220",
    "infoFromYourIp": {
        "city": "Martin Coronado",
        "country": "AR",
        "coord": {
            "lat": -34.5708,
            "lon": -58.6243
        }
    },
    "weather": {
        "climateReferenceZone": "Hurlingham",
        "country": "AR",
        "coord": {
            "lat": -34.5883,
            "lon": -58.6391
        },
        "forescast": {
            "2020-07-13": {
                "12:00:00": {
                    "tempMax": 7.95,
                    "tempMin": 7.61,
                    "feelsLike": 2.49,
                    "description": "nubes",
                    "temperatureUnit": "Celsius"
                },
                "15:00:00": {
                    "tempMax": 9.69,
                    "tempMin": 9.38,
                    "feelsLike": 3.5,
                    "description": "nubes rotas",
                    "temperatureUnit": "Celsius"
                },
                "18:00:00": {
                    "tempMax": 11.18,
                    "tempMin": 10.99,
                    "feelsLike": 4.96,
                    "description": "nubes dispersas",
                    "temperatureUnit": "Celsius"
                },
                "21:00:00": {
                    "tempMax": 9.77,
                    "tempMin": 9.76,
                    "feelsLike": 4.51,
                    "description": "cielo claro",
                    "temperatureUnit": "Celsius"
                }
            },
            ......
        }
    }
}
```

>
***Ejemplo #2:*** Obtiene el pronostico del clima de una ciudad en especifico hasta 5 dias. El parametro City es opcional, si no se suministra una ciudad intentará localizar la geolocalización de su IP.
<br> Metodo ***GET***
```
localhost:8086/v1/current/:city?
```
Respuesta:
```
{
    "city": "Buenos Aires",
    "country": "AR",
    "coord": {
        "lon": -58.38,
        "lat": -34.61
    },
    "temp": 8.93,
    "tempMax": 9.44,
    "tempMin": 8.33,
    "feelsLike": 4.34,
    "description": "nubes"
}
```

>
***Ejemplo #3:*** Obtiene el pronostico del clima de una ciudad en especifico hasta 5 dias. El parametro City es opcional, si no se suministra una ciudad intentará localizar la geolocalización de su IP.
<br> Metodo ***GET***
```
localhost:8086/v1/forecast/:city?
```
Respuesta:
```
{
    "climateReferenceZone": "Caracas",
    "country": "VE",
    "coord": {
        "lat": 10.488,
        "lon": -66.8792
    },
    "forescast": {
        "2020-07-13": {
            "12:00:00": {
                "tempMax": 21.32,
                "tempMin": 20.93,
                "feelsLike": 22.72,
                "description": "nubes dispersas",
                "temperatureUnit": "Celsius"
            },
            "15:00:00": {
                "tempMax": 26.37,
                "tempMin": 25.12,
                "feelsLike": 26.77,
                "description": "nubes rotas",
                "temperatureUnit": "Celsius"
            },
            "18:00:00": {
                "tempMax": 27.55,
                "tempMin": 27.1,
                "feelsLike": 29.36,
                "description": "lluvia ligera",
                "temperatureUnit": "Celsius"
            },
            "21:00:00": {
                "tempMax": 24.78,
                "tempMin": 24.75,
                "feelsLike": 28.37,
                "description": "lluvia ligera",
                "temperatureUnit": "Celsius"
            }
        },
        .......
    }
}
```

> # Ejecución de test unitarios
1. ejecutar los test unitarios desarrollados con Jest, a traves de tu consola ejecuta:
```
npm t
```
salida:
<a target="_blank" rel="noopener noreferrer" href="https://weather-api-charles.herokuapp.com/v1">
<img src="https://img.favpng.com/14/5/8/logo-node-js-heroku-scalable-vector-graphics-font-png-favpng-kRgbJRPKs2FdgHTuPaeu4Ec61.jpg" alt="" style="max-width:100%;margin: auto;display: block;">
</a>

2. ejecutar ***coverage*** con Jest:
```
npm run test:coverage
```
salida:
<a target="_blank" rel="noopener noreferrer" href="https://weather-api-charles.herokuapp.com/v1">
<img src="https://img.favpng.com/14/5/8/logo-node-js-heroku-scalable-vector-graphics-font-png-favpng-kRgbJRPKs2FdgHTuPaeu4Ec61.jpg" alt="" style="max-width:100%;margin: auto;display: block;">
</a>

Nota: una vez generado el coverage con Jest podrá ir a la raiz del proyecto y dirigirse a:  `/coverage/lcov-report/index.html` y abrir el ***index.html*** con su navegador, así podrá tener una mejor detalle del coverage generado por Jest. 
<a target="_blank" rel="noopener noreferrer" href="https://weather-api-charles.herokuapp.com/v1">
<img src="https://img.favpng.com/14/5/8/logo-node-js-heroku-scalable-vector-graphics-font-png-favpng-kRgbJRPKs2FdgHTuPaeu4Ec61.jpg" alt="" style="max-width:100%;margin: auto;display: block;">
</a>