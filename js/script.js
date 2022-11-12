$('#heart').hide();

$(document).ready(documentReady);

function documentReady() {
  var MAX_SNOW = 300;

  var MAX_SNOW_SIZE = 7;

  var MAX_SNOW_SPEED = 1;

  snowStart();

  function snowStart() {
    console.log("// Snow animation start");

    createSnows();
  }

  function createSnows() {
    var container = $("#snow-animation-container");

    for (var i = 0; i < MAX_SNOW; i++) {
      var appendItem = getRandomItem(i);
      container.append(appendItem);

      var animateItem = $(".snow" + String(i));
      var randomTime = Math.random() * MAX_SNOW_SPEED;
      goAnimate(animateItem, i, randomTime);
      goAnimate2(animateItem);
    }

    console.log("// Create snows");
  }

  function goAnimate(item, id, randomTime) {
    TweenMax.to(item, randomTime, {
      css: { marginTop: "+=100" },
      ease: Linear.easeNone,
      onComplete: function () {
        var topPosition = item.css("margin-top").replace("px", "");

        if (topPosition > $(window).height()) {
          changePosition(item);
          randomTime = Math.random() * MAX_SNOW_SPEED;
          goAnimate(item, id, randomTime);
        } else {
          goAnimate(item, id, randomTime);
        }
      },
    });
  }

  function goAnimate2(item) {
    var directionTime = 1 + Math.floor(Math.random() * 5);

    var randomDirection = 1 + Math.floor(Math.random() * 4);

    var delayTime = 1 + Math.floor(Math.random() * 3);

    if (randomDirection == 1) {
      TweenMax.to(item, directionTime, {
        css: { marginLeft: "+=100" },
        ease: Linear.easeOut,
        onComplete: function () {
          TweenMax.to(item, directionTime, {
            css: { marginLeft: "-=100" },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function () {
              goAnimate2(item);
            },
          });
        },
      });
    } else if (randomDirection == 2) {
      TweenMax.to(item, directionTime, {
        css: { marginLeft: "-=100" },
        ease: Linear.easeOut,
        onComplete: function () {
          TweenMax.to(item, directionTime, {
            css: { marginLeft: "+=100" },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function () {
              goAnimate2(item);
            },
          });
        },
      });
    } else if (randomDirection == 3) {
      TweenMax.to(item, directionTime, {
        css: { marginLeft: "+=100" },
        ease: Linear.easeOut,
        onComplete: function () {
          goAnimate2(item);
        },
      });
    } else if (randomDirection == 4) {
      TweenMax.to(item, directionTime, {
        css: { marginLeft: "-=100" },
        ease: Linear.easeOut,
        onComplete: function () {
          goAnimate2(item);
        },
      });
    }
  }

  function changePosition(item) {
    var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    var _height = _width;
    var _blur = Math.floor(Math.random() * 5 + 2);
    var _left = Math.floor(Math.random() * ($(window).width() - _width));
    var _top =
      -$(window).height() +
      Math.floor(Math.random() * ($(window).height() - _height));

    item.css("width", _width);
    item.css("height", _height);
    item.css("margin-left", _left);
    item.css("margin-top", _top);
    item.css("-webkit-filter", "blur(" + String(_blur) + "px)");
    item.css("-moz-filter", "blur(" + String(_blur) + "px)");
    item.css("-o-filter", "blur(" + String(_blur) + "px)");
    item.css("-ms-filter", "blur(" + String(_blur) + "px)");
    item.css("filter", "blur(" + String(_blur) + "px)");
  }

  function getRandomItem(id) {
    var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    var _height = _width;
    var _blur = Math.floor(Math.random() * 5 + 2);
    var _left = Math.floor(Math.random() * ($(window).width() - _width));
    var _top =
      -$(window).height() +
      Math.floor(Math.random() * ($(window).height() - _height));
    var _id = id;

    return getSmallSnow(_width, _height, _blur, _left, _top, _id);
  }

  function getSmallSnow(width, height, blur, left, top, id) {
    var item =
      "<div class='snow" +
      id +
      "' style='position:absolute; margin-left: " +
      left +
      "px; margin-top: " +
      top +
      "px; width: " +
      width +
      "px; height: " +
      height +
      "px; border-radius: 50%; background-color: white; -webkit-filter: blur(" +
      blur +
      "px); -moz-filter: blur(" +
      blur +
      "px); -o-filter: blur(" +
      blur +
      "px); -ms-filter: blur(" +
      blur +
      "px); filter: blur(" +
      blur +
      "px);'></div>";

    return item;
  }
}

$(document).on("wheel", documentScrollDown);

$(document).on("swipedown", documentSwipeDown);

function documentScrollDown(event) {
  if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
    // scroll up
  } else {
    // scroll down

    $(document).off("wheel");

    $('#snow-animation-container').remove();

    $('#heart').show();

    $("#audio")[0].play();
  }
}

