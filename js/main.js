const $ = selector => document.querySelector(selector)
const $$ = selector => document.querySelectorAll(selector)

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

const addCategory = () =>{
   return{
      id:id(),
      category : $('#nameCategory').value
   }
}

const pushCategory = () =>{
   categories.push(addCategory())
   showCategory()
}

const showCategory = () =>{
   $('#showCategory').innerHTML = ''
   for(const {id, category} of categories){
   $('#showCategory').innerHTML += `<div class= "flex justify-between py-3">
                                       <span class="text-xs bg-emerald-50 text-green-500 px-2 py-1 rounded">${category}</span>
                                       <div>
                                          <a href="#" class="text-xs text-sky-600 mr-6">Editar</a>
                                          <a href="#" class="text-xs text-sky-600">Eliminar</a>
                                       </div>
                                    </div>
                                    `
                                 }
                              }

const initializer = () =>{
   $('#addCategory').addEventListener('click', (e) =>{
      e.preventDefault()
      pushCategory()
      showCategory()
   })
}

window.addEventListener('load', initializer)