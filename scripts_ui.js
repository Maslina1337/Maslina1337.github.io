let profile1 = {
    name: "Michael Jackson",
    elo: "325",
    about: "Im real MJ.",
    password: "13572468",
    mail: "skurat12051983@gmail.com",
    number: "+375336561591"
}

let profile2 = {
    name: "Dog",
    elo: "999",
    about: ":):):):):):):):):):):):):):):):):):):):):):):):):):):):):):)",
    password: "578934563945",
    mail: "dogCoolDog@gmail.com",
    number: "+375336561592"
}

let windowSize = [0, 0];

default_field = "field10.png";

let fieldsStyles = ["field00.png","field01.png","field02.png","field03.png","field04.png","field05.png","field06.png","field07.png","field08.png","field09.png","field10.png"];

let pick_piece_arrow = window.document.getElementById("arrow");
let pick_piece_gear1 = window.document.getElementById("gear1");
let pick_piece_gear2 = window.document.getElementById("gear2");

// function getWindowSize() {
//     windowSize[0] = getComputedStyle(window).width;
//     windowSize[1] = getComputedStyle(window).height;
// }

function setSizeChessSection() {
    let chess_field = window.document.querySelector("#chess_field");
    // let acheaveSize = String(parseInt(getComputedStyle(chess_field).height) - parseInt(getHeaderHeight())) + "px";
    let acheaveSize = "calc(100vmin - 92px - " + String(parseInt(getHeaderHeight())) + "px)";
    chess_field.style.height = acheaveSize;
    chess_field.style.width = acheaveSize;
}

function getHeaderHeight() {
    return getComputedStyle(window.document.querySelector("header")).height;
}

function callAttensionStandart(title) {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let attension_standart = window.document.getElementById("attension_standart")
    attension_standart.style.display = "flex";
    attension_standart.getElementsByTagName("h2")[0].innerHTML = title;  
}

function callAttensionQuestion(title, left_buttton, right_button) {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let attension_question = window.document.getElementById("attension_question")
    attension_question.style.display = "flex";
    attension_question.getElementsByTagName("h2")[0].innerHTML = title;  
    let buttons = attension_question.getElementsByTagName("button");
    buttons[0].innerHTML = left_buttton;
    buttons[1].innerHTML = right_button;
}

function callProfileEdit(profile) {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let edit_profile = window.document.getElementById("edit_profile")
    edit_profile.style.display = "flex";
    edit_profile.getElementsByClassName("name_input")[0].value = profile.name;
    let counter = edit_profile.getElementsByClassName("name_form")[0].getElementsByClassName("counter")[0];
    counter.setAttribute("string", String(edit_profile.getElementsByClassName("name_input")[0].value.length + "/20"));
    //edit_profile.getElementsByClassName("counter")[0].innerHTML = profile.name.length;
    edit_profile.getElementsByClassName("mail_input")[0].value = profile.mail; 
    edit_profile.getElementsByClassName("about_input")[0].value = profile.about;
}

function callSettings() {
    attensionCencel();
    window.document.getElementById("attension").style.display = "flex";
    let settings = window.document.getElementById("settings")
    settings.style.display = "flex";
}

function saveProfileChanges(profile) {
    let edit_profile = window.document.getElementById("edit_profile")
    let name = edit_profile.getElementsByClassName("name_input")[0].value;
    let mail = edit_profile.getElementsByClassName("mail_input")[0].value;
    
    if (name === "") {
        let error = edit_profile.getElementsByClassName('error')[0];
        error.style.display = "block";
        error.innerHTML = "У вас что нет имени?";
        edit_profile.getElementsByClassName("name_input")[0].value = profile.name;
        let counter = edit_profile.getElementsByClassName("name_form")[0].getElementsByClassName("counter")[0];
        counter.setAttribute("string", String(edit_profile.getElementsByClassName("name_input")[0].value.length + "/20"));
        return 0;
    }
    if (mail === "") {
        let error = edit_profile.getElementsByClassName('error')[0];
        error.style.display = "block";
        error.innerHTML = "Нам категорически нужна ваша почта.";
        edit_profile.getElementsByClassName("mail_input")[0].value = profile.mail;
        return 0;
    }
    attensionCencel();
}

