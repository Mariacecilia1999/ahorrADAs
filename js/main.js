const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

const get = (key) => JSON.parse(localStorage.getItem(key))
const set = (key, array) => localStorage.setItem(key, JSON.stringify(array))


const id = (() => {
   let id = 1
   return () => {
      const newId = id
      id++ 
      return newId
   }
})()

const categories = [
   {
      id: id(),
      category: 'Comida'
   },
   {
      id: id(),
      category: 'Servicios'
   },
   {
      id: id(),
      category: 'Salidas'
   },
   {
      id: id(),
      category: 'Educación'
   },
   {
      id: id(),
      category: 'Transporte'
   },
   {
      id: id(),
      category: 'Trabajo'
   },
]

const storedCategories = !get('categories') ? set('categories', categories) : null

const addCategory = () =>{
   return{
      id:id(),
      category : $('#nameCategory').value
}
}

const pushCategory = () =>{
   const newArray = get('categories')
   const addNewCategory = addCategory()
   newArray.push(addNewCategory)
   set('categories', newArray)
}

const showCategory = (categories) =>{
   $('#showCategory').innerHTML = ''
   for(const {id, category} of categories){
   $('#showCategory').innerHTML += `<div class= "flex justify-between py-3">
                                       <span class="text-xs bg-emerald-50 text-green-500 px-2 py-1 rounded">${category}</span>
                                       <div>
                                          <a href="#" class="text-xs text-sky-600 mr-6" onclick='editForm(${id})'>Editar</a>
                                          <a href="#" class="text-xs text-sky-600" onclick='deleteCategory(${id})'>Eliminar</a>
                                       </div>
                                    </div>
                                    `
                                 }
                              }

const deleteCategory = (id) =>{
   const newCategories = get('categories').filter(category => category.id !== id)
   set('categories', newCategories)
   showCategory(newCategories)
}

const editForm = (id) =>{
   $('#sectionCategories').classList.add('hidden', 'lg:hidden')
   $('#sectionEditCategory').classList.remove('hidden', 'lg:hidden')
   const categoryId = $('#editCategory').setAttribute('category-id', id)
   const editSelectedCategory = get('categories').find(category => category.id ===  id)
   $('#nameCategoryEdit').value = editSelectedCategory.category
}

const editCategory = () => {
   const categoryId = $('#editCategory').getAttribute('category-id');
   const categoryIdParse = parseInt(categoryId)
   const updatedCategories = get('categories').map(category => {
      if (category.id === categoryIdParse) {
         return { 
                  id: category.id, 
                  category: $('#nameCategoryEdit').value 
               }
      }
      return category
   })
   set('categories', updatedCategories)
   showCategory(get('categories'))
}

//NEW OPERATION FORM CATEGORIES

const showCategoriesFormOperations = (categories) =>{
   for(const {category} of categories){
      $('#newOperationsCategories').innerHTML += `<option value="${category}">${category}</option>`
   }
}

const operations = () => {
   return {
      id:id(),
      description: $('#description').value,
      cost: parseInt($('#cost').value),
      typeOperation: $('#typeOperation').value,
      categoryOperation: $('#newOperationsCategories').value,
      date: $('#date').value
   }
}


/*LocalStorage for operations*/
const storedOperations = get('operations') || []

const pushOperation = () =>{
   const operationsArr = get('operations')
   const newOperation = operations()
   operationsArr.push(newOperation)
   set('operations', operationsArr)
   console.log(get('operations'))
}



/*Show all categories on filters*/ 

const showCategoriesFilters = (categories) =>{
   for(const {category} of categories){
      $('#filterCategory').innerHTML += `<option value="${category}">${category}</option>`
   }
}

const calculationsBalance = () =>{
   let accProfit = 0
   let accExpense = 0
   let total = 0
   if(get('operations') > 0){
   get('operations').forEach(operation =>{
      if(operation.typeOperation === 'ganancia'){
         accProfit = operation.cost
      }else{
         accExpense = operation.cost
      }
      total = accProfit - accExpense
   })
}
   $('#balanceProfit').innerText = `+$${accProfit}`
   $('#balanceExpense').innerText = `-$${accExpense}`
   $('#balanceTotal').innerText = `$${total}`
   console.log(accProfit)
   console.log(accExpense)
   console.log(total) 
}

