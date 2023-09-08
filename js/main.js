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

const pushCategory = (value) =>{
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
      cost: $('#cost').value,
      typeOperation: $('#typeOperation').value,
      categoryOperation: $('#newOperationsCategories').value,
      date: $('#date')
   }
}


/*LocalStorage for operations*/
const storedOperations = !get('operations') ? set('operations', operations) : null

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
   get('operations').forEach(operation =>{
      if(operation.typeOperation === 'ganancia'){
         accProfit = operation.cost
      }else{
         accExpense = operation.cost
      }
      total = accProfit - accExpense
   })
   console.log(accProfit)
   console.log(accExpense)
   console.log(total)
}
calculationsBalance()


const initializer = () =>{
   get('categories')
   get('operations')
   console.log(get('operations'))
   showCategory(get('categories'))
   $('#addCategory').addEventListener('click', (e) =>{
      e.preventDefault()
      pushCategory()
      showCategory(get('categories'))
   })
   $('#editCategory').addEventListener('click', (e) =>{
      e.preventDefault()
      editCategory()
   })
   showCategoriesFormOperations(get('categories'))
   showCategoriesFilters(get('categories'))
   $('#addOperation').addEventListener('click', (e) =>{
      e.preventDefault()
      pushOperation()
   })
}

window.addEventListener('load', initializer)