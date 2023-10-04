const tvButton = $("#tvButton");
const tvSwitch = $("#tvSwitch");
const tvDisplay = $("#tvDisplay");
var isTvOn = false;

// switching on tv

tvSwitch.click(() => {
  if (isTvOn) {
    tvButton.removeClass("tv-on tv-off");
    tvSwitch.removeClass("switch-on");
    isTvOn = false;
  } else {
    tvButton.addClass("tv-off");
    tvSwitch.addClass("switch-on");
    isTvOn = true;
  }
});

// pressing tv buttons

tvButton.click(() => {
  if (isTvOn) {
    if (tvButton.hasClass("tv-on")) {
      tvDisplay.addClass("display-none");
    } else {
      tvDisplay.removeClass("display-none");
    }
    tvButton.toggleClass("tv-on tv-off");
  }
});
