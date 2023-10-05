import { CHANNEL_DATA } from "./assets/data.js";

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
const tvDisplayVideo = $("#tvDisplayVideo");
const tvDisplaySource = $("#tvDisplaySource");
const subscribeContainer = $("#subscribeContainer");
const subscribeButton = $("#subscribeButton");
const speakerSwitch = $("#speakerSwitch");
const speakerVolume = $("#speakerVolume");
const speakerVolumeIncreaseBtn = $("#speakerVolumeIncreaseBtn");
const speakerVolumeDecreaseBtn = $("#speakerVolumeDecreaseBtn");
const speakerLight = $(".speaker-light");
const CHANNEL_COUNT = 50;
const VOLUME_COUNT = 50;
const SPEAKER_VOLUME_COUNT = 50;
const SUBSCRIBED_CHANNELS = Array.from(new Array(25), (x, i) => i);
var isTvOn = false;
var isSpeakerOn = false;
var tvVolumeCount = 20;
var tvChannelNumber = 1;
var speakerVolumeCount = 20;

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
    tvDisplayVideo.trigger("pause");
    tvDisplaySource.attr("src", "");
    isTvOn = false;
  } else {
    tvButton.addClass("tv-on");
    tvDisplay.removeClass("display-none");
    tvSwitch.addClass("switch-on");
    changeChannel();
    changeVolume();
    isTvOn = true;
  }
});

// switching on speaker

speakerSwitch.click(() => {
  if (isSpeakerOn) {
    speakerSwitch.removeClass("switch-on");
    speakerLight.removeClass("speaker-on");
    speakerVolume.text("");
    isSpeakerOn = false;
  } else {
    speakerSwitch.addClass("switch-on");
    speakerLight.addClass("speaker-on");
    speakerVolume.text(speakerVolumeCount);
    isSpeakerOn = true;
  }
  changeVolume();
});

// tv power buttons

const powerTv = () => {
  if (isTvOn) {
    if (tvButton.hasClass("tv-on")) {
      tvDisplay.addClass("display-none");
      tvDisplayVideo.trigger("pause");
      tvDisplaySource.attr("src", "");
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
  if (jQuery.inArray(tvChannelNumber, SUBSCRIBED_CHANNELS) !== -1) {
    subscribeContainer.addClass("display-none");
    tvDisplayVideo.removeClass("display-none");
    tvDisplaySource.attr("src", `https://drive.google.com/uc?export=download&id=${CHANNEL_DATA[tvChannelNumber % 10]}`);
    tvDisplayVideo.trigger("load");
  } else {
    tvDisplayVideo.addClass("display-none");
    tvDisplayVideo.trigger("pause");
    tvDisplaySource.attr("src", "");
    subscribeContainer.removeClass("display-none");
  }
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
  volumeCount.text(tvVolumeCount);
  volumeCountSlider.val(tvVolumeCount);
  speakerVolume.text(speakerVolumeCount);
  const TV_VOLUME = (tvVolumeCount / VOLUME_COUNT) * 100;
  const SPEAKER_VOLUME = (speakerVolumeCount / SPEAKER_VOLUME_COUNT) * 100;
  volumeCountSlider.css(
    "background",
    "linear-gradient(to right, #ffffff 0%, #ffffff " + TV_VOLUME + "%, rgba(255,255,255,0) " + TV_VOLUME + "%, rgba(255,255,255,0) 100%)"
  );
  if (isSpeakerOn) {
    tvDisplayVideo.prop("volume", (TV_VOLUME / 100) * 0.4 + (SPEAKER_VOLUME / 100) * 0.6);
  } else {
    tvDisplayVideo.prop("volume", (TV_VOLUME / 100) * 0.4);
  }
};

volumeIncreaseBtn.click(() => {
  if (isTvOn) {
    tvVolumeCount = tvVolumeCount < VOLUME_COUNT ? tvVolumeCount + 1 : tvVolumeCount;
    timedDisplayHide(volumeContainer);
    changeVolume();
  }
});

volumeDecreaseBtn.click(() => {
  if (isTvOn) {
    tvVolumeCount = tvVolumeCount > 1 ? tvVolumeCount - 1 : tvVolumeCount;
    timedDisplayHide(volumeContainer);
    changeVolume();
  }
});

speakerVolumeIncreaseBtn.click(() => {
  if (isSpeakerOn) {
    speakerVolumeCount = speakerVolumeCount < SPEAKER_VOLUME_COUNT ? speakerVolumeCount + 1 : speakerVolumeCount;
    changeVolume();
  }
});

speakerVolumeDecreaseBtn.click(() => {
  if (isSpeakerOn) {
    speakerVolumeCount = speakerVolumeCount > 20 ? speakerVolumeCount - 1 : speakerVolumeCount;
    changeVolume();
  }
});

// channel subscriptions

subscribeButton.click(() => {
  SUBSCRIBED_CHANNELS.push(tvChannelNumber);
  changeChannel();
});

//on page load

$(document).ready(() => {
  volumeCountSlider.attr("max", VOLUME_COUNT);
});
