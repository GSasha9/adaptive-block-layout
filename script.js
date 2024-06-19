//вызываем форму авторизации
//находим оверлей
let overlay = document.querySelector('.modal');
//находим форму
let form = document.querySelector('.main--form');
//находим кнопку вызова формы
let form_call = document.querySelector('#main--tilte_authorization--try_free');

//назначаем слушатель события "клик" на кнопку вызова формы
form_call.addEventListener('click', function(){
    overlay.classList.add('modal--active');
    createForm();
})



//функция для динамического формирования формы
function createForm(){
    const newForm = document.createElement('form');
    form.appendChild(newForm);


    // Создаем элемент SVG
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("viewBox", "0 0 52 52");
    svg.setAttribute("fill", "none");
    svg.id = 'close_form';

    // Создаем прямоугольник
    let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "52");
    rect.setAttribute("height", "52");
    rect.setAttribute("rx", "10");
    rect.setAttribute("fill", "white");
    svg.appendChild(rect);

    
    // Создаем первый путь
    let path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M32 20L20 32");
    path1.setAttribute("stroke", "black");
    path1.setAttribute("stroke-width", "2");
    path1.setAttribute("stroke-linecap", "round");
    path1.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path1);

    // Создаем второй путь
    let path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M20 20L32 32");
    path2.setAttribute("stroke", "black");
    path2.setAttribute("stroke-width", "2");
    path2.setAttribute("stroke-linecap", "round");
    path2.setAttribute("stroke-linejoin", "round");
    svg.appendChild(path2); 

    // Добавляем SVG на страницу
    newForm.appendChild(svg);

    //находим кнопку для закрытия формы, назначаем слушатель события "клик"
    let close_form = document.querySelector('#close_form');
    close_form.addEventListener('click', function(){
        overlay.classList.remove('modal--active');
        form.removeChild(newForm);
    })


    const formTitle = document.createElement('p');
    formTitle.textContent = 'Войти в систему';
    newForm.appendChild(formTitle);

    const mail_phone_input =  document.createElement('input');
    mail_phone_input.setAttribute("type", "text");
    mail_phone_input.setAttribute("name", "mail_phone");
    mail_phone_input.setAttribute("placeholder", "Email/Телефон");
    mail_phone_input.id = 'mail_phone';
    mail_phone_input.classList.add('form_input');
    newForm.appendChild(mail_phone_input);

    const password =  document.createElement('input');
    password.setAttribute("type", "password");
    password.setAttribute("name", "password");
    password.setAttribute("placeholder", "Пароль");
    password.id = 'password';
    password.classList.add('form_input');
    newForm.appendChild(password);


    // Создаем элемент label
    const label = document.createElement("label");
    label.setAttribute("id", "checkbox_remember");

    // Создаем элемент input
    const checkRemember = document.createElement("input");
    checkRemember.setAttribute("type", "checkbox");
    checkRemember.setAttribute("name", "remember");
    checkRemember.setAttribute("id", "remember");
    checkRemember.setAttribute("value", "remember");

    // Создаем span для иконки
    const spanIcon = document.createElement("span");
    spanIcon.setAttribute("id", "checkbox_remember_icon");

    // Создаем span для текста
    const spanText = document.createElement("span");
    spanText.textContent = "Запомнить пароль";

    // Собираем элементы вместе
    label.appendChild(checkRemember);
    label.appendChild(spanIcon);
    label.appendChild(spanText);

    // Вставляем label в DOM
    newForm.appendChild(label);

    const formLink = document.createElement("a");
    formLink.setAttribute("href", "#");
    formLink.setAttribute("id", "recover_link");
    formLink.textContent = 'Восстановить';
    newForm.appendChild(formLink);

    const button_enter = document.createElement("button");
    button_enter.setAttribute("id", "button_enter");
    button_enter.textContent = 'Войти';
    newForm.appendChild(button_enter);

    const button_registration = document.createElement("button");
    button_registration.setAttribute("id", "button_registration");
    button_registration.setAttribute("type", "button");
    button_registration.textContent = 'Зарегестрироваься';
    newForm.appendChild(button_registration);

}


//закрытие модального окна по клику вне его контентной области
overlay.onmousedown = function (e) {
    let target = e.target;
    let modalContent = overlay.getElementsByClassName('main--form')[0];
    if (e.target.closest('.' + modalContent.className) === null) {
      this.classList.remove('modal--active');
      tagBody.classList.remove('hidden');
    }
  };


//валидация формы
window.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".main--form>form").addEventListener("submit", validateEnterForm);
});

function validateEnterForm(e){
    //убираем класс alert с элементов (если он был)
    document.querySelectorAll(".alert").forEach((elem)=>elem.classList.remove("alert"));
    //у полей логин и пароль проверяем не пустые ли они, у чекбокса проверяем "чек" он или "не чек" 
    const mail_phone = isEmpty(e.target.mail_phone);
    const password = isEmpty(e.target.password);
    const remember = e.target.remember.checked;
    console.log(mail_phone)
    console.log(password)
    //если хотя бы одно из полей пустое - останавливаем отправку формы
    if(mail_phone || password){
        e.preventDefault();
        return;
    }
    //если поля заполнены, создаем объект с введенными данными
    else{
        let AuthData = {
            login: e.target.mail_phone.value,
            password: e.target.password.value
            
        }
        //если пользователь пожелал "запомниться на сайте", сохраняем его данные в формате JSON строки
        //так конечно не делают, это небезопасно, здесь это реализовано для того, чтобы показать работу чекбокса
        if(remember){
            // Проверяем, существует ли уже такой ключ в localStorage
            if(localStorage.getItem(e.target.mail_phone.value) === null){
                localStorage.setItem(e.target.mail_phone.value, JSON.stringify(AuthData));
            } 
            //такой логин уже сохранялся
            else {
                alert('Ваш пароль уже сохранен на этом сайте');
            }
        }
        overlay.classList.remove('modal--active');
    }
   
    //очищаем и скрываем форму
    document.querySelector('.main--form>form').reset();
    
};

//проверяем не пустые ли поля
function isEmpty(field){
    if (field.value.trim() === ""){
        field.classList.add("alert");
    return true;
    };
    return false;
};

//проверяем поле "Логин". Ищем в localStorage логин и заполняем соответствующий пароль
function isLogin(e){
    const mail_phone = e.target;
    if(localStorage.getItem(mail_phone.value)){
        let user = JSON.parse(localStorage.getItem(mail_phone.value));
        document.querySelector('#password').value = user.password;
    }
}

//назначаем слушатель события для поля Логин при потере фокуса
document.querySelector('#mail_phone').addEventListener('blur', isLogin);