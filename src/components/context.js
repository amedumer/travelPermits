import React, { createContext, useContext, useState } from 'react'

const myContext = createContext()

const ContextProvider = ({children}) => {

    const [myArr, setMyArr] = useState([])

    return <myContext.Provider value={[myArr, setMyArr]}>{children}</myContext.Provider>

}

const useArr = () => useContext(myContext)

export {ContextProvider, useArr}