const showOperations = (operations) =>{
   if(operations.length > 0){
      $('#operationWithoutResults').classList.add('hidden', 'lg:hidden')
      $('#operationWithResults').classList.remove('hidden', 'lg:hidden')
      $('.showingOperations').innerHTML = ''
      for(const {id, description, cost, typeOperation, categoryOperation, date} of operations){
         $('.showingOperations').innerHTML += ` <tr>
                                                   <td>${description}</td>
                                                   <td>${categoryOperation}</td>
                                                   <td>${date}</td>
                                                   <td>${cost}</td>
                                                   <td class='flex flex-col'>
                                                      <a onclick='editOperationForm(${id})'>Editar</a>
                                                      <a onclick='deleteOperation(${id})'>Eliminar</a>
                                                   </td>
                                                </tr>
                                                `
      }
   }else{
      $('#operationWithoutResults').classList.remove('hidden', 'lg:hidden')
      $('#operationWithResults').classList.add('hidden', 'lg:hidden')
   }
}

const editOperationForm = (id) =>{
   $('.textTitle').innerText = 'Editar operación'
   $('#sectionBalance').classList.add('hidden', 'lg:hidden')
   $('#sectionNewOperationForm').classList.remove('hidden', 'lg:hidden')
   $('.addEditOperation').classList.remove('hidden', 'lg:hidden')
   $('#addOperation').classList.add('hidden', 'lg:hidden')

   const idOperation = $('.addEditOperation').setAttribute('operation-id', id)
   const operationSelected = get('operations').find(operation => operation.id === id)
      $('#description').value = operationSelected.description
      $('#cost').value = operationSelected.cost
      $('#typeOperation').value = operationSelected.typeOperation
      $('#newOperationsCategories').value = operationSelected.categoryOperation
      $('#date').value = operationSelected.date
}

const editOperation = () =>{
   const idOperation = parseInt($('.addEditOperation').getAttribute('operation-id'))
   const allOperations = get('operations').map(operation =>{
      if(operation.id === idOperation){
         return operations()
      }
      return operation
   })
   set('operations', allOperations)
}

const deleteOperation = (id) =>{
   const deleteTheOperation = get('operations').filter(operation => operation.id !== id)
   set('operations', deleteTheOperation)
   showOperations(get('operations'))
}

const reports = (allOperations) =>{
   if(allOperations.length > 0){
      $('#withReports').classList.remove('hidden', 'lg:hidden')
      $('#noReports').classList.add('hidden','lg:hidden')
   }else{
      $('#withReports').classList.add('hidden', 'lg:hidden')
      $('#noReports').classList.remove('hidden', 'lg:hidden')
   }
}

const categoryWithMoreProfit = () =>{
      let categories = {}
   

   //Filtro por tipo ganancia
   const filterByGain = get('operations').filter(operation => operation.typeOperation === 'ganancia')



  
   for(const {category} of get('categories')){
      //console.log(filterByGain)
      let revenue = 0
      const filterCategory = filterByGain.filter(categoyFilter =>{
         
         //console.log(categoyFilter.cost)
         // console.log(categoyFilter.categoryOperation)
         if(categoyFilter.categoryOperation == category){
            revenue += categoyFilter.cost
         }
         categories[category] = revenue
      })
   }
   //console.log(categories)

   let greaterAmount = 0
   let bestCategory = ''
   for(const key in categories){
      //console.log(key)
      //console.log(categories[key])
      if(categories[key] > greaterAmount){
         greaterAmount = categories[key] 
         bestCategory = key
      }
   }
   $('#bestCategory').innerHTML = bestCategory
   $('#greaterAmount').innerHTML = `+$${greaterAmount}`

}

