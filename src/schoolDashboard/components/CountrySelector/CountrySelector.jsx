import React, { useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'

function CountrySelector({setCountry}) {
  const [value, setValue] = useState('')
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = value => {
    setValue(value)
    setCountry(value.label)
  }

  return <Select options={options} value={value} onChange={changeHandler} />
}

export default CountrySelector