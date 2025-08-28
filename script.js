document.addEventListener('DOMContentLoaded', function() {
    // 加载动画
    const loader = document.createElement('div');
    loader.className = 'loader';
    const loaderHeart = document.createElement('div');
    loaderHeart.className = 'loader-heart';
    loader.appendChild(loaderHeart);
    document.body.appendChild(loader);

    // 页面加载完成后移除加载动画
    setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1500);

    // 祝福数组 - 增加更多祝福语
    const wishes = [
        '愿我们的爱情像牛郎织女一样，跨越所有障碍，永远相守。七夕快乐！',
        '在这个特别的日子，我想告诉你：你是我生命中最美好的相遇。',
        '鹊桥相会，爱意绵绵。愿我们的爱情永恒不变。',
        '七夕之夜，星光璀璨，不及你在我心中的光芒。',
        '缘分让我们相遇，真爱让我们相守。七夕快乐，我的爱人。',
        '天上牛郎织女相会，地上我与你相依。',
        '愿我们的爱情如银河般浩瀚，如星辰般永恒。',
        '七夕节，我想对你说：我爱你，不止今天，而是每一天。',
        '金风玉露一相逢，便胜却人间无数。',
        '你的爱是我生命中最温暖的阳光，最甜蜜的清泉。',
        '往后余生，风雪是你，平淡是你，清贫是你，荣华是你，心底温柔是你，目光所致也是你。',
        '我能想到最浪漫的事，就是和你一起慢慢变老。',
        '喜欢你，不是因为你给了我需要的东西，而是因为你给了我从未有过的感觉。',
        '世界很大，我的心却很小，小到只能装下一个你。',
        '爱，不是一天的承诺，而是一生的守候。',
        '你是我字典里所有褒义词的集合，是我生命里所有美好事物的化身。',
        '我想要的爱情，不是一见钟情，而是久处不厌。',
        '遇到你之前，我没想过结婚；遇到你之后，我没想过和别人结婚。',
        '爱情不是1+1=2，而是0.5+0.5=1。两个人各削去一半自己的个性和缺点，然后凑合在一起。',
        '我跨过山，涉过水，见过万物复苏，周而复始，如今山是你，水也是你。'
    ];

    // 随机选择祝福
    function getRandomWish() {
        const randomIndex = Math.floor(Math.random() * wishes.length);
        return wishes[randomIndex];
    }

    // 卡片翻转功能 - 仅使用Y轴翻转确保文本方向正确
    const wishCard = document.querySelector('.wish-card');
    wishCard.addEventListener('click', function() {
        const cardInner = this.querySelector('.card-inner');

        if (this.classList.contains('flipped')) {
            // 翻回正面
            cardInner.style.transform = 'none';
            this.classList.remove('flipped');
        } else {
            // 翻到背面 (仅使用Y轴翻转)
            cardInner.style.transform = 'rotateY(180deg)';
            this.classList.add('flipped');

            // 随机显示一条祝福
            const wishMessage = document.getElementById('wish-message');
            wishMessage.style.opacity = '0';
            setTimeout(() => {
                wishMessage.textContent = getRandomWish();
                wishMessage.style.opacity = '1';
            }, 300);

            // 触发话语飘窗
            setTimeout(createFloatingMessage, 800);
        }
    });

    // 漂浮的心形效果
    function createHearts() {
        const heartsContainer = document.querySelector('.hearts-container');
        const heartCount = 20; // 心形数量

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';

            // 随机位置、大小和动画延迟
            const size = Math.random() * 20 + 10;
            const left = Math.random() * 100;
            const delay = Math.random() * 10;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.3;
            const colorIndex = Math.floor(Math.random() * 3);
            const colors = ['#ff6b8b', '#ff4757', '#ff9ff3'];

            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.left = `${left}%`;
            heart.style.animationDelay = `${delay}s`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.opacity = opacity;
            heart.style.backgroundColor = colors[colorIndex];
            heart.style.setProperty('--heart-color', colors[colorIndex]);

            // :before 和 :after 伪元素样式
            const style = document.createElement('style');
            style.textContent = `
                .heart:nth-child(${i + 1}):before, .heart:nth-child(${i + 1}):after {
                    width: ${size}px;
                    height: ${size}px;
                    background-color: ${colors[colorIndex]};
                }
            `;
            document.head.appendChild(style);

            heartsContainer.appendChild(heart);
        }
    }

    // 生成卡片背面的星星效果
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        const starCount = 30;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            // 随机位置、大小和动画延迟
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = Math.random() * 3 + 1;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;

            starsContainer.appendChild(star);
        }
    }

    // 农历转公历函数 - 简化版，专门用于计算七夕节(农历七月初七)
    function getQixiDate(year) {
        // 农历七月初七对应的公历日期表(2023-2030)
        // 数据来源: 中国科学院国家授时中心
        const qixiDates = {
            2023: '2023-08-22',
            2024: '2024-08-10',
            2025: '2025-08-29',
            2026: '2026-08-19',
            2027: '2027-08-08',
            2028: '2028-08-26',
            2029: '2029-08-15',
            2030: '2030-08-04'
        };

        // 如果有该年份的数据，直接返回
        if (qixiDates[year]) {
            return new Date(qixiDates[year]);
        }

        // 对于没有数据的年份，使用近似计算
        // 平均来说，农历七月初七大约在公历8月10日-8月30日之间
        // 这里使用8月15日作为默认值
        return new Date(year, 7, 15);
    }

    // 倒计时功能
    function updateCountdown() {
        const now = new Date();
        let nextQixiYear = now.getFullYear();
        let qixiDate = getQixiDate(nextQixiYear);

        // 如果今年的七夕已经过了，计算明年的
        if (now > qixiDate) {
            nextQixiYear++;
            qixiDate = getQixiDate(nextQixiYear);
        }

        // 计算时间差
        const diff = qixiDate - now;

        // 转换为天、时、分、秒
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // 更新DOM
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // 爱情宣言功能已被日历和计时器替代
    // 相关代码已移除

    

    // 爱情运势测试功能
    function createLoveFortune() {
        const fortuneContainer = document.createElement('div');
        fortuneContainer.className = 'love-fortune';
        fortuneContainer.innerHTML = `
            <h3>爱情运势测试</h3>
            <div class="fortune-inputs">
                <input type="text" id="your-name" placeholder="你的名字">
                <input type="text" id="partner-name" placeholder="TA的名字">
            </div>
            <button id="test-fortune">测试运势</button>
            <div id="fortune-result"></div>
        `;
        document.querySelector('main').appendChild(fortuneContainer);

        const fortuneTestButton = document.getElementById('test-fortune');
        const fortuneResult = document.getElementById('fortune-result');
        const yourName = document.getElementById('your-name');
        const partnerName = document.getElementById('partner-name');

        // 爱情运势结果数组
        const fortunes = [
            '你们的爱情将如胶似漆，甜蜜非常！',
            '近期有机会获得对方的浪漫告白哦！',
            '虽然有时会有小摩擦，但感情会越来越深。',
            '你们是天造地设的一对，缘分早已注定。',
            '爱情运势极佳，适合大胆表白或求婚！',
            '彼此的理解和包容会让爱情更长久。',
            '小心第三者插足，要多关心对方的感受。',
            '感情会进入一个新阶段，值得期待。',
            '共同的兴趣爱好将成为你们感情的催化剂。',
            '遇到困难时要一起面对，这样爱情才会更坚固。',
            '你们的爱情故事将成为身边朋友的榜样。',
            '在平凡的日子里，你们总能找到不平凡的幸福。',
            '互相支持和鼓励，是你们爱情长久的秘诀。',
            '你们的默契程度超乎常人，一个眼神就能读懂对方。',
            '爱情需要经营，你们在这方面做得非常好。'
        ];

        // 检查并初始化本地存储
        function initLocalStorage() {
            const today = new Date().toDateString();
            let fortuneData = localStorage.getItem('fortuneData');

            if (!fortuneData) {
                fortuneData = JSON.stringify({ date: today, records: {} });
                localStorage.setItem('fortuneData', fortuneData);
                return { date: today, records: {} };
            }

            fortuneData = JSON.parse(fortuneData);
            // 如果日期已更改，重置记录
            if (fortuneData.date !== today) {
                fortuneData = { date: today, records: {} };
                localStorage.setItem('fortuneData', JSON.stringify(fortuneData));
            }
            return fortuneData;
        }

        fortuneTestButton.addEventListener('click', function() {
            if (!yourName.value.trim() || !partnerName.value.trim()) {
                alert('请输入你和TA的名字');
                return;
            }

            const yourNameTrimmed = yourName.value.trim().toLowerCase();
            const partnerNameTrimmed = partnerName.value.trim().toLowerCase();
            const key = `${yourNameTrimmed}_${partnerNameTrimmed}`;

            // 获取或初始化本地存储数据
            const fortuneData = initLocalStorage();

            let result, score;

            // 检查是否已有记录
            if (fortuneData.records[key]) {
                // 使用已有的结果
                result = fortuneData.records[key].result;
                score = fortuneData.records[key].score;
            } else {
                // 生成新结果
                // 简单的哈希算法生成随机数
                const combined = yourNameTrimmed + partnerNameTrimmed;
                let hash = 0;
                for (let i = 0; i < combined.length; i++) {
                    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
                }
                const randomIndex = Math.abs(hash % fortunes.length);
                result = fortunes[randomIndex];
                score = Math.floor(Math.random() * 21) + 80; // 80-100%

                // 保存到本地存储
                fortuneData.records[key] = { result, score };
                localStorage.setItem('fortuneData', JSON.stringify(fortuneData));
            }

            fortuneResult.style.opacity = '0';
            setTimeout(() => {
                fortuneResult.innerHTML = `
                    <div class="fortune-card">
                        <h4>${yourName.value} 和 ${partnerName.value} 的爱情运势</h4>
                        <p>${result}</p>
                        <div class="fortune-score">缘分指数: ${score}%</div>
                    </div>
                `;
                fortuneResult.style.opacity = '1';
            }, 300);
});
    }

    // 添加背景音乐控制 - 使用本地音乐文件
    function addMusicControl() {
        const musicControl = document.createElement('div');
        musicControl.className = 'music-control';
        musicControl.innerHTML = `
            <button id="music-toggle" class="music-btn">
                <i class="fas fa-music"></i>
            </button>
        `;
        document.body.appendChild(musicControl);

        // 使用本地音乐文件
        // 使用encodeURIComponent确保中文文件名正确编码
        const audio = new Audio(encodeURIComponent('同样.mp3'));
        audio.loop = true;
        audio.volume = 0.3;

        const musicToggle = document.getElementById('music-toggle');
        let isPlaying = false;

        // 音乐播放状态指示
        const musicStatus = document.createElement('div');
        musicStatus.className = 'music-status';
        musicStatus.textContent = '点击播放背景音乐';
        musicStatus.style.position = 'fixed';
        musicStatus.style.bottom = '100px';
        musicStatus.style.right = '30px';
        musicStatus.style.backgroundColor = 'rgba(255, 107, 139, 0.9)';
        musicStatus.style.color = 'white';
        musicStatus.style.padding = '8px 15px';
        musicStatus.style.borderRadius = '5px';
        musicStatus.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        musicStatus.style.zIndex = '1000';
        document.body.appendChild(musicStatus);

        musicToggle.addEventListener('click', function() {
            if (isPlaying) {
                audio.pause();
                musicToggle.innerHTML = '<i class="fas fa-music"></i>';
                musicStatus.textContent = '点击播放背景音乐';
            } else {
                audio.play().catch(err => {
                    console.log('无法自动播放音乐:', err);
                    musicStatus.textContent = '点击页面任意位置以启用音乐';
                });
                
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
                musicStatus.textContent = '播放中: 同样-lambert&杨胖雨&Pony Soore';
            }
            isPlaying = !isPlaying;
        });

        // 移除了全局点击事件，现在只有点击音乐按钮才会播放音乐
        // 确保初始状态是暂停的
        isPlaying = false;
        musicStatus.textContent = '点击播放背景音乐';
    }

    // 初始化
    createHearts();
    createStars();
    updateCountdown();
    setInterval(updateCountdown, 1000); // 每秒更新一次倒计时
    createLoveFortune();
    addMusicControl();

    // 添加页面滚动动画
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        header.style.opacity = 1 - scrollPosition / 500;
    });

    // 为卡片添加随机动态效果
    function randomCardEffects() {
        const effects = [
            { transform: 'scale(1.05)', transition: 'transform 0.5s ease' },
            { transform: 'rotate(2deg)', transition: 'transform 0.5s ease' },
            { transform: 'rotate(-2deg)', transition: 'transform 0.5s ease' },
            { boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)', transition: 'box-shadow 0.5s ease' }
        ];

        setInterval(() => {
            if (!wishCard.classList.contains('flipped')) {
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                Object.keys(randomEffect).forEach(key => {
                    wishCard.style[key] = randomEffect[key];
                });

                // 还原效果
                setTimeout(() => {
                    wishCard.style.transform = 'scale(1) rotate(0)';
                    wishCard.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }, 2000);
            }
        }, 5000);
    }

    // 卡片触发后生成心形粒子效果
    function createHeartParticles(x, y) {
        const particlesCount = 15;
        for (let i = 0; i < particlesCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'heart-particle';

            // 随机大小、颜色和位置
            const size = Math.random() * 15 + 5;
            const colors = ['#ff6b8b', '#ff4757', '#ff9ff3', '#feca57'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 40;
            const finalX = x + Math.cos(angle) * distance;
            const finalY = y + Math.sin(angle) * distance;
            const duration = Math.random() * 2 + 1;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.backgroundColor = color;
            particle.style.setProperty('--heart-color', color);
            particle.style.animation = `floatParticle ${duration}s ease-out forwards`;

            // 设置最终位置
            setTimeout(() => {
                particle.style.transform = `translate(${finalX - x}px, ${finalY - y}px) rotate(45deg)`;
                particle.style.opacity = '0';
            }, 10);

            document.body.appendChild(particle);

            // 移除粒子
            setTimeout(() => {
                document.body.removeChild(particle);
            }, duration * 1000);
        }
    }

    // 为卡片添加点击粒子效果
    wishCard.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createHeartParticles(rect.left + x, rect.top + y);
    });

    // 添加随机话语飘窗效果
    function createFloatingMessage() {
        // 随机话语库
        const messages = [
            '爱情是心灵的共鸣',
            '每一次相遇都是命中注定',
            '真爱值得等待',
            '心有灵犀一点通',
            '愿得一人心，白首不相离',
            '爱情如酒，越陈越香',
            '两情若是久长时，又岂在朝朝暮暮',
            '爱是永恒的，爱是耐心的',
            '有缘千里来相会',
            '爱情使人心的憧憬升华到至善之境'
        ];

        const messageElement = document.createElement('div');
        messageElement.className = 'floating-message';
        messageElement.textContent = messages[Math.floor(Math.random() * messages.length)];

        // 随机位置和样式
        const left = Math.random() * 70 + 15;
        const size = Math.random() * 16 + 14;
        const duration = Math.random() * 15 + 10;
        const colors = ['#fff', '#ffeb3b', '#ff9800', '#4caf50'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        messageElement.style.left = `${left}%`;
        messageElement.style.fontSize = `${size}px`;
        messageElement.style.color = color;
        messageElement.style.animation = `floatUp ${duration}s linear forwards`;

        document.body.appendChild(messageElement);

        // 移除消息
        setTimeout(() => {
            document.body.removeChild(messageElement);
        }, duration * 1000);
    }

    // 定期创建随机话语飘窗
    setInterval(createFloatingMessage, 8000);

    // 3D相册功能
    function init3DGallery() {
        const galleryElement = document.getElementById('photo-gallery');
        const prevButton = document.getElementById('prev-photo');
        const nextButton = document.getElementById('next-photo');

        // 相册图片数据 - 使用七夕测试用图文件夹中的所有图片
        const photos = [
            // 2023年12月
            './七夕测试用图/2023年12月/2023年12月2日/2023-12-02 我和蓉笙-100天纪念.png',
            './七夕测试用图/2023年12月/2023年12月2日/2023-12-02 我和蓉笙-100天纪念@1.png',
            './七夕测试用图/2023年12月/2023年12月2日/2023-12-02 我和蓉笙-100天纪念@2.png',
            './七夕测试用图/2023年12月/2023年12月2日/2023-12-02 我和蓉笙-100天纪念@3.png',

            // 2024年10月
            './七夕测试用图/2024年10月/2024年10月2日/2024年10月2日-柳-一起睡觉.png',
            './七夕测试用图/2024年10月/2024年10月2日/2024年10月2日-柳-烤“兔子”.png',
            './七夕测试用图/2024年10月/2024年10月4日/2024年10月4日-柳儿、樱-十字路口合照.png',

            // 2024年11月
            './七夕测试用图/2024年11月/2024年11月29日/2024年11月29日-柳儿-树顶拍照-1305x682.png',
            './七夕测试用图/2024年11月/2024年11月29日/2024年11月29日-柳儿-树顶拍照-1366x681.png',

            // 2024年12月
            './七夕测试用图/2024年12月/2024年12月21日/2024年12月21日-柳儿-屋内-双人比心.png',
            './七夕测试用图/2024年12月/2024年12月21日/2024年12月21日-柳儿-终点前的合照 (1).png',
            './七夕测试用图/2024年12月/2024年12月21日/2024年12月21日-柳儿-终点前的合照 (2).png',
            './七夕测试用图/2024年12月/2024年12月21日/2024年12月21日-柳儿-草莓前的合照.png',
            './七夕测试用图/2024年12月/2024年12月21日/2024年12月21日-柳儿-草莓熊前合照-爱心动作.png',

            // 2024年1月
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-幻梦、蓉笙-热气球后的月亮.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-幻梦、蓉笙-路牌前@1.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-幻梦、蓉笙-路牌前@2.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-幻梦、蓉笙-路牌前的花海.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-幻梦、蓉笙-隔着桥相望.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-蓉笙、幻梦-蓉笙好矮啊哈哈哈.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-蓉笙的一封信-全面.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日-蓉笙的一封信.png',
            './七夕测试用图/2024年1月/2024年1月24日/2024年1月24日幻梦、蓉笙-我骑在蓉笙头上.png',

            // 2024年2月
            './七夕测试用图/2024年2月/2024年2月21日/2024年2月21日-蓉笙-一起看日落.jpg',
            './七夕测试用图/2024年2月/2024年2月21日/2024年3月24日-柳儿-一起看日落.png',
            './七夕测试用图/2024年2月/2024年2月22日/2024年2月22日-日落-蓉笙-柳仙儿姐妹.jpg',
            './七夕测试用图/2024年2月/2024年2月23日/2024年2月23日-蓉笙-三个娃-跑酷-2.jpg',
            './七夕测试用图/2024年2月/2024年2月23日/2024年2月23日-蓉笙-三个娃-跑酷.jpg',
            './七夕测试用图/2024年2月/2024年2月25日/2024年2月25日-柳儿-生存一起睡.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-清新早晨-站-温室-2.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-清新早晨-站-温室-对视.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-清新早晨-站-温室-特殊角度.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-清新早晨-站-温室.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-清爽早晨-坐.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜-坐.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜-站-巨月-1.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜-站-巨月-侧面.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜-站-巨月-特殊动作.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜-站-巨月-背面.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜-站-巨月.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色-漫漫长夜.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色.png',
            './七夕测试用图/2024年2月/2024年2月25日-景色图/2024年2月25日-柳儿-景色图-清爽早晨-坐.png',
            './七夕测试用图/2024年2月/2024年2月3日/2024年2月3日-蓉笙-两只小土豆子.png',

            // 2024年3月
            './七夕测试用图/2024年3月/2024年3月29日/2024年3月29日-柳梦生存生存-双人比心.png',
            './七夕测试用图/2024年3月/2024年3月2日/2024年3月2日-柳儿-一起看日落-两尊雕像 (1).png',
            './七夕测试用图/2024年3月/2024年3月2日/2024年3月2日-柳儿-一起看日落-两尊雕像 (3).png',
            './七夕测试用图/2024年3月/2024年3月2日/2024年3月2日-柳儿-一起看日落-两尊雕像 (4).png',
            './七夕测试用图/2024年3月/2024年3月2日/2024年3月2日-柳儿-一起看日落-两尊雕像 (5).png',
            './七夕测试用图/2024年3月/2024年3月30日/2024年3月30日-柳儿 -玫瑰花拱门前的你我.png',
            './七夕测试用图/2024年3月/2024年3月30日/2024年3月30日-柳儿 池塘倒映着硕大的玫瑰，而我的眼中只有你.png',
            './七夕测试用图/2024年3月/2024年3月30日/2024年3月30日-柳儿-硕大的玫瑰花前站着你和我.png',
            './七夕测试用图/2024年3月/2024年3月30日/2024年3月30日-柳儿-站在月亮上眺望玫瑰拱门.png',
            './七夕测试用图/2024年3月/2024年3月9日/2024年3月9日-柳儿-两只考拉.png',
            './七夕测试用图/2024年3月/2024年3月9日/2024年3月9日-柳儿-背后巨花.png',

            // 2024年4月
            './七夕测试用图/2024年4月/2024年4月12日/2024年4月12日-柳儿-一起看日落-光环与翅膀 (1).png',
            './七夕测试用图/2024年4月/2024年4月12日/2024年4月12日-柳儿-一起看日落-光环与翅膀 (2).png',
            './七夕测试用图/2024年4月/2024年4月21日/2024年4月21日-柳儿-长跑酷-结尾.png',
            './七夕测试用图/2024年4月/2024年4月7日/2024年4月7日-柳儿&潘叶-一起看日落-婚纱服.png',

            // 2024年6月
            './七夕测试用图/2024年6月/2024年6月10日/2024年6月10日-柳儿-默契度5200.png',
            './七夕测试用图/2024年6月/2024年6月15日/2024年6月15日-柳儿-跑酷结尾合照-三丽鸥双娃娃.png',
            './七夕测试用图/2024年6月/2024年6月1日/2024年6月1日-柳儿&幻梦-睡衣坐地.png',
            './七夕测试用图/2024年6月/2024年6月22日/2024年6月22日-柳儿-跑酷结尾花海秋千.png',

            // 2024年7月
            './七夕测试用图/2024年7月/2024年7月16日/2024年7月16日-柳儿&呆萌的樱娃娃店门前-三只小马宝莉.png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-出生点-粉蝶精灵.jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-薰衣草花海.jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-郁金香花海 (1).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-郁金香花海 (2).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (1).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (2).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (3).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (4).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (5).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (6).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/柳儿视角/2024年7月1日-雏菊花海 (7).jpg',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年6月29日-迷你豆礼盒-hetui，啥也不是-13抽.png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿&梦梦-合照-出生点-经典图-粉蝶精灵 (1).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿&梦梦-合照-出生点-经典图-粉蝶精灵 (2).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿&梦梦-合照-出生点-经典图-粉蝶精灵 (3).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿&梦梦-郁金香岛屿-合照 (1).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿&梦梦-郁金香岛屿-合照 (2).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿&梦梦-郁金香岛屿-合照 (3).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-合照-菊地草原 (1).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-合照-菊地草原 (2).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-合照-菊地草原 (3).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-合照-菊地草原 (4).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-合照-菊地草原 (5).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-紫色三角梅-合拍 (1).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-紫色三角梅-合拍 (2).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-薰衣草海 (1).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-薰衣草海 (2).png',
            './七夕测试用图/2024年7月/2024年7月1日-花海景色合照合集/自视角/2024年7月1日-柳儿-薰衣草海 (3).png',
            './七夕测试用图/2024年7月/2024年7月20日/2024年7月20日-领养宝宝-柳儿-两个小孩.png',
            './七夕测试用图/2024年7月/2024年7月22日/2024年7月22日-柳儿-跑酷结尾合照.png',
            './七夕测试用图/2024年7月/2024年7月26日/2024年7月26日-跑酷结尾-柳儿-双玉桂狗.png',
            './七夕测试用图/2024年7月/2024年7月27日/2024年7月27日-安琪儿-单人图.png',
            './七夕测试用图/2024年7月/2024年7月27日/2024年7月27日-柳儿-天使与堕天使-救赎感极强.png',
            './七夕测试用图/2024年7月/2024年7月6日/2024年7月6日-柳儿-两个绣球花看极光.png',
            './七夕测试用图/2024年7月/2024年7月7日/2024年7月7日-柳儿-两只蝴蝶在花海-右侧视角.png',
            './七夕测试用图/2024年7月/2024年7月7日/2024年7月7日-柳儿-两只蝴蝶在花海-左侧视角.png',

            // 2024年8月
            './七夕测试用图/2024年8月/2024七夕/2024年8月10日-柳儿-像素画合照.png',
            './七夕测试用图/2024年8月/2024七夕/2024年8月10日-柳儿-月季花海合照.png',
            './七夕测试用图/2024年8月/2024七夕/2024年8月10日-柳儿-祈愿树旁合照.png',
            './七夕测试用图/2024年8月/2024七夕/2024年8月10日-柳儿-繁华森林合照.png',
            './七夕测试用图/2024年8月/2024七夕/2024年8月10日-柳儿-蘑菇房合照.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-把人拉过来-互相鞠躬碰头.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-把人拉过来-亲我屁屁.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-把人拉过来-双人比心.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-把人拉过来-我去摸头.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-把人拉过来-推出爱心.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-迷你小镇-互相拥抱.png',
            './七夕测试用图/2024年8月/2024年8月24日/2024年8月24日-柳儿-迷你小镇-抱着柳吃饭.png',

            // 2024年9月
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-大树上秋千.png',
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-室内夜景.png',
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-树上秋千 (1).png',
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-树上秋千 (2).png',
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-树梢上.png',
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-窗前晒太阳.png',
            './七夕测试用图/2024年9月/2024年9月21日-景色/2024年9月21日-柳儿-窗边一起吃饭.png',

            // 2025年1月
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-一起看极光.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-刀架威胁.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-我趴地柳儿看.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-拔刀戏剧.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-爬行接吻-小楼.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-爬行接吻-朝露繁花.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-相拥亲吻.jpg',
            './七夕测试用图/2025年1月/2025年1月12日/2025年1月12日-鞠躬亲吻.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/我的视角/2025年1月16日-小熊前拍照.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/我的视角/2025年1月16日-幸福幸福请降临我们手心.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/我的视角/2025年1月16日-幸福幸福请降临柳儿手心.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/我的视角/2025年1月16日-花海前的合照.png',
            './七夕测试用图/2025年1月/2025年1月16日/柳儿视角/2025年1月16日-小熊前合影-柳儿挽着我的手.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/柳儿视角/2025年1月16日-我与柳儿花海前合照-定制.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/柳儿视角/2025年1月16日-我与柳儿花海前对视.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/柳儿视角/2025年1月16日-树屋前的合影-定制.jpg',
            './七夕测试用图/2025年1月/2025年1月16日/柳儿视角/2025年1月16日-树屋前的合影.jpg',
            './七夕测试用图/2025年1月/2025年1月18日/2025年1月18日-柳儿邮件造假.png',
            './七夕测试用图/2025年1月/2025年1月18日/2025年1月18日-解锁鲤瑶.png',
            './七夕测试用图/2025年1月/2025年1月18日/2025年1月18日-解锁龙瑜.png',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-星空、蝴蝶、萤火虫 (1).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-星空、蝴蝶、萤火虫 (2).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-星空、蝴蝶、萤火虫 (3).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-迎着日光的期待 (1).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-迎着日光的期待 (2).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-迎着日光的期待 (3).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-迎着日光的期待 (4).jpg',
            './七夕测试用图/2025年1月/2025年1月1日-跨年夜/2025年1月1日-柳儿-跨年合照-迎着日光的期待 (5).jpg',

        ];

        // 默认图片，当其他图片加载失败时使用
        const defaultImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22600%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20600%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18834956e66%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18834956e66%22%3E%3Crect%20width%3D%22800%22%20height%3D%22600%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247%22%20y%3D%22328.3%22%3E图片加载失败%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

        // 创建相册容器
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container';
        galleryContainer.style.transition = 'transform 0.8s ease'; // 添加容器过渡效果
        galleryElement.appendChild(galleryContainer);

        // 创建加载指示器
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'gallery-loading';
        loadingIndicator.textContent = '相册加载中...';
        galleryElement.appendChild(loadingIndicator);

        // 创建相册项
        const numPhotos = photos.length;
        const radius = 200; // 圆柱半径，减小以缩小整体相册尺寸
        const angleIncrement = (2 * Math.PI) / numPhotos; // 每张图片之间的角度
        let currentIndex = 0; // 当前显示的图片索引
        let isGalleryReady = false; // 相册是否准备就绪

        // 预加载所有图片
        let loadedCount = 0;
        const preloadedImages = [];

        function onImageLoaded() {
            loadedCount++;
            if (loadedCount === numPhotos) {
                // 所有图片加载完成
                loadingIndicator.style.display = 'none';
                isGalleryReady = true;
                updateGallery(); // 初始化显示
            }
        }

        // 预加载图片
        for (let i = 0; i < numPhotos; i++) {
            const img = new Image();
            img.onload = onImageLoaded;
            img.onerror = onImageLoaded; // 即使加载失败也继续
            img.src = photos[i];
            preloadedImages.push(img);
        }

        // 创建所有相册项
        for (let i = 0; i < numPhotos; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = i;
            galleryItem.style.opacity = i === 0 ? '1' : '0'; // 初始只显示第一张图片
            galleryItem.style.transition = 'transform 0.8s ease, opacity 0.8s ease, z-index 0.8s ease'; // 统一初始过渡效果

            const img = document.createElement('img');
            img.src = photos[i];
            img.alt = `爱情回忆 ${i + 1}`;
            img.loading = 'lazy'; // 延迟加载
            img.onerror = function() {
                this.src = defaultImage;
                console.warn(`图片 ${photos[i]} 加载失败，已替换为默认图片`);
            };
            galleryItem.appendChild(img);
            galleryContainer.appendChild(galleryItem);

            // 初始化位置：第一张居中显示，其他移到右侧隐藏
            if (i === 0) {
                galleryItem.style.transform = 'translate3d(0, 0, 0) scale(1.0)';
                galleryItem.style.zIndex = '100';
            } else {
                galleryItem.style.transform = 'translate3d(1000px, 0, 0) scale(0.5)';
                galleryItem.style.zIndex = '1';
            }

            // 设置点击事件 - 点击图片切换到该图片
            galleryItem.addEventListener('click', function() {
                if (!isGalleryReady) return;
                currentIndex = parseInt(this.dataset.index);
                updateGallery();
            });
        }

        // 更新相册显示 - 单次仅显示一张图片
        function updateGallery() {
            if (!isGalleryReady) return;

            // 强制重排以确保过渡效果正确应用
            void galleryContainer.offsetWidth;

            // 更新所有项目的样式
            document.querySelectorAll('.gallery-item').forEach((item, index) => {
                // 只显示当前索引的图片，其他图片隐藏
                if (index === currentIndex) {
                    // 当前图片居中显示
                    item.style.transform = 'translate3d(0, 0, 0) scale(1.0)';
                    item.style.opacity = '1';
                    item.style.zIndex = '100'; // 最高层级
                } else {
                    // 其他图片移到视野外并隐藏
                    // 根据位置决定移动方向，使切换效果更自然
                    const direction = index < currentIndex ? -1 : 1;
                    item.style.transform = `translate3d(${direction * 1000}px, 0, 0) scale(0.5)`;
                    item.style.opacity = '0';
                    item.style.zIndex = '1';
                }
            });
        }

        // 前进按钮事件
        nextButton.addEventListener('click', function() {
            if (!isGalleryReady) return;
            // 添加按钮点击反馈
            this.classList.add('btn-active');
            setTimeout(() => this.classList.remove('btn-active'), 200);

            currentIndex = (currentIndex + 1) % numPhotos;
            updateGallery();
        });

        // 后退按钮事件
        prevButton.addEventListener('click', function() {
            if (!isGalleryReady) return;
            // 添加按钮点击反馈
            this.classList.add('btn-active');
            setTimeout(() => this.classList.remove('btn-active'), 200);

            currentIndex = (currentIndex - 1 + numPhotos) % numPhotos;
            updateGallery();
        });

        // 初始化相册
        updateGallery(); // 立即调用以确保首张图片显示为最大尺寸

        // 添加自动旋转效果
        let autoRotateInterval;
        let isAutoRotating = true;

        function startAutoRotate() {
            if (!isAutoRotating) return;
            autoRotateInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % numPhotos;
                updateGallery();
            }, 5000); // 每5秒自动切换
        }

        function stopAutoRotate() {
            clearInterval(autoRotateInterval);
        }

        // 鼠标悬停时停止自动旋转
        galleryElement.addEventListener('mouseenter', function() {
            isAutoRotating = false;
            stopAutoRotate();
        });

        // 鼠标离开时恢复自动旋转
        galleryElement.addEventListener('mouseleave', function() {
            isAutoRotating = true;
            startAutoRotate();
        });

        // 开始自动旋转
        startAutoRotate();
    }

    // 初始化3D相册
    init3DGallery();

    // 爱情运势测试结果显示时触发话语飘窗
    const floatingTestButton = document.getElementById('test-fortune');
    floatingTestButton.addEventListener('click', function() {
        setTimeout(createFloatingMessage, 1000);
    });

    // 添加爱情配对测试
    function addLoveCompatibilityTest() {
        const compatibilityContainer = document.createElement('div');
        compatibilityContainer.className = 'love-compatibility';
        compatibilityContainer.innerHTML = `
            <h3>爱情配对测试</h3>
            <div class="compatibility-inputs">
                <input type="text" id="your-name-compat" placeholder="你的名字">
                <input type="text" id="partner-name-compat" placeholder="TA的名字">
            </div>
            <button id="test-compatibility">测试配对</button>
            <div id="compatibility-result"></div>
        `;
        document.querySelector('main').appendChild(compatibilityContainer);

        const testButton = document.getElementById('test-compatibility');
        const resultDiv = document.getElementById('compatibility-result');
        const yourNameInput = document.getElementById('your-name-compat');
        const partnerNameInput = document.getElementById('partner-name-compat');

        // 配对结果描述
        const compatibilityDescriptions = [
            '完美配对！你们是天造地设的一对，性格互补，心灵相通。',
            '非常契合！你们有很多共同点，在一起会非常幸福。',
            '相当匹配！虽然偶尔会有小摩擦，但总体非常和谐。',
            '比较合适！你们需要更多的沟通和理解，但潜力很大。',
            '有待观察！你们之间有差异，但爱情需要磨合。'
        ];

        testButton.addEventListener('click', function() {
            if (!yourNameInput.value.trim() || !partnerNameInput.value.trim()) {
                alert('请输入你和TA的名字');
                return;
            }

            // 简单的哈希算法生成匹配度
            const combined = yourNameInput.value.trim().toLowerCase() + partnerNameInput.value.trim().toLowerCase();
            let hash = 0;
            for (let i = 0; i < combined.length; i++) {
                hash = combined.charCodeAt(i) + ((hash << 5) - hash);
            }
            const compatibilityScore = Math.abs(hash % 51) + 50; // 50-100%
            const descriptionIndex = Math.min(Math.floor((compatibilityScore - 50) / 10), compatibilityDescriptions.length - 1);

            resultDiv.style.opacity = '0';
            setTimeout(() => {
                resultDiv.innerHTML = `
                    <div class="compatibility-card">
                        <h4>${yourNameInput.value} 和 ${partnerNameInput.value} 的配对指数</h4>
                        <div class="compatibility-score">${compatibilityScore}%</div>
                        <p>${compatibilityDescriptions[descriptionIndex]}</p>
                    </div>
                `;
                resultDiv.style.opacity = '1';

                // 触发话语飘窗
                setTimeout(createFloatingMessage, 500);
            }, 300);
        });
    }

    // 添加爱情许愿池
    function addWishingWell() {
        const wishingWellContainer = document.createElement('div');
        wishingWellContainer.className = 'wishing-well';
        wishingWellContainer.innerHTML = `
            <h3>爱情许愿池</h3>
            <textarea id="wish-input" placeholder="写下你的爱情愿望..."></textarea>
            <button id="make-wish">许下愿望</button>
            <div id="wishes-container"></div>
        `;
        document.querySelector('main').appendChild(wishingWellContainer);

        const makeWishButton = document.getElementById('make-wish');
        const wishInput = document.getElementById('wish-input');
        const wishesContainer = document.getElementById('wishes-container');

        // 加载保存的愿望
        function loadWishes() {
            const wishes = JSON.parse(localStorage.getItem('loveWishes') || '[]');
            wishesContainer.innerHTML = '';
            wishes.forEach((wish, index) => {
                addWishToContainer(wish, index);
            });
        }

        // 添加愿望到容器
        function addWishToContainer(wish, index) {
            const wishElement = document.createElement('div');
            wishElement.className = 'wish';
            wishElement.innerHTML = `
                <div class="wish-content">
                    <p>${wish.text}</p>
                    <span class="wish-date">${wish.date}</span>
                </div>
                <button class="delete-wish" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            wishElement.style.opacity = '0';
            wishesContainer.appendChild(wishElement);

            // 淡入效果
            setTimeout(() => {
                wishElement.style.opacity = '1';
            }, 100);

            // 添加删除按钮事件
            const deleteButton = wishElement.querySelector('.delete-wish');
            deleteButton.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                deleteWish(index);
            });
        }

        // 删除愿望
        function deleteWish(index) {
            // 获取当前愿望列表
            let wishes = JSON.parse(localStorage.getItem('loveWishes') || '[]');

            // 从列表中删除愿望
            wishes.splice(index, 1);

            // 更新本地存储
            localStorage.setItem('loveWishes', JSON.stringify(wishes));

            // 重新加载愿望列表
            loadWishes();

            // 显示删除成功提示
            const notification = document.createElement('div');
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = 'rgba(255, 107, 139, 0.9)';
            notification.style.color = 'white';
            notification.style.padding = '10px 20px';
            notification.style.borderRadius = '5px';
            notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            notification.style.zIndex = '1000';
            notification.textContent = '愿望已删除！';
            document.body.appendChild(notification);

            // 3秒后移除提示
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        }

        makeWishButton.addEventListener('click', function() {
            const wishText = wishInput.value.trim();
            if (wishText) {
                const wish = {
                    text: wishText,
                    date: new Date().toLocaleString()
                };

                // 保存到本地存储
                const wishes = JSON.parse(localStorage.getItem('loveWishes') || '[]');
                wishes.push(wish);
                localStorage.setItem('loveWishes', JSON.stringify(wishes));

                // 添加到容器
                addWishToContainer(wish);

                // 清空输入框
                wishInput.value = '';

                // 触发话语飘窗
                setTimeout(createFloatingMessage, 500);
            } else {
                alert('请输入你的愿望！');
            }
        });

        // 初始化加载愿望
        loadWishes();
    }

    // 为卡片添加悬停效果
    wishCard.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });

    wishCard.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // 初始化新增功能
    randomCardEffects();
    addLoveCompatibilityTest();
    addWishingWell();
    createFireworks();
    createLoveMemoryCardsV2();

// 2. 爱情记忆卡片功能
function createLoveMemoryCardsV2() {
    // 创建记忆卡片容器
    const memoryContainer = document.createElement('div');
    memoryContainer.className = 'acrostic-poem'; // 复用现有样式
    memoryContainer.innerHTML = `
        <h3>爱情记忆卡片</h3>
        <div class="memory-form">
            <input type="text" id="memory-title" placeholder="标题 (如: 第一次约会)">
            <input type="date" id="memory-date">
            <textarea id="memory-content" placeholder="写下你的爱情记忆..."></textarea>
            <button id="save-memory">保存记忆</button>
        </div>
        <div id="memory-cards-container"></div>
    `;
    document.querySelector('main').appendChild(memoryContainer);

    const titleInput = document.getElementById('memory-title');
    const dateInput = document.getElementById('memory-date');
    const contentInput = document.getElementById('memory-content');
    const saveButton = document.getElementById('save-memory');
    const cardsContainer = document.getElementById('memory-cards-container');

    // 加载保存的记忆
    function loadMemories() {
        const memories = JSON.parse(localStorage.getItem('loveMemories') || '[]');
        cardsContainer.innerHTML = '';

        // 倒序显示记忆（最新的在前面）
        memories.reverse().forEach(memory => {
            const memoryCard = document.createElement('div');
            memoryCard.className = 'memory-card';
            memoryCard.innerHTML = `
                <div class="memory-card-header">
                    <h4>${memory.title}</h4>
                    <span class="memory-date">${memory.date}</span>
                </div>
                <p class="memory-content">${memory.content}</p>
                <button class="delete-memory" data-id="${memory.id}">删除</button>
            `;
            cardsContainer.appendChild(memoryCard);

            // 添加卡片悬停效果
            memoryCard.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                this.style.transition = 'all 0.3s ease';
            });

            memoryCard.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            });

            // 添加删除记忆功能
            const deleteButton = memoryCard.querySelector('.delete-memory');
            deleteButton.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                deleteMemory(id, memoryCard);
            });
        });
    }

    // 保存记忆
    function saveMemory() {
        const title = titleInput.value.trim();
        const date = dateInput.value;
        const content = contentInput.value.trim();

        if (!title || !date || !content) {
            alert('请填写完整的记忆信息');
            return;
        }

        const memories = JSON.parse(localStorage.getItem('loveMemories') || '[]');
        const newMemory = {
            id: Date.now().toString(),
            title: title,
            date: date,
            content: content
        };

        memories.push(newMemory);
        localStorage.setItem('loveMemories', JSON.stringify(memories));

        // 清空输入框
        titleInput.value = '';
        dateInput.value = '';
        contentInput.value = '';

        // 重新加载记忆
        loadMemories();

        // 显示保存成功提示
        const notification = document.createElement('div');
        notification.className = 'memory-notification';
        notification.textContent = '记忆保存成功！';
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 2000);
    }

    // 初始化删除确认模态窗
    function initDeleteModal() {
        const modal = document.createElement('style');
        modal.textContent = `
            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(223, 34, 85, 0.3);
                z-index: 1000;
                justify-content: center;
                align-items: center;
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background-color: #fff;
                border-radius: 15px;
                padding: 30px;
                width: 320px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(223, 34, 85, 0.2);
                transform: scale(0.95);
                animation: scaleIn 0.3s ease forwards;
                border: 1px solid #f8d7da;
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            .modal-content h3 {
                color: #d32f2f;
                font-family: 'Arial', sans-serif;
                margin-bottom: 15px;
                font-size: 22px;
                position: relative;
                display: inline-block;
            }
            
            .modal-content h3::after {
                content: '';
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 3px;
                background-color: #f8bbd0;
                border-radius: 2px;
            }
            
            .modal-content p {
                color: #555;
                font-family: 'Arial', sans-serif;
                margin-bottom: 25px;
                font-size: 16px;
                line-height: 1.6;
            }
            
            .modal-buttons {
                display: flex;
                justify-content: space-around;
                margin-top: 10px;
            }
            
            .modal-buttons .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 25px;
                cursor: pointer;
                font-weight: bold;
                transition: all 0.3s ease;
                min-width: 100px;
                text-align: center;
                text-decoration: none;
            }

            #confirm-delete {
                background: linear-gradient(to right, #d32f2f, #b71c1c);
                color: white;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }

            #confirm-delete:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
                background: linear-gradient(to right, #b71c1c, #d32f2f);
            }

            #cancel-delete {
                background: transparent;
                border: 2px solid #ddd;
                color: #555;
            }

            #cancel-delete:hover {
                background: #f5f5f5;
                transform: translateY(-2px);
                box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            }
                margin-top: 20px;
            }
        `;
        document.head.appendChild(modal);
    }

    // 显示删除确认模态窗
    function showDeleteModal(id, element) {
        const modal = document.getElementById('delete-modal');
        const confirmBtn = document.getElementById('confirm-delete');
        const cancelBtn = document.getElementById('cancel-delete');

        // 确保模态窗已创建
        if (!modal) {
            console.error('删除模态窗未找到');
            return;
        }

        modal.style.display = 'flex';

        // 确认删除
        confirmBtn.onclick = function() {
            // 立即从界面移除元素
            if (element && element.parentNode) {
                element.parentNode.removeChild(element);
            }

            // 更新本地存储
            let memories = JSON.parse(localStorage.getItem('loveMemories') || '[]');
            memories = memories.filter(memory => memory.id.toString() !== id.toString());
            localStorage.setItem('loveMemories', JSON.stringify(memories));

            modal.style.display = 'none';
        };

        // 取消删除
        cancelBtn.onclick = function() {
            modal.style.display = 'none';
        };

        // 点击模态窗外区域关闭
        modal.onclick = function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    // 删除记忆
    function deleteMemory(id, element) {
        showDeleteModal(id, element);
    }

    // 绑定保存按钮事件
    saveButton.addEventListener('click', saveMemory);

    // 初始化删除确认模态窗
    initDeleteModal();

    // 初始化加载记忆
    loadMemories();

    // 创建查看记忆按钮并添加到记忆容器
    function createViewMemoriesButton() {
        // 查找并移除原有按钮
        const oldButton = document.getElementById('view-memories');
        if (oldButton) {
            oldButton.parentNode.removeChild(oldButton);
        }

        // 创建新按钮
        const viewMemoriesButton = document.createElement('button');
        viewMemoriesButton.id = 'view-memories';
        viewMemoriesButton.className = 'btn';
        viewMemoriesButton.textContent = '查看爱情记忆';

        // 添加到记忆容器上方
        memoryContainer.parentNode.insertBefore(viewMemoriesButton, memoryContainer);

        // 添加按钮点击事件 - 切换记忆显示/隐藏
        let memoriesVisible = false;
        viewMemoriesButton.addEventListener('click', function() {
            memoriesVisible = !memoriesVisible;
            if (memoriesVisible) {
                memoryContainer.style.display = 'block';
                memoryContainer.scrollIntoView({ behavior: 'smooth' });
                loadMemories(); // 确保加载最新记忆
            } else {
                memoryContainer.style.display = 'none';
            }
        });

        // 默认隐藏记忆容器
        memoryContainer.style.display = 'none';
    }

    // 调用函数创建按钮
    createViewMemoriesButton();

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .memory-card {
            background-color: #fff;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative;
        }
        .memory-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        .memory-card-header h4 {
            margin: 0;
            color: #ff6b8b;
        }
        .memory-date {
            font-size: 12px;
            color: #888;
        }
        .memory-content {
            margin: 0 0 15px 0;
            line-height: 1.6;
            color: #333;
        }
        .delete-memory {
            background-color: #ff4757;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            position: absolute;
            bottom: 10px;
            right: 15px;
        }
        .delete-memory:hover {
            background-color: #ff6b8b;
        }
        .memory-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4caf50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            opacity: 1;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
}

// 1. 交互式烟花绽放功能
function createFireworks() {
    document.body.addEventListener('click', function(e) {
        // 创建烟花容器
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${e.clientX}px`;
        firework.style.top = `${e.clientY}px`;
        document.body.appendChild(firework);

        // 烟花上升动画
        setTimeout(() => {
            // 随机颜色
            const colors = ['#ff6b8b', '#ff4757', '#ff9ff3', '#feca57', '#4caf50', '#5b86e5'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const particlesCount = 50; // 粒子数量
            const explosionSize = 100; // 爆炸大小

            // 创建爆炸粒子
            for (let i = 0; i < particlesCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'firework-particle';
                particle.style.position = 'fixed';
                particle.style.left = `${e.clientX}px`;
                particle.style.top = `${e.clientY}px`;
                particle.style.width = `${Math.random() * 3 + 2}px`;
                particle.style.height = particle.style.width;
                particle.style.borderRadius = '50%';
                particle.style.backgroundColor = color;
                particle.style.opacity = '0.8';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '1002';
                document.body.appendChild(particle);

                // 随机角度和距离
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * explosionSize;
                const finalX = e.clientX + Math.cos(angle) * distance;
                const finalY = e.clientY + Math.sin(angle) * distance;
                const duration = Math.random() * 1 + 1;

                // 设置动画
                setTimeout(() => {
                    particle.style.transition = `all ${duration}s ease-out`;
                    particle.style.transform = `translate(${finalX - e.clientX}px, ${finalY - e.clientY}px)`;
                    particle.style.opacity = '0';

                    // 移除粒子
                    setTimeout(() => {
                        document.body.removeChild(particle);
                    }, duration * 1000);
                }, 10);
            }

            // 移除烟花容器
            setTimeout(() => {
                document.body.removeChild(firework);
            }, 100);
        }, 500);
    });

