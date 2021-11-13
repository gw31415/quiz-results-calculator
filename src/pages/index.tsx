import React, {useState} from "react"
import Seo from "../components/seo.js";
import {AppBar, Tab, Tabs, Stack, Button} from "@mui/material"
import {Edit, BarChart, Grade} from "@mui/icons-material"
import SwipableViews from "react-swipeable-views"
import {useTheme} from '@mui/material/styles'

import {ScoreInput} from "../components/ScoreInput"
import {TabPanel, a11yProps} from "../components/TabPanel"
import {DataTable} from "../components/DataTable"
import {StatisticsTable} from "../components/StasticsTable"


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
