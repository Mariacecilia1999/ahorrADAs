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


const initializer = () =>{
   get('categories')
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
}

window.addEventListener('load', initializer)