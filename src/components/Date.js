import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TodayDate = () => {
	const [month, setMonth] = useState('');
	const [day, setDay] = useState('');
	const [today, setToday] = useState('');

	useEffect(() => {
		const date = new Date();
		const months = [
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUN',
			'JUL',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC',
		];

		const days = [
			'SUNDAY',
			'MONDAY',
			'TUESDAY',
			'WEDNESDAY',
			'THURSDAY',
			'FRIDAY',
			'SATURDAY',
		];

		setMonth(months[date.getMonth()]);
		setDay(days[date.getDay()]);
		setToday(date.getDate());
	}, []);

	return (
		<TodayDateStyle>
			<span className='mm'>{month}</span>
			<div className='dd'>
				<strong>{day}</strong>
				<span>{today}</span>
			</div>
		</TodayDateStyle>
	);
};

export default TodayDate;

const TodayDateStyle = styled.div`
	/* position: relative; */

	.mm {
		font-size: 24px;
	}

	.dd {
		padding-top: 13px;
		text-align: center;

		strong {
			font-size: 24px;
			font-weight: 100;
		}

		span {
			font-size: 56px;
		}

		strong,
		span {
			display: block;
		}
	}
`;
