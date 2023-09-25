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
   filtersReports()
   deleteValueForm()
   calculationsBalance()
}



/*Show all categories on filters*/ 

const showCategoriesFilters = (categories) =>{
   for(const {category} of categories){
      $('#filterCategory').innerHTML += `<option value="${category}">${category}</option>`
   }
}

const calculationsBalance = () => {
   let accProfit = 0
   let accExpense = 0
   const operationsData = get('operations') || []

   operationsData.forEach(operation => {
      if (operation.typeOperation === 'ganancia') {
         accProfit += operation.cost
      } else {
         accExpense += operation.cost
      }
   })

   const total = accProfit - accExpense;

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
      $('#showingOperations').innerHTML = ''
      $('#showingOperationsMobile').innerHTML = ''
      for(const {id, description, cost, typeOperation, categoryOperation, date} of operations){
         const costColorClass = typeOperation === 'gasto' ? 'text-red-500' : 'text-green-500'
         $('#showingOperations').innerHTML += ` <div class='hidden lg:block lg:flex lg:justify-between lg:items-center py-5 text-center'>
                                                      <p class='w-1/4'>${description}</p>
                                                      <p class='w-1/4 '>
                                                         <a class='bg-teal-100 text-teal-700 rounded py-2 px-3'>
                                                         ${categoryOperation}
                                                         </a>
                                                      </p>
                                                      <p class='w-1/4 '>${date}</p>
                                                      <p class='${costColorClass} w-1/4'>${cost}</p>
                                                      <div class='flex flex-col text-blue-700 text-xs w-1/4'>
                                                         <a onclick='editOperationForm(${id})' class='my-2'>Editar</a>
                                                         <a onclick='deleteOperation(${id})'>Eliminar</a>
                                                      </div>
                                                </div>
       `
       $('#showingOperationsMobile').innerHTML += `<div class='py-4'>
       <div class='flex justify-between py-4'>
       <p class='font-semibold'>${description}</p> <a class='bg-teal-100 text-teal-700 rounded py-2 px-3 text-xs'>${categoryOperation}</a></div>
       <div class='flex justify-between'><p class='${costColorClass} text-3xl font-bold'>${cost}</p>  <div class='flex flex-row items-center text-blue-700 text-xs'>
       <a onclick='editOperationForm(${id})' class='my-2 pr-3'>Editar</a>
       <a onclick='deleteOperation(${id})'>Eliminar</a>
    </div></div>
         </div>`
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
   filtersReports()
   deleteValueForm()
   calculationsBalance()
}

const deleteOperation = (id) =>{
   const deleteTheOperation = get('operations').filter(operation => operation.id !== id)
   set('operations', deleteTheOperation)
   showOperations(get('operations'))
   filtersReports()
   calculationsBalance()
}

const reports = (allOperations) =>{
   if(allOperations.length > 0){
      filtersReports()
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
   $('#greaterAmount').classList.add('text-green-500')
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
   $('#higherSpending').classList.add('text-red-500')
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
  $('#bestMonthCost').classList.add('text-green-500')
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
   $('#countMoreSpending').classList.add('text-red-500')
   
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
      $('.totalsByCategory').innerHTML = ''
      $('.totalsByCategory').innerHTML += ` <div class="flex justify-between gap-3 items-center text-center">
                                                <p class="py-5  w-4/12">${category}</p>
                                                <p class="py-5 text-green-500 w-4/12">+${profit}</p>
                                                <p class="py-5 text-red-500  w-4/12">-${expense}</p>
                                                <p class="py-5  w-4/12">$${balance}</p>
                                             </div>`

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
      $('.showTotals').innerHTML = ''
      $('.showTotals').innerHTML += `<div class="flex justify-between gap-3 items-center text-center">
      <p class="py-5  w-4/12" id="totalsMonth">${key}</p>
      <p id="totalsProfit" class="text-green-500  w-4/12">+$${obj[key].profit}</p>
      <p id="totalsExpense" class= "text-red-500  w-4/12">-$${obj[key].expense}</p>
      <p id="totalsBalance" class=' w-4/12'>$${obj[key].balance}</p>
  </div>`
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
   $('#hiddenFilters').addEventListener('click', () =>{
      $('.containerFilters').classList.add('hidden', 'lg:hidden')
      $('#hiddenFilters').classList.add('hidden', 'lg:hidden')
      $('#showFilters').classList.remove('hidden', 'lg:hidden')
   })

   $('#showFilters').addEventListener('click', () =>{
      $('.containerFilters').classList.remove('hidden', 'lg:hidden')
      $('#hiddenFilters').classList.remove('hidden', 'lg:hidden')
      $('#showFilters').classList.add('hidden', 'lg:hidden')
   })


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
      filtersReports()
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
      showOperations(get('operations'))
      filtersReports()
      calculationsBalance()
   })

   $('#addOperation').addEventListener('click', () =>{
      $('#sectionBalance').classList.remove('hidden', 'lg:hidden')
      $('#sectionNewOperationForm').classList.add('hidden', 'lg:hidden')
      showOperations(get('operations'))
      filtersReports()
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
      filtersReports()
   })
}
const menuMobile = () =>{
   $('#showMenu').addEventListener('click', () =>{
      $('#closeMenu').classList.remove('hidden')
      $('#showMenu').classList.add('hidden')
      $('#showMenuMobile').classList.remove('hidden')
   })
   $('#closeMenu').addEventListener('click', () =>{
      $('#showMenu').classList.remove('hidden')
      $('#closeMenu').classList.add('hidden')
      $('#showMenuMobile').classList.add('hidden')
   })
   $('.navBarBalanceMobile').addEventListener('click', () =>{
      $('#sectionBalance').classList.remove('hidden', 'lg:hidden')
      $('#sectionCategories').classList.add('hidden', 'lg:hidden')
      $('#sectionReports').classList.add('hidden', 'lg:hidden')
      $('#sectionWithReports').classList.add('hidden', 'lg:hidden')
   })

   $('.navBarCategoriesMobile').addEventListener('click', () =>{
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

$('.navBarReportsMobile').addEventListener('click', () =>{
   $('#sectionBalance').classList.add('hidden', 'lg:hidden')
   $('#sectionCategories').classList.add('hidden', 'lg:hidden')
   $('#sectionReports').classList.remove('hidden', 'lg:hidden')
   reports(get('operations'))
   //$('#sectionWithReports').classList.add('hidden', 'lg:hidden')
})
}

const deleteValueForm = () =>{
   $('#description').value = ''
   $('#cost').value = ''
   $('#typeOperation').value = ''
   $('#newOperationsCategories').value = ''
   $('#date').value = ''
}


const initializer = () =>{
   if(get('operations') > 0){

   filtersReports()
   }
   menuMobile()
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
      calculationsBalance()
   })
   $('.addEditOperation').addEventListener('click', (e) =>{
      e.preventDefault()
      editOperation()
      filtersReports()
      calculationsBalance()
   })
   showCategoriesFormOperations(get('categories'))
   showCategoriesFilters(get('categories'))
   $('#addOperation').addEventListener('click', (e) =>{
      e.preventDefault()
      pushOperation()
      filtersReports()
      calculationsBalance()
   })
   showHiddeNavBar()
   showOperations(get('operations'))
}

window.addEventListener('load', initializer)