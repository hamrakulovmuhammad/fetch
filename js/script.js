import { getData, BASE_URL, postData, } from "./http.js"
const box1 = document.querySelector('#twenty-five')
const box2 = document.querySelector('#fifty')
const box3 = document.querySelector('#others')
const form = document.querySelector('.form')
let forma = document.querySelector('.forma')
let button = document.querySelector('.edit')

let forma_modal = document.querySelector('.form')
let modal = document.querySelector('.modal')
let modal_name = document.querySelector("#name")
console.log(forma);
getData('/users')
    .then(res => reload(res))

form.onsubmit = (event) => {


    event.preventDefault()
    let user = {
        id: Math.random(),
        task: modal_name.value
    }


    let fm = new FormData(event.target)

    fm.forEach((value, key) => {
        user[key] = value
    })
    event.target.reset()
    postData('/users', user)
        .then(() => {
            getData('/users')
                .then(res => reload(res))
        })
}
function reload(arr) {
    box1.innerHTML = ''
    box2.innerHTML = ''
    box3.innerHTML = ''

    let id = 0
    console.log(arr);
    for (let item of arr) {

        let div = document.createElement('div')
        let name = document.createElement("div")
        let h3 = document.createElement('h3')
        let img = document.createElement('p')
        let p = document.createElement("p")

        name.classList.add("name")
        div.classList.add('box-item')
        img.classList.add('pop_img')
        div.id = item.id
        h3.innerHTML = `${item.name}`
        img.style.width = '30px'
        img.style.border = 0
        img.innerHTML = '✏️'
        img.style.cursor = 'pointer'
        p.innerHTML = `Age: ${item.age} `
        name.append(h3, img)
        div.append(name, p)
        console.log(img);

        if (item.age < 25) {
            box1.append(div)
        }
        else if (item.age > 25 && item.age <= 50) {
            box2.append(div)
        }
        else {
            box3.append(div)
        }
        div.onclick = () => {
            console.log(modal);
            fetch(BASE_URL + "/users/" + item.id, {
                method: "PATCH",
                body: JSON.stringify({ task: "sdfdsf" }),
                headers: {
                    "Content-Type": "application/json"
                }
            })

        }
        div.ondblclick = async () => {
            const res = await fetch(BASE_URL + "/users/" + item.id, {
                method: "DELETE",
            })
        }

        img.onclick = (e) => {
            modal.style.display = 'block'
            id = +e.target.parentNode.parentNode.id;
        }
        button.onclick = () => {
            modal.style.display = 'none'
            modal.classList.add('shadow')
        }
    }
    forma.onsubmit = (evenet) => {
        evenet.preventDefault()
        let findet = arr.find(el => el.id === id)

        let user = {}
        let fm = new FormData(forma)

        fm.forEach((value, key) => {
            user[key] = value
        })

        fetch(BASE_URL + "/users/" + findet.id, {
            method: "PATCH",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })

        reload(arr)
    }
}
