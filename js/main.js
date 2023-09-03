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
      cost: $('#cost').value,
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

const showHiddeNavBar = () =>{
   $('.navBarCategories').addEventListener('click', () =>{
      $('#sectionBalance').classList.add('hidden', 'lg:hidden')
      $('#sectionReports').classList.add('hidden', 'lg:hidden')
      $('#sectionCategories').classList.remove('hidden', 'lg:hidden')
      $('#addCategory').addEventListener('click', () =>{
         $('#sectionCategories').classList.remove('hidden', 'lg:hidden')
         //$('#sectionEditCategory').classList.remove('hidden', 'lg:hidden')
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
   })
   $('.navBarReports').addEventListener('click', () =>{
      $('#sectionBalance').classList.add('hidden', 'lg:hidden')
      $('#sectionCategories').classList.add('hidden', 'lg:hidden')
      $('#sectionReports').classList.remove('hidden', 'lg:hidden')
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
   set('operations', storedOperations)
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
}

window.addEventListener('load', initializer)