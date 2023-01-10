// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import generate from 'project-name-generator'
import { CommandsArray } from '../models/Command'
import Command from '../models/Command'
import UiState from './view/UiState'

export default function seed(store, numberOfSuites = 0) {
  console.log('Seed: Creating testCase with provided data')
  const params = new URLSearchParams(window.location.search)

  const usecase = params.get('usecase') || 'Test'
  const region = params.get('region') || 'CN'
  const formid = params.get('formid') || '1'
  const url = params.get('url') || 'http://the-internet.herokuapp.com'

  console.log(
    `Seed: Recieved Data : URL: ${url} Region: ${region} UseCase: ${usecase} FormId ${formid}`
  )

  store.setUrl(url)
  store.addUrl(url)
  UiState.setUrl(url)

  const test = store.createTestCase(`${region} : ${usecase}`)
  // demoTest.createCommand(undefined, 'open', url)

  UiState.changeView('Tests')
  // suiteAll.setOpen(true)
  UiState.selectTest(test)

  store.changeName(`${region} Recording`)
  UiState.saved()

  console.log('Seed: Starting Recording')
  UiState.startRecording()
  return store
}
