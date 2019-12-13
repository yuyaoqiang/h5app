<template>
    <div>

        <div class="lottery-height">
            <!-- <v-downloadBanner v-if="showDLBanner"></v-downloadBanner> -->
            <header class="pr">
                <div class="banner-main">
                    <mt-swipe :auto="2000" :stopPropagation="true">
                        <mt-swipe-item v-for="(item,i) in rotationUrl.context" v-if="item.timeend > new Date().getTime()" :key="i+'-l'">
                            <img :src="rotationUrl.serverUrl+item.imgurl"   @click="toActive(item)"/>
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                
                <div class="lottery-note">

                    <ul class="display-flex">
                        <li class="lottery-note-icon">
                            <img src="../../assets/images/lb.png">
                            <span>公告:</span>
                        </li>
                        <li class="flex-box lottery-note-box" @click="toGoNotice">
                            <MarqueeTips :content="content" :speed="15"></MarqueeTips>
                        </li>
                    </ul>
                </div>
            </header>
            <section class="index-menu">
                <ul class="display-box">
                    <li @click="toWyczPage({path:'chongzhi'})">
                        <div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABGlBMVEUAAAD0dDbweDH/SE7xdjL1bzf+UEv0bzj/SE/yczT+UEr6X0L/UU/5dz7/cU30ajj9UEn+S0z1ajnxeDD8VEf/R0//Sk71bDf/Sk//SlD/S0z+UEnxdzDwdy/0ajjxdjL/SE/8VEfwdzHxeDT/TlL6WkP2Zjv5WUT6WET2aDr/TE38Ukf////9TUr0ajfxczL1Zzn3Yj3wdjDzbTXycDT+Skz8UEj4Xj7/R032ZDv7VEX5WUL5XED6V0P8UkfybzP3akb+3db+6OP4gF/8v6///Pv7tqP/8e3+7uv5kXj4dlX+9fP8zsL3ck/++fj+19L91cr5qY76oIn8eXL7WUz9vrn9tq/7rpv+4tv8xrb7Z1n2jmT9mJP0fk+/zvwnAAAALHRSTlMAK/f0ZFpP++ubgjwgEAjx7N61sbCrjoVeK/n06+PYz8vHkDYW8OTi1MpwoZxxMUEAAAMySURBVEjHnZOHcuIwEIaX0AIhpNLSy6WeKQ4EzoAppncSakjy/q9xa8BIlgUJfLMzklf/Z2tsC1hMlpujy/OzrReKrbPzy6Mbyy2sYtdyRCQOW0eWXeBjcjAm13eYeE+9Cb/8irDD8PTbc2r5JYxF5ggOpH+2o3et4bWwMO7G9u3qZCwcwyKjCtn5ZWxtLtxz1xfbAN/8+9pjWR2xbAyLjIhxbp99b0c2msWKRrWRhfTpngMQ916Uy2exq7QbSvPtm7++50bZyluxjxRhQfOTa1tRPgxFQ1GsEMVnVaApvYU4HKJsN7a/KwJDmSPbAUyc9odgoMCJmcDK6VaNMm/jVvCFQpFQRAOnS2Vcmq/P5z44jBjhbZsTO4QnTrfQZt1mhMMTXPDaZcZttHipC7iXpIgUwZIW5IolgWFciBhz97AnsdSqgpFSOWcI7oGhNRL45I02SOIUSZSwcFIWljFuSSQ3dUDU865Fa/XObPJR1+6ntJgwIxdKmtwSc111LIpibbFzVk4QxISYFzQ6OTHXxBMhii1yOkd0VkygTFHTvSC0aRcp1ek0IzcXsUq3i6LKW7FI9lNcLufIz1EXKUi/ndPJ6XQ6kZ5fvAsLRgUVfFnvCHVQarMsKiiiTGgKehRRHDOtIUkzsmKUuxWEfo08OZVOpdIN6vDXkZb29Um/ijkE4+jAXYpQog6/SEF9wTYVv4MH6oo6TpWiSk77a0ifij/AYyolp2QsvOoKDEY5LxP5Ea5lwuhneUjSqWs4puRJ6Ud5QsWPwSnLSTmpgsOQiZZrzO0GJCvLTrAlKfp5YSVKn07bwJWkmay0xxNd2AVwmklmkliZKf3BcnfQn0a0/D4AHGf09Dp8tdNjgn9RtsUz8QxWfAZOeoMGazYGPXVFxw4g+3ED/d7XsKNUG+12o6p0hl+9viGSOQAVr3YdjAexyPrqvhNUXKfBDdj/A1Oe1RvTzJ5F5ry+H+ZcB9fmGDQCJ5tsWsN2EnwNYr2uhGROd4DCZn5dg210aQIHv3evXMDgdp78+xXmZ+Dg8pp/Vredf4DPrt9jXml6bG5YRcDv9VwdbJt1O90+uPJ4/QFg+A/4cn3nPL1ZNQAAAABJRU5ErkJggg=="/>
                        </div>
                        <p>充值</p>
                    </li>
                    <li @click="toWytxPage({path:'withdraw'})">
                        <div>
                            <img src="../../assets/images/withdraw-icon.png"/>
                        </div>
                        <p>提现</p>
                    </li>
                    <!-- <li @click="toActivity">
                        <div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA8FBMVEUAAAD6sBz6sR361TH52DD42DH60S37tR//0DD50Cv51S78sh7/uCD/zS36uyH4wyX5zSv50S36rx35zSr42DD5uSH6rx36sB371i/31zD32DD5rRz42DH4ziv5sx/6wSX7tCD50Cz4xyf5rRv5sx76vSP5vCP6sh/7sh7////5uCD5sBz40Sz5wST4zyv5sx34zSr5tR/41S74xCb42C/4xif5viP50y34yij4yCf4vCL5rRv+9d/5uyL5yzr/++3+78L96an6zkz5wDP+8cv5xjH+8tL95qT84pf71GP83o773YL72Xj6y0P+9+D967jread9AAAAKXRSTlMA9uwr92RaTwr6mykeE/Dj18vKtbKwjl476+OtkIeEfjvx8eLd1MajcF7ANfwAAALXSURBVEjHnZKJcqJAEIZbvO9bc2c3N+qISkCMUcREo8kmef+32WbIyAzLIvJVl93T9X8cheAlnjxrVE+OE48cieOTauMsGYcgiskGk3xJNJJF8CeeSzyOglzq5/zunzkb2Sr+UNjss8v9c/ejk1Fojo9EN5XA5Xg0xqJ9Bx684DIpuCzui/eCon2U7dmMe2MKDlj+neXcJ6/0DqbC3MteBM6BEs9GkbPO9871+j2sfp91hM6I/56SAyTzux+J3xmUU/2IpFCu9wf9AQUHLNoZ7OzX6yhnBxHJAsT589wy5SAWSz4dhxR/tOQ9fPHpFJwPBsbA+MGU9zE3qEedc6gbHHII2aUO1ehyFSqGMTEmNthCyDTnOBUoO6I20bC41Pbz1Rms+UaQ3XwZrv4jz4m2sPubSrb8WpvsuAKNg5dfV9TeEDL/EmQOQca0y3pF1G/bfeaWphAH1Z1VTf3YpRaLjUpUQsiHZa3Z1lphBotmVRVUEWZ/Eg72Ogs+6SNrppN7XyJ4he0fhP1rlz4yPh2W0wn/2s+ErGUOQtllVSAiXnlhIuyMgoBXZo/98TlHiMOS/XH2yO/s9fjlln37QFllrmxab4hGXmWe75Uo607XiY5gVGCFsoCpYg7DTh50HjlYRl74OJSC5XWAXIKyrj/pT1h+8mYre2WWRa0Mt84BfxA5ECYzbuGOjSHlJ/dmd9CccYSQuXQTLmazzqxjg80MIbPsbHYJ6Q7HZp+75tNpyHd43tfPQby98OECQKkTkRIANKPK9wD40sPOEOtg+Rcg0pDiXAB/OMSdeL4Bm9YwEpdULsQUd6UMFQoOWLQzhLMiFYHyoESgDT/UDnebwMjHukpXwerSjtAZEc4sg0gF2JGOdQ8ihp8pqi2hy5O/Ce/WCuAhcxHy5rEH8KHQ8ujT7hRLnKWLIviTaZ/Gpr5QcSrdpzMQRL7dOq1dS8JFYtJ17bTVzoOHv5sjR9S4JwU+AAAAAElFTkSuQmCC"/>
                        </div>
                        <p>活动</p>
                    </li> -->
                    <li @click='onlineServer'>
                        <div>
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABDlBMVEUAAAAz2qQjy7U43JgmzLI12qk94ZM94ZQ43JknzrMiyrY635UnzrEw1Kgp0LhD6a8q0Kw12p0mzbEjy7U125084ZIky7Y325sjyrc+4Zc84JI84JMr0qo12pw84JMr0ao94ZMz2KEjyrY02Z8jy7UlzbIlzLT///8mza8kzLIw1aM43JgiyrU63pUoz6074JMp0Kw325kz2J4x16Eq0ao12Zwt1KU225ss0qg53ZYhybY43Zf0/frv/Pje+PG98uQ82qP6/v3j+fPL9Oli3rxp4rvZ+O7S9uuU6NN+48uG6MZ35MNI2qzo+vWl69uj7dR25rxO2LhC1bNW367E9OOa6dey8dls3shu38Q20rDSCHxBAAAAJ3RSTlMAKvb6rhL3ZFpP7ZuCPB4J8fHr4LWxjoVeNOvj3tjPy5DkzMrIo3DGqxCyAAADBElEQVRIx52VZ1fqQBCGJxSpgtLRay+BBLh0Qbp0FEGx/v8/csdswmazuUF4zhxmdvI+2XzxCEaSrvPo6fHR3l8de0fHp9FzVxKscLqiVDJhL+pygjmCjzd53yeY3Xquz2TVMsPH3Z48zq4hnvFM+9E+67rt2S2wuxg3uyU6O2mvb0cjS7/8tKFQb9Trcl2WGzI54yDjAtfkGYKN7E+CQIjLGkTEHw7uWZy4gl3eAbugyD65IGMVCmpHyIxg42eCD5DgYWEnDoMou9fHu8KdAg5YpNNn3N6NcoRIBgqr2ceoJTZb7bfFssu8VCOCsl2ZKncVLK13ZyNRR+9tiQ8oJG8HECo8k6ZopD3kYwK4ud1qLJrx0TUG3RCvVIqVogaOy6ZozriLOQwjxIlDpMhQGfYYg7GLLBG4Yhcrei/Pgs1ewQm7eBCtWDLZE7goFkvFksZMtKT5hBmME+cCDkuUYrclWrMo6TgE0vmLW49PHWV4Ww2bdMvEWblD5UdJ6vawz7uSNKHrJ0aWSiWpJGH99AddSpKkMfYO9iFdD9ZZ3IOkp8XKfVUeMB9EYeWe7gr1XW3ss1/Jc5rCG6fKMJSktoVclapYkvKdlLmq9EZNkTJk5CoRyQsW4iZeSJaAso7BJneuJalMGW2Qp6xcq1Zr1ZrKpqvbGFXypEONpWMpf7FhOGDPr1Z/k+9s9gD+lFks7GdD9A+VeZt3Wc7grGzk+7lnora+yrzsyDOU8+Vy/qXPyxM2gz95B/jzZry8Gz++zYf84FEn3p8+d/qjfudd/YwBl/CAkDMln8tjkZH89xnjmX0WADjIbeR70kb707ANAYBjfUrlUgo4YJGu8fo5nRr2Nyh7UjuyD0hoNzcMP8R2k/2KHDjYQkmn0lg4hJygcJvegQSoXG/vOkBDsG3regOwxrOlbdsHYOzMmnQmjUXP3D6Erh4hnPk1lwEwEPTbfqfabsGEQMx2f5+5JxEcsLROd16/E8xxJhzo/x/vjScIVgiJmOMy7GVeYvOGrx2xhAAG/gGfVT5p01ImHAAAAABJRU5ErkJggg=="/>
                        </div>
                        <p>客服</p>
                    </li>
                </ul>
            </section>
          <section class="theme-lottry-wrap">
              <p class="forms-title">
                  <span class="name">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" viewBox="0 0 1075 1024" id="icon-game-platform"><path d="M750.590499 1023.997952H324.504951a324.607351 324.607351 0 0 1-229.221942-93.926212C33.843132 869.527861 0 789.323221 0 704.280191v-0.460799c0-85.14543 33.868732-165.375669 95.283009-225.893948A324.607351 324.607351 0 0 1 324.504951 383.999232h426.187948a324.607351 324.607351 0 0 1 229.221941 93.926212c61.439877 60.543879 95.283009 140.748519 95.28301 225.893948v0.460799c0 85.14543-33.868732 165.375669-95.28301 225.919549A324.76095 324.76095 0 0 1 750.590499 1023.997952zM324.504951 466.098268c-132.966134 0-241.202718 106.674987-241.202718 237.721124v0.460799c0 131.071738 108.236584 237.746725 241.202718 237.746725h426.187948c132.966134 0 241.202718-106.700587 241.202717-237.746725v-0.460799c0-131.046138-108.236584-237.721125-241.202717-237.721124H324.504951z" fill="#FF464B" p-id="1195"></path><path d="M255.999488 691.198618h153.599693v51.199897h-153.599693z" fill="#FF464B" p-id="1196"></path><path d="M307.199386 784.126432l0.383999-166.655667 64.639871 0.1792-0.384 166.655666L307.199386 784.126432z m418.635962 9.471981c-51.430297 0-93.363013-41.548717-93.363013-92.748615s41.830316-92.748615 93.363013-92.748614c51.558297 0 93.363013 41.523117 93.363014 92.748614 0 51.199898-41.804716 92.748615-93.363014 92.748615z m0-131.660537c-21.631957 0-39.295921 17.535965-39.295921 39.014322 0 21.503957 17.663965 39.039922 39.295921 39.039922s39.295921-17.535965 39.295922-39.039922a39.167922 39.167922 0 0 0-39.295922-39.014322z m-154.367691-205.08119l-64.409471-34.73913 112.690975-206.412387h-228.402744l-31.359937-55.27029L457.291885 0l62.847875 37.478325-63.923072 105.420589h225.177149l32.179136 53.708693-142.130916 260.249079z" fill="#FF464B" p-id="1197"></path></svg>
                    游戏平台</span>
                  <span @click="changeVisible()" class="menu">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="icon" viewBox="0 0 1024 1024" id="icon-switch-icon"><path d="M896 0A128.365714 128.365714 0 0 1 1024 128v512a128.365714 128.365714 0 0 1-128 128h-512A128.365714 128.365714 0 0 1 256 640v-512A128.365714 128.365714 0 0 1 384 0h512z m64 640v-512c0-35.181714-28.818286-64-64-64h-512c-35.218286 0-64 28.818286-64 64v512c0 35.181714 28.781714 64 64 64h512c35.181714 0 64-28.818286 64-64z m-256 256v-64H768v64a128.365714 128.365714 0 0 1-128 128h-512A128.365714 128.365714 0 0 1 0 896v-512A128.365714 128.365714 0 0 1 128 256h64v64H128c-35.181714 0-64 28.781714-64 64v512c0 35.181714 28.818286 64 64 64h512c35.181714 0 64-28.818286 64-64zM438.857143 585.142857a36.571429 36.571429 0 1 1 0-73.142857 36.571429 36.571429 0 0 1 0 73.142857z m182.857143 0a36.571429 36.571429 0 1 1 0-73.142857 36.571429 36.571429 0 0 1 0 73.142857z m182.857143 0a36.571429 36.571429 0 1 1 0-73.142857 36.571429 36.571429 0 0 1 0 73.142857z" fill="#ff464b" p-id="1199"></path></svg>
                  </span>
              </p>
              <div class="morePlatForms">
                  <div class="game-item" @click="goToLottry()">
                      <div class="inner" 
                       style="background-image: url(&quot;https://cdn.haobinfen.com/e8517ff4-acbc-43c8-abdd-9be02c698fe4.png&quot;);">
                        <p  class="cn">购彩大厅</p>
                        <p  class="en">LOTTERY GAME</p>
                        <div  class="tip">
                          <span  class="it">快三</span>
                          <span  class="it">PK10</span>
                          <span  class="it">时时彩</span>
                        </div>
                      </div>
                  </div>
                  <ul :class="['game-group clearfix',visibelType==true?'game-group-horizontal':'game-group-grid']">
                    <li class="game-item"  @click="toGameTypes('live')" >
                      <div class="inner" v-if="visibelType==true" style="background-image: url(&quot;https://cdn.haobinfen.com/557223f3-b990-46ab-a32b-df1e61dd0d51.png&quot;);">
                        <p class="cn">真人视讯</p>
                        <p class="en">LIVE CASINO</p>
                        <div class="tip">
                          <span class="it">AG视讯</span>
                          <span class="it">BBIN视讯</span>
                        </div>
                      </div>
                      <div class="inner" v-if="visibelType==false"  style="background-image: url(&quot;https://cdn.haobinfen.com/52f3b95d-28da-496e-a4f1-080fb8a6dc54.png&quot;);">
                      <p class="cn">真人视讯</p>
                      <p class="en">LIVE CASINO</p>
                        <div class="tip">
                          <span class="it">AG视讯</span>
                          <span class="it">BBIN视讯</span>
                          <span class="it">BG视讯</span>
                        </div>
                      </div>
                    </li>
                    <li  @click="toGameTypes('elec')"  class="game-item">
                      <div class="inner" v-if="visibelType==true" style="background-image: url(&quot;https://cdn.haobinfen.com/3ad51a16-32e1-4b5e-8b07-784479ebcebf.png&quot;);">
                        <p class="cn">电子游艺</p>
                        <p class="en">SLOTS CASINO</p>
                        <div class="tip">
                          <span class="it">AG电子</span>
                          <span class="it">PT电子</span>
                          <span class="it">MG电子</span>
                        </div>
                      </div>
                      <div class="inner" v-if="visibelType==false" style="background-image: url(&quot;https://cdn.haobinfen.com/4fbd9b0f-6d4c-40ba-8ed2-88939bb98cf0.png&quot;);">
                      <p class="cn">电子游艺</p>
                      <p class="en">SLOTS CASINO</p>
                        <div class="tip">
                          <span class="it">AG电子</span>
                          <span class="it">PT电子</span>
                          <span class="it">MG电子</span>
                        </div>
                      </div>
                    </li>
                 </ul>
                  <ul :class="['game-group clearfix',visibelType==true?'game-group-horizontal':'game-group-grid']">
                    <li class="game-item"  @click="toGameTypes('chess')">
                      <div class="inner" v-if="visibelType==true" 
                       style="background-image: url(&quot;https://cdn.haobinfen.com/007dfab4-8465-4fdf-809f-fd206dba622c.png&quot;);">
                      <p class="cn">棋牌游戏</p><p class="en">CHESS-CARD</p>
                      <div class="tip">
                        <span class="it">开元棋牌</span>
                        </div>
                      </div>
                      <div class="inner" v-if="visibelType==false"
                       style="background-image: url(&quot;https://cdn.haobinfen.com/1b32f871-6d35-47d5-97e4-600ce548cb84.png&quot;);">
                        <p class="cn">棋牌游戏</p><p class="en">CHESS-CARD</p>
                        <div class="tip">
                          <span class="it">开元棋牌</span>
                        </div>
                      </div>
                    </li>
                    <li  @click="toGameTypes('fish')" class="game-item">
                      <div class="inner" v-if="visibelType==true"
                       style="background-image: url(&quot;https://cdn.haobinfen.com/bb54a502-2ab7-4a98-b66f-0592932fdfd2.png&quot;);">
                      <p class="cn">捕鱼游戏</p>
                      <p class="en">FISH GAME</p>
                      <div class="tip">
                        <span class="it">AG捕鱼王</span>
                        <span class="it">BBIN捕鱼</span>
                        </div>
                        </div>
                        <div class="inner" v-if="visibelType==false"  
                        style="background-image: url(&quot;https://cdn.haobinfen.com/995908c7-9671-420b-a5db-c68ea680195c.png&quot;);">
                        <p class="cn">捕鱼游戏</p>
                        <p class="en">FISH GAME</p>
                        <div class="tip">
                          <span class="it">AG捕鱼王</span>
                          <span class="it">BBIN捕鱼</span>
                          </div>
                        </div>
                     </li>
                  </ul>
                 <ul :class="['game-group clearfix',visibelType==true?'game-group-horizontal':'game-group-grid']">
                   <li class="game-item"  @click="toGameTypes('VR')">
                     <div class="inner vr-lottry-wrap" v-if="visibelType==true">
                     <p class="cn">VR彩票</p>
                     <p class="en">VR GAME</p>
                      <div class="tip">
                        <span class="it">飞艇</span>
                        <span class="it">火星彩</span>
                        <span class="it">赛车</span>
                      </div>
                     </div>
                     <div class="inner vr-lottry-small-wrap" v-if="visibelType==false">
                      <p class="cn">VR彩票</p>
                      <p class="en">VR GAME</p>
                        <div class="tip">
                          <span class="it">飞艇</span>
                          <span class="it">火星彩</span>
                          <span class="it">赛车</span>
                        </div>
                      </div>
                    </li>
                    <li  @click="toGameTypes('sport')"  class="game-item">
                      <div class="inner" v-if="visibelType==true"  style="background-image: url(&quot;https://cdn.haobinfen.com/b72288c9-7e3b-4d67-aeab-7916b33e9fa0.png&quot;);">
                      <p class="cn">体育赛事</p>
                      <p class="en">SPORTS EVENT</p>
                        <div class="tip">
                          <span class="it">AG体育</span>
                          <span class="it">BBIN体育</span>
                          <span class="it">沙巴体育</span>
                        </div>
                      </div>
                      <div class="inner" v-if="visibelType==false"  style="background-image: url(&quot;https://cdn.haobinfen.com/8c8dbdd8-7bc0-4fe4-8175-ee97842a8d15.png&quot;);">
                      <p class="cn">体育赛事</p>
                      <p class="en">SPORTS EVENT</p>
                        <div class="tip">
                          <span class="it">AG体育</span>
                          <span class="it">BBIN体育</span>
                          <span class="it">沙巴体育</span>
                        </div>
                      </div>
                    </li>
                </ul>
              </div>
          </section>
        </div>
        
    </div>
