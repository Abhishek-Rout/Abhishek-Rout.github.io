let form = document.querySelector("form");
let wrapper = document.querySelector(".wrapper");
let info, i;
let api = "https://script.google.com/macros/s/AKfycbyAIzKvbYIAHCbu_7jjWi0UZS55rQTkj8a3NukOXEG8T7Sa-EQNmjQ9CPqL_7lFjM9R4g/exec";
form.addEventListener('submit', (e) => {
  e.preventDefault();
  document.querySelector(".btn").value = "Submitting..";
  let data = new FormData(form);
  fetch(api,
    {
      method: "POST",
      body: data
    })
    .then(res => res.text())
    .then(data => {
      document.querySelector(".btn").value = "Submit";
      location.reload();
    });
})


function readData() {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      info = data;
      console.log(data, data.length)
      for (i = 0; i < info.length; i++) {
        let div = document.createElement('div');
        div.className = 'box';
        div.setAttribute("data-index", i + 1)
        div.innerHTML =
          `
            <i class="fas fa-quote-left quote"></i>
            <span>${info[i][2]}</span>
            <p class="name">${info[i][0]}</p>
            <div class="icon">
              <i class="fas fa-pen quote" onclick="updateBox(${i + 1})"></i>
              <i class="fas fa-trash quote" onclick="deleteBox(${i + 1})"></i>
            </div>
            `;
        wrapper.appendChild(div);
      }
    })
}

readData();

const inputs = document.querySelectorAll(".input");

function addcl() {
  let parent = this.parentNode.parentNode;
  parent.classList.add("focus");
}

function remcl() {
  let parent = this.parentNode.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach(input => {
  input.addEventListener("focus", addcl);
  input.addEventListener("blur", remcl);
});

function updateBox(id) {
  document.body.style.overflow = "hidden";
  wrapper.style.display = "none";
  [form[0], form[1], form[2]].forEach((input, index) => {
    input.value = info[id - 1][index];
    input.focus();
  });
  form.lastElementChild.type = "update";
  form.lastElementChild.value = "Update";
  form.lastElementChild.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector(".btn").value = "Updating..";
    let data = new FormData(form);

    fetch(`${api}?update=true&id=${id + 1}`, {
      method: "POST",
      body: data
    })
      .then(res => res.text())
      .then(data => {
        location.reload();
        alert(data);
      });
  });

}

function deleteBox(id) {
  fetch(api + `?del=true&id=${id + 1}`)
    .then(res => res.text())
    .then(data => {
      alert(data);
      location.reload();
    })
}

function SendEmail() {
  let name = document.querySelector(".username").value;
  let email = document.querySelector(".email").value;
  let comment = document.querySelector(".comment").value;
  Email.send({
    'SecureToken': "b4d501bd-e055-49d7-8a0f-44c7acff0d3e",
    'To': email,
    'From': 'abhishek.r.9690@gmail.com',
    'Subject': "Testimonial comment",
    'Body': "Hi " + name + ", <br /> \n        Your comment: " + comment
  });
}