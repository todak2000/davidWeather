class WeatherService {

  API_KEY = '0e8fba27e19e2b707efbbc2f0dd35581'

  async getCurrentLocation(location) {
    const city = location.split(',')[0]
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}`)
      if (res.ok) {
        return await res.json()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getHistoricalWeather(location,date) {
    try {
      const res = await fetch(`https://api.worldweatheronline.com/premium/v1/past-weather.ashx?q=${location}&key=59d3cb6a0c5545d1b2c125216211809&date=${date}&format=json`)
      if (res.ok) {
        return await res.json()
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default new WeatherService();