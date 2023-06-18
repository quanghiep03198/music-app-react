import { useEffect, useState } from "react"

const Range = ({ value, max, step = 1, onChange, id }) => {
   const [rangeValue, setRangeValue] = useState(0)
   const [maxValue, setMaxValue] = useState(100)

   useEffect(() => {
      if (value && max) {
         setRangeValue(value)
         setMaxValue(max)
      }
   }, [value, max])

   const onHandleChange = (e) => {
      setRangeValue(e.target.value)
      if (onChange) onChange(e)
   }

   return (
      <input
         type="range"
         id={id}
         step={step}
         max={maxValue}
         value={rangeValue}
         style={{ backgroundSize: `${(rangeValue / maxValue) * 100}%` }}
         onChange={(e) => onHandleChange(e)}
      />
   )
}

export default Range
