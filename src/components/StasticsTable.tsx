import {Table, Col, Row, Container} from "react-bootstrap"

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

export function StatisticsTable(props: {array: number[]}) {
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
