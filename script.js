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

})

//находим кнопку для закрытия формы, назначаем слушатель события "клик"
let close_form = document.querySelector('.main--form>form>svg');
close_form.addEventListener('click', function(){
    overlay.classList.remove('modal--active');
    document.querySelector('.main--form>form').reset();
})


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