</template>

<script>
    import securityApi from '../../assets/js/api/securityApi'
    import userBusiness from '../../assets/js/business/user/userBusiness';
    import lotteryBusiness from '../../assets/js/business/lottery/lotteryBusiness';
    import arrayUtil from '../../assets/js/util/arrayUtil';
    import viewUtil from '../../assets/js/business/common/viewUtil';
    import lotteryApi from '../../assets/js/api/lotteryApi.js';
    import userInfoApi from '../../assets/js/api/userInfo';
    import platformData from '../../assets/platform/main/platformData';
    import kgBusiness from '../../assets/js/business/lottery/kg/kgBusiness'
    import lotteryCountDownCenter from '../../assets/js/business/lottery/lotteryCountDownCenter'
    import downloadBanner from '../download/download_banner.vue'
    import MarqueeTips from 'vue-marquee-tips'
    import { Toast } from 'mint-ui';
    import bus from '../eventBus'
    import cacheUtil from "../../assets/js/util/cacheUtil"
    
    export default {
        props: {
            showDLBanner: {
                type: Boolean,
            }
        },
        data() {
            return {
                visibelType:true,
                modal:true,
                user: {
                    lotteryBal: 0
                },
                notice: {
                    "roll": []
                },
                rotationUrl: {
                    serverUrl: '',
                    context: ''
                },
                noticeDetails: {
                    title:'',
                    content:''
                },
                content:'',
                images: [],
                dialogVisible: false,
                lotteryList: [],
                trdGames: [],
                accountMenus: {},
                isAllowRemote: false,
                playNoticInterval: null,
                platformName:'',
                
            }
        },
        created() {
            var _this = this;
            this.initTableState();
            this.isSafe();
            userBusiness.getUser(this, function (user) {
                _this.user = user;
                bus.$on('btnBoxMessage',function(val){
                    userInfoApi.notice((res) => {
                        
                        if (res.code == 200) {
                            var data = res.data;
                            _this.notice.roll = data.roll || [];
                            
                            if(_this.notice.roll.length&&!_this.user.isShiWan){
                                _this.$parent.noticeDetails = _this.notice.roll[0];
                                _this.dialogVisible = true;
                                _this.$parent.dialogVisible = true;
                            }     
                        }
                    });
                    
                })   
            }, true)
            
            _this.images = platformData.indexBanners;
            _this.isAllowRemote = platformData.setting.allowRemoteUrl;
            _this.platformName = platformData.setting.name;
            
            _this.trdGames = userBusiness.getTrdGames();
            _this.accountMenus = userBusiness.getAccountMenus();
           
            this.getListGame();

            userBusiness.getBannerList((res) => {
                var data = res.data;
                _this.rotationUrl.serverUrl = data.serverUrl;
                _this.rotationUrl.context = data.list;
            });

            userInfoApi.notice((res) => {
                if (res.code == 200) {
                    var data = res.data;
                    _this.notice.roll = data.roll || [];
                    if(data.roll.length>0){
                      this.content = data.roll[0].content
                    }                    
                }
            });
        },
        mounted(){
            let _this = this;
            bus.$on('btnBoxMessage',function(val){
                userBusiness.refreshBal(_this,function(user){
                    _this.user = user
                   
                },false)
            })
            bus.$on('getGameList',function(val){
                if(val){
                    _this.getListGame()
                }
            });   
        },
        methods: {
            isSafe(){
                var _this=this;
                  securityApi.getSafe((res)=>{
                      if(res.code==200){
                      var state = res.data.state;
                      var date = res.data.date;
                      if(state == 1 && (date-new Date().getTime())>3000){
                          this.$router.push({path: '/maintain'});
                      }
                  }
              })
            },
            toGoNotice(){
              this.$router.push('/notice')
            },
            initTableState(){
               const state =  cacheUtil.getLocalStorage('tableState');
               this.visibelType = state=='true'?true:false;
            },
            toGameTypes(type){
            if(type==false){
                Toast('游戏暂未开启')
                return;
              }
               this.$router.push({path: "thirdGame", query: {type}});
            },
            changeVisible(){
              this.visibelType = !this.visibelType
               cacheUtil.setLocalStorage('tableState',this.visibelType);
            },
            goToLottry(){
              this.$router.push({path: "games"});
            },
            toActive(item){
                if(!item.name || item.name.indexOf("@")==-1) return;
                var name = item.name.split('@')[1];
                this.$router.push({path: "activity", query: {name: name}});
            },
            getListGame(){
                let _this = this;
                _this.lotteryList = [];
                lotteryBusiness.getIndexLotteryList(function (indexLotteryList) {
                    if (indexLotteryList && indexLotteryList.length > 0 && indexLotteryList.length <= 200) {
                        var ids = arrayUtil.join(indexLotteryList, item => {
                            return item.id;
                        }, ",");
                        lotteryApi.getBettingTimeList({gameIds: ids}, function (resp) {
                            if (resp.code == 200) {
                                //todo
                                var data = resp.data;
                                arrayUtil.forEach(indexLotteryList, item => {
                                    var countdown = data[item.id];
                                    if (countdown != null) {
                                        lotteryCountDownCenter.add(item, countdown);
                                    }
                                });
                            }
                        });
                    } else {
                        /*  arrayUtil.forEach(indexLotteryList, l => {
                            l.indexCountdown.content ="玩法新颖 惊喜不断"
                        });*/
                    }
                    _this.lotteryList = indexLotteryList;
                });
            },
            toLogin(){
              viewUtil.toLoginView();
            },
            toLotteryFavorites(){
                if(userBusiness.checkIsNotLoginPlayer()){
                    return;
                }

                if(userBusiness.checkIsTryPlayer()){
                    return;
                }
                this.$router.push({path:"lotteryFavorites"});
            },
            leftSlide() {
                this.$parent.leftSlide();
            },
            toGame(lty) {
                userBusiness.toGame(this, lty.id);
            },

            toWytxPage(path) {
                userBusiness.toWytxPage(path);
            },
            toWyczPage(path) {
                userBusiness.toWyczPage(path);
            },
            toActivity(){
                userBusiness.toActivity();
            },
            toTrdGame(item) {
                var falg = userBusiness.checkIsTryPlayer();
                if (falg) {
                    return;
                }
                if (item.permission != true) {
                    this.lalterWarning(item.name + "游戏暂未开放");
                    return;
                }
                this.$router.push({path: "thirdGame", query: {code: item.code}});
            },
            toLotteryHome(type) {
                this.$router.push({path: 'lotteryHome', query: {lotteryType: type}});
            },
            // toThirdGame(){
            //     this.$router.push({path: 'thirdGame'});
            // },
            onlineServer() {
                userBusiness.openCustomerService();
            },
            openDetails(index) {
                
                this.dialogVisible = true;
                this.$parent.dialogVisible = true;
                this.$parent.noticeDetails = this.notice.roll[index];
            },
            stopAutoNotic() {
                if (this.playNoticInterval != null) {
                    clearInterval(this.playNoticInterval);
                    this.playNoticInterval = null;
                }
            },
            loginShiWan(){
                var _this = this;
                var params = {
                    "device" : 0,
                };
                _this.lshowWait();
                userInfoApi.loginShiWan(params,(res)=>{
                    _this.lcloseWait();
                    if(res.code == 200){
                        userBusiness.initMenu=true;
                        userBusiness.getUser(this, function (user) {
                            _this.user = user;
                        }, true)

                    }else {
                        this.lalterError(res.msg);
                    }
                })
            },


        },
        components: {
            'v-downloadBanner': downloadBanner,
              MarqueeTips
            
        },
        watch:{
            
             "$parent.dialogVisible":function(a,n){
                if(a==true){
                   methodsScroll.forbidScroll();  
                   
                }else{
                   methodsScroll.enabledScroll();  
                   
                }
                
             }
        },
        beforeDestroy() {
            this.stopAutoNotic();
            lotteryCountDownCenter.clearAll();
        }
    }
