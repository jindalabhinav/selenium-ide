import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { LoadedWindow } from 'browser/types'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemButton from '@material-ui/core/ListItemButton'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import AppWrapper from 'browser/components/AppWrapper'

const { sideAPI } = window as LoadedWindow

const ProjectEditor = () => {
  const [recentProjects, setRecentProjects] = useState<string[]>([])
  useEffect(() => {
    sideAPI.projects.getRecent().then(setRecentProjects)
  }, [])
  const loadProject = async () => {
    const response = await sideAPI.dialogs.open()
    if (response.canceled) return
    await sideAPI.commands.init()
    await sideAPI.projects.load(response.filePaths[0])
  }
  const newProject = async () => {
    await sideAPI.commands.init()
    await sideAPI.projects.new()
  }

  return (
    <AppWrapper>
      <Grid className="centered pt-4" container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Welcome to Selenium IDE v4</Typography>
          <Typography variant="subtitle1">
            Please load a project or create a new one
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={loadProject} variant="contained">
            Load Project
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={newProject} variant="outlined">
            New Project
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Recent Projects:</Typography>
          <List dense>
            {recentProjects.map((filepath, index) => (
              <ListItem
                disablePadding
                key={index}
                onClick={() => sideAPI.projects.load(filepath)}
              >
                <ListItemButton>
                  <ListItemText primary={filepath} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </AppWrapper>
  )
}

const domContainer = document.querySelector('#root')

ReactDOM.render(React.createElement(ProjectEditor), domContainer)
