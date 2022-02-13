import { useState, useRef } from 'react'
import '../styles/build.css'

function BuildClass() {
  
  const [bemName, setBemName] = useState()

  const blk = useRef()
  const elm = useRef()
  const mod = useRef()

  const build = (bl, el, mo) => {
    const inputBlk = blk.current
    const inputElm = elm.current
    const inputMod = mod.current

    if(bl == ""){
      setBemName("Classname has no block!")
    }
   else if(mo === ""  && el == "")
    setBemName(bl)
   else if(el == ""){
     setBemName(`${bl}-${mo}`)
   }
   else if(mo == ""){
     setBemName(`${bl}__${el}`)
   }
   else{
     setBemName(`${bl}__${el}-${mo}`)
   }
   inputBlk.value = ""
   inputElm.value = ""
   inputMod.value = ""
  }

  return (
    <div className="build">
      <label>Block</label>
      <input type="text" ref={blk}/>
      <label>Element</label>
      <input type="text" ref={elm}/>
      <label>Modifier</label>
      <input type="modifier" ref={mod}/>
      <input type="submit" value="Build" onClick={() => build(blk.current.value, elm.current.value, mod.current.value)}/>
      {bemName}
    </div>
  );
}

export default BuildClass;
