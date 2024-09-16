// import { validate } from './validate.js';
// const validate = require("./validate.js");

$(document).ready(function(){
     // const validate = require("./validate.js");

    var constraints = {
        inputName: {
            presence: true,
            length: {
                minimum: 2,
                message: "должно содержать как минимум 2 символа"
            }
        },
        inputLastname: {
            presence: true,
            length: {
                minimum: 2,
                message: "должно содержать как минимум 2 символа"
            }
        },
        inputPhone: {
            presence: true,
            numericality: {
                onlyInteger: true,
                greaterThanOrEqualTo: 1000000000,
                lessThanOrEqualTo: 9999999999,
                message: "должен быть действительным номером телефона"
            }
        },
        inputCountry: {
            presence: true,
            length: {
                minimum: 2,
                message: "должно содержать как минимум 2 символа"
            }
        },
        inputIndex: {
            presence: true,
            format: {
                pattern: /^\d{6}$/,
                message: "должен состоять из 6 цифр"
            }
        },
        inputAddress: {
            presence: true
        }
    };

    var form = document.querySelector("#order-form");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    function handleFormSubmit(form) {
        // Получаем значения полей формы
        const formData = new FormData(form);

        // Отладка - выводим значения полей в консоль
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        var errors = validate(formData, constraints);

        if (errors) {
            showErrors(form, errors);
        } else {
            alert("Форма успешно отправлена!"); // Здесь можно отправить форму или выполнить другие действия
            // form.submit(); // Если хотите отправить форму после успешной валидации
        }
    }

    function showErrors(form, errors) {
        // Удаляем предыдущие ошибки
        var errorElements = form.querySelectorAll(".error-message");
        errorElements.forEach(function(el) {
            el.remove();
        });

        Object.keys(errors).forEach(function(key) {
            var messages = errors[key];
            messages.forEach(function(message) {
                var inputField = form.querySelector(`#${key}`);
                var errorMessage = document.createElement("div");
                errorMessage.className = "error-message text-danger"; // Добавляем класс для стилей
                errorMessage.innerText = message;
                inputField.parentNode.insertBefore(errorMessage, inputField.nextSibling);
            });
        });
    }
});