// 2. 爱情记忆卡片功能
function createLoveMemoryCards() {
    // 创建记忆卡片容器
    const memoryContainer = document.createElement('div');
    memoryContainer.className = 'acrostic-poem'; // 复用现有样式
    memoryContainer.innerHTML = `
        <h3>爱情记忆卡片</h3>
        <div class="memory-form">
            <input type="text" id="memory-title" placeholder="标题 (如: 第一次约会)">
            <input type="date" id="memory-date">
            <textarea id="memory-content" placeholder="写下你的爱情记忆..."></textarea>
            <button id="save-memory">保存记忆</button>
        </div>
        <div id="memory-cards-container"></div>
    `;
    document.querySelector('main').appendChild(memoryContainer);

    const titleInput = document.getElementById('memory-title');
    const dateInput = document.getElementById('memory-date');
    const contentInput = document.getElementById('memory-content');
    const saveButton = document.getElementById('save-memory');
    const cardsContainer = document.getElementById('memory-cards-container');

    // 加载保存的记忆
    function loadMemories() {
        const memories = JSON.parse(localStorage.getItem('loveMemories') || '[]');
        cardsContainer.innerHTML = '';
        memories.forEach((memory, index) => {
            addMemoryToContainer(memory, index);
        });
    }

    // 添加记忆到容器
    function addMemoryToContainer(memory, index) {
        const memoryCard = document.createElement('div');
        memoryCard.className = 'memory-card';
        memoryCard.dataset.index = index;
        memoryCard.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-front">
                    <h4>${memory.title}</h4>
                    <p class="memory-date">${memory.date}</p>
                </div>
                <div class="memory-card-back">
                    <p>${memory.content}</p>
                    <button class="delete-memory" data-index="${index}">删除</button>
                </div>
            </div>
        `;
        cardsContainer.appendChild(memoryCard);

        // 添加翻转效果
        memoryCard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });

        // 添加删除功能
        const deleteButton = memoryCard.querySelector('.delete-memory');
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const index = parseInt(this.getAttribute('data-index'));
            deleteMemory(index);
        });
    }

    // 删除记忆
    function deleteMemory(index) {
        let memories = JSON.parse(localStorage.getItem('loveMemories') || '[]');
        memories.splice(index, 1);
        localStorage.setItem('loveMemories', JSON.stringify(memories));
        loadMemories();

        // 显示删除成功提示
        showNotification('记忆已删除！');
    }

    // 保存记忆
    saveButton.addEventListener('click', function() {
        const title = titleInput.value.trim();
        const date = dateInput.value;
        const content = contentInput.value.trim();

        if (!title || !date || !content) {
            alert('请填写完整的记忆信息');
            return;
        }

        const memory = {
            title: title,
            date: date,
            content: content
        };

        // 保存到本地存储
        const memories = JSON.parse(localStorage.getItem('loveMemories') || '[]');
        memories.push(memory);
        localStorage.setItem('loveMemories', JSON.stringify(memories));

        // 添加到容器
        addMemoryToContainer(memory, memories.length - 1);

        // 清空输入框
        titleInput.value = '';
        dateInput.value = '';
        contentInput.value = '';

        // 显示保存成功提示
        showNotification('记忆已保存！');
    });

    // 显示通知
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(255, 107, 139, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.textContent = message;
        document.body.appendChild(notification);

        // 3秒后移除提示
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }

    // 初始化加载记忆
    loadMemories();
}

// 3. 缘分红线配对游戏
function createRedThreadGame() {
    // 找到要替换的div
    const targetDiv = document.querySelector('.wish-form');
    if (!targetDiv) {
        console.error('未找到要替换的div');
        return;
    }

    // 替换为游戏界面
    targetDiv.innerHTML = `
        <h3>缘分红线配对</h3>
        <div class="game-area">
            <div class="game-info">
                <div class="game-score">得分: <span id="score">0</span></div>
                <div class="game-time">时间: <span id="time">60</span>秒</div>
            </div>
            <div class="game-container" id="game-container">
                <canvas id="game-canvas"></canvas>
            </div>
            <button class="game-button" id="start-game">开始游戏</button>
        </div>
    `;

    const gameContainer = document.getElementById('game-container');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('start-game');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');

    // 设置画布尺寸
    canvas.width = gameContainer.offsetWidth;
    canvas.height = 400;

    let isGameRunning = false;
    let score = 0;
    let time = 60;
    let gameInterval;
    let hearts = [];
    let activeHeart = null;
    let isDragging = false;
    let lines = [];
    let correctPairs = 0;
    const totalPairs = 5;

    // 生成爱心
    function generateHearts() {
        hearts = [];
        lines = [];
        correctPairs = 0;

        // 生成5对爱心
        for (let i = 0; i < totalPairs; i++) {
            // 左侧爱心
            const leftHeart = {
                x: Math.random() * (canvas.width / 2 - 50) + 25,
                y: Math.random() * (canvas.height - 50) + 25,
                radius: 20,
                color: '#ff6b8b',
                id: i * 2,
                paired: false
            };

            // 右侧爱心
            const rightHeart = {
                x: Math.random() * (canvas.width / 2 - 50) + canvas.width / 2 + 25,
                y: Math.random() * (canvas.height - 50) + 25,
                radius: 20,
                color: '#5b86e5',
                id: i * 2 + 1,
                paired: false,
                pairId: leftHeart.id
            };

            // 设置左侧爱心的配对ID
            leftHeart.pairId = rightHeart.id;

            hearts.push(leftHeart);
            hearts.push(rightHeart);
        }
    }

    // 绘制爱心
    function drawHeart(x, y, radius, color) {
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.scale(radius / 10, radius / 10);

        // 爱心形状
        ctx.moveTo(0, -10);
        ctx.bezierCurveTo(-7, -17, -17, -7, -17, 0);
        ctx.bezierCurveTo(-17, 10, 0, 20, 0, 20);
        ctx.bezierCurveTo(0, 20, 17, 10, 17, 0);
        ctx.bezierCurveTo(17, -7, 7, -17, 0, -10);

        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    // 绘制游戏
    function drawGame() {
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 绘制连接线
        lines.forEach(line => {
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            ctx.lineTo(line.endX, line.endY);
            ctx.strokeStyle = line.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        // 绘制爱心
        hearts.forEach(heart => {
            drawHeart(heart.x, heart.y, heart.radius, heart.color);

            // 绘制ID
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(heart.id, heart.x, heart.y);
        });
    }

    // 检查碰撞
    function checkCollision(x, y, heart) {
        const dx = x - heart.x;
        const dy = y - heart.y;
        return Math.sqrt(dx * dx + dy * dy) <= heart.radius;
    }

    // 开始游戏
    function startGame() {
        if (isGameRunning) return;

        isGameRunning = true;
        score = 0;
        time = 60;
        scoreElement.textContent = score;
        timeElement.textContent = time;

        // 生成爱心
        generateHearts();

        // 绘制游戏
        drawGame();

        // 设置时间倒计时
        gameInterval = setInterval(() => {
            time--;
            timeElement.textContent = time;

            if (time <= 0) {
                endGame();
            }
        }, 1000);
    }

    // 结束游戏
    function endGame() {
        isGameRunning = false;
        clearInterval(gameInterval);

        // 显示游戏结束画面
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2 - 30);

        ctx.font = '18px Arial';
        ctx.fillText(`你的得分: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`配对成功率: ${Math.round((correctPairs / totalPairs) * 100)}%`, canvas.width / 2, canvas.height / 2 + 30);
    }

    // 添加鼠标事件
    canvas.addEventListener('mousedown', function(e) {
        if (!isGameRunning) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 检查是否点击了爱心
        hearts.forEach(heart => {
            if (!heart.paired && checkCollision(x, y, heart)) {
                activeHeart = heart;
                isDragging = true;
            }
        });
    });

    canvas.addEventListener('mousemove', function(e) {
        if (!isDragging || !activeHeart || !isGameRunning) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 更新连接线
        if (lines.length > 0 && lines[lines.length - 1].active) {
            lines[lines.length - 1].endX = x;
            lines[lines.length - 1].endY = y;
        } else {
            lines.push({
                startX: activeHeart.x,
                startY: activeHeart.y,
                endX: x,
                endY: y,
                color: '#ff6b8b',
                active: true
            });
        }

        // 重绘游戏
        drawGame();
    });

    canvas.addEventListener('mouseup', function(e) {
        if (!isDragging || !activeHeart || !isGameRunning) {
            isDragging = false;
            activeHeart = null;
            return;
        }

        isDragging = false;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // 检查是否连接到了正确的爱心
        let matched = false;
        hearts.forEach(heart => {
            if (
                heart.id !== activeHeart.id &&
                !heart.paired &&
                heart.pairId === activeHeart.id &&
                checkCollision(x, y, heart)
            ) {
                // 配对成功
                matched = true;
                activeHeart.paired = true;
                heart.paired = true;
                correctPairs++;
                score += 100;
                scoreElement.textContent = score;

                // 更新连接线
                if (lines.length > 0 && lines[lines.length - 1].active) {
                    lines[lines.length - 1].endX = heart.x;
                    lines[lines.length - 1].endY = heart.y;
                    lines[lines.length - 1].color = '#4caf50';
                    lines[lines.length - 1].active = false;
                }

                // 显示成功提示
                showNotification('配对成功！+100分');

                // 检查是否完成所有配对
                if (correctPairs === totalPairs) {
                    // 提前结束游戏
                    setTimeout(endGame, 1000);
                }
            }
        });

        // 如果没有配对成功，移除连接线
        if (!matched) {
            if (lines.length > 0 && lines[lines.length - 1].active) {
                lines.pop();
            }
        }

        activeHeart = null;

        // 重绘游戏
        drawGame();
    });

    // 开始按钮点击事件
    startButton.addEventListener('click', startGame);
}
    // 显示通知
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'game-notification';
        notification.textContent = message;
        gameContainer.appendChild(notification);

        // 1秒后移除提示
        setTimeout(() => {
            gameContainer.removeChild(notification);
        }, 1000);
    }

    // 初始绘制
    // 移到startGame函数中调用，避免作用域问题
}
    // 检查是否已加载html2canvas库
    if (!window.html2canvas) {
        // 动态加载html2canvas库
        const script = document.createElement('script');
        script.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
        document.head.appendChild(script);
        script.onload = function() {
            initAcrosticPoem();
        };
    } else {
        initAcrosticPoem();
    }

    function initAcrosticPoem() {
        // 创建藏头诗生成器容器
        const poemContainer = document.createElement('div');
        poemContainer.className = 'acrostic-poem';
        poemContainer.innerHTML = `
            <h3>爱情藏头诗生成</h3>
            <input type="text" id="poem-keywords" placeholder="输入四字短语，如'我爱你'">
            <button id="generate-poem">生成藏头诗</button>
            <div id="poem-result"></div>
            <button id="download-poem" style="display:none;">下载藏头诗</button>
        `;
        document.querySelector('main').appendChild(poemContainer);

        const keywordsInput = document.getElementById('poem-keywords');
        const generateButton = document.getElementById('generate-poem');
        const poemResult = document.getElementById('poem-result');
        const downloadButton = document.getElementById('download-poem');

        // 藏头诗数据库
        const poemDatabase = {
            '我': ['我心明月照，', '我意与君同，', '我欲乘风去，', '我慕青云端，', '我寄愁心与明月，', '我生从何来，', '我醉欲眠卿且去，', '我自横刀向天笑，'],
            '爱': ['爱意似深海，', '爱如潮水来，', '爱君心不变，', '爱随春风起，', '爱到深处无怨尤，', '爱你在心口难开，', '爱若磐石无转移，', '爱要大声说出来。', '爱如春雨润无声，', '爱你一万年。'],
            '你': ['你似画中仙。', '你若惊鸿影。', '你我共婵娟。', '你是心上秋。', '你若安好便是晴天。', '你在我心中，', '你一笑倾城，', '你是我的唯一。', '你是我生命中的阳光。', '你占据了我的心。'],
            '一': ['一生一世情，', '一见钟情时，', '一诺千金重，', '一笑倾人城，', '一片冰心在玉壶。', '一心一意爱，', '一生长相守，', '一刻值千金。', '一入情网深似海。', '一眼万年。'],
            '生': ['生死契阔时，', '生平无别愿，', '生当复来归，', '生如夏花绚烂，', '生我劬劳胡不报。', '生命诚可贵，爱情价更高，', '生离死别最伤情，', '生而为人请相爱。', '生生死死相随。', '生命因你而精彩。'],
            '永': ['永远长相守。', '永结同心锁。', '永世不相忘。', '永夜思君切。', '永日方戚戚。', '永恒不变心，', '永浴爱河中共度，', '永生永世不分离。', '永远爱你。', '永不停歇的爱。'],
            '远': ['远隔千里心相连。', '远在天边近眼前。', '远山含黛月含情。', '远路漫漫共携手。', '远梦归侵晓。', '远方有佳人，', '远距离产生美，', '远亲不如近邻，远爱更胜近情。', '远看山有色。', '远水解不了近渴，但远爱能暖人心。'],
            '真': ['真心永不变。', '真爱无国界。', '真情比金坚。', '真诚动天地。', '真珠一颗价千金。', '真心情意浓，', '真金不怕火炼，真情不怕考验，', '真正的爱情是永恒的。', '真心换真情。', '真真切切爱一场。'],
            '心': ['心有灵犀一点通。', '心中自有明月照。', '心似双丝网，中有千千结。', '心若向阳花自开。', '心随朗月高。', '心相印，情相连，', '心脏病还须心药医，', '心若磐石坚，情比金缕韧。', '心被你占据。', '心花怒放为你开。'],
            '相': ['相濡以沫度此生。', '相识满天下，知心能几人。', '相思相见知何日。', '相见时难别亦难。', '相逢何必曾相识。', '相爱容易相处难，', '相敬如宾到白头，', '相伴一生不分离。', '相遇是缘，相守是分。', '相视而笑，莫逆于心。'],
            '守': ['守得云开见月明。', '守着窗儿，独自怎生得黑。', '守岁全家夜不眠。', '守口如瓶意自闲。', '守拙归园田。', '守护爱情到永远，', '守一人，过一生，', '守着回忆度余生。', '守着你，便是晴天。', '守心不变，爱意永恒。'],
            '幸': ['幸福满人间。', '幸运常相伴。', '幸得识卿桃花面。', '幸甚至哉歌以咏志。', '幸有弦歌曲。', '幸福就是你在身边，', '幸运遇到你，', '幸福的家庭都是相似的。', '幸福悄悄降临。', '幸与君相识。'],
            '福': ['福禄寿喜全。', '福气满门庭。', '福如东海长流水。', '福星高照万事兴。', '福兮祸所伏。', '福气满满，', '福到家门，', '福如东海，寿比南山。', '福由心生，爱由情起。', '福慧双修，爱情长久。'],
            '快': ['快乐永相随。', '快意人生须尽欢。', '快步如飞赴佳期。', '快心满意足。', '快马加鞭未下鞍。', '快乐很简单，', '快乐每一天，', '快乐是最好的药方。', '快乐因你而起。', '快步向你奔去。'],
            '乐': ['乐在其中矣。', '乐以忘忧不知老。', '乐山乐水心自宽。', '乐游原上清秋节。', '乐极生悲古所闻。', '乐不思蜀，', '乐观面对一切，', '乐滋滋，笑哈哈。', '乐与你分享。', '乐得逍遥自在。'],
            '情': ['情不知所起，一往而深。', '情深似海，', '情丝万缕，', '情投意合，', '情比金坚，', '情到浓时情转薄，', '情人眼里出西施，', '情人间的甜言蜜语。', '情到深处无怨尤。', '情系一生。'],
            '缘': ['缘分天注定，', '缘来如此，', '缘起缘灭，', '缘定三生，', '缘聚缘散，', '缘分让我们相遇，', '缘起不灭，', '缘是前世的约定。', '缘妙不可言。', '缘来则聚，缘去则散。'],
            '恋': ['恋恋不舍，', '恋爱中的人，', '恋曲一首，', '恋你如诗，', '恋上你的笑，', '恋旧的人最深情，', '恋爱需要勇气，', '恋是一种甜蜜的负担。', '恋恋不忘，必有回响。', '恋爱的感觉很奇妙。'],
            '痴': ['痴心一片向君倾。', '痴情不改终不悔。', '痴人说梦只为你。', '痴心绝对。', '痴恋成狂。', '痴情的人最可爱。', '痴心妄想也是甜。', '痴痴呆呆想着你。'],
            '醉': ['醉在爱河不思归。', '醉卧美人膝。', '醉人的笑容你有没有。', '醉生梦死只为情。', '醉意朦胧情更浓。', '醉看人间情未了。', '醉人的爱情。', '醉后吐真言，爱你到永远。'],
            '美': ['美人如玉剑如虹。', '美丽的你，我的最爱。', '美景良辰奈何天。', '美目盼兮，巧笑倩兮。', '美在心中，爱在行动。', '美丽的爱情故事。', '美人在侧，夫复何求。', '美丽的相遇，美好的结局。'],
            '好': ['好花常开，好景常在。', '好事成双，爱意成对。', '好聚好散，缘分使然。', '好人好梦，爱情长久。', '好的爱情让人成长。', '好言好语暖人心。', '好好相爱，天天向上。', '好的开始是成功的一半。'],
            '意': ['意乱情迷，', '意犹未尽，', '意中人，', '意马心猿，', '意气风发，', '意难平，', '意义非凡，', '意在沛公。'],
            '美': ['美人如花，', '美不胜收，', '美景良辰，', '美中不足，', '美轮美奂，', '美丽的心灵，', '美貌与智慧并存，', '美是一种感觉。'],
            '好': ['好事多磨，', '好梦成真，', '好聚好散，', '好言相劝，', '好人一生平安，', '好看的皮囊千篇一律，有趣的灵魂万里挑一，', '好习惯受益终生，', '好的开始是成功的一半。'],
            '思': ['思念成灾，', '思前想后，', '思绪万千，', '思君不见君，', '思归故里，', '思想是自由的，', '思考人生，', '思慕之情。'],
            '念': ['念念不忘，', '念兹在兹，', '念你如初，', '念旧情怀，', '念书明理，', '念头通达，', '念珠祈福，', '念你在心间。'],
            '人': ['人生如梦，', '人间烟火，', '人情冷暖，', '人来人往，', '人心叵测，', '人生得意须尽欢，', '人生自古谁无死，', '人是铁饭是钢。'],
            '间': ['间不容发，', '间奏悠扬，', '间隔多年，', '间或相遇，', '间道而行，', '间关莺语花底滑，', '间接伤害，', '间不容息。'],
            '时': ['时光荏苒，', '时光飞逝，', '时不我待，', '时来运转，', '时过境迁，', '时间是最好的良药，', '时代变迁，', '时势造英雄。']
        };

        generateButton.addEventListener('click', function() {
            const keywords = keywordsInput.value.trim();
            if (!keywords || keywords.length < 1 || keywords.length > 8) {
                poemResult.innerHTML = '<p class="error">请输入1-8个汉字</p>';
                poemResult.style.opacity = '1';
                downloadButton.style.display = 'none';
                return;
            }

            // 检查是否全为汉字
            if (!/^[\u4e00-\u9fa5]+$/.test(keywords)) {
                poemResult.innerHTML = '<p class="error">请输入汉字</p>';
                poemResult.style.opacity = '1';
                downloadButton.style.display = 'none';
                return;
            }

            let poem = '';
            // 为每个字生成一句诗
            for (let i = 0; i < keywords.length; i++) {
                const char = keywords[i];
                if (poemDatabase[char]) {
                    // 随机选择一句
                    const randomIndex = Math.floor(Math.random() * poemDatabase[char].length);
                    poem += poemDatabase[char][randomIndex];
                } else {
                    poem += `暂无可用于${char}的诗句<br>`;
                }
            }

            poemResult.innerHTML = `
                <div class="poem-card">
                    <h4>藏头诗</h4>
                    <p>${poem}</p>
                </div>
            `;
            poemResult.style.opacity = '1';
            downloadButton.style.display = 'block';
        });

    downloadButton.addEventListener('click', function() {
        if (!window.html2canvas) {
            alert('html2canvas库尚未加载完成，请稍候重试');
            return;
        }

        const poemCard = document.querySelector('.poem-card');
        html2canvas(poemCard).then(canvas => {
            // 创建下载链接
            const link = document.createElement('a');
            link.download = '爱情藏头诗.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error('生成图片失败:', err);
            alert('生成图片失败，请稍后重试');
        });
    });
}

