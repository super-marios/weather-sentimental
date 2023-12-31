import { useEffect, useState } from 'react';
import styled from 'styled-components';
// components
import TodayDate from './Date';

const Weather = () => {
	const [weather, setWeather] = useState({});
	const [weatherImg, setWeatherImg] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${process.env.REACT_APP_LAT}&lon=${process.env.REACT_APP_LON}&appid=${process.env.REACT_APP_WEATHER}&units=metric`
			);

			const result = await res.json();

			const text = result.weather[0].main.toUpperCase();
			const temp = Math.round(result.main.temp);

			setWeather({
				text,
				temp,
			});

			getPhoto(text);
		};

		// unsplash for images
		const getPhoto = async (keyword) => {
			const res = await fetch(
				`https://api.unsplash.com/search/photos?query=${keyword}&per_page=10`,
				{
					headers: {
						Authorization: `Client-ID ${process.env.REACT_APP_IMAGE}`,
					},
				}
			);
			const { results } = await res.json();

			// select image
			const num = Math.floor(Math.random() * 5);

			const url = results[num].urls.full;

			setWeatherImg(url);
		};

		fetchData();
	}, []);

	return (
		<WeatherStyle>
			<div className='weather-info'>
				<TodayDate />
				<div className='temperature'>
					{weather.text && (
						<>
							<strong>{weather.text}</strong>
							<div>
								<span>{weather.temp}</span>
								<span>&#8451;</span>
							</div>
						</>
					)}
				</div>
			</div>
			{weatherImg && (
				<img src={weatherImg} alt='Weather' className='weather-img' />
			)}
		</WeatherStyle>
	);
};

export default Weather;

const WeatherStyle = styled.div`
	font-family: 'Lato', sans-serif;
	height: 600px;
	display: flex;
	align-items: center;
	justify-content: center;

	position: relative;

	.weather-info {
		color: #fefefe;
		background-color: #33313d;
		width: 240px;
		height: 240px;
		border-radius: 10px;
		padding: 10px;

		position: absolute;
	}

	.weather-img {
		max-height: 100%;
		max-width: 100%;
	}

	.temperature {
		text-align: center;
		padding-top: 25px;

		strong {
			font-size: 16px;
			font-weight: 100;
		}
		div {
			font-size: 32px;
		}
	}
`;
