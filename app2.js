const checkPermissions = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("not support service workers");
  }
  if (!("Notification" in window)) {
    throw new Error("Notifications not supported");
  }
};

const registerSer = async () => {
  const register = await navigator.serviceWorker.register("sww.js");
  return register;
};

const requestPermision = async () => {
  const permision = await Notification.requestPermission();
  if (permision !== "granted") {
    throw new Error("Permision Not Granted");
  } else {
    new Notification("Hello^^");
  }
};

const main = async () => {
  checkPermissions();
  var registeration = await registerSer();
  registeration.showNotification("Hello Jimy", {
    icon: "/img1.png",
    image: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
    body: "Simple piece of body text.\nSecond line of body text :)",
  });
};
main();
checkPermissions()
registerSer()
requestPermision()