function documentSwipeDown(event) {
  $(document).off("swipedown");

  $('#snow-animation-container').remove();

  $('#heart').show();

  $("#audio")[0].play();
}

window.requestAnimationFrame =
  window.__requestAnimationFrame ||
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  (function () {
    return function (callback, element) {
      var lastTime = element.__lastTime;
      if (lastTime === undefined) {
        lastTime = 0;
      }
      var currTime = Date.now();
      var timeToCall = Math.max(1, 33 - (currTime - lastTime));
      window.setTimeout(callback, timeToCall);
      element.__lastTime = currTime + timeToCall;
    };
  })();
window.isDevice =
  /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
  );
var loaded = false;
var init = function () {
  if (loaded) return;
  loaded = true;
  var mobile = window.isDevice;
  var koef = mobile ? 0.5 : 1;
  var canvas = document.getElementById("heart");
  var ctx = canvas.getContext("2d");
  var width = (canvas.width = koef * innerWidth);
  var height = (canvas.height = koef * innerHeight);
  var rand = Math.random;
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, width, height);

  var heartPosition = function (rad) {
    //return [Math.sin(rad), Math.cos(rad)];
    return [
      Math.pow(Math.sin(rad), 3),
      -(
        15 * Math.cos(rad) -
        5 * Math.cos(2 * rad) -
        2 * Math.cos(3 * rad) -
        Math.cos(4 * rad)
      ),
    ];
  };
  var scaleAndTranslate = function (pos, sx, sy, dx, dy) {
    return [dx + pos[0] * sx, dy + pos[1] * sy];
  };

  window.addEventListener("resize", function () {
    width = canvas.width = koef * innerWidth;
    height = canvas.height = koef * innerHeight;
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, width, height);
  });

  var traceCount = mobile ? 20 : 50;
  var pointsOrigin = [];
  var i;
  var dr = mobile ? 0.3 : 0.1;
  for (i = 0; i < Math.PI * 2; i += dr)
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
  for (i = 0; i < Math.PI * 2; i += dr)
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
  for (i = 0; i < Math.PI * 2; i += dr)
    pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));
  var heartPointsCount = pointsOrigin.length;

  var targetPoints = [];
  var pulse = function (kx, ky) {
    for (i = 0; i < pointsOrigin.length; i++) {
      targetPoints[i] = [];
      targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
      targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
    }
  };

  var e = [];
  for (i = 0; i < heartPointsCount; i++) {
    var x = rand() * width;
    var y = rand() * height;
    e[i] = {
      vx: 10,
      vy: 100,
      R: 2,
      speed: rand() + 10,
      q: ~~(rand() * heartPointsCount),
      D: 2 * (i % 2) - 1,
      force: 0.2 * rand() + 0.7,
      f:
        "hsla(0," +
        ~~(40 * rand() + 60) +
        "%," +
        ~~(60 * rand() + 20) +
        "%,.3)",
      trace: [],
    };
    for (var k = 0; k < traceCount; k++) e[i].trace[k] = { x: x, y: y };
  }

  var config = {
    traceK: 0.4,
    timeDelta: 0.01,
  };

  var time = 0;
  var loop = function () {
    var n = -Math.cos(time);
    pulse((1 + n) * 0.5, (1 + n) * 0.5);
    time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;
    ctx.fillStyle = "rgba(255,255,255,.1)";
    ctx.fillRect(0, 0, width, height);
    for (i = e.length; i--; ) {
      var u = e[i];
      var q = targetPoints[u.q];
      var dx = u.trace[0].x - q[0];
      var dy = u.trace[0].y - q[1];
      var length = Math.sqrt(dx * dx + dy * dy);
      if (10 > length) {
        if (0.95 < rand()) {
          u.q = ~~(rand() * heartPointsCount);
        } else {
          if (0.99 < rand()) {
            u.D *= -1;
          }
          u.q += u.D;
          u.q %= heartPointsCount;
          if (0 > u.q) {
            u.q += heartPointsCount;
          }
        }
      }
      u.vx += (-dx / length) * u.speed;
      u.vy += (-dy / length) * u.speed;
      u.trace[0].x += u.vx;
      u.trace[0].y += u.vy;
      u.vx *= u.force;
      u.vy *= u.force;
      for (k = 0; k < u.trace.length - 1; ) {
        var T = u.trace[k];
        var N = u.trace[++k];
        N.x -= config.traceK * (N.x - T.x);
        N.y -= config.traceK * (N.y - T.y);
      }
      ctx.fillStyle = u.f;
      for (k = 0; k < u.trace.length; k++) {
        ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
      }
    }
    //ctx.fillStyle = "rgba(255,255,255,1)";
    //for (i = u.trace.length; i--;) ctx.fillRect(targetPoints[i][0], targetPoints[i][1], 2, 2);

    window.requestAnimationFrame(loop, canvas);
  };
  loop();
};

var s = document.readyState;
if (s === "complete" || s === "loaded" || s === "interactive") init();
else document.addEventListener("DOMContentLoaded", init, false);
