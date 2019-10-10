
//加载配置文件和图片
function loadResource(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: './img/'+url,
            dataType: 'text',
            success(txt) {
                let json = eval('('+txt+')')
                let res = []
    
                let total = 0, cur = 0
                
                for(let key in json) {
                    total++
    
                    let oImg = new Image()
                    oImg.src = './img/'+json[key].src
                    oImg.onload = function() {
                        cur++
    
                        res.push({
                            img: this,
                            frame: json[key].frame
                        })
    
                        if(total == cur) {
                            resolve(res)
                        }
                    }
                    
                }
            },
            error(err) {
                reject(err)
            }
        })
    })
    
}

async function loadAllResource(){
    let src={
      bottom: 'bottom.json',
      bullet: 'bullet.json',
      cannon: 'cannon.json',
      coin: 'coin.json',
      fish: 'fish.json',
      number: 'number.json',
      web: 'web.json'
    };
    let imgs={};
  
  
    try{
      for(let name in src){
        imgs[name]=await loadResource(src[name]);
      }
  
      window._g_resouce=imgs;
    }catch(e){
      throw e;
    }
}

