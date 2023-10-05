const tvButton = $("#tvButton");
const tvSwitch = $("#tvSwitch");
const tvDisplay = $("#tvDisplay");
const remotePowerBtn = $("#remotePowerBtn");
const volumeIncreaseBtn = $("#volumeIncreaseBtn");
const volumeDecreaseBtn = $("#volumeDecreaseBtn");
const channelIncreaseBtn = $("#channelIncreaseBtn");
const channelDecreaseBtn = $("#channelDecreaseBtn");
const channelNumber = $("#channelNumber");
const volumeContainer = $("#volumeContainer");
const volumeCount = volumeContainer.find("span");
const volumeCountSlider = volumeContainer.find("input");
const CHANNEL_COUNT = 50;
const VOLUME_COUNT = 50;
var isTvOn = false;
var tvVolumeCount = 10;
var tvChannelNumber = 1;

const timedDisplayHide = (element) => {
  element.removeClass("display-none");
  setTimeout(() => {
    element.addClass("display-none");
  }, 5000);
};

// switching on tv

tvSwitch.click(() => {
  if (isTvOn) {
    tvButton.removeClass("tv-on tv-off");
    tvDisplay.addClass("display-none");
    tvSwitch.removeClass("switch-on");
    isTvOn = false;
  } else {
    tvButton.addClass("tv-on");
    tvDisplay.removeClass("display-none");
    tvSwitch.addClass("switch-on");
    isTvOn = true;
  }
});

// tv power buttons

const powerTv = () => {
  if (isTvOn) {
    if (tvButton.hasClass("tv-on")) {
      tvDisplay.addClass("display-none");
    } else {
      tvDisplay.removeClass("display-none");
      changeChannel();
      changeVolume();
    }
    tvButton.toggleClass("tv-on tv-off");
  }
};

tvButton.click(() => powerTv());
remotePowerBtn.click(() => powerTv());

// channel change buttons

const changeChannel = () => {
  timedDisplayHide(channelNumber);
  channelNumber.text(tvChannelNumber);
};

channelIncreaseBtn.click(() => {
  if (isTvOn) {
    tvChannelNumber = (tvChannelNumber % CHANNEL_COUNT) + 1;
    changeChannel();
  }
});

channelDecreaseBtn.click(() => {
  if (isTvOn) {
    tvChannelNumber = tvChannelNumber > 1 ? tvChannelNumber - 1 : CHANNEL_COUNT;
    changeChannel();
  }
});

// volume change buttons

const changeVolume = () => {
  timedDisplayHide(volumeContainer);
  volumeCount.text(tvVolumeCount);
  volumeCountSlider.val(tvVolumeCount);
  let value = (tvVolumeCount / VOLUME_COUNT) * 100;
  volumeCountSlider.css(
    "background",
    "linear-gradient(to right, #ffffff 0%, #ffffff " + value + "%, rgba(255,255,255,0) " + value + "%, rgba(255,255,255,0) 100%)"
  );
};

volumeIncreaseBtn.click(() => {
  if (isTvOn) {
    tvVolumeCount = tvVolumeCount < VOLUME_COUNT ? tvVolumeCount + 1 : tvVolumeCount;
    changeVolume();
  }
});

volumeDecreaseBtn.click(() => {
  if (isTvOn) {
    tvVolumeCount = tvVolumeCount > 1 ? tvVolumeCount - 1 : tvVolumeCount;
    changeVolume();
  }
});

//on page load

$(document).ready(() => {
  changeChannel();
  volumeCountSlider.attr("max", VOLUME_COUNT);
  changeVolume();
});
