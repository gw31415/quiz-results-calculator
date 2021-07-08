import React, {useState} from "react"
import {Table, Col, Row, Card, Navbar, ListGroup, Nav, Container} from "react-bootstrap"

const ScoreInput = (props: {onEnter: (input: string) => void}) => {
	const [value, updateValue] = useState("")
	return <>
		<div style={{height: "4ex", }}></div>
		<div
			style={{
				position: "fixed",
				background: "white",
				bottom: "0",
				boxShadow: "0 -1px 1ex rgba(0, 0, 0, 0.2)",
				height: "4ex",
				width: "100%",
				paddingLeft: ".5em",
				paddingRight: ".5em",
			}}
		>
			<input type="number" style={{
				margin: "2px",
				width: "100%",
				outline: "none",
				border: "none",
				background: "none",
				WebkitAppearance: "none",
			}} placeholder="数値を入力...."
				onChange={
					e => {
						updateValue(e.target.value)
					}
				}
				onKeyPress={
					e => {
						if (e.key === "Enter"
							&& (e.target as any).value !== "") {
							updateValue((e.target as any).value = "")
							props.onEnter(value)
						}
					}
				}
			/>
		</div></>
}

export default function Main() {
	const [data, setData] = useState([])
	const [tab, setTab] = useState("data")
	return (
		<>
			<Navbar bg="light" sticky="top">
				<Nav defaultActiveKey="data" onSelect={
					e => setTab(e)
				}>
					<Nav.Link eventKey="data">データ</Nav.Link>
					<Nav.Link eventKey="statistics">統計</Nav.Link>
				</Nav>
			</Navbar>
			<main>
				<Container>
					<Row>
						<Col>
							{
								tab === "data" ?
									<DataPage array={data} /> : <StatisticsPage array={data} />
							}
						</Col>
					</Row>
				</Container>
			</main>
			{
				tab === "data" ?
					<ScoreInput onEnter={e => {
						setData([Number(e)].concat(data))
					}} /> : <></>
			}
		</>
	)
}

function DataPage(props: {array: number[]}) {
	return (
		<Card style={{marginTop: "1ex", marginBottom: "1ex", }}>
			<Card.Body>
				<ListGroup variant="flush">
					{props.array.map(score => <ListGroup.Item>{score}</ListGroup.Item>)}
				</ListGroup>
			</Card.Body>
		</Card>
	)
}

function average(data: number[]) {
	let sum = 0
	for (const n of data) sum += n
	return sum / data.length
}
function variance(data: number[]) {
	let sum = 0
	for (const n of data) sum += n*n
	return sum/data.length - (average(data) ^ 2)
}

function standard_deviation(data: number[]) {
	return Math.sqrt(variance(data))
}

function StatisticsPage(props: {array: number[]}) {
	return (
		<div style={{marginTop: "1ex", marginBottom: "1ex", textAlign: "right"}}>
			<Table striped bordered>
				<tbody>
					<tr><td>度数</td><td>{props.array.length}</td></tr>
					<tr><td>平均値</td><td>{average(props.array).toFixed(2)}</td></tr>
					<tr><td>分散</td><td>{variance(props.array).toFixed(2)}</td></tr>
					<tr><td>標準偏差</td><td>{standard_deviation(props.array).toFixed(2)}</td></tr>
				</tbody>
			</Table>
		</div>
	)
}
