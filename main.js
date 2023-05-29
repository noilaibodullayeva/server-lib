
const URL = "https://nodejs-crud.herokuapp.com/"
let globalId = 0
function init() {
  axios.get(URL).then(respons => {
    console.log(respons.data);
    let malumot = ""
    respons.data.forEach((value, raqam) => {
      malumot +=
        `
    <tr >
    <td>${raqam + 1}</td>
    <td onclick="openModel(${value.id})">${value.firstname}</td>
    <td>${value.lastname}</td>
    <td>${value.email}</td>
    <td>${value.address}</td>
    <td>${value.phone}</td>
    <td><button type="button" class="btn btn-outline-dark" onclick="edit(${value.id})" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
    <button type="button" class="btn btn-outline-dark" onclick="deletee(${value.id})">Delete</button></td>
    </tr>
    `
    })
    document.getElementById("tbody").innerHTML = malumot
  })
}
init()

function add() {
  const personinfo = document.getElementById("person-info")
  const data = {
    firstname: personinfo.firstname.value,
    lastname: personinfo.lastname.value,
    email: personinfo.email.value,
    address: personinfo.address.value,
    phone: personinfo.phone.value
  }

  axios.post(URL, data).then(res => {
    if (res.status === 201) {
      console.log(res);
      const abc = document.getElementById("exampleModal")
      const ccc = bootstrap.Modal.getInstance(abc)
      ccc.hide()
      init()
      document.getElementById("person-info").reset()
    } else {
      return false
    }
  })
  return false
}
function edit(id) {
  globalId = id
  axios.get(URL + id).then(v => {
    const EditForm = document.getElementById("EditForm")

    EditForm.firstname.value = v.data[0].firstname
    EditForm.lastname.value = v.data[0].lastname
    EditForm.email.value = v.data[0].email
    EditForm.address.value = v.data[0].address
    EditForm.phone.value = v.data[0].phone
  })
  axios.put(URL + globalId, dataBody).then(res => {
    const abc = document.getElementById("editModal")
    const ccc = bootstrap.Modal.getInstance(abc)
    ccc.hide()
    init()
  })

  return false
}

function deletee(id) {
  const isDel = confirm("Rostan ham o'chirmoqchimisz?")
  if (isDel) {
    axios.delete(URL + id).then(res => {
      console.log(res);
      init()
    })
  }
}

function openModel(personID) {
  axios.get(URL + personID).then(res => {

    var myModal = new bootstrap.Modal(document.getElementById("infoModal"))

    const editForm = document.getElementById("editForm")
    editForm.firstname.value = res.data[0].firstname
    editForm.lastname.value = res.data[0].lastname
    editForm.email.value = res.data[0].email
    editForm.address.value = res.data[0].address
    editForm.phone.value = res.data[0].phone

    myModal.show();
  })

}
