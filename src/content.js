import './index.css';

const Content = ({data, nlc}) => {


    return(
        <div className="weather-info">
            <div className="middlediv">
                <p className="recommendation">
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
                    {data.current.temp_f}°F {data.current.temp_c}°C
                    </>
                )}
                </p>

                {/* <p className="detailedWeather">
                {data.detailedForecast}
                </p> */}
            </div>
            <div className="rightdiv">
                {nlc ? (
                <>
                    <p className="location">
                    How to enable location Services:
                    </p>
                    <p>
                    A popup should show up, asking you for your location. If it doesn't,
                    find the lock icon on your browser. Then, click on it. If there is a
                    Dropdown for Location, choose allow. If not, click on Site Settings,
                    and scroll down the new tab. There should be a dropdown for location
                    here. Choose allow. Then, manually refresh the page, and voila! You
                    now know what to wear today!
                    </p>
                </>
                ) : (
                <>
                    <p className="location">
                    {data.location.name} {data.location.region}, {data.location.country}
                    </p>
                    <p>
                    Feels Like: {data.current.feelslike_f}F · {data.current.feelslike_c}C<br />
                    Precipitation: {data.current.precip_in}in · {data.current.precip_mm}mm<br />
                    Gust: {data.current.gust_mph}MPH · {data.current.gust_kph}KPH<br />
                    Humidity: {data.current.humidity}%<br />
                    Visibility: {data.current.vis_miles} Miles · {data.current.vis_km}km<br />
                    UV: {data.current.uv}<br />
                    Pressure: {data.current.pressure_mb}mb
                    </p>
                </>
                )}
            </div>
        </div>
    )
}

export default Content
