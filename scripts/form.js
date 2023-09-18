const URL = "https://kitchen-decoration.onrender.com/"
const KITCHEN = 'kitchen'
const CUPBOARD = 'cupboard'
const SUBJECT = 'subject'
const CONNECTION = 'connection'
const FINAL = 'final'
const SUCCESSFULLY = 'successfully'
const FAILED = 'failed'
const excludedSubjects = [KITCHEN, CUPBOARD, CONNECTION, FINAL, SUBJECT];

let formData = {
    subject: '',
}
let inputName;

step__in__block = 1;

// service blocks
let subject = document.getElementById(SUBJECT);
let kitchen = document.getElementById(KITCHEN);
let connection = document.getElementById(CONNECTION);
let final = document.getElementById(FINAL);

// buttons
let back = document.querySelector('.navigations__back');
let next = document.querySelector('.navigations__next');
let skip = document.querySelectorAll('.skip')

// block
let service__blocks = document.querySelectorAll('.services__block');

// step
let steps = document.querySelectorAll('.step');

// Форма для связывания с пользователем

let stepInputs = document.querySelectorAll(`.step__${step__in__block} input`);

function disableButton(button, bool) {
    // button.disabled = bool;
    bool ? button.classList.add('no__visible') : button.classList.remove('no__visible')
}

const showServiceBlock = (service__block, step) => {
    service__blocks.forEach(block => {
        block.classList.remove('visible');
    })
    if (service__block == CONNECTION) {
        document.getElementById(service__block).classList.add('visible');
        return;
    }
    step ? document.querySelector(`.${formData.subject} .${step}`).classList.add('visible') : null;
    document.getElementById(service__block ? service__block : formData.subject || SUBJECT).classList.add('visible');
}

const fuseServiceBlock = () => {
    if (!excludedSubjects.includes(formData.subject)) {
        showServiceBlock(null, 'step__1');
    }
}

subject.addEventListener('change', (e) => {
    const selectedTheme = e.target.value;
    formData = {}
    formData.subject = selectedTheme
    if (excludedSubjects.includes(formData.subject)) {
        disableButton(next, false);
    } else {
        disableButton(next, true);
    }
    disableButton(back, true)
})

const handleStep = (step__in__block) => {
    steps.forEach(step => {
        step.classList.remove('visible');
    });
    document.querySelector(`.${formData.subject} .step__${step__in__block}`).classList.add('visible');
    stepInputs = document.querySelectorAll(`.step__${step__in__block} input`);
    inputName = null;
    handleInputs()
}

const handleInputs = () => {
    stepInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            inputName = e.target.name;
            const value = e.target.value
            if (formData[inputName] = value) {
                disableButton(next, false);
            };
            disableButton(next, false)
        })
    })
}

connection.addEventListener('change', (e) => {
    const name = e.target.name;
    const value = e.target.value;
    formData[name] = value;
    disableButton(next, false)

})

final.addEventListener("submit", async (event) => {
    event.preventDefault(); // Предотвращаем отправку формы
    formData.name = document.getElementById("firstName").value;
    formData.surname = document.getElementById("lastName").value;
    formData.phone = document.getElementById("phoneNumber").value;

    try {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        showServiceBlock(SUCCESSFULLY, null)
    } catch (err) {
        showServiceBlock(FAILED, null)
    } finally {
        disableButton(next, true)
        disableButton(back, true)
    }
    // Отправляем данные на сервер с помощью fetch


    // Очищаем поля формы
    document.getElementById(FINAL).reset();
});

skip.forEach(btn => {
    btn.addEventListener('click', () => {
        step__in__block++;
        handleStep(step__in__block);
    })
})

next.addEventListener('click', () => {
    fuseServiceBlock()
    disableButton(next, true);
    if (step__in__block === document.querySelectorAll(`.${formData.subject} .step`).length && !connection.classList.contains('visible')) {
        showServiceBlock(CONNECTION, null);
        return;
    }
    if (document.getElementById(CONNECTION).classList.contains('visible')) {
        showServiceBlock(FINAL, null);
        disableButton(next, true);
        return;
    }
    if (step__in__block < document.querySelectorAll(`.${formData.subject} .step`).length) {
        if (subject.classList.contains('visible') && excludedSubjects.includes(formData.subject)) {
            showServiceBlock(null, 'step__1');
        } else {
            step__in__block++;
            handleStep(step__in__block);
        }
    }
    if (step__in__block >= 1) {
        disableButton(back, false);
    }
})

back.addEventListener('click', () => {
    fuseServiceBlock()
    if (document.querySelector(`.${formData.subject} .step__1`).classList.contains('visible')) {
        showServiceBlock(SUBJECT, 'step__1')
        disableButton(back, true);
    }
    if (step__in__block < document.querySelectorAll(`.${formData.subject} .step`).length || document.getElementById(FINAL).classList.contains('visible')) {
        disableButton(next, false)
    }
    if (document.getElementById(CONNECTION).classList.contains('visible')) {
        showServiceBlock(null, `step__${step__in__block}`);
        return;
    }
    if (document.getElementById(FINAL).classList.contains('visible')) {
        showServiceBlock(CONNECTION, null);
        return;
    }
    if (step__in__block > 1) {
        step__in__block--;
        handleStep(step__in__block);
    }
})

// Изначально отключаем кнопку Next
disableButton(next, true)
disableButton(back, true)
handleInputs()