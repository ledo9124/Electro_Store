/**
 * * Mong muốn đạt được / Output
 * -Có thể sử lý cơ bản tất cả các rules của input;
 * -Tối ưu độ thích nghi với nhiều form
 * -Đầu ra có thể là hành động mặc định của web đối với button trong form,
 * hoặc có thể trả về một objetc với đầy đủ thông tin người dùng nhập vào input.
 * 
 * 
 * 
 * * Các yêu cầu cơ bản về form khi áp dụng:
 * -Các input sẽ được gọi là một group 
 * -Trong form group yêu cầu có:
 *      + Thẻ div có class form-group bọc mỗi form input
 *      + input(có name , id , rules) => Attribute của thẻ input,
 *        rules là để khai báo những quy tắc của input (VD: required => Bắt buộc nhập, email ,..),
 *        trong rules có thể chứa nhiều rule và giữa các rule ngăn cách = '|' (VD: rules="required|email").
 *      + Một thẻ có class form-message(message => Mong muốn khi invalid) => Attribute,
 *        message có tác dụng là để hiện thị cảnh báo khi invalid or valid (Nếu không có thì message sẽ hiện message mặc định).
 *  VD : 
 *      <div class="form-group">
            <label for="fullname" class="form-label">User Name</label>
            <input type="text" rules="required" name="fullname" id="fullname" placeholder="VD: Lê Độ">
            <span class="form-message" message="Vui lòng nhập fullname!"></span>
        </div>

**  Tên các rules xem ở phần validatorRules VD: required , email , password , comfirm ,...

        
 * * Cú pháp khai báo hàm
        new Validator(id của form);

        khi muốn lấy ra giá trị của các input 
        let form = new Validator(selector của form);
        form.onSubmit = function(data) {
            console.log(data); //data chính là object chưa các value của input;
        }

        VD : let form = new Validator('#form-1');
            form.onSubmit = function(data) {
                console.log(data);
            };
 * 
*/

