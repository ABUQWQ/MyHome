/**
 * 个人主页动画系统
 * 使用GSAP、Anime.js等动画库实现丰富的交互效果
 *
 * @fileoverview 主要功能包括：
 * - 页面加载动画
 * - 每日一言API集成
 * - 粒子系统
 * - 音乐播放控制
 * - 主题切换
 * - 高级动画效果
 *
 * @author LingBu
 * @version 2.0.0
 */

// 全局变量声明，解决IDE错误提示
/* global gsap, ScrollTrigger, TextPlugin, MotionPathPlugin, ScrollToPlugin, anime, AOS, particlesJS, lottie, THREE */

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin, ScrollToPlugin);

/**
 * 动画系统主类
 * 负责管理所有页面动画效果
 * @class AnimationSystem
 */
class AnimationSystem {
    /**
     * 构造函数
     * 初始化动画系统的基本属性和设置
     */
    constructor() {
        /** @type {boolean} 动画系统是否已加载完成 */
        this.isLoaded = false;

        /** @type {Array<HTMLElement>} 粒子元素数组 */
        this.particles = [];

        /** @type {Object} 动画系统设置 */
        this.settings = {
            /** @type {number} 动画速度倍率 */
            animationSpeed: 1,
            /** @type {number} 粒子数量 */
            particleCount: 100,
            /** @type {boolean} 是否启用高级效果 */
            advancedEffects: true,
            /** @type {boolean} 是否启用音效 */
            soundEffects: true
        };

        this.init();
    }

    /**
     * 初始化动画系统
     * 按顺序启动所有动画模块
     */
    init() {
        this.loadSettings();
        this.setupLoadingSequence();
        this.setupParticleSystem();
        this.setupScrollAnimations();
        this.setupInteractiveAnimations();
        this.setupAdvancedEffects();
        this.setupPerformanceOptimizations();
        this.setupTransitions();
        this.setupTypewriterEffect();
        this.setup3DCardFlip();
        this.setupParallaxScrolling();
        this.setupFloatingElements();
        this.setupBackgroundAnimation();
        this.setupMouseGlow();
        this.setupTextAnimations();
        this.setupCardAnimations();
        this.setupButtonAnimations();
        this.setupScrollAnimations2();
        this.setupAdvancedAnimations();
    }

