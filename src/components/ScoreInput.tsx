import React, {useRef} from "react"
import {Stack, TextField, IconButton} from "@mui/material"
import {Add} from "@mui/icons-material"

export function ScoreInput(props: {onEnter: (input: string) => void}) {
	const inputref: React.MutableRefObject<any> = useRef()
	const onEnter = () => {
		if (inputref.current.value !== "") {
			props.onEnter(inputref.current.value)
			inputref.current.value = ""
		}
		inputref.current.focus()
	}
	return <Stack direction="row" spacing={1}>
		<TextField type="number"
			InputProps={
				{
					inputProps: {
						pattern: "\\d*"
					}
				}
			}
			fullWidth
			variant="filled"
			label="点数"
			inputRef={inputref}
			onKeyPress={
				(e: {key: string}) => {
					if (e.key === "Enter") onEnter()
				}
			}
		/>
		<IconButton onClick={onEnter}><Add /></IconButton>
	</Stack>
}

export default ScoreInput