</script>
<style lang="less">
.theme-lottry-wrap{
  padding: 0 2.4vw;
    .forms-title{
        display: flex;
        color: #000;
        font-size: 4.26666667vw;
        font-weight: 600;
        padding: 2.66666667vw 0;
        .name{
          flex: 1;
          svg{
            font-size: 6.13333333vw;
            margin-right: 1.33333333vw;
            width: 1em;
            height: 1em;
            vertical-align: -.15em;
            fill: currentColor;
            overflow: hidden;
          }
        }
        .menu{
          svg{
            font-size: 4vw;
            width: 1em;
            height: 1em;
            vertical-align: -.15em;
            fill: currentColor;
            overflow: hidden;
            }
          }
    }
    .morePlatForms{
      .game-item{
        color: #fff;
        margin-bottom: 4vw;
        width: 95.2vw;
        height: 28.53333333vw;
        position: relative;
        p{
            color: #fff;
        }
        .inner{
          z-index: 2;
          width: 100%;
          height: 100%;
          background-size: 100% 31.2vw;
          background-position: 100% 0;
          border-radius: 2.66666667vw;
          position: relative;
          padding: 2.66666667vw 4vw;
          .cn{
            font-size: 6.4vw;
          }
          .en{
            font-size: 3.33333333vw;
          }
          .tip{
              white-space: nowrap;
              text-overflow: ellipsis;
              height: 5.33333333vw;
              overflow: hidden;
              margin-top: 1.33333333vw;
          }
          .tip span{
            font-size: 3.33333333vw;
            margin-right: 2.66666667vw;
          }
        }
      }
      .game-group-horizontal{
        height: 61.06666667vw;
        transition: height .3s;
      }
      .game-item{
        color: #fff;
        margin-bottom: 4vw;
        width: 95.2vw;
        height: 28.53333333vw;
        position: relative;
        .cn{
          font-size: 6.4vw;
        }
        p{
          color: #fff;
        }
        .tip{
          white-space: nowrap;
          text-overflow: ellipsis;
          height: 5.33333333vw;
          overflow: hidden;
          margin-top: 1.33333333vw;
          span{
            font-size: 3.33333333vw;
            margin-right: 2.66666667vw;
          }
        }
        .inner{
          z-index: 2;
          width: 100%;
          height: 100%;
          background-size: 100% 31.2vw;
          background-position: 100% 0;
          border-radius: 2.66666667vw;
          position: relative;
          padding: 2.66666667vw 4vw;
          display: flex;
          flex-flow: column;
          justify-content: center;
        }
      }
      .game-group-horizontal .game-item:nth-child(2n){
          left: 0;
          top: 32.53333333vw;
      }
      .game-group{
        position: relative;
        margin-bottom: 4vw;
        .game-item{
          position: absolute;
          left: 0;
          top: 0;
          -webkit-transition: all .3s;
          transition: all .3s;
        }
      }
    }
  // ----------------------------------------列表形式
.game-group-grid{
  height: 28.53333333vw;
  .game-item{
    width: 45.33333333vw;
    margin-right: 2.66666667vw;
    text-align: center;
    height: 28.53333333vw;
    color: #fff;
    margin-bottom: 4vw;
    p{
      color: #fff;
    }
    .inner{
      padding-top: 5.33333333vw;
      background-size: auto 31.2vw;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-position: 100% 0;
      border-radius: 2.66666667vw;
      position: relative;
      padding: 2.66666667vw 4vw;
      .cn{
        font-size: 5.4vw;
      }
      .en{
        font-size: 3.33333333vw;
      }
      .tip{
        display: none;
      }
    }
  }
  .game-item:nth-child(2n){
    position: absolute;
    margin-right: 0;
    left: 48vw;
    top: 0;
  }
}
.vr-lottry-wrap{
  background-image: url('../../assets/platform/main/images/newImgs/VR1.png')
}
.vr-lottry-small-wrap{
  background-image: url('../../assets/platform/main/images/newImgs/VR2.png')
}
}

</style>