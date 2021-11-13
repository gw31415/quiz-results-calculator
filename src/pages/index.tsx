import React, {useState} from "react"
import Seo from "../components/seo.js";
import {Table, Col, Row, Card, ListGroup, Container} from "react-bootstrap"
import {AppBar, Tab, Tabs, Stack, Button} from "@mui/material"
import {Edit, BarChart, Grade} from "@mui/icons-material"
import SwipableViews from "react-swipeable-views"
import {useTheme} from '@mui/material/styles'

import {ScoreInput} from "../components/ScoreInput"
import {TabPanel, a11yProps} from "../components/TabPanel"


export default function Main() {
	const [data, setData] = useState([])
	const [tab, setTab] = useState(0)
	const theme = useTheme()
	return (
		<>
			<AppBar position="sticky" color="default">
				<Tabs
					value={tab}
					onChange={(_: unknown, newValue: number) =>
						setTab(newValue)
					}
					variant="fullWidth"
				>
					<Tab icon={<Edit />} {...a11yProps(0)} />
					<Tab icon={<Grade />} {...a11yProps(1)} />
					<Tab icon={<BarChart />} {...a11yProps(2)} />
				</Tabs>
			</AppBar>
			<SwipableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={tab}
				onChangeIndex={setTab}
			>
				<TabPanel value={tab} index={0} >
					<Seo title="データ入力" />
					<Stack spacing={1} direction="column">
						<ScoreInput onEnter={e => {
							setData([Number(e)].concat(data))
						}} />
						<DataTable data={data} />
						{
							data.length !== 0 ?
								<Button variant="text" onClick={
									() => {setData([])}
								}>リセット</Button> :
								<></>
						}
					</Stack>
				</TabPanel>
				<TabPanel value={tab} index={1} >
					<Seo title="ランキング" />
					<DataTable data={
						Array.from(data).sort((a, b) => b - a)
					} />
				</TabPanel>
				<TabPanel value={tab} index={2} >
					<Seo title="統計" />
					<StatisticsTable array={data} />
				</TabPanel>
			</SwipableViews>
		</>
	)
}

function DataTable(props: {data: number[]}) {
	if (props.data.length === 0)
		return <div style={{
			textAlign: "center",
			paddingTop: "20vh",
			paddingBottom: "20vh",
			fontStyle: "italic",
			color: "gray",
		}}>
			データを入力してください。
		</div>
	else
		return <Card>
			<Card.Body>
				<ListGroup variant="flush">
					{props.data.map(score =>
						<ListGroup.Item style={{textAlign: "right"}}>
							<Row>
								<Col>{score} 点</Col>
								<Col>{standard_score(score, props.data).toFixed(2)}</Col>
							</Row>
						</ListGroup.Item>)}
				</ListGroup>
			</Card.Body>
		</Card>
}

function average(data: number[]) { // 平均値
	let sum = 0
	for (const n of data) sum += n
	return sum / data.length
}

function variance(data: number[]) { // 分散
	let sum = 0
	for (const n of data) sum += n * n
	return sum / data.length - (average(data) * average(data))
}

function standard_deviation(data: number[]) { // 標準偏差
	return Math.sqrt(variance(data))
}

function standard_score(score: number, data: number[]) { // 偏差値
	if (variance(data) === 0) return 50
	return (score - average(data)) * 10 / standard_deviation(data) + 50
}

function StatisticsTable(props: {array: number[]}) {
	return (
		<>
			<Container>
				<Row>
					<Col>
						<div style={{textAlign: "right"}}>
							<Table striped bordered>
								<tbody>
									<tr><td>度数</td><td>{props.array.length}</td></tr>
									<tr><td>平均値</td><td>{average(props.array).toFixed(2)}</td></tr>
									<tr><td>分散</td><td>{variance(props.array).toFixed(2)}</td></tr>
									<tr><td>標準偏差</td><td>{standard_deviation(props.array).toFixed(2)}</td></tr>
								</tbody>
							</Table>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}
