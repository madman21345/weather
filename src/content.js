import './index.css';

const Content = ({data, nlc, history}) => {

    if(!history){
        return(
            <div className="weather-info">
                <div className="middlediv">
                    <p className="date">
                    {nlc ? (
                        <>
                        Please enable Location Services, then Refresh the page
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    </p>
                </div>

                <div className="leftdiv">
                    <p className="weather">
                    {nlc ? (
                        <>
                        No Location Available!
                        </>
                    ) : (
                        <>
                        {data.current.condition.text}
                        </>
                    )}
                    </p>
                    <br />

                    <p className="temp">
                    {!nlc && (
                        <>
                        {data.current.temp_c}°C
                        </>
                    )}
                    </p>
                </div>
                
                <div className="rightdiv">
                    {nlc ? (
                    <>
                        <p className="location">
                        How to enable location Services:
                        </p>
                        <p>
                        A popup should show up, asking for your location. If it doesn't,
                        find the lock icon on your browser. Click on it. If there is a
                        Dropdown for Location, choose allow. If not, click on Site Settings.
                        There should be a dropdown for location. Choose allow and refresh the page
                        </p>
                    </>
                    ) : (
                    <>
                        <p className="location">
                        {data.location.name}, {data.location.region}, {data.location.country}
                        </p>
                        <p>
                        Feels Like: {data.current.feelslike_f}F · {data.current.feelslike_c}C<br />
                        Precipitation: {data.current.precip_in}in · {data.current.precip_mm}mm<br />
                        Gust: {data.current.gust_mph}MPH · {data.current.gust_kph}KPH<br />
                        Humidity: {data.current.humidity}%<br />
                        UV: {data.current.uv}<br />
                        Pressure: {data.current.pressure_mb}mb
                        </p>
                    </>
                    )}
                </div>
            </div>
        )
    }else {
        return(
            <div className="weather-info">
                <div className="middlediv">
                    <p className="date">
                        <>
                        {data.forecast.forecastday[0].date}
                        </>
                    </p>
                </div>

                <div className="leftdiv">
                    <p className="weather">
                        <>
                        {data.forecast.forecastday[0].day.condition.text}
                        </>
                    </p>
                    <br />

                    <p className="temp">
                    {!nlc && (
                        <>
                        {data.forecast.forecastday[0].day.avgtemp_c}°C
                        </>
                    )}
                    </p>
                </div>
                
                <div className="rightdiv">
                    
                    <>
                        <p className="location">
                        {data.location.name}, {data.location.region}, {data.location.country}
                        </p>
                        <p>
                        Avg Stats<br />
                        Precipitation: {data.forecast.forecastday[0].day.totalprecip_in}in · {data.forecast.forecastday[0].day.totalprecip_mm}mm<br />
                        Max WindSpeed: {data.forecast.forecastday[0].day.maxwind_mph}MPH · {data.forecast.forecastday[0].day.maxwind_kph}KPH<br />
                        Humidity: {data.forecast.forecastday[0].day.avghumidity}%<br />
                        UV: {data.forecast.forecastday[0].day.uv}<br />
                        Pressure: {data.forecast.forecastday[0].hour[12].pressure_mb}mb
                        </p>
                    </>
                </div>
            </div>
        )
    }
}

export default Content