    loadSettings() {
        // 从localStorage加载设置
        const savedSettings = localStorage.getItem('animationSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }

    setupLoadingSequence() {
        // 主时间轴
        const masterTL = gsap.timeline({
            onComplete: () => {
                this.isLoaded = true;
                this.startMainAnimations();
            }
        });

        // 加载动画
        masterTL
            .set('.loading-screen', { display: 'flex' })
            .fromTo('.loading-logo',
                {
                    scale: 0.3,
                    opacity: 0,
                    filter: 'blur(20px)',
                    y: 30
                },
                {
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            )
            .fromTo('.loading-bar',
                {
                    width: '0%',
                    opacity: 0.8
                },
                {
                    width: '100%',
                    opacity: 1,
                    duration: 2.5,
                    ease: "power2.out"
                }, "-=0.3"
            )
            .to('.loading-screen', {
                opacity: 0,
                scale: 1.05,
                filter: 'blur(10px)',
                duration: 0.6,
                ease: "power2.inOut",
                delay: 0.3,
                onComplete: () => {
                    document.querySelector('.loading-screen').style.display = 'none';
                }
            });
    }

    startMainAnimations() {
        // Set initial visibility for hero content
        gsap.set('.hero-content', { opacity: 1 });
        gsap.set('.hero-title', { opacity: 1 });
        gsap.set('.hero-subtitle', { opacity: 1 });
        gsap.set('.hero-buttons', { opacity: 1 });
        
        // Hero entrance with extreme effects
        const heroTL = gsap.timeline();
        
        // Hero标题希区柯克变焦效果 (Dolly Zoom) - 针对.title-text
        heroTL
            .fromTo('.title-text',
                {
                    // 初始状态：极远景，模拟从远处观看
                    scale: 0.05,
                    z: -2000,
                    opacity: 0,
                    filter: 'blur(20px)',
                    transformPerspective: 2000,
                    transformOrigin: 'center center',
                    rotationY: 0
                },
                {
                    // 第一阶段：快速拉近
                    scale: 0.3,
                    z: -500,
                    opacity: 0.4,
                    filter: 'blur(12px)',
                    duration: 1,
                    ease: "power2.in"
                }
            )
            .to('.title-text', {
                // 第二阶段：希区柯克核心效果 - 焦距突变
                scale: 2.5,
                z: 400,
                opacity: 0.8,
                filter: 'blur(4px)',
                rotationY: 2,
                duration: 1.2,
                ease: "power4.out"
            })
            .to('.title-text', {
                // 第三阶段：透视校正
                scale: 1.1,
                z: 20,
                opacity: 0.95,
                filter: 'blur(1px)',
                rotationY: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            })
            .to('.title-text', {
                // 第四阶段：最终聚焦
                scale: 1,
                z: 0,
                opacity: 1,
                filter: 'blur(0px)',
                textShadow: '0 0 40px rgba(0, 122, 255, 0.8), 0 0 80px rgba(0, 122, 255, 0.4)',
                duration: 0.8,
                ease: "power2.out"
            })
            // hero-subtitle动画已移至setupTypewriterEffect中处理
            // 避免与每日一言打字机效果冲突
            .fromTo('.hero-buttons .btn',
                {
                    y: 30,
                    opacity: 0,
                    scale: 0.9
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                }, "-=0.8"
            )
            .fromTo('.scroll-indicator',
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=0.5"
            );

        // Navigation entrance - 简化动画
        gsap.fromTo('.navbar',
            {
                y: -50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.3
            }
        );

        // Controls panel entrance - 简化动画
        gsap.fromTo('.controls-panel',
            {
                x: 50,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.8
            }
        );

        // Floating animation for hero content
        gsap.to('.hero-content', {
            y: -15,
            duration: 4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Title text shimmer effect
        gsap.to('.title-text', {
            backgroundPosition: '200% center',
            duration: 3,
            ease: "none",
            repeat: -1
        });
    }

    setupParticleSystem() {
        const container = document.getElementById('particles-container');
        if (!container) return;

        // 优化的粒子系统 - 减少数量提高性能
        const particleCount = window.innerWidth < 768 ? 30 : 60;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            container.appendChild(particle);

            // 随机初始位置
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            gsap.set(particle, { x, y });

            // 延迟启动粒子动画，避免初始卡顿
            setTimeout(() => {
                gsap.to(particle, {
                    x: `+=${Math.random() * 400 - 200}`,
                    y: `+=${Math.random() * 400 - 200}`,
                    scale: Math.random() * 0.5 + 0.5,
                    opacity: Math.random() * 0.4 + 0.1,
                    rotation: Math.random() * 360,
                    duration: Math.random() * 15 + 15,
                    ease: "none",
                    repeat: -1,
                    yoyo: true
                });
            }, Math.random() * 3000 + 2000); // 2-5秒后启动

            this.particles.push(particle);
        }

        // 优化的鼠标交互 - 降低频率
        let mouseInteractionFrame = 0;
        document.addEventListener('mousemove', (e) => {
            mouseInteractionFrame++;
            if (mouseInteractionFrame % 3 !== 0) return; // 每3帧执行一次

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            this.particles.forEach((particle, index) => {
                if (index % 5 === 0) { // 只影响每5个粒子
                    const rect = particle.getBoundingClientRect();
                    const particleX = rect.left + rect.width / 2;
                    const particleY = rect.top + rect.height / 2;

                    const distance = Math.sqrt(
                        Math.pow(mouseX - particleX, 2) + Math.pow(mouseY - particleY, 2)
                    );

                    if (distance < 80) {
                        gsap.to(particle, {
                            scale: 1.5,
                            opacity: 0.8,
                            duration: 0.2,
                            ease: "power2.out"
                        });
                    } else if (distance > 120) {
                        gsap.to(particle, {
                            scale: 1,
                            opacity: 0.4,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                    }
                }
            });
        });
    }

    setupScrollAnimations() {
        // Advanced section reveals
        gsap.utils.toArray('.section').forEach((section, index) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    onEnter: () => this.triggerSectionEffects(section)
                }
            });

            tl.fromTo(section,
                {
                    y: 100,
                    opacity: 0,
                    scale: 0.95,
                    rotationX: 10
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotationX: 0,
                    duration: 1.5,
                    ease: "power3.out"
                }
            );
        });

        // Cards with advanced animations
        gsap.utils.toArray('.skill-card, .project-card, .hobby-card, .stat-item').forEach((card, index) => {
            gsap.fromTo(card,
                {
                    y: 80,
                    opacity: 0,
                    rotation: 5,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    scale: 1,
                    duration: 1.2,
                    delay: index * 0.1,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 进度条动画 - 使用data属性
        gsap.utils.toArray('.progress-fill').forEach(progress => {
            const targetWidth = progress.dataset.width + '%';

            gsap.fromTo(progress,
                {
                    width: '0%',
                    scaleY: 0.8,
                    opacity: 0.7
                },
                {
                    width: targetWidth,
                    scaleY: 1,
                    opacity: 1,
                    duration: 2.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: progress,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Counter animations with easing
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const endValue = parseInt(stat.dataset.target);
            
            gsap.fromTo(stat,
                { textContent: 0 },
                {
                    textContent: endValue,
                    duration: 3,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    onUpdate: function() {
                        stat.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                }
            );
        });

        // Parallax effects
        gsap.utils.toArray('.hero-background').forEach(bg => {
            gsap.to(bg, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: bg,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }

    setupInteractiveAnimations() {
        // 磁性按钮效果
        this.setupMagneticButtons();

        // 高级按钮交互
        gsap.utils.toArray('.btn, .theme-btn, .control-btn').forEach(btn => {
            const tl = gsap.timeline({ paused: true });

            tl.to(btn, {
                scale: 1.1,
                y: -5,
                rotationY: 5,
                duration: 0.3,
                ease: "back.out(1.7)"
            });

            btn.addEventListener('mouseenter', () => {
                tl.play();
                this.createRippleEffect(btn);
                this.createGlowEffect(btn);
            });

            btn.addEventListener('mouseleave', () => {
                tl.reverse();
            });

            btn.addEventListener('click', () => {
                gsap.to(btn, {
                    scale: 0.95,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
                this.createClickWave(btn);
            });
        });

        // Card hover effects with 3D transforms
        gsap.utils.toArray('.skill-card, .project-card, .hobby-card, .stat-item').forEach(card => {
            const tl = gsap.timeline({ paused: true });
            
            tl.to(card, {
                y: -15,
                scale: 1.05,
                rotationY: 5,
                rotationX: 5,
                duration: 0.4,
                ease: "power2.out"
            });

            card.addEventListener('mouseenter', () => {
                tl.play();
                
                // Glow effect
                gsap.to(card, {
                    boxShadow: "0 25px 50px rgba(0, 122, 255, 0.3)",
                    duration: 0.3
                });
            });

            card.addEventListener('mouseleave', () => {
                tl.reverse();
                
                gsap.to(card, {
                    boxShadow: "0 20px 40px var(--shadow-dark)",
                    duration: 0.3
                });
            });
        });

        // Navigation link animations
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    color: "var(--accent-color)",
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    color: "var(--text-secondary)",
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    }

    setupAdvancedEffects() {
        // 打字机效果
        this.setupTypewriterEffect();

        // 3D卡片翻转效果
        this.setup3DCardFlip();

        // 视差滚动效果
        this.setupParallaxScrolling();

        // 文字分割动画
        gsap.utils.toArray('.section-title').forEach(title => {
            const chars = title.textContent.split('');
            title.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join('');

            gsap.fromTo(title.querySelectorAll('.char'),
                {
                    y: 100,
                    opacity: 0,
                    rotation: 10
                },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Morphing SVG animations
        gsap.utils.toArray('svg').forEach(svg => {
            gsap.fromTo(svg,
                {
                    scale: 0,
                    rotation: 180,
                    opacity: 0
                },
                {
                    scale: 1,
                    rotation: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                        trigger: svg,
                        start: "top 90%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Smooth scroll implementation
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 2,
                        scrollTo: {
                            y: target,
                            offsetY: 70
                        },
                        ease: "power3.inOut"
                    });
                }
            });
        });
    }

    setupPerformanceOptimizations() {
        // 检测设备性能
        const isLowPerformance = window.navigator.hardwareConcurrency < 4 ||
                                 window.innerWidth < 768 ||
                                 /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isLowPerformance) {
            // 减少粒子数量
            this.particles = this.particles.slice(0, 30);

            // 降低动画复杂度
            gsap.globalTimeline.timeScale(0.7);

            // 禁用一些复杂动画
            document.body.classList.add('low-performance');
        }

        // 页面不可见时暂停动画
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                gsap.globalTimeline.pause();
                if (typeof anime !== 'undefined' && anime.running) {
                    anime.running.forEach(animation => animation.pause());
                }
            } else {
                gsap.globalTimeline.resume();
                if (typeof anime !== 'undefined' && anime.running) {
                    anime.running.forEach(animation => animation.play());
                }
            }
        });

        // 使用Intersection Observer优化性能
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        gsap.utils.toArray('.section, .skill-card, .project-card, .hobby-card').forEach(element => {
            observer.observe(element);
        });

        // 统一的FPS监控系统
        this.setupFPSMonitoring();
    }

    setupMagneticButtons() {
        // 磁性按钮效果 - 大厂级别交互
        gsap.utils.toArray('.btn, .skill-card, .project-card, .hobby-card').forEach(element => {
            const magnetic = element;
            const magneticText = magnetic.querySelector('h3') || magnetic;

            magnetic.addEventListener('mousemove', (e) => {
                const rect = magnetic.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(magnetic, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: "power2.out"
                });

                gsap.to(magneticText, {
                    x: x * 0.1,
                    y: y * 0.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            magnetic.addEventListener('mouseleave', () => {
                gsap.to(magnetic, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });

                gsap.to(magneticText, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
            transform: scale(0);
            width: 20px;
            height: 20px;
            left: 50%;
            top: 50%;
            margin-left: -10px;
            margin-top: -10px;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        gsap.to(ripple, {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        });
    }

    createGlowEffect(element) {
        // 发光效果
        gsap.to(element, {
            boxShadow: "0 0 30px rgba(0, 122, 255, 0.6), 0 0 60px rgba(0, 122, 255, 0.3)",
            duration: 0.3,
            ease: "power2.out"
        });

        setTimeout(() => {
            gsap.to(element, {
                boxShadow: "0 8px 32px var(--shadow-dark)",
                duration: 0.5,
                ease: "power2.out"
            });
        }, 300);
    }

    createClickWave(element) {
        // 点击波纹效果
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0, 122, 255, 0.3) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 1000;
        `;

        element.style.position = 'relative';
        element.appendChild(wave);

        gsap.to(wave, {
            width: 200,
            height: 200,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => wave.remove()
        });
    }

    triggerSectionEffects(section) {
        // Add custom effects when sections come into view
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'skills':
                this.animateSkillIcons();
                break;
            case 'projects':
                this.animateProjectCards();
                break;
            case 'hobbies':
                this.animateHobbyIcons();
                break;
        }
    }

    animateSkillIcons() {
        gsap.utils.toArray('.skill-icon').forEach((icon, index) => {
            gsap.to(icon, {
                rotation: 360,
                duration: 1,
                delay: index * 0.2,
                ease: "power2.inOut"
            });
        });
    }

    animateProjectCards() {
        gsap.utils.toArray('.project-card').forEach((card, index) => {
            gsap.to(card, {
                rotationY: 5,
                duration: 0.5,
                delay: index * 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        });
    }

    animateHobbyIcons() {
        gsap.utils.toArray('.hobby-icon').forEach((icon, index) => {
            anime({
                targets: icon,
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
                duration: 1000,
                delay: index * 200,
                easing: 'easeInOutElastic(1, .6)'
            });
        });
    }

    setupTransitions() {
        // 太空穿梭转场效果
        this.createSpaceWarpEffect();

        // 导航链接点击事件
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);

                if (target) {
                    this.spaceWarpTransition(target);
                }
            });
        });
    }

    createSpaceWarpEffect() {
        // 创建太空穿梭效果容器
        const warpContainer = document.createElement('div');
        warpContainer.id = 'space-warp-container';
        warpContainer.innerHTML = `
            <div class="warp-overlay"></div>
            <div class="warp-lines"></div>
            <div class="warp-particles"></div>
            <div class="warp-tunnel"></div>
        `;
        document.body.appendChild(warpContainer);

        // 创建穿梭线条
        const linesContainer = warpContainer.querySelector('.warp-lines');
        for (let i = 0; i < 50; i++) {
            const line = document.createElement('div');
            line.className = 'warp-line';
            line.style.cssText = `
                position: absolute;
                width: 2px;
                height: 100px;
                background: linear-gradient(to bottom, transparent, #00D4FF, transparent);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
            `;
            linesContainer.appendChild(line);
        }

        // 创建穿梭粒子
        const particlesContainer = warpContainer.querySelector('.warp-particles');
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'warp-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #007AFF;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: 0;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    spaceWarpTransition(target) {
        const warpContainer = document.getElementById('space-warp-container');
        const warpOverlay = warpContainer.querySelector('.warp-overlay');
        const warpLines = warpContainer.querySelectorAll('.warp-line');
        const warpParticles = warpContainer.querySelectorAll('.warp-particle');
        const warpTunnel = warpContainer.querySelector('.warp-tunnel');

        // 显示穿梭效果
        gsap.set(warpContainer, { display: 'block', zIndex: 9999 });

        const warpTL = gsap.timeline({
            onComplete: () => {
                // 滚动到目标位置
                gsap.to(window, {
                    duration: 0.1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: "none",
                    onComplete: () => {
                        // 退出穿梭效果
                        this.exitSpaceWarp(warpContainer);
                    }
                });
            }
        });

        // 进入穿梭
        warpTL
            .set(warpOverlay, { opacity: 0, background: 'radial-gradient(circle, transparent 0%, #000 70%)' })
            .to(warpOverlay, { opacity: 1, duration: 0.3 })
            .to(warpLines, {
                opacity: 1,
                scaleY: 3,
                y: -200,
                duration: 0.8,
                stagger: 0.02,
                ease: "power2.out"
            }, "-=0.2")
            .to(warpParticles, {
                opacity: 1,
                scale: 2,
                y: -300,
                duration: 0.6,
                stagger: 0.03,
                ease: "power3.out"
            }, "-=0.6")
            .to(warpTunnel, {
                opacity: 0.8,
                scale: 1.5,
                rotation: 180,
                duration: 0.5,
                ease: "power2.inOut"
            }, "-=0.4");
    }

    exitSpaceWarp(warpContainer) {
        const warpOverlay = warpContainer.querySelector('.warp-overlay');
        const warpLines = warpContainer.querySelectorAll('.warp-line');
        const warpParticles = warpContainer.querySelectorAll('.warp-particle');

        const exitTL = gsap.timeline({
            onComplete: () => {
                gsap.set(warpContainer, { display: 'none' });
                // 重置所有元素
                gsap.set([warpLines, warpParticles], { opacity: 0, y: 0, scale: 1 });
            }
        });

        exitTL
            .to(warpLines, {
                opacity: 0,
                y: 200,
                duration: 0.4,
                stagger: 0.01,
                ease: "power2.in"
            })
            .to(warpParticles, {
                opacity: 0,
                scale: 0.5,
                y: 150,
                duration: 0.3,
                stagger: 0.02,
                ease: "power2.in"
            }, "-=0.3")
            .to(warpOverlay, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.2");
    }

    // 保存设置到localStorage
    saveSettings() {
        localStorage.setItem('animationSettings', JSON.stringify(this.settings));
    }

    // 更新动画速度
    updateAnimationSpeed(speed) {
        this.settings.animationSpeed = speed;
        gsap.globalTimeline.timeScale(speed);
        this.saveSettings();
    }

    // 更新粒子数量
    updateParticleCount(count) {
        this.settings.particleCount = count;
        // 重新初始化粒子系统
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
        this.setupParticleSystem();
        this.saveSettings();
    }

    // 切换高级效果
    toggleAdvancedEffects(enabled) {
        this.settings.advancedEffects = enabled;
        if (enabled) {
            document.body.classList.add('advanced-effects');
        } else {
            document.body.classList.remove('advanced-effects');
        }
        this.saveSettings();
    }

    // 切换音效
    toggleSoundEffects(enabled) {
        this.settings.soundEffects = enabled;
        this.saveSettings();
    }

    // 每日一言打字机效果
    setupTypewriterEffect() {
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (!heroSubtitle) {
            console.warn('未找到hero-subtitle元素');
            return;
        }

        // 确保元素没有被其他动画控制
        gsap.killTweensOf(heroSubtitle);

        // 重置元素状态
        heroSubtitle.style.transform = '';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.y = '0';

        // 显示加载状态
        heroSubtitle.innerHTML = ''; // 清空所有内容
        heroSubtitle.textContent = '获取每日一言中';
        heroSubtitle.classList.add('loading');
        heroSubtitle.style.borderRight = '2px solid var(--accent-color)';

        // 添加加载动画
        let loadingDots = 0;
        const loadingInterval = setInterval(() => {
            loadingDots = (loadingDots + 1) % 4;
            heroSubtitle.textContent = '获取每日一言中' + '.'.repeat(loadingDots);
        }, 500);

        // 延迟3秒开始获取，让其他动画先完成
        setTimeout(() => {
            this.fetchDailyQuote()
                .then(quote => {
                    clearInterval(loadingInterval);
                    heroSubtitle.classList.remove('loading');
                    this.startTypewriterAnimation(heroSubtitle, quote);
                })
                .catch(error => {
                    clearInterval(loadingInterval);
                    heroSubtitle.classList.remove('loading');
                    console.warn('获取每日一言失败:', error);

                    // 显示错误提示然后使用默认文字
                    heroSubtitle.textContent = '获取失败，使用默认内容...';
                    setTimeout(() => {
                        const defaultText = '你所热爱的，就是你的生活——陈睿';
                        this.startTypewriterAnimation(heroSubtitle, defaultText);
                    }, 1000);
                });
        }, 3000);
    }

    /**
     * 获取每日一言API
     * @returns {Promise<string>} 返回每日一言文本
     * @throws {Error} 当API请求失败时抛出错误
     */
    async fetchDailyQuote() {
        // 多个API配置，提高成功率
        const apiConfigs = [
            { url: 'https://v1.hitokoto.cn/?c=d&encode=text', name: '文学' },
            { url: 'https://v1.hitokoto.cn/?c=i&encode=text', name: '诗词' },
            { url: 'https://v1.hitokoto.cn/?c=k&encode=text', name: '哲学' },
            { url: 'https://v1.hitokoto.cn/?c=f&encode=text', name: '网络' },
            { url: 'https://v1.hitokoto.cn/?c=e&encode=text', name: '原创' }
        ];

        // 随机选择一个分类
        const randomConfig = apiConfigs[Math.floor(Math.random() * apiConfigs.length)];
        console.log(`正在获取${randomConfig.name}类型的每日一言...`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            console.warn('请求超时');
        }, 5000); // 5秒超时

        try {
            const response = await fetch(randomConfig.url, {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Accept': 'text/plain, */*',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    'Referer': 'https://hitokoto.cn/',
                    'Origin': 'https://hitokoto.cn'
                },
                mode: 'cors',
                cache: 'no-cache'
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const quote = await response.text();

            // 验证返回的内容
            if (!quote || quote.trim().length === 0) {
                throw new Error('API返回内容为空');
            }

            // 清理和格式化文本
            let cleanQuote = quote.trim()
                .replace(/[\r\n\t]/g, ' ')  // 移除换行和制表符
                .replace(/\s+/g, ' ')       // 合并多个空格
                .replace(/[""]/g, '"')      // 统一引号
                .replace(/['']/g, "'");     // 统一单引号

            // 限制长度，确保显示效果
            const maxLength = 60;
            if (cleanQuote.length > maxLength) {
                // 尝试在句号、感叹号、问号处截断
                const cutPoints = ['.', '!', '?', '。', '！', '？'];
                let cutIndex = -1;

                for (let i = maxLength - 10; i < maxLength; i++) {
                    if (cutPoints.includes(cleanQuote[i])) {
                        cutIndex = i + 1;
                        break;
                    }
                }

                if (cutIndex > 0) {
                    cleanQuote = cleanQuote.substring(0, cutIndex);
                } else {
                    cleanQuote = cleanQuote.substring(0, maxLength - 3) + '...';
                }
            }

            console.log(`成功获取每日一言: ${cleanQuote}`);
            return cleanQuote;

        } catch (error) {
            clearTimeout(timeoutId);
            console.error('获取每日一言失败:', error instanceof Error ? error.message : String(error));
            throw new Error(error instanceof Error ? error.message : '获取每日一言失败');
        }
    }

    // 启动打字机动画
    startTypewriterAnimation(element, text) {
        // 确保元素状态正确
        gsap.killTweensOf(element);

        // 完全清空内容，包括innerHTML
        element.innerHTML = '';
        element.textContent = '';
        element.classList.add('typing');
        element.style.borderRight = 'none';

        let currentIndex = 0;
        const chars = text.split('');

        console.log(`开始打字机动画: "${text}" (${chars.length}个字符)`);

        // 创建更自然的打字机效果
        const typeNextChar = () => {
            if (currentIndex < chars.length) {
                const char = chars[currentIndex];

                // 直接设置textContent而不是累加，避免重复
                element.textContent = text.substring(0, currentIndex + 1);
                currentIndex++;

                // 根据字符类型调整打字速度
                let delay;
                if (char === ' ') {
                    delay = 50; // 空格快一些
                } else if (/[，。！？、；：]/.test(char)) {
                    delay = 200; // 标点符号慢一些，营造停顿感
                } else if (/[a-zA-Z]/.test(char)) {
                    delay = Math.random() * 30 + 70; // 英文字母
                } else {
                    delay = Math.random() * 40 + 90; // 中文字符
                }

                setTimeout(typeNextChar, delay);

                // 打字时的光标闪烁效果
                if (Math.random() > 0.8) {
                    element.style.borderRight = '2px solid var(--accent-color)';
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 80);
                }
            } else {
                // 打字完成
                console.log('打字机动画完成');
                element.classList.remove('typing');
                this.startCursorBlink(element);

                // 显示完成通知
                this.showNotification('每日一言加载完成', 'success');
            }
        };

        // 立即开始打字
        console.log('开始打字...');
        typeNextChar();
    }

    // 持续的光标闪烁效果
    startCursorBlink(element) {
        let isVisible = true;
        let blinkCount = 0;

        const blink = () => {
            element.style.borderRight = isVisible
                ? '2px solid var(--accent-color)'
                : 'none';
            isVisible = !isVisible;
            blinkCount++;

            // 30秒后停止闪烁，避免长时间占用资源
            if (blinkCount > 120) { // 30秒 * 4次/秒 = 120次
                element.style.borderRight = 'none';
                return;
            }
        };

        // 每500毫秒闪烁一次，营造真实的光标效果
        const blinkInterval = setInterval(blink, 500);

        // 30秒后清除定时器
        setTimeout(() => {
            clearInterval(blinkInterval);
            element.style.borderRight = 'none';
        }, 30000);
    }

    // 3D卡片翻转效果
    setup3DCardFlip() {
        gsap.utils.toArray('.project-card').forEach(card => {
            card.addEventListener('click', () => {
                gsap.to(card, {
                    rotationY: 180,
                    duration: 0.8,
                    ease: "power2.inOut",
                    transformOrigin: "center center",
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(card, {
                                rotationY: 0,
                                duration: 0.8,
                                ease: "power2.inOut"
                            });
                        }, 2000);
                    }
                });
            });
        });
    }

    // 视差滚动效果
    setupParallaxScrolling() {
        gsap.utils.toArray('.skill-icon, .hobby-icon').forEach(icon => {
            gsap.to(icon, {
                y: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: icon,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        gsap.utils.toArray('.section').forEach((section, index) => {
            if (index % 2 === 0) {
                gsap.to(section, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 2
                    }
                });
            }
        });
    }

    // 浮动动画
    setupFloatingElements() {
        gsap.utils.toArray('.skill-card, .project-card, .hobby-card').forEach((card, index) => {
            gsap.to(card, {
                y: Math.sin(index) * 10,
                rotation: Math.cos(index) * 2,
                duration: 3 + index * 0.5,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });
        });
    }

    // 背景动画效果 - 优化版本
    setupBackgroundAnimation() {
        const floatingShapes = document.querySelector('.floating-shapes');
        const gradientOrbs = document.querySelector('.gradient-orbs');

        // 根据设备性能调整数量
        const isMobile = window.innerWidth < 768;
        const shapeCount = isMobile ? 5 : 10;
        const orbCount = isMobile ? 3 : 5;

        // 创建浮动形状
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.cssText = `
                width: ${Math.random() * 80 + 40}px;
                height: ${Math.random() * 80 + 40}px;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 15}s;
                animation-duration: ${Math.random() * 8 + 12}s;
            `;
            floatingShapes.appendChild(shape);
        }

        // 创建渐变光球
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'gradient-orb';
            orb.style.cssText = `
                width: ${Math.random() * 200 + 150}px;
                height: ${Math.random() * 200 + 150}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
                animation-duration: ${Math.random() * 8 + 15}s;
            `;
            gradientOrbs.appendChild(orb);
        }
    }

    // 鼠标光效
    setupMouseGlow() {
        const mouseGlow = document.createElement('div');
        mouseGlow.className = 'mouse-glow';
        document.body.appendChild(mouseGlow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateGlow() {
            glowX += (mouseX - glowX) * 0.05;
            glowY += (mouseY - glowY) * 0.05;

            gsap.set(mouseGlow, {
                x: glowX,
                y: glowY
            });

            requestAnimationFrame(updateGlow);
        }
        updateGlow();

        // 在交互元素上增强光效
        gsap.utils.toArray('.btn, .skill-card, .project-card, .hobby-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(mouseGlow, {
                    scale: 1.5,
                    opacity: 0.8,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            el.addEventListener('mouseleave', () => {
                gsap.to(mouseGlow, {
                    scale: 1,
                    opacity: 0.5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // 文字动画效果 - 优化版本
    setupTextAnimations() {
        // 标题文字波浪效果 - 降低频率
        gsap.utils.toArray('.section-title').forEach(title => {
            const chars = title.querySelectorAll('.char');
            if (chars.length > 0) {
                gsap.to(chars, {
                    y: -8,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: -1,
                    repeatDelay: 5
                });
            }
        });

        // 副标题呼吸效果 - 已移至每日一言功能中处理
        // 不再对hero-subtitle应用额外动画，避免与打字机效果冲突

        // 导航链接悬停动画
        gsap.utils.toArray('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                gsap.to(link, {
                    scale: 1.1,
                    color: "var(--accent-color)",
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });

            link.addEventListener('mouseleave', () => {
                gsap.to(link, {
                    scale: 1,
                    color: "var(--text-secondary)",
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // 卡片动画效果
    setupCardAnimations() {
        // 卡片入场动画
        gsap.utils.toArray('.skill-card, .project-card, .hobby-card').forEach((card, index) => {
            // 随机旋转动画
            gsap.to(card, {
                rotation: Math.random() * 4 - 2,
                duration: 4 + Math.random() * 2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1
            });

            // 悬停时的3D效果
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    rotationX: 10,
                    rotationY: 10,
                    z: 50,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    rotationX: 0,
                    rotationY: 0,
                    z: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });

        // 技能图标旋转动画
        gsap.utils.toArray('.skill-icon').forEach(icon => {
            gsap.to(icon, {
                rotation: 360,
                duration: 10,
                ease: "none",
                repeat: -1
            });
        });
    }

    // 按钮动画效果
    setupButtonAnimations() {
        // 主按钮脉冲效果
        gsap.utils.toArray('.btn-primary').forEach(btn => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 1.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        });

        // 控制按钮悬停效果
        gsap.utils.toArray('.control-btn, .theme-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.2,
                    rotation: 10,
                    duration: 0.3,
                    ease: "back.out(1.7)"
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    // 增强滚动动画
    setupScrollAnimations2() {
        // 滚动时的视差效果
        gsap.utils.toArray('.section').forEach((section, index) => {
            gsap.to(section, {
                y: index % 2 === 0 ? -50 : 50,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // 滚动时的元素淡入效果
        gsap.utils.toArray('.about-text p, .skill-card p, .project-content p').forEach(p => {
            gsap.fromTo(p,
                {
                    opacity: 0,
                    y: 30
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: p,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // 数字计数动画增强
        gsap.utils.toArray('.stat-number').forEach(stat => {
            const endValue = parseInt(stat.dataset.target);

            gsap.fromTo(stat,
                {
                    textContent: 0,
                    scale: 0.5
                },
                {
                    textContent: endValue,
                    scale: 1,
                    duration: 2,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: stat,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    onUpdate: function() {
                        stat.textContent = Math.ceil(this.targets()[0].textContent);
                    }
                }
            );
        });
    }

    // 统一的FPS监控系统
    setupFPSMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        const fpsCounter = document.getElementById('fps-counter');
        const performanceMode = document.getElementById('performance-mode');

        // 开发模式显示性能监控
        if (window.location.search.includes('debug')) {
            document.getElementById('performance-monitor').style.display = 'block';
        }

        const monitorFPS = () => {
            frameCount++;
            const currentTime = performance.now();

            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;

                // 更新显示
                if (fpsCounter) fpsCounter.textContent = Math.round(fps);

                // 根据FPS自动调整性能
                if (fps < 25) {
                    gsap.globalTimeline.timeScale(0.4);
                    document.body.classList.add('low-performance');
                    if (performanceMode) performanceMode.textContent = '低性能';
                } else if (fps < 40) {
                    gsap.globalTimeline.timeScale(0.7);
                    document.body.classList.add('low-performance');
                    if (performanceMode) performanceMode.textContent = '中等';
                } else if (fps >= 50) {
                    gsap.globalTimeline.timeScale(1);
                    document.body.classList.remove('low-performance');
                    if (performanceMode) performanceMode.textContent = '正常';
                }
            }

            requestAnimationFrame(monitorFPS);
        };

        monitorFPS();
    }



    // 5个新的高级动画效果
    setupAdvancedAnimations() {
        // 检查是否启用高级效果
        if (document.body.classList.contains('low-performance')) {
            return; // 低性能模式下跳过高级动画
        }

        this.setupLiquidMorphing();
        this.setupHolographicEffect();
        this.setupQuantumParticles();
        this.setupNeuralNetwork();
        this.setupGalaxySpiral();
    }

    // 1. 液体变形动画
    setupLiquidMorphing() {
        gsap.utils.toArray('.skill-card, .project-card').forEach((card, index) => {
            const liquidOverlay = document.createElement('div');
            liquidOverlay.className = 'liquid-overlay';
            liquidOverlay.innerHTML = `
                <svg viewBox="0 0 200 200" class="liquid-svg">
                    <defs>
                        <filter id="goo-${index}">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
                        </filter>
                    </defs>
                    <g filter="url(#goo-${index})">
                        <circle class="liquid-blob" cx="100" cy="100" r="30" fill="rgba(0,122,255,0.3)"/>
                        <circle class="liquid-blob" cx="120" cy="80" r="25" fill="rgba(0,212,255,0.3)"/>
                        <circle class="liquid-blob" cx="80" cy="120" r="20" fill="rgba(100,168,255,0.3)"/>
                    </g>
                </svg>
            `;
            card.appendChild(liquidOverlay);

            // 液体变形动画
            gsap.to(liquidOverlay.querySelectorAll('.liquid-blob'), {
                x: () => Math.random() * 40 - 20,
                y: () => Math.random() * 40 - 20,
                scale: () => Math.random() * 0.5 + 0.75,
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                stagger: 0.5
            });

            card.addEventListener('mouseenter', () => {
                gsap.to(liquidOverlay, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(liquidOverlay, {
                    opacity: 0.3,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    // 2. 全息投影效果
    setupHolographicEffect() {
        const holoContainer = document.createElement('div');
        holoContainer.className = 'holographic-container';
        document.body.appendChild(holoContainer);

        // 创建全息网格 - 修复宽度问题
        for (let i = 0; i < 20; i++) {
            const line = document.createElement('div');
            line.className = 'holo-line';
            line.style.cssText = `
                position: absolute;
                width: 100%;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(0,255,255,0.5), transparent);
                top: ${i * 5}%;
                left: 0;
                opacity: 0;
                pointer-events: none;
                box-sizing: border-box;
            `;
            holoContainer.appendChild(line);

            gsap.to(line, {
                opacity: 0.8,
                duration: 2,
                delay: i * 0.1,
                ease: "power2.out",
                repeat: -1,
                yoyo: true
            });
        }

        // 全息扫描效果 - 修复宽度问题
        const scanner = document.createElement('div');
        scanner.className = 'holo-scanner';
        scanner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 3px;
            background: linear-gradient(90deg, transparent, rgba(0,255,255,0.8), transparent);
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            box-sizing: border-box;
        `;
        document.body.appendChild(scanner);

        gsap.to(scanner, {
            y: window.innerHeight,
            opacity: 1,
            duration: 3,
            ease: "none",
            repeat: -1,
            repeatDelay: 2
        });
    }

    // 3. 量子粒子效果
    setupQuantumParticles() {
        const quantumContainer = document.createElement('div');
        quantumContainer.className = 'quantum-container';
        document.body.appendChild(quantumContainer);

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.8);
                border-radius: 50%;
                pointer-events: none;
                z-index: 999;
                box-shadow: 0 0 10px rgba(0,122,255,0.8);
            `;
            quantumContainer.appendChild(particle);

            // 量子纠缠动画
            gsap.set(particle, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            });

            gsap.to(particle, {
                x: () => Math.random() * window.innerWidth,
                y: () => Math.random() * window.innerHeight,
                scale: () => Math.random() * 2 + 0.5,
                opacity: () => Math.random() * 0.8 + 0.2,
                duration: () => Math.random() * 3 + 2,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.2
            });
        }
    }

    // 4. 神经网络动画
    setupNeuralNetwork() {
        const networkContainer = document.createElement('div');
        networkContainer.className = 'neural-network';
        document.body.appendChild(networkContainer);

        const nodes = [];
        const connections = [];

        // 创建神经节点
        for (let i = 0; i < 12; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: rgba(0,122,255,0.8);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 15px rgba(0,122,255,0.6);
            `;
            networkContainer.appendChild(node);
            nodes.push(node);

            // 节点脉冲动画
            gsap.to(node, {
                scale: 1.5,
                opacity: 0.5,
                duration: 1,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.3
            });
        }

        // 创建连接线
        for (let i = 0; i < nodes.length - 1; i++) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            connection.style.cssText = `
                position: absolute;
                width: 100px;
                height: 1px;
                background: linear-gradient(90deg, rgba(0,122,255,0.3), rgba(0,212,255,0.6));
                transform-origin: left center;
                opacity: 0;
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                pointer-events: none;
            `;
            networkContainer.appendChild(connection);
            connections.push(connection);

            // 连接线动画
            gsap.to(connection, {
                opacity: 0.8,
                scaleX: 1.2,
                duration: 2,
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.5
            });
        }
    }

    // 5. 银河螺旋动画
    setupGalaxySpiral() {
        const galaxyContainer = document.createElement('div');
        galaxyContainer.className = 'galaxy-container';
        document.body.appendChild(galaxyContainer);

        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'galaxy-star';
            star.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255,255,255,0.8);
                border-radius: 50%;
                left: 50%;
                top: 50%;
                box-shadow: 0 0 8px rgba(255,255,255,0.6);
            `;
            galaxyContainer.appendChild(star);

            const angle = (i / 30) * Math.PI * 2;
            const radius = 100 + i * 5;

            // 螺旋运动
            gsap.to(star, {
                rotation: 360,
                transformOrigin: `${-radius * Math.cos(angle)}px ${-radius * Math.sin(angle)}px`,
                duration: 20 + i * 2,
                ease: "none",
                repeat: -1
            });

            // 闪烁效果
            gsap.to(star, {
                opacity: 0.3,
                scale: 0.5,
                duration: 1 + Math.random(),
                ease: "power2.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.1
            });
        }
    }
}

// 设置面板管理器
class SettingsManager {
    constructor(animationSystem) {
        this.animationSystem = animationSystem;
        this.panel = document.getElementById('settings-panel');
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateUI();
    }

    bindEvents() {
        // 设置面板相关元素不存在，暂时注释
        // const settingsBtn = document.getElementById('settings-btn');
        // const closeSettings = document.getElementById('close-settings');

        // if (settingsBtn) {
        //     settingsBtn.addEventListener('click', () => {
        //         this.show();
        //     });
        // }

        // if (closeSettings) {
        //     closeSettings.addEventListener('click', () => {
        //         this.hide();
        //     });
        // }

        // 点击面板外部关闭
        if (this.panel) {
            this.panel.addEventListener('click', (e) => {
                if (e.target === this.panel) {
                    this.hide();
                }
            });
        }

        // 动画速度滑块
        const speedSlider = document.getElementById('animation-speed');
        speedSlider.addEventListener('input', (e) => {
            const value = parseFloat(e.target.value);
            this.animationSystem.updateAnimationSpeed(value);
            this.updateSpeedDisplay(value);
        });

        // 粒子数量滑块
        const particleSlider = document.getElementById('particle-count');
        particleSlider.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.animationSystem.updateParticleCount(value);
            this.updateParticleDisplay(value);
        });

        // 高级效果开关
        const advancedEffectsToggle = document.getElementById('advanced-effects');
        advancedEffectsToggle.addEventListener('change', (e) => {
            this.animationSystem.toggleAdvancedEffects(e.target.checked);
        });

        // 音效开关
        const soundEffectsToggle = document.getElementById('sound-effects');
        soundEffectsToggle.addEventListener('change', (e) => {
            this.animationSystem.toggleSoundEffects(e.target.checked);
        });
    }

    show() {
        this.panel.classList.add('show');
        gsap.fromTo(this.panel,
            {
                scale: 0.8,
                opacity: 0,
                rotationY: -15
            },
            {
                scale: 1,
                opacity: 1,
                rotationY: 0,
                duration: 0.4,
                ease: "back.out(1.7)"
            }
        );
    }

    hide() {
        gsap.to(this.panel, {
            scale: 0.8,
            opacity: 0,
            rotationY: 15,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                this.panel.classList.remove('show');
            }
        });
    }

    updateUI() {
        const settings = this.animationSystem.settings;

        document.getElementById('animation-speed').value = settings.animationSpeed;
        document.getElementById('particle-count').value = settings.particleCount;
        document.getElementById('advanced-effects').checked = settings.advancedEffects;
        document.getElementById('sound-effects').checked = settings.soundEffects;

        this.updateSpeedDisplay(settings.animationSpeed);
        this.updateParticleDisplay(settings.particleCount);
    }

    updateSpeedDisplay(value) {
        document.querySelector('#animation-speed').nextElementSibling.textContent = `${value}x`;
    }

    updateParticleDisplay(value) {
        document.querySelector('#particle-count').nextElementSibling.textContent = value;
    }
}

// 全屏管理器
class FullscreenManager {
    constructor() {
        this.isFullscreen = false;
        this.init();
    }

    init() {
        document.getElementById('fullscreen-btn').addEventListener('click', () => {
            this.toggle();
        });

        // 监听全屏状态变化
        document.addEventListener('fullscreenchange', () => {
            this.isFullscreen = !!document.fullscreenElement;
            this.updateButton();
        });
    }

    toggle() {
        if (this.isFullscreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }

    updateButton() {
        const btn = document.getElementById('fullscreen-btn');
        btn.classList.toggle('active', this.isFullscreen);
        btn.title = this.isFullscreen ? '退出全屏' : '进入全屏';
    }
}

// Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        gsap.utils.toArray('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = e.target.closest('.theme-btn').dataset.theme;
                this.setTheme(theme);
            });
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.applyTheme(theme);
        localStorage.setItem('theme', theme);
        
        // Animate theme change
        gsap.to('body', {
            duration: 0.5,
            ease: "power2.inOut"
        });
        
        // Update active button
        gsap.utils.toArray('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Music Management System
class MusicManager {
    constructor() {
        this.audio = document.getElementById('background-music');
        this.musicBtn = document.getElementById('music-btn');
        this.isPlaying = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAudioVisualization();

        // 设置音频属性
        this.audio.volume = 0.4;
        this.audio.muted = false;
        this.audio.preload = 'auto';

        // 尝试自动播放
        this.attemptAutoplay();

        // 优化的用户交互监听
        this.setupInteractionListeners();
    }

    setupInteractionListeners() {
        let interactionHandled = false;

        const handleInteraction = () => {
            if (!interactionHandled && !this.isPlaying) {
                interactionHandled = true;
                this.play().catch(() => {
                    console.log('音乐播放需要用户手动启动');
                });

                // 移除所有监听器
                document.removeEventListener('click', handleInteraction);
                document.removeEventListener('keydown', handleInteraction);
                document.removeEventListener('touchstart', handleInteraction);
                document.removeEventListener('scroll', handleInteraction);
            }
        };

        document.addEventListener('click', handleInteraction, { once: true });
        document.addEventListener('keydown', handleInteraction, { once: true });
        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('scroll', handleInteraction, { once: true });
    }

    attemptAutoplay() {
        // 延迟尝试自动播放
        setTimeout(() => {
            this.play().catch(() => {
                console.log('自动播放被阻止，等待用户交互');
                this.showNotification('点击任意位置开始播放音乐', 'info');
            });
        }, 3000);
    }

    bindEvents() {
        this.musicBtn.addEventListener('click', () => {
            this.toggle();
        });

        this.audio.addEventListener('loadstart', () => {
            this.showNotification('音乐加载中...', 'info');
        });

        this.audio.addEventListener('canplay', () => {
            this.showNotification('音乐已准备就绪', 'success');
        });

        this.audio.addEventListener('error', () => {
            this.showNotification('音乐加载失败', 'error');
        });
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        return new Promise((resolve, reject) => {
            // 确保音频已加载
            if (this.audio.readyState >= 2) {
                this.audio.play().then(() => {
                    this.isPlaying = true;
                    this.updateButton();
                    this.animateButton();
                    this.showNotification('音乐播放中', 'success');
                    resolve();
                }).catch((error) => {
                    console.log('播放失败:', error);
                    this.showNotification('音乐播放失败，请手动点击播放', 'error');
                    reject(error);
                });
            } else {
                // 等待音频加载
                this.audio.addEventListener('canplay', () => {
                    this.play().then(resolve).catch(reject);
                }, { once: true });

                this.audio.load(); // 重新加载音频
            }
        });
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.updateButton();
    }

    updateButton() {
        this.musicBtn.classList.toggle('active', this.isPlaying);
        this.musicBtn.title = this.isPlaying ? '暂停音乐' : '播放音乐';
    }

    animateButton() {
        if (this.isPlaying) {
            gsap.to(this.musicBtn, {
                rotation: 360,
                duration: 4,
                ease: "none",
                repeat: -1
            });
        } else {
            gsap.killTweensOf(this.musicBtn);
            gsap.set(this.musicBtn, { rotation: 0 });
        }
    }

    setupAudioVisualization() {
        // Create multiple visualizer rings
        for (let i = 0; i < 3; i++) {
            const visualizer = document.createElement('div');
            visualizer.className = 'music-visualizer';
            visualizer.style.cssText = `
                position: absolute;
                top: ${-5 - i * 3}px;
                left: ${-5 - i * 3}px;
                right: ${-5 - i * 3}px;
                bottom: ${-5 - i * 3}px;
                border: 2px solid var(--accent-color);
                border-radius: 50%;
                opacity: 0;
                pointer-events: none;
                animation-delay: ${i * 0.3}s;
            `;
            this.musicBtn.appendChild(visualizer);
        }

        // Enhanced music visualization
        const visualizers = this.musicBtn.querySelectorAll('.music-visualizer');

        setInterval(() => {
            if (this.isPlaying) {
                visualizers.forEach((viz, index) => {
                    gsap.fromTo(viz,
                        {
                            scale: 1,
                            opacity: 0.3,
                            rotation: 0
                        },
                        {
                            scale: 1.5 + index * 0.2,
                            opacity: 0,
                            rotation: 180,
                            duration: 1.5 + index * 0.2,
                            ease: "power2.out"
                        }
                    );
                });
            }
        }, 800);
    }

    showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        gsap.fromTo(notification,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
        
        setTimeout(() => {
            gsap.to(notification, {
                y: -100,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => notification.classList.remove('show')
            });
        }, 3000);
    }
}

// 当DOM加载完成时初始化所有系统
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有系统
    const animationSystem = new AnimationSystem();
    const themeManager = new ThemeManager();
    const musicManager = new MusicManager();

    // 初始化自定义光标
    setupCustomCursor();

    // 初始化滚动进度条
    setupScrollProgress();

    // 初始化更多动画效果
    setupAdvancedInteractions();
    setupParticleInteractions();
    setupSoundEffects();

    // 调试模式：检查溢出元素
    if (window.location.search.includes('debug')) {
        setTimeout(checkForOverflow, 2000);
    }
    
    // Mobile navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate menu items
            if (navMenu.classList.contains('active')) {
                gsap.fromTo('.nav-link',
                    { x: -50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
                );
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Cursor trail effect
    let mouseX = 0, mouseY = 0;
    let trailElements = [];
    
    for (let i = 0; i < 10; i++) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0;
        `;
        document.body.appendChild(trail);
        trailElements.push(trail);
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trailElements.forEach((trail, index) => {
            gsap.to(trail, {
                x: mouseX - 5,
                y: mouseY - 5,
                duration: 0.3 + index * 0.05,
                opacity: 1 - index * 0.1,
                scale: 1 - index * 0.1,
                ease: "power2.out"
            });
        });
    });
    


    // 初始化AOS动画库
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-quart',
            once: true,
            offset: 100
        });
    }

    console.log('动画系统已加载完成');
    console.log('GSAP和Anime.js正在运行');
});

// 自定义光标系统
function setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
        <div class="cursor-dot"></div>
        <div class="cursor-ring"></div>
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        gsap.set(cursor, {
            x: cursorX,
            y: cursorY
        });

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // 悬停效果
    gsap.utils.toArray('a, button, .btn, .skill-card, .project-card, .hobby-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to('.cursor-ring', {
                scale: 2,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to('.cursor-ring', {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// 滚动进度条
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    gsap.to(progressBar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
}

// 高级交互效果
function setupAdvancedInteractions() {
    // 鼠标跟随眼睛效果
    const eyes = document.querySelectorAll('.skill-icon, .hobby-icon');

    document.addEventListener('mousemove', (e) => {
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            const distance = Math.min(5, Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 10);

            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            gsap.to(eye, {
                x: x,
                y: y,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });

    // 卡片倾斜效果
    gsap.utils.toArray('.skill-card, .project-card, .hobby-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // 文字打散重组效果
    gsap.utils.toArray('h3').forEach(heading => {
        heading.addEventListener('mouseenter', () => {
            const chars = heading.textContent.split('');
            heading.innerHTML = chars.map(char => `<span style="display: inline-block;">${char}</span>`).join('');

            gsap.fromTo(heading.querySelectorAll('span'),
                {
                    y: 0,
                    rotation: 0
                },
                {
                    y: () => Math.random() * 20 - 10,
                    rotation: () => Math.random() * 20 - 10,
                    duration: 0.3,
                    ease: "power2.out",
                    stagger: 0.02
                }
            );
        });

        heading.addEventListener('mouseleave', () => {
            gsap.to(heading.querySelectorAll('span'), {
                y: 0,
                rotation: 0,
                duration: 0.5,
                ease: "back.out(1.7)",
                stagger: 0.02
            });
        });
    });
}

// 粒子交互效果
function setupParticleInteractions() {
    // 点击爆炸效果
    document.addEventListener('click', (e) => {
        createClickExplosion(e.clientX, e.clientY);
    });

    function createClickExplosion(x, y) {
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--accent-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${x}px;
                top: ${y}px;
            `;
            document.body.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const distance = 100 + Math.random() * 50;

            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }

    // 鼠标轨迹粒子 - 优化版本
    let trailParticles = [];
    let mouseTrailFrame = 0;

    document.addEventListener('mousemove', (e) => {
        mouseTrailFrame++;
        // 降低生成频率
        if (mouseTrailFrame % 5 !== 0 || Math.random() > 0.3) return;

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 3px;
            height: 3px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.5;
        `;
        document.body.appendChild(particle);
        trailParticles.push(particle);

        gsap.to(particle, {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
                particle.remove();
                trailParticles = trailParticles.filter(p => p !== particle);
            }
        });

        // 限制粒子数量
        if (trailParticles.length > 10) {
            const oldParticle = trailParticles.shift();
            if (oldParticle && oldParticle.parentNode) {
                oldParticle.remove();
            }
        }
    });
}

// 音效系统
function setupSoundEffects() {
    // 创建音效上下文
    let audioContext;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playBeep(frequency = 800, duration = 100) {
        initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    }

    // 为按钮添加音效
    gsap.utils.toArray('.btn, .control-btn, .theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playBeep(1000, 50);
        });

        btn.addEventListener('mouseenter', () => {
            playBeep(600, 30);
        });
    });

    // 为导航添加音效
    gsap.utils.toArray('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            playBeep(1200, 80);
        });
    });
}

// 调试函数：检查溢出元素
function checkForOverflow() {
    const elements = document.querySelectorAll('*');
    const viewportWidth = window.innerWidth;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > viewportWidth + 10) { // 10px容差
            console.warn('发现溢出元素:', el, '右边界:', rect.right, '视口宽度:', viewportWidth);
            el.style.border = '2px solid red'; // 标记溢出元素
        }
    });
}

