var tick = function () {
    var ob = new MutationObserver(() => {
      console.log("咋哈哈");
    });
    var count = 1;
  
    var node = document.createTextNode(String(count));
    ob.observe(node, {
      characterData: true
    });
    var timeFuc = () => {
      count = count + 1;
      node.data = String(count);
      console.log(node.data);
    };
    return timeFuc;
  };
  var nextTick = tick();
  Promise.resolve().then(() => console.log(2));
  nextTick();
  nextTick();
  nextTick();
  nextTick();