// 3. 乞巧小游戏功能
function createNeedleThreadGame() {
    // 找到要替换的div
    const targetDiv = document.querySelector('.wish-form');
    if (!targetDiv) {
        console.error('未找到要替换的div');
        return;
    }

    // 替换为游戏界面
    targetDiv.innerHTML = `
        <h3>穿针乞巧</h3>
        <div class="game-area">
            <div class="game-info">
                <div class="game-score">得分: <span id="score">0</span></div>
                <div class="game-time">时间: <span id="time">30</span>秒</div>
            </div>
            <div class="game-container" id="game-container">
                <div class="needle" id="needle"></div>
                <div class="thread" id="thread"></div>
            </div>
            <button class="game-button" id="start-game">开始游戏</button>
        </div>
    `;

    const gameContainer = document.getElementById('game-container');
    const needle = document.getElementById('needle');
    const thread = document.getElementById('thread');
    const startButton = document.getElementById('start-game');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');

    let isGameRunning = false;
    let score = 0;
    let time = 30;
    let gameInterval;

    // 生成针的位置
    function generateNeedle() {
        const containerWidth = gameContainer.offsetWidth;
        const containerHeight = gameContainer.offsetHeight;

        // 确保针不会超出容器
        const needleWidth = needle.offsetWidth || 30;
        const needleHeight = needle.offsetHeight || 60;

        const maxX = containerWidth - needleWidth;
        const maxY = containerHeight - needleHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        needle.style.left = `${randomX}px`;
        needle.style.top = `${randomY}px`;

        // 随机旋转角度
        const randomRotation = Math.floor(Math.random() * 360);
        needle.style.transform = `rotate(${randomRotation}deg)`;
    }

    // 开始游戏
    startButton.addEventListener('click', function() {
        if (isGameRunning) return;

        isGameRunning = true;
        score = 0;
        time = 30;
        scoreElement.textContent = score;
        timeElement.textContent = time;

        // 生成第一个针
        generateNeedle();

        // 设置时间倒计时
        gameInterval = setInterval(() => {
            time--;
            timeElement.textContent = time;

            if (time <= 0) {
                endGame();
            }
        }, 1000);

        // 添加线的拖动功能
        let isDragging = false;

        thread.addEventListener('mousedown', function(e) {
            if (!isGameRunning) return;
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging || !isGameRunning) return;

            const gameAreaRect = gameContainer.getBoundingClientRect();
            const x = e.clientX - gameAreaRect.left;
            const y = e.clientY - gameAreaRect.top;

            // 限制线在游戏区域内
            const threadWidth = thread.offsetWidth || 20;
            const threadHeight = thread.offsetHeight || 50;

            const maxX = gameAreaRect.width - threadWidth;
            const maxY = gameAreaRect.height - threadHeight;

            const newX = Math.max(0, Math.min(x - threadWidth / 2, maxX));
            const newY = Math.max(0, Math.min(y - threadHeight / 2, maxY));

            thread.style.left = `${newX}px`;
            thread.style.top = `${newY}px`;

            // 检查是否穿针成功
            checkCollision();
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    });

    // 检查碰撞（穿针成功）
    function checkCollision() {
        const needleRect = needle.getBoundingClientRect();
        const threadRect = thread.getBoundingClientRect();

        // 简单碰撞检测
        if (
            threadRect.left < needleRect.right &&
            threadRect.right > needleRect.left &&
            threadRect.top < needleRect.bottom &&
            threadRect.bottom > needleRect.top
        ) {
            // 穿针成功
            score++;
            scoreElement.textContent = score;
            generateNeedle();

            // 显示成功提示
            const notification = document.createElement('div');
            notification.className = 'game-notification';
            notification.textContent = '穿针成功！';
            gameContainer.appendChild(notification);

            setTimeout(() => {
                gameContainer.removeChild(notification);
            }, 1000);
        }
    }

    // 结束游戏
    function endGame() {
        isGameRunning = false;
        clearInterval(gameInterval);

        // 显示游戏结束提示
        const gameOver = document.createElement('div');
        gameOver.className = 'game-over';
        gameOver.innerHTML = `
            <h4>游戏结束</h4>
            <p>你的得分: ${score}</p>
            <button id="play-again">再玩一次</button>
        `;
        gameContainer.appendChild(gameOver);

        document.getElementById('play-again').addEventListener('click', function() {
            gameContainer.removeChild(gameOver);
            startButton.click();
        });
    }
}

// 创建情侣日历
function createCoupleCalendar() {
    const calendarContainer = document.getElementById('couple-calendar');
    if (!calendarContainer) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // 日历标题
    const calendarTitle = document.createElement('h3');
    calendarTitle.textContent = `${year}年${month + 1}月`;
    calendarContainer.appendChild(calendarTitle);

    // 星期标题
    const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
    const weekHeader = document.createElement('div');
    weekHeader.className = 'calendar-week-header';
    weekDays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        weekHeader.appendChild(dayHeader);
    });
    calendarContainer.appendChild(weekHeader);

    // 日历网格
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';

    // 获取当月第一天是星期几
    const firstDay = new Date(year, month, 1).getDay();
    // 获取当月天数
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 添加上个月的占位天数
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }

    // 添加当月天数
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = i;

        // 标记今天
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add('today');
        }

        // 标记情人节
        if (i === 14 && month === 1) {
            dayElement.classList.add('anniversary');
            const anniversaryText = document.createElement('div');
            anniversaryText.className = 'anniversary-text';
            anniversaryText.textContent = '情人节';
            dayElement.appendChild(anniversaryText);
        }

        // 标记相识纪念日
        if (i === 23 && month === 1) {
            dayElement.classList.add('anniversary');
            const anniversaryText = document.createElement('div');
            anniversaryText.className = 'anniversary-text';
            anniversaryText.textContent = '相识纪念日';
            dayElement.appendChild(anniversaryText);
        }

        calendarGrid.appendChild(dayElement);
    }

    calendarContainer.appendChild(calendarGrid);
}

