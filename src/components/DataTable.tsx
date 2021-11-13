import {Col, Row, Card, ListGroup} from "react-bootstrap"

export function DataTable(props: {data: number[]}) {
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

