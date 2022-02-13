import { useState, useRef } from 'react'
import '../styles/fighter.css'

const RenderFighter = (props) => {
  return(
    <div style={{ border: "1px solid black", display: "flex", flexDirection:"column", width: "150px"}}> 
      <p style={{ margin: "0px" }}><span style={{ fontWeight: "bold" }}>Fighter:</span> {props.name} </p>
      <p style={{ margin: "0px" }}><span style={{ fontWeight: "bold" }}>HP: </span> {props.hp}</p>
    </div>
  )
}

function Fighter() {
  const [statDistributor, setStatDistributor] = useState(30)
  const [stats, setStats] = useState({
    strength: 0,
    agility: 0,
    vitality: 0,
  })
  const [fighters, setFighters] = useState([])
  const [battleStatus, setBattleStatus] = useState([])

  const addStat = (e) => {
    if(statDistributor !== 0){
      switch(e.target.name) {
        case "strength":
          setStats({...stats, strength: stats.strength + 1})
          setStatDistributor(statDistributor - 1)
          break
        case "agility":
          setStats({...stats, agility: stats.agility + 1})
          setStatDistributor(statDistributor - 1)
          break
        case "vitality":
          setStats({...stats, vitality: stats.vitality + 1})
          setStatDistributor(statDistributor - 1)
          break
      }
    }
  }

  const substractStat = (e) => {
    if(statDistributor != 30) {
      switch(e.target.name) {
        case "strength":
          if(stats.strength != 0) { 
            setStats({...stats, strength: stats.strength - 1}) 
            setStatDistributor(statDistributor + 1)
          }
          break
        case "agility":
          if(stats.agility != 0) {
             setStats({...stats, agility: stats.agility - 1})
             setStatDistributor(statDistributor + 1)
          }
          break
        case "vitality":
          if(stats.vitality != 0) { 
            setStats({...stats, vitality: stats.vitality - 1})
            setStatDistributor(statDistributor + 1) 
          }
          break
      }
    }
  }

  const createFighter = () => {
    if(statDistributor == 0 && fighters.length != 2) {
      const hp = 50 + (stats.vitality * 10) + (stats.strength * 5) + (stats.agility * 3)
      const damage = 10 + (stats.strength * 5) - (stats.agility * 3)
      const defense = 10 + (stats.agility * 5) + (stats.strength * 3) + (stats.vitality * 1)
      setFighters([...fighters, {
                  name: `fighter` + Math.random().toString(16).substring(2, 6),
                  strength: stats.strength, 
                  agility: stats.agility, 
                  vitality: stats.vitality,
                  hp: hp,
                  damage: damage,
                  defense: defense
                }])
      setStats({...stats, strength: 0, agility: 0, vitality: 0})
      setStatDistributor(30)
    }
  }

  const renderFighters = () => {
    return fighters.map((x) => {
      return(
        <RenderFighter hp={x.hp} damage={x.damage} defense={x.defense} name={x.name}/> 
      )
    })
  }

  const renderBattle = () => {
    return battleStatus.map((status) => <p style={{ margin: "0px", textAlign: "center" }}>{status}</p>)
  }

  const fight = (fighter1, fighter2) => {
    if(fighters.length == 2){
      const newArr = fighters
      const battle = []
      while(true) {
        fighter1.hp = fighter1.hp - fighter2.damage <= 0 ? fighter1.hp = 0 : fighter1.hp - fighter2.damage
        fighter2.hp = fighter2.hp - fighter1.damage <= 0 ? fighter2.hp = 0 : fighter2.hp - fighter1.damage
        battle.push(`${fighter2.name} attacks ${fighter1.name} for ${fighter2.damage} damage`)
        battle.push(`${fighter1.name}'s hp is = ${fighter1.hp}`)
        battle.push(`${fighter1.name} attacks ${fighter2.name} for ${fighter1.damage} damage`)
        battle.push(`${fighter2.name}'s hp is = ${fighter2.hp}`)
        if(fighter1.hp == 0) {
          newArr[0].hp = 0
          battle.push(`${fighter2.name} wins!`)
          setFighters(newArr)
          break
        }
        if(fighter2.hp == 0){
          newArr[1].hp = 0
          battle.push(`${fighter1.name} wins!`)
          setFighters(newArr)
          break
        }
      }
      setBattleStatus(battle)
    }
  }

  const reset = () => {
    setStats({...stats, strength: 0, agility: 0, vitality: 0})
    setStatDistributor(30)
    setFighters([])
    setBattleStatus([])
  }

  return (
    <div className="main">
      <div>
        <p>Stat Points - {statDistributor}</p>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label>Strength:</label>
          <label>Agility:</label>
          <label>Vitality:</label>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{display: "flex", gap: "5px" }}>
              <input name="strength" type="submit" value="+" onClick={(e) => addStat(e)}/>
              {stats.strength}
              <input name="strength" type="submit" value="-" onClick={(e) => substractStat(e)}/>
            </div>
            <div style={{display: "flex", gap: "5px" }}>
              <input name="agility" type="submit" value="+" onClick={(e) => addStat(e)}/>
              {stats.agility}
              <input name="agility" type="submit" value="-" onClick={(e) => substractStat(e)}/>
            </div>
            <div style={{display: "flex", gap: "5px" }}>
              <input name="vitality" type="submit" value="+" onClick={(e) => addStat(e)}/>
              {stats.vitality}
              <input name="vitality" type="submit" value="-" onClick={(e) => substractStat(e)}/>
            </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <div>
          <input type="submit" value="Create Fighter" onClick={() => createFighter()}/>
          <input type="submit" value="Reset" onClick={() => reset()}/>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {renderFighters()}
        </div>
        <div>
          {fighters.length == 2 ? <input type="submit" value="Fight" onClick={() => fight(fighters[0], fighters[1])} /> : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}> 
          {renderBattle()}
        </div>
      </div>
    </div>
  );
}

export default Fighter;
