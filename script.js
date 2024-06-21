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
    if(document.querySelector('form')){
        form.removeChild();
    }
        const newForm = document.createElement('form');
        newForm.setAttribute('method', 'post');
        newForm.setAttribute('target', '_blank');
        form.appendChild(newForm);
        

        newForm.innerHTML = `<svg id="close_form" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="52" height="52" rx="10" fill="white"/>
                                <path d="M32 20L20 32" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20 20L32 32" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p>Войти в систему</p>
                            <input class="form_input" type="text" name="mail_phone" placeholder="Email/Телефон" id="mail_phone" value="">
                            <input class="form_input" type="password" name="password" id="password" placeholder="Пароль" value="">
                                <label id="checkbox_remember">
                                    <input type="checkbox" name="remember" id="remember" value="remember" >
                                    <span id="checkbox_remember_icon"></span>
                                    <span>Запомнить пароль</span>
                                </label>
                            <a href="#" id="recover_link">Восстановить</a>
                            <button id="button_enter">Войти</button>
                            <button id="button_registration" type="button">Зарегестрироваться</button>`;

        if(document.querySelector(".main--form>form")){
            
            //валидация формы
            
            document.querySelector(".main--form>form").addEventListener("submit", validateEnterForm);
            
        }

        if(document.querySelector('#mail_phone')){
            //назначаем слушатель события для поля Логин при потере фокуса
            document.querySelector('#mail_phone').addEventListener('blur', isLogin);
        }

        if(document.querySelector('#close_form')){
            //находим кнопку для закрытия формы, назначаем слушатель события "клик"
            let close_form = document.querySelector('#close_form');
            close_form.addEventListener('click', function(){
            overlay.classList.remove('modal--active');
            form.removeChild(newForm);
            })
        }


        //закрытие модального окна по клику вне его контентной области
        overlay.onmousedown = function (e) {
            let target = e.target;
            let modalContent = overlay.getElementsByClassName('main--form')[0];
            if (e.target.closest('.' + modalContent.className) === null) {
                this.classList.remove('modal--active');
                tagBody.classList.remove('hidden');
                form.removeChild(newForm);
            }
        };
    }

function validateEnterForm(e){
    //убираем класс alert с элементов (если он был)
    document.querySelectorAll(".alert").forEach((elem)=>elem.classList.remove("alert"));
    //у полей логин и пароль проверяем не пустые ли они, у чекбокса проверяем "чек" он или "не чек" 
    const mail_phone = isEmpty(e.target.mail_phone);
    const password = isEmpty(e.target.password);
    const remember = e.target.remember.checked;
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