const categoryWithMoreExpense = () =>{
   const categories = {}
   const filterTypeOperation = get('operations').filter(operation => operation.typeOperation === 'gasto')

   //console.log(filterTypeOperation)

   for(const {category} of get('categories')){
      //console.log(category)
      let expense = 0
      const filterCategory = filterTypeOperation.filter(categoryFilter =>{
         if(category === categoryFilter.categoryOperation){
            expense += categoryFilter.cost
            categories[category] = expense
         }
      })

      
   }

   //console.log(categories)
   //console.log(get('operations'))
   let higherSpending = 0
   let higherExpenseCategory = ''

   for(const key in categories){
      if(categories[key] > higherSpending){
         higherSpending = categories[key]
         higherExpenseCategory = key
      }
   }
   $('#higherSpending').innerText = `-$${higherSpending}`
   $('#higherExpenseCategory').innerText = higherExpenseCategory
}

const monthWithTheHighestProfit = () =>{
   const filterByType = get('operations').filter(operation => operation.typeOperation === 'ganancia')
   //Quiero obtener el mes con más ganancias
   //Tengo que extraer la fecha del mes y la cuenta total de cada mes
   //Con esa información hago un objeto para 
   const monthyEarnings = { 
      //fecha : 1000,
      //fecha segundo mes :3000
   }
   filterByType.forEach(operation =>{
      const date = new Date(operation.date)
      const newDate = `${date.getMonth()+1}/${date.getFullYear()}`
      if(!monthyEarnings[newDate]){
         monthyEarnings[newDate] = 0
      }
      monthyEarnings[newDate] += operation.cost
   })
   let bestCount = 0
   let bestMonth = ''
   for(const key in monthyEarnings){
      console.log(key)
      console.log(monthyEarnings[key])
      if(monthyEarnings[key] > bestCount){
         bestCount = monthyEarnings[key]
         bestMonth = key
      }
  }
  $('#bestMonth').innerText = `${bestMonth}`
  $('#bestMonthCost').innerText = `+${bestCount}`
}



const monthWithTheHighestSpending = () =>{
   const filterByType = get('operations').filter(operation => operation.typeOperation  === 'gasto')
   const monthlyExpenses = {}
   
   filterByType.forEach(expense => {
      let accountPerMonth = -0
      const date = new Date(expense.date)
      const monthAndYear = `${date.getMonth() +1}/${date.getFullYear()}`
      if(!monthlyExpenses[monthAndYear]){
         monthlyExpenses[monthAndYear] = 0
      }
      accountPerMonth = expense.cost
      monthlyExpenses[monthAndYear] -= accountPerMonth
   })

   //console.log(monthlyExpenses)
   let monthWithMoreExpenses = ''
   let countMoreSpending = 0
   for(const month in monthlyExpenses){

      if(monthlyExpenses[month] < countMoreSpending){
         countMoreSpending = monthlyExpenses[month]
         monthWithMoreExpenses = month
      }
   }
   $('#monthExpenses').innerText = `${monthWithMoreExpenses}`
   $('#countMoreSpending').innerText = `${countMoreSpending}`
   
}

const categoryBalance = () =>{
   const balanceObj = {}
   
   for(const {category} of get('categories')){
      let acc = 0
      let profitCount = 0
      const filterExpense = get('operations').filter(operation =>{
         if(operation.typeOperation === 'gasto'){
            if(category === operation.categoryOperation){
               acc += operation.cost
            }
         }else{
              if(category === operation.categoryOperation){
               profitCount += operation.cost
              }
         }

         if (acc !== 0 || profitCount !== 0) {
            balanceObj[category] = {
               profit: profitCount,
               expense: acc
            };
      }})
   }

   console.log(balanceObj)
   for(const key in balanceObj){
      const category = key
      const profit = balanceObj[key].profit
      const expense = balanceObj[key].expense
      const balance = profit - expense
      $('.totalsByCategory').innerHTML += ` <tr class="bg-green-500 text-justify">
                                                <td class="py-5 w-1/4">${category}</td>
                                                <td class="py-5 w-1/4">${profit}</td>
                                                <td class="py-5 w-1/4">${expense}</td>
                                                <td class="py-5 w-1/4">${balance}</td>
                                             </tr>`

   }

   const balanceCategories = {}
   for(const key in balanceObj){
      balanceCategories[key] =  balanceObj[key].profit - balanceObj[key].expense
   }
   
   let bestBalance = -Infinity
   let categoryWithBestBalance = ''

   for(const key in balanceCategories){
      console.log(key)
      console.log(balanceCategories[key])
      if(balanceCategories[key] > bestBalance){
         bestBalance = balanceCategories[key]
         categoryWithBestBalance = key
      }
   }

  
   $('#categoryBestBalance').innerText = categoryWithBestBalance
   $('#bestBalance').innerText = `$${bestBalance}`
}

