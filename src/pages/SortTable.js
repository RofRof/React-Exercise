import { useState, useRef, useEffect, forwardRef } from 'react'
import Products from '../json/products'
import "../styles/sort.css"


const SidePanel = forwardRef((props, ref) => {
  const checkCategoryRefs = useRef([])
  const inputLowest = useRef()
  const inputHighest = useRef()
  const checkManufactureRefs = useRef([])
  
  const getSort = (type) => {
    let arr = [] 
    props.product.forEach((e) => type == "category" ? arr.push(e.category) : arr.push(e.manufacturer))
    arr.sort()
    for(let i = 0; i < arr.length; i++){
      if(arr[i] == arr[i + 1]){
        arr[i] = true
      }
    }
    const newArr = arr.filter((x) => x != true)
    return newArr
  }
  
  const checkList = (checkbox) => {
    let checkArr = []
    if(checkbox === checkCategoryRefs){
      for(let i = 0; i < categoryList.length; i++) {
        if(checkbox.current[categoryList.length].checked){
          checkArr.push(checkbox.current[i].checked ? false : true)
        } 
        else {
          checkArr.push(checkbox.current[i].checked ? true : false)
        }
      }
    }
    else if(checkbox === checkManufactureRefs) {
      for(let i = 0; i < manufacturerList.length; i++) {
        if(checkbox.current[manufacturerList.length].checked){
          checkArr.push(checkbox.current[i].checked ? false : true)
        } 
        else {
          checkArr.push(checkbox.current[i].checked ? true : false)
        }
      }
    }
    
    return checkArr
  }

  const sortTable = (list) => {
    let checkArr = []
  
    if(list === categoryList) {checkArr = checkList(checkCategoryRefs)}
    if(list === manufacturerList) {checkArr=checkList(checkManufactureRefs)}
    
    let filter = list.filter((x, i) => checkArr[i] == true)
    let newArr = []

    if(list === categoryList){
      props.product.filter((x) => {
        filter.forEach((y) => {
          if(y===x.category){newArr.push(x)}
        })
      })
    }
    if(list === manufacturerList) {
      props.product.filter((x) => {
        filter.forEach((y) => {
          if(y===x.manufacturer){newArr.push(x)}
        })
      })
    }
    return newArr
  }

  const applyRange = (array) => {
    const lowestRange = parseInt(inputLowest.current.value)
    const highestRange = parseInt(inputHighest.current.value)
    const newArr = array.filter((val) => (val.price >= lowestRange) && (val.price <= highestRange))
    return newArr 
   
  }
  const clearAll = () => {
    for(let i = 0; checkCategoryRefs.current.length > i; i++)
    { if(checkCategoryRefs.current[i].checked == true) checkCategoryRefs.current[i].click() }
    for(let i = 0; checkManufactureRefs.current.length > i; i++)
    { if(checkManufactureRefs.current[i].checked == true) checkManufactureRefs.current[i].click() }
    inputLowest.current.value = ''
    inputHighest.current.value = ''
    props.setProductList(props.product)
  }

  const applyChanges = () => {
    const categoryCheckisEmpty = checkCategoryRefs.current.find((e) => e.checked)
    const manufacturerCheckisEmpty = checkManufactureRefs.current.find((e) => e.checked)
    const inputLowestValue = inputLowest.current.value
    const inputHighestValue = inputHighest.current.value

    if(categoryCheckisEmpty !== undefined && manufacturerCheckisEmpty !== undefined && inputHighestValue !== "" && inputLowestValue !== ""){
      const sortCategory = sortTable(categoryList)
      const sortManufacture = sortTable(manufacturerList)

      const setArr = [...sortCategory, ...sortManufacture]
      
      for(let i = 0; i < setArr.length; i++){
        for(let j = 0; j < setArr.length; j++) {
          if(setArr[i] === setArr[(j + i) + 1]) {setArr.splice((j + i) + 1, 1)}
        }
      }

      const finalArr = applyRange(setArr)
      props.setProductList(finalArr)
      
    }
    else if(inputHighestValue !== "" && inputLowestValue !== "") {
      if(!isNaN(inputHighestValue) && !isNaN(inputHighestValue) && (inputHighestValue >= inputLowestValue)){
        const finalArr = applyRange(props.product)
        props.setProductList(finalArr)
      }
      else{
        alert("Invalid input")
      }
    }
    else if(categoryCheckisEmpty !== undefined && manufacturerCheckisEmpty !== undefined) {
      const sortCategory = sortTable(categoryList)
      const sortManufacture = sortTable(manufacturerList)
 
      const setArr = [...sortCategory, ...sortManufacture]
      
      for(let i = 0; i < setArr.length; i++){
        for(let j = 0; j < setArr.length; j++) {
          if(setArr[i] === setArr[(j + i) + 1]) {setArr.splice((j + i) + 1, 1)}
        }
      }

      const finalArr = setArr
      props.setProductList(finalArr)
      
    }
    else if(categoryCheckisEmpty !== undefined) {
      const finalArr = sortTable(categoryList)
      props.setProductList(finalArr)
    }
    else if(manufacturerCheckisEmpty !== undefined) {
      const finalArr = sortTable(manufacturerList)
      props.setProductList(finalArr)
    }
  }

  const [categoryList, setCategoryList] = useState(getSort("category"))
  const [manufacturerList, setManufacturerList] = useState(getSort())

  const renderCategories = () => {
    const list = categoryList.map((val, i) => 
    <li key={i}><input type="checkbox" ref={(e) => checkCategoryRefs.current[i] = e}/>{val}</li>)
    return(
      <div>
      <ul style={{ listStyleType: "none" }}>
        <h4>Category</h4>
        {list}
        <li><input type="checkbox" ref={(e) => checkCategoryRefs.current[categoryList.length] = e}/>All Except</li>
      </ul>
      </div>
    )
  }
    
  const renderManufacturers = () => {
    const list = manufacturerList.map((val, i) => 
    <li key={i}><input type="checkbox" ref={(e) => checkManufactureRefs.current[i] = e} />{val}</li>)
    return(
      <div >
      <ul style={{ listStyleType: "none" }}>
        <h4>Manufacturer</h4>
        {list}
        <li><input type="checkbox" ref={(e) => checkManufactureRefs.current[manufacturerList.length] = e}/>All Except</li>
      </ul>
      </div>
    )
  }

  return(
    <div ref={ref} style={{ display: "none" }}> 
      <div style={{ display: "flex", gap: "15px"}}>
        {renderCategories()}
        {renderManufacturers()}
        <div>
          <h4>Price</h4>
          <div>
            <label>Lowest Price</label>
            <input type="text" ref={inputLowest}/>
          </div>
          <div>
            <label>Highest Price</label>
            <input type="text" ref={inputHighest}/>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
          <input type="button" value="Reset" onClick={() => clearAll()}/>
          <input type="button" value="Apply" onClick={() => applyChanges()} />
        </div>
    </div>
  )
})