function callPieceWheel() {
    if (userRights.canPickPiece) {
        userRights.canMoveFigure = false;
        attensionCencel();
        debugger;
        let attension = window.document.getElementById("attension");
        attension.style.display = "flex";
        let attension_window = attension.getElementsByClassName("window")[0];
        attension_window.style.borderRadius = "100%";
        attension_window.style.height = "60vh";
        attension_window.style.width = "60vh";
        attension_window.style.overflow = "visible";
        attension_window.style.padding = "40px";
        attension_window.style.backgroundImage = "url(img/bgheader.png)";
        let figure_select_wheel = window.document.getElementById("figure_select_wheel");
        default_pieces_wheel = 0;
        if (turn === "white") {
            default_pieces_wheel = ["bq", "bc", "bb", "bn"];
        } else {
            default_pieces_wheel = ["wq", "wc", "wb", "wn"];
        }
        Object.values(figure_select_wheel.getElementsByClassName("slot")).map((e, i) => {
            e.classList.remove("bq");
            e.classList.remove("bc");
            e.classList.remove("bb");
            e.classList.remove("bn");
            e.classList.remove("wq");
            e.classList.remove("wc");
            e.classList.remove("wb");
            e.classList.remove("wn");
            e.classList.add(default_pieces_wheel[i]);
            e.addEventListener("click", pieceWheelPick);
        })
        figure_select_wheel.style.display = "flex";
        window.addEventListener("mousemove", arrowFollowPointer);
    }
}

function pieceWheelPick(event) {
    let valid = false;
    if (String(event.target.classList).includes("up-left-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[0];
        valid = true;
    } else if (String(event.target.classList).includes("up-right-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[1];
        valid = true;
    } else if (String(event.target.classList).includes("down-left-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[2];
        valid = true;
    } else if (String(event.target.classList).includes("down-right-slot")) {
        chessField[userRights.canPickPiece[0]][userRights.canPickPiece[1]] = default_pieces_wheel[3];
        valid = true;
    }

    if (valid) {
        default_pieces_wheel = undefined;
        userRights.canMoveFigure = true;
        window.removeEventListener("mousemove", arrowFollowPointer);

        let attension = window.document.getElementById("attension");
        let attension_window = attension.getElementsByClassName("window")[0];
        attension_window.style.borderRadius = "";
        attension_window.style.height = "";
        attension_window.style.width = "";
        attension_window.style.overflow = "";
        attension_window.style.padding = "";
        attension_window.style.backgroundImage = "";

        attensionCencel();
        arrangeFigures();
    }
}

function arrowFollowPointer(event) {
    let width = window.innerWidth / 2 - parseInt(mouse_pos.x_vp);
    let height = window.innerHeight / 2 - parseInt(mouse_pos.y_vp);
    let rotate = Math.atan(height / width) * 180 / Math.PI;
    if (width < 0) {
        pick_piece_arrow.style.transform = "rotate(" + String(rotate) + "deg)";
    } else {
        pick_piece_arrow.style.transform = "rotate(" + String(rotate + 180) + "deg)";
    }
    pick_piece_gear1.style.transform = "rotate(" + String(rotate + 22,5) + "deg)";
    pick_piece_gear2.style.transform = "rotate(" + String(360 - rotate) + "deg)";
    // console.log(String(Math.atan(height / width) * 180 / Math.PI));
}

function attensionCencel() {
    window.document.getElementById("attension").style.display = "none";
    window.document.getElementById("attension_standart").style.display = "none";
    window.document.getElementById("edit_profile").style.display = "none";
    window.document.getElementById("edit_profile").getElementsByClassName("error")[0].style.display = "none";
    window.document.getElementById("attension_question").style.display = "none";
    window.document.getElementById("settings").style.display = "none";
    window.document.getElementById("edit_icon_scale_position").style.display = "none";
    window.document.getElementById("figure_select_wheel").style.display = "none";
}

function profileInteract(className, value, profile) {
    window.document.querySelectorAll(className).forEach(element => {
        element.innerHTML = profile[value];
    })
}

function counterText(className, inputName, maxLength) {
    let main = window.document.getElementsByClassName(className)[0];
    let counter = main.getElementsByClassName("counter")[0];
    counter.setAttribute("string", String(main.getElementsByClassName(inputName)[0].value.length) + "/" + String(maxLength));
}

// function RowGridSwitch(where, stuff) {
//     debugger
//     let whereHTML = window.document.getElementById(where);
//     if (whereHTML.getElementsByClassName("header")[0].getElementsByClassName("radio")[0].getElementsByTagName('input')[0].checked) {
//         whereHTML.getElementsByClassName("slot_field")[0].style = "";
//         let computedHeigth = parseInt(getComputedStyle(whereHTML.getElementsByClassName("slot_field")[0].getElementsByClassName("slot")[0]).height);
//         whereHTML.getElementsByClassName("slot_field")[0].style.maxHeigth = String(computedHeigth + 12) + "px";
//     } else {
//         whereHTML.getElementsByClassName("slot_field")[0].style = "";
//         let computedWidth = parseInt(getComputedStyle(whereHTML.getElementsByClassName("slot_field")[0].getElementsByClassName("slot")[0]).width);
//         whereHTML.getElementsByClassName("slot_field")[0].style.maxWidth = String((computedWidth + 12) * 4) + "px";
//     }
// }

function OpenCloseSwitch(placement, heigth) {
    let whereHTML = window.document.getElementById(placement);
    if (whereHTML.getElementsByClassName("OpenClose")[0].checked) {
        whereHTML.getElementsByClassName("slot_field")[0].style.maxHeight = String(heigth) + "px";
        whereHTML.getElementsByClassName("slot_field")[0].style.overflowClipMargin = "content-box";
    } else {
        whereHTML.getElementsByClassName("slot_field")[0].style.maxHeight = "";
        whereHTML.getElementsByClassName("slot_field")[0].style.overflowClipMargin = "";
    }
}

function changeChessField(field) {
    window.document.getElementById("chess_field").style.backgroundImage = "url(img/" + field + ")";
}

function iconUpload(inputBox) {
    inputBox = window.document.getElementsByClassName(inputBox)[0];
    let input = inputBox.getElementsByTagName("input")[0];
    if (true) {
        console.log(input.files[0]);
        attensionCencel();
        window.document.getElementById("attension").style.display = "flex";
        let edit_icon_scale_position = window.document.getElementById('edit_icon_scale_position');
        edit_icon_scale_position.style.display = "flex";
        edit_icon_scale_position.getElementsByClassName('icon_change_field')[0].getElementsByTagName("img")[0].setAttribute("src", input.files[0])
    }
}

function compliteBeatenFigures(turn) {
    let beatenFigureField = (turn === "white" ? beatenFiguresBlack_value : beatenFiguresWhite_value);
    if (beatenFigureField !== null) {
        if ((turn === "white" ? beatenFiguresBlack.length : beatenFiguresWhite.length) === 1) {
            beatenFigureField.style.display = "flex";
            let slot = window.document.createElement("div");
            slot.classList.add("slot")
            slot.style.backgroundImage = "url(img/" + (turn === "white" ? beatenFiguresBlack[0] : beatenFiguresWhite[0]) + ".png)"; 
            beatenFigureField.appendChild(slot);
        } else {
            beatenFigureField.style.display = "flex";
            let slot = window.document.createElement("div");
            slot.classList.add("slot")
            slot.style.backgroundImage = "url(img/" + (turn === "white" ? beatenFiguresBlack[beatenFiguresBlack.length - 1] : beatenFiguresWhite[beatenFiguresWhite.length - 1]) + ".png)"; 
            beatenFigureField.appendChild(slot);
        }
    }
}

function callSpectateWarning() {
    let spectateModeWarning = window.document.getElementById("spectateModeWarning");
    spectateModeWarning.style.display = "flex";
    if (spectateModeWarning.getElementsByTagName("input")[0].checked) {
        spectateModeWarning.getElementsByTagName("p")[0].style.display = "none";
    } else {
        spectateModeWarning.getElementsByTagName("p")[0].style.display = "block";
    }
}

function uncallSpectateWarning() {
    window.document.getElementById("spectateModeWarning").style.display = "none";
}

function RightClickMenuEventAdd() {
    figure.map((f) => {                                             //context menu
        f.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            callRightClickMenu(test);
        })
    });
}




let test = [{type: "button", title: "call HI", function: "alert('hi')"}, {type: "button", title: "call HO", function: "alert('HO')"}];
const right_click_menu = window.document.getElementById("right_click_menu");
let mouse_pos = {
    x: "",
    y: ""
}

function callRightClickMenu(array) {
    right_click_menu.innerHTML = "";
    array.map((object) => {
        if (object.type === "button") {
            let button = window.document.createElement("button");
            button.innerHTML = object.title;
            button.addEventListener("click", (event) => {
                object.function;
                alert("it work");
            })
            right_click_menu.appendChild(button);
        }
    });
    right_click_menu.style = "";
    right_click_menu.style.display = "flex";
    
    // alert(getComputedStyle(right_click_menu).width);
    // alert(getComputedStyle(right_click_menu).height);
    // alert(window.innerWidth);
    // alert(window.innerHeight);
    // 

    let isBothSidesAreFull = [false, false];

    if (parseInt(getComputedStyle(right_click_menu).width) + parseInt(mouse_pos.x) > window.innerWidth) {
        right_click_menu.style.left = parseInt(mouse_pos.x) - parseInt(getComputedStyle(right_click_menu).width) + "px";
        isBothSidesAreFull[0] = true;
    } else {
        right_click_menu.style.left = mouse_pos.x;
    }
    
    if (parseInt(getComputedStyle(right_click_menu).height) + parseInt(mouse_pos.y) > window.innerHeight) {
        right_click_menu.style.top = parseInt(mouse_pos.y) - parseInt(getComputedStyle(right_click_menu).height) + "px";
        isBothSidesAreFull[1] = true;
    } else {
        right_click_menu.style.top = mouse_pos.y;
    }

    if (isBothSidesAreFull[0] && isBothSidesAreFull[1]) { //Не пашет
        right_click_menu.style.borderBottomRightRadius = "0px";
    } else if (!isBothSidesAreFull[0] && isBothSidesAreFull[1]) {
        right_click_menu.style.borderBottomLeftRadius = "0px";
    } else if (isBothSidesAreFull[0] && !isBothSidesAreFull[1]) {
        right_click_menu.style.borderTopRightRadius = "0px";
    } else if (!isBothSidesAreFull[0] && !isBothSidesAreFull[1]) {
        right_click_menu.style.borderTopLeftRadius = "0px";
    }
}

let slot_field = window.document.getElementById("settings").getElementsByClassName("field_select")[0].getElementsByClassName("slot_field")[0];
fieldsStyles.map(field => {
    button = window.document.createElement("input");
    button.setAttribute("type", "radio");
    button.setAttribute("name", "field");
    button.className = "slot";
    button.setAttribute("onclick", `changeChessField("${field}")`);
    button.style.backgroundImage = `url(img/${field})`
    if (field = default_field) {
        button.checked = true;
    }
    slot_field.appendChild(button);
})

let beatenFiguresBlack_value = window.document.getElementById("beatenFiguresBlack");
let beatenFiguresWhite_value = window.document.getElementById("beatenFiguresWhite");

// beatenFiguresBlack_value.style.maxHeight = 0;
// beatenFiguresBlack_value.style.paddingTop = 0;
// beatenFiguresBlack_value.style.paddingBottom = 0;
beatenFiguresBlack_value.style.display = "none";

// beatenFiguresWhite_value.style.maxHeight = 0;
// beatenFiguresWhite_value.style.paddingTop = 0;
// beatenFiguresWhite_value.style.paddingBottom = 0;
beatenFiguresWhite_value.style.display = "none";

window.document.addEventListener("click", (event) => {
    right_click_menu.style.display = "none";
    // right_click_menu.style.display = "none";
});
    
window.document.getElementById("right_click_menu").addEventListener("contextmenu", (event) => {
    event.preventDefault();
})

window.addEventListener("mousemove", (event) => {
    mouse_pos.y = String(event.pageY) + "px";
    mouse_pos.x = String(event.pageX) + "px";
    mouse_pos.y_vp = String(event.clientY) + "px";
    mouse_pos.x_vp = String(event.clientX) + "px";
});

window.addEventListener("resize", setSizeChessSection);
// window.addEventListener("resize", getWindowSize);

profileInteract(".name", "name", profile1);
profileInteract(".elo", "elo", profile1);
profileInteract(".about", "about", profile1);

setSizeChessSection();
