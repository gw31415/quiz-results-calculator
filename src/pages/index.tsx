import React, {useState, useRef} from "react"
import Seo from "../components/seo.js";
import {Button, InputGroup, FormControl, Table, Col, Row, Card, Navbar, ListGroup, Nav, Container} from "react-bootstrap"

function ScoreInput(props: {onEnter: (input: string) => void}) {
	const inputref: React.MutableRefObject<any> = useRef()
	const onEnter = () => {
		if (inputref.current.value !== "") {
			props.onEnter(inputref.current.value)
			inputref.current.value = ""
		}
		inputref.current.focus()
	}
	return <InputGroup>
		<InputGroup.Prepend>
			<InputGroup.Text id="basic-addon1">点数</InputGroup.Text>
		</InputGroup.Prepend>
		<FormControl type="number" placeholder="数値を入力" pattern="\d*"
			ref={inputref}
			onKeyPress={
				(e: {key: string}) => {
					if (e.key === "Enter") onEnter()
				}
			}
		/>
		<InputGroup.Append>
			<Button variant="outline-secondary"
				onClick={onEnter}>追加</Button>
		</InputGroup.Append>
	</InputGroup >
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
					{
						tab === "data" ?
							<DataPage data={data} setData={setData} /> :
							<StatisticsPage array={data} />
					}
				</Container>
			</main>
		</>
	)
}

function DataPage(props: {data: number[], setData: React.Dispatch<React.SetStateAction<number[]>>}) {
	return (
		<>
			<Seo title="データ" />
			<Container>
				<Row>
					<Col>
						<ScoreInput onEnter={e => {
							props.setData([Number(e)].concat(props.data))
						}} />
					</Col>
				</Row>
				<Row>
					<Col>
						<Card>
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
					</Col>
				</Row>
			</Container>
		</>
	)
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

function StatisticsPage(props: {array: number[]}) {
	return (
		<>
			<Seo title="統計" />
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