const totalsPerMonth  = () =>{
   const obj = {}
   const filterTypeOperation = get('operations').filter(operation =>{
       const date = new Date(operation.date)
       const newDate = `${date.getMonth() +1}/${date.getFullYear()}`
      
   if(!obj[newDate]){
      obj[newDate] = {
         expense: 0,
         profit: 0,
         balance: 0
      }
   }
   if(operation.typeOperation === 'gasto'){
      obj[newDate].expense = operation.cost
   }else{
      obj[newDate].profit = operation.cost
   }
   obj[newDate].balance = obj[newDate].profit - obj[newDate].expense
   })
   for(const key in obj){
      console.log(obj[key])
      $('.showTotals').innerHTML += `<tr class="bg-green-500 text-justify">
      <td class="py-5" id="totalsMonth">${key}</td>
      <td id="totalsProfit">+$${obj[key].profit}</td>
      <td id="totalsExpense">-$${obj[key].expense}</td>
      <td id="totalsBalance">$${obj[key].balance}</td>
  </tr>`
   }
}

const filtersReports = () =>{
   categoryWithMoreProfit()
   categoryWithMoreExpense()
   monthWithTheHighestProfit()
   monthWithTheHighestSpending()
   categoryBalance()
   totalsPerMonth()
}

const applyFilters = () =>{
   console.log(get('operations'))
   const filterType = get('operations').filter(operation => {
      if($('#filterType').value === 'todos'){
         return operation
      }
      return operation.typeOperation === $('#filterType').value
   })

   const filterCategory = filterType.filter(category =>{
      if($('#filterCategory').value === 'todas'){
         return category
      }
      return category.categoryOperation=== $('#filterCategory').value
   })

   const filterDate = filterCategory.filter(date =>{
      return date.date >= $('#filterDate').value
   })


   let finalFilter
   if ($('#filterOrder').value === 'lessRecent') {
   finalFilter = filterDate.sort((a, b) => new Date(a.date) - new Date(b.date))
   }
   if ($('#filterOrder').value === 'moreRecent') {
   finalFilter = filterDate.sort((a, b) => new Date(b.date) - new Date(a.date))
   }
   if ($('#filterOrder').value === 'az') {
      finalFilter = filterDate.sort((a, b) => a.description.localeCompare(b.description))
    }
   if ($('#filterOrder').value === 'za') {
      finalFilter = filterDate.sort((a, b) => b.description.localeCompare(a.description))
   }
   if($('#filterOrder').value === 'greaterAmount'){
      finalFilter =  filterDate.sort((a, b) => b.cost - a.cost)
   }
   if($('#filterOrder').value === 'smallerAmount'){
      finalFilter =  filterDate.sort((a, b) => a.cost - b.cost)
   }

   console.log($('#filterOrder').value)
   showOperations(finalFilter)
}


const filterCallers = () =>{
   $('#filterType').addEventListener('change', applyFilters)
   $('#filterCategory').addEventListener('change', applyFilters)
   $('#filterDate').addEventListener('change', applyFilters)
   $('#filterOrder').addEventListener('change', applyFilters)
}


