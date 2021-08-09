function WeatherAppViewModel() {
    var self = this;
    const apiKey = 'c918647878d1f020d5c226f15183e169';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${'Sarajevo'}&units=metric&appid=${apiKey}`;

    // Properties
    self.city = ko.observable("Sarajevo");
    self.country = ko.observable("Bosnia and Herzegovina");
    self.temperature = ko.observable("0");
    self.windSpeed = ko.observable("0");
    self.weatherInfo = ko.observable("Clear");
    self.iconUrl = ko.observable("http://openweathermap.org/img/wn/");

    // API Call
    self.fetchWeather = function() {
        fetch(weatherApiUrl)
            .then(response => {
                if (response.status !== 200) {
                    alert('Error fetching data!');
                    return;
                }

                return response.json();
            })
            .then(data => {
                console.log(data);
                self.temperature(Math.round(data.main.feels_like));
                self.windSpeed(Math.round(data.wind.speed));
                self.weatherInfo(data.weather[0].description);
                let iconUrl = self.iconUrl();
                self.iconUrl(`${iconUrl}${data.weather[0].icon}.png`);
            });
    }

    self.fetchWeather();
}

const weatherApp = document.querySelector("#knockout-app");
ko.applyBindings(new WeatherAppViewModel(), weatherApp);