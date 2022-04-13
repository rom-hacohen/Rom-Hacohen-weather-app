import React from 'react'

const ForecastImage = ({ temp: search, imgSize }) => {
    const imageSize = imgSize;
    const forecastData = [
        { forecastString: "Clear", srcImg: "icons/icon-1.svg", toLowerCase: false },
        { forecastString: "mostly sunny", srcImg: "icons/icon-1.svg", toLowerCase: true },
        { forecastString: "Sunny", srcImg: "icons/icon-2.svg", toLowerCase: false },
        { forecastString: "partly sunny", srcImg: "icons/icon-3.svg", toLowerCase: true },
        { forecastString: "mostly clear", srcImg: "icons/icon-4.svg", toLowerCase: true },
        { forecastString: "cloud", srcImg: "icons/icon-5.svg", toLowerCase: true },
        { forecastString: "overcast", srcImg: "icons/icon-7.svg", toLowerCase: true },
        { forecastString: "wind", srcImg: "icons/icon-8.svg", toLowerCase: true },
        { forecastString: "rain", srcImg: "icons/icon-10.svg", toLowerCase: true },
        { forecastString: "shower", srcImg: "icons/icon-11.svg", toLowerCase: true },
        { forecastString: "storm", srcImg: "icons/icon-12.svg", toLowerCase: true },
        { forecastString: "snow", srcImg: "icons/icon-14.svg", toLowerCase: true },
    ]

    return (
        <div className="forecast-icon" style={{ opacity: '100%' }}>
            {forecastData.map((item) => (
                item.toLowerCase ?
                    search.toLowerCase().includes(item.forecastString) && <img src={item.srcImg} width={imageSize} alt='img' /> :
                    search.includes(item.forecastString) && <img src={item.srcImg} width={imageSize} alt='img' />
            )
            )}
        </div>
    )
}

export default ForecastImage
