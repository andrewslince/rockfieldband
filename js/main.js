if (!String.prototype.trim) {

    /**
     * Implements trim function, to remove blank spaces around the strings
     *
     * @author Andrews Lince <andrews@neemu.com>
     * @since  1.0.0
     * @return {String}
     */
    String.prototype.trim = function () {
        return this.replace(/^\s+/,'').replace(/\s+$/, '');
    };
}

function dbg(data) {
    console.log(data);
}

function sendContactMessage(frm) {
    var frmIsValid = true,
        fieldValue = "",
        htmlOutput = "",
        frmFields  = frm.querySelectorAll(
            "input[type='text'], input[type='email'], textarea"
        );

    // clean current errors
    for (var i = 0; i < frmFields.length; i++) {
        frmFields[i].parentNode.classList.remove("error");
    }

    // validate form fields
    for (var i = 0; i < frmFields.length; i++) {

        // clean blank spaces around the string
        fieldValue = frmFields[i].value.trim();

        if (fieldValue === "") {

            // register field error
            frmFields[i].parentNode.classList.add("error");

            // register flag from form error
            if (frmIsValid) {
                frmIsValid = false;
            }
        }
    }

    if (!frmIsValid) {

        htmlOutput += "<div id=\"sent-message\">";
        htmlOutput += "<i class=\"ok\"></i>";
        htmlOutput += "<h4>mensagem enviada com sucesso!!!</h4>";
        htmlOutput += "<p>muito obrigado por entrar em contato com a gente e aguarde, porque vamos lhe responder logo logo.</p>";
        htmlOutput += "</div>";

        // display success message
        frm.innerHTML = htmlOutput;

        // run a animation on the success icon
        setTimeout(function(){
            frm.querySelector("i").classList.add("animate");

            setTimeout(function(){
                frm.querySelector("i").classList.remove("animate");
            }, 600);
        }, 300);

    } else {

        // register the form as invalid
        frm.classList.add("error");

        // set the focus to the first invalid field
        frm.querySelector(".row.error input, .row.error textarea").focus();

        // go to the top of the form
        smoothScroll.init({
            target   : frm,
            discount : -120
        });
    }

    return false;
}

function menuNav(target) {
    var discount = (document.querySelector("nav").classList.contains("floating"))
        ? -110
        : -190;

    smoothScroll.init({
        target   : target,
        discount : discount
    });
}

/**
 * Register go to top
 * 
 * @return {Void}
 */
function goToTop() {
    smoothScroll.init({
        target : document.body
    });
}

window.addEventListener("scroll", function(event) {
    var top = (window.pageYOffset || document.documentElement.scrollTop);

    // displays go to the top
    document.getElementById("go-to-top").style.display = (top > 1000)
        ? "block"
        : "none";

    // displays floating menu navigation
    if (top > 300) {
        document.querySelector("nav").classList.add("floating");
    } else {
        document.querySelector("nav").classList.remove("floating");
    }
}, false);

// register lazy loading images
echo.init({
    offset   : 100,
    throttle : 250,
    unload   : false
});