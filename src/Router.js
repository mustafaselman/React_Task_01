import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Cards from './Cards'
import Info from './Info'


function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Cards></Cards>} />
            <Route path='/info' element={<Info></Info>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Router