function Validator(formSelector) {

    // Lấy ra form element trong DOM theo 'formSelector'
    let formElement = document.querySelector(formSelector);

    //Tạo class khi nhập sai và đúng dữ liệu
    const invalidInputStyle = `
    form .form-group.invalid input{
        background-color: #ff00001c;
        border: 2px solid #ff0000;
        transition: .3s;
    }

    form .form-group.invalid input:focus,
    form .form-group.invalid input:hover {
        background-color: transparent;
        border-color: #ff0000;
        box-shadow: inset 2px 2px 2px #ff00001c,
                    inset -2px -2px 2px #ff00001c;
    }

    form .form-group.invalid .form-message {
        color: #ff0000;
    }
    `;

    const validInputStyle = `
    form .form-group.valid input{
        background-color: #0dff921c;
        border: 2px solid #0dff92;
        transition: .3s;
    }

    form .form-group.valid input:focus,
    form .form-group.valid input:hover {
        background-color: transparent;
        border-color: #0dff92;
        box-shadow: inset 2px 2px 2px #0dff921c,
                    inset -2px -2px 2px #0dff921c;
    }

    form .form-group.valid .form-message {
        color: #03a724;
    }`;

    // Tạo element <style> và thêm vào trong <head> của trang
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);

    // Thêm các đoạn CSS vào element <style> vừa tạo
    styleElement.innerHTML = invalidInputStyle + validInputStyle;

    function invalidValue(formGroup) {
        if (formGroup.classList.contains('valid')) {
            formGroup.classList.remove('valid');
        }
        formGroup.classList.add('invalid');
    };

    function validValue(formGroup) {
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');
        }
        formGroup.classList.add('valid');
    };

    const _This = this;

    let formRules = {};

    let validatorRules = {

        required : function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này!';
        },

        email: function(value) {
            const regexEmail = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
            return regexEmail.test(value) ? undefined : 'Vui lòng nhập email!';
        },

        password: function(value) {
            const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{0,}$/;
            return regexPassword.test(value) ? undefined : 'Mật khẩu bao gồm chữ in hoa , số  , ký tự!';
        },

        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự!`;
            }
        },

        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : `Vui lòng nhập tối đa ${max} ký tự!`;
            }
        },

        comfirm: function(comfirm) {
            return function (value) {
                return value === formElement.querySelector(comfirm).value ? undefined : 'Vui lòng nhập đúng dữ liệu!';
            }
        },

        isFile: function (file) {
            if (!file) {
                return 'Vui lòng chọn một tệp hình ảnh!';
            }
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            return allowedTypes.includes(file.type) ? undefined : 'Chỉ chấp nhận tệp hình ảnh có định dạng JPEG, PNG hoặc GIF!';
        }
    };

    // Chỉ thực hiện khi có formElement
    if (formElement) {
        // Lấy ra các rules của từng input 
        let inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) {

            let rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                
                let ruleFunc = validatorRules[rule];

                if (rule.includes(':')) {
                    let ruleInfo = rule.split(':');
                    rule = ruleInfo[0];

                    ruleFunc = validatorRules[rule](ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                }else {
                    formRules[input.name] = [ruleFunc];
                }
            };

            // handle validate (blur , change ...)
            input.onblur = handleValidate;
            input.oninput = handleClearError;

            // Hàm thực hiện validate
            function handleValidate(event) {
                let rules = formRules[event.target.name];
                let errorMessage; 

                rules.some((rule , index) => {
                    switch (event.target.type) {
                        case 'radio':
                        case 'checkbox':
                            errorMessage = rules[index](
                                formElement.querySelector('#' + event.target.id + ':checked') ? 'true' : ''
                            );
                            break;
                        case 'file':
                            errorMessage = rules[index](event.target.files[0]);
                            break;
                        default:
                            errorMessage = rules[index](event.target.value);
                    };

                    return errorMessage;
                });

                // Thực hiện hiện thị errorMessage ra UI
                let formGroup = event.target.closest('.form-group');
                let formMessage;
                if (formGroup) {
                    formMessage = formGroup.querySelector('.form-message');
                };

                if (formMessage) {
                    if (errorMessage) {
                        if (formMessage.getAttribute('message')) {
                            formMessage.innerText = formMessage.getAttribute('message');
                        }else {
                            formMessage.innerText = errorMessage;
                        }
                        invalidValue(formGroup);
                    } else {
                        formMessage.innerText = 'Hợp lệ!';
                        validValue(formGroup);
                    };
                };

                return !errorMessage;
            };

            // Hàm clear error message
            function handleClearError(event) {

                let formGroup = event.target.closest('.form-group');
                let formMessage;
                if (formGroup) {
                    formMessage = formGroup.querySelector('.form-message');
                };
                formMessage.innerText = '';
                if (formGroup) {
                    if (formGroup.matches('invalid')) {
                        formGroup.classList.remove('invalid');
                    }
                    if (formGroup.matches('valid')) {
                        formGroup.classList.remove('valid');
                    }

                };

            };

        };
    
    };

    // Xử lý hành vi submit của form
    formElement.onsubmit = function(event) {
        event.preventDefault();

        let inputs = formElement.querySelectorAll('[name][rules]');
        let isValid = true;
        for (var input of inputs) {
            if (!handleValidate({ target : input})) {
                isValid = false;
            };
        };

        if (isValid) {

            if (typeof _This.onSubmit === 'function') {

                let enableInputs = formElement.querySelectorAll('[name]');
                let formValues = Array.from(enableInputs).reduce(function(values , input){

                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            if (typeof values[input.name] === 'undefined') {
                                values[input.name] = '';
                            }
                            if(!input.matches(':checked')) return values;
                            if(!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case 'file':
                            values[input.name] = input.files;
                            break;
                        default: 
                            values[input.name] = input.value;
                    }
                    return values;
                }, {});

                _This.onSubmit(formValues);
            }else {
                formElement.submit();
            }

        };

    };

};