const showHiddeNavBar = () =>{
   $('.navBarCategories').addEventListener('click', () =>{
      $('#sectionBalance').classList.add('hidden', 'lg:hidden')
      $('#sectionReports').classList.add('hidden', 'lg:hidden')
      $('#sectionCategories').classList.remove('hidden', 'lg:hidden')
      $('#addCategory').addEventListener('click', () =>{
         $('#sectionCategories').classList.remove('hidden', 'lg:hidden')
         //$('#sectionEditCategory').classList.remove('hidden', 'lg:hidden')
         $('#sectionWithReports').classList.add('hidden', 'lg:hidden')
   })
   $('#editCategory').addEventListener('click', () =>{
      $('#sectionCategories').classList.remove('hidden', 'lg:hidden')
      $('#sectionEditCategory').classList.add('hidden', 'lg:hidden')
   })
   $('#cancelEditCategory').addEventListener('click', () =>{
      $('#sectionCategories').classList.remove('hidden', 'lg:hidden')
      $('#sectionEditCategory').classList.add('hidden', 'lg:hidden')
   })
})
   $('.navBarBalance').addEventListener('click', () =>{
      $('#sectionBalance').classList.remove('hidden', 'lg:hidden')
      $('#sectionCategories').classList.add('hidden', 'lg:hidden')
      $('#sectionReports').classList.add('hidden', 'lg:hidden')
      $('#sectionWithReports').classList.add('hidden', 'lg:hidden')
   })
   $('.navBarReports').addEventListener('click', () =>{
      $('#sectionBalance').classList.add('hidden', 'lg:hidden')
      $('#sectionCategories').classList.add('hidden', 'lg:hidden')
      $('#sectionReports').classList.remove('hidden', 'lg:hidden')
      reports(get('operations'))
      //$('#sectionWithReports').classList.add('hidden', 'lg:hidden')
   })

   $('#btnAddNewOperation').addEventListener('click', () =>{
      $('#sectionBalance').classList.add('hidden', 'lg:hidden')
      $('#sectionNewOperationForm').classList.remove('hidden', 'lg:hidden')
   })

   $('#btnAddNewOperationNew').addEventListener('click', () =>{
      $('#sectionBalance').classList.add('hidden', 'lg:hidden')
      $('#sectionNewOperationForm').classList.remove('hidden', 'lg:hidden')
      $('.addEditOperation').classList.add('hidden', 'lg:hidden')
      $('#addOperation').classList.remove('hidden', 'lg:hidden')
   })

   $('#addOperation').addEventListener('click', () =>{
      $('#sectionBalance').classList.remove('hidden', 'lg:hidden')
      $('#sectionNewOperationForm').classList.add('hidden', 'lg:hidden')
      showOperations(get('operations'))
   })
   $('#cancelAddOperation').addEventListener('click', () =>{
      $('#sectionBalance').classList.remove('hidden', 'lg:hidden')
      $('#sectionNewOperationForm').classList.add('hidden', 'lg:hidden')
      $('.textTitle').innerText = 'Nueva operación'
   })
   $('.addEditOperation').addEventListener('click', () =>{
      $('#sectionNewOperationForm').classList.add('hidden', 'lg:hidden')
      $('#sectionBalance').classList.remove('hidden', 'lg:hidden')
      $('.textTitle').innerText = 'Nueva operación'
      showOperations(get('operations'))
   })
}

const initializer = () =>{
   filterCallers()
   calculationsBalance()
   set('operations', storedOperations)
   reports(get('operations'))
   showCategory(get('categories'))
   reports(get('operations'))
   $('#addCategory').addEventListener('click', (e) =>{
      e.preventDefault()
      pushCategory()
      showCategory(get('categories'))
   })
   $('#editCategory').addEventListener('click', (e) =>{
      e.preventDefault()
      editCategory()
   })
   $('.addEditOperation').addEventListener('click', (e) =>{
      e.preventDefault()
      editOperation()
   })
   showCategoriesFormOperations(get('categories'))
   showCategoriesFilters(get('categories'))
   $('#addOperation').addEventListener('click', (e) =>{
      e.preventDefault()
      pushOperation()
   })
   showHiddeNavBar()
   showOperations(get('operations'))
   filtersReports()
}

window.addEventListener('load', initializer)