// 更新爱情计时器
function updateLoveTimer() {
    const loveCounter = document.getElementById('love-counter');
    if (!loveCounter) return;

    // 设置相识日期：2024年2月23日
    const loveStartDate = new Date(2024, 1, 23);
    const today = new Date();

    // 计算时间差（毫秒）
    const timeDiff = today - loveStartDate;

    // 计算天数
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    loveCounter.textContent = `${days}天`;
}


// 显示当前时间
function displayCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const formattedDateTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    document.getElementById('current-datetime').textContent = formattedDateTime;
}

// 显示下一个七夕节日期和时间
function displayNextQixiDateTime() {
    const now = new Date();
    let nextQixiYear = now.getFullYear();
    let qixiDate = getQixiDate(nextQixiYear);

    // 如果今年的七夕已经过了，计算明年的
    if (now > qixiDate) {
        nextQixiYear++;
        qixiDate = getQixiDate(nextQixiYear);
    }

    // 设置时间为0点0分0秒
    qixiDate.setHours(0, 0, 0, 0);

    const year = qixiDate.getFullYear();
    const month = (qixiDate.getMonth() + 1).toString().padStart(2, '0');
    const day = qixiDate.getDate().toString().padStart(2, '0');
    const hours = qixiDate.getHours().toString().padStart(2, '0');
    const minutes = qixiDate.getMinutes().toString().padStart(2, '0');
    const seconds = qixiDate.getSeconds().toString().padStart(2, '0');
    
    const formattedDateTime = `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
    document.getElementById('next-qixi-datetime').textContent = formattedDateTime;
}

// 初始化新功能
// 确保DOM完全加载后再调用函数
setTimeout(() => {
  createCoupleCalendar();
  updateLoveTimer();
  displayCurrentTime();
  displayNextQixiDateTime();

  // 每秒更新一次计时器和当前时间
  setInterval(() => {
    updateLoveTimer();
    displayCurrentTime();
  }, 1000);
}, 100);
});