function SortTable() {
  const [productList, setProductList] = useState(Products)
  const [stats, setStats] = useState({
    totalQuantity: 0,
    totalCost: 0,
    averageCost: 0,
    highestCostProduct: {name: '', price: ''},
    lowestCostProduct:  {name: '', price: ''},
  })
  const [ascend, setAscend] = useState(false)
  const sidepan = useRef()

  const arrangeTable = (columnName) => {
    const newArr = productList.sort((a, b) => {  
      if(ascend == true) {
        if(a[columnName] < b[columnName]) {
          return 1
        }
        else if(a[columnName] > b[columnName]) {
          return -1
        }
        else return 0
      }
      else {
        if(a[columnName] > b[columnName]) {
          return 1
        }
        else if(a[columnName] < b[columnName]) {
          return -1
        }
        else return 0
      }
    })
    setProductList(newArr)
    setAscend(!ascend)
  }

  const arrangeDate = () => {
    const arr = [...productList]
    const newArr = arr.sort((a, b) => {
      if(ascend == true) {
        if(a.productionDate > b.productionDate){
          return 1
        }
        else if(a.productionDate < b.productionDate) {
          return -1
        }
        else return 0
      }
      else {
        if(a.productionDate < b.productionDate){
          return 1
        }
        else if(a.productionDate > b.productionDate) {
          return -1
        }
        else return 0
      }
    })
    setProductList(newArr)
    setAscend(!ascend)
    
  }

  const renderRowData = () => {
    return productList.length !== 0 ?
      productList.map((product, index) => {
        return(
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>{product.manufacturer}</td>
            <td>{product.productionDate.toDateString().substring(3)}</td>
          </tr>
        )
      }) : <tr><td colSpan={5}>No Rows Found</td></tr>
  }

  const renderDisplay = () => {
    return(
      <div className="stats">
        <p>Total Quanity - {stats.totalQuantity}</p>
        <p>Total Cose - {stats.totalCost}</p>
        <p>Average Price - {stats.averageCost}</p>
        <p>Most Expensive Product: {stats.highestCostProduct.name} - P{stats.highestCostProduct.price}</p>
        <p>Least Expensive Product: {stats.lowestCostProduct.name} - P{stats.lowestCostProduct.price}</p>
      </div>
    )
  }

  useEffect(() => {
    const quantity = productList.length
    const arr = []
    
    for(let i = 0; i < productList.length; i++) {
      arr.push(productList[i].price)
    }
    const totalCost= arr.reduce((a, b) => a + b)
    const averageCost = Math.floor(totalCost / quantity)

    const sortHighest = productList.sort((p, c) => {
      if(p.price < c.price) {return 1}
      else if (p.price > c.price) {return -1}
      else return 0
    })

    setStats({...stats, 
      totalCost: totalCost, 
      averageCost: averageCost, 
      totalQuantity: quantity, 
      highestCostProduct: {name: sortHighest[0].category, price: sortHighest[0].price},
      lowestCostProduct: {name: sortHighest[quantity - 1].category, price: sortHighest[quantity - 1].price}
    })
  }, [productList])
  
  return (
    <div className="sort">
      <div>
        {renderDisplay()}
      </div>
      <div style={{ width: "85%" }}>
        <table className="sort-table">
          <thead>
            <tr>
              <th>#</th>
              <th id="category" onClick={(e) => arrangeTable(e.target.id)}>Category</th>
              <th id="price" onClick={(e) => arrangeTable(e.target.id)}>Price</th>
              <th id="manufacturer" onClick={(e) => arrangeTable(e.target.id)} >Manufacturer</th>
              <th onClick={() => arrangeDate()}>Production Date</th>
            </tr>
          </thead>
          <tbody>
            {renderRowData()}
          </tbody>
        </table>
      </div>
      <div>
        <input 
          type="submit" 
          value="Options" 
          onClick={() => sidepan.current.style.display === "none" ? sidepan.current.style.display = "" : sidepan.current.style.display = "none"} />
      </div>
      <div>
        <SidePanel product={Products} ref={sidepan} setProductList={setProductList}/>
      </div>
    </div>
  );
}

export default SortTable;
