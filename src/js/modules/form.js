export default class Form {
    constructor(form) {
        this.forms = document.querySelectorAll(form);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'Loading...',
            success: 'Thank you! we will contact you soon!',
            failure: 'Something went wrong...:('
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInpits() {
        const mailInputs = document.querySelectorAll('[type="email"]');

        mailInputs.forEach(input => {
            input.addEventListener('keypress', function (e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    initMask(){
            let setCursorPosition = (pos, elem) => {
                elem.focus();
                
                if (elem.setSelectionRange) {
                    elem.setSelectionRange(pos, pos);
                } else if (elem.createTextRange) {
                    let range = elem.createTextRange();
        
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
            function createMask (event) {
                const input = event.target;
                let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = input.value.replace(/\D/g, '');
        
            if(def.length >= val.length) {
                val = def;
                }
        
         //take every symbol from matrix and check whether is it a digit and symbol index is lower than value.length. 
         // if true = skip to the next symbol, 
         // if false - another check whether iteration index is higher or eq to value.lengts, is true - delete symbol, if false - stay as it is 
                input.value = matrix.replace(/./g, function (a) {
                    return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
                  });
             
                if (event.type === 'blur') {
                    if (input.value.length === 2) {
                        input.value = '';
                    }
                } else {
                    setCursorPosition(input.value.length, input);
                }
            }
        
            let inputs = document.querySelectorAll('[name="phone"]');
        
            inputs.forEach(input => {
                input.addEventListener('input', createMask);
                input.addEventListener('focus', createMask);
                input.addEventListener('blur', createMask);
            });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: data
        });

        return await res.text();
    }
    init() {
        this.checkMailInpits();
        this.initMask();
        this.forms.forEach(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                let statusMessage = document.createElement("div");
                statusMessage.style.cssText = `
                margin-top: 15px;
                font-size: 18px;
                color: grey;
                `;
                form.parentNode.appendChild(statusMessage);

                statusMessage.textContent = this.message.loading;

                const formData = new FormData(form);

                this.postData(this.path, formData)
                    .then(res => {
                        console.log(res);
                        statusMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                    statusMessage.textContent = this.message.failure;

                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                        }, 5000);
                });
            });
        });
    }
}
