import { useState, useRef, useEffect } from 'react'
import '../styles/colormanager.css'

const ColorManagerRender = (props) => {
  const [color, setColor] = useState(props.color)
  const [currentColor, setCurrentColor] = useState()
  const [select, setSelect] = useState(0)

  useEffect(() => {
    setCurrentColor(color[select])
  }, [select])

  return(
    <div>
      <div style={{ textAlign: "center" }}>
        <p>Color Manager</p>
        <p>Current Color: {currentColor}</p>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <input type="submit" value="Prev" onClick={() => select === 0 ? setSelect(color.length - 1) : setSelect(select - 1)} />
        <input type="submit" value="Get" onClick={() => setCurrentColor(color[select])} />
        <input type="submit" value="Next" onClick={() => select === color.length - 1 ? setSelect(0) : setSelect(select + 1)} />
        <input type="submit" value="Reset" onClick={() => setSelect(0)} />
      </div>
    </div>
  )
}


function ColorManager() {
  const colors = ["red", "blue", "green", "orange"]
  const defaultColorSelect = useRef()
  const [colorManager, setColorManager] = useState([])
  const [count, setCount] = useState(0)

  const createColorManager = (defaultColor) => {
    if(defaultColor === ""){
      let propColors = colors.slice(count, 4)
      for(let i = 0; i < count; i++) {
        propColors.push(colors[i])
      }
      count == 4 ? setCount(0) : setCount(count + 1)
      setColorManager([...colorManager, <ColorManagerRender color={propColors}/>])
    }
    else{
      const def = [colors[defaultColor]]
      const test = colors.map(( x, i) => {if(i != defaultColor){ return x}}).filter(word => word !== undefined)
      const propsColors = def.concat(test)
      setColorManager([...colorManager, <ColorManagerRender color={propsColors}/>])
    }
  }

  const renderColorManager = () => {
    return colorManager.map((element) => {
      return element
    })  
  }

  const renderColors = () => {
    return colors.map((colors) => {
      return <p>{colors},</p>
    })
  }

  const options = () => {
    return colors.map((color, i) => <option value={`${i}`}>{color}</option>)
  }

  return (
    <div className="colormanager">
      <div style={{ display: "flex"}}>
        <p>Colors:</p>
        {renderColors()}
      </div>
      <div style={{ display: "flex", gap: "5px", flexDirection: "column", alignItems: "center" }}>
        <div>
          <label>Default Color:</label>
          <select ref={defaultColorSelect}>
            <option value="">None</option>
            {options()}
          </select>
        </div>
        <div >
          <input type="submit" value="Create Color Manager" 
            style={{ width: "150px", margin: "5px" }}
            onClick={() => createColorManager(defaultColorSelect.current.options[defaultColorSelect.current.options.selectedIndex].value)}
          />
          <input type="submit" value="Reset Color Managers" 
            style={{ width: "150px", margin: "5px" }}
            onClick={() => setColorManager([])} /> 
        </div>
      </div>
      {renderColorManager()}
    </div>
  );
}

export default ColorManager
