import { FormHelperText } from '@material-ui/core'
import Autocomplete from '@material-ui/core/Autocomplete'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Stack from '@material-ui/core/Stack'
import Typography from '@material-ui/core/Typography'
import { CommandShape } from '@seleniumhq/side-model'
import { CoreSessionData } from 'api/types'
import sideAPI from 'browser/helpers/getSideAPI'
import React, { FC, useMemo } from 'react'
import UncontrolledTextField from './UncontrolledTextField'

export interface CommandEditorProps {
  command: CommandShape
  commands: CoreSessionData['state']['commands']
  testID: string
}

export interface MiniCommandShape {
  id: string
  name: string
}

const stackClassName = 'flex flex-col p-4 bt overflow-y'
const stackStyle = { border: 0, flex: '0 0 400px' }
const CommandEditor: FC<CommandEditorProps> = ({
  command,
  commands,
  testID,
}) => {
  const commandsList = useMemo(
    () => Object.entries(commands).map(([id, { name }]) => ({ id, name })),
    []
  )
  if (commandsList.length === 0) {
    return <Typography variant="subtitle1">Loading...</Typography>
  }
  const updateField = (name: string) => (e: any) => {
    console.log('Changing field ?', name, e.target.value)
    sideAPI.tests.updateStep(testID, command.id, {
      [name]: e.target.value,
    })
  }
  const updateFieldAutoComplete =
    (name: string) => (_e: any, value: string) => {
      sideAPI.tests.updateStep(testID, command.id, {
        [name]: value,
      })
    }
  if (command.id === '-1') {
    return (
      <Stack className={stackClassName} sx={stackStyle} spacing={1}>
        <Typography className="centered pt-4" variant="body2">
          No active command selected
        </Typography>
      </Stack>
    )
  }
  const commandData = commands[command.command]
  return (
    <Stack className={stackClassName} sx={stackStyle} spacing={1}>
      <FormControl>
        <InputLabel id="command-label">Command</InputLabel>
        <Select
          fullWidth
          label="Command"
          labelId="command-label"
          onChange={updateField('command')}
          size="small"
          value={command.command}
        >
          {commandsList.map((cmd) => (
            <MenuItem key={cmd.id} value={cmd.id}>
              {cmd.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{commandData.description}</FormHelperText>
      </FormControl>
      <FormControl>
        <Autocomplete
          disabled={!commandData.target}
          freeSolo
          fullWidth
          inputValue={command.target}
          onChange={updateField('target')}
          onInputChange={updateFieldAutoComplete('target')}
          options={(command.targets ?? []).map((target) => target.join('='))}
          renderInput={(params) => (
            <UncontrolledTextField {...params} label="Target" name="target" />
          )}
          size="small"
          value={command.target}
        />
        <FormHelperText>{commandData.target?.description ?? ''}</FormHelperText>
      </FormControl>
      <FormControl>
        <UncontrolledTextField
          disabled={!commandData.value}
          label="Value"
          name="value"
          onChange={updateField('value')}
          size="small"
          value={command.value}
        />
        <FormHelperText>{commandData.value?.description ?? ''}</FormHelperText>
      </FormControl>
      <FormControl>
        <UncontrolledTextField
          label="Comment"
          name="comment"
          onChange={updateField('comment')}
          size="small"
          value={command.comment}
        />
      </FormControl>
    </Stack>
  )
}

export default